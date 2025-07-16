import { lectures } from '@/lib/content';
import type { Problem } from '@/lib/types';

export interface ProgressionState {
  type: 'continue' | 'module_complete' | 'lecture_complete' | 'curriculum_complete';
  currentPosition: {
    lectureId: string;
    moduleId: string;
    problemIndex: number;
  };
  nextPosition?: {
    lectureId: string;
    moduleId: string;
    problemIndex: number;
  };
  completedInfo?: {
    moduleName?: string;
    moduleDescription?: string;
    problemsCompleted?: number;
    totalProblems?: number;
    lectureTitle?: string;
    modulesCompleted?: number;
    totalModules?: number;
    totalProblemsCompleted?: number;
    nextModuleName?: string;
    nextLectureTitle?: string;
    totalLectures?: number;
  };
}

export function calculateProgression(
  currentLectureId: string,
  currentModuleId: string,
  currentProblemIndex: number
): ProgressionState {
  // Find current lecture, module, and problem
  const currentLecture = lectures.find(l => l.id === currentLectureId);
  if (!currentLecture) {
    throw new Error('Current lecture not found');
  }

  const currentModule = currentLecture.modules.find(m => m.id === currentModuleId);
  if (!currentModule) {
    throw new Error('Current module not found');
  }

  const currentPosition = { lectureId: currentLectureId, moduleId: currentModuleId, problemIndex: currentProblemIndex };

  // Check if there's a next problem in the current module
  const nextProblemIndex = currentProblemIndex + 1;
  if (nextProblemIndex < currentModule.problems.length) {
    return {
      type: 'continue',
      currentPosition,
      nextPosition: {
        lectureId: currentLectureId,
        moduleId: currentModuleId,
        problemIndex: nextProblemIndex
      }
    };
  }

  // Current problem is the last in the module - check for next module
  const currentModuleIndex = currentLecture.modules.findIndex(m => m.id === currentModuleId);
  const nextModuleIndex = currentModuleIndex + 1;

  if (nextModuleIndex < currentLecture.modules.length) {
    // There's a next module in the current lecture
    const nextModule = currentLecture.modules[nextModuleIndex];
    
    return {
      type: 'module_complete',
      currentPosition,
      nextPosition: {
        lectureId: currentLectureId,
        moduleId: nextModule.id,
        problemIndex: 0
      },
      completedInfo: {
        moduleName: currentModule.name,
        moduleDescription: currentModule.description,
        problemsCompleted: currentModule.problems.length,
        totalProblems: currentModule.problems.length,
        nextModuleName: nextModule.name
      }
    };
  }

  // Current module is the last in the lecture - check for next lecture
  const currentLectureIndex = lectures.findIndex(l => l.id === currentLectureId);
  const nextLectureIndex = currentLectureIndex + 1;

  if (nextLectureIndex < lectures.length) {
    // There's a next lecture
    const nextLecture = lectures[nextLectureIndex];
    const nextModule = nextLecture.modules[0];
    
    return {
      type: 'lecture_complete',
      currentPosition,
      nextPosition: {
        lectureId: nextLecture.id,
        moduleId: nextModule.id,
        problemIndex: 0
      },
      completedInfo: {
        lectureTitle: currentLecture.title,
        modulesCompleted: currentLecture.modules.length,
        totalModules: currentLecture.modules.length,
        totalProblemsCompleted: currentLecture.modules.reduce((sum, m) => sum + m.problems.length, 0),
        nextLectureTitle: nextLecture.title
      }
    };
  }

  // This is the last problem in the entire curriculum
  const totalProblems = lectures.reduce((sum, l) => sum + l.modules.reduce((mSum, m) => mSum + m.problems.length, 0), 0);
  const totalModules = lectures.reduce((sum, l) => sum + l.modules.length, 0);
  
  return {
    type: 'curriculum_complete',
    currentPosition,
    completedInfo: {
      totalProblems,
      totalModules,
      totalLectures: lectures.length
    }
  };
}

export function getModuleProgress(
  lectureId: string,
  moduleId: string,
  completedProblems: string[]
): { completed: number; total: number; percentage: number } {
  const lecture = lectures.find(l => l.id === lectureId);
  if (!lecture) return { completed: 0, total: 0, percentage: 0 };

  const module = lecture.modules.find(m => m.id === moduleId);
  if (!module) return { completed: 0, total: 0, percentage: 0 };

  const total = module.problems.length;
  const completed = module.problems.filter(p => completedProblems.includes(p.id)).length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return { completed, total, percentage };
}

export function getLectureProgress(
  lectureId: string,
  completedProblems: string[]
): { completed: number; total: number; percentage: number; moduleProgress: Array<{moduleId: string; completed: number; total: number; percentage: number}> } {
  const lecture = lectures.find(l => l.id === lectureId);
  if (!lecture) return { completed: 0, total: 0, percentage: 0, moduleProgress: [] };

  const moduleProgress = lecture.modules.map(module => {
    const total = module.problems.length;
    const completed = module.problems.filter(p => completedProblems.includes(p.id)).length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    
    return {
      moduleId: module.id,
      completed,
      total,
      percentage
    };
  });

  const totalProblems = lecture.modules.reduce((sum, m) => sum + m.problems.length, 0);
  const completedCount = moduleProgress.reduce((sum, mp) => sum + mp.completed, 0);
  const percentage = totalProblems > 0 ? (completedCount / totalProblems) * 100 : 0;

  return {
    completed: completedCount,
    total: totalProblems,
    percentage,
    moduleProgress
  };
}

export function getCurriculumProgress(
  completedProblems: string[]
): { 
  completed: number; 
  total: number; 
  percentage: number; 
  lectureProgress: Array<{
    lectureId: string; 
    completed: number; 
    total: number; 
    percentage: number;
    moduleProgress: Array<{moduleId: string; completed: number; total: number; percentage: number}>
  }> 
} {
  const lectureProgress = lectures.map(lecture => {
    const lectureStats = getLectureProgress(lecture.id, completedProblems);
    return {
      lectureId: lecture.id,
      ...lectureStats
    };
  });

  const totalProblems = lectures.reduce((sum, l) => sum + l.modules.reduce((mSum, m) => mSum + m.problems.length, 0), 0);
  const completedCount = completedProblems.length;
  const percentage = totalProblems > 0 ? (completedCount / totalProblems) * 100 : 0;

  return {
    completed: completedCount,
    total: totalProblems,
    percentage,
    lectureProgress
  };
}

export function getNextIncompleteContent(
  completedProblems: string[]
): { lectureId: string; moduleId: string; problemIndex: number; problem: Problem } | null {
  for (const lecture of lectures) {
    for (const module of lecture.modules) {
      for (let i = 0; i < module.problems.length; i++) {
        const problem = module.problems[i];
        if (!completedProblems.includes(problem.id)) {
          return {
            lectureId: lecture.id,
            moduleId: module.id,
            problemIndex: i,
            problem
          };
        }
      }
    }
  }
  return null;
}

export function findContentPosition(
  problemId: string
): { lectureId: string; moduleId: string; problemIndex: number } | null {
  for (const lecture of lectures) {
    for (const module of lecture.modules) {
      const problemIndex = module.problems.findIndex(p => p.id === problemId);
      if (problemIndex !== -1) {
        return {
          lectureId: lecture.id,
          moduleId: module.id,
          problemIndex
        };
      }
    }
  }
  return null;
}