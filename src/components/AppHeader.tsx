"use client";

import { Button } from "@/components/ui/button";
import { DateTime } from "@/components/DateTime";
import { Logo } from "@/components/icons";
import { Menu, HelpCircle, Pencil, Clock, ChevronRight, Bug, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import type { Lecture, Problem, ModuleContent } from "@/lib/types";
import { Timer } from "./Timer";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ProgressIndicator, 
  EnhancedProgress, 
  ProgressRing 
} from "@/components/ui/enhanced-progress";
import { 
  createProgressData, 
  formatProgressText, 
  getProgressColor 
} from "@/lib/utils/progressUtils";

interface AppHeaderProps {
    lecture: Lecture;
    problem: Problem;
    problemIndex: number;
    totalProblems: number;
    onToggleDrawingMode: () => void;
    isDrawingModeActive: boolean;
    module?: ModuleContent;
    moduleProgress?: {
        completed: number;
        total: number;
        percentage: number;
    };
    isMobile?: boolean;
    onMobileSidebarToggle?: () => void;
    onDesktopSidebarToggle?: () => void;
    isDesktopSidebarOpen?: boolean;
}

export function AppHeader({ lecture, problem, problemIndex, totalProblems, onToggleDrawingMode, isDrawingModeActive, module, moduleProgress, isMobile = false, onMobileSidebarToggle, onDesktopSidebarToggle, isDesktopSidebarOpen = true }: AppHeaderProps) {
  // Enhanced progress data
  const moduleProgressData = moduleProgress ? createProgressData(moduleProgress.completed, moduleProgress.total) : null;
  const problemProgressData = createProgressData(problemIndex + 1, totalProblems);
  
  const formatIdealTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    if (hours > 0) {
      return `${hours.toString()}:${minutes}:${secs}`;
    }
    return `${minutes}:${secs}`;
  };
  
  return (
    <header className="flex-shrink-0">
      <div className={cn(
        "bg-background border-b px-4 flex items-center justify-between",
        isMobile ? "h-12" : "h-14"
      )}>
        <div className="flex items-center gap-3">
          {isMobile && onMobileSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileSidebarToggle}
              className="h-8 w-8 shrink-0"
              aria-label="Toggle Navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Logo className={cn(
            "text-primary",
            isMobile ? "h-6 w-6" : "h-8 w-8",
            isMobile ? "block" : "hidden md:block"
          )} />
          <div className={cn(
            "flex flex-col",
            isMobile && "max-w-[140px]"
          )}>
            <h1 className={cn(
              "font-bold font-headline text-primary",
              isMobile ? "text-sm" : "text-lg",
              isMobile && "truncate"
            )}>
              CQMS110
            </h1>
            <p className={cn(
              "text-muted-foreground leading-tight",
              isMobile ? "text-xs" : "text-sm",
              isMobile && "truncate"
            )}>
              {isMobile ? "Applied Math" : "Applied Mathematics for Business"}
            </p>
          </div>
        </div>
        <div className={cn(
          "flex items-center",
          isMobile ? "gap-2" : "gap-4"
        )}>
          {!isMobile && (
            <>
              <span className="text-sm font-medium">Ali Houssein</span>
              <DateTime />
            </>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleDrawingMode}
            className={cn(
              isDrawingModeActive && "bg-accent text-accent-foreground",
              isMobile ? "h-8 w-8" : "h-10 w-10"
            )}
            aria-label="Toggle Drawing Mode"
          >
             <Pencil className={cn(
               isMobile ? "h-4 w-4" : "h-5 w-5"
             )} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className={cn(
              "text-muted-foreground hover:text-foreground",
              isMobile ? "h-8 w-8" : "h-10 w-10"
            )}
            title="Report Issue"
          >
            <a
              href="https://github.com/alidawlad/TMU_Applied_Math_Mastery_AI/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Bug className={cn(
                isMobile ? "h-4 w-4" : "h-5 w-5"
              )} />
            </a>
          </Button>
          <HelpCircle className={cn(
            "text-muted-foreground cursor-pointer",
            isMobile ? "h-4 w-4" : "h-5 w-5"
          )} />
        </div>
      </div>
      <div className={cn(
        "bg-primary/90 text-primary-foreground px-4 flex items-center justify-between backdrop-blur-sm",
        isMobile ? "h-12" : "h-16"
      )}>
         <div className={cn(
           "flex items-center",
           isMobile ? "gap-2" : "gap-4"
         )}>
            {!isMobile && onDesktopSidebarToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onDesktopSidebarToggle}
                className="text-primary-foreground hover:bg-white/20 h-10 w-10"
                aria-label="Toggle Sidebar"
              >
                {isDesktopSidebarOpen ? (
                  <PanelLeftClose className="h-6 w-6" />
                ) : (
                  <PanelLeftOpen className="h-6 w-6" />
                )}
              </Button>
            )}
            <div className={cn(
              isMobile ? "block" : "hidden md:block"
            )}>
                <div className={cn(
                  "flex items-center gap-2 text-sm",
                  isMobile && "flex-col items-start gap-1"
                )}>
                  <h2 className={cn(
                    "font-bold font-headline",
                    isMobile ? "text-sm" : "text-lg",
                    isMobile && "truncate max-w-[150px]"
                  )}>{lecture.title}</h2>
                  {!isMobile && (
                    <>
                      <ChevronRight className="h-4 w-4 text-primary-foreground/60" />
                      <span className="text-primary-foreground/90">{module?.name}</span>
                    </>
                  )}
                  {isMobile && module && (
                    <span className={cn(
                      "text-primary-foreground/90 text-xs truncate max-w-[150px]"
                    )}>{module.name}</span>
                  )}
                </div>
                {moduleProgressData && (
                  <div className={cn(
                    "flex items-center gap-3",
                    isMobile ? "mt-1" : "mt-1"
                  )}>
                    <ProgressIndicator 
                      status={moduleProgressData.percentage === 100 ? "completed" : 
                             moduleProgressData.percentage > 0 ? "in-progress" : "not-started"} 
                      size="sm" 
                    />
                    <div className="flex items-center gap-2">
                      <EnhancedProgress 
                        value={moduleProgressData.percentage} 
                        className={cn(
                          "h-1",
                          isMobile ? "w-16" : "w-20"
                        )} 
                        size="sm"
                        variant={moduleProgressData.percentage === 100 ? "success" : "default"}
                        animated={true}
                      />
                      <span className={cn(
                        "text-primary-foreground/80",
                        isMobile ? "text-xs" : "text-xs"
                      )}>
                        {formatProgressText(moduleProgressData, false)} completed
                      </span>
                    </div>
                  </div>
                )}
            </div>
         </div>
         <div className={cn(
           "flex items-center text-sm text-center",
           isMobile ? "gap-2" : "gap-3"
         )}>
            {!isMobile && (
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">&lt;</Button>
            )}
             <div className={cn(
               "flex items-center",
               isMobile ? "gap-2" : "gap-3"
             )}>
                <ProgressRing 
                  value={problemIndex + 1} 
                  max={totalProblems} 
                  size={isMobile ? 32 : 40} 
                  strokeWidth={3}
                  variant="default"
                  showText={false}
                />
                <div>
                  <p className={cn(
                    "font-bold",
                    isMobile ? "text-xs" : "text-sm"
                  )}>Problem {problemIndex + 1} of {totalProblems}</p>
                  {!isMobile && (
                    <p className="text-xs text-primary-foreground/80">{problem.source}</p>
                  )}
                </div>
            </div>
            {!isMobile && (
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">&gt;</Button>
            )}
         </div>
         <div className={cn(
           "flex items-center",
           isMobile ? "gap-2" : "gap-4"
         )}>
            <Timer resetKey={problem.id}/>
            {problem.idealTime && !isMobile && (
              <div className="hidden sm:flex items-center gap-2 text-sm font-mono bg-black/20 text-primary-foreground px-2 py-1 rounded-md">
                <Clock className="h-4 w-4 text-primary-foreground/80" />
                <span>Ideal: {formatIdealTime(problem.idealTime)}</span>
              </div>
            )}
            <Button className={cn(
              "bg-background text-primary hover:bg-background/90",
              isMobile ? "text-xs px-3 py-1 h-8" : "px-4 py-2"
            )}>Save</Button>
         </div>
      </div>
    </header>
  );
}
