"use server";

import { evaluateMathEquivalence } from "@/ai/flows/evaluate-math-equivalence";
import { generateProblemHint } from "@/ai/flows/generate-problem-hints";
import { provideStepFeedback } from "@/ai/flows/provide-step-feedback";
import { explainExampleStep } from "@/ai/flows/explain-example-step";
import { isAIAvailable, getAIStatus, getAIConfig } from "@/ai/genkit";
import type { Problem, Step } from "./types";
import type { AnswerCheckingMode } from "@/lib/services/aiService";
import { AIError, NetworkError, ValidationError, ErrorRecovery, ErrorMonitor } from "./error-handling/errorHandler";

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
  // Validate inputs
  if (!problem?.description || !currentStep?.description) {
    const validationError = new ValidationError(
      "Invalid problem or step data",
      { problem: !!problem, currentStep: !!currentStep }
    );
    ErrorMonitor.logError(validationError);
    return { error: validationError.userMessage };
  }

  try {
    const hint = await ErrorRecovery.withRetry(
      async () => {
        return await generateProblemHint({
          problemDescription: problem.description,
          currentStep: currentStep.description,
          studentInput: studentInput,
        });
      },
      {
        maxRetries: 3,
        baseDelay: 1000,
        retryCondition: (error) => {
          // Retry on network errors and temporary AI failures
          return error instanceof NetworkError || 
                 (error instanceof AIError && error.isRetryable);
        }
      }
    );
    
    return { hint: hint.hint };
  } catch (error) {
    const aiError = error instanceof AIError ? error : new AIError(
      error instanceof Error ? error.message : "Unknown error generating hint",
      {
        operation: "generateProblemHint",
        problemId: problem.id,
        stepId: currentStep.id,
        studentInput: studentInput?.substring(0, 100) // Truncate for privacy
      },
      error instanceof Error ? error : undefined
    );
    
    ErrorMonitor.logError(aiError);
    return { error: aiError.userMessage };
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
  // Validate inputs
  if (!problem?.description || !currentStep?.title || !studentInput?.trim()) {
    const validationError = new ValidationError(
      "Invalid feedback request data",
      { 
        problem: !!problem?.description, 
        currentStep: !!currentStep?.title, 
        studentInput: !!studentInput?.trim() 
      }
    );
    ErrorMonitor.logError(validationError);
    return { error: validationError.userMessage };
  }

  try {
    const feedback = await ErrorRecovery.withRetry(
      async () => {
        const previousStepsText = previousSteps
          .map((s) => `Step: ${s.title}\nAnswer: ${s.answer}`)
          .join("\n\n");

        return await provideStepFeedback({
          problem: problem.description,
          previousSteps: previousStepsText || "This is the first step.",
          userSolutionStep: `Step: ${currentStep.title}\nStudent Answer: ${studentInput}`,
          expectedAnswer: currentStep.solution,
        });
      },
      {
        maxRetries: 3,
        baseDelay: 1500,
        retryCondition: (error) => {
          return error instanceof NetworkError || 
                 (error instanceof AIError && error.isRetryable);
        }
      }
    );

    return { feedback: feedback.feedback };
  } catch (error) {
    const aiError = error instanceof AIError ? error : new AIError(
      error instanceof Error ? error.message : "Unknown error generating feedback",
      {
        operation: "provideStepFeedback",
        problemId: problem.id,
        stepId: currentStep.id,
        studentInput: studentInput?.substring(0, 100), // Truncate for privacy
        previousStepsCount: previousSteps.length
      },
      error instanceof Error ? error : undefined
    );
    
    ErrorMonitor.logError(aiError);
    return { error: aiError.userMessage };
  }
}

interface CheckAnswerArgs {
  studentAnswer: string;
  expectedAnswer: string;
  mode?: AnswerCheckingMode;
}

export async function checkAnswerAction({
  studentAnswer,
  expectedAnswer,
  mode = 'ai'
}: CheckAnswerArgs) {
  // Validate inputs
  if (!studentAnswer?.trim() || !expectedAnswer?.trim()) {
    const validationError = new ValidationError(
      "Invalid answer comparison data",
      { 
        studentAnswer: !!studentAnswer?.trim(), 
        expectedAnswer: !!expectedAnswer?.trim() 
      }
    );
    ErrorMonitor.logError(validationError);
    return { 
      isEquivalent: false, 
      feedback: null, 
      error: validationError.userMessage,
      mode: mode 
    };
  }

  // Handle non-AI modes first (server-side manual checking)
  if (mode !== 'ai') {
    try {
      const result = checkAnswerManually(studentAnswer, expectedAnswer, mode);
      return {
        isEquivalent: result.isCorrect,
        feedback: result.feedback || null,
        error: result.error || null,
        mode: result.mode,
        aiUsed: result.aiUsed
      };
    } catch (error) {
      return {
        isEquivalent: false,
        feedback: null,
        error: error instanceof Error ? error.message : "Manual checking failed",
        mode: mode,
        aiUsed: false
      };
    }
  }

  // Check if AI is available for AI mode
  if (mode === 'ai' && !isAIAvailable()) {
    console.warn('AI requested but not available, falling back to manual mode');
    try {
      const result = checkAnswerManually(studentAnswer, expectedAnswer, 'manual');
      return {
        isEquivalent: result.isCorrect,
        feedback: result.feedback ? `${result.feedback} (AI unavailable, used manual checking)` : null,
        error: null,
        mode: 'manual',
        aiUsed: false
      };
    } catch (error) {
      return {
        isEquivalent: false,
        feedback: null,
        error: "Both AI and manual checking failed",
        mode: 'manual',
        aiUsed: false
      };
    }
  }

  // Proceed with AI checking
  try {
    const result = await ErrorRecovery.withRetry(
      async () => {
        return await evaluateMathEquivalence({
          studentAnswer,
          expectedAnswer,
        });
      },
      {
        maxRetries: 3,
        baseDelay: 1000,
        retryCondition: (error) => {
          return error instanceof NetworkError || 
                 (error instanceof AIError && error.isRetryable);
        }
      }
    );
    
    return {
      isEquivalent: result.isEquivalent,
      feedback: result.feedback,
      error: null,
      mode: 'ai',
      aiUsed: true
    };
  } catch (error) {
    console.warn('AI checking failed, attempting manual fallback:', error);
    
    // Try manual fallback
    try {
      const fallbackResult = checkAnswerManually(studentAnswer, expectedAnswer, 'manual');
      return {
        isEquivalent: fallbackResult.isCorrect,
        feedback: fallbackResult.feedback ? `${fallbackResult.feedback} (AI failed, used manual checking)` : null,
        error: null,
        mode: 'manual',
        aiUsed: false
      };
    } catch (fallbackError) {
      const aiError = error instanceof AIError ? error : new AIError(
        error instanceof Error ? error.message : "Unknown error evaluating answer",
        {
          operation: "evaluateMathEquivalence",
          studentAnswer: studentAnswer?.substring(0, 100),
          expectedAnswer: expectedAnswer?.substring(0, 100)
        },
        error instanceof Error ? error : undefined
      );
      
      ErrorMonitor.logError(aiError);
      return { 
        isEquivalent: false, 
        feedback: null, 
        error: "Answer checking failed (both AI and manual methods)",
        mode: 'ai',
        aiUsed: false
      };
    }
  }
}

interface ExplainExampleStepArgs {
    exampleTitle: string;
    revealedSteps: string;
    userQuestion: string;
}

export async function explainExampleStepAction(args: ExplainExampleStepArgs) {
    // Validate inputs
    if (!args.exampleTitle?.trim() || !args.userQuestion?.trim()) {
        const validationError = new ValidationError(
            "Invalid example explanation request",
            { 
                exampleTitle: !!args.exampleTitle?.trim(), 
                userQuestion: !!args.userQuestion?.trim() 
            }
        );
        ErrorMonitor.logError(validationError);
        return { explanation: null, error: validationError.userMessage };
    }

    try {
        const result = await ErrorRecovery.withRetry(
            async () => {
                return await explainExampleStep(args);
            },
            {
                maxRetries: 3,
                baseDelay: 1500,
                retryCondition: (error) => {
                    return error instanceof NetworkError || 
                           (error instanceof AIError && error.isRetryable);
                }
            }
        );
        
        return { explanation: result.explanation, error: null };
    } catch (error) {
        const aiError = error instanceof AIError ? error : new AIError(
            error instanceof Error ? error.message : "Unknown error explaining example",
            {
                operation: "explainExampleStep",
                exampleTitle: args.exampleTitle,
                userQuestion: args.userQuestion?.substring(0, 100), // Truncate for privacy
                revealedSteps: args.revealedSteps?.substring(0, 200) // Truncate for privacy
            },
            error instanceof Error ? error : undefined
        );
        
        ErrorMonitor.logError(aiError);
        return { explanation: null, error: aiError.userMessage };
    }
}

// Server action to get AI availability status
export async function getAIStatusAction() {
  try {
    const status = getAIStatus();
    const config = getAIConfig();
    
    // Also check environment variable directly for debugging
    const envApiKey = process.env.GOOGLE_AI_API_KEY;
    const envCheck = {
      exists: !!envApiKey,
      length: envApiKey?.length || 0,
      preview: envApiKey ? envApiKey.substring(0, 8) + '...' : 'not set'
    };
    
    return {
      available: isAIAvailable(),
      status: status.status,
      message: status.message,
      configured: config.configured,
      error: config.error || null,
      apiKeyHint: config.apiKey || null,
      debug: {
        envCheck,
        nodeEnv: process.env.NODE_ENV,
        configuredCheck: config.configured
      }
    };
  } catch (error) {
    return {
      available: false,
      status: 'error' as const,
      message: 'Failed to check AI status',
      configured: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      apiKeyHint: null,
      debug: {
        envCheck: { exists: false, length: 0, preview: 'error checking' },
        nodeEnv: process.env.NODE_ENV,
        configuredCheck: false
      }
    };
  }
}

// Server-side manual answer checking (isolated from client code)
function checkAnswerManually(
  studentAnswer: string,
  expectedAnswer: string,
  mode: AnswerCheckingMode
): { isCorrect: boolean; feedback?: string; mode: AnswerCheckingMode; aiUsed: boolean; error?: string } {
  // Handle reveal mode
  if (mode === 'reveal') {
    return {
      isCorrect: true, // Always mark as correct when revealing
      feedback: `Answer revealed: ${expectedAnswer}`,
      mode: 'reveal',
      aiUsed: false
    };
  }

  // Manual comparison with advanced pattern matching
  let student = studentAnswer.trim();
  let expected = expectedAnswer.trim();

  // Normalize for comparison
  student = student.toLowerCase();
  expected = expected.toLowerCase();

  // Direct match
  if (student === expected) {
    return {
      isCorrect: true,
      feedback: "Correct!",
      mode: 'manual',
      aiUsed: false
    };
  }

  // Advanced mathematical equivalence patterns
  const mathEquivalencePatterns = [
    // Remove spaces and compare
    { 
      student: student.replace(/\s+/g, ''), 
      expected: expected.replace(/\s+/g, '') 
    },
    // Normalize multiplication symbols
    { 
      student: student.replace(/×/g, '*').replace(/·/g, '*'), 
      expected: expected.replace(/×/g, '*').replace(/·/g, '*') 
    },
    // Normalize fractions
    { 
      student: student.replace(/\//g, '÷'), 
      expected: expected.replace(/\//g, '÷') 
    },
    // Remove parentheses for simple cases
    { 
      student: student.replace(/[()]/g, ''), 
      expected: expected.replace(/[()]/g, '') 
    }
  ];

  for (const pattern of mathEquivalencePatterns) {
    if (pattern.student === pattern.expected) {
      return {
        isCorrect: true,
        feedback: "Mathematically correct! (Different notation but equivalent)",
        mode: 'manual',
        aiUsed: false
      };
    }
  }

  return {
    isCorrect: false,
    feedback: "Incorrect. The answer doesn't match the expected solution.",
    mode: 'manual',
    aiUsed: false
  };
}
