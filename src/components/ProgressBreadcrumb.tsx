"use client";

import { ChevronRight, BookOpen, Target, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  ProgressIndicator, 
  EnhancedProgress, 
  ProgressRing,
  ProgressCard 
} from "@/components/ui/enhanced-progress";
import { 
  createProgressData, 
  formatProgressText, 
  getProgressColor,
  getProgressStatus 
} from "@/lib/utils/progressUtils";
import type { Lecture, ModuleContent, Problem } from "@/lib/types";

interface ProgressBreadcrumbProps {
  lecture: Lecture;
  module: ModuleContent;
  problem: Problem;
  problemIndex: number;
  moduleProgress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  lectureProgress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  curriculumProgress?: {
    completed: number;
    total: number;
    percentage: number;
  };
}

export function ProgressBreadcrumb({
  lecture,
  module,
  problem,
  problemIndex,
  moduleProgress,
  lectureProgress,
  curriculumProgress
}: ProgressBreadcrumbProps) {
  // Enhanced progress data
  const moduleProgressData = moduleProgress ? createProgressData(moduleProgress.completed, moduleProgress.total) : null;
  const lectureProgressData = lectureProgress ? createProgressData(lectureProgress.completed, lectureProgress.total) : null;
  const curriculumProgressData = curriculumProgress ? createProgressData(curriculumProgress.completed, curriculumProgress.total) : null;
  
  const isModuleCompleted = moduleProgressData?.percentage === 100;
  const isLectureCompleted = lectureProgressData?.percentage === 100;
  const isCurriculumCompleted = curriculumProgressData?.percentage === 100;
  
  return (
    <div className="space-y-3">
      {/* Main breadcrumb navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ProgressIndicator 
          status={isLectureCompleted ? "completed" : lectureProgressData?.percentage ? "in-progress" : "not-started"} 
          size="sm" 
        />
        <BookOpen className="h-4 w-4" />
        <span className="font-medium text-foreground">{lecture.title}</span>
        <ChevronRight className="h-4 w-4" />
        <ProgressIndicator 
          status={isModuleCompleted ? "completed" : moduleProgressData?.percentage ? "in-progress" : "not-started"} 
          size="sm" 
        />
        <span className="font-medium text-foreground">{module.name}</span>
        <ChevronRight className="h-4 w-4" />
        <ProgressIndicator 
          status="in-progress" 
          size="sm" 
          animated={true}
        />
        <span className="text-primary font-medium">Problem {problemIndex + 1} of {module.problems.length}</span>
      </div>

      {/* Progress indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Module progress */}
        {moduleProgressData && (
          <ProgressCard
            title="Module Progress"
            value={moduleProgressData.completed}
            max={moduleProgressData.total}
            icon={<Target className="h-4 w-4 text-blue-600" />}
            variant={isModuleCompleted ? "success" : "default"}
            size="sm"
            isComplete={isModuleCompleted}
          />
        )}

        {/* Lecture progress */}
        {lectureProgressData && (
          <ProgressCard
            title="Lecture Progress"
            value={lectureProgressData.completed}
            max={lectureProgressData.total}
            icon={<BookOpen className="h-4 w-4 text-purple-600" />}
            variant={isLectureCompleted ? "success" : "default"}
            size="sm"
            isComplete={isLectureCompleted}
          />
        )}

        {/* Overall curriculum progress */}
        {curriculumProgressData && (
          <ProgressCard
            title="Overall Progress"
            value={curriculumProgressData.completed}
            max={curriculumProgressData.total}
            icon={<Target className="h-4 w-4 text-green-600" />}
            variant={isCurriculumCompleted ? "success" : "default"}
            size="sm"
            isComplete={isCurriculumCompleted}
          />
        )}
      </div>

      {/* Current problem context */}
      <div className="bg-muted/50 rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ProgressRing 
              value={problemIndex + 1} 
              max={module.problems.length} 
              size={32} 
              strokeWidth={3}
              variant="info"
              showText={false}
            />
            <div>
              <h4 className="font-medium text-sm flex items-center gap-2">
                <ProgressIndicator status="in-progress" size="sm" animated={true} />
                Current Problem
              </h4>
              <p className="text-xs text-muted-foreground">{problem.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {problem.steps.length} steps
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {problemIndex + 1}/{module.problems.length}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}