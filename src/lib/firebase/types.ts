// Firebase types for Focused Mastery application

export interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  learningPreferences: {
    dailyGoal?: number;
    preferredDifficulty?: 'easy' | 'medium' | 'hard';
    studyReminders?: boolean;
    soundEnabled?: boolean;
    darkMode?: boolean;
  };
  overallStats: {
    totalTimeSpent: number;
    completedContent: number;
    totalContent: number;
    streakDays: number;
    lastStudyDate: string;
    completionPercentage: number;
    averageSessionTime: number;
    totalSessions: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentProgress {
  id: string;
  userId: string;
  contentId: string;
  contentType: 'example' | 'problem';
  moduleId: string;
  lectureId: string;
  progressData: {
    isStarted: boolean;
    isCompleted: boolean;
    completedAt?: Date;
    lastAccessedAt: Date;
    timeSpent: number;
    sessionCount: number;
    revealedStepIndex?: number;
    questionsAsked?: number;
    stepStatuses?: Record<string, 'unanswered' | 'correct' | 'incorrect'>;
    stepInputs?: Record<string, string>;
    correctStepsCount?: number;
    totalSteps?: number;
    hintsUsed?: number;
    attemptsCount?: number;
    difficultyRating?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  sessionStart: Date;
  sessionEnd?: Date;
  contentAccessed: string[]; // Array of content IDs
  sessionData: {
    sessionId: string;
    totalTimeSpent: number;
    completedContent: string[];
    navigationContext: any;
    deviceInfo?: string;
    userAgent?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Firestore collection names
export const COLLECTIONS = {
  USER_PROFILES: 'userProfiles',
  CONTENT_PROGRESS: 'contentProgress',
  STUDY_SESSIONS: 'studySessions',
} as const;