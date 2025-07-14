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
    // Summation Notation
    {
        id: 'SN1',
        type: 'practice',
        skill: 'Summation Notation',
        source: 'Week 10 Example 2 Practice',
        title: 'Evaluate the sum $\\sum_{k=1}^4 k^3$.',
        fullQuestion: 'Evaluate the sum $\\sum_{k=1}^4 k^3$.',
        description: 'Expand the summation and add the terms.',
        idealTime: 240,
        steps: [
            { id: '1', title: 'Expand the summation', description: 'Write out the sum term by term from k=1 to k=4.', solution: '1^3 + 2^3 + 3^3 + 4^3' },
            { id: '2', title: 'Calculate the cubes', description: 'Evaluate each term.', solution: '1 + 8 + 27 + 64' },
            { id: '3', title: 'Sum the terms', description: 'Add the numbers together to find the total.', solution: '100' }
        ]
    },
    {
        id: 'SN2',
        type: 'practice',
        skill: 'Summation Notation',
        source: 'Week 10 Example 2 Practice',
        title: 'Evaluate the sum $\\sum_{k=1}^5 (3k-2)$.',
        fullQuestion: 'Evaluate the sum $\\sum_{k=1}^5 (3k-2)$.',
        description: 'Expand the summation and add the terms.',
        idealTime: 240,
        steps: [
            { id: '1', title: 'Expand the summation', description: 'Write out the sum term by term from k=1 to k=5.', solution: '(3(1)-2) + (3(2)-2) + (3(3)-2) + (3(4)-2) + (3(5)-2)' },
            { id: '2', title: 'Calculate the terms', description: 'Evaluate each term in the parentheses.', solution: '1 + 4 + 7 + 10 + 13' },
            { id: '3', title: 'Sum the terms', description: 'Add the numbers together.', solution: '35' }
        ]
    },
    {
        id: 'SN3',
        type: 'practice',
        skill: 'Summation Notation',
        source: 'Week 10 Example 2 Practice',
        title: 'Evaluate the sum $\\sum_{k=1}^{10} 5$.',
        fullQuestion: 'Evaluate the sum $\\sum_{k=1}^{10} 5$.',
        description: 'The term is constant. How many times is it added?',
        idealTime: 120,
        steps: [
            { id: '1', title: 'Understand the constant sum', description: 'The term is 5, and it is summed 10 times.', solution: '10 * 5' },
            { id: '2', title: 'Calculate the result', description: 'Perform the multiplication.', solution: '50' }
        ]
    },
    // Properties of Summation
    {
        id: 'PS1',
        type: 'practice',
        skill: 'Properties of Summation',
        source: 'Week 10 Example 3 Practice',
        title: 'Use properties to split $\\sum_{k=1}^{50} (3k^3 - 4k)$.',
        fullQuestion: 'Use the properties of summation to rewrite the expression $\\sum_{k=1}^{50} (3k^3 - 4k)$. Do not evaluate.',
        description: 'Apply the difference and constant multiple rules for summation.',
        idealTime: 180,
        steps: [
            { id: '1', title: 'Apply the difference rule', description: 'Split the sum into two separate summations.', solution: '\\sum_{k=1}^{50} 3k^3 - \\sum_{k=1}^{50} 4k' },
            { id: '2', title: 'Apply the constant multiple rule', description: 'Factor out the constants from each summation.', solution: '3\\sum_{k=1}^{50} k^3 - 4\\sum_{k=1}^{50} k' }
        ]
    },
    {
        id: 'PS2',
        type: 'practice',
        skill: 'Properties of Summation',
        source: 'Week 10 Example 3 Practice',
        title: 'Use properties to split $\\sum_{k=1}^{n} (k-1)^2$.',
        fullQuestion: 'First, expand the term $(k-1)^2$. Then use the properties of summation to rewrite the expression $\\sum_{k=1}^{n} (k-1)^2$. Do not evaluate.',
        description: 'Expand the binomial, then apply summation properties.',
        idealTime: 300,
        steps: [
            { id: '1', title: 'Expand the expression', description: 'Multiply out $(k-1)^2$.', solution: 'k^2 - 2k + 1' },
            { id: '2', title: 'Rewrite the summation', description: 'Substitute the expanded form back into the summation.', solution: '\\sum_{k=1}^{n} (k^2 - 2k + 1)' },
            { id: '3', title: 'Apply summation properties', description: 'Split the summation and factor out constants.', solution: '\\sum_{k=1}^{n} k^2 - 2\\sum_{k=1}^{n} k + \\sum_{k=1}^{n} 1' },
            { id: '4', title: 'Simplify the constant sum', description: 'Recognize that summing 1 for n times is just n.', solution: '\\sum_{k=1}^{n} k^2 - 2\\sum_{k=1}^{n} k + n' }
        ]
    },
    {
        id: 'PS3',
        type: 'practice',
        skill: 'Properties of Summation',
        source: 'Week 10 Example 3 Practice',
        title: 'Explain why $\\sum_{k=1}^n a_k b_k$ is not equal to $(\\sum_{k=1}^n a_k)(\\sum_{k=1}^n b_k)$.',
        fullQuestion: 'Explain why $\\sum_{k=1}^n a_k b_k \\neq (\\sum_{k=1}^n a_k)(\\sum_{k=1}^n b_k)$ in general. Provide a simple counterexample with n=2.',
        description: 'Show that the sum of products is not the product of sums.',
        idealTime: 240,
        steps: [
            { id: '1', title: 'Provide a conceptual explanation', description: 'Explain the difference. The left side sums products term-by-term. The right side multiplies the entire sum of a_k by the entire sum of b_k, resulting in cross-terms.', solution: 'The left side is $a_1b_1 + a_2b_2 + ...$, while the right side is $(a_1+a_2+...)(b_1+b_2+...)$ which includes terms like $a_1b_2$ and $a_2b_1$.' },
            { id: '2', title: 'Choose simple sequences for a counterexample', description: 'Let n=2. Pick simple values for a_1, a_2, b_1, and b_2. For example, a_k = k and b_k = k.', solution: 'Let $a_1=1, a_2=2$ and $b_1=1, b_2=2$.' },
            { id: '3', title: 'Calculate the left side (LHS)', description: 'Calculate $\\sum_{k=1}^2 a_k b_k = a_1b_1 + a_2b_2$.', solution: '1*1 + 2*2 = 5' },
            { id: '4', title: 'Calculate the right side (RHS)', description: 'Calculate $(\\sum_{k=1}^2 a_k)(\\sum_{k=1}^2 b_k) = (a_1+a_2)(b_1+b_2)$.', solution: '(1+2)(1+2) = 3*3 = 9' },
            { id: '5', title: 'Compare results', description: 'Show that LHS is not equal to RHS.', solution: 'Since 5 is not equal to 9, the property does not hold.' }
        ]
    }
];
