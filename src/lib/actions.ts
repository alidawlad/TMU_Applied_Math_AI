"use server";

import { evaluateMathEquivalence } from "@/ai/flows/evaluate-math-equivalence";
import { generateProblemHint } from "@/ai/flows/generate-problem-hints";
import { provideStepFeedback } from "@/ai/flows/provide-step-feedback";
import { explainExampleStep } from "@/ai/flows/explain-example-step";
import type { Problem, Step } from "./types";

interface GetHintArgs {
  problem: Problem;
  currentStep: Step;
  studentInput: string;
}

export async function getHintAction({
  problem,
  currentStep,
  studentInput,
}: GetHintArgs) {
  try {
    const hint = await generateProblemHint({
      problemDescription: problem.description,
      currentStep: currentStep.description,
      studentInput: studentInput,
    });
    return { hint: hint.hint };
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate hint." };
  }
}

interface GetFeedbackArgs {
  problem: Problem;
  previousSteps: { title: string; answer: string }[];
  currentStep: Step;
  studentInput: string;
}

export async function getFeedbackAction({
  problem,
  previousSteps,
  currentStep,
  studentInput,
}: GetFeedbackArgs) {
  try {
    const previousStepsText = previousSteps
      .map((s) => `Step: ${s.title}\nAnswer: ${s.answer}`)
      .join("\n\n");

    const feedback = await provideStepFeedback({
      problem: problem.description,
      previousSteps: previousStepsText || "This is the first step.",
      userSolutionStep: `Step: ${currentStep.title}\nStudent Answer: ${studentInput}`,
      expectedAnswer: currentStep.solution,
    });

    return { feedback: feedback.feedback };
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate feedback." };
  }
}

interface CheckAnswerArgs {
  studentAnswer: string;
  expectedAnswer: string;
}

export async function checkAnswerAction({
  studentAnswer,
  expectedAnswer,
}: CheckAnswerArgs) {
  try {
    const result = await evaluateMathEquivalence({
      studentAnswer,
      expectedAnswer,
    });
    return {
      isEquivalent: result.isEquivalent,
      feedback: result.feedback,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return { isEquivalent: false, feedback: null, error: "Failed to evaluate answer." };
  }
}

interface ExplainExampleStepArgs {
    exampleTitle: string;
    revealedSteps: string;
    userQuestion: string;
}

export async function explainExampleStepAction(args: ExplainExampleStepArgs) {
    try {
        const result = await explainExampleStep(args);
        return { explanation: result.explanation, error: null };
    } catch (error) {
        console.error(error);
        return { explanation: null, error: "Failed to get explanation from AI." };
    }
}
