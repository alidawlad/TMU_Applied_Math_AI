// Core type definitions for the CQMS110 - Applied Mathematics for Business application

export interface Example {
  id: string;
  title: string;
  relatedPracticeProblemIds: string[];
  segments: LectureContentSegment[];
}

// Question format types
export type QuestionType = 'step-by-step' | 'multiple-choice' | 'fill-in-blank';

export interface Choice {
  id: string;
  text: string;
  mathContent?: string;
  imageUrl?: string;
  isCorrect: boolean;
}

export interface BlankPosition {
  id: string;
  placeholder: string;
  solution: string;
  hint?: string;
}

export interface MediaContent {
  id: string;
  type: 'image' | 'graph' | 'diagram';
  url: string;
  alt: string;
  caption?: string;
}

export interface Problem {
  id: string;
  type?: string;
  skill?: string;
  source?: string;
  title: string;
  fullQuestion?: string;
  description: string;
  idealTime?: number;
  steps: Step[];
  relatedExampleIds?: string[];
  // New fields for enhanced question formats
  questionType?: QuestionType;
  choices?: Choice[];
  blankPositions?: BlankPosition[];
  mediaContent?: MediaContent[];
}

export interface Step {
  id: string;
  title: string;
  description: string;
  solution: string;
  hint?: string;
  calculator_tip?: string;
  // New fields for enhanced question formats
  questionType?: QuestionType;
  choices?: Choice[];
  blankPositions?: BlankPosition[];
  mediaContent?: MediaContent[];
  // For fill-in-blank: the template with placeholders
  questionTemplate?: string;
  // For multiple choice: additional instruction text
  instructionText?: string;
}

export interface LectureContentSegment {
    type: 'heading' | 'subheading' | 'paragraph' | 'math' | 'list' | 'numbered-list' | 'callout' | 'connection' | 'summary-box' | 'pattern-highlight' | 'step-by-step';
    text?: string;
    items?: string[];
    emphasis?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}

export interface ModuleContent {
  id: string;
  name: string;
  description: string;
  examples: Example[];
  problems: Problem[];
}

export interface Lecture {
  id: string;
  title: string;
  modules: ModuleContent[];
}
