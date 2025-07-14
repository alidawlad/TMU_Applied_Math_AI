import type { Problem } from '@/lib/types';

export const week10PracticeProblems: Problem[] = [
    // Sequences
    {
        id: 'SQ1',
        type: 'practice',
        skill: 'Sequences by General Term',
        source: 'Week 10 Example 1 Practice',
        title: 'Find the first four terms for $a_n = n^2$.',
        fullQuestion: 'Find the first four terms of the sequence given by the general term $a_n = n^2$.',
        description: 'The sequence is given by its general term $a_n = n^2$. We see that $a_n = n^2$ is the sequence of squares of natural numbers: 1, 4, 9, 16, 25, . . .',
        idealTime: 180,
        steps: [
             {
                id: '1',
                title: 'Step 1: Find the first term ($a_1$)',
                description: 'Substitute n=1 into the formula $a_n = n^2$.',
                solution: '1'
            },
            {
                id: '2',
                title: 'Step 2: Find the second term ($a_2$)',
                description: 'Substitute n=2 into the formula $a_n = n^2$.',
                solution: '4'
            },
            {
                id: '3',
                title: 'Step 3: Find the third term ($a_3$)',
                description: 'Substitute n=3 into the formula $a_n = n^2$.',
                solution: '9'
            },
            {
                id: '4',
                title: 'Step 4: Find the fourth term ($a_4$)',
                description: 'Substitute n=4 into the formula $a_n = n^2$.',
                solution: '16'
            }
        ]
    },
    {
        id: 'SQ2',
        type: 'practice',
        skill: 'Sequences by General Term',
        source: 'Week 10 Example 1 Practice',
        title: 'Find specified terms for $a_n = \\frac{1}{2^n}$.',
        fullQuestion: 'Find the 1st, 2nd, and 5th terms of the sequence given by the general term $a_n = \\frac{1}{2^n}$.',
        description: '',
        idealTime: 180,
        steps: [
             {
                id: '1',
                title: 'Step 1: Find the first term ($a_1$)',
                description: 'Substitute n=1 into the formula $a_n = \\frac{1}{2^n}$.',
                solution: '1/2'
            },
            {
                id: '2',
                title: 'Step 2: Find the second term ($a_2$)',
                description: 'Substitute n=2 into the formula $a_n = \\frac{1}{2^n}$.',
                solution: '1/4'
            },
            {
                id: '3',
                title: 'Step 3: Find the fifth term ($a_5$)',
                description: 'Substitute n=5 into the formula $a_n = \\frac{1}{2^n}$.',
                solution: '1/32'
            }
        ]
    },
     {
        id: 'SQ3',
        type: 'practice',
        skill: 'Sequences by General Term',
        source: 'Week 10 Practice',
        title: 'Find the first four terms of $a_n = 3n-1$.',
        fullQuestion: 'Find the first four terms of the sequence given by the general term $a_n = 3n-1$.',
        description: '',
        idealTime: 180,
        steps: [
            { id: '1', title: 'Find $a_1$', description: 'Substitute n=1.', solution: '2' },
            { id: '2', title: 'Find $a_2$', description: 'Substitute n=2.', solution: '5' },
            { id: '3', title: 'Find $a_3$', description: 'Substitute n=3.', solution: '8' },
            { id: '4', title: 'Find $a_4$', description: 'Substitute n=4.', solution: '11' },
        ]
    },
];
