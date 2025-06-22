'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing feedback on solution steps.
 *
 * - provideStepFeedback - A function that takes a problem, the user's solution step, and the previous steps, and returns AI-powered feedback.
 * - ProvideStepFeedbackInput - The input type for the provideStepFeedback function.
 * - ProvideStepFeedbackOutput - The return type for the provideStepFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideStepFeedbackInputSchema = z.object({
  problem: z.string().describe('The problem the user is trying to solve.'),
  userSolutionStep: z.string().describe('The current solution step provided by the user.'),
  previousSteps: z.string().describe('The previous steps taken by the user.'),
});
export type ProvideStepFeedbackInput = z.infer<typeof ProvideStepFeedbackInputSchema>;

const ProvideStepFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The AI-generated feedback for the user solution step.'),
});
export type ProvideStepFeedbackOutput = z.infer<typeof ProvideStepFeedbackOutputSchema>;

export async function provideStepFeedback(input: ProvideStepFeedbackInput): Promise<ProvideStepFeedbackOutput> {
  return provideStepFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideStepFeedbackPrompt',
  input: {schema: ProvideStepFeedbackInputSchema},
  output: {schema: ProvideStepFeedbackOutputSchema},
  prompt: `You are an AI-powered tutor providing feedback to a student on their solution steps for a math problem.

  Problem: {{{problem}}}
  Previous Steps: {{{previousSteps}}}
  Current Step: {{{userSolutionStep}}}

  Provide targeted, helpful feedback that encourages critical thinking, but never reveals the answer. Focus on guiding the student towards the correct solution by pointing out potential errors in their reasoning or calculations. Do not provide the answer.
  The feedback should be concise and actionable.
  `,
});

const provideStepFeedbackFlow = ai.defineFlow(
  {
    name: 'provideStepFeedbackFlow',
    inputSchema: ProvideStepFeedbackInputSchema,
    outputSchema: ProvideStepFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
