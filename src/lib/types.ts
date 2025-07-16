// Core type definitions for the CQMS110 - Applied Mathematics for Business application

export interface Example {
  id: string;
  title: string;
  relatedPracticeProblemIds: string[];
  segments: LectureContentSegment[];
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
  title: string;
  description: string;
  solution: string;
  hint?: string;
  calculator_tip?: string;
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
