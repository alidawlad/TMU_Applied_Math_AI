export type Step = {
  id: string | number;
  title: string;
  description: string;
  solution: string;
  hint?: string;
  calculator_tip?: string;
};

export type Problem = {
  id:string;
  type: 'lead-example' | 'practice';
  source: string;
  skill?: string;
  title: string;
  description: string;
  fullQuestion?: string;
  steps: Step[];
  idealTime?: number;
};

export type LectureContentSegment = {
    type: 'heading' | 'subheading' | 'paragraph' | 'list' | 'numbered-list' | 'math';
    text?: string;
    items?: string[];
}

export type LectureContent = {
    id: string;
    title: string;
    segments: LectureContentSegment[];
}

export type Module = {
  id: string;
  name: string;
  description: string;
  problems: Problem[];
  lectureContent?: LectureContent;
};

export type Lecture = {
  id: string;
  title: string;
  modules: Module[];
};
