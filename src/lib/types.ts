export type Step = {
  id: string | number;
  title: string;
  description: string;
  solution: string;
  hint?: string;
  calculator_tip?: string;
};

export type Problem = {
  id: string;
  type: 'practice'; // Removed 'lead-example'
  source: string;
  skill: string;
  title: string;
  description: string;
  fullQuestion?: string;
  steps: Step[];
  idealTime?: number;
};

export type LectureContentSegment = {
  type: 'heading' | 'subheading' | 'paragraph' | 'list' | 'numbered-list' | 'math' | 'image';
  text?: string;
  items?: string[];
  imageUrl?: string;
  alt?: string;
};

export type Example = {
  id: string;
  title:string;
  segments: LectureContentSegment[];
  relatedPracticeProblemIds: string[];
}

export type ModuleContent = {
  id: string;
  name: string;
  description: string;
  examples: Example[];
  problems: Problem[];
}

export type Lecture = {
  id: string;
  title: string;
  modules: ModuleContent[];
};
