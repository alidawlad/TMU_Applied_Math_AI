// Core type definitions for the Focused Mastery application

export interface Example {
  id: string;
  title: string;
  relatedPracticeProblemIds?: string[];
  segments: Segment[];
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
}

export interface Step {
  id: string;
  title?: string;
  explanation?: string;
  description?: string;
  question?: string;
  answer?: string;
  solution?: string;
  hint?: string;
  hints?: string[];
  calculator_tip?: string;
}

export interface Segment {
  type: 'heading' | 'paragraph' | 'math' | 'callout' | 'connection' | 'summary-box' | 'numbered-list' | 'bullet-list' | 'divider' | 'link';
  text?: string;
  items?: string[];
  emphasis?: 'primary' | 'secondary' | 'accent';
  href?: string;
  linkText?: string;
}

export interface ModuleContent {
  id: string;
  name?: string; // Legacy property
  title: string;
  description: string;
  examples: Example[];
  problems: Problem[];
}

export interface Lecture {
  id: string;
  title: string;
  week: number;
  description: string;
  modules: ModuleContent[];
}

// Legacy segment type for compatibility
export interface LectureContentSegment extends Segment {}