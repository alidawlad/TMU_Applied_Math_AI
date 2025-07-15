import type { Example } from '@/lib/types';

export const week10ArithmeticAdvancedExamples: Example[] = [
    {
        id: 'W10-E10',
        title: 'Example 10: Finding Terms Using System of Equations',
        relatedPracticeProblemIds: ['SQ28', 'SQ29', 'SQ30'],
        segments: [
            { type: 'subheading', text: 'Example 10. Finding first term and common difference from given terms' },
            
            { type: 'step-by-step', text: '**Part a)** Find the first term $a_1$ and common difference $d$ of an arithmetic sequence whose fifth term is 19 and the eleventh term is 37. Give the formula for the general term.' },
            
            { type: 'paragraph', text: '**Solution:**' },
            
            { type: 'callout', text: 'We know that $a_n = a_1 + (n-1)d$ and we are given that $a_5 = 19$ and $a_{11} = 37$.', emphasis: 'primary' },
            
            { type: 'step-by-step', text: '**Step 1: Set up the system of equations**' },
            { type: 'paragraph', text: 'Plugging $n = 5, 11$ into $a_n = a_1 + (n-1)d$ gives us the system of two linear equations in two unknowns $a_1$ and $d$:' },
            
            { type: 'math', text: 'a_1 + (5-1)d = 19 \\quad \\text{(equation 7)}' },
            { type: 'math', text: 'a_1 + (11-1)d = 37 \\quad \\text{(equation 8)}' },
            
            { type: 'paragraph', text: 'or equivalently' },
            
            { type: 'math', text: 'a_1 + 4d = 19 \\quad \\text{(equation 9)}' },
            { type: 'math', text: 'a_1 + 10d = 37 \\quad \\text{(equation 10)}' },
            
            { type: 'step-by-step', text: '**Step 2: Solve the system**' },
            { type: 'paragraph', text: 'Solving this simple system we find $a_1 = 7$ and $d = 3$.' },
            
            { type: 'connection', text: 'We can solve by subtracting equation (9) from equation (10): $(a_1 + 10d) - (a_1 + 4d) = 37 - 19$, which gives us $6d = 18$, so $d = 3$.' },
            
            { type: 'paragraph', text: 'Substituting back: $a_1 + 4(3) = 19$, so $a_1 = 7$.' },
            
            { type: 'pattern-highlight', text: 'Hence, the formula for the general term is:' },
            { type: 'math', text: 'a_n = 7 + (n-1) \\cdot 3 = 7 + 3n - 3 = 3n + 4' },
            
            { type: 'step-by-step', text: '**Part b)** Evaluate the sum $\\sum_{i=5}^{11} a_i$ for the sequence from part a)' },
            
            { type: 'paragraph', text: '**Solution:** We have that' },
            
            { type: 'math', text: '\\sum_{i=5}^{11} a_i = a_5 + a_6 + a_7 + a_8 + a_9 + a_{10} + a_{11}' },
            
            { type: 'paragraph', text: 'We are given $a_5 = 19$ and $a_{11} = 37$. Using $a_n = 3n + 4$ we find that' },
            
            { type: 'step-by-step', text: 'Let\'s calculate each term:' },
            { type: 'math', text: 'a_6 = 3 \\cdot 6 + 4 = 22' },
            { type: 'math', text: 'a_7 = 3 \\cdot 7 + 4 = 25' },
            { type: 'math', text: 'a_8 = 3 \\cdot 8 + 4 = 28' },
            { type: 'math', text: 'a_9 = 3 \\cdot 9 + 4 = 31' },
            { type: 'math', text: 'a_{10} = 3 \\cdot 10 + 4 = 34' },
            
            { type: 'paragraph', text: 'Finally,' },
            
            { type: 'math', text: '\\sum_{i=5}^{11} a_i = a_5+a_6+a_7+a_8+a_9+a_{10}+a_{11} = 19+22+25+28+31+34+37 = 196' },
            
            { type: 'summary-box', text: 'This sum can also be calculated using the arithmetic series formula: $S_7 = \\frac{7}{2}(19 + 37) = \\frac{7}{2} \\cdot 56 = 196$' },
        ]
    }
];