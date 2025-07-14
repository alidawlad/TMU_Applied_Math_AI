# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Focused Mastery" - a NextJS application for TMU Applied Math Mastery that provides AI-powered learning for applied mathematics. The app uses Firebase Studio and features step-by-step problem solving with AI feedback and guidance.

## Development Commands

### Core Development
- `npm run dev` - Start development server with turbopack on port 9002
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code style
- `npm run typecheck` - Run TypeScript type checking

### AI Development (Genkit)
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit with watch mode for development

### Quality Assurance
When making changes, always run:
1. `npm run lint` - Fix any linting issues
2. `npm run typecheck` - Ensure TypeScript types are correct
3. `npm run build` - Verify the build succeeds

## Architecture Overview

### Core Technologies
- **NextJS 15** with App Router (src/app/)
- **Firebase Studio** hosting with apphosting.yaml
- **Genkit AI** for math evaluation and feedback (src/ai/)
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **KaTeX** for mathematical rendering
- **Radix UI** for accessible components

### Key Application Structure

#### Data Layer (`src/lib/`)
- `types.ts` - Core types: Step, Problem, Module, Lecture
- `data.ts` - Contains the curriculum data for all lectures/modules/problems
- `actions.ts` - Server actions for AI interactions
- `utils.ts` - Utility functions

#### AI System (`src/ai/`)
- `genkit.ts` - Genkit AI configuration using Google AI
- `flows/` - AI workflow definitions:
  - `evaluate-math-equivalence.ts` - Checks if student answers are mathematically equivalent
  - `generate-problem-hints.ts` - Generates contextual hints
  - `provide-step-feedback.ts` - Provides feedback on incorrect answers

#### Main Components (`src/components/`)
- `FocusedMasteryApp.tsx` - Main application shell with navigation
- `ProblemDisplay.tsx` - Core problem-solving interface with step-by-step progression
- `MathInput.tsx` - Math-aware input component with KaTeX preview
- `MathRenderer.tsx` - Renders LaTeX math notation
- `ProblemSidebar.tsx` - Navigation between lectures/modules/problems
- `AppHeader.tsx` - Application header with branding and controls

### Application Flow

1. **Home Page** (`src/app/page.tsx`) - Landing page with navigation to Practice or Study Plan
2. **Practice Mode** (`src/app/practice/page.tsx`) - Step-by-step problem solving
3. **Study Plan** (`src/app/study-plan/page.tsx`) - Curriculum overview

### Problem Structure

Problems are organized as:
- **Lectures** (e.g., "Week 8: Functions") contain multiple **Modules**
- **Modules** (e.g., "Composition of Functions") contain multiple **Problems**
- **Problems** contain multiple **Steps** with AI-powered feedback

### AI Integration

The app uses Genkit with Google AI (Gemini 2.0 Flash) for:
- **Math Equivalence Checking** - Determines if student answers are mathematically correct
- **Intelligent Feedback** - Provides contextual hints without giving away answers
- **Step-by-Step Guidance** - Helps students through problem-solving process

## Design System

### Colors & Fonts
- **Primary**: Saturated teal (#008080)
- **Background**: Light desaturated teal (#F0FFFF)
- **Accent**: Soft yellow (#D4D043)
- **Headlines**: 'Space Grotesk' font
- **Body**: 'Inter' font

### UI Components
Uses shadcn/ui components extensively. Key patterns:
- Cards for problem containers
- Alerts for feedback (success/error/info variants)
- Progress bars for step completion
- Math rendering with KaTeX

## Key File Locations

### Critical Files to Understand
- `src/lib/data.ts` - All curriculum content
- `src/lib/types.ts` - Type definitions
- `src/components/FocusedMasteryApp.tsx` - Main app logic
- `src/components/ProblemDisplay.tsx` - Problem-solving interface
- `src/ai/flows/` - AI workflow definitions

### Configuration Files
- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `apphosting.yaml` - Firebase hosting configuration

## Development Workflow

1. **Content Changes**: Edit `src/lib/data.ts` for curriculum updates
2. **AI Flows**: Modify files in `src/ai/flows/` for AI behavior changes
3. **UI Changes**: Components in `src/components/` for interface updates
4. **Testing**: Always run lint and typecheck before committing

## Important Notes

- The app uses client-side state management with localStorage persistence
- Math rendering is handled by KaTeX and requires proper LaTeX syntax
- AI responses are cached and should be tested thoroughly
- The application is designed for progressive disclosure of steps
- All math content should be properly escaped for LaTeX rendering