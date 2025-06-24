export type Step = {
  id: number | string;
  title: string;
  description: string;
  solution: string;
  hint?: string;
  calculator_callout?: {
    title: string;
    description: string;
  };
};

export type Problem = {
  id: string;
  type: 'lead-example' | 'practice';
  source: string;
  title: string;
  description: string;
  steps: Step[];
};

export type Module = {
  id: string;
  name: string;
  description: string;
  problems: Problem[];
};

export type Lecture = {
  id: string;
  title: string;
  modules: Module[];
};
