"use client";

import type { Step, Problem } from "@/lib/types";
import { MathRendererWithBlanks } from "@/components/MathRendererWithBlanks";
import { cn } from "@/lib/utils";

interface FillInBlankQuestionProps {
  step: Step;
  problem: Problem;
  blankValues: Record<string, string>;
  onBlankChange: (blankId: string, value: string) => void;
  isDisabled: boolean;
  isMobile?: boolean;
}

export function FillInBlankQuestion({
  step,
  problem,
  blankValues,
  onBlankChange,
  isDisabled,
  isMobile = false,
}: FillInBlankQuestionProps) {
  // Use the questionTemplate from step, or fall back to the title
  const questionTemplate = step.questionTemplate || step.title;
  const instructionText = step.instructionText;
  
  if (!questionTemplate) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No question template available for this fill-in-blank question.
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", isMobile && "space-y-3")}>
      {/* Question with inline blanks */}
      <div className={cn(
        "bg-blue-50/50 rounded-lg border border-blue-200 p-6",
        isMobile && "p-4"
      )}>
        <MathRendererWithBlanks
          text={questionTemplate}
          blankValues={blankValues}
          onBlankChange={onBlankChange}
          disabled={isDisabled}
          isMobile={isMobile}
          containerType="display"
          enableOverflowScroll={true}
          instructionText={instructionText}
          className={cn(
            "text-xl font-medium leading-relaxed",
            isMobile && "text-lg"
          )}
        />
      </div>
      
      {/* Additional context or description if available */}
      {step.description && step.description !== step.title && (
        <div className={cn(
          "text-sm text-muted-foreground",
          isMobile && "text-xs"
        )}>
          {step.description}
        </div>
      )}
      
      {/* Blank reference (helpful for complex questions) */}
      {Object.keys(blankValues).length > 1 && (
        <div className={cn(
          "text-xs text-muted-foreground bg-muted/30 rounded p-2",
          isMobile && "text-xs"
        )}>
          <strong>Blanks to fill:</strong> {Object.keys(blankValues).join(', ')}
        </div>
      )}
    </div>
  );
}