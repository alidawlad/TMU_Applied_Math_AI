"use client";

import { useState, useEffect } from "react";
import type { Step, Problem, QuestionType } from "@/lib/types";
import { MathInput } from "@/components/MathInput";
import { MultipleChoiceQuestion } from "@/components/MultipleChoiceQuestion";
import { FillInBlankQuestion } from "@/components/FillInBlankQuestion";
import { cn } from "@/lib/utils";

interface QuestionRendererProps {
  step: Step;
  problem: Problem;
  stepKey: string;
  currentValue: string;
  isDisabled: boolean;
  isMobile?: boolean;
  onInputChange: (value: string) => void;
  onChoiceSelect?: (choiceId: string) => void;
  onBlankChange?: (blankId: string, value: string) => void;
}

export function QuestionRenderer({
  step,
  problem,
  stepKey,
  currentValue,
  isDisabled,
  isMobile = false,
  onInputChange,
  onChoiceSelect,
  onBlankChange,
}: QuestionRendererProps) {
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [blankValues, setBlankValues] = useState<Record<string, string>>({});

  // Determine the question type - step-level takes precedence over problem-level
  const questionType: QuestionType = step.questionType || problem.questionType || 'step-by-step';

  // Load saved values on mount
  useEffect(() => {
    if (questionType === 'multiple-choice' && currentValue) {
      setSelectedChoice(currentValue);
    } else if (questionType === 'fill-in-blank' && currentValue) {
      try {
        const parsed = JSON.parse(currentValue);
        setBlankValues(parsed);
      } catch {
        // If parsing fails, treat as empty
        setBlankValues({});
      }
    }
  }, [currentValue, questionType]);

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
    onInputChange(choiceId);
    onChoiceSelect?.(choiceId);
  };

  const handleBlankChange = (blankId: string, value: string) => {
    const newBlankValues = { ...blankValues, [blankId]: value };
    setBlankValues(newBlankValues);
    onInputChange(JSON.stringify(newBlankValues));
    onBlankChange?.(blankId, value);
  };

  switch (questionType) {
    case 'multiple-choice':
      return (
        <MultipleChoiceQuestion
          step={step}
          problem={problem}
          selectedChoice={selectedChoice}
          onChoiceSelect={handleChoiceSelect}
          isDisabled={isDisabled}
          isMobile={isMobile}
        />
      );

    case 'fill-in-blank':
      return (
        <FillInBlankQuestion
          step={step}
          problem={problem}
          blankValues={blankValues}
          onBlankChange={handleBlankChange}
          isDisabled={isDisabled}
          isMobile={isMobile}
        />
      );

    case 'step-by-step':
    default:
      return (
        <MathInput
          value={currentValue}
          onChange={onInputChange}
          placeholder="Enter your step here..."
          disabled={isDisabled}
          isMobile={isMobile}
        />
      );
  }
}