import type { Lecture, ModuleContent } from '@/lib/types';
import { week10Examples } from './week10-examples';
import { week10PracticeProblems } from './week10-practice';

// Create modules by combining examples and practice problems
const sequencesModule: ModuleContent = {
    id: 'sequences',
    name: 'Sequences',
    description: 'Understanding and working with sequences.',
    examples: week10Examples.filter(e => e.id.startsWith('W10-E')), // Assuming a naming convention
    problems: week10PracticeProblems.filter(p => p.skill === 'Sequences by General Term')
};

// ... add other modules for Week 10 here as content grows

// Assemble the lecture
export const lectures: Lecture[] = [
    {
        id: 'lecture-10',
        title: 'Week 10: Sequences and Series',
        modules: [
            sequencesModule,
            // ... other modules
        ]
    }
];
