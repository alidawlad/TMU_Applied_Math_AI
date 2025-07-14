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
