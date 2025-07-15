import type { Example } from '@/lib/types';

export const week10GeometricSeriesExamples: Example[] = [
    {
        id: 'W10-E15',
        title: 'Example 15: Finding Number of Terms in Geometric Series',
        relatedPracticeProblemIds: ['SQ43', 'SQ44', 'SQ45'],
        segments: [
            { type: 'subheading', text: 'Example 15. The sum of the first $n$ terms of the geometric sequence' },
            
            { type: 'math', text: '10, 5, \\frac{5}{2}, \\ldots' },
            
            { type: 'paragraph', text: 'is $\\frac{155}{8}$, find the value of $n$.' },
            
            { type: 'paragraph', text: '**Solution:** We are given a geometric sequence with $a_1 = 10$, $a_2 = 5$, $a_3 = \\frac{5}{2}$, which implies' },
            
            { type: 'step-by-step', text: 'First, let\'s find the common ratio:' },
            { type: 'math', text: 'r = \\frac{a_2}{a_1} = \\frac{5}{10} = \\frac{1}{2}' },
            
            { type: 'connection', text: 'Further, we are told that $S_n = \\frac{155}{8}$. Plugging $a_1 = 10$ and $r = \\frac{1}{2}$ in the geometric series formula, we get' },
            
            { type: 'math', text: '\\frac{10\\left(1 - \\left(\\frac{1}{2}\\right)^n\\right)}{1 - \\frac{1}{2}} = \\frac{155}{8}' },
            
            { type: 'step-by-step', text: 'Simplifying the denominator:' },
            { type: 'paragraph', text: 'which is equivalent to' },
            
            { type: 'math', text: '20\\left(1 - \\left(\\frac{1}{2}\\right)^n\\right) = \\frac{155}{8} \\quad \\text{(16)}' },
            
            { type: 'step-by-step', text: 'After dividing both sides of equation (16) by 20 we get' },
            
            { type: 'math', text: '1 - \\left(\\frac{1}{2}\\right)^n = \\frac{155}{160}' },
            
            { type: 'paragraph', text: 'which is equivalent to' },
            
            { type: 'math', text: '\\left(\\frac{1}{2}\\right)^n = \\frac{1}{32}' },
            
            { type: 'pattern-highlight', text: 'and finally $n = 5$.' },
            
            { type: 'connection', text: 'We can verify: $\\frac{1}{32} = \\frac{1}{2^5} = \\left(\\frac{1}{2}\\right)^5$, so indeed $n = 5$.' },
        ]
    },
    {
        id: 'W10-E16',
        title: 'Example 16: Future Value Application',
        relatedPracticeProblemIds: ['SQ46', 'SQ47', 'SQ48'],
        segments: [
            { type: 'subheading', text: 'Example 16. (Future value application)' },
            
            { type: 'step-by-step', text: 'Six years from now, Nicole will need a new tractor for her farm. Starting next month, she is going to put \\$100 in the bank each month to save for the inevitable purchase. Six years from now the $k^{th}$ bank deposit will be worth \\$100 \\cdot (1.005)^{72-k}$ (due to compound interest). Write a formula for the accumulated amount of money from her 72 bank deposits and determine how much Nicole will have available towards her tractor purchase.' },
            
            { type: 'paragraph', text: '**Solution:** We are given the value \\$100 \\cdot (1.005)^{72-k}$ of the $k^{th}$ bank deposit six years (72 months) from now. So, we have that the six years from now' },
            
            { type: 'step-by-step', text: 'Let\'s work out the value of each deposit:' },
            { type: 'math', text: '1^{st} \\text{ deposit is worth } 100 \\cdot (1.005)^{71}' },
            { type: 'math', text: '2^{nd} \\text{ deposit is worth } 100 \\cdot (1.005)^{70}' },
            { type: 'math', text: '3^{rd} \\text{ deposit is worth } 100 \\cdot (1.005)^{69}' },
            { type: 'math', text: '\\ldots\\ldots\\ldots\\ldots\\ldots' },
            { type: 'math', text: '71^{st} \\text{ deposit is worth } 100 \\cdot (1.005)^{1}' },
            { type: 'math', text: '72^{nd} \\text{ deposit is worth } 100 \\cdot (1.005)^{0} = 100' },
            
            { type: 'connection', text: 'The accumulated amounts of monthly deposits (in reverse) can be described as a geometric sequence with $a_1 = 100$ and $r = 1.005$. So, the accumulated amount of money from her 72 bank deposits is given by' },
            
            { type: 'math', text: '100 + 100 \\cdot (1.005)^1 + \\cdots + 100 \\cdot (1.005)^{71}' },
            
            { type: 'paragraph', text: 'i.e., the sum of the first 72 terms of the sequence. Using formula (15) we have' },
            
            { type: 'math', text: 'S_{72} = \\frac{100(1 - (1.005)^{72})}{1 - 1.005} \\approx 8640 \\quad \\text{(17)}' },
            
            { type: 'summary-box', text: 'Nicole will have approximately \\$8,640 available towards her tractor purchase.' },
        ]
    }
];