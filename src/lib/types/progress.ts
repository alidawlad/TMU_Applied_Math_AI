/**
 * Unified progress tracking types for the TMU Applied Math Mastery application
 * This file consolidates all progress-related types into a single source of truth
 */

export type ContentType = 'example' | 'problem';
export type StepStatus = 'unanswered' | 'correct' | 'incorrect';

/**
 * Base progress data structure for any content (example or problem)
 */
export interface BaseContentProgress {
  contentId: string;
  contentType: ContentType;
  moduleId: string;
  lectureId: string;
  
  // Progress tracking
  isStarted: boolean;
  isCompleted: boolean;
  completedAt?: Date;
  lastAccessedAt: Date;
  
  // Time and session tracking
  timeSpent: number; // milliseconds
  sessionCount: number;
  
  // Learning analytics
  hintsUsed: number;
  attemptsCount: number;
  difficultyRating?: number; // 1-5 scale
}

/**
 * Progress data specific to examples
 */
export interface ExampleProgress extends BaseContentProgress {
  contentType: 'example';
  
  // Example-specific data
  revealedStepIndex: number;
  questionsAsked: number;
}

/**
 * Progress data specific to problems
 */
export interface ProblemProgress extends BaseContentProgress {
  contentType: 'problem';
  
  // Problem-specific data
  stepStatuses: Record<string, StepStatus>;
  stepInputs: Record<string, string>;
  correctStepsCount: number;
  totalSteps: number;
}

/**
 * Union type for content progress
 */
export type ContentProgress = ExampleProgress | ProblemProgress;

/**
 * Overall statistics for the user
 */
export interface OverallStats {
  totalTimeSpent: number;
  completedContent: number;
  totalContent: number;
  streakDays: number;
  lastStudyDate: Date;
  completionPercentage: number;
  averageSessionTime: number;
  totalSessions: number;
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  dailyGoal?: number; // minutes
  preferredDifficulty?: 'easy' | 'medium' | 'hard';
  studyReminders?: boolean;
  soundEnabled?: boolean;
  darkMode?: boolean;
}

/**
 * Session-specific data
 */
export interface SessionData {
  currentSessionStart?: Date;
  currentSessionContent: string[];
  dailyGoalProgress: number; // 0-100
}

/**
 * Complete progress data structure
 */
export interface ProgressData {
  contentProgress: Record<string, ContentProgress>;
  overallStats: OverallStats;
  userPreferences: UserPreferences;
  sessionData: SessionData;
  version: string; // For data migration
  lastSyncedAt?: Date; // For Firebase sync
}

/**
 * Progress update payload for content
 */
export interface ProgressUpdate {
  // Common fields
  timeSpent?: number;
  hintsUsed?: number;
  attemptsCount?: number;
  isCompleted?: boolean;
  difficultyRating?: number;
  
  // Example-specific updates
  revealedStepIndex?: number;
  questionsAsked?: number;
  
  // Problem-specific updates
  stepStatuses?: Record<string, StepStatus>;
  stepInputs?: Record<string, string>;
  correctStepsCount?: number;
  totalSteps?: number;
}

/**
 * Legacy data structures for migration
 */
export interface LegacyExampleProgress {
  exampleId: string;
  revealedStepIndex: number;
  completedAt?: Date;
  timeSpent: number;
  questionsAsked: number;
  lastAccessedAt: Date;
}

export interface LegacyMasteryData {
  examples: Record<string, LegacyExampleProgress>;
  overallCompletion: number;
  streakDays: number;
  totalTimeSpent: number;
  lastStudyDate: Date;
}

/**
 * Achievement data structure
 */
export interface Achievement {
  type: 'module_complete' | 'lecture_complete' | 'problem_complete' | 'streak';
  moduleId?: string;
  moduleName?: string;
  lectureId?: string;
  lectureName?: string;
  timestamp: string;
  problemsCompleted?: number;
  modulesCompleted?: number;
  totalProblems?: number;
  streakDays?: number;
}

/**
 * Migration status tracking
 */
export interface MigrationStatus {
  isCompleted: boolean;
  version: string;
  timestamp: Date;
  migratedDataSources: string[];
}

/**
 * Storage keys used throughout the application
 */
export const STORAGE_KEYS = {
  UNIFIED_PROGRESS: 'fm-unified-progress',
  MIGRATION_STATUS: 'fm-migration-status',
  ACHIEVEMENTS: 'fm-achievements',
  
  // Legacy keys (for migration)
  MASTERY_DATA: 'fm-mastery-data',
  STEP_INPUTS_PREFIX: 'fm-stepInputs-',
  STEP_STATUSES_PREFIX: 'fm-stepStatuses-',
  OLD_MIGRATION_KEY: 'fm-progress-migrated',
} as const;

/**
 * Current data version for migration tracking
 */
export const CURRENT_DATA_VERSION = '2.0.0';

/**
 * Default progress data
 */
export const DEFAULT_PROGRESS_DATA: ProgressData = {
  contentProgress: {},
  overallStats: {
    totalTimeSpent: 0,
    completedContent: 0,
    totalContent: 0,
    streakDays: 0,
    lastStudyDate: new Date(),
    completionPercentage: 0,
    averageSessionTime: 0,
    totalSessions: 0,
  },
  userPreferences: {
    dailyGoal: 30, // 30 minutes default
    preferredDifficulty: 'medium',
    studyReminders: true,
    soundEnabled: true,
    darkMode: false,
  },
  sessionData: {
    currentSessionContent: [],
    dailyGoalProgress: 0,
  },
  version: CURRENT_DATA_VERSION,
};