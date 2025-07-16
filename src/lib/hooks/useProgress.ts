/**
 * Unified Progress Hook
 * Single source of truth for all progress-related operations
 * Replaces useProgressTracking, useUnifiedProgress, and useFirebaseProgress
 */

"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { progressService } from '@/lib/services/progressService';
import { useLearningContext } from '@/lib/contexts/LearningContext';
import { 
  ProgressData, 
  ContentProgress, 
  ProgressUpdate, 
  ContentType,
  StepStatus,
  ExampleProgress,
  ProblemProgress 
} from '@/lib/types/progress';
import { StorageError, NetworkError, ErrorMonitor, errorHandler } from '@/lib/error-handling/errorHandler';

// Firebase integration (optional)
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseReady, withFirebaseErrorHandling } from '@/lib/firebase/config';
import { COLLECTIONS, ContentProgress as FirebaseContentProgress, UserProfile } from '@/lib/firebase/types';
import { getOrCreateAnonymousUserId } from '@/lib/utils/userIdGenerator';

interface UseProgressReturn {
  // Core progress data
  progressData: ProgressData;
  isLoaded: boolean;
  
  // Content progress methods
  updateContentProgress: (contentId: string, contentType: ContentType, updates: ProgressUpdate) => void;
  getContentProgress: (contentId: string) => ContentProgress | null;
  markContentComplete: (contentId: string, contentType: ContentType) => void;
  trackContentAccess: (contentId: string) => void;
  
  // Session management
  startSession: () => void;
  
  // User preferences
  updateUserPreferences: (preferences: Partial<ProgressData['userPreferences']>) => void;
  
  // Utility methods for backward compatibility
  getCompletedProblemIds: () => string[];
  getStepStatuses: (problemId: string) => Record<string, StepStatus>;
  getStepInputs: (problemId: string) => Record<string, string>;
  
  // Legacy compatibility methods
  getExampleProgress: (exampleId: string) => ExampleProgress | null;
  updateExampleProgress: (exampleId: string, updates: Partial<ExampleProgress>) => void;
  markExampleComplete: (exampleId: string, totalSteps: number) => void;
  incrementQuestionCount: (exampleId: string) => void;
  updateTimeSpent: (exampleId: string, additionalTime: number) => void;
  
  // Firebase integration
  isFirebaseEnabled: boolean;
  isSyncing: boolean;
  lastSyncTime: Date | null;
  syncToFirebase: () => Promise<boolean>;
  
  // Reset functionality
  resetProgress: () => void;
}

export function useProgress(): UseProgressReturn {
  const { findContentById } = useLearningContext();
  const [progressData, setProgressData] = useState<ProgressData>(() => progressService.getProgressData());
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Firebase state
  const [isFirebaseEnabled, setIsFirebaseEnabled] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [anonymousUserId, setAnonymousUserId] = useState<string | null>(null);
  
  // Refs for stable access
  const progressDataRef = useRef(progressData);
  const isFirebaseInitialized = useRef(false);
  
  // Update ref when progressData changes
  useEffect(() => {
    progressDataRef.current = progressData;
  }, [progressData]);
  
  // Initialize progress service and Firebase
  useEffect(() => {
    const initializeService = async () => {
      await progressService.initialize();
      setProgressData(progressService.getProgressData());
      setIsLoaded(true);
      
      // Initialize Firebase if available
      if (!isFirebaseInitialized.current) {
        try {
          setIsFirebaseEnabled(isFirebaseReady());
          if (isFirebaseReady()) {
            const userId = getOrCreateAnonymousUserId();
            setAnonymousUserId(userId);
            
            // Initial sync from Firebase
            await syncFromFirebase(userId);
          }
        } catch (error) {
          console.error('Failed to initialize Firebase:', error);
          setIsFirebaseEnabled(false);
        }
        isFirebaseInitialized.current = true;
      }
    };
    
    initializeService();
  }, []);
  
  // Subscribe to progress service changes
  useEffect(() => {
    const unsubscribe = progressService.subscribe(setProgressData);
    return unsubscribe;
  }, []);
  
  // Auto-sync to Firebase periodically
  useEffect(() => {
    if (!isFirebaseEnabled || !anonymousUserId) return;
    
    const interval = setInterval(() => {
      if (!isSyncing) {
        syncToFirebase();
      }
    }, 30000); // Sync every 30 seconds
    
    return () => clearInterval(interval);
  }, [isFirebaseEnabled, anonymousUserId, isSyncing]);
  
  // Core progress methods with error handling
  const updateContentProgress = useCallback((
    contentId: string,
    contentType: ContentType,
    updates: ProgressUpdate
  ) => {
    try {
      // Validate inputs
      if (!contentId || !contentType) {
        throw new StorageError(
          "Invalid content progress update parameters",
          { contentId: !!contentId, contentType: !!contentType }
        );
      }

      // Fill in module and lecture IDs
      let moduleId = '';
      let lectureId = '';
      
      const contentData = findContentById(contentId, contentType);
      if (contentData) {
        moduleId = contentData.module.id;
        lectureId = contentData.lecture.id;
      }
      
      progressService.updateContentProgress(contentId, contentType, updates, moduleId, lectureId);
    } catch (error) {
      const storageError = error instanceof StorageError ? error : new StorageError(
        error instanceof Error ? error.message : "Failed to update content progress",
        { contentId, contentType, updates },
        error instanceof Error ? error : undefined
      );
      
      ErrorMonitor.logError(storageError);
      console.error('Progress update failed:', storageError);
    }
  }, [findContentById]);
  
  const getContentProgress = useCallback((contentId: string) => {
    try {
      if (!contentId) {
        throw new StorageError("Invalid content ID for progress retrieval", { contentId });
      }
      return progressService.getContentProgress(contentId);
    } catch (error) {
      const storageError = error instanceof StorageError ? error : new StorageError(
        error instanceof Error ? error.message : "Failed to get content progress",
        { contentId },
        error instanceof Error ? error : undefined
      );
      
      ErrorMonitor.logError(storageError);
      console.error('Progress retrieval failed:', storageError);
      return null;
    }
  }, []);
  
  const markContentComplete = useCallback((contentId: string, contentType: ContentType) => {
    try {
      if (!contentId || !contentType) {
        throw new StorageError(
          "Invalid parameters for marking content complete",
          { contentId: !!contentId, contentType: !!contentType }
        );
      }
      progressService.markContentComplete(contentId, contentType);
    } catch (error) {
      const storageError = error instanceof StorageError ? error : new StorageError(
        error instanceof Error ? error.message : "Failed to mark content complete",
        { contentId, contentType },
        error instanceof Error ? error : undefined
      );
      
      ErrorMonitor.logError(storageError);
      console.error('Mark complete failed:', storageError);
    }
  }, []);
  
  const trackContentAccess = useCallback((contentId: string) => {
    try {
      if (!contentId) {
        throw new StorageError("Invalid content ID for access tracking", { contentId });
      }
      progressService.trackContentAccess(contentId);
    } catch (error) {
      const storageError = error instanceof StorageError ? error : new StorageError(
        error instanceof Error ? error.message : "Failed to track content access",
        { contentId },
        error instanceof Error ? error : undefined
      );
      
      ErrorMonitor.logError(storageError);
      console.error('Content access tracking failed:', storageError);
    }
  }, []);
  
  const startSession = useCallback(() => {
    progressService.startSession();
  }, []);
  
  const updateUserPreferences = useCallback((preferences: Partial<ProgressData['userPreferences']>) => {
    progressService.updateUserPreferences(preferences);
  }, []);
  
  // Utility methods
  const getCompletedProblemIds = useCallback(() => {
    return progressService.getCompletedProblemIds();
  }, []);
  
  const getStepStatuses = useCallback((problemId: string) => {
    return progressService.getStepStatuses(problemId);
  }, []);
  
  const getStepInputs = useCallback((problemId: string) => {
    return progressService.getStepInputs(problemId);
  }, []);
  
  // Legacy compatibility methods
  const getExampleProgress = useCallback((exampleId: string): ExampleProgress | null => {
    const progress = progressService.getContentProgress(exampleId);
    if (progress && progress.contentType === 'example') {
      return progress as ExampleProgress;
    }
    return null;
  }, []);
  
  const updateExampleProgress = useCallback((exampleId: string, updates: Partial<ExampleProgress>) => {
    const progressUpdate: ProgressUpdate = {
      revealedStepIndex: updates.revealedStepIndex,
      questionsAsked: updates.questionsAsked,
      timeSpent: updates.timeSpent,
      isCompleted: updates.isCompleted,
    };
    
    progressService.updateContentProgress(exampleId, 'example', progressUpdate);
  }, []);
  
  const markExampleComplete = useCallback((exampleId: string, totalSteps: number) => {
    progressService.updateContentProgress(exampleId, 'example', {
      revealedStepIndex: totalSteps - 1,
      isCompleted: true,
    });
  }, []);
  
  const incrementQuestionCount = useCallback((exampleId: string) => {
    const current = progressService.getContentProgress(exampleId);
    if (current && current.contentType === 'example') {
      progressService.updateContentProgress(exampleId, 'example', {
        questionsAsked: 1, // This will be added to the existing count
      });
    }
  }, []);
  
  const updateTimeSpent = useCallback((exampleId: string, additionalTime: number) => {
    progressService.updateContentProgress(exampleId, 'example', {
      timeSpent: additionalTime,
    });
  }, []);
  
  const resetProgress = useCallback(() => {
    progressService.resetProgress();
  }, []);
  
  // Firebase methods with error handling
  const syncToFirebase = useCallback(async (): Promise<boolean> => {
    if (!isFirebaseEnabled || !anonymousUserId || !db) return false;
    
    setIsSyncing(true);
    try {
      const currentProgressData = progressDataRef.current;
      
      // Sync user profile
      const userProfileRef = doc(db, COLLECTIONS.USER_PROFILES, anonymousUserId);
      const userProfile: Partial<UserProfile> = {
        uid: anonymousUserId,
        displayName: 'Anonymous User',
        email: undefined,
        photoURL: undefined,
        learningPreferences: currentProgressData.userPreferences,
        overallStats: currentProgressData.overallStats,
        updatedAt: new Date(),
      };
      
      const profileDoc = await getDoc(userProfileRef);
      if (!profileDoc.exists()) {
        await setDoc(userProfileRef, {
          ...userProfile,
          createdAt: new Date(),
        });
      } else {
        await setDoc(userProfileRef, userProfile, { merge: true });
      }
      
      // Sync content progress using batch operations
      const progressEntries = Object.entries(currentProgressData.contentProgress);
      const BATCH_SIZE = 500;
      
      for (let i = 0; i < progressEntries.length; i += BATCH_SIZE) {
        const chunk = progressEntries.slice(i, i + BATCH_SIZE);
        const batch = writeBatch(db);
        
        for (const [contentId, progress] of chunk) {
          const progressRef = doc(db, COLLECTIONS.CONTENT_PROGRESS, `${anonymousUserId}_${contentId}`);
          const progressDoc: Partial<FirebaseContentProgress> = {
            userId: anonymousUserId,
            contentId: progress.contentId,
            contentType: progress.contentType,
            moduleId: progress.moduleId,
            lectureId: progress.lectureId,
            progressData: {
              isStarted: progress.isStarted,
              isCompleted: progress.isCompleted,
              completedAt: progress.completedAt,
              lastAccessedAt: progress.lastAccessedAt,
              timeSpent: progress.timeSpent,
              sessionCount: progress.sessionCount,
              hintsUsed: progress.hintsUsed,
              attemptsCount: progress.attemptsCount,
              difficultyRating: progress.difficultyRating,
              ...(progress.contentType === 'example' && {
                revealedStepIndex: (progress as ExampleProgress).revealedStepIndex,
                questionsAsked: (progress as ExampleProgress).questionsAsked,
              }),
              ...(progress.contentType === 'problem' && {
                stepStatuses: (progress as ProblemProgress).stepStatuses,
                stepInputs: (progress as ProblemProgress).stepInputs,
                correctStepsCount: (progress as ProblemProgress).correctStepsCount,
                totalSteps: (progress as ProblemProgress).totalSteps,
              }),
            },
            updatedAt: new Date(),
          };
          
          try {
            const existingDoc = await getDoc(progressRef);
            if (!existingDoc.exists()) {
              batch.set(progressRef, {
                ...progressDoc,
                id: `${anonymousUserId}_${contentId}`,
                createdAt: new Date(),
              });
            } else {
              batch.update(progressRef, progressDoc);
            }
          } catch (error) {
            batch.set(progressRef, {
              ...progressDoc,
              id: `${anonymousUserId}_${contentId}`,
              createdAt: new Date(),
            });
          }
        }
        
        if (chunk.length > 0) {
          await batch.commit();
        }
      }
      
      setLastSyncTime(new Date());
      return true;
    } catch (error) {
      const networkError = error instanceof NetworkError ? error : new NetworkError(
        error instanceof Error ? error.message : "Failed to sync progress to Firebase",
        { 
          operation: "syncToFirebase",
          anonymousUserId,
          isFirebaseEnabled 
        },
        error instanceof Error ? error : undefined
      );
      
      ErrorMonitor.logError(networkError);
      console.error('Firebase sync failed:', networkError);
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [isFirebaseEnabled, anonymousUserId]);
  
  const syncFromFirebase = useCallback(async (userId: string) => {
    return withFirebaseErrorHandling(async () => {
      if (!userId || !db) return;
      
      // Load user profile
      const userProfileRef = doc(db, COLLECTIONS.USER_PROFILES, userId);
      const profileDoc = await getDoc(userProfileRef);
      
      // Load content progress
      const progressQuery = query(
        collection(db, COLLECTIONS.CONTENT_PROGRESS),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      const progressSnapshot = await getDocs(progressQuery);
      
      const contentProgress: Record<string, ContentProgress> = {};
      progressSnapshot.forEach((doc) => {
        const data = doc.data() as FirebaseContentProgress;
        const baseProgress = {
          contentId: data.contentId,
          contentType: data.contentType,
          moduleId: data.moduleId,
          lectureId: data.lectureId,
          isStarted: data.progressData.isStarted,
          isCompleted: data.progressData.isCompleted,
          completedAt: data.progressData.completedAt,
          lastAccessedAt: data.progressData.lastAccessedAt,
          timeSpent: data.progressData.timeSpent,
          sessionCount: data.progressData.sessionCount,
          hintsUsed: data.progressData.hintsUsed || 0,
          attemptsCount: data.progressData.attemptsCount || 0,
          difficultyRating: data.progressData.difficultyRating,
        };
        
        if (data.contentType === 'example') {
          contentProgress[data.contentId] = {
            ...baseProgress,
            contentType: 'example',
            revealedStepIndex: data.progressData.revealedStepIndex || 0,
            questionsAsked: data.progressData.questionsAsked || 0,
          } as ExampleProgress;
        } else {
          contentProgress[data.contentId] = {
            ...baseProgress,
            contentType: 'problem',
            stepStatuses: data.progressData.stepStatuses || {},
            stepInputs: data.progressData.stepInputs || {},
            correctStepsCount: data.progressData.correctStepsCount || 0,
            totalSteps: data.progressData.totalSteps || 0,
          } as ProblemProgress;
        }
      });
      
      // Create Firebase data structure
      const firebaseData: ProgressData = {
        contentProgress,
        overallStats: profileDoc.exists() ? profileDoc.data().overallStats : progressDataRef.current.overallStats,
        userPreferences: profileDoc.exists() ? profileDoc.data().learningPreferences : progressDataRef.current.userPreferences,
        sessionData: progressDataRef.current.sessionData,
        version: progressDataRef.current.version,
        lastSyncedAt: new Date(),
      };
      
      // Merge with local data
      progressService.mergeExternalProgressData(firebaseData);
      setLastSyncTime(new Date());
    }, null, 'Sync from Firebase');
  }, []);
  
  return {
    progressData,
    isLoaded,
    updateContentProgress,
    getContentProgress,
    markContentComplete,
    trackContentAccess,
    startSession,
    updateUserPreferences,
    getCompletedProblemIds,
    getStepStatuses,
    getStepInputs,
    getExampleProgress,
    updateExampleProgress,
    markExampleComplete,
    incrementQuestionCount,
    updateTimeSpent,
    resetProgress,
    isFirebaseEnabled,
    isSyncing,
    lastSyncTime,
    syncToFirebase,
  };
}