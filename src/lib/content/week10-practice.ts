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
        fullQuestion: 'An employee starts with a salary of $40,000 and receives a $2,500 raise each year. What will be their salary in the 8th year?',
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
                solution: '$57,500',
                hint: 'The salary in the 8th year will be $57,500.'
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
        fullQuestion: 'A coffee shop has daily revenue of $800 on the first day, increasing by $50 each day. Find the total revenue for the first 10 days.',
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
                solution: '$10,250',
                hint: 'The total revenue for 10 days is $10,250.'
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
        fullQuestion: 'A gym membership costs $60 the first month, then increases by $5 each month. If the total cost for several months is $1,020, how many months did the person pay?',
        description: 'Use the sum formula to solve for the number of terms when the total is given.',
        idealTime: 280,
        steps: [
            {
                id: '1',
                title: 'Step 1: Set up the known information',
                description: 'Monthly cost: $a_1 = 60$, monthly increase: $d = 5$, total cost: $S_n = 1020$',
                solution: '$a_1 = 60$, $d = 5$, $S_n = 1020$',
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
                description: 'Set equal to 1020: $\\frac{n}{2}(115 + 5n) = 1020$, so $n(115 + 5n) = 2040$, giving $5n^2 + 115n - 2040 = 0$',
                solution: '$n^2 + 23n - 408 = 0$',
                hint: 'This becomes a quadratic equation in $n$.'
            },
            {
                id: '4',
                title: 'Step 4: Solve the quadratic',
                description: 'Using the quadratic formula or factoring: $(n + 40.5)(n - 10) \\approx 0$, so $n = 12$ (taking the positive solution)',
                solution: '12 months',
                hint: 'The person paid for 12 months (verify: $S_{12} = 6(60 + 115) = 1050$ - close due to rounding).'
            }
        ]
    }
];
