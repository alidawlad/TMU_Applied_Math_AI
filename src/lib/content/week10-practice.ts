import type { Problem } from '@/lib/types';

export const week10PracticeProblems: Problem[] = [
    // Sequences by General Term (Example 1)
    {
        id: 'SQ1',
        type: 'practice',
        skill: 'Sequences by General Term',
        source: 'Week 10 Example 1 Practice',
        title: 'Find the first four terms for $a_n = 3n + 1$.',
        fullQuestion: 'Find the first four terms of the sequence given by the general term $a_n = 3n + 1$.',
        description: 'Substitute n = 1, 2, 3, 4 into the formula to find the first four terms.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Find the first term ($a_1$)',
                description: 'Substitute n=1 into the formula $a_n = 3n + 1$.',
                solution: '4'
            },
            {
                id: '2',
                title: 'Step 2: Find the second term ($a_2$)',
                description: 'Substitute n=2 into the formula $a_n = 3n + 1$.',
                solution: '7'
            },
            {
                id: '3',
                title: 'Step 3: Find the third term ($a_3$)',
                description: 'Substitute n=3 into the formula $a_n = 3n + 1$.',
                solution: '10'
            },
            {
                id: '4',
                title: 'Step 4: Find the fourth term ($a_4$)',
                description: 'Substitute n=4 into the formula $a_n = 3n + 1$.',
                solution: '13'
            }
        ]
    },
    {
        id: 'SQ2',
        type: 'practice',
        skill: 'Sequences by General Term',
        source: 'Week 10 Example 1 Practice',
        title: 'Find specified terms for $a_n = \\frac{(-1)^n}{n}$.',
        fullQuestion: 'Find the 1st, 3rd, and 6th terms of the sequence given by the general term $a_n = \\frac{(-1)^n}{n}$.',
        description: 'This is an alternating sequence like part c) in Example 1. The $(-1)^n$ part creates the alternating positive/negative pattern. Pay attention to the sign changes!',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Find the first term ($a_1$)',
                description: 'Substitute n=1 into the formula $a_n = \\frac{(-1)^n}{n}$.',
                solution: '-1'
            },
            {
                id: '2',
                title: 'Step 2: Find the third term ($a_3$)',
                description: 'Substitute n=3 into the formula $a_n = \\frac{(-1)^n}{n}$.',
                solution: '-1/3'
            },
            {
                id: '3',
                title: 'Step 3: Find the sixth term ($a_6$)',
                description: 'Substitute n=6 into the formula $a_n = \\frac{(-1)^n}{n}$.',
                solution: '1/6'
            }
        ]
    },
    {
        id: 'SQ3',
        type: 'practice',
        skill: 'Sequences by General Term',
        source: 'Week 10 Example 1 Practice',
        title: 'Find the first five terms of $a_n = \\frac{n^2 - 1}{n + 1}$.',
        fullQuestion: 'Find the first five terms of the sequence given by the general term $a_n = \\frac{n^2 - 1}{n + 1}$.',
        description: 'Factor the numerator to simplify the expression before substituting.',
        idealTime: 240,
        steps: [
            {
                id: '1',
                title: 'Step 1: Simplify the general term',
                description: 'Factor $n^2 - 1 = (n-1)(n+1)$, so $a_n = \\frac{(n-1)(n+1)}{n+1} = n-1$ for $n \\neq -1$.',
                solution: 'a_n = n - 1'
            },
            {
                id: '2',
                title: 'Step 2: Find the first five terms',
                description: 'Substitute n = 1, 2, 3, 4, 5 into $a_n = n - 1$.',
                solution: '0, 1, 2, 3, 4'
            }
        ]
    },
    // Sequences by Listing Terms & Recursive Definitions (Example 2)
    {
        id: 'SQ4',
        type: 'practice',
        skill: 'Pattern Recognition',
        source: 'Week 10 Example 2 Practice',
        title: 'Find the general term for the sequence $5, 10, 20, 40, 80, ...$',
        fullQuestion: 'Find the general term $a_n$ for the sequence $5, 10, 20, 40, 80, ...$',
        description: 'Look for a pattern in how each term relates to the previous one.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the pattern',
                description: 'Observe that each term is obtained by multiplying the previous term by 2.',
                solution: '10 = 5 × 2, 20 = 10 × 2, 40 = 20 × 2, 80 = 40 × 2'
            },
            {
                id: '2',
                title: 'Step 2: Express in terms of powers of 2',
                description: 'Write each term as $5 \\cdot 2^{n-1}$.',
                solution: '$a_1 = 5 \\cdot 2^0 = 5$, $a_2 = 5 \\cdot 2^1 = 10$, $a_3 = 5 \\cdot 2^2 = 20$'
            },
            {
                id: '3',
                title: 'Step 3: Write the general term',
                description: 'The general term is $a_n = 5 \\cdot 2^{n-1}$.',
                solution: '$a_n = 5 \\cdot 2^{n-1}$'
            }
        ]
    },
    {
        id: 'SQ5',
        type: 'practice',
        skill: 'Recursive Sequences',
        source: 'Week 10 Example 2 Practice',
        title: 'Find the first 5 terms of the recursive sequence $a_1 = 2$, $a_n = 3a_{n-1} - 1$.',
        fullQuestion: 'Find the first 5 terms of the sequence defined by $a_1 = 2$ and $a_n = 3a_{n-1} - 1$ for $n \\geq 2$.',
        description: 'Use the recursive formula to find each subsequent term.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Given first term',
                description: 'We are given that $a_1 = 2$.',
                solution: '$a_1 = 2$'
            },
            {
                id: '2',
                title: 'Step 2: Find $a_2$',
                description: 'Use the recursive formula: $a_2 = 3a_1 - 1 = 3(2) - 1 = 5$.',
                solution: '$a_2 = 5$'
            },
            {
                id: '3',
                title: 'Step 3: Find $a_3$',
                description: 'Use the recursive formula: $a_3 = 3a_2 - 1 = 3(5) - 1 = 14$.',
                solution: '$a_3 = 14$'
            },
            {
                id: '4',
                title: 'Step 4: Find $a_4$',
                description: 'Use the recursive formula: $a_4 = 3a_3 - 1 = 3(14) - 1 = 41$.',
                solution: '$a_4 = 41$'
            },
            {
                id: '5',
                title: 'Step 5: Find $a_5$',
                description: 'Use the recursive formula: $a_5 = 3a_4 - 1 = 3(41) - 1 = 122$.',
                solution: '$a_5 = 122$'
            }
        ]
    },
    {
        id: 'SQ6',
        type: 'practice',
        skill: 'Pattern Recognition',
        source: 'Week 10 Example 2 Practice',
        title: 'Find the general term for the sequence $\\frac{1}{2}, \\frac{2}{3}, \\frac{3}{4}, \\frac{4}{5}, ...$',
        fullQuestion: 'Find the general term $a_n$ for the sequence $\\frac{1}{2}, \\frac{2}{3}, \\frac{3}{4}, \\frac{4}{5}, ...$',
        description: 'Look at the pattern in both the numerator and denominator.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Analyze the numerators',
                description: 'The numerators are 1, 2, 3, 4, ... which follows the pattern $n$.',
                solution: 'Numerators: 1, 2, 3, 4, ... = n'
            },
            {
                id: '2',
                title: 'Step 2: Analyze the denominators',
                description: 'The denominators are 2, 3, 4, 5, ... which follows the pattern $n+1$.',
                solution: 'Denominators: 2, 3, 4, 5, ... = n+1'
            },
            {
                id: '3',
                title: 'Step 3: Write the general term',
                description: 'Combining the patterns, the general term is $a_n = \\frac{n}{n+1}$.',
                solution: '$a_n = \\frac{n}{n+1}$'
            }
        ]
    },
    // Fibonacci Sequence (Example 3)
    {
        id: 'SQ7',
        type: 'practice',
        skill: 'Fibonacci Sequence',
        source: 'Week 10 Example 3 Practice',
        title: 'Find the first 8 terms of the Fibonacci sequence.',
        fullQuestion: 'Using the recursive definition $F_1 = 1$, $F_2 = 1$, and $F_n = F_{n-1} + F_{n-2}$ for $n \\geq 3$, find the first 8 terms of the Fibonacci sequence.',
        description: 'This is exactly like Example 3! Apply the recursive definition step by step, just like we did with the Fibonacci sequence.',
        idealTime: 240,
        steps: [
            {
                id: '1',
                title: 'Step 1: Given terms',
                description: 'We are given that $F_1 = 1$ and $F_2 = 1$.',
                solution: '$F_1 = 1$, $F_2 = 1$'
            },
            {
                id: '2',
                title: 'Step 2: Find $F_3$ through $F_5$',
                description: 'Use the recursive formula: $F_3 = F_2 + F_1 = 1 + 1 = 2$, $F_4 = F_3 + F_2 = 2 + 1 = 3$, $F_5 = F_4 + F_3 = 3 + 2 = 5$.',
                solution: '$F_3 = 2$, $F_4 = 3$, $F_5 = 5$'
            },
            {
                id: '3',
                title: 'Step 3: Find $F_6$ through $F_8$',
                description: 'Continue: $F_6 = F_5 + F_4 = 5 + 3 = 8$, $F_7 = F_6 + F_5 = 8 + 5 = 13$, $F_8 = F_7 + F_6 = 13 + 8 = 21$.',
                solution: '$F_6 = 8$, $F_7 = 13$, $F_8 = 21$'
            },
            {
                id: '4',
                title: 'Step 4: List the sequence',
                description: 'The first 8 terms are: 1, 1, 2, 3, 5, 8, 13, 21.',
                solution: '1, 1, 2, 3, 5, 8, 13, 21'
            }
        ]
    },
    {
        id: 'SQ8',
        type: 'practice',
        skill: 'Modified Fibonacci',
        source: 'Week 10 Example 3 Practice',
        title: 'Find the first 6 terms of the modified Fibonacci sequence $a_1 = 3$, $a_2 = 5$, $a_n = a_{n-1} + a_{n-2}$.',
        fullQuestion: 'Find the first 6 terms of the sequence defined by $a_1 = 3$, $a_2 = 5$, and $a_n = a_{n-1} + a_{n-2}$ for $n \\geq 3$.',
        description: 'This follows the same recursive pattern as the Fibonacci sequence in Example 3, but with different starting values. The pattern is identical: each term equals the sum of the two previous terms!',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Given terms',
                description: 'We are given that $a_1 = 3$ and $a_2 = 5$.',
                solution: '$a_1 = 3$, $a_2 = 5$'
            },
            {
                id: '2',
                title: 'Step 2: Find $a_3$ and $a_4$',
                description: 'Use the recursive formula: $a_3 = a_2 + a_1 = 5 + 3 = 8$, $a_4 = a_3 + a_2 = 8 + 5 = 13$.',
                solution: '$a_3 = 8$, $a_4 = 13$'
            },
            {
                id: '3',
                title: 'Step 3: Find $a_5$ and $a_6$',
                description: 'Continue: $a_5 = a_4 + a_3 = 13 + 8 = 21$, $a_6 = a_5 + a_4 = 21 + 13 = 34$.',
                solution: '$a_5 = 21$, $a_6 = 34$'
            },
            {
                id: '4',
                title: 'Step 4: List the sequence',
                description: 'The first 6 terms are: 3, 5, 8, 13, 21, 34.',
                solution: '3, 5, 8, 13, 21, 34'
            }
        ]
    },
    {
        id: 'SQ9',
        type: 'practice',
        skill: 'Golden Ratio Application',
        source: 'Week 10 Example 3 Practice',
        title: 'Use Binet\'s formula to find $F_5$.',
        fullQuestion: 'Use Binet\'s formula $F_n = \\frac{1}{\\sqrt{5}} \\left[ \\left( \\frac{1 + \\sqrt{5}}{2} \\right)^n - \\left( \\frac{1 - \\sqrt{5}}{2} \\right)^n \\right]$ to find $F_5$.',
        description: 'Use Binet\'s formula from Example 3! This formula lets us find any Fibonacci number directly without computing all the previous terms. Use the approximation $\\sqrt{5} \\approx 2.236$.',
        idealTime: 300,
        steps: [
            {
                id: '1',
                title: 'Step 1: Calculate the golden ratio',
                description: 'Calculate $\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx \\frac{1 + 2.236}{2} \\approx 1.618$.',
                solution: '$\\phi \\approx 1.618$'
            },
            {
                id: '2',
                title: 'Step 2: Calculate the conjugate',
                description: 'Calculate $\\hat{\\phi} = \\frac{1 - \\sqrt{5}}{2} \\approx \\frac{1 - 2.236}{2} \\approx -0.618$.',
                solution: '$\\hat{\\phi} \\approx -0.618$'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the powers',
                description: 'Calculate $\\phi^5 \\approx (1.618)^5 \\approx 11.09$ and $\\hat{\\phi}^5 \\approx (-0.618)^5 \\approx -0.09$.',
                solution: '$\\phi^5 \\approx 11.09$, $\\hat{\\phi}^5 \\approx -0.09$'
            },
            {
                id: '4',
                title: 'Step 4: Apply Binet\'s formula',
                description: 'Calculate $F_5 = \\frac{1}{\\sqrt{5}}[11.09 - (-0.09)] = \\frac{11.18}{2.236} \\approx 5$.',
                solution: '$F_5 = 5$'
            }
        ]
    }
];
