/**
 * Progress Service Layer
 * Handles all storage operations and data validation for the progress system
 */

import { 
  ProgressData, 
  ContentProgress, 
  ExampleProgress, 
  ProblemProgress,
  ProgressUpdate,
  LegacyMasteryData,
  MigrationStatus,
  Achievement,
  STORAGE_KEYS,
  CURRENT_DATA_VERSION,
  DEFAULT_PROGRESS_DATA,
  ContentType,
  StepStatus
} from '@/lib/types/progress';

/**
 * Progress Service class that handles all storage operations
 */
export class ProgressService {
  private static instance: ProgressService;
  private progressData: ProgressData;
  private isInitialized = false;
  private subscribers: Set<(data: ProgressData) => void> = new Set();

  private constructor() {
    this.progressData = { ...DEFAULT_PROGRESS_DATA };
  }

  /**
   * Singleton pattern - get the single instance of ProgressService
   */
  static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  /**
   * Initialize the progress service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Check if migration is needed
      const migrationStatus = this.getMigrationStatus();
      if (!migrationStatus.isCompleted) {
        await this.performMigration();
      }

      // Load current progress data
      await this.loadProgressData();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize progress service:', error);
      this.progressData = { ...DEFAULT_PROGRESS_DATA };
      this.isInitialized = true;
    }
  }

  /**
   * Subscribe to progress data changes
   */
  subscribe(callback: (data: ProgressData) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  /**
   * Notify all subscribers of data changes
   */
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.progressData));
  }

  /**
   * Get current progress data
   */
  getProgressData(): ProgressData {
    return { ...this.progressData };
  }

  /**
   * Get progress for specific content
   */
  getContentProgress(contentId: string): ContentProgress | null {
    if (!contentId || typeof contentId !== 'string') {
      console.error('Invalid contentId provided to getContentProgress');
      return null;
    }
    
    try {
      return this.progressData.contentProgress[contentId] || null;
    } catch (error) {
      console.error('Error getting content progress:', error);
      return null;
    }
  }

  /**
   * Update progress for specific content
   */
  updateContentProgress(
    contentId: string,
    contentType: ContentType,
    updates: ProgressUpdate,
    moduleId?: string,
    lectureId?: string
  ): void {
    // Validate input parameters
    if (!contentId || typeof contentId !== 'string') {
      console.error('Invalid contentId provided to updateContentProgress');
      return;
    }
    
    if (!contentType || !['example', 'problem'].includes(contentType)) {
      console.error('Invalid contentType provided to updateContentProgress');
      return;
    }
    
    if (!updates || typeof updates !== 'object') {
      console.error('Invalid updates provided to updateContentProgress');
      return;
    }
    
    try {
      const existing = this.progressData.contentProgress[contentId];
    
      // Create new progress entry if it doesn't exist
      if (!existing) {
        this.progressData.contentProgress[contentId] = this.createNewContentProgress(
          contentId,
          contentType,
          updates,
          moduleId,
          lectureId
        );
      } else {
        // Update existing progress
        this.progressData.contentProgress[contentId] = this.mergeProgressUpdate(
          existing,
          updates
        );
        
        // Update module and lecture IDs if provided
        if (moduleId && lectureId) {
          this.progressData.contentProgress[contentId].moduleId = moduleId;
          this.progressData.contentProgress[contentId].lectureId = lectureId;
        }
      }

      // Recalculate overall stats
      this.recalculateOverallStats();
      
      // Check for achievements
      if (updates.isCompleted) {
        this.checkForAchievements(contentId, contentType);
      }

      // Save to localStorage
      this.saveProgressData();
      this.notifySubscribers();
    } catch (error) {
      console.error('Error updating content progress:', error);
      // Don't throw - just log the error and continue
    }
  }

  /**
   * Mark content as complete
   */
  markContentComplete(contentId: string, contentType: ContentType): void {
    this.updateContentProgress(contentId, contentType, { isCompleted: true });
  }

  /**
   * Track content access
   */
  trackContentAccess(contentId: string): void {
    if (!contentId || typeof contentId !== 'string') {
      console.error('Invalid contentId provided to trackContentAccess');
      return;
    }
    
    try {
      const existing = this.progressData.contentProgress[contentId];
      if (existing) {
        existing.lastAccessedAt = new Date();
        existing.sessionCount += 1;
      }

      // Add to current session
      if (!this.progressData.sessionData.currentSessionContent.includes(contentId)) {
        this.progressData.sessionData.currentSessionContent.push(contentId);
      }

      this.saveProgressData();
      this.notifySubscribers();
    } catch (error) {
      console.error('Error tracking content access:', error);
    }
  }

  /**
   * Start a new session
   */
  startSession(): void {
    this.progressData.sessionData.currentSessionStart = new Date();
    this.progressData.sessionData.currentSessionContent = [];
    this.progressData.sessionData.dailyGoalProgress = 0;
    
    this.saveProgressData();
    this.notifySubscribers();
  }

  /**
   * Update user preferences
   */
  updateUserPreferences(preferences: Partial<typeof DEFAULT_PROGRESS_DATA.userPreferences>): void {
    this.progressData.userPreferences = {
      ...this.progressData.userPreferences,
      ...preferences,
    };
    
    this.saveProgressData();
    this.notifySubscribers();
  }

  /**
   * Reset all progress data
   */
  resetProgress(): void {
    this.progressData = { ...DEFAULT_PROGRESS_DATA };
    this.clearAllStorageKeys();
    this.saveProgressData();
    this.notifySubscribers();
  }

  /**
   * Get completed problem IDs (for backward compatibility)
   */
  getCompletedProblemIds(): string[] {
    return Object.keys(this.progressData.contentProgress).filter(
      contentId => {
        const progress = this.progressData.contentProgress[contentId];
        return progress.isCompleted && progress.contentType === 'problem';
      }
    );
  }

  /**
   * Get step statuses for a problem (for backward compatibility)
   */
  getStepStatuses(problemId: string): Record<string, StepStatus> {
    if (!problemId || typeof problemId !== 'string') {
      console.error('Invalid problemId provided to getStepStatuses');
      return {};
    }
    
    try {
      const progress = this.progressData.contentProgress[problemId];
      if (progress && progress.contentType === 'problem') {
        return (progress as ProblemProgress).stepStatuses || {};
      }
      return {};
    } catch (error) {
      console.error('Error getting step statuses:', error);
      return {};
    }
  }

  /**
   * Get step inputs for a problem (for backward compatibility)
   */
  getStepInputs(problemId: string): Record<string, string> {
    if (!problemId || typeof problemId !== 'string') {
      console.error('Invalid problemId provided to getStepInputs');
      return {};
    }
    
    try {
      const progress = this.progressData.contentProgress[problemId];
      if (progress && progress.contentType === 'problem') {
        return (progress as ProblemProgress).stepInputs || {};
      }
      return {};
    } catch (error) {
      console.error('Error getting step inputs:', error);
      return {};
    }
  }

  /**
   * Merge progress data from external source (like Firebase)
   */
  mergeExternalProgressData(externalData: ProgressData): void {
    // Merge content progress, preferring more recent updates
    for (const [contentId, externalProgress] of Object.entries(externalData.contentProgress)) {
      const localProgress = this.progressData.contentProgress[contentId];
      
      if (!localProgress || 
          (externalProgress.lastAccessedAt && 
           new Date(externalProgress.lastAccessedAt) > new Date(localProgress.lastAccessedAt))) {
        this.progressData.contentProgress[contentId] = externalProgress;
      }
    }

    // Merge overall stats (prefer external if more recent)
    if (externalData.overallStats.lastStudyDate > this.progressData.overallStats.lastStudyDate) {
      this.progressData.overallStats = externalData.overallStats;
    }

    // Merge user preferences
    this.progressData.userPreferences = {
      ...this.progressData.userPreferences,
      ...externalData.userPreferences,
    };

    // Update last sync time
    this.progressData.lastSyncedAt = new Date();

    this.saveProgressData();
    this.notifySubscribers();
  }

  /**
   * Private helper methods
   */

  private createNewContentProgress(
    contentId: string,
    contentType: ContentType,
    updates: ProgressUpdate,
    moduleId?: string,
    lectureId?: string
  ): ContentProgress {
    const baseProgress = {
      contentId,
      contentType,
      moduleId: moduleId || '',
      lectureId: lectureId || '',
      isStarted: true,
      isCompleted: updates.isCompleted || false,
      completedAt: updates.isCompleted ? new Date() : undefined,
      lastAccessedAt: new Date(),
      timeSpent: updates.timeSpent || 0,
      sessionCount: 1,
      hintsUsed: updates.hintsUsed || 0,
      attemptsCount: updates.attemptsCount || 0,
      difficultyRating: updates.difficultyRating,
    };

    if (contentType === 'example') {
      return {
        ...baseProgress,
        contentType: 'example',
        revealedStepIndex: updates.revealedStepIndex || 0,
        questionsAsked: updates.questionsAsked || 0,
      } as ExampleProgress;
    } else {
      return {
        ...baseProgress,
        contentType: 'problem',
        stepStatuses: updates.stepStatuses || {},
        stepInputs: updates.stepInputs || {},
        correctStepsCount: updates.correctStepsCount || 0,
        totalSteps: updates.totalSteps || 0,
      } as ProblemProgress;
    }
  }

  private mergeProgressUpdate(
    existing: ContentProgress,
    updates: ProgressUpdate
  ): ContentProgress {
    const merged = {
      ...existing,
      lastAccessedAt: new Date(),
      timeSpent: existing.timeSpent + (updates.timeSpent || 0),
      hintsUsed: existing.hintsUsed + (updates.hintsUsed || 0),
      attemptsCount: existing.attemptsCount + (updates.attemptsCount || 0),
      isCompleted: updates.isCompleted !== undefined ? updates.isCompleted : existing.isCompleted,
      completedAt: updates.isCompleted ? new Date() : existing.completedAt,
      difficultyRating: updates.difficultyRating || existing.difficultyRating,
    };

    if (existing.contentType === 'example') {
      return {
        ...merged,
        revealedStepIndex: updates.revealedStepIndex !== undefined ? updates.revealedStepIndex : (existing as ExampleProgress).revealedStepIndex,
        questionsAsked: (existing as ExampleProgress).questionsAsked + (updates.questionsAsked || 0),
      } as ExampleProgress;
    } else {
      return {
        ...merged,
        stepStatuses: updates.stepStatuses || (existing as ProblemProgress).stepStatuses,
        stepInputs: updates.stepInputs || (existing as ProblemProgress).stepInputs,
        correctStepsCount: updates.correctStepsCount !== undefined ? updates.correctStepsCount : (existing as ProblemProgress).correctStepsCount,
        totalSteps: updates.totalSteps !== undefined ? updates.totalSteps : (existing as ProblemProgress).totalSteps,
      } as ProblemProgress;
    }
  }

  private recalculateOverallStats(): void {
    const allProgress = Object.values(this.progressData.contentProgress);
    const completedCount = allProgress.filter(p => p.isCompleted).length;
    const totalTime = allProgress.reduce((sum, p) => sum + p.timeSpent, 0);
    const totalSessions = allProgress.reduce((sum, p) => sum + p.sessionCount, 0);

    // Calculate streak days
    const today = new Date();
    const lastStudy = this.progressData.overallStats.lastStudyDate;
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const lastStudyDate = new Date(lastStudy.getFullYear(), lastStudy.getMonth(), lastStudy.getDate());
    const daysDiff = Math.floor((todayDate.getTime() - lastStudyDate.getTime()) / (1000 * 60 * 60 * 24));

    let streakDays = this.progressData.overallStats.streakDays;
    if (daysDiff === 0) {
      // Same day, maintain streak
      streakDays = this.progressData.overallStats.streakDays;
    } else if (daysDiff === 1) {
      // Next day, increment streak
      streakDays = this.progressData.overallStats.streakDays + 1;
    } else if (daysDiff > 1) {
      // Missed days, reset streak
      streakDays = 1;
    }

    this.progressData.overallStats = {
      totalTimeSpent: totalTime,
      completedContent: completedCount,
      totalContent: allProgress.length,
      streakDays,
      lastStudyDate: today,
      completionPercentage: allProgress.length > 0 ? (completedCount / allProgress.length) * 100 : 0,
      averageSessionTime: totalSessions > 0 ? totalTime / totalSessions : 0,
      totalSessions,
    };
  }

  private checkForAchievements(contentId: string, contentType: ContentType): void {
    if (contentType !== 'problem') return;

    // This would integrate with the existing achievement system
    // For now, we'll just trigger the existing achievement check
    const completedProblemIds = this.getCompletedProblemIds();
    this.triggerAchievementCheck(contentId, completedProblemIds);
  }

  private triggerAchievementCheck(completedProblemId: string, allCompletedProblemIds: string[]): void {
    try {
      import('@/lib/utils/achievementUtils').then(({ checkForCompletionAchievements, storeAchievements }) => {
        const achievements = checkForCompletionAchievements(completedProblemId, allCompletedProblemIds);
        storeAchievements(achievements);
      });
    } catch (error) {
      console.error('Failed to check achievements:', error);
    }
  }

  private async loadProgressData(): Promise<void> {
    try {
      const savedData = localStorage.getItem(STORAGE_KEYS.UNIFIED_PROGRESS);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        
        // Convert date strings back to Date objects
        this.deserializeDates(parsed);
        
        // Validate data structure
        if (this.validateProgressData(parsed)) {
          this.progressData = parsed;
        } else {
          console.warn('Invalid progress data structure, using defaults');
          this.progressData = { ...DEFAULT_PROGRESS_DATA };
        }
      }
    } catch (error) {
      console.error('Failed to load progress data:', error);
      this.progressData = { ...DEFAULT_PROGRESS_DATA };
    }
  }

  private saveProgressData(): void {
    try {
      // Validate data before saving
      if (!this.progressData || typeof this.progressData !== 'object') {
        console.error('Invalid progress data structure, cannot save');
        return;
      }
      
      const serializedData = JSON.stringify(this.progressData);
      
      // Check if localStorage is available
      if (typeof localStorage === 'undefined') {
        console.warn('localStorage is not available, cannot save progress data');
        return;
      }
      
      localStorage.setItem(STORAGE_KEYS.UNIFIED_PROGRESS, serializedData);
    } catch (error) {
      // Handle quota exceeded errors
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded, cannot save progress data');
        // Could implement cleanup of old data here
      } else {
        console.error('Failed to save progress data:', error);
      }
    }
  }

  private deserializeDates(data: any): void {
    if (!data || typeof data !== 'object') {
      console.error('Invalid data provided to deserializeDates');
      return;
    }
    
    try {
      // Convert date strings back to Date objects
      Object.values(data.contentProgress || {}).forEach((progress: any) => {
        if (progress?.completedAt) {
          try {
            progress.completedAt = new Date(progress.completedAt);
            // Validate the date
            if (isNaN(progress.completedAt.getTime())) {
              progress.completedAt = undefined;
            }
          } catch (error) {
            console.warn('Invalid completedAt date:', progress.completedAt);
            progress.completedAt = undefined;
          }
        }
        if (progress?.lastAccessedAt) {
          try {
            progress.lastAccessedAt = new Date(progress.lastAccessedAt);
            // Validate the date
            if (isNaN(progress.lastAccessedAt.getTime())) {
              progress.lastAccessedAt = new Date();
            }
          } catch (error) {
            console.warn('Invalid lastAccessedAt date:', progress.lastAccessedAt);
            progress.lastAccessedAt = new Date();
          }
        }
      });
      
      if (data.overallStats?.lastStudyDate) {
        try {
          data.overallStats.lastStudyDate = new Date(data.overallStats.lastStudyDate);
          if (isNaN(data.overallStats.lastStudyDate.getTime())) {
            data.overallStats.lastStudyDate = new Date();
          }
        } catch (error) {
          console.warn('Invalid lastStudyDate:', data.overallStats.lastStudyDate);
          data.overallStats.lastStudyDate = new Date();
        }
      }
      
      if (data.sessionData?.currentSessionStart) {
        try {
          data.sessionData.currentSessionStart = new Date(data.sessionData.currentSessionStart);
          if (isNaN(data.sessionData.currentSessionStart.getTime())) {
            data.sessionData.currentSessionStart = undefined;
          }
        } catch (error) {
          console.warn('Invalid currentSessionStart:', data.sessionData.currentSessionStart);
          data.sessionData.currentSessionStart = undefined;
        }
      }
      
      if (data.lastSyncedAt) {
        try {
          data.lastSyncedAt = new Date(data.lastSyncedAt);
          if (isNaN(data.lastSyncedAt.getTime())) {
            data.lastSyncedAt = undefined;
          }
        } catch (error) {
          console.warn('Invalid lastSyncedAt:', data.lastSyncedAt);
          data.lastSyncedAt = undefined;
        }
      }
    } catch (error) {
      console.error('Error deserializing dates:', error);
    }
  }

  private validateProgressData(data: any): boolean {
    return (
      data &&
      typeof data === 'object' &&
      data.contentProgress &&
      typeof data.contentProgress === 'object' &&
      data.overallStats &&
      typeof data.overallStats === 'object' &&
      data.userPreferences &&
      typeof data.userPreferences === 'object' &&
      data.sessionData &&
      typeof data.sessionData === 'object' &&
      data.version &&
      typeof data.version === 'string'
    );
  }

  private getMigrationStatus(): MigrationStatus {
    try {
      const savedStatus = localStorage.getItem(STORAGE_KEYS.MIGRATION_STATUS);
      if (savedStatus) {
        const parsed = JSON.parse(savedStatus);
        return {
          ...parsed,
          timestamp: new Date(parsed.timestamp),
        };
      }
    } catch (error) {
      console.error('Failed to load migration status:', error);
    }

    return {
      isCompleted: false,
      version: '0.0.0',
      timestamp: new Date(),
      migratedDataSources: [],
    };
  }

  private async performMigration(): Promise<void> {
    console.log('Starting data migration...');
    
    const migratedData: Record<string, ContentProgress> = {};
    const migratedSources: string[] = [];

    // Migrate old mastery data
    const oldMasteryData = localStorage.getItem(STORAGE_KEYS.MASTERY_DATA);
    if (oldMasteryData) {
      try {
        const masteryData: LegacyMasteryData = JSON.parse(oldMasteryData);
        Object.values(masteryData.examples || {}).forEach(example => {
          migratedData[example.exampleId] = {
            contentId: example.exampleId,
            contentType: 'example',
            moduleId: '', // Will be filled by the calling code
            lectureId: '',
            isStarted: example.revealedStepIndex > 0,
            isCompleted: !!example.completedAt,
            completedAt: example.completedAt,
            lastAccessedAt: example.lastAccessedAt,
            timeSpent: example.timeSpent || 0,
            sessionCount: 1,
            hintsUsed: 0,
            attemptsCount: 0,
            revealedStepIndex: example.revealedStepIndex || 0,
            questionsAsked: example.questionsAsked || 0,
          } as ExampleProgress;
        });
        migratedSources.push('legacy-mastery-data');
      } catch (error) {
        console.error('Failed to migrate mastery data:', error);
      }
    }

    // Migrate step data
    const stepDataKeys = Object.keys(localStorage).filter(key => 
      key.startsWith(STORAGE_KEYS.STEP_INPUTS_PREFIX) || 
      key.startsWith(STORAGE_KEYS.STEP_STATUSES_PREFIX)
    );

    stepDataKeys.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        if (!value) return;

        const data = JSON.parse(value);
        const match = key.match(/^fm-(stepInputs|stepStatuses)-(.+)$/);
        if (!match || match.length < 3) return;

        const type = match[1];
        const problemId = match[2];
        
        if (!migratedData[problemId]) {
          migratedData[problemId] = {
            contentId: problemId,
            contentType: 'problem',
            moduleId: '',
            lectureId: '',
            isStarted: true,
            isCompleted: false,
            lastAccessedAt: new Date(),
            timeSpent: 0,
            sessionCount: 1,
            hintsUsed: 0,
            attemptsCount: 0,
            stepStatuses: {},
            stepInputs: {},
            correctStepsCount: 0,
            totalSteps: 0,
          } as ProblemProgress;
        }

        const progress = migratedData[problemId] as ProblemProgress;
        if (type === 'stepInputs') {
          progress.stepInputs = data;
        } else if (type === 'stepStatuses') {
          progress.stepStatuses = data;
          progress.correctStepsCount = Object.values(data).filter(status => status === 'correct').length;
          progress.isCompleted = progress.correctStepsCount > 0;
        }

        migratedSources.push(`step-data-${problemId}`);
      } catch (error) {
        console.error(`Failed to migrate ${key}:`, error);
      }
    });

    // Save migrated data
    if (Object.keys(migratedData).length > 0) {
      this.progressData.contentProgress = migratedData;
      this.recalculateOverallStats();
      this.saveProgressData();
    }

    // Mark migration as complete
    const migrationStatus: MigrationStatus = {
      isCompleted: true,
      version: CURRENT_DATA_VERSION,
      timestamp: new Date(),
      migratedDataSources: migratedSources,
    };

    localStorage.setItem(STORAGE_KEYS.MIGRATION_STATUS, JSON.stringify(migrationStatus));
    
    // Clean up old storage keys after successful migration
    setTimeout(() => {
      this.cleanupLegacyStorageKeys();
    }, 1000);
    
    console.log(`Migration completed. Migrated ${Object.keys(migratedData).length} items from ${migratedSources.length} sources.`);
  }

  private clearAllStorageKeys(): void {
    // Clear all storage keys
    Object.values(STORAGE_KEYS).forEach(key => {
      if (typeof key === 'string') {
        localStorage.removeItem(key);
      }
    });

    // Clear legacy step data
    this.cleanupLegacyStorageKeys();
  }

  private cleanupLegacyStorageKeys(): void {
    try {
      // Clear legacy mastery data
      localStorage.removeItem(STORAGE_KEYS.MASTERY_DATA);
      localStorage.removeItem(STORAGE_KEYS.OLD_MIGRATION_KEY);

      // Clear legacy step data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_KEYS.STEP_INPUTS_PREFIX) || 
            key.startsWith(STORAGE_KEYS.STEP_STATUSES_PREFIX)) {
          localStorage.removeItem(key);
        }
      });

      console.log('Legacy storage keys cleaned up');
    } catch (error) {
      console.error('Error cleaning up legacy storage keys:', error);
    }
  }
}

// Export singleton instance
export const progressService = ProgressService.getInstance();