"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLearningContext } from '@/lib/contexts/LearningContext';
import { getModuleProgress, getLectureProgress } from '@/lib/progressionUtils';
import { lectures } from '@/lib/content';

// Unified progress data structure
export interface ContentProgress {
  contentId: string;
  contentType: 'example' | 'problem';
  moduleId: string;
  lectureId: string;
  
  // Progress tracking
  isStarted: boolean;
  isCompleted: boolean;
  completedAt?: Date;
  lastAccessedAt: Date;
  
  // Time tracking
  timeSpent: number; // milliseconds
  sessionCount: number;
  
  // Example-specific data
  revealedStepIndex?: number;
  questionsAsked?: number;
  
  // Problem-specific data
  stepStatuses?: Record<string, 'unanswered' | 'correct' | 'incorrect'>;
  stepInputs?: Record<string, string>;
  correctStepsCount?: number;
  totalSteps?: number;
  
  // Learning analytics
  hintsUsed?: number;
  attemptsCount?: number;
  difficultyRating?: number; // 1-5 scale
}

export interface UnifiedProgressData {
  contentProgress: Record<string, ContentProgress>;
  overallStats: {
    totalTimeSpent: number;
    completedContent: number;
    totalContent: number;
    streakDays: number;
    lastStudyDate: Date;
    completionPercentage: number;
    averageSessionTime: number;
    totalSessions: number;
  };
  userPreferences: {
    dailyGoal?: number;
    preferredDifficulty?: 'easy' | 'medium' | 'hard';
    studyReminders?: boolean;
    soundEnabled?: boolean;
    darkMode?: boolean;
  };
  sessionData: {
    currentSessionStart?: Date;
    currentSessionContent: string[];
    dailyGoalProgress: number; // 0-100
  };
}

interface ProgressUpdate {
  timeSpent?: number;
  revealedStepIndex?: number;
  questionsAsked?: number;
  stepStatuses?: Record<string, 'unanswered' | 'correct' | 'incorrect'>;
  stepInputs?: Record<string, string>;
  hintsUsed?: number;
  attemptsCount?: number;
  isCompleted?: boolean;
  correctStepsCount?: number;
  totalSteps?: number;
}

const STORAGE_KEY = 'fm-unified-progress';
const MIGRATION_KEY = 'fm-progress-migrated';

// Function to check for module/lecture completion achievements
function checkForCompletionAchievements(completedProblemId: string, allCompletedProblemIds: string[]) {
  // TEMPORARILY DISABLED: This function causes "Cannot access 'N' before initialization" errors
  // Achievement tracking is disabled to prevent app crashes
  
  try {
    console.log('🎯 Achievement tracking temporarily disabled for problem:', completedProblemId);
    console.log('📊 Progress would be tracked for', allCompletedProblemIds.length, 'completed problems');
    
    // Just return immediately - no achievement processing
    return;
  } catch (error) {
    console.warn('Achievement tracking error (safely ignored):', error);
    return;
  }
  
  
  // All the complex achievement logic is commented out below:
  /*
  Original achievement tracking code was here but is temporarily disabled
  to prevent initialization errors. The core learning functionality works
  perfectly without this feature.
  
  This included:
  - Module completion detection
  - Lecture completion detection  
  - Achievement storage in sessionStorage
  - Progress celebration triggers
  */
}

export function useUnifiedProgress() {
  const { session, findContentById } = useLearningContext();
  const [progressData, setProgressData] = useState<UnifiedProgressData>({
    contentProgress: {},
    overallStats: {
      totalTimeSpent: 0,
      completedContent: 0,
      totalContent: 0,
      streakDays: 0,
      lastStudyDate: new Date(),
      completionPercentage: 0,
      averageSessionTime: 0,
      totalSessions: 0
    },
    userPreferences: {
      dailyGoal: 30, // 30 minutes default
      preferredDifficulty: 'medium',
      studyReminders: true,
      soundEnabled: true,
      darkMode: false
    },
    sessionData: {
      currentSessionContent: [],
      dailyGoalProgress: 0
    }
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  
  // Use ref for stable access to progress data
  const progressDataRef = useRef(progressData);
  
  // Update ref when progressData changes
  useEffect(() => {
    progressDataRef.current = progressData;
  }, [progressData]);

  // Initialize once - load or migrate data
  useEffect(() => {
    if (migrationComplete) return;
    
    // Check if migration was already done
    if (localStorage.getItem(MIGRATION_KEY)) {
      setMigrationComplete(true);
      return;
    }

    // Run migration
    const migrations = {
      // Migrate old mastery data
      oldMastery: localStorage.getItem('fm-mastery-data'),
      // Migrate old step data (scan all localStorage keys)
      stepData: Object.keys(localStorage)
        .filter(key => key.startsWith('fm-stepInputs-') || key.startsWith('fm-stepStatuses-'))
        .reduce((acc, key) => {
          acc[key] = localStorage.getItem(key);
          return acc;
        }, {} as Record<string, string | null>)
    };

    const migratedProgress: Record<string, ContentProgress> = {};

    // Migrate mastery data
    if (migrations.oldMastery) {
      try {
        const masteryData = JSON.parse(migrations.oldMastery);
        Object.values(masteryData.examples || {}).forEach((example: any) => {
          migratedProgress[example.exampleId] = {
            contentId: example.exampleId,
            contentType: 'example',
            moduleId: '', // Will be filled by findContentById
            lectureId: '',
            isStarted: example.revealedStepIndex > 0,
            isCompleted: !!example.completedAt,
            completedAt: example.completedAt ? new Date(example.completedAt) : undefined,
            lastAccessedAt: new Date(example.lastAccessedAt || Date.now()),
            timeSpent: example.timeSpent || 0,
            sessionCount: 1,
            revealedStepIndex: example.revealedStepIndex || 0,
            questionsAsked: example.questionsAsked || 0,
          };
        });
      } catch (error) {
        console.error('Failed to migrate mastery data:', error);
      }
    }

    // Migrate step data
    Object.entries(migrations.stepData).forEach(([key, value]) => {
      if (!value) return;
      
      try {
        const match = key.match(/^fm-(stepInputs|stepStatuses)-(.+)$/);
        if (!match || match.length < 3) return;
        
        const type = match[1];
        const problemId = match[2];
        const data = JSON.parse(value);
        
        if (!migratedProgress[problemId]) {
          migratedProgress[problemId] = {
            contentId: problemId,
            contentType: 'problem',
            moduleId: '',
            lectureId: '',
            isStarted: true,
            isCompleted: false,
            lastAccessedAt: new Date(),
            timeSpent: 0,
            sessionCount: 1,
            stepStatuses: {},
            stepInputs: {}
          };
        }
        
        if (type === 'stepInputs') {
          migratedProgress[problemId].stepInputs = data;
        } else if (type === 'stepStatuses') {
          migratedProgress[problemId].stepStatuses = data;
          // Calculate completion
          const correctSteps = Object.values(data).filter(status => status === 'correct').length;
          migratedProgress[problemId].correctStepsCount = correctSteps;
          migratedProgress[problemId].isCompleted = correctSteps > 0; // At least one step completed
        }
      } catch (error) {
        console.error(`Failed to migrate ${key}:`, error);
      }
    });

    // Fill in module and lecture IDs
    Object.values(migratedProgress).forEach(progress => {
      const contentData = findContentById(progress.contentId, progress.contentType);
      if (contentData) {
        progress.moduleId = contentData.module.id;
        progress.lectureId = contentData.lecture.id;
      }
    });

    // Save migrated data
    if (Object.keys(migratedProgress).length > 0) {
      setProgressData(prev => ({
        ...prev,
        contentProgress: migratedProgress,
        overallStats: {
          ...prev.overallStats,
          totalTimeSpent: Object.values(migratedProgress).reduce((sum, p) => sum + p.timeSpent, 0),
          completedContent: Object.values(migratedProgress).filter(p => p.isCompleted).length,
          totalContent: Object.keys(migratedProgress).length,
        },
      }));
    }

    localStorage.setItem(MIGRATION_KEY, 'true');
    setMigrationComplete(true);
  }, [findContentById, migrationComplete]);

  // Load progress data after migration
  useEffect(() => {
    if (!migrationComplete) return;
    
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Convert date strings back to Date objects
        Object.values(parsed.contentProgress || {}).forEach((progress: any) => {
          if (progress.completedAt) {
            progress.completedAt = new Date(progress.completedAt);
          }
          if (progress.lastAccessedAt) {
            progress.lastAccessedAt = new Date(progress.lastAccessedAt);
          }
        });
        if (parsed.overallStats?.lastStudyDate) {
          parsed.overallStats.lastStudyDate = new Date(parsed.overallStats.lastStudyDate);
        }
        if (parsed.sessionData?.currentSessionStart) {
          parsed.sessionData.currentSessionStart = new Date(parsed.sessionData.currentSessionStart);
        }
        
        setProgressData(parsed);
      } catch (error) {
        console.error('Failed to load progress data:', error);
      }
    }
    
    setIsLoaded(true);
  }, [migrationComplete]);

  // Save progress data
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    }
  }, [progressData, isLoaded]);

  // Update content progress
  const updateContentProgress = useCallback((
    contentId: string,
    contentType: 'example' | 'problem',
    updates: ProgressUpdate
  ) => {
    setProgressData(prev => {
      const existing = prev.contentProgress[contentId];
      const contentData = findContentById(contentId, contentType);
      
      const updatedProgress: ContentProgress = {
        ...existing,
        ...updates,
        contentId,
        contentType,
        moduleId: contentData?.module.id || existing?.moduleId || '',
        lectureId: contentData?.lecture.id || existing?.lectureId || '',
        isStarted: true,
        isCompleted: updates.isCompleted ?? existing?.isCompleted ?? false,
        completedAt: updates.isCompleted ? new Date() : existing?.completedAt,
        lastAccessedAt: new Date(),
        timeSpent: (existing?.timeSpent || 0) + (updates.timeSpent || 0),
        sessionCount: (existing?.sessionCount || 0) + 1
      };

      const newContentProgress = {
        ...prev.contentProgress,
        [contentId]: updatedProgress
      };

      // Recalculate overall stats
      const allProgress = Object.values(newContentProgress);
      const completedCount = allProgress.filter(p => p.isCompleted).length;
      const totalTime = allProgress.reduce((sum, p) => sum + p.timeSpent, 0);
      
      // Check for module/lecture completion achievements
      const completedProblemIds = Object.keys(newContentProgress).filter(
        id => newContentProgress[id].isCompleted && newContentProgress[id].contentType === 'problem'
      );
      
      // Store completion achievements in session storage for celebration display
      if (updates.isCompleted && contentType === 'problem') {
        checkForCompletionAchievements(contentId, completedProblemIds);
      }
      
      return {
        ...prev,
        contentProgress: newContentProgress,
        overallStats: {
          ...prev.overallStats,
          totalTimeSpent: totalTime,
          completedContent: completedCount,
          totalContent: allProgress.length,
          completionPercentage: allProgress.length > 0 ? (completedCount / allProgress.length) * 100 : 0,
          lastStudyDate: new Date()
        }
      };
    });
  }, [findContentById]);

  // Get content progress - using ref for stable access
  const getContentProgress = useCallback((contentId: string): ContentProgress | null => {
    return progressDataRef.current.contentProgress[contentId] || null;
  }, []);

  // Mark content complete
  const markContentComplete = useCallback((contentId: string, contentType: 'example' | 'problem') => {
    updateContentProgress(contentId, contentType, { isCompleted: true });
  }, [updateContentProgress]);

  // Start session tracking
  const startSession = useCallback(() => {
    setProgressData(prev => ({
      ...prev,
      sessionData: {
        ...prev.sessionData,
        currentSessionStart: new Date(),
        currentSessionContent: []
      }
    }));
  }, []);

  // Track content access in session
  const trackContentAccess = useCallback((contentId: string) => {
    setProgressData(prev => ({
      ...prev,
      sessionData: {
        ...prev.sessionData,
        currentSessionContent: [...new Set([...prev.sessionData.currentSessionContent, contentId])]
      }
    }));
  }, []);

  // Merge external progress data (e.g., from Firebase)
  const mergeProgressData = useCallback((externalData: UnifiedProgressData) => {
    setProgressData(prev => {
      const mergedContentProgress = { ...prev.contentProgress };
      
      // Merge content progress, preferring more recent updates
      for (const [contentId, externalProgress] of Object.entries(externalData.contentProgress)) {
        const localProgress = prev.contentProgress[contentId];
        
        if (!localProgress || 
            (externalProgress.lastAccessedAt && 
             (!localProgress.lastAccessedAt || 
              new Date(externalProgress.lastAccessedAt) > new Date(localProgress.lastAccessedAt)))) {
          mergedContentProgress[contentId] = externalProgress;
        }
      }
      
      return {
        contentProgress: mergedContentProgress,
        overallStats: {
          ...prev.overallStats,
          ...externalData.overallStats,
        },
        userPreferences: {
          ...prev.userPreferences,
          ...externalData.userPreferences,
        },
        sessionData: prev.sessionData, // Keep local session data
      };
    });
  }, []);

  return {
    progressData,
    isLoaded,
    updateContentProgress,
    getContentProgress,
    markContentComplete,
    startSession,
    trackContentAccess,
    mergeProgressData
  };
}
