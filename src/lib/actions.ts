"use server";

import { generateProblemHint } from "@/ai/flows/generate-problem-hints";
import { provideStepFeedback } from "@/ai/flows/provide-step-feedback";
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
    });

    return { feedback: feedback.feedback };
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate feedback." };
  }
}
