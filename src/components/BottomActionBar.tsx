"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageSquare, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomActionBarProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onAskAI?: () => void;
  onReset?: () => void;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  isAIDisabled?: boolean;
  isLoading?: boolean;
  isMobile?: boolean;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

export function BottomActionBar({
  onNext,
  onPrevious,
  onAskAI,
  onReset,
  isNextDisabled = false,
  isPreviousDisabled = false,
  isAIDisabled = false,
  isLoading = false,
  isMobile = false,
  currentStep,
  totalSteps,
  className
}: BottomActionBarProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40",
      "p-4 flex items-center justify-between gap-4",
      isMobile && "p-3 gap-2",
      className
    )}>
      {/* Left side - Previous/Reset actions */}
      <div className="flex items-center gap-2">
        {onPrevious && (
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={onPrevious}
            disabled={isPreviousDisabled || isLoading}
            className={cn(
              "flex items-center gap-2",
              isMobile && "px-2 py-1"
            )}
          >
            <ChevronLeft className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
            <span className={cn("hidden sm:inline", isMobile && "sr-only")}>
              Previous
            </span>
          </Button>
        )}
        
        {onReset && (
          <Button
            variant="ghost"
            size={isMobile ? "sm" : "default"}
            onClick={onReset}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2 text-gray-600 hover:text-gray-800",
              isMobile && "px-2 py-1"
            )}
          >
            <RotateCcw className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
            <span className={cn("hidden sm:inline", isMobile && "sr-only")}>
              Reset
            </span>
          </Button>
        )}
      </div>

      {/* Center - Progress indicator */}
      {currentStep !== undefined && totalSteps !== undefined && (
        <div className={cn(
          "flex items-center gap-2 text-sm text-gray-600",
          isMobile && "text-xs"
        )}>
          <span>Step {currentStep} of {totalSteps}</span>
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full",
                  i < currentStep ? "bg-green-500" : 
                  i === currentStep - 1 ? "bg-blue-500" : "bg-gray-300",
                  isMobile && "w-1.5 h-1.5"
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Right side - AI feedback and Next actions */}
      <div className="flex items-center gap-2">
        {onAskAI && (
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={onAskAI}
            disabled={isAIDisabled || isLoading}
            className={cn(
              "flex items-center gap-2 bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700",
              isMobile && "px-2 py-1"
            )}
          >
            <MessageSquare className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
            <span className={cn("hidden sm:inline", isMobile && "sr-only")}>
              Ask AI
            </span>
          </Button>
        )}
        
        {onNext && (
          <Button
            size={isMobile ? "sm" : "default"}
            onClick={onNext}
            disabled={isNextDisabled || isLoading}
            className={cn(
              "flex items-center gap-2 bg-teal-600 hover:bg-teal-700",
              isMobile && "px-3 py-1"
            )}
          >
            <span>Next</span>
            <ChevronRight className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
          </Button>
        )}
      </div>
    </div>
  );
}