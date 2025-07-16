"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { MathRenderer } from './MathRenderer';
import { 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import type { Step } from '@/lib/types';

interface AnswerRevealProps {
  step: Step;
  stepKey: string;
  isRevealed: boolean;
  onReveal: () => void;
  onHide?: () => void;
  className?: string;
  showHint?: boolean;
  studentAnswer?: string;
}

export function AnswerReveal({
  step,
  stepKey,
  isRevealed,
  onReveal,
  onHide,
  className = "",
  showHint = true,
  studentAnswer = ""
}: AnswerRevealProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Reveal Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {!isRevealed ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={onReveal}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Reveal Answer
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onHide}
              className="flex items-center gap-2"
              disabled={!onHide}
            >
              <EyeOff className="h-4 w-4" />
              Hide Answer
            </Button>
            <Badge variant="secondary" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Revealed
            </Badge>
          </div>
        )}

        {/* Show Hint Button */}
        {showHint && step.hint && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            {showExplanation ? 'Hide Hint' : 'Show Hint'}
          </Button>
        )}
      </div>

      {/* Hint Display */}
      {showExplanation && step.hint && (
        <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
          <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Hint:</strong> <MathRenderer text={step.hint} />
          </AlertDescription>
        </Alert>
      )}

      {/* Answer Display */}
      {isRevealed && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Solution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Expected Answer */}
              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Student Answer */}
                {studentAnswer && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-md border border-blue-200 dark:border-blue-700">
                    <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                      Your Answer:
                    </div>
                    <div className="text-blue-900 dark:text-blue-100 font-mono">
                      <MathRenderer text={studentAnswer} />
                    </div>
                  </div>
                )}
                
                {/* Expected Answer */}
                <div className="p-3 bg-green-50 dark:bg-green-900 rounded-md border border-green-200 dark:border-green-700">
                  <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                    Expected Answer:
                  </div>
                  <div className="text-green-900 dark:text-green-100 font-mono">
                    <MathRenderer text={step.solution} />
                  </div>
                </div>
              </div>

              {/* Step Description (if different from solution) */}
              {step.description && step.description !== step.solution && (
                <div className="text-sm text-green-700 dark:text-green-300">
                  <strong>Explanation:</strong> <MathRenderer text={step.description} />
                </div>
              )}

              {/* Additional Help */}
              <div className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <HelpCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>
                  Compare your answer with the expected solution above. Even if the formatting is different, 
                  they may be mathematically equivalent.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Progressive Answer Reveal Component
interface ProgressiveRevealProps {
  steps: Step[];
  currentStepIndex: number;
  revealedSteps: Set<number>;
  onRevealStep: (stepIndex: number) => void;
  className?: string;
}

export function ProgressiveAnswerReveal({
  steps,
  currentStepIndex,
  revealedSteps,
  onRevealStep,
  className = ""
}: ProgressiveRevealProps) {
  const [showAllMode, setShowAllMode] = useState(false);

  const handleRevealAll = () => {
    setShowAllMode(true);
    steps.forEach((_, index) => {
      if (index <= currentStepIndex) {
        onRevealStep(index);
      }
    });
  };

  const revealedCount = revealedSteps.size;
  const availableSteps = currentStepIndex + 1;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Summary Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {revealedCount} / {availableSteps} revealed
          </Badge>
          {revealedCount > 0 && (
            <Badge variant="secondary" className="text-green-700 bg-green-100">
              Solutions available
            </Badge>
          )}
        </div>

        {availableSteps > 1 && !showAllMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRevealAll}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Reveal All ({availableSteps})
          </Button>
        )}
      </div>

      {/* Individual Step Reveals */}
      <div className="space-y-3">
        {steps.slice(0, currentStepIndex + 1).map((step, index) => {
          const isRevealed = revealedSteps.has(index);
          
          return (
            <div key={`step-reveal-${index}`} className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-sm">
                  Step {index + 1}: <MathRenderer text={step.title} />
                </div>
                <Button
                  variant={isRevealed ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => onRevealStep(index)}
                  disabled={isRevealed}
                  className="flex items-center gap-1"
                >
                  {isRevealed ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      Revealed
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3" />
                      Reveal
                    </>
                  )}
                </Button>
              </div>

              {isRevealed && (
                <div className="mt-2 p-2 bg-muted rounded">
                  <div className="text-sm font-mono">
                    <MathRenderer text={step.solution} />
                  </div>
                  {step.hint && (
                    <div className="text-xs text-muted-foreground mt-1">
                      <strong>Hint:</strong> <MathRenderer text={step.hint} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Usage Tips */}
      {revealedCount === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You can reveal answers when you need help or want to check your work. 
            Revealed answers will be marked in your progress.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}