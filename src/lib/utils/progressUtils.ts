/**
 * Progress Utility Functions
 * Provides consistent progress calculations and formatting throughout the application
 */

export interface ProgressData {
  completed: number;
  total: number;
  percentage: number;
}

export interface ProgressStatus {
  status: "not-started" | "in-progress" | "completed";
  progress: ProgressData;
}

export interface StepProgress {
  stepId: string;
  status: "unanswered" | "correct" | "incorrect";
  attempts: number;
  timeSpent: number;
}

export interface ProblemProgressData {
  problemId: string;
  steps: StepProgress[];
  isCompleted: boolean;
  completionPercentage: number;
  timeSpent: number;
}

/**
 * Calculate progress percentage with proper rounding
 */
export function calculatePercentage(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Create standardized progress data structure
 */
export function createProgressData(completed: number, total: number): ProgressData {
  return {
    completed,
    total,
    percentage: calculatePercentage(completed, total)
  };
}

/**
 * Determine progress status based on completion
 */
export function getProgressStatus(completed: number, total: number): ProgressStatus {
  const progress = createProgressData(completed, total);
  
  let status: "not-started" | "in-progress" | "completed";
  if (completed === 0) {
    status = "not-started";
  } else if (completed === total) {
    status = "completed";
  } else {
    status = "in-progress";
  }
  
  return { status, progress };
}

/**
 * Calculate step-by-step progress for a problem
 */
export function calculateStepProgress(
  stepStatuses: Record<string, "unanswered" | "correct" | "incorrect">,
  totalSteps: number
): ProgressData {
  const completedSteps = Object.values(stepStatuses).filter(status => status === "correct").length;
  return createProgressData(completedSteps, totalSteps);
}

/**
 * Calculate problem progress from step statuses
 */
export function calculateProblemProgress(
  problemId: string,
  stepStatuses: Record<string, "unanswered" | "correct" | "incorrect">,
  totalSteps: number
): ProblemProgressData {
  const steps: StepProgress[] = [];
  let completedSteps = 0;
  let totalTimeSpent = 0;
  
  // Extract step progress from status records
  for (let i = 0; i < totalSteps; i++) {
    const stepKey = `${problemId}-step-${i}`;
    const status = stepStatuses[stepKey] || "unanswered";
    
    if (status === "correct") {
      completedSteps++;
    }
    
    steps.push({
      stepId: stepKey,
      status,
      attempts: 1, // This could be expanded to track actual attempts
      timeSpent: 0, // This could be expanded to track actual time
    });
  }
  
  return {
    problemId,
    steps,
    isCompleted: completedSteps === totalSteps,
    completionPercentage: calculatePercentage(completedSteps, totalSteps),
    timeSpent: totalTimeSpent,
  };
}

/**
 * Format progress text for display
 */
export function formatProgressText(progress: ProgressData, showPercentage: boolean = true): string {
  const baseText = `${progress.completed}/${progress.total}`;
  return showPercentage ? `${baseText} (${progress.percentage}%)` : baseText;
}

/**
 * Get progress color based on percentage
 */
export function getProgressColor(percentage: number): string {
  if (percentage === 100) return "text-green-600";
  if (percentage >= 75) return "text-blue-600";
  if (percentage >= 50) return "text-yellow-600";
  if (percentage >= 25) return "text-orange-600";
  return "text-red-600";
}

/**
 * Get progress variant for UI components
 */
export function getProgressVariant(percentage: number): "default" | "success" | "warning" | "error" {
  if (percentage === 100) return "success";
  if (percentage >= 75) return "default";
  if (percentage >= 50) return "warning";
  return "error";
}

/**
 * Calculate overall curriculum progress
 */
export function calculateCurriculumProgress(
  lectureProgresses: ProgressData[]
): ProgressData {
  const totalCompleted = lectureProgresses.reduce((sum, p) => sum + p.completed, 0);
  const totalItems = lectureProgresses.reduce((sum, p) => sum + p.total, 0);
  
  return createProgressData(totalCompleted, totalItems);
}

/**
 * Calculate module progress from problems
 */
export function calculateModuleProgress(
  problemProgresses: ProblemProgressData[]
): ProgressData {
  const completedProblems = problemProgresses.filter(p => p.isCompleted).length;
  return createProgressData(completedProblems, problemProgresses.length);
}

/**
 * Calculate lecture progress from modules
 */
export function calculateLectureProgress(
  moduleProgresses: ProgressData[]
): ProgressData {
  const totalCompleted = moduleProgresses.reduce((sum, p) => sum + p.completed, 0);
  const totalItems = moduleProgresses.reduce((sum, p) => sum + p.total, 0);
  
  return createProgressData(totalCompleted, totalItems);
}

/**
 * Get next incomplete item index
 */
export function getNextIncompleteIndex<T>(
  items: T[],
  isCompleted: (item: T) => boolean
): number {
  return items.findIndex(item => !isCompleted(item));
}

/**
 * Calculate time-based progress metrics
 */
export function calculateTimeMetrics(
  startTime: Date,
  endTime: Date | null = null,
  idealTime?: number
): {
  timeSpent: number; // in seconds
  isOverTime: boolean;
  timeEfficiency: number; // percentage
} {
  const actualEndTime = endTime || new Date();
  const timeSpent = Math.floor((actualEndTime.getTime() - startTime.getTime()) / 1000);
  
  if (!idealTime) {
    return {
      timeSpent,
      isOverTime: false,
      timeEfficiency: 100,
    };
  }
  
  const isOverTime = timeSpent > idealTime;
  const timeEfficiency = idealTime > 0 ? Math.min(100, (idealTime / timeSpent) * 100) : 100;
  
  return {
    timeSpent,
    isOverTime,
    timeEfficiency: Math.round(timeEfficiency),
  };
}

/**
 * Format time duration for display
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get mastery level based on progress and performance
 */
export function getMasteryLevel(
  completionPercentage: number,
  timeEfficiency: number,
  attempts: number
): "beginner" | "intermediate" | "advanced" | "expert" {
  if (completionPercentage === 100 && timeEfficiency >= 90 && attempts === 1) {
    return "expert";
  }
  if (completionPercentage >= 90 && timeEfficiency >= 75) {
    return "advanced";
  }
  if (completionPercentage >= 75 && timeEfficiency >= 50) {
    return "intermediate";
  }
  return "beginner";
}

/**
 * Calculate streak information
 */
export function calculateStreak(
  completedItems: boolean[]
): {
  currentStreak: number;
  longestStreak: number;
  streakPercentage: number;
} {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Calculate current streak from the end
  for (let i = completedItems.length - 1; i >= 0; i--) {
    if (completedItems[i]) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  // Calculate longest streak
  for (const completed of completedItems) {
    if (completed) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }
  
  const streakPercentage = completedItems.length > 0 
    ? (currentStreak / completedItems.length) * 100 
    : 0;
  
  return {
    currentStreak,
    longestStreak,
    streakPercentage: Math.round(streakPercentage),
  };
}

/**
 * Generate progress insights
 */
export function generateProgressInsights(
  progress: ProgressData,
  timeEfficiency: number,
  attempts: number
): string[] {
  const insights: string[] = [];
  
  if (progress.percentage === 100) {
    insights.push("🎉 Congratulations! You've completed all tasks!");
  } else if (progress.percentage >= 75) {
    insights.push("🌟 You're doing great! Almost there!");
  } else if (progress.percentage >= 50) {
    insights.push("💪 Keep going! You're halfway there!");
  } else if (progress.percentage >= 25) {
    insights.push("🚀 Good start! Build on this momentum!");
  } else {
    insights.push("🌱 Every expert was once a beginner. Keep learning!");
  }
  
  if (timeEfficiency >= 90) {
    insights.push("⚡ Excellent time management!");
  } else if (timeEfficiency >= 75) {
    insights.push("⏰ Good pacing on your learning!");
  } else if (timeEfficiency < 50) {
    insights.push("🐌 Take your time - understanding is more important than speed!");
  }
  
  if (attempts === 1 && progress.percentage >= 75) {
    insights.push("🎯 Great accuracy! You're getting it right the first time!");
  } else if (attempts > 3) {
    insights.push("💡 Remember: practice makes perfect!");
  }
  
  return insights;
}