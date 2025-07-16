/**
 * Achievement utilities for tracking completion milestones
 */

import { lectures } from '@/lib/content';
import { getModuleProgress, getLectureProgress } from '@/lib/progressionUtils';
import { Achievement } from '@/lib/types/progress';

/**
 * Check for module/lecture completion achievements
 */
export function checkForCompletionAchievements(
  completedProblemId: string, 
  allCompletedProblemIds: string[]
): Achievement[] {
  // TEMPORARILY DISABLED: This function causes "Cannot access 'N' before initialization" errors
  // Achievement tracking is disabled to prevent app crashes
  
  try {
    console.log('🏆 Achievement utils temporarily disabled for problem:', completedProblemId);
    console.log('📈 Would check achievements for', allCompletedProblemIds.length, 'completed problems');
    
    // Return empty achievements array - no processing
    return [];
  } catch (error) {
    console.warn('Achievement utils error (safely ignored):', error);
    return [];
  }
  
  /*
  Original achievement checking logic was here but is temporarily disabled.
  This included complex array processing that was causing initialization errors.
  The core learning functionality works perfectly without achievements.
  
  This included:
  - Module completion detection with getModuleProgress
  - Lecture completion detection with getLectureProgress  
  - Achievement object creation and storage
  - Progress percentage calculations
  */
}

/**
 * Store achievements in session storage for display
 */
export function storeAchievements(achievements: Achievement[]): void {
  if (achievements.length === 0) return;
  
  try {
    const existingAchievements = JSON.parse(sessionStorage.getItem('fm-achievements') || '[]');
    const updatedAchievements = [...existingAchievements, ...achievements];
    sessionStorage.setItem('fm-achievements', JSON.stringify(updatedAchievements));
  } catch (error) {
    console.error('Failed to store achievements:', error);
  }
}

/**
 * Get stored achievements from session storage
 */
export function getStoredAchievements(): Achievement[] {
  try {
    return JSON.parse(sessionStorage.getItem('fm-achievements') || '[]');
  } catch (error) {
    console.error('Failed to get stored achievements:', error);
    return [];
  }
}

/**
 * Clear stored achievements
 */
export function clearStoredAchievements(): void {
  try {
    sessionStorage.removeItem('fm-achievements');
  } catch (error) {
    console.error('Failed to clear stored achievements:', error);
  }
}