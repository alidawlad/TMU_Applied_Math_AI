// Firebase-based progress tracking hook for anonymous users
import { useState, useEffect, useCallback } from 'react';
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
import { db, isFirebaseConfigured } from '../firebase/config';
import { COLLECTIONS, ContentProgress, UserProfile } from '../firebase/types';
import { useUnifiedProgress, UnifiedProgressData } from './useUnifiedProgress';
import { getOrCreateAnonymousUserId } from '../utils/userIdGenerator';

export function useFirebaseProgress() {
  const localProgress = useUnifiedProgress();
  const [anonymousUserId, setAnonymousUserId] = useState<string | null>(null);
  const [isFirebaseEnabled, setIsFirebaseEnabled] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Initialize anonymous user ID and Firebase status
  useEffect(() => {
    setIsFirebaseEnabled(isFirebaseConfigured);
    
    // Generate or retrieve anonymous user ID
    const userId = getOrCreateAnonymousUserId();
    setAnonymousUserId(userId);
    
    // Auto-sync data when Firebase is available and user ID is ready
    if (isFirebaseConfigured && userId && localProgress.progressData) {
      loadFromFirebase();
    }
  }, []);

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

  // Load progress data from Firebase
  const loadFromFirebase = useCallback(async () => {
    if (!isFirebaseEnabled || !anonymousUserId || !db) return null;

    try {
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

      const firebaseData: UnifiedProgressData = {
        contentProgress,
        overallStats: profileDoc.exists() ? profileDoc.data().overallStats : localProgress.progressData.overallStats,
        userPreferences: profileDoc.exists() ? profileDoc.data().learningPreferences : localProgress.progressData.userPreferences,
        sessionData: localProgress.progressData.sessionData, // Keep local session data
      };

      return firebaseData;
    } catch (error) {
      console.error('Error loading from Firebase:', error);
      return null;
    }
  }, [isFirebaseEnabled, anonymousUserId, localProgress.progressData]);

  // Merge Firebase data with local data
  const mergeWithLocal = useCallback(async () => {
    if (!anonymousUserId || !isFirebaseEnabled || !db) return;

    try {
      const firebaseData = await loadFromFirebase();
      if (firebaseData) {
        // Merge the data, preferring more recent updates
        localProgress.mergeProgressData(firebaseData);
        setLastSyncTime(new Date());
      }
    } catch (error) {
      console.error('Error merging with local data:', error);
    }
  }, [anonymousUserId, isFirebaseEnabled, loadFromFirebase, localProgress.mergeProgressData]);

  // Auto-sync when anonymous user ID is ready
  useEffect(() => {
    if (anonymousUserId && isFirebaseEnabled && localProgress.progressData) {
      mergeWithLocal();
    }
  }, [anonymousUserId, isFirebaseEnabled]);

  // Auto-sync periodically when user is active
  useEffect(() => {
    if (!anonymousUserId || !isFirebaseEnabled) return;

    const interval = setInterval(() => {
      // Get latest progress data at sync time to avoid stale closure
      const currentProgressData = localProgress.progressData;
      if (currentProgressData) {
        syncToFirebase(currentProgressData);
      }
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(interval);
  }, [anonymousUserId, isFirebaseEnabled, syncToFirebase]);

  return {
    anonymousUserId,
    isFirebaseEnabled,
    isSyncing,
    lastSyncTime,
    syncToFirebase: () => syncToFirebase(localProgress.progressData),
    loadFromFirebase,
    mergeWithLocal,
    // Re-export local progress methods
    ...localProgress,
  };
}