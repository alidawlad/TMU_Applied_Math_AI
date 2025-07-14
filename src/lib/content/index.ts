import type { Lecture, ModuleContent } from '@/lib/types';
import { week10Examples } from './week10-examples';
import { week10PracticeProblems } from './week10-practice';

// Create modules by combining examples and practice problems
const sequencesModule: ModuleContent = {
    id: 'sequences',
    name: 'Sequences',
    description: 'Understanding and working with sequences.',
    examples: week10Examples.filter(e => e.id.startsWith('W10-E1')),
    problems: week10PracticeProblems.filter(p => p.skill === 'Sequences by General Term')
};

const summationModule: ModuleContent = {
    id: 'summation-notation',
    name: 'Summation Notation',
    description: 'Learn to use and manipulate summation (sigma) notation.',
    examples: week10Examples.filter(e => e.id.startsWith('W10-E2') || e.id.startsWith('W10-E3')),
    problems: week10PracticeProblems.filter(p => p.skill === 'Summation Notation' || p.skill === 'Properties of Summation')
};


// Assemble the lecture
export const lectures: Lecture[] = [
    {
        id: 'lecture-10',
        title: 'Week 10: Sequences and Series',
        modules: [
            sequencesModule,
            summationModule,
        ]
    }
];
