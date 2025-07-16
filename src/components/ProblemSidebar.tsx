"use client";

import { lectures } from "@/lib/content";
import type { Lecture, ModuleContent, Problem } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { MathRenderer } from "./MathRenderer";
import { Separator } from "./ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Target, BookOpen, Clock, TrendingUp } from "lucide-react";
import { 
  ProgressCard, 
  ProgressIndicator, 
  EnhancedProgress,
  ProgressRing 
} from "@/components/ui/enhanced-progress";
import { 
  createProgressData, 
  getProgressStatus, 
  formatProgressText,
  getProgressColor 
} from "@/lib/utils/progressUtils";
import { useProgress } from "@/lib/hooks/useProgress";
import { getModuleProgress, getLectureProgress } from "@/lib/progressionUtils";
import { cn } from "@/lib/utils";

interface ProblemSidebarProps {
  currentLectureId: string;
  onLectureChange: (lectureId: string) => void;
  currentModuleId: string;
  onModuleChange: (moduleId: string) => void;
  currentProblemIndex: number;
  onProblemChange: (problemIndex: number) => void;
  isMobile?: boolean;
}

export function ProblemSidebar({
  currentLectureId,
  onLectureChange,
  currentModuleId,
  onModuleChange,
  currentProblemIndex,
  onProblemChange,
  isMobile = false
}: ProblemSidebarProps) {
  const { getCompletedProblemIds } = useProgress();

  const handleLectureSelect = (lectureId: string) => {
    onLectureChange(lectureId);
  }

  const handleModuleSelect = (moduleId: string) => {
    onModuleChange(moduleId);
  }
  
  const currentLecture = lectures.find(l => l.id === currentLectureId) as Lecture;
  const currentModule = currentLecture.modules.find(m => m.id === currentModuleId) as ModuleContent;
  
  const practiceProblems = currentModule.problems.filter(p => p.type === 'practice');
  
  // Get completed problems
  const completedProblems = getCompletedProblemIds();
  
  // Calculate progress for current module and lecture
  const moduleProgress = getModuleProgress(currentLectureId, currentModuleId, completedProblems);
  const lectureProgress = getLectureProgress(currentLectureId, completedProblems);
  
  // Enhanced progress data
  const moduleProgressData = createProgressData(moduleProgress.completed, moduleProgress.total);
  const lectureProgressData = createProgressData(lectureProgress.completed, lectureProgress.total);
  
  // Calculate problem completion progress
  const problemCompletionStats = practiceProblems.map(problem => {
    const isCompleted = isProblemCompleted(problem);
    return {
      id: problem.id,
      title: problem.title,
      isCompleted,
      steps: problem.steps.length,
      status: isCompleted ? "completed" as const : "not-started" as const
    };
  });
  
  const completedProblemsCount = problemCompletionStats.filter(p => p.isCompleted).length;

  // Function to check if a problem is completed
  const isProblemCompleted = (problem: Problem) => {
    return completedProblems.includes(problem.id);
  };

  return (
    <div className={cn(
      "flex-shrink-0 border-r bg-background/50 flex flex-col",
      isMobile ? "w-full" : "w-80"
    )}>
      <div className={cn(
        "space-y-4 border-b",
        isMobile ? "p-3" : "p-4"
      )}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="lecture-select" className={cn(
              "text-muted-foreground flex items-center gap-1",
              isMobile ? "text-xs" : "text-xs"
            )}>
              <BookOpen className={cn(
                isMobile ? "h-3 w-3" : "h-3 w-3"
              )} />
              Lecture
            </Label>
            <div className="flex items-center gap-2">
              <ProgressIndicator 
                status={lectureProgressData.percentage === 100 ? "completed" : 
                       lectureProgressData.percentage > 0 ? "in-progress" : "not-started"} 
                size="sm" 
              />
              <Badge variant="outline" className={cn(
                isMobile ? "text-xs" : "text-xs"
              )}>
                {formatProgressText(lectureProgressData, false)}
              </Badge>
            </div>
          </div>
          <Select value={currentLectureId} onValueChange={handleLectureSelect}>
            <SelectTrigger id="lecture-select" className={cn(
              "w-full bg-background",
              isMobile && "h-11" // Larger touch target
            )}>
              <SelectValue placeholder="Select a lecture" />
            </SelectTrigger>
            <SelectContent>
              {lectures.map(lecture => {
                const progress = getLectureProgress(lecture.id, completedProblems);
                const progressData = createProgressData(progress.completed, progress.total);
                return (
                  <SelectItem key={lecture.id} value={lecture.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{lecture.title}</span>
                      <div className="flex items-center gap-1 ml-2">
                        <ProgressIndicator 
                          status={progressData.percentage === 100 ? "completed" : 
                                 progressData.percentage > 0 ? "in-progress" : "not-started"} 
                          size="sm" 
                        />
                        <span className="text-xs text-muted-foreground">
                          {formatProgressText(progressData, false)}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <EnhancedProgress 
            value={lectureProgressData.percentage} 
            className={cn(
              "mt-2",
              isMobile ? "h-1" : "h-1"
            )} 
            size="sm"
            variant={lectureProgressData.percentage === 100 ? "success" : "default"}
            animated={true}
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="module-select" className={cn(
              "text-muted-foreground flex items-center gap-1",
              isMobile ? "text-xs" : "text-xs"
            )}>
              <Target className={cn(
                isMobile ? "h-3 w-3" : "h-3 w-3"
              )} />
              Module / Skill Set
            </Label>
            <div className="flex items-center gap-2">
              <ProgressIndicator 
                status={moduleProgressData.percentage === 100 ? "completed" : 
                       moduleProgressData.percentage > 0 ? "in-progress" : "not-started"} 
                size="sm" 
              />
              <Badge variant="outline" className={cn(
                isMobile ? "text-xs" : "text-xs"
              )}>
                {formatProgressText(moduleProgressData, false)}
              </Badge>
            </div>
          </div>
          <Select value={currentModuleId} onValueChange={handleModuleSelect}>
            <SelectTrigger id="module-select" className={cn(
              "w-full bg-background",
              isMobile && "h-11" // Larger touch target
            )}>
              <SelectValue placeholder="Select a module" />
            </SelectTrigger>
            <SelectContent>
              {currentLecture.modules.map(module => {
                const progress = getModuleProgress(currentLectureId, module.id, completedProblems);
                const progressData = createProgressData(progress.completed, progress.total);
                return (
                  <SelectItem key={module.id} value={module.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{module.name}</span>
                      <div className="flex items-center gap-1 ml-2">
                        <ProgressIndicator 
                          status={progressData.percentage === 100 ? "completed" : 
                                 progressData.percentage > 0 ? "in-progress" : "not-started"} 
                          size="sm" 
                        />
                        <span className="text-xs text-muted-foreground">
                          {formatProgressText(progressData, false)}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <EnhancedProgress 
            value={moduleProgressData.percentage} 
            className={cn(
              "mt-2",
              isMobile ? "h-1" : "h-1"
            )} 
            size="sm"
            variant={moduleProgressData.percentage === 100 ? "success" : "default"}
            animated={true}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <RadioGroup 
            value={String(currentProblemIndex)} 
            onValueChange={(value) => onProblemChange(Number(value))}
            className={cn(
              isMobile ? "p-2" : "p-2"
            )}
          >
          {practiceProblems.length > 0 && (
             <div className={cn(
               "mt-4",
               isMobile ? "px-2" : "px-2"
             )}>
              <div className={cn(
                "flex items-center justify-between",
                isMobile ? "mb-3" : "mb-4"
              )}>
                <h3 className={cn(
                  "font-semibold text-muted-foreground tracking-wider uppercase flex items-center gap-1",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  <TrendingUp className={cn(
                    isMobile ? "h-3 w-3" : "h-3 w-3"
                  )} />
                  Practice Problems
                </h3>
                <div className="flex items-center gap-2">
                  <ProgressRing 
                    value={completedProblemsCount} 
                    max={practiceProblems.length} 
                    size={isMobile ? 20 : 24} 
                    strokeWidth={3}
                    variant={completedProblemsCount === practiceProblems.length ? "success" : "default"}
                    showText={false}
                  />
                  <Badge variant="outline" className={cn(
                    isMobile ? "text-xs" : "text-xs"
                  )}>
                    {formatProgressText(createProgressData(completedProblemsCount, practiceProblems.length), false)}
                  </Badge>
                </div>
              </div>
              
              {/* Overall module progress summary */}
              <div className={cn(
                "bg-muted/30 rounded-lg border",
                isMobile ? "mb-3 p-2" : "mb-4 p-3"
              )}>
                <ProgressCard
                  title="Module Progress"
                  value={moduleProgressData.completed}
                  max={moduleProgressData.total}
                  icon={<Target className={cn(
                    isMobile ? "h-3 w-3" : "h-4 w-4"
                  )} />}
                  variant={moduleProgressData.percentage === 100 ? "success" : "default"}
                  size="sm"
                  isComplete={moduleProgressData.percentage === 100}
                  className="mb-0"
                />
              </div>
               {practiceProblems.map((problem) => {
                 const index = currentModule.problems.findIndex(p => p.id === problem.id);
                 const isCompleted = isProblemCompleted(problem);
                 return (
                  <Label 
                    key={problem.id} 
                    htmlFor={`problem-${index}`}
                    className={cn(
                      "flex items-start gap-3 rounded-md font-medium cursor-pointer hover:bg-accent/50 transition-colors",
                      isMobile ? "p-2.5 text-sm" : "p-3 text-sm",
                      currentProblemIndex === index ? 'bg-accent text-accent-foreground' : '',
                      isMobile && "min-h-[44px] items-center" // Touch-friendly height
                    )}
                  >
                    <RadioGroupItem 
                      value={String(index)} 
                      id={`problem-${index}`} 
                      className={cn(
                        isMobile ? "mt-0" : "mt-0.5",
                        isMobile && "w-5 h-5" // Larger touch target
                      )} 
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className={cn(
                        "flex-1",
                        isMobile && "text-sm"
                      )}>
                        <MathRenderer text={problem.title} />
                      </span>
                      <div className="flex items-center gap-2 ml-2">
                        <ProgressIndicator 
                          status={isCompleted ? "completed" : 
                                 currentProblemIndex === index ? "in-progress" : "not-started"} 
                          size="sm"
                          animated={currentProblemIndex === index}
                        />
                        <Badge 
                          variant={isCompleted ? "default" : "outline"} 
                          className={cn(
                            isCompleted ? "bg-green-100 text-green-800" : "",
                            isMobile ? "text-xs" : "text-xs"
                          )}
                        >
                          {problem.steps.length} steps
                        </Badge>
                      </div>
                    </div>
                  </Label>
                 )
               })}
             </div>
          )}

        </RadioGroup>
      </ScrollArea>
    </div>
  );
}
