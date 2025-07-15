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
    console.error('AI hint generation error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('GOOGLE_AI_API_KEY')) {
        return { error: "AI service configuration error. Please check that GOOGLE_AI_API_KEY is set in environment variables." };
      }
      if (error.message.includes('Could not establish connection')) {
        return { error: "Unable to connect to AI service. Please check your internet connection and API key configuration." };
      }
    }
    
    return { error: "Failed to generate hint. Please try again." };
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
    console.error('AI feedback generation error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('GOOGLE_AI_API_KEY')) {
        return { error: "AI service configuration error. Please check that GOOGLE_AI_API_KEY is set in environment variables." };
      }
      if (error.message.includes('Could not establish connection')) {
        return { error: "Unable to connect to AI service. Please check your internet connection and API key configuration." };
      }
    }
    
    return { error: "Failed to generate feedback. Please try again." };
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
    console.error('AI math evaluation error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('GOOGLE_AI_API_KEY')) {
        return { 
          isEquivalent: false, 
          feedback: null, 
          error: "AI service configuration error. Please check that GOOGLE_AI_API_KEY is set in environment variables." 
        };
      }
      if (error.message.includes('Could not establish connection')) {
        return { 
          isEquivalent: false, 
          feedback: null, 
          error: "Unable to connect to AI service. Please check your internet connection and API key configuration." 
        };
      }
    }
    
    return { isEquivalent: false, feedback: null, error: "Failed to evaluate answer. Please try again." };
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
        console.error('AI explanation generation error:', error);
        
        // Provide more specific error messages
        if (error instanceof Error) {
            if (error.message.includes('GOOGLE_AI_API_KEY')) {
                return { 
                    explanation: null, 
                    error: "AI service configuration error. Please check that GOOGLE_AI_API_KEY is set in environment variables." 
                };
            }
            if (error.message.includes('Could not establish connection')) {
                return { 
                    explanation: null, 
                    error: "Unable to connect to AI service. Please check your internet connection and API key configuration." 
                };
            }
        }
        
        return { explanation: null, error: "Failed to get explanation from AI. Please try again." };
    }
}
