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
  const achievements: Achievement[] = [];
  
  const contentData = lectures.flatMap(l => l.modules.flatMap(m => m.problems.map(p => ({ 
    problemId: p.id, 
    lectureId: l.id, 
    moduleId: m.id,
    lectureName: l.title,
    moduleName: m.name
  }))));
  
  const completedProblem = contentData.find(c => c.problemId === completedProblemId);
  if (!completedProblem) return achievements;
  
  const { lectureId, moduleId, lectureName, moduleName } = completedProblem;
  
  // Check if module is now complete
  const moduleProgress = getModuleProgress(lectureId, moduleId, allCompletedProblemIds);
  const previousModuleProgress = getModuleProgress(lectureId, moduleId, 
    allCompletedProblemIds.filter(id => id !== completedProblemId));
  
  if (moduleProgress.percentage === 100 && previousModuleProgress.percentage < 100) {
    // Module just completed
    const achievement: Achievement = {
      type: 'module_complete',
      moduleId,
      moduleName,
      lectureId,
      lectureName,
      timestamp: new Date().toISOString(),
      problemsCompleted: moduleProgress.total
    };
    
    achievements.push(achievement);
  }
  
  // Check if lecture is now complete
  const lectureProgress = getLectureProgress(lectureId, allCompletedProblemIds);
  const previousLectureProgress = getLectureProgress(lectureId, 
    allCompletedProblemIds.filter(id => id !== completedProblemId));
  
  if (lectureProgress.percentage === 100 && previousLectureProgress.percentage < 100) {
    // Lecture just completed
    const achievement: Achievement = {
      type: 'lecture_complete',
      lectureId,
      lectureName,
      timestamp: new Date().toISOString(),
      modulesCompleted: lectureProgress.moduleProgress.length,
      totalProblems: lectureProgress.total
    };
    
    achievements.push(achievement);
  }
  
  return achievements;
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