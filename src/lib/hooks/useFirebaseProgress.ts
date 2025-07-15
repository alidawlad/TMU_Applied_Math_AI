// Firebase-based progress tracking hook for anonymous users
import { useState, useEffect, useCallback, useRef } from 'react';
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
import { db, isFirebaseConfigured, withFirebaseErrorHandling, isFirebaseReady } from '../firebase/config';
import { COLLECTIONS, ContentProgress, UserProfile } from '../firebase/types';
import { useUnifiedProgress, UnifiedProgressData } from './useUnifiedProgress';
import { getOrCreateAnonymousUserId } from '../utils/userIdGenerator';

export function useFirebaseProgress() {
  const localProgress = useUnifiedProgress();
  const [anonymousUserId, setAnonymousUserId] = useState<string | null>(null);
  const [isFirebaseEnabled, setIsFirebaseEnabled] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use refs to prevent stale closures and infinite loops
  const localProgressRef = useRef(localProgress);
  const hasSyncedRef = useRef(false);
  
  // Update ref when localProgress changes
  useEffect(() => {
    localProgressRef.current = localProgress;
  }, [localProgress]);

  // Initialize anonymous user ID and Firebase status (only once)
  useEffect(() => {
    if (isInitialized) return;
    
    try {
      setIsFirebaseEnabled(isFirebaseReady());
      
      // Generate or retrieve anonymous user ID
      const userId = getOrCreateAnonymousUserId();
      setAnonymousUserId(userId);
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing Firebase progress:', error);
      setIsFirebaseEnabled(false);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Sync progress data to Firebase
  const syncToFirebase = useCallback(async (progressData: UnifiedProgressData) => {
    if (!isFirebaseEnabled || !anonymousUserId || !db) return false;

    setIsSyncing(true);
    try {
      // Sync user profile
      const userProfileRef = doc(db, COLLECTIONS.USER_PROFILES, anonymousUserId);
      const userProfile: Partial<UserProfile> = {
        uid: anonymousUserId,
        displayName: `Anonymous User`,
        email: undefined,
        photoURL: undefined,
        learningPreferences: progressData.userPreferences,
        overallStats: progressData.overallStats,
        updatedAt: new Date(),
      };

      // Create or update profile
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
      const progressEntries = Object.entries(progressData.contentProgress);
      
      // Process in chunks of 500 (Firestore batch limit)
      const BATCH_SIZE = 500;
      for (let i = 0; i < progressEntries.length; i += BATCH_SIZE) {
        const chunk = progressEntries.slice(i, i + BATCH_SIZE);
        const batch = writeBatch(db);
        
        for (const [contentId, progress] of chunk) {
          const progressRef = doc(db, COLLECTIONS.CONTENT_PROGRESS, `${anonymousUserId}_${contentId}`);
          const progressDoc: Partial<ContentProgress> = {
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
              revealedStepIndex: progress.revealedStepIndex,
              questionsAsked: progress.questionsAsked,
              stepStatuses: progress.stepStatuses,
              stepInputs: progress.stepInputs,
              correctStepsCount: progress.correctStepsCount,
              totalSteps: progress.totalSteps,
              hintsUsed: progress.hintsUsed,
              attemptsCount: progress.attemptsCount,
              difficultyRating: progress.difficultyRating,
            },
            updatedAt: new Date(),
          };

          // Check if document exists for proper creation vs update
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
            // If document doesn't exist, create it
            batch.set(progressRef, {
              ...progressDoc,
              id: `${anonymousUserId}_${contentId}`,
              createdAt: new Date(),
            });
          }
        }
        
        // Commit this batch
        if (chunk.length > 0) {
          await batch.commit();
        }
      }

      setLastSyncTime(new Date());
      return true;
    } catch (error) {
      console.error('Error syncing to Firebase:', error);
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [isFirebaseEnabled, anonymousUserId]);

  // Load progress data from Firebase - defensive and stable
  const loadFromFirebase = useCallback(async () => {
    return withFirebaseErrorHandling(async () => {
      if (!anonymousUserId || !db) return null;

      // Load user profile
      const userProfileRef = doc(db, COLLECTIONS.USER_PROFILES, anonymousUserId);
      const profileDoc = await getDoc(userProfileRef);

      // Load content progress
      const progressQuery = query(
        collection(db, COLLECTIONS.CONTENT_PROGRESS),
        where('userId', '==', anonymousUserId),
        orderBy('updatedAt', 'desc')
      );
      const progressSnapshot = await getDocs(progressQuery);

      const contentProgress: Record<string, any> = {};
      progressSnapshot.forEach((doc) => {
        const data = doc.data() as ContentProgress;
        contentProgress[data.contentId] = {
          ...data.progressData,
          contentId: data.contentId,
          contentType: data.contentType,
          moduleId: data.moduleId,
          lectureId: data.lectureId,
        };
      });

      // Use current local progress data from ref to avoid stale closures
      const currentLocalProgress = localProgressRef.current.progressData;
      const firebaseData: UnifiedProgressData = {
        contentProgress,
        overallStats: profileDoc.exists() ? profileDoc.data().overallStats : currentLocalProgress?.overallStats || {},
        userPreferences: profileDoc.exists() ? profileDoc.data().learningPreferences : currentLocalProgress?.userPreferences || {},
        sessionData: currentLocalProgress?.sessionData || {}, // Keep local session data
      };

      return firebaseData;
    }, null, 'Load from Firebase');
  }, [anonymousUserId]);

  // Merge Firebase data with local data - defensive and debounced
  const mergeWithLocal = useCallback(async () => {
    if (!anonymousUserId || !isFirebaseEnabled || !db || hasSyncedRef.current) return;

    try {
      hasSyncedRef.current = true; // Prevent multiple simultaneous syncs
      const firebaseData = await loadFromFirebase();
      if (firebaseData) {
        // Use the ref to get stable access to merge function
        const currentLocalProgress = localProgressRef.current;
        if (currentLocalProgress.mergeProgressData) {
          currentLocalProgress.mergeProgressData(firebaseData);
          setLastSyncTime(new Date());
        }
      }
    } catch (error) {
      console.error('Error merging with local data:', error);
    } finally {
      // Reset after a delay to allow for future syncs
      setTimeout(() => {
        hasSyncedRef.current = false;
      }, 5000);
    }
  }, [anonymousUserId, isFirebaseEnabled, loadFromFirebase]);

  // Initial sync when everything is ready (only once)
  useEffect(() => {
    if (isInitialized && anonymousUserId && isFirebaseEnabled && !hasSyncedRef.current) {
      // Small delay to ensure local progress is fully initialized
      const timeoutId = setTimeout(() => {
        mergeWithLocal();
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isInitialized, anonymousUserId, isFirebaseEnabled, mergeWithLocal]);

  // Auto-sync periodically when user is active - but only if Firebase is stable
  useEffect(() => {
    if (!anonymousUserId || !isFirebaseEnabled || !isInitialized) return;

    const interval = setInterval(() => {
      // Get latest progress data at sync time to avoid stale closure
      const currentProgressData = localProgressRef.current?.progressData;
      if (currentProgressData && !isSyncing) {
        syncToFirebase(currentProgressData);
      }
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(interval);
  }, [anonymousUserId, isFirebaseEnabled, isInitialized, syncToFirebase, isSyncing]);

  return {
    anonymousUserId,
    isFirebaseEnabled,
    isSyncing,
    lastSyncTime,
    syncToFirebase: () => {
      const currentProgressData = localProgressRef.current?.progressData;
      if (currentProgressData && !isSyncing) {
        return syncToFirebase(currentProgressData);
      }
      return Promise.resolve(false);
    },
    loadFromFirebase,
    mergeWithLocal,
    // Re-export local progress methods
    ...localProgress,
  };
}