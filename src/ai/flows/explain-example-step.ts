'use server';

/**
 * @fileOverview A flow for explaining a specific step in a math example.
 *
 * - explainExampleStep - A function that provides an explanation for a user's question about a math example.
 * - ExplainExampleStepInput - The input type for the explainExampleStep function.
 * - ExplainExampleStepOutput - The return type for the explainExampleStep function.
 */

import { ai, isAIAvailable } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainExampleStepInputSchema = z.object({
  exampleTitle: z.string().describe('The title of the overall math example.'),
  revealedSteps: z
    .string()
    .describe(
      'The content of the steps that have been revealed to the user so far.'
    ),
  userQuestion: z
    .string()
    .describe('The specific question the user has about the revealed steps.'),
});
export type ExplainExampleStepInput = z.infer<
  typeof ExplainExampleStepInputSchema
>;

const ExplainExampleStepOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A helpful explanation that answers the user\'s question.'),
});
export type ExplainExampleStepOutput = z.infer<
  typeof ExplainExampleStepOutputSchema
>;

export async function explainExampleStep(
  input: ExplainExampleStepInput
): Promise<ExplainExampleStepOutput> {
  if (!isAIAvailable() || !ai || !explainExampleStepFlow) {
    throw new Error('AI service is not available');
  }
  return explainExampleStepFlow(input);
}

const prompt = ai?.definePrompt({
  name: 'explainExampleStepPrompt',
  input: { schema: ExplainExampleStepInputSchema },
  output: { schema: ExplainExampleStepOutputSchema },
  prompt: `You are an expert math tutor. A student is working through an example problem and has a question.

Your task is to answer the student's question based ONLY on the information that has been revealed to them so far. Do NOT reveal, reference, or hint at any information from subsequent steps that the user has not yet seen.

Keep your explanation concise, friendly, and focused on clarifying the user's specific point of confusion.

**Example Context:**
- Title: {{{exampleTitle}}}

**Revealed Steps (This is all the student can see):**
---
{{{revealedSteps}}}
---

**Student's Question:**
"{{{userQuestion}}}"

Please provide a clear explanation to help the student understand.`,
});

const explainExampleStepFlow = ai?.defineFlow(
  {
    name: 'explainExampleStepFlow',
    inputSchema: ExplainExampleStepInputSchema,
    outputSchema: ExplainExampleStepOutputSchema,
  },
  async (input) => {
    if (!prompt) {
      throw new Error('AI prompt not initialized');
    }
    const { output } = await prompt(input);
    return output!;
  }
);
