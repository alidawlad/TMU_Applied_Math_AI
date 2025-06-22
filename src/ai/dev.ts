import { config } from 'dotenv';
config();

import '@/ai/flows/generate-problem-hints.ts';
import '@/ai/flows/provide-step-feedback.ts';