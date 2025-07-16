"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Settings, CheckCircle2, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionHeaderProps {
  questionNumber: number;
  totalQuestions: number;
  title: string;
  score?: {
    current: number;
    total: number;
    percentage: number;
  };
  timeElapsed?: number;
  accuracy?: number;
  isMobile?: boolean;
  onSettingsClick?: () => void;
  className?: string;
}

export function QuestionHeader({
  questionNumber,
  totalQuestions,
  title,
  score,
  timeElapsed,
  accuracy,
  isMobile = false,
  onSettingsClick,
  className
}: QuestionHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      "bg-white border-b border-gray-200 p-4 space-y-3",
      isMobile && "p-3 space-y-2",
      className
    )}>
      {/* Top row: Question info and settings */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={cn("flex items-center gap-2", isMobile && "gap-1")}>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              Question {questionNumber}
            </Badge>
            <span className={cn("text-gray-500", isMobile && "text-sm")}>
              of {totalQuestions}
            </span>
          </div>
          
          {score && (
            <div className={cn(
              "flex items-center gap-2 text-sm text-gray-600",
              isMobile && "text-xs"
            )}>
              <span>Score: {score.percentage}%</span>
              <span className="text-gray-400">•</span>
              <span>{score.current} of {score.total} points</span>
            </div>
          )}
        </div>

        {onSettingsClick && (
          <button
            onClick={onSettingsClick}
            className={cn(
              "p-2 rounded-lg hover:bg-gray-100 transition-colors",
              isMobile && "p-1"
            )}
          >
            <Settings className={cn("h-4 w-4 text-gray-500", isMobile && "h-3 w-3")} />
          </button>
        )}
      </div>

      {/* Question title */}
      <h1 className={cn(
        "font-semibold text-gray-900 leading-tight",
        isMobile ? "text-lg" : "text-xl"
      )}>
        {title}
      </h1>

      {/* Stats row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {timeElapsed !== undefined && (
            <div className={cn(
              "flex items-center gap-2 text-sm text-gray-600",
              isMobile && "text-xs"
            )}>
              <Clock className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          )}
          
          {accuracy !== undefined && (
            <div className={cn(
              "flex items-center gap-2 text-sm text-gray-600",
              isMobile && "text-xs"
            )}>
              <Target className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
              <span>{accuracy}% accuracy</span>
            </div>
          )}
        </div>

        {/* AI status indicator */}
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-1 text-sm text-green-600",
            isMobile && "text-xs"
          )}>
            <CheckCircle2 className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
            <span>AI</span>
          </div>
          <Badge variant="outline" className="text-gray-600 border-gray-300">
            Mode
          </Badge>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <Progress 
          value={(questionNumber / totalQuestions) * 100} 
          className={cn("h-2", isMobile && "h-1.5")}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
      </div>
    </div>
  );
}