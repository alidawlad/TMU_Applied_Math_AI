'use server';

/**
 * @fileOverview A flow for evaluating mathematical equivalence.
 *
 * - evaluateMathEquivalence - A function that evaluates if a student's answer is mathematically equivalent to the expected solution.
 * - EvaluateMathEquivalenceInput - The input type for the evaluateMathEquivalence function.
 * - EvaluateMathEquivalenceOutput - The return type for the evaluateMathEquivalence function.
 */

import {ai, isAIAvailable} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateMathEquivalenceInputSchema = z.object({
  expectedAnswer: z.string().describe('The correct solution in the required format.'),
  studentAnswer: z.string().describe('The answer provided by the student.'),
});
export type EvaluateMathEquivalenceInput = z.infer<typeof EvaluateMathEquivalenceInputSchema>;

const EvaluateMathEquivalenceOutputSchema = z.object({
  isEquivalent: z.boolean().describe("True if the student's answer is mathematically equivalent to the expected answer."),
  feedback: z.string().describe("If the answer is equivalent but not in the required format, this field should contain specific feedback (e.g., 'Your answer is correct, but please provide it in the fully expanded form.'). Otherwise, it should be an empty string."),
});
export type EvaluateMathEquivalenceOutput = z.infer<typeof EvaluateMathEquivalenceOutputSchema>;

export async function evaluateMathEquivalence(input: EvaluateMathEquivalenceInput): Promise<EvaluateMathEquivalenceOutput> {
  if (!isAIAvailable() || !ai || !evaluateMathEquivalenceFlow) {
    throw new Error('AI service is not available');
  }
  return evaluateMathEquivalenceFlow(input);
}

const prompt = ai?.definePrompt({
  name: 'evaluateMathEquivalencePrompt',
  input: {schema: EvaluateMathEquivalenceInputSchema},
  output: {schema: EvaluateMathEquivalenceOutputSchema},
  prompt: `You are a sophisticated math evaluation engine. Your task is to determine if a student's answer is mathematically equivalent to the provided correct solution and provide formatting feedback if necessary.

Expected Answer (this is the required format): {{{expectedAnswer}}}
Student's Answer: {{{studentAnswer}}}

Follow these steps:
1.  Determine if the student's answer is mathematically equivalent to the expected answer.
    *   For example, 'x^2 + 2x' is equivalent to '2*x + x^2'.
    *   Another example: 'a(4h-1)' is equivalent to '4ah - a'.
    *   Ignore trivial formatting differences like extra spaces.
2.  If they are equivalent, check if the student's answer is in the same format as the expected answer.
3.  Produce a JSON output with two fields: 'isEquivalent' (boolean) and 'feedback' (string).

    *   If the student's answer is mathematically equivalent to the expected answer:
        *   Set 'isEquivalent' to 'true'.
        *   If the format is different, the 'feedback' should be a concise instruction like "Your answer is mathematically correct, but please provide it in the fully expanded form." or "Correct, but can you simplify further?".
        *   If the format is the same, the 'feedback' should be an empty string.

    *   If the student's answer is NOT mathematically equivalent:
        *   Set 'isEquivalent' to 'false'.
        *   Set 'feedback' to an empty string.
`,
});

const evaluateMathEquivalenceFlow = ai?.defineFlow(
  {
    name: 'evaluateMathEquivalenceFlow',
    inputSchema: EvaluateMathEquivalenceInputSchema,
    outputSchema: EvaluateMathEquivalenceOutputSchema,
  },
  async input => {
    if (!prompt) {
      throw new Error('AI prompt not initialized');
    }
    const {output} = await prompt(input);
    return output!;
  }
);
