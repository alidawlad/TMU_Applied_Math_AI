import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Validate that GOOGLE_AI_API_KEY is available
if (!process.env.GOOGLE_AI_API_KEY) {
  throw new Error(
    'GOOGLE_AI_API_KEY environment variable is required but not found. ' +
    'Please ensure it is set in your Vercel environment variables.'
  );
}

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash-lite',
});
