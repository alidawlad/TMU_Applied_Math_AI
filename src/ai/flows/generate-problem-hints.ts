'use server';

/**
 * @fileOverview Generates hints for math problems.
 *
 * - generateProblemHint - A function that generates a hint for a given math problem and current step.
 * - GenerateProblemHintInput - The input type for the generateProblemHint function.
 * - GenerateProblemHintOutput - The return type for the generateProblemHint function.
 */

import {ai, isAIAvailable} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProblemHintInputSchema = z.object({
  problemDescription: z.string().describe('The description of the math problem.'),
  currentStep: z.string().describe('The current step the student is on.'),
  studentInput: z.string().describe('The student\u2019s input for the current step.'),
});

export type GenerateProblemHintInput = z.infer<typeof GenerateProblemHintInputSchema>;

const GenerateProblemHintOutputSchema = z.object({
  hint: z.string().describe('A helpful hint for the student, encouraging critical thinking without giving away the answer.'),
});

export type GenerateProblemHintOutput = z.infer<typeof GenerateProblemHintOutputSchema>;

export async function generateProblemHint(input: GenerateProblemHintInput): Promise<GenerateProblemHintOutput> {
  if (!isAIAvailable() || !ai || !generateProblemHintFlow) {
    throw new Error('AI service is not available');
  }
  return generateProblemHintFlow(input);
}

const prompt = ai?.definePrompt({
  name: 'generateProblemHintPrompt',
  input: {schema: GenerateProblemHintInputSchema},
  output: {schema: GenerateProblemHintOutputSchema},
  prompt: `You are a helpful math tutor. A student is working on the following problem:

Problem: {{{problemDescription}}}

Current Step: {{{currentStep}}}

Student Input: {{{studentInput}}}

Provide a hint to guide the student towards the correct solution without giving away the answer directly. The hint should encourage critical thinking. Focus on their current step and input. Make sure not to reveal any answers.`,
});

const generateProblemHintFlow = ai?.defineFlow(
  {
    name: 'generateProblemHintFlow',
    inputSchema: GenerateProblemHintInputSchema,
    outputSchema: GenerateProblemHintOutputSchema,
  },
  async input => {
    if (!prompt) {
      throw new Error('AI prompt not initialized');
    }
    const {output} = await prompt(input);
    return output!;
  }
);
