"use client";

import { Button } from "@/components/ui/button";
import { DateTime } from "@/components/DateTime";
import { Logo } from "@/components/icons";
import { Menu, HelpCircle, Pencil, Bug, PanelLeftOpen, PanelLeftClose, Clock } from "lucide-react";
import type { Lecture, Problem, ModuleContent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
    lecture: Lecture;
    problemIndex: number;
    totalProblems: number;
    onToggleDrawingMode: () => void;
    isDrawingModeActive: boolean;
    isMobile?: boolean;
    onMobileSidebarToggle?: () => void;
    onDesktopSidebarToggle?: () => void;
    isDesktopSidebarOpen?: boolean;
    timeElapsed?: number;
    isTimerActive?: boolean;
}

export function AppHeader({ lecture, problemIndex, totalProblems, onToggleDrawingMode, isDrawingModeActive, isMobile = false, onMobileSidebarToggle, onDesktopSidebarToggle, isDesktopSidebarOpen = true, timeElapsed = 0, isTimerActive = false }: AppHeaderProps) {
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
          {!isMobile && onDesktopSidebarToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDesktopSidebarToggle}
              className="h-8 w-8 shrink-0"
              aria-label="Toggle Sidebar"
            >
              {isDesktopSidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeftOpen className="h-5 w-5" />
              )}
            </Button>
          )}
          <Logo className={cn(
            "text-primary",
            isMobile ? "h-6 w-6" : "h-8 w-8"
          )} />
          <div className={cn(
            "flex items-center gap-2",
            isMobile && "max-w-[140px]"
          )}>
            <h1 className={cn(
              "font-bold font-headline text-primary",
              isMobile ? "text-sm" : "text-lg",
              isMobile && "truncate"
            )}>
              CQMS110
            </h1>
            {!isMobile && (
              <span className="text-muted-foreground text-sm">Applied Mathematics for Business</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={cn(
            "text-sm font-medium text-muted-foreground",
            isMobile && "text-xs"
          )}>
            {lecture.title} • Problem {problemIndex + 1} of {totalProblems}
          </div>
          
          {timeElapsed > 0 && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isMobile && "text-xs",
              isTimerActive ? "text-blue-600" : "text-muted-foreground"
            )}>
              <Clock className={cn(
                isMobile ? "h-3 w-3" : "h-4 w-4"
              )} />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          )}
          
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
    </header>
  );
}