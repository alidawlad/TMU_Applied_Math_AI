"use client";

import { useState } from "react";
import type { Step, Problem, Choice } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MathRenderer } from "@/components/MathRenderer";
import { cn } from "@/lib/utils";

interface MultipleChoiceQuestionProps {
  step: Step;
  problem: Problem;
  selectedChoice: string;
  onChoiceSelect: (choiceId: string) => void;
  isDisabled: boolean;
  isMobile?: boolean;
}

export function MultipleChoiceQuestion({
  step,
  problem,
  selectedChoice,
  onChoiceSelect,
  isDisabled,
  isMobile = false,
}: MultipleChoiceQuestionProps) {
  const choices = step.choices || problem.choices || [];
  const mediaContent = step.mediaContent || problem.mediaContent || [];
  const instructionText = step.instructionText;

  if (choices.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No choices available for this question.
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", isMobile && "space-y-3")}>
      {/* Instruction text */}
      {instructionText && (
        <div className={cn(
          "text-sm text-muted-foreground",
          isMobile && "text-xs"
        )}>
          {instructionText}
        </div>
      )}

      {/* Media content (images, graphs, etc.) */}
      {mediaContent.length > 0 && (
        <div className={cn(
          "grid gap-4 mb-4",
          isMobile ? "grid-cols-1" : "grid-cols-2"
        )}>
          {mediaContent.map((media) => (
            <div key={media.id} className="space-y-2">
              <img
                src={media.url}
                alt={media.alt}
                className={cn(
                  "rounded-lg border object-contain bg-background",
                  isMobile ? "max-h-48" : "max-h-64"
                )}
              />
              {media.caption && (
                <p className={cn(
                  "text-center text-muted-foreground",
                  isMobile ? "text-xs" : "text-sm"
                )}>
                  {media.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Multiple choice options */}
      <RadioGroup
        value={selectedChoice}
        onValueChange={onChoiceSelect}
        disabled={isDisabled}
        className={cn("space-y-3", isMobile && "space-y-2")}
      >
        {choices.map((choice) => (
          <div key={choice.id} className="space-y-2">
            <Card className={cn(
              "transition-all duration-200 hover:shadow-md",
              selectedChoice === choice.id && "ring-2 ring-primary/20 bg-primary/5",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}>
              <CardContent className={cn(
                "p-4 cursor-pointer",
                isMobile && "p-3"
              )}>
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    value={choice.id}
                    id={choice.id}
                    className="mt-1 flex-shrink-0"
                    disabled={isDisabled}
                  />
                  <Label
                    htmlFor={choice.id}
                    className={cn(
                      "flex-1 cursor-pointer",
                      isMobile && "text-sm"
                    )}
                  >
                    <div className="space-y-2">
                      {/* Choice text */}
                      {choice.text && (
                        <div className="text-foreground">
                          {choice.text}
                        </div>
                      )}
                      
                      {/* Math content */}
                      {choice.mathContent && (
                        <div className="flex justify-center items-center py-2">
                          <MathRenderer 
                            text={choice.mathContent}
                            enableOverflowScroll={true}
                            className={cn(
                              "max-w-full",
                              isMobile && "text-sm"
                            )}
                          />
                        </div>
                      )}
                      
                      {/* Choice image */}
                      {choice.imageUrl && (
                        <div className="flex justify-center">
                          <img
                            src={choice.imageUrl}
                            alt={`Choice ${choice.id}`}
                            className={cn(
                              "rounded border object-contain bg-background",
                              isMobile ? "max-h-32" : "max-h-40"
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </RadioGroup>

      {/* Choice labels for reference (A, B, C, D) */}
      <div className={cn(
        "flex justify-center gap-4 text-sm text-muted-foreground",
        isMobile && "text-xs gap-2"
      )}>
        {choices.map((choice, index) => (
          <span key={choice.id} className="flex items-center gap-1">
            <span className="font-medium">
              {String.fromCharCode(65 + index)}.
            </span>
            <span className="truncate max-w-20">
              {choice.text?.substring(0, 20) || `Choice ${index + 1}`}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}