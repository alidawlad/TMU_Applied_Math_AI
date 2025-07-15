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
    },
    // Summation Notation (Examples 4-5)
    {
        id: 'SQ10',
        type: 'practice',
        skill: 'Summation Notation',
        source: 'Week 10 Example 4 Practice',
        title: 'Expand and evaluate $\\sum_{i=1}^{4} 3i$.',
        fullQuestion: 'Expand the summation $\\sum_{i=1}^{4} 3i$ and find its value.',
        description: 'Just like Example 4, substitute each value of the index into the expression and add the results.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Substitute values',
                description: 'Replace $i$ with 1, 2, 3, 4 in the expression $3i$: $3(1) + 3(2) + 3(3) + 3(4)$',
                solution: '3 + 6 + 9 + 12',
                hint: 'Start with $i=1$: $3(1)=3$, then $i=2$: $3(2)=6$, and so on. The index tells you which number to multiply by 3.'
            },
            {
                id: '2',
                title: 'Step 2: Calculate the sum',
                description: 'Add all the terms: $3 + 6 + 9 + 12 = 30$',
                solution: '30',
                hint: 'Add from left to right: $3 + 6 = 9$, then $9 + 9 = 18$, finally $18 + 12 = 30$.'
            }
        ]
    },
    {
        id: 'SQ11',
        type: 'practice',
        skill: 'Summation Notation',
        source: 'Week 10 Example 4 Practice',
        title: 'Expand and evaluate $\\sum_{i=2}^{5} (i^2 + 1)$.',
        fullQuestion: 'Expand the summation $\\sum_{i=2}^{5} (i^2 + 1)$ and find its value.',
        description: 'The index starts at 2 and goes to 5. Substitute each value into the expression $i^2 + 1$.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Substitute each index value',
                description: 'For $i = 2, 3, 4, 5$: $(2^2 + 1) + (3^2 + 1) + (4^2 + 1) + (5^2 + 1)$',
                solution: '(4 + 1) + (9 + 1) + (16 + 1) + (25 + 1)',
                hint: 'Calculate $i^2$ first, then add 1 for each term.'
            },
            {
                id: '2',
                title: 'Step 2: Simplify each term',
                description: 'Simplify: $5 + 10 + 17 + 26$',
                solution: '5 + 10 + 17 + 26',
                hint: 'Each term is $i^2 + 1$ for the respective values of $i$.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate final sum',
                description: 'Add all terms: $5 + 10 + 17 + 26 = 58$',
                solution: '58',
                hint: 'This is the value of the summation.'
            }
        ]
    },
    {
        id: 'SQ12',
        type: 'practice',
        skill: 'Summation Notation',
        source: 'Week 10 Example 4 Practice',
        title: 'Write the sum $2 + 4 + 6 + 8 + 10$ using summation notation.',
        fullQuestion: 'Express the sum $2 + 4 + 6 + 8 + 10$ using summation notation.',
        description: 'Look for the pattern in the terms and express it as a summation.',
        idealTime: 150,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the pattern',
                description: 'The terms are 2, 4, 6, 8, 10 - these are even numbers: $2 \\cdot 1, 2 \\cdot 2, 2 \\cdot 3, 2 \\cdot 4, 2 \\cdot 5$',
                solution: 'Pattern: $2i$ where $i$ goes from 1 to 5',
                hint: 'Each term is twice the position number.'
            },
            {
                id: '2',
                title: 'Step 2: Write in summation notation',
                description: 'Express as: $\\sum_{i=1}^{5} 2i$',
                solution: '$\\sum_{i=1}^{5} 2i$',
                hint: 'The general term is $2i$ and the index goes from 1 to 5.'
            }
        ]
    },
    {
        id: 'SQ13',
        type: 'practice',
        skill: 'Index Manipulation',
        source: 'Week 10 Example 5 Practice',
        title: 'Expand and evaluate $\\sum_{i=1}^{4} (2i - 3)$.',
        fullQuestion: 'Expand the summation $\\sum_{i=1}^{4} (2i - 3)$ and find its value.',
        description: 'Like Example 5, substitute each index value into the expression $(2i - 3)$.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Substitute each value',
                description: 'For $i = 1, 2, 3, 4$: $(2(1) - 3) + (2(2) - 3) + (2(3) - 3) + (2(4) - 3)$',
                solution: '(2 - 3) + (4 - 3) + (6 - 3) + (8 - 3)',
                hint: 'Calculate $2i$ first, then subtract 3 for each term.'
            },
            {
                id: '2',
                title: 'Step 2: Simplify each term',
                description: 'Simplify: $(-1) + 1 + 3 + 5$',
                solution: '-1 + 1 + 3 + 5',
                hint: 'Notice we get an arithmetic sequence: -1, 1, 3, 5.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate final sum',
                description: 'Add: $-1 + 1 + 3 + 5 = 8$',
                solution: '8',
                hint: 'The negative and positive terms partially cancel out.'
            }
        ]
    },
    {
        id: 'SQ14',
        type: 'practice',
        skill: 'Index Manipulation', 
        source: 'Week 10 Example 5 Practice',
        title: 'Evaluate $\\sum_{j=0}^{3} (j^2 + 2j)$.',
        fullQuestion: 'Find the value of $\\sum_{j=0}^{3} (j^2 + 2j)$.',
        description: 'Notice the index starts at 0. Substitute $j = 0, 1, 2, 3$ into the expression.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Substitute values starting from 0',
                description: 'For $j = 0, 1, 2, 3$: $(0^2 + 2(0)) + (1^2 + 2(1)) + (2^2 + 2(2)) + (3^2 + 2(3))$',
                solution: '(0 + 0) + (1 + 2) + (4 + 4) + (9 + 6)',
                hint: 'Don\'t forget that the index starts at 0, not 1.'
            },
            {
                id: '2',
                title: 'Step 2: Simplify each term',
                description: 'Simplify: $0 + 3 + 8 + 15$',
                solution: '0 + 3 + 8 + 15',
                hint: 'Calculate $j^2 + 2j$ for each value of $j$.'
            },
            {
                id: '3',
                title: 'Step 3: Find the sum',
                description: 'Add: $0 + 3 + 8 + 15 = 26$',
                solution: '26',
                hint: 'This is the final value of the summation.'
            }
        ]
    },
    {
        id: 'SQ15',
        type: 'practice',
        skill: 'Index Manipulation',
        source: 'Week 10 Example 5 Practice',
        title: 'Express the mean formula using summation notation.',
        fullQuestion: 'Write the mean (average) of numbers $x_1, x_2, x_3, x_4, x_5$ using summation notation.',
        description: 'The mean is the sum of all values divided by the count. Express this using $\\Sigma$ notation.',
        idealTime: 120,
        steps: [
            {
                id: '1',
                title: 'Step 1: Write the mean formula',
                description: 'Mean = $\\frac{x_1 + x_2 + x_3 + x_4 + x_5}{5}$',
                solution: '$\\frac{x_1 + x_2 + x_3 + x_4 + x_5}{5}$',
                hint: 'The mean is the sum divided by the number of terms.'
            },
            {
                id: '2',
                title: 'Step 2: Express using summation notation',
                description: 'Using $\\Sigma$ notation: $\\frac{1}{5}\\sum_{i=1}^{5} x_i$',
                solution: '$\\frac{1}{5}\\sum_{i=1}^{5} x_i$',
                hint: 'The numerator becomes a summation from $i=1$ to $5$.'
            }
        ]
    },
    // Arithmetic Sequences (Examples 6-7)
    {
        id: 'SQ16',
        type: 'practice',
        skill: 'Arithmetic Sequences',
        source: 'Week 10 Example 6 Practice',
        title: 'Find the first six terms of arithmetic sequence with $a_1 = 3$, $d = 4$.',
        fullQuestion: 'Write the first six terms of an arithmetic sequence with first term $a_1 = 3$ and common difference $d = 4$.',
        description: 'Like Example 6, use the recursive relationship $a_n = a_{n-1} + d$ to find each term.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Start with the first term',
                description: 'Given: $a_1 = 3$',
                solution: '$a_1 = 3$',
                hint: 'This is our starting point.'
            },
            {
                id: '2',
                title: 'Step 2: Find the next three terms',
                description: 'Using $a_n = a_{n-1} + d = a_{n-1} + 4$: $a_2 = 3 + 4 = 7$, $a_3 = 7 + 4 = 11$, $a_4 = 11 + 4 = 15$',
                solution: '$a_2 = 7$, $a_3 = 11$, $a_4 = 15$',
                hint: 'Add the common difference to get each successive term.'
            },
            {
                id: '3',
                title: 'Step 3: Find the remaining terms',
                description: 'Continue: $a_5 = 15 + 4 = 19$, $a_6 = 19 + 4 = 23$',
                solution: '$a_5 = 19$, $a_6 = 23$',
                hint: 'Keep adding 4 to get the next terms.'
            },
            {
                id: '4',
                title: 'Step 4: List the sequence',
                description: 'The first six terms are: $3, 7, 11, 15, 19, 23$',
                solution: '3, 7, 11, 15, 19, 23',
                hint: 'Each term increases by 4 from the previous term.'
            }
        ]
    },
    {
        id: 'SQ17',
        type: 'practice',
        skill: 'Arithmetic Sequences',
        source: 'Week 10 Example 6 Practice',
        title: 'Find the 10th term of arithmetic sequence with $a_1 = -2$, $d = 3$.',
        fullQuestion: 'Find the 10th term of an arithmetic sequence with first term $a_1 = -2$ and common difference $d = 3$.',
        description: 'Use the general formula $a_n = a_1 + (n-1)d$ to find the specific term.',
        idealTime: 150,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the given values',
                description: 'Given: $a_1 = -2$, $d = 3$, find $a_{10}$',
                solution: '$a_1 = -2$, $d = 3$, $n = 10$',
                hint: 'We need to find the 10th term, so $n = 10$.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the formula',
                description: 'Use $a_n = a_1 + (n-1)d$: $a_{10} = -2 + (10-1) \\cdot 3$',
                solution: '$a_{10} = -2 + 9 \\cdot 3$',
                hint: 'Substitute the known values into the general term formula.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the result',
                description: 'Simplify: $a_{10} = -2 + 27 = 25$',
                solution: '$a_{10} = 25$',
                hint: 'The 10th term of the sequence is 25.'
            }
        ]
    },
    {
        id: 'SQ18',
        type: 'practice',
        skill: 'Arithmetic Sequences',
        source: 'Week 10 Example 6 Practice',
        title: 'Find $a_1$ and $d$ if $a_5 = 17$ and $a_8 = 26$.',
        fullQuestion: 'In an arithmetic sequence, if $a_5 = 17$ and $a_8 = 26$, find the first term $a_1$ and common difference $d$.',
        description: 'Use the general formula with two known terms to create a system of equations.',
        idealTime: 240,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up equations using the general formula',
                description: 'Using $a_n = a_1 + (n-1)d$: $a_5 = a_1 + 4d = 17$ and $a_8 = a_1 + 7d = 26$',
                solution: '$a_1 + 4d = 17$ and $a_1 + 7d = 26$',
                hint: 'Substitute $n = 5$ and $n = 8$ into the general formula.'
            },
            {
                id: '2',
                title: 'Step 2: Solve for the common difference',
                description: 'Subtract the first equation from the second: $(a_1 + 7d) - (a_1 + 4d) = 26 - 17$, so $3d = 9$, thus $d = 3$',
                solution: '$d = 3$',
                hint: 'Subtracting eliminates $a_1$ and gives us $d$ directly.'
            },
            {
                id: '3',
                title: 'Step 3: Find the first term',
                description: 'Substitute $d = 3$ into $a_1 + 4d = 17$: $a_1 + 4(3) = 17$, so $a_1 + 12 = 17$, thus $a_1 = 5$',
                solution: '$a_1 = 5$',
                hint: 'Use either equation to find $a_1$ once you know $d$.'
            }
        ]
    },
    {
        id: 'SQ19',
        type: 'practice',
        skill: 'Common Difference',
        source: 'Week 10 Example 7 Practice',
        title: 'Determine if $7, 12, 17, 22, 27$ is arithmetic.',
        fullQuestion: 'Determine if the sequence $7, 12, 17, 22, 27$ is arithmetic. If so, find the common difference.',
        description: 'Like Example 7, check if consecutive differences are constant.',
        idealTime: 150,
        steps: [
            {
                id: '1',
                title: 'Step 1: Calculate consecutive differences',
                description: 'Find differences: $12-7=5$, $17-12=5$, $22-17=5$, $27-22=5$',
                solution: 'All differences equal 5',
                hint: 'Check if $a_n - a_{n-1}$ is the same for all consecutive terms.'
            },
            {
                id: '2',
                title: 'Step 2: Determine if arithmetic',
                description: 'Since all consecutive differences are equal to 5, the sequence is arithmetic with $d = 5$',
                solution: 'Yes, arithmetic with $d = 5$',
                hint: 'Constant differences confirm it\'s an arithmetic sequence.'
            }
        ]
    },
    {
        id: 'SQ20',
        type: 'practice',
        skill: 'Common Difference',
        source: 'Week 10 Example 7 Practice',
        title: 'Check if $1, 4, 8, 13, 19$ is arithmetic.',
        fullQuestion: 'Determine if the sequence $1, 4, 8, 13, 19$ is arithmetic. If so, find the common difference.',
        description: 'Calculate the differences between consecutive terms to check for constant difference.',
        idealTime: 150,
        steps: [
            {
                id: '1',
                title: 'Step 1: Calculate consecutive differences',
                description: 'Find differences: $4-1=3$, $8-4=4$, $13-8=5$, $19-13=6$',
                solution: 'Differences: 3, 4, 5, 6',
                hint: 'Calculate each $a_{n+1} - a_n$ systematically.'
            },
            {
                id: '2',
                title: 'Step 2: Check for constant difference',
                description: 'The differences are not constant (3, 4, 5, 6), so this is not an arithmetic sequence',
                solution: 'Not arithmetic',
                hint: 'For arithmetic sequences, all differences must be identical.'
            }
        ]
    },
    {
        id: 'SQ21',
        type: 'practice',
        skill: 'Common Difference',
        source: 'Week 10 Example 7 Practice',
        title: 'Find the missing term in arithmetic sequence $5, ?, 13, 17$.',
        fullQuestion: 'Find the missing second term in the arithmetic sequence $5, ?, 13, 17$.',
        description: 'Use the fact that in arithmetic sequences, the common difference is constant.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Find the common difference from known terms',
                description: 'Using $a_3 = 13$ and $a_4 = 17$: $d = 17 - 13 = 4$',
                solution: '$d = 4$',
                hint: 'Use two consecutive known terms to find the common difference.'
            },
            {
                id: '2',
                title: 'Step 2: Find the missing term',
                description: 'Since $a_2 = a_1 + d = 5 + 4 = 9$',
                solution: '$a_2 = 9$',
                hint: 'Add the common difference to the first term.'
            },
            {
                id: '3',
                title: 'Step 3: Verify the answer',
                description: 'Check: $5, 9, 13, 17$ has constant differences of 4',
                solution: 'Sequence: 5, 9, 13, 17',
                hint: 'All consecutive differences should equal 4.'
            }
        ]
    },
    // Arithmetic Applications (Examples 8-9)
    {
        id: 'SQ22',
        type: 'practice',
        skill: 'Arithmetic Applications',
        source: 'Week 10 Example 8 Practice',
        title: 'Theater seating application with arithmetic sequence.',
        fullQuestion: 'A theater has 20 seats in the first row, 24 seats in the second row, 28 seats in the third row, and so on. How many seats are in the 15th row?',
        description: 'Like Example 8, model this as an arithmetic sequence and use the general formula.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the arithmetic sequence',
                description: 'First row: 20 seats, differences: $24-20=4$, $28-24=4$. So $a_1 = 20$, $d = 4$',
                solution: '$a_1 = 20$, $d = 4$',
                hint: 'The number of seats forms an arithmetic sequence.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the general formula',
                description: 'Use $a_n = a_1 + (n-1)d$ with $n = 15$: $a_{15} = 20 + (15-1) \\cdot 4$',
                solution: '$a_{15} = 20 + 14 \\cdot 4$',
                hint: 'We need the 15th term of the sequence.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the result',
                description: 'Simplify: $a_{15} = 20 + 56 = 76$',
                solution: '76 seats',
                hint: 'The 15th row has 76 seats.'
            }
        ]
    },
    {
        id: 'SQ23',
        type: 'practice',
        skill: 'Arithmetic Applications',
        source: 'Week 10 Example 8 Practice',
        title: 'Salary increase modeled with arithmetic sequence.',
        fullQuestion: 'An employee starts with a salary of \\$40,000 and receives a \\$2,500 raise each year. What will be their salary in the 8th year?',
        description: 'Model the salary progression as an arithmetic sequence.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the arithmetic sequence',
                description: 'Starting salary $a_1 = 40000$, yearly increase $d = 2500$',
                solution: '$a_1 = 40000$, $d = 2500$',
                hint: 'Each year the salary increases by a constant amount.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the formula for the 8th year',
                description: 'Use $a_n = a_1 + (n-1)d$: $a_8 = 40000 + (8-1) \\cdot 2500$',
                solution: '$a_8 = 40000 + 7 \\cdot 2500$',
                hint: 'The 8th year corresponds to $n = 8$.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the 8th year salary',
                description: 'Simplify: $a_8 = 40000 + 17500 = 57500$',
                solution: '\\$57,500',
                hint: 'The salary in the 8th year will be \\$57,500.'
            }
        ]
    },
    {
        id: 'SQ24',
        type: 'practice',
        skill: 'Arithmetic Applications',
        source: 'Week 10 Example 8 Practice',
        title: 'Find when inventory reaches zero in depletion model.',
        fullQuestion: 'A warehouse starts with 150 units and ships 8 units per day. After how many days will the inventory reach zero?',
        description: 'Model the inventory depletion as an arithmetic sequence and solve for when it reaches zero.',
        idealTime: 220,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the arithmetic sequence',
                description: 'Initial inventory: 150 units, daily decrease: 8 units. So $a_1 = 150 - 8 = 142$, $d = -8$',
                solution: '$a_1 = 142$, $d = -8$',
                hint: 'After the first day, 142 units remain, then decrease by 8 each day.'
            },
            {
                id: '2',
                title: 'Step 2: Set up equation for zero inventory',
                description: 'When inventory reaches zero: $a_n = 0$. Using $a_n = a_1 + (n-1)d$: $0 = 142 + (n-1)(-8)$',
                solution: '$0 = 142 - 8(n-1)$',
                hint: 'Set the general term equal to zero and solve for $n$.'
            },
            {
                id: '3',
                title: 'Step 3: Solve for n',
                description: 'Solve: $8(n-1) = 142$, so $n-1 = 17.75$, thus $n = 18.75$',
                solution: 'After 19 days',
                hint: 'Since we need a whole number of days, round up to 19 days.'
            }
        ]
    },
    {
        id: 'SQ25',
        type: 'practice',
        skill: 'Revenue Modeling',
        source: 'Week 10 Example 9 Practice',
        title: 'Calculate total revenue using arithmetic series formula.',
        fullQuestion: 'A coffee shop has daily revenue of \\$800 on the first day, increasing by \\$50 each day. Find the total revenue for the first 10 days.',
        description: 'Like Example 9, use the arithmetic series sum formula $S_n = \\frac{n}{2}(a_1 + a_n)$.',
        idealTime: 240,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the arithmetic sequence',
                description: 'Daily revenue: $a_1 = 800$, daily increase: $d = 50$',
                solution: '$a_1 = 800$, $d = 50$',
                hint: 'The revenue forms an arithmetic sequence.'
            },
            {
                id: '2',
                title: 'Step 2: Find the 10th day revenue',
                description: 'Use $a_n = a_1 + (n-1)d$: $a_{10} = 800 + (10-1) \\cdot 50 = 800 + 450 = 1250$',
                solution: '$a_{10} = 1250$',
                hint: 'We need the last term to use the sum formula.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate total revenue',
                description: 'Use $S_n = \\frac{n}{2}(a_1 + a_n)$: $S_{10} = \\frac{10}{2}(800 + 1250) = 5 \\cdot 2050 = 10250$',
                solution: '\\$10,250',
                hint: 'The total revenue for 10 days is \\$10,250.'
            }
        ]
    },
    {
        id: 'SQ26',
        type: 'practice',
        skill: 'Revenue Modeling',
        source: 'Week 10 Example 9 Practice',
        title: 'Event ticket sales with arithmetic series.',
        fullQuestion: 'Concert ticket sales are 100 on day 1, 150 on day 2, 200 on day 3, and so on. How many total tickets are sold in the first 12 days?',
        description: 'Model ticket sales as an arithmetic sequence and find the total using the sum formula.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the sequence parameters',
                description: 'Day 1: 100 tickets, Day 2: 150 tickets. Common difference: $d = 150 - 100 = 50$',
                solution: '$a_1 = 100$, $d = 50$',
                hint: 'The ticket sales increase by 50 each day.'
            },
            {
                id: '2',
                title: 'Step 2: Find tickets sold on day 12',
                description: 'Use $a_n = a_1 + (n-1)d$: $a_{12} = 100 + (12-1) \\cdot 50 = 100 + 550 = 650$',
                solution: '$a_{12} = 650$',
                hint: 'Calculate the 12th term to use in the sum formula.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate total tickets sold',
                description: 'Use $S_n = \\frac{n}{2}(a_1 + a_n)$: $S_{12} = \\frac{12}{2}(100 + 650) = 6 \\cdot 750 = 4500$',
                solution: '4,500 tickets',
                hint: 'The total tickets sold in 12 days is 4,500.'
            }
        ]
    },
    {
        id: 'SQ27',
        type: 'practice',
        skill: 'Revenue Modeling',
        source: 'Week 10 Example 9 Practice',
        title: 'Find number of terms given sum and sequence parameters.',
        fullQuestion: 'A gym membership costs \\$60 the first month, then increases by \\$5 each month. If the total cost for several months is \\$1,050, how many months did the person pay?',
        description: 'Use the sum formula to solve for the number of terms when the total is given.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the known information',
                description: 'Monthly cost: $a_1 = 60$, monthly increase: $d = 5$, total cost: $S_n = 1050$',
                solution: '$a_1 = 60$, $d = 5$, $S_n = 1050$',
                hint: 'We know the sequence parameters and the sum, need to find $n$.'
            },
            {
                id: '2',
                title: 'Step 2: Express the last term and sum formula',
                description: 'We have $a_n = 60 + (n-1) \\cdot 5 = 55 + 5n$ and $S_n = \\frac{n}{2}(60 + 55 + 5n) = \\frac{n}{2}(115 + 5n)$',
                solution: '$S_n = \\frac{n}{2}(115 + 5n)$',
                hint: 'Substitute the expression for $a_n$ into the sum formula.'
            },
            {
                id: '3',
                title: 'Step 3: Solve for n',
                description: 'Set equal to 1050: $\\frac{n}{2}(115 + 5n) = 1050$, so $n(115 + 5n) = 2100$, giving $5n^2 + 115n - 2100 = 0$',
                solution: '$n^2 + 23n - 420 = 0$',
                hint: 'This becomes a quadratic equation in $n$.'
            },
            {
                id: '4',
                title: 'Step 4: Solve the quadratic',
                description: 'Factoring the quadratic equation gives $(n+35)(n-12)=0$. We take the positive solution for the number of months.',
                solution: 'n = 12 months',
                hint: 'The person paid for 12 months. The negative solution $n=-35$ is not applicable in this context.'
            }
        ]
    },
    // Arithmetic Systems (Example 10)
    {
        id: 'SQ28',
        type: 'practice',
        skill: 'Arithmetic Systems',
        source: 'Week 10 Example 10 Practice',
        title: 'Find $a_1$ and $d$ given $a_4 = 11$ and $a_7 = 20$.',
        fullQuestion: 'In an arithmetic sequence, if $a_4 = 11$ and $a_7 = 20$, find the first term $a_1$ and common difference $d$.',
        description: 'Use the general formula with two known terms to create a system of equations, just like in Example 10.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up equations using the general formula',
                description: 'Using $a_n = a_1 + (n-1)d$: $a_4 = a_1 + 3d = 11$ and $a_7 = a_1 + 6d = 20$',
                solution: '$a_1 + 3d = 11$ and $a_1 + 6d = 20$',
                hint: 'Substitute $n = 4$ and $n = 7$ into the general formula.'
            },
            {
                id: '2',
                title: 'Step 2: Solve for the common difference',
                description: 'Subtract the first equation from the second: $(a_1 + 6d) - (a_1 + 3d) = 20 - 11$, so $3d = 9$, thus $d = 3$',
                solution: '$d = 3$',
                hint: 'Subtracting eliminates $a_1$ and gives us $d$ directly.'
            },
            {
                id: '3',
                title: 'Step 3: Find the first term',
                description: 'Substitute $d = 3$ into $a_1 + 3d = 11$: $a_1 + 3(3) = 11$, so $a_1 + 9 = 11$, thus $a_1 = 2$',
                solution: '$a_1 = 2$',
                hint: 'Use either equation to find $a_1$ once you know $d$.'
            }
        ]
    },
    {
        id: 'SQ29',
        type: 'practice',
        skill: 'Arithmetic Systems',
        source: 'Week 10 Example 10 Practice',
        title: 'Find the 15th term given $a_3 = 8$ and $a_9 = 32$.',
        fullQuestion: 'In an arithmetic sequence, if $a_3 = 8$ and $a_9 = 32$, find the 15th term.',
        description: 'First find $a_1$ and $d$ using the system approach, then calculate the requested term.',
        idealTime: 240,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the system of equations',
                description: 'Using $a_n = a_1 + (n-1)d$: $a_3 = a_1 + 2d = 8$ and $a_9 = a_1 + 8d = 32$',
                solution: '$a_1 + 2d = 8$ and $a_1 + 8d = 32$',
                hint: 'Express both given terms using the general formula.'
            },
            {
                id: '2',
                title: 'Step 2: Find the common difference',
                description: 'Subtract: $(a_1 + 8d) - (a_1 + 2d) = 32 - 8$, so $6d = 24$, thus $d = 4$',
                solution: '$d = 4$',
                hint: 'The difference between the 9th and 3rd terms is $6d$.'
            },
            {
                id: '3',
                title: 'Step 3: Find the first term',
                description: 'Substitute $d = 4$ into $a_1 + 2d = 8$: $a_1 + 2(4) = 8$, so $a_1 = 0$',
                solution: '$a_1 = 0$',
                hint: 'Use the simpler equation to find $a_1$.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate the 15th term',
                description: 'Use $a_{15} = a_1 + 14d = 0 + 14(4) = 56$',
                solution: '$a_{15} = 56$',
                hint: 'Apply the general formula with $n = 15$.'
            }
        ]
    },
    {
        id: 'SQ30',
        type: 'practice',
        skill: 'Arithmetic Systems',
        source: 'Week 10 Example 10 Practice',
        title: 'Theater seating problem with system solving.',
        fullQuestion: 'A theater has rows with arithmetic seating. The 5th row has 28 seats and the 12th row has 56 seats. How many seats are in the 20th row?',
        description: 'Model as an arithmetic sequence and use the system method to find the parameters, then calculate the requested term.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the arithmetic sequence model',
                description: 'Let $a_n$ be the number of seats in row $n$. Given: $a_5 = 28$ and $a_{12} = 56$',
                solution: '$a_5 = 28$, $a_{12} = 56$',
                hint: 'The number of seats per row follows an arithmetic pattern.'
            },
            {
                id: '2',
                title: 'Step 2: Create system of equations',
                description: 'Using $a_n = a_1 + (n-1)d$: $a_1 + 4d = 28$ and $a_1 + 11d = 56$',
                solution: '$a_1 + 4d = 28$ and $a_1 + 11d = 56$',
                hint: 'Apply the general term formula to both known values.'
            },
            {
                id: '3',
                title: 'Step 3: Solve for d and $a_1$',
                description: 'Subtract equations: $(a_1 + 11d) - (a_1 + 4d) = 56 - 28$, so $7d = 28$, thus $d = 4$. Then $a_1 = 28 - 4(4) = 12$',
                solution: '$d = 4$, $a_1 = 12$',
                hint: 'Each row has 4 more seats than the previous row.'
            },
            {
                id: '4',
                title: 'Step 4: Find seats in 20th row',
                description: 'Calculate $a_{20} = a_1 + 19d = 12 + 19(4) = 12 + 76 = 88$',
                solution: '88 seats',
                hint: 'The 20th row has 88 seats.'
            }
        ]
    },
    // Geometric Sequences (Example 11)
    {
        id: 'SQ31',
        type: 'practice',
        skill: 'Geometric Sequences',
        source: 'Week 10 Example 11 Practice',
        title: 'Find first 5 terms with $a_1 = 2$, $r = 3$.',
        fullQuestion: 'Write the first 5 terms of a geometric sequence with first term $a_1 = 2$ and common ratio $r = 3$.',
        description: 'Like Example 11, use the recursive relationship $a_n = a_{n-1} \\cdot r$ to find each term.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Start with the first term',
                description: 'Given: $a_1 = 2$',
                solution: '$a_1 = 2$',
                hint: 'This is our starting point.'
            },
            {
                id: '2',
                title: 'Step 2: Find the next terms using the ratio',
                description: 'Using $a_n = a_{n-1} \\cdot r$: $a_2 = 2 \\cdot 3 = 6$, $a_3 = 6 \\cdot 3 = 18$, $a_4 = 18 \\cdot 3 = 54$',
                solution: '$a_2 = 6$, $a_3 = 18$, $a_4 = 54$',
                hint: 'Multiply by the common ratio to get each successive term.'
            },
            {
                id: '3',
                title: 'Step 3: Find the fifth term',
                description: 'Continue: $a_5 = 54 \\cdot 3 = 162$',
                solution: '$a_5 = 162$',
                hint: 'Keep multiplying by 3 to get the next term.'
            },
            {
                id: '4',
                title: 'Step 4: List the sequence',
                description: 'The first 5 terms are: $2, 6, 18, 54, 162$',
                solution: '2, 6, 18, 54, 162',
                hint: 'Each term is 3 times the previous term.'
            }
        ]
    },
    {
        id: 'SQ32',
        type: 'practice',
        skill: 'Geometric Sequences',
        source: 'Week 10 Example 11 Practice',
        title: 'Find first 6 terms with $a_1 = -4$, $r = -\\frac{1}{2}$.',
        fullQuestion: 'Write the first 6 terms of a geometric sequence with first term $a_1 = -4$ and common ratio $r = -\\frac{1}{2}$.',
        description: 'Be careful with the signs since both the first term and ratio are negative.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Start with the first term',
                description: 'Given: $a_1 = -4$',
                solution: '$a_1 = -4$',
                hint: 'Note the negative first term.'
            },
            {
                id: '2',
                title: 'Step 2: Find terms 2 and 3',
                description: 'Using $a_n = a_{n-1} \\cdot r$: $a_2 = (-4) \\cdot (-\\frac{1}{2}) = 2$, $a_3 = 2 \\cdot (-\\frac{1}{2}) = -1$',
                solution: '$a_2 = 2$, $a_3 = -1$',
                hint: 'Watch the signs carefully: negative times negative gives positive.'
            },
            {
                id: '3',
                title: 'Step 3: Find terms 4, 5, and 6',
                description: 'Continue: $a_4 = (-1) \\cdot (-\\frac{1}{2}) = \\frac{1}{2}$, $a_5 = \\frac{1}{2} \\cdot (-\\frac{1}{2}) = -\\frac{1}{4}$, $a_6 = (-\\frac{1}{4}) \\cdot (-\\frac{1}{2}) = \\frac{1}{8}$',
                solution: '$a_4 = \\frac{1}{2}$, $a_5 = -\\frac{1}{4}$, $a_6 = \\frac{1}{8}$',
                hint: 'The signs alternate due to the negative ratio.'
            },
            {
                id: '4',
                title: 'Step 4: List the sequence',
                description: 'The first 6 terms are: $-4, 2, -1, \\frac{1}{2}, -\\frac{1}{4}, \\frac{1}{8}$',
                solution: '-4, 2, -1, 1/2, -1/4, 1/8',
                hint: 'The sequence alternates signs and decreases in absolute value.'
            }
        ]
    },
    {
        id: 'SQ33',
        type: 'practice',
        skill: 'Geometric Sequences',
        source: 'Week 10 Example 11 Practice',
        title: 'Find 8th term with $a_1 = 5$, $r = 1.2$.',
        fullQuestion: 'Find the 8th term of a geometric sequence with first term $a_1 = 5$ and common ratio $r = 1.2$.',
        description: 'Use the general formula $a_n = a_1 \\cdot r^{n-1}$ to find the specific term directly.',
        idealTime: 220,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the given values',
                description: 'Given: $a_1 = 5$, $r = 1.2$, find $a_8$',
                solution: '$a_1 = 5$, $r = 1.2$, $n = 8$',
                hint: 'We need to find the 8th term, so $n = 8$.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the geometric sequence formula',
                description: 'Use $a_n = a_1 \\cdot r^{n-1}$: $a_8 = 5 \\cdot (1.2)^{8-1} = 5 \\cdot (1.2)^7$',
                solution: '$a_8 = 5 \\cdot (1.2)^7$',
                hint: 'Substitute the known values into the general term formula.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate $(1.2)^7$',
                description: 'Calculate $(1.2)^7 \\approx 3.583$',
                solution: '$(1.2)^7 \\approx 3.583$',
                hint: 'Use a calculator or compute step by step.'
            },
            {
                id: '4',
                title: 'Step 4: Find the final result',
                description: 'Calculate $a_8 = 5 \\cdot 3.583 \\approx 17.916$',
                solution: '$a_8 \\approx 17.92$',
                hint: 'The 8th term is approximately 17.92.'
            }
        ]
    },
    // Geometric Identification (Example 12)
    {
        id: 'SQ34',
        type: 'practice',
        skill: 'Geometric Identification',
        source: 'Week 10 Example 12 Practice',
        title: 'Check if $3, 6, 12, 24, 48$ is geometric.',
        fullQuestion: 'Determine if the sequence $3, 6, 12, 24, 48$ is geometric. If so, find the common ratio.',
        description: 'Like Example 12, check if consecutive ratios are constant.',
        idealTime: 150,
        steps: [
            {
                id: '1',
                title: 'Step 1: Calculate consecutive ratios',
                description: 'Find ratios: $\\frac{6}{3} = 2$, $\\frac{12}{6} = 2$, $\\frac{24}{12} = 2$, $\\frac{48}{24} = 2$',
                solution: 'All ratios equal 2',
                hint: 'Check if $\\frac{a_{n+1}}{a_n}$ is the same for all consecutive terms.'
            },
            {
                id: '2',
                title: 'Step 2: Determine if geometric',
                description: 'Since all consecutive ratios are equal to 2, the sequence is geometric with $r = 2$',
                solution: 'Yes, geometric with $r = 2$',
                hint: 'Constant ratios confirm it\'s a geometric sequence.'
            }
        ]
    },
    {
        id: 'SQ35',
        type: 'practice',
        skill: 'Geometric Identification',
        source: 'Week 10 Example 12 Practice',
        title: 'Check if $2, -6, 18, -54, 162$ is geometric.',
        fullQuestion: 'Determine if the sequence $2, -6, 18, -54, 162$ is geometric. If so, find the common ratio.',
        description: 'Calculate the ratios between consecutive terms, paying attention to the signs.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Calculate consecutive ratios',
                description: 'Find ratios: $\\frac{-6}{2} = -3$, $\\frac{18}{-6} = -3$, $\\frac{-54}{18} = -3$, $\\frac{162}{-54} = -3$',
                solution: 'All ratios equal -3',
                hint: 'Be careful with signs when calculating ratios.'
            },
            {
                id: '2',
                title: 'Step 2: Determine if geometric',
                description: 'Since all consecutive ratios are equal to -3, the sequence is geometric with $r = -3$',
                solution: 'Yes, geometric with $r = -3$',
                hint: 'The negative ratio causes the alternating signs.'
            }
        ]
    },
    {
        id: 'SQ36',
        type: 'practice',
        skill: 'Geometric Identification',
        source: 'Week 10 Example 12 Practice',
        title: 'Determine if sequence is geometric or arithmetic.',
        fullQuestion: 'Classify the sequence $4, 12, 36, 108, 324$ as arithmetic, geometric, or neither.',
        description: 'Check both differences and ratios to determine the type of sequence.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Check for arithmetic (constant differences)',
                description: 'Calculate differences: $12-4=8$, $36-12=24$, $108-36=72$, $324-108=216$',
                solution: 'Differences: 8, 24, 72, 216 (not constant)',
                hint: 'If differences are constant, it\'s arithmetic.'
            },
            {
                id: '2',
                title: 'Step 2: Check for geometric (constant ratios)',
                description: 'Calculate ratios: $\\frac{12}{4}=3$, $\\frac{36}{12}=3$, $\\frac{108}{36}=3$, $\\frac{324}{108}=3$',
                solution: 'All ratios equal 3',
                hint: 'If ratios are constant, it\'s geometric.'
            },
            {
                id: '3',
                title: 'Step 3: Classify the sequence',
                description: 'Since ratios are constant but differences are not, the sequence is geometric with $r = 3$',
                solution: 'Geometric with $r = 3$',
                hint: 'Constant ratios make this a geometric sequence.'
            }
        ]
    },
    // Compound Interest Applications (Example 13)
    {
        id: 'SQ37',
        type: 'practice',
        skill: 'Compound Interest Applications',
        source: 'Week 10 Example 13 Practice',
        title: 'Investment at 6% annually for 5 years.',
        fullQuestion: 'An investment of \\$1,000 earns 6% interest compounded annually. What is the value after 5 years?',
        description: 'Like Example 13, use the compound interest formula $A = P(1 + r)^t$.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the given values',
                description: 'Principal: $P = 1000$, annual rate: $r = 0.06$, time: $t = 5$ years',
                solution: '$P = 1000$, $r = 0.06$, $t = 5$',
                hint: 'Convert the percentage to decimal form.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the compound interest formula',
                description: 'Use $A = P(1 + r)^t$: $A = 1000(1 + 0.06)^5 = 1000(1.06)^5$',
                solution: '$A = 1000(1.06)^5$',
                hint: 'The growth factor is $(1 + r) = 1.06$.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the result',
                description: 'Calculate $(1.06)^5 \\approx 1.3382$, so $A = 1000 \\cdot 1.3382 \\approx 1338.20$',
                solution: '\\$1,338.20',
                hint: 'The investment grows to approximately \\$1,338.20.'
            }
        ]
    },
    {
        id: 'SQ38',
        type: 'practice',
        skill: 'Compound Interest Applications',
        source: 'Week 10 Example 13 Practice',
        title: 'Population growth problem.',
        fullQuestion: 'A city\'s population of 50,000 grows at 3% per year. What will the population be after 8 years?',
        description: 'Use the same exponential growth formula as compound interest: $P(t) = P_0(1 + r)^t$.',
        idealTime: 260,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the growth model',
                description: 'Initial population: $P_0 = 50000$, growth rate: $r = 0.03$, time: $t = 8$ years',
                solution: '$P_0 = 50000$, $r = 0.03$, $t = 8$',
                hint: 'Population growth follows the same pattern as compound interest.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the exponential growth formula',
                description: 'Use $P(t) = P_0(1 + r)^t$: $P(8) = 50000(1 + 0.03)^8 = 50000(1.03)^8$',
                solution: '$P(8) = 50000(1.03)^8$',
                hint: 'Each year the population is multiplied by 1.03.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate $(1.03)^8$',
                description: 'Calculate $(1.03)^8 \\approx 1.2668$',
                solution: '$(1.03)^8 \\approx 1.2668$',
                hint: 'This represents the total growth factor over 8 years.'
            },
            {
                id: '4',
                title: 'Step 4: Find the final population',
                description: 'Calculate $P(8) = 50000 \\cdot 1.2668 \\approx 63,340$',
                solution: 'Approximately 63,340 people',
                hint: 'The population will be about 63,340 after 8 years.'
            }
        ]
    },
    {
        id: 'SQ39',
        type: 'practice',
        skill: 'Compound Interest Applications',
        source: 'Week 10 Example 13 Practice',
        title: 'Compare two investment options.',
        fullQuestion: 'Compare two investments: Option A: \\$2,000 at 5% annually for 10 years. Option B: \\$2,000 at 4.5% annually for 12 years. Which yields more?',
        description: 'Calculate the final value for each investment option and compare the results.',
        idealTime: 300,
        steps: [
            {
                id: '1',
                title: 'Step 1: Calculate Option A',
                description: 'Option A: $A_A = 2000(1 + 0.05)^{10} = 2000(1.05)^{10}$',
                solution: '$A_A = 2000(1.05)^{10}$',
                hint: 'Apply the compound interest formula for Option A.'
            },
            {
                id: '2',
                title: 'Step 2: Evaluate Option A',
                description: 'Calculate $(1.05)^{10} \\approx 1.6289$, so $A_A \\approx 2000 \\cdot 1.6289 \\approx 3257.80$',
                solution: 'Option A: $3,257.80',
                hint: 'Option A yields approximately $3,257.80.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate Option B',
                description: 'Option B: $A_B = 2000(1 + 0.045)^{12} = 2000(1.045)^{12}$. Calculate $(1.045)^{12} \\approx 1.6959$',
                solution: 'Option B: $3,391.80',
                hint: 'Option B: $A_B \\approx 2000 \\cdot 1.6959 \\approx 3391.80$.'
            },
            {
                id: '4',
                title: 'Step 4: Compare the options',
                description: 'Option B ($3,391.80) yields more than Option A ($3,257.80) by about $134.00',
                solution: 'Option B is better by $134.00',
                hint: 'Option B yields more despite the lower rate due to the longer time period.'
            }
        ]
    },
    // Geometric Systems (Example 14)
    {
        id: 'SQ40',
        type: 'practice',
        skill: 'Geometric Systems',
        source: 'Week 10 Example 14 Practice',
        title: 'Find $a_1$ and $r$ given $a_2 = 6$ and $a_4 = 24$.',
        fullQuestion: 'In a geometric sequence, if $a_2 = 6$ and $a_4 = 24$, find the first term $a_1$ and common ratio $r$.',
        description: 'Use the general formula with two known terms to create a system of equations, just like in Example 14.',
        idealTime: 220,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up equations using the general formula',
                description: 'Using $a_n = a_1 \\cdot r^{n-1}$: $a_2 = a_1 \\cdot r = 6$ and $a_4 = a_1 \\cdot r^3 = 24$',
                solution: '$a_1 \\cdot r = 6$ and $a_1 \\cdot r^3 = 24$',
                hint: 'Substitute $n = 2$ and $n = 4$ into the general formula.'
            },
            {
                id: '2',
                title: 'Step 2: Find the common ratio',
                description: 'Divide the second equation by the first: $\\frac{a_1 \\cdot r^3}{a_1 \\cdot r} = \\frac{24}{6}$, so $r^2 = 4$, thus $r = \\pm 2$',
                solution: '$r = 2$ or $r = -2$',
                hint: 'Dividing eliminates $a_1$ and gives us $r^2$.'
            },
            {
                id: '3',
                title: 'Step 3: Find the first term for each case',
                description: 'If $r = 2$: $a_1 = \\frac{6}{2} = 3$. If $r = -2$: $a_1 = \\frac{6}{-2} = -3$',
                solution: 'Case 1: $a_1 = 3, r = 2$; Case 2: $a_1 = -3, r = -2$',
                hint: 'Use $a_1 \\cdot r = 6$ to find $a_1$ for each value of $r$.'
            }
        ]
    },
    {
        id: 'SQ41',
        type: 'practice',
        skill: 'Geometric Systems',
        source: 'Week 10 Example 14 Practice',
        title: 'Find the 6th term given $a_3 = 12$ and $a_6 = 96$.',
        fullQuestion: 'In a geometric sequence, if $a_3 = 12$ and $a_6 = 96$, find the 8th term.',
        description: 'First find $a_1$ and $r$ using the system approach, then calculate the requested term.',
        idealTime: 250,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the system of equations',
                description: 'Using $a_n = a_1 \\cdot r^{n-1}$: $a_3 = a_1 \\cdot r^2 = 12$ and $a_6 = a_1 \\cdot r^5 = 96$',
                solution: '$a_1 \\cdot r^2 = 12$ and $a_1 \\cdot r^5 = 96$',
                hint: 'Express both given terms using the general formula.'
            },
            {
                id: '2',
                title: 'Step 2: Find the common ratio',
                description: 'Divide: $\\frac{a_1 \\cdot r^5}{a_1 \\cdot r^2} = \\frac{96}{12}$, so $r^3 = 8$, thus $r = 2$',
                solution: '$r = 2$',
                hint: 'The ratio between the 6th and 3rd terms gives us $r^3$.'
            },
            {
                id: '3',
                title: 'Step 3: Find the first term',
                description: 'Substitute $r = 2$ into $a_1 \\cdot r^2 = 12$: $a_1 \\cdot 4 = 12$, so $a_1 = 3$',
                solution: '$a_1 = 3$',
                hint: 'Use the simpler equation to find $a_1$.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate the 8th term',
                description: 'Use $a_8 = a_1 \\cdot r^7 = 3 \\cdot 2^7 = 3 \\cdot 128 = 384$',
                solution: '$a_8 = 384$',
                hint: 'Apply the general formula with $n = 8$.'
            }
        ]
    },
    {
        id: 'SQ42',
        type: 'practice',
        skill: 'Geometric Systems',
        source: 'Week 10 Example 14 Practice',
        title: 'Bacteria culture growth problem.',
        fullQuestion: 'A bacteria culture doubles every 3 hours. If there are 500 bacteria after 6 hours and 4000 bacteria after 15 hours, find the initial population.',
        description: 'Model as a geometric sequence where time intervals correspond to sequence terms.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the growth model',
                description: 'Let $a_n$ be the population after $3(n-1)$ hours. Since it doubles every 3 hours, $r = 2$.',
                solution: 'Growth model: $a_n = a_1 \\cdot 2^{n-1}$',
                hint: 'Each 3-hour period corresponds to one step in the sequence.'
            },
            {
                id: '2',
                title: 'Step 2: Translate time to sequence terms',
                description: 'After 6 hours: $n = 3$ (since $3(3-1) = 6$), so $a_3 = 500$. After 15 hours: $n = 6$ (since $3(6-1) = 15$), so $a_6 = 4000$.',
                solution: '$a_3 = 500$, $a_6 = 4000$',
                hint: 'Convert hours to sequence positions using the 3-hour periods.'
            },
            {
                id: '3',
                title: 'Step 3: Use the known ratio to verify',
                description: 'From $a_3$ to $a_6$ is 3 steps, so $a_6 = a_3 \\cdot 2^3 = 500 \\cdot 8 = 4000$ ✓',
                solution: 'Verification: $500 \\cdot 8 = 4000$ ✓',
                hint: 'This confirms our model is correct.'
            },
            {
                id: '4',
                title: 'Step 4: Find the initial population',
                description: 'Use $a_3 = a_1 \\cdot 2^2 = 500$, so $a_1 = \\frac{500}{4} = 125$',
                solution: 'Initial population: 125 bacteria',
                hint: 'The initial population was 125 bacteria.'
            }
        ]
    },
    // Finite Geometric Series (Example 15)
    {
        id: 'SQ43',
        type: 'practice',
        skill: 'Finite Geometric Series',
        source: 'Week 10 Example 15 Practice',
        title: 'Find sum of first 6 terms: $2 + 6 + 18 + 54 + ...$',
        fullQuestion: 'Find the sum of the first 6 terms of the geometric series $2 + 6 + 18 + 54 + ...$',
        description: 'Like Example 15, identify the first term and common ratio, then use the finite geometric series formula.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the sequence parameters',
                description: 'First term: $a_1 = 2$. Common ratio: $r = \\frac{6}{2} = 3$',
                solution: '$a_1 = 2$, $r = 3$',
                hint: 'Check that all consecutive ratios equal 3.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the finite geometric series formula',
                description: 'Use $S_n = a_1 \\cdot \\frac{1 - r^n}{1 - r}$: $S_6 = 2 \\cdot \\frac{1 - 3^6}{1 - 3}$',
                solution: '$S_6 = 2 \\cdot \\frac{1 - 729}{-2}$',
                hint: 'Substitute $n = 6$, $a_1 = 2$, and $r = 3$.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the result',
                description: 'Simplify: $S_6 = 2 \\cdot \\frac{-728}{-2} = 2 \\cdot 364 = 728$',
                solution: '$S_6 = 728$',
                hint: 'The sum of the first 6 terms is 728.'
            }
        ]
    },
    {
        id: 'SQ44',
        type: 'practice',
        skill: 'Finite Geometric Series',
        source: 'Week 10 Example 15 Practice',
        title: 'Calculate summation notation with geometric series.',
        fullQuestion: 'Evaluate $\\sum_{k=1}^{5} 4 \\cdot (\\frac{1}{2})^{k-1}$.',
        description: 'Recognize this as a finite geometric series and apply the formula.',
        idealTime: 220,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the geometric series',
                description: 'This represents a geometric series with $a_1 = 4$ and $r = \\frac{1}{2}$, with $n = 5$ terms.',
                solution: '$a_1 = 4$, $r = \\frac{1}{2}$, $n = 5$',
                hint: 'The general term is $4 \\cdot (\\frac{1}{2})^{k-1}$.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the finite geometric series formula',
                description: 'Use $S_n = a_1 \\cdot \\frac{1 - r^n}{1 - r}$: $S_5 = 4 \\cdot \\frac{1 - (\\frac{1}{2})^5}{1 - \\frac{1}{2}}$',
                solution: '$S_5 = 4 \\cdot \\frac{1 - \\frac{1}{32}}{\\frac{1}{2}}$',
                hint: 'Calculate $(\\frac{1}{2})^5 = \\frac{1}{32}$.'
            },
            {
                id: '3',
                title: 'Step 3: Simplify the expression',
                description: 'Calculate: $S_5 = 4 \\cdot \\frac{\\frac{31}{32}}{\\frac{1}{2}} = 4 \\cdot \\frac{31}{32} \\cdot 2 = 4 \\cdot \\frac{31}{16} = \\frac{31}{4}$',
                solution: '$S_5 = \\frac{31}{4} = 7.75$',
                hint: 'The sum equals $\\frac{31}{4}$ or 7.75.'
            }
        ]
    },
    {
        id: 'SQ45',
        type: 'practice',
        skill: 'Finite Geometric Series',
        source: 'Week 10 Example 15 Practice',
        title: 'Investment series application.',
        fullQuestion: 'An investor makes payments of \\$1000 the first year, then each subsequent payment is 1.1 times the previous. Find the total of the first 8 payments.',
        description: 'Model the payment schedule as a geometric series and find the sum.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the geometric series',
                description: 'First payment: $a_1 = 1000$. Each payment is 1.1 times the previous: $r = 1.1$. Number of payments: $n = 8$.',
                solution: '$a_1 = 1000$, $r = 1.1$, $n = 8$',
                hint: 'The payments form a geometric sequence.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the finite geometric series formula',
                description: 'Use $S_n = a_1 \\cdot \\frac{1 - r^n}{1 - r}$: $S_8 = 1000 \\cdot \\frac{1 - (1.1)^8}{1 - 1.1}$',
                solution: '$S_8 = 1000 \\cdot \\frac{1 - (1.1)^8}{-0.1}$',
                hint: 'Calculate $(1.1)^8$ for the formula.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate $(1.1)^8$',
                description: 'Calculate $(1.1)^8 \\approx 2.1436$',
                solution: '$(1.1)^8 \\approx 2.1436$',
                hint: 'Use a calculator for this computation.'
            },
            {
                id: '4',
                title: 'Step 4: Find the total payments',
                description: 'Calculate: $S_8 = 1000 \\cdot \\frac{1 - 2.1436}{-0.1} = 1000 \\cdot \\frac{-1.1436}{-0.1} = 1000 \\cdot 11.436 = 11,436$',
                solution: 'Total payments: $11,436',
                hint: 'The total of all 8 payments is $11,436.'
            }
        ]
    },
    // Future Value Applications (Example 16)
    {
        id: 'SQ46',
        type: 'practice',
        skill: 'Future Value Applications',
        source: 'Week 10 Example 16 Practice',
        title: 'Monthly deposits at 8% annual rate for 2 years.',
        fullQuestion: 'You deposit $200 at the end of each month into an account earning 8% annual interest compounded monthly. What is the future value after 2 years?',
        description: 'Like Example 16, use the future value of annuity formula with monthly compounding.',
        idealTime: 240,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the parameters',
                description: 'Monthly payment: $PMT = 200$. Annual rate: 8%, so monthly rate: $i = \\frac{0.08}{12} = \\frac{0.08}{12}$. Time: 2 years = 24 months.',
                solution: '$PMT = 200$, $i = \\frac{0.08}{12}$, $n = 24$',
                hint: 'Convert annual rate to monthly and years to months.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the future value of annuity formula',
                description: 'Use $FV = PMT \\cdot \\frac{(1 + i)^n - 1}{i}$: $FV = 200 \\cdot \\frac{(1 + \\frac{0.08}{12})^{24} - 1}{\\frac{0.08}{12}}$',
                solution: '$FV = 200 \\cdot \\frac{(1.006667)^{24} - 1}{0.006667}$',
                hint: 'The monthly rate is approximately 0.006667.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the compound factor',
                description: 'Calculate $(1.006667)^{24} \\approx 1.1735$',
                solution: '$(1.006667)^{24} \\approx 1.1735$',
                hint: 'This is the growth factor over 24 months.'
            },
            {
                id: '4',
                title: 'Step 4: Find the future value',
                description: 'Calculate: $FV = 200 \\cdot \\frac{1.1735 - 1}{0.006667} = 200 \\cdot \\frac{0.1735}{0.006667} \\approx 200 \\cdot 26.02 \\approx 5,204$',
                solution: 'Future value: $5,204',
                hint: 'After 2 years, the account will have approximately $5,204.'
            }
        ]
    },
    {
        id: 'SQ47',
        type: 'practice',
        skill: 'Future Value Applications',
        source: 'Week 10 Example 16 Practice',
        title: 'Quarterly payments problem.',
        fullQuestion: 'An employee contributes $800 quarterly to a retirement plan earning 6% annually compounded quarterly. What is the value after 5 years?',
        description: 'Use the future value formula with quarterly compounding.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the parameters',
                description: 'Quarterly payment: $PMT = 800$. Annual rate: 6%, so quarterly rate: $i = \\frac{0.06}{4} = 0.015$. Time: 5 years = 20 quarters.',
                solution: '$PMT = 800$, $i = 0.015$, $n = 20$',
                hint: 'Convert to quarterly periods for both rate and time.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the future value formula',
                description: 'Use $FV = PMT \\cdot \\frac{(1 + i)^n - 1}{i}$: $FV = 800 \\cdot \\frac{(1.015)^{20} - 1}{0.015}$',
                solution: '$FV = 800 \\cdot \\frac{(1.015)^{20} - 1}{0.015}$',
                hint: 'The quarterly rate is 1.5%.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the growth factor',
                description: 'Calculate $(1.015)^{20} \\approx 1.3469$',
                solution: '$(1.015)^{20} \\approx 1.3469$',
                hint: 'This represents the total growth over 20 quarters.'
            },
            {
                id: '4',
                title: 'Step 4: Find the future value',
                description: 'Calculate: $FV = 800 \\cdot \\frac{1.3469 - 1}{0.015} = 800 \\cdot \\frac{0.3469}{0.015} \\approx 800 \\cdot 23.13 \\approx 18,504$',
                solution: 'Future value: $18,504',
                hint: 'The retirement account will have approximately $18,504 after 5 years.'
            }
        ]
    },
    {
        id: 'SQ48',
        type: 'practice',
        skill: 'Future Value Applications',
        source: 'Week 10 Example 16 Practice',
        title: 'Retirement planning problem.',
        fullQuestion: 'A person wants to accumulate $100,000 in 10 years by making equal annual deposits into an account earning 7% annually. What should each deposit be?',
        description: 'Solve for the payment amount given the desired future value.',
        idealTime: 320,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the known information',
                description: 'Target future value: $FV = 100,000$. Annual rate: $i = 0.07$. Time: $n = 10$ years. Find: $PMT$.',
                solution: '$FV = 100,000$, $i = 0.07$, $n = 10$',
                hint: 'We need to solve for the payment amount.'
            },
            {
                id: '2',
                title: 'Step 2: Rearrange the future value formula',
                description: 'From $FV = PMT \\cdot \\frac{(1 + i)^n - 1}{i}$, solve for $PMT$: $PMT = FV \\cdot \\frac{i}{(1 + i)^n - 1}$',
                solution: '$PMT = 100,000 \\cdot \\frac{0.07}{(1.07)^{10} - 1}$',
                hint: 'Isolate PMT by dividing both sides by the annuity factor.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate $(1.07)^{10}$',
                description: 'Calculate $(1.07)^{10} \\approx 1.9672$',
                solution: '$(1.07)^{10} \\approx 1.9672$',
                hint: 'This is the compound growth factor over 10 years.'
            },
            {
                id: '4',
                title: 'Step 4: Find the required payment',
                description: 'Calculate: $PMT = 100,000 \\cdot \\frac{0.07}{1.9672 - 1} = 100,000 \\cdot \\frac{0.07}{0.9672} \\approx 100,000 \\cdot 0.0724 \\approx 7,240$',
                solution: 'Required annual deposit: $7,240',
                hint: 'Each annual deposit should be approximately $7,240.'
            }
        ]
    },
    // Infinite Geometric Series (Example 17)
    {
        id: 'SQ49',
        type: 'practice',
        skill: 'Infinite Geometric Series',
        source: 'Week 10 Example 17 Practice',
        title: 'Find sum of $\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + ...$',
        fullQuestion: 'Find the sum of the infinite geometric series $\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\frac{1}{16} + ...$',
        description: 'Like Example 17, verify convergence and use the infinite series formula.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the first term and ratio',
                description: 'First term: $a_1 = \\frac{1}{2}$. Common ratio: $r = \\frac{1/4}{1/2} = \\frac{1}{2}$',
                solution: '$a_1 = \\frac{1}{2}$, $r = \\frac{1}{2}$',
                hint: 'Check that each term is half the previous term.'
            },
            {
                id: '2',
                title: 'Step 2: Check for convergence',
                description: 'Since $|r| = \\frac{1}{2} < 1$, the series converges.',
                solution: 'Series converges since $|r| < 1$',
                hint: 'Infinite geometric series converge when $|r| < 1$.'
            },
            {
                id: '3',
                title: 'Step 3: Apply the infinite series formula',
                description: 'Use $S = \\frac{a_1}{1 - r}$: $S = \\frac{\\frac{1}{2}}{1 - \\frac{1}{2}} = \\frac{\\frac{1}{2}}{\\frac{1}{2}} = 1$',
                solution: '$S = 1$',
                hint: 'The infinite sum equals 1.'
            }
        ]
    },
    {
        id: 'SQ50',
        type: 'practice',
        skill: 'Infinite Geometric Series',
        source: 'Week 10 Example 17 Practice',
        title: 'Alternating infinite series.',
        fullQuestion: 'Find the sum of the infinite series $3 - 1 + \\frac{1}{3} - \\frac{1}{9} + \\frac{1}{27} - ...$',
        description: 'Handle the alternating signs carefully when finding the common ratio.',
        idealTime: 220,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the first term and ratio',
                description: 'First term: $a_1 = 3$. Common ratio: $r = \\frac{-1}{3} = -\\frac{1}{3}$',
                solution: '$a_1 = 3$, $r = -\\frac{1}{3}$',
                hint: 'The negative ratio creates the alternating pattern.'
            },
            {
                id: '2',
                title: 'Step 2: Check for convergence',
                description: 'Since $|r| = \\frac{1}{3} < 1$, the series converges.',
                solution: 'Series converges since $|r| < 1$',
                hint: 'Use the absolute value of the ratio to check convergence.'
            },
            {
                id: '3',
                title: 'Step 3: Apply the infinite series formula',
                description: 'Use $S = \\frac{a_1}{1 - r}$: $S = \\frac{3}{1 - (-\\frac{1}{3})} = \\frac{3}{1 + \\frac{1}{3}} = \\frac{3}{\\frac{4}{3}} = \\frac{9}{4}$',
                solution: '$S = \\frac{9}{4} = 2.25$',
                hint: 'The infinite sum equals $\\frac{9}{4}$ or 2.25.'
            }
        ]
    },
    {
        id: 'SQ51',
        type: 'practice',
        skill: 'Infinite Geometric Series',
        source: 'Week 10 Example 17 Practice',
        title: 'Bouncing ball problem.',
        fullQuestion: 'A ball is dropped from 12 feet and bounces to 75% of its previous height each time. Find the total distance traveled.',
        description: 'Model the bouncing as an infinite geometric series, accounting for both up and down motions.',
        idealTime: 260,
        steps: [
            {
                id: '1',
                title: 'Step 1: Analyze the motion',
                description: 'Initial drop: 12 feet down. Then bounces: 9 feet up, 9 feet down, 6.75 feet up, 6.75 feet down, ...',
                solution: 'Down: 12 + 9 + 6.75 + ...; Up: 9 + 6.75 + 5.0625 + ...',
                hint: 'After the initial drop, the ball travels up and down the same distances.'
            },
            {
                id: '2',
                title: 'Step 2: Set up the series for upward motion',
                description: 'Upward distances form a geometric series: $9 + 6.75 + 5.0625 + ...$ with $a_1 = 9$ and $r = 0.75$',
                solution: 'Upward series: $a_1 = 9$, $r = 0.75$',
                hint: 'Each upward distance is 75% of the previous.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate upward distance sum',
                description: 'Sum of upward motion: $S_{up} = \\frac{9}{1 - 0.75} = \\frac{9}{0.25} = 36$ feet',
                solution: 'Total upward: 36 feet',
                hint: 'Use the infinite series formula for the upward motion.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate total distance',
                description: 'Total distance = Initial drop + Upward motion + Downward motion = 12 + 36 + 36 = 84 feet',
                solution: 'Total distance: 84 feet',
                hint: 'The ball travels 84 feet total before coming to rest.'
            }
        ]
    },
    // Economic Multiplier (Example 18)
    {
        id: 'SQ52',
        type: 'practice',
        skill: 'Economic Multiplier',
        source: 'Week 10 Example 18 Practice',
        title: 'Simple spending multiplier.',
        fullQuestion: 'The government injects $1 billion into the economy. If people spend 80% of any new income, find the total economic impact.',
        description: 'Like Example 18, model the spending rounds as an infinite geometric series.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the spending pattern',
                description: 'Initial injection: $1 billion. First round spending: $0.8 billion. Second round: $0.8^2 = 0.64$ billion, etc.',
                solution: 'Spending series: $1 + 0.8 + 0.64 + 0.512 + ...$',
                hint: 'Each round, 80% of the previous amount is spent.'
            },
            {
                id: '2',
                title: 'Step 2: Set up the geometric series',
                description: 'This is a geometric series with $a_1 = 1$ and $r = 0.8$',
                solution: '$a_1 = 1$, $r = 0.8$',
                hint: 'The marginal propensity to consume is the common ratio.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the total impact',
                description: 'Use $S = \\frac{a_1}{1 - r}$: $S = \\frac{1}{1 - 0.8} = \\frac{1}{0.2} = 5$ billion',
                solution: 'Total economic impact: $5 billion',
                hint: 'The $1 billion injection creates $5 billion in total economic activity.'
            }
        ]
    },
    {
        id: 'SQ53',
        type: 'practice',
        skill: 'Economic Multiplier',
        source: 'Week 10 Example 18 Practice',
        title: 'Tax rebate with leakage.',
        fullQuestion: 'A $2 billion tax rebate is distributed. If people save 25% and spend 75% of new income, what is the total economic stimulus?',
        description: 'Account for savings as "leakage" that reduces the multiplier effect.',
        idealTime: 250,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the spending parameters',
                description: 'Initial rebate: $2 billion. Marginal propensity to consume: 75% = 0.75. Marginal propensity to save: 25% = 0.25.',
                solution: 'Initial: $2 billion, MPC = 0.75, MPS = 0.25',
                hint: 'Only the spent portion continues to circulate in the economy.'
            },
            {
                id: '2',
                title: 'Step 2: Set up the spending series',
                description: 'Total spending: $2 + 2(0.75) + 2(0.75)^2 + 2(0.75)^3 + ... = 2(1 + 0.75 + 0.75^2 + ...)$',
                solution: 'Series: $2 \\cdot \\sum_{n=0}^{\\infty} (0.75)^n$',
                hint: 'Factor out the initial amount and recognize the geometric series.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the multiplier',
                description: 'The series sum is $\\frac{1}{1 - 0.75} = \\frac{1}{0.25} = 4$',
                solution: 'Multiplier = 4',
                hint: 'The multiplier is the reciprocal of the marginal propensity to save.'
            },
            {
                id: '4',
                title: 'Step 4: Find total economic stimulus',
                description: 'Total stimulus = Initial rebate × Multiplier = $2 billion × 4 = $8 billion',
                solution: 'Total economic stimulus: $8 billion',
                hint: 'The $2 billion rebate generates $8 billion in total economic activity.'
            }
        ]
    },
    {
        id: 'SQ54',
        type: 'practice',
        skill: 'Economic Multiplier',
        source: 'Week 10 Example 18 Practice',
        title: 'Regional economic impact.',
        fullQuestion: 'A new factory brings $5 million annually to a region. If 60% of income is spent locally and 40% "leaks out" to other regions, find the total annual regional impact.',
        description: 'Calculate the regional multiplier considering money that leaves the local economy.',
        idealTime: 300,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the regional spending pattern',
                description: 'Factory payroll: $5 million. Local spending rate: 60%. Leakage rate: 40%.',
                solution: 'Initial: $5M, local spending = 60%, leakage = 40%',
                hint: 'Only the locally spent money continues to circulate regionally.'
            },
            {
                id: '2',
                title: 'Step 2: Model the regional circulation',
                description: 'Round 1: $5M. Round 2: $5M × 0.6 = $3M. Round 3: $3M × 0.6 = $1.8M, etc.',
                solution: 'Regional spending: $5 + 3 + 1.8 + 1.08 + ...$',
                hint: 'Each round, 60% of the previous amount is respent locally.'
            },
            {
                id: '3',
                title: 'Step 3: Set up the geometric series',
                description: 'Series: $5(1 + 0.6 + 0.6^2 + 0.6^3 + ...)$ with $a_1 = 5$ and $r = 0.6$',
                solution: 'Geometric series: $a_1 = 5$, $r = 0.6$',
                hint: 'The local spending rate becomes the common ratio.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate total regional impact',
                description: 'Total impact = $5 \\cdot \\frac{1}{1 - 0.6} = 5 \\cdot \\frac{1}{0.4} = 5 \\cdot 2.5 = 12.5$ million',
                solution: 'Total annual regional impact: $12.5 million',
                hint: 'The factory creates $12.5 million in total regional economic activity annually.'
            }
        ]
    },
    // Perpetuity Applications (Example 19)
    {
        id: 'SQ55',
        type: 'practice',
        skill: 'Perpetuity Applications',
        source: 'Week 10 Example 19 Practice',
        title: 'Basic perpetuity calculation.',
        fullQuestion: 'What is the present value of a perpetuity that pays $500 annually, if the interest rate is 6%?',
        description: 'Like Example 19, use the perpetuity formula to find present value.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the perpetuity parameters',
                description: 'Annual payment: $C = 500$. Interest rate: $r = 0.06$',
                solution: '$C = 500$, $r = 0.06$',
                hint: 'A perpetuity pays the same amount forever.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the perpetuity formula',
                description: 'Use $PV = \\frac{C}{r}$: $PV = \\frac{500}{0.06}$',
                solution: '$PV = \\frac{500}{0.06}$',
                hint: 'The perpetuity formula gives the present value directly.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the present value',
                description: 'Calculate: $PV = \\frac{500}{0.06} = 8,333.33$',
                solution: 'Present value: $8,333.33',
                hint: 'The present value of the perpetuity is $8,333.33.'
            }
        ]
    },
    {
        id: 'SQ56',
        type: 'practice',
        skill: 'Perpetuity Applications',
        source: 'Week 10 Example 19 Practice',
        title: 'Growing perpetuity.',
        fullQuestion: 'A stock pays an initial dividend of $2 per share, growing at 4% annually forever. If the required return is 10%, what is the stock value?',
        description: 'Use the growing perpetuity formula for dividends that increase each year.',
        idealTime: 240,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the growing perpetuity parameters',
                description: 'Initial dividend: $D_1 = 2$. Growth rate: $g = 0.04$. Required return: $r = 0.10$',
                solution: '$D_1 = 2$, $g = 0.04$, $r = 0.10$',
                hint: 'This is a growing perpetuity since dividends increase each year.'
            },
            {
                id: '2',
                title: 'Step 2: Check the growth condition',
                description: 'Verify that $r > g$: $0.10 > 0.04$ ✓. The formula applies.',
                solution: 'Condition satisfied: $r > g$',
                hint: 'Growing perpetuities require the return rate to exceed the growth rate.'
            },
            {
                id: '3',
                title: 'Step 3: Apply the growing perpetuity formula',
                description: 'Use $PV = \\frac{D_1}{r - g}$: $PV = \\frac{2}{0.10 - 0.04} = \\frac{2}{0.06}$',
                solution: '$PV = \\frac{2}{0.06}$',
                hint: 'The growing perpetuity formula accounts for the increasing payments.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate the stock value',
                description: 'Calculate: $PV = \\frac{2}{0.06} = 33.33$',
                solution: 'Stock value: $33.33 per share',
                hint: 'The stock is worth $33.33 per share based on its dividend stream.'
            }
        ]
    },
    {
        id: 'SQ57',
        type: 'practice',
        skill: 'Perpetuity Applications',
        source: 'Week 10 Example 19 Practice',
        title: 'Endowment fund analysis.',
        fullQuestion: 'A university wants to establish an endowment that provides $50,000 annually for scholarships forever. If the fund earns 5% annually, how much must be donated initially?',
        description: 'Calculate the initial endowment needed to support a perpetual scholarship.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the endowment problem',
                description: 'Annual scholarship: $C = 50,000$. Fund return rate: $r = 0.05$. Find: initial endowment amount.',
                solution: '$C = 50,000$, $r = 0.05$',
                hint: 'The endowment must generate enough return to pay scholarships forever.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the perpetuity formula',
                description: 'The initial donation equals the present value of the perpetuity: $PV = \\frac{C}{r} = \\frac{50,000}{0.05}$',
                solution: '$PV = \\frac{50,000}{0.05}$',
                hint: 'Use the perpetuity present value formula.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the required endowment',
                description: 'Calculate: $PV = \\frac{50,000}{0.05} = 1,000,000$',
                solution: 'Required initial donation: $1,000,000',
                hint: 'A $1 million endowment will generate $50,000 annually at 5% return.'
            },
            {
                id: '4',
                title: 'Step 4: Verify the calculation',
                description: 'Verification: $1,000,000 × 0.05 = $50,000 annually ✓',
                solution: 'Verification: $1M × 5% = $50K annually ✓',
                hint: 'The calculation is correct - the endowment will provide perpetual scholarships.'
            }
        ]
    },
    // Geometric Systems (Example 14)
    {
        id: 'SQ40',
        type: 'practice',
        skill: 'Geometric Systems',
        source: 'Week 10 Example 14 Practice',
        title: 'Find $a_1$ and $r$ given $a_2 = 6$ and $a_4 = 24$.',
        fullQuestion: 'In a geometric sequence, if $a_2 = 6$ and $a_4 = 24$, find the first term $a_1$ and common ratio $r$.',
        description: 'Like Example 14, use the general formula to create a system of equations.',
        idealTime: 220,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up equations using the general formula',
                description: 'Using $a_n = a_1 \\cdot r^{n-1}$: $a_2 = a_1 \\cdot r = 6$ and $a_4 = a_1 \\cdot r^3 = 24$',
                solution: '$a_1 \\cdot r = 6$ and $a_1 \\cdot r^3 = 24$',
                hint: 'Express both known terms using the geometric sequence formula.'
            },
            {
                id: '2',
                title: 'Step 2: Find the common ratio',
                description: 'Divide the second equation by the first: $\\frac{a_1 \\cdot r^3}{a_1 \\cdot r} = \\frac{24}{6}$, so $r^2 = 4$, thus $r = 2$ (taking positive root)',
                solution: '$r = 2$',
                hint: 'Dividing eliminates $a_1$ and gives us $r^2$.'
            },
            {
                id: '3',
                title: 'Step 3: Find the first term',
                description: 'Substitute $r = 2$ into $a_1 \\cdot r = 6$: $a_1 \\cdot 2 = 6$, so $a_1 = 3$',
                solution: '$a_1 = 3$',
                hint: 'Use either equation to find $a_1$ once you know $r$.'
            }
        ]
    },
    {
        id: 'SQ41',
        type: 'practice',
        skill: 'Geometric Systems',
        source: 'Week 10 Example 14 Practice',
        title: 'Find the 8th term given $a_3 = 12$ and $a_6 = 96$.',
        fullQuestion: 'In a geometric sequence, if $a_3 = 12$ and $a_6 = 96$, find the 8th term.',
        description: 'First find $a_1$ and $r$ using the system approach, then calculate the requested term.',
        idealTime: 250,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the system of equations',
                description: 'Using $a_n = a_1 \\cdot r^{n-1}$: $a_3 = a_1 \\cdot r^2 = 12$ and $a_6 = a_1 \\cdot r^5 = 96$',
                solution: '$a_1 \\cdot r^2 = 12$ and $a_1 \\cdot r^5 = 96$',
                hint: 'Express both given terms using the general formula.'
            },
            {
                id: '2',
                title: 'Step 2: Find the common ratio',
                description: 'Divide: $\\frac{a_1 \\cdot r^5}{a_1 \\cdot r^2} = \\frac{96}{12}$, so $r^3 = 8$, thus $r = 2$',
                solution: '$r = 2$',
                hint: 'The ratio between the 6th and 3rd terms involves $r^3$.'
            },
            {
                id: '3',
                title: 'Step 3: Find the first term',
                description: 'Substitute $r = 2$ into $a_1 \\cdot r^2 = 12$: $a_1 \\cdot 4 = 12$, so $a_1 = 3$',
                solution: '$a_1 = 3$',
                hint: 'Use the simpler equation to find $a_1$.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate the 8th term',
                description: 'Use $a_8 = a_1 \\cdot r^7 = 3 \\cdot 2^7 = 3 \\cdot 128 = 384$',
                solution: '$a_8 = 384$',
                hint: 'Apply the general formula with $n = 8$.'
            }
        ]
    },
    {
        id: 'SQ42',
        type: 'practice',
        skill: 'Geometric Systems',
        source: 'Week 10 Example 14 Practice',
        title: 'Bacteria culture growth problem.',
        fullQuestion: 'A bacteria culture has 200 bacteria after 2 hours and 1,600 bacteria after 5 hours. If growth follows a geometric pattern, how many bacteria were present initially?',
        description: 'Model as a geometric sequence and use the system method to find the parameters.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the geometric growth model',
                description: 'Let $a_n$ be bacteria count after $n$ hours. Given: $a_2 = 200$ and $a_5 = 1600$',
                solution: '$a_2 = 200$, $a_5 = 1600$',
                hint: 'Bacteria growth follows exponential/geometric patterns.'
            },
            {
                id: '2',
                title: 'Step 2: Create system of equations',
                description: 'Using $a_n = a_0 \\cdot r^n$: $a_0 \\cdot r^2 = 200$ and $a_0 \\cdot r^5 = 1600$',
                solution: '$a_0 \\cdot r^2 = 200$ and $a_0 \\cdot r^5 = 1600$',
                hint: 'Use initial count $a_0$ as the first term.'
            },
            {
                id: '3',
                title: 'Step 3: Solve for the growth factor',
                description: 'Divide equations: $\\frac{a_0 \\cdot r^5}{a_0 \\cdot r^2} = \\frac{1600}{200}$, so $r^3 = 8$, thus $r = 2$',
                solution: '$r = 2$',
                hint: 'The bacteria population doubles each hour.'
            },
            {
                id: '4',
                title: 'Step 4: Find initial bacteria count',
                description: 'Substitute $r = 2$ into $a_0 \\cdot r^2 = 200$: $a_0 \\cdot 4 = 200$, so $a_0 = 50$',
                solution: '50 bacteria initially',
                hint: 'There were 50 bacteria at the start of the experiment.'
            }
        ]
    },
    // Finite Geometric Series (Example 15)
    {
        id: 'SQ43',
        type: 'practice',
        skill: 'Finite Geometric Series',
        source: 'Week 10 Example 15 Practice',
        title: 'Find sum of first 6 terms: $2 + 6 + 18 + 54 + \\ldots$',
        fullQuestion: 'Find the sum of the first 6 terms of the geometric series $2 + 6 + 18 + 54 + \\ldots$',
        description: 'Like Example 15, identify the first term and ratio, then use the geometric series formula.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify first term and ratio',
                description: 'First term: $a_1 = 2$. Common ratio: $r = \\frac{6}{2} = 3$',
                solution: '$a_1 = 2$, $r = 3$',
                hint: 'Check that the ratio is consistent: $\\frac{18}{6} = 3$, $\\frac{54}{18} = 3$.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the geometric series formula',
                description: 'Use $S_n = \\frac{a_1(1-r^n)}{1-r}$: $S_6 = \\frac{2(1-3^6)}{1-3} = \\frac{2(1-729)}{-2}$',
                solution: '$S_6 = \\frac{2(-728)}{-2}$',
                hint: 'Calculate $3^6 = 729$ first.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the sum',
                description: 'Simplify: $S_6 = \\frac{-1456}{-2} = 728$',
                solution: '$S_6 = 728$',
                hint: 'The sum of the first 6 terms is 728.'
            }
        ]
    },
    {
        id: 'SQ44',
        type: 'practice',
        skill: 'Finite Geometric Series',
        source: 'Week 10 Example 15 Practice',
        title: 'Calculate $\\sum_{i=1}^{8} 3 \\cdot 2^{i-1}$.',
        fullQuestion: 'Calculate the sum $\\sum_{i=1}^{8} 3 \\cdot 2^{i-1}$.',
        description: 'Recognize this as a geometric series in summation notation and apply the appropriate formula.',
        idealTime: 220,
        steps: [
            {
                id: '1',
                title: 'Step 1: Recognize the geometric series',
                description: 'This represents the sum $3 \\cdot 2^0 + 3 \\cdot 2^1 + 3 \\cdot 2^2 + \\ldots + 3 \\cdot 2^7 = 3 + 6 + 12 + \\ldots$',
                solution: 'Geometric series with $a_1 = 3$, $r = 2$',
                hint: 'Each term is $3 \\cdot 2^{i-1}$ which gives us the pattern $3, 6, 12, 24, \\ldots$'
            },
            {
                id: '2',
                title: 'Step 2: Identify parameters',
                description: 'First term: $a_1 = 3$, common ratio: $r = 2$, number of terms: $n = 8$',
                solution: '$a_1 = 3$, $r = 2$, $n = 8$',
                hint: 'The summation goes from $i = 1$ to $i = 8$, so we have 8 terms.'
            },
            {
                id: '3',
                title: 'Step 3: Apply the geometric series formula',
                description: 'Use $S_n = \\frac{a_1(1-r^n)}{1-r}$: $S_8 = \\frac{3(1-2^8)}{1-2} = \\frac{3(1-256)}{-1}$',
                solution: '$S_8 = \\frac{3(-255)}{-1}$',
                hint: 'Calculate $2^8 = 256$ first.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate the final result',
                description: 'Simplify: $S_8 = \\frac{-765}{-1} = 765$',
                solution: '$\\sum_{i=1}^{8} 3 \\cdot 2^{i-1} = 765$',
                hint: 'The sum equals 765.'
            }
        ]
    },
    {
        id: 'SQ45',
        type: 'practice',
        skill: 'Finite Geometric Series',
        source: 'Week 10 Example 15 Practice',
        title: 'Investment series application.',
        fullQuestion: 'An investment pays $500 the first year, then each subsequent payment increases by 20%. What is the total received over 6 years?',
        description: 'Model the increasing payments as a geometric series and calculate the total.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Model the payment series',
                description: 'Payments: Year 1: $500, Year 2: $500(1.2) = $600, Year 3: $500(1.2)^2 = $720, etc.',
                solution: 'Geometric series with $a_1 = 500$, $r = 1.2$',
                hint: 'Each payment is 20% more than the previous, so multiply by 1.2.'
            },
            {
                id: '2',
                title: 'Step 2: Identify the parameters',
                description: 'First payment: $a_1 = 500$, growth factor: $r = 1.2$, number of payments: $n = 6$',
                solution: '$a_1 = 500$, $r = 1.2$, $n = 6$',
                hint: 'We want the total of 6 years of payments.'
            },
            {
                id: '3',
                title: 'Step 3: Apply the geometric series formula',
                description: 'Use $S_n = \\frac{a_1(1-r^n)}{1-r}$: $S_6 = \\frac{500(1-(1.2)^6)}{1-1.2} = \\frac{500(1-2.9859)}{-0.2}$',
                solution: '$S_6 = \\frac{500(-1.9859)}{-0.2}$',
                hint: 'Calculate $(1.2)^6 \\approx 2.9859$ first.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate total received',
                description: 'Simplify: $S_6 = \\frac{-992.95}{-0.2} = 4964.75$',
                solution: 'Total: $4,964.75',
                hint: 'The total received over 6 years is $4,964.75.'
            }
        ]
    },
    // Future Value Applications (Example 16)
    {
        id: 'SQ46',
        type: 'practice',
        skill: 'Future Value Applications',
        source: 'Week 10 Example 16 Practice',
        title: 'Monthly deposits at 8% annual rate for 2 years.',
        fullQuestion: 'Sarah deposits $200 each month for 2 years into an account earning 8% annually (compounded monthly). What is the account value after 2 years?',
        description: 'Like Example 16, model the monthly deposits and compound interest as a geometric series.',
        idealTime: 240,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the problem parameters',
                description: 'Monthly deposit: $200, annual rate: 8%, monthly rate: $r = \\frac{0.08}{12} \\approx 0.00667$, months: $n = 24$',
                solution: 'Monthly payment: $200, $r \\approx 0.00667$, $n = 24$',
                hint: 'Convert annual rate to monthly rate by dividing by 12.'
            },
            {
                id: '2',
                title: 'Step 2: Model the future value of deposits',
                description: 'Each deposit compounds differently: 1st deposit grows for 23 months, 2nd for 22 months, etc. Last deposit grows for 0 months.',
                solution: 'Future value series pattern established',
                hint: 'The first deposit has the most time to grow.'
            },
            {
                id: '3',
                title: 'Step 3: Apply the annuity formula',
                description: 'Use future value of annuity: $FV = PMT \\cdot \\frac{(1+r)^n - 1}{r} = 200 \\cdot \\frac{(1.00667)^{24} - 1}{0.00667}$',
                solution: '$FV = 200 \\cdot \\frac{1.1735 - 1}{0.00667}$',
                hint: 'Calculate $(1.00667)^{24} \\approx 1.1735$ first.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate the final value',
                description: 'Simplify: $FV = 200 \\cdot \\frac{0.1735}{0.00667} = 200 \\cdot 26.01 = 5,202$',
                solution: 'Account value: $5,202',
                hint: 'Sarah will have approximately $5,202 after 2 years.'
            }
        ]
    },
    {
        id: 'SQ47',
        type: 'practice',
        skill: 'Future Value Applications',
        source: 'Week 10 Example 16 Practice',
        title: 'Quarterly retirement payments.',
        fullQuestion: 'John makes quarterly contributions of $1,500 to his retirement account for 5 years. The account earns 6% annually, compounded quarterly. What is the account balance after 5 years?',
        description: 'Calculate the future value of quarterly payments with quarterly compounding.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the parameters',
                description: 'Quarterly payment: $1,500, annual rate: 6%, quarterly rate: $r = \\frac{0.06}{4} = 0.015$, quarters: $n = 20$',
                solution: 'Payment: $1,500, $r = 0.015$, $n = 20$',
                hint: 'There are 4 quarters per year, so 20 quarters in 5 years.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the future value formula',
                description: 'Use $FV = PMT \\cdot \\frac{(1+r)^n - 1}{r} = 1500 \\cdot \\frac{(1.015)^{20} - 1}{0.015}$',
                solution: '$FV = 1500 \\cdot \\frac{(1.015)^{20} - 1}{0.015}$',
                hint: 'This is the standard annuity formula for equal payments.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the compound factor',
                description: 'Calculate $(1.015)^{20} \\approx 1.3469$',
                solution: '$(1.015)^{20} \\approx 1.3469$',
                hint: 'This represents the total growth factor over 20 quarters.'
            },
            {
                id: '4',
                title: 'Step 4: Find the final balance',
                description: 'Calculate: $FV = 1500 \\cdot \\frac{1.3469 - 1}{0.015} = 1500 \\cdot \\frac{0.3469}{0.015} = 1500 \\cdot 23.13 = 34,695$',
                solution: 'Account balance: $34,695',
                hint: 'John will have approximately $34,695 after 5 years.'
            }
        ]
    },
    {
        id: 'SQ48',
        type: 'practice',
        skill: 'Future Value Applications',
        source: 'Week 10 Example 16 Practice',
        title: 'Retirement planning - solve for payment.',
        fullQuestion: 'Maria wants to accumulate $100,000 in 10 years by making equal monthly deposits. If her account earns 7% annually, what monthly payment is required?',
        description: 'Work backwards from a target amount to find the required payment.',
        idealTime: 320,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the known values',
                description: 'Target amount: $FV = 100,000$, annual rate: 7%, monthly rate: $r = \\frac{0.07}{12} \\approx 0.005833$, months: $n = 120$',
                solution: '$FV = 100,000$, $r \\approx 0.005833$, $n = 120$',
                hint: 'We need to solve for the payment amount PMT.'
            },
            {
                id: '2',
                title: 'Step 2: Rearrange the annuity formula',
                description: 'From $FV = PMT \\cdot \\frac{(1+r)^n - 1}{r}$, solve for PMT: $PMT = \\frac{FV \\cdot r}{(1+r)^n - 1}$',
                solution: '$PMT = \\frac{100000 \\cdot 0.005833}{(1.005833)^{120} - 1}$',
                hint: 'Rearrange to isolate PMT on one side.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the compound factor',
                description: 'Calculate $(1.005833)^{120} \\approx 2.0138$',
                solution: '$(1.005833)^{120} \\approx 2.0138$',
                hint: 'This shows how much $1 grows over 10 years at 7% annual rate.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate required payment',
                description: 'Calculate: $PMT = \\frac{100000 \\cdot 0.005833}{2.0138 - 1} = \\frac{583.3}{1.0138} \\approx 575.28$',
                solution: 'Required payment: $575.28',
                hint: 'Maria needs to deposit $575.28 monthly to reach her goal.'
            }
        ]
    },
    // Infinite Geometric Series (Example 17)
    {
        id: 'SQ49',
        type: 'practice',
        skill: 'Infinite Geometric Series',
        source: 'Week 10 Example 17 Practice',
        title: 'Find sum of $\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\frac{1}{16} + \\ldots$',
        fullQuestion: 'Find the sum of the infinite geometric series $\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\frac{1}{16} + \\ldots$',
        description: 'Like Example 17, verify convergence and apply the infinite series formula.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify first term and ratio',
                description: 'First term: $a_1 = \\frac{1}{2}$. Common ratio: $r = \\frac{\\frac{1}{4}}{\\frac{1}{2}} = \\frac{1}{2}$',
                solution: '$a_1 = \\frac{1}{2}$, $r = \\frac{1}{2}$',
                hint: 'Check convergence: since $|r| = \\frac{1}{2} < 1$, the series converges.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the infinite series formula',
                description: 'Use $S = \\frac{a_1}{1-r} = \\frac{\\frac{1}{2}}{1-\\frac{1}{2}} = \\frac{\\frac{1}{2}}{\\frac{1}{2}}$',
                solution: '$S = \\frac{\\frac{1}{2}}{\\frac{1}{2}} = 1$',
                hint: 'The infinite sum equals 1.'
            }
        ]
    },
    {
        id: 'SQ50',
        type: 'practice',
        skill: 'Infinite Geometric Series',
        source: 'Week 10 Example 17 Practice',
        title: 'Determine convergence and sum of $3 - \\frac{3}{2} + \\frac{3}{4} - \\frac{3}{8} + \\ldots$',
        fullQuestion: 'Determine if the infinite series $3 - \\frac{3}{2} + \\frac{3}{4} - \\frac{3}{8} + \\ldots$ converges. If so, find its sum.',
        description: 'Handle the alternating signs carefully when identifying the ratio.',
        idealTime: 220,
        steps: [
            {
                id: '1',
                title: 'Step 1: Identify the pattern',
                description: 'First term: $a_1 = 3$. Ratio: $r = \\frac{-\\frac{3}{2}}{3} = -\\frac{1}{2}$',
                solution: '$a_1 = 3$, $r = -\\frac{1}{2}$',
                hint: 'The negative ratio causes the alternating signs.'
            },
            {
                id: '2',
                title: 'Step 2: Check convergence',
                description: 'Since $|r| = \\left|-\\frac{1}{2}\\right| = \\frac{1}{2} < 1$, the series converges.',
                solution: 'Series converges',
                hint: 'Use absolute value of ratio to check convergence.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the sum',
                description: 'Use $S = \\frac{a_1}{1-r} = \\frac{3}{1-(-\\frac{1}{2})} = \\frac{3}{1+\\frac{1}{2}} = \\frac{3}{\\frac{3}{2}}$',
                solution: '$S = \\frac{3}{\\frac{3}{2}} = 2$',
                hint: 'The sum of this alternating series is 2.'
            }
        ]
    },
    {
        id: 'SQ51',
        type: 'practice',
        skill: 'Infinite Geometric Series',
        source: 'Week 10 Example 17 Practice',
        title: 'Bouncing ball travels infinite distance.',
        fullQuestion: 'A ball is dropped from 10 feet and bounces to 60% of its previous height each time. What is the total distance traveled by the ball?',
        description: 'Model the up and down motion as geometric series and find the total distance.',
        idealTime: 260,
        steps: [
            {
                id: '1',
                title: 'Step 1: Analyze the motion pattern',
                description: 'Initial drop: 10 ft down. First bounce: 6 ft up, then 6 ft down. Second bounce: 3.6 ft up, then 3.6 ft down, etc.',
                solution: 'Down distances: $10 + 6 + 3.6 + \\ldots$, Up distances: $6 + 3.6 + 2.16 + \\ldots$',
                hint: 'The ball goes up and down on each bounce except the initial drop.'
            },
            {
                id: '2',
                title: 'Step 2: Set up the geometric series',
                description: 'Down motion: $10 + 6 + 3.6 + \\ldots = 10 + 6(1 + 0.6 + 0.6^2 + \\ldots)$. Up motion: $6 + 3.6 + \\ldots = 6(1 + 0.6 + 0.6^2 + \\ldots)$',
                solution: 'Both involve the series $1 + 0.6 + 0.6^2 + \\ldots$',
                hint: 'Factor out common terms to see the geometric series pattern.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the infinite series sum',
                description: 'For $1 + 0.6 + 0.6^2 + \\ldots$: $S = \\frac{1}{1-0.6} = \\frac{1}{0.4} = 2.5$',
                solution: 'Infinite series sum: 2.5',
                hint: 'This is a geometric series with $a_1 = 1$ and $r = 0.6$.'
            },
            {
                id: '4',
                title: 'Step 4: Find total distance',
                description: 'Total distance = $10 + 6(2.5) + 6(2.5) = 10 + 15 + 15 = 40$ feet',
                solution: 'Total distance: 40 feet',
                hint: 'The ball travels a total of 40 feet before coming to rest.'
            }
        ]
    },
    // Economic Multiplier (Example 18)
    {
        id: 'SQ52',
        type: 'practice',
        skill: 'Economic Multiplier',
        source: 'Week 10 Example 18 Practice',
        title: 'Simple spending multiplier with 80% re-spending rate.',
        fullQuestion: 'The government gives each citizen a $500 stimulus check. If people spend 80% of any money they receive, what is the total economic impact?',
        description: 'Like Example 18, model the re-spending cycle as an infinite geometric series.',
        idealTime: 200,
        steps: [
            {
                id: '1',
                title: 'Step 1: Model the spending pattern',
                description: 'Initial stimulus: $500. First re-spending: $500 × 0.8 = $400. Second re-spending: $400 × 0.8 = $320, etc.',
                solution: 'Series: $500 + 400 + 320 + \\ldots$',
                hint: 'Each round, 80% of the previous amount gets re-spent.'
            },
            {
                id: '2',
                title: 'Step 2: Identify the geometric series',
                description: 'This is: $500 + 500(0.8) + 500(0.8)^2 + \\ldots = 500(1 + 0.8 + 0.8^2 + \\ldots)$',
                solution: 'Geometric series with $a_1 = 500$, $r = 0.8$',
                hint: 'Factor out 500 to see the standard geometric series form.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the total impact',
                description: 'Use $S = \\frac{a_1}{1-r} = \\frac{500}{1-0.8} = \\frac{500}{0.2} = 2500$',
                solution: 'Total economic impact: $2,500',
                hint: 'The $500 stimulus creates $2,500 in total economic activity.'
            }
        ]
    },
    {
        id: 'SQ53',
        type: 'practice',
        skill: 'Economic Multiplier',
        source: 'Week 10 Example 18 Practice',
        title: 'Tax rebate with leakage.',
        fullQuestion: 'A $800 tax rebate is given to households. They spend 70% domestically and save 30%. What is the total domestic economic impact?',
        description: 'Account for savings as leakage from the spending cycle.',
        idealTime: 250,
        steps: [
            {
                id: '1',
                title: 'Step 1: Understand the spending behavior',
                description: 'Initial rebate: $800. Domestic spending rate: 70%, so each round 70% continues in the cycle.',
                solution: 'Re-spending rate: $r = 0.7$',
                hint: 'The 30% saved leaves the spending cycle (leakage).'
            },
            {
                id: '2',
                title: 'Step 2: Set up the series',
                description: 'Total domestic spending: $800 + 800(0.7) + 800(0.7)^2 + \\ldots = 800(1 + 0.7 + 0.7^2 + \\ldots)$',
                solution: 'Geometric series with $a_1 = 800$, $r = 0.7$',
                hint: 'Only the domestic spending continues the multiplier effect.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the multiplier effect',
                description: 'Use $S = \\frac{a_1}{1-r} = \\frac{800}{1-0.7} = \\frac{800}{0.3} \\approx 2667$',
                solution: 'Total domestic impact: $2,667',
                hint: 'The domestic economic impact is approximately $2,667.'
            }
        ]
    },
    {
        id: 'SQ54',
        type: 'practice',
        skill: 'Economic Multiplier',
        source: 'Week 10 Example 18 Practice',
        title: 'Regional economic impact analysis.',
        fullQuestion: 'A new factory brings $2 million in wages to a region. Workers spend 60% locally, local businesses spend 40% of their revenue locally. What is the total local economic impact?',
        description: 'Model a complex multi-round economic impact with different spending rates.',
        idealTime: 300,
        steps: [
            {
                id: '1',
                title: 'Step 1: Analyze the spending pattern',
                description: 'Initial wages: $2M. Workers spend 60% locally: $1.2M. Businesses then spend 40% of their revenue locally.',
                solution: 'First round: $2M → $1.2M local spending',
                hint: 'Track how money flows through different economic actors.'
            },
            {
                id: '2',
                title: 'Step 2: Determine the effective multiplier rate',
                description: 'Of each dollar entering the local economy, $0.60 goes to workers, then $0.60 × $0.40 = $0.24 re-enters from businesses.',
                solution: 'Effective local re-spending rate: $r = 0.60 + 0.24 = 0.84$',
                hint: 'Combine the worker and business spending effects.'
            },
            {
                id: '3',
                title: 'Step 3: Model as geometric series',
                description: 'Total impact: $2,000,000(1 + 0.84 + 0.84^2 + \\ldots)$',
                solution: 'Geometric series with $a_1 = 2,000,000$, $r = 0.84$',
                hint: 'Use the combined re-spending rate in the series.'
            },
            {
                id: '4',
                title: 'Step 4: Calculate total impact',
                description: 'Use $S = \\frac{a_1}{1-r} = \\frac{2,000,000}{1-0.84} = \\frac{2,000,000}{0.16} = 12,500,000$',
                solution: 'Total local economic impact: $12.5 million',
                hint: 'The $2M factory wages generate $12.5M in total local economic activity.'
            }
        ]
    },
    // Perpetuity Applications (Example 19)
    {
        id: 'SQ55',
        type: 'practice',
        skill: 'Perpetuity Applications',
        source: 'Week 10 Example 19 Practice',
        title: 'Present value of $1000 annual payments forever at 5%.',
        fullQuestion: 'What is the present value of receiving $1,000 at the end of each year forever, assuming a 5% discount rate?',
        description: 'Like Example 19, use the infinite geometric series to find present value of perpetuity.',
        idealTime: 180,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the present value series',
                description: 'Present values: $\\frac{1000}{1.05} + \\frac{1000}{(1.05)^2} + \\frac{1000}{(1.05)^3} + \\ldots$',
                solution: 'Series: $1000(\\frac{1}{1.05} + \\frac{1}{(1.05)^2} + \\frac{1}{(1.05)^3} + \\ldots)$',
                hint: 'Each future payment must be discounted to present value.'
            },
            {
                id: '2',
                title: 'Step 2: Identify the geometric series',
                description: 'This is $1000$ times the series $\\frac{1}{1.05} + \\left(\\frac{1}{1.05}\\right)^2 + \\left(\\frac{1}{1.05}\\right)^3 + \\ldots$',
                solution: 'Geometric series with $a_1 = \\frac{1}{1.05}$, $r = \\frac{1}{1.05}$',
                hint: 'Factor out 1000 and recognize the geometric pattern.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the series sum',
                description: 'Use $S = \\frac{a_1}{1-r} = \\frac{\\frac{1}{1.05}}{1-\\frac{1}{1.05}} = \\frac{\\frac{1}{1.05}}{\\frac{0.05}{1.05}} = \\frac{1}{0.05} = 20$',
                solution: 'Present value: $1000 × 20 = $20,000',
                hint: 'The perpetuity formula gives $\\frac{Payment}{Rate} = \\frac{1000}{0.05} = 20,000$.'
            }
        ]
    },
    {
        id: 'SQ56',
        type: 'practice',
        skill: 'Perpetuity Applications',
        source: 'Week 10 Example 19 Practice',
        title: 'Growing perpetuity for stock valuation.',
        fullQuestion: 'A stock pays a $2 dividend this year. Dividends are expected to grow 4% annually forever. If the required return is 10%, what is the stock value?',
        description: 'Handle a growing perpetuity where payments increase each year.',
        idealTime: 240,
        steps: [
            {
                id: '1',
                title: 'Step 1: Understand the dividend growth',
                description: 'Year 1: $2, Year 2: $2(1.04) = $2.08, Year 3: $2(1.04)^2 = $2.163, etc.',
                solution: 'Growing dividend stream with 4% annual growth',
                hint: 'Each dividend is 4% larger than the previous year.'
            },
            {
                id: '2',
                title: 'Step 2: Set up present value calculation',
                description: 'PV = $\\frac{2}{1.10} + \\frac{2(1.04)}{(1.10)^2} + \\frac{2(1.04)^2}{(1.10)^3} + \\ldots$',
                solution: 'PV = $2 \\sum_{n=1}^{\\infty} \\left(\\frac{1.04}{1.10}\\right)^{n-1} \\cdot \\frac{1}{1.10}$',
                hint: 'Each term has dividend growth and discounting.'
            },
            {
                id: '3',
                title: 'Step 3: Simplify to geometric series',
                description: 'This simplifies to a geometric series with effective ratio $\\frac{1.04}{1.10} \\approx 0.945$',
                solution: 'Geometric series with first term $\\frac{2}{1.10}$ and ratio $\\frac{1.04}{1.10}$',
                hint: 'The ratio combines growth rate and discount rate.'
            },
            {
                id: '4',
                title: 'Step 4: Apply growing perpetuity formula',
                description: 'For growing perpetuity: PV = $\\frac{D_1}{r-g} = \\frac{2}{0.10-0.04} = \\frac{2}{0.06} = 33.33$',
                solution: 'Stock value: $33.33',
                hint: 'The Gordon Growth Model gives stock value of $33.33.'
            }
        ]
    },
    {
        id: 'SQ57',
        type: 'practice',
        skill: 'Perpetuity Applications',
        source: 'Week 10 Example 19 Practice',
        title: 'Endowment fund analysis.',
        fullQuestion: 'A university wants to establish an endowment that pays $50,000 annually for scholarships forever. If the fund earns 6% annually, how much must be invested initially?',
        description: 'Calculate the principal needed to support a perpetual payment stream.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Understand the endowment structure',
                description: 'The fund must generate $50,000 each year forever while preserving the principal.',
                solution: 'Required annual payment: $50,000, Rate of return: 6%',
                hint: 'The fund earns interest that covers the annual payments.'
            },
            {
                id: '2',
                title: 'Step 2: Apply the perpetuity formula',
                description: 'For a perpetuity: Present Value = $\\frac{Annual Payment}{Interest Rate} = \\frac{50,000}{0.06}$',
                solution: 'PV = $\\frac{50,000}{0.06}$',
                hint: 'This formula assumes payments at the end of each year.'
            },
            {
                id: '3',
                title: 'Step 3: Calculate the required investment',
                description: 'PV = $\\frac{50,000}{0.06} = 833,333.33$',
                solution: 'Required initial investment: $833,333',
                hint: 'The university needs to invest approximately $833,333.'
            },
            {
                id: '4',
                title: 'Step 4: Verify the calculation',
                description: 'Check: $833,333 × 0.06 = $50,000 annual interest, which exactly covers the scholarship payments.',
                solution: 'Verification: $833,333 × 6% = $50,000 ✓',
                hint: 'The interest exactly matches the required annual payment.'
            }
        ]
    }
];
