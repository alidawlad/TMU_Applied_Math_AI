"use client";

import { Button } from "./ui/button";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingContinueButtonProps {
  onContinue: () => void;
  isComplete: boolean;
  className?: string;
  show?: boolean;
}

export function FloatingContinueButton({ 
  onContinue, 
  isComplete, 
  className,
  show = true 
}: FloatingContinueButtonProps) {
  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out",
      show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      className
    )}>
      <Button
        onClick={onContinue}
        disabled={isComplete}
        size="lg"
        aria-label={isComplete ? "Example completed" : "Continue to next step"}
        className={cn(
          "rounded-full shadow-lg hover:shadow-xl transition-all duration-200",
          "min-w-[120px] h-12 text-base font-medium",
          isComplete 
            ? "bg-green-600 hover:bg-green-700 text-white" 
            : "bg-primary hover:bg-primary/90 animate-pulse"
        )}
      >
        {isComplete ? (
          <>
            <Check className="h-5 w-5 mr-2" />
            Complete
          </>
        ) : (
          <>
            Continue
            <ChevronRight className="h-5 w-5 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
}