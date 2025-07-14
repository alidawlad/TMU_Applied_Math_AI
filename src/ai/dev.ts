'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/evaluate-math-equivalence.ts';
import '@/ai/flows/generate-problem-hints.ts';
import '@/ai/flows/provide-step-feedback.ts';
import '@/ai/flows/explain-example-step.ts';
