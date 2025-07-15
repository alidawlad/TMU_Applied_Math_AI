import type { Example } from '@/lib/types';

export const week10GeometricExamples: Example[] = [
    {
        id: 'W10-E11',
        title: 'Example 11: Writing Terms of Geometric Sequences',
        relatedPracticeProblemIds: ['SQ31', 'SQ32', 'SQ33'],
        segments: [
            { type: 'heading', text: '4. Geometric Sequences' },
            
            { type: 'callout', text: 'A geometric sequence is like compound interest - each term is multiplied by the same ratio!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'A sequence $(a_n)$ is said to be **geometric** if the ratio between consecutive terms is constant, i.e.,' },
            
            { type: 'math', text: '\\frac{a_n}{a_{n-1}} = r' },
            
            { type: 'paragraph', text: 'for $n \\geq 2$ and a fixed number $r$ called the **common ratio**. The defining formula $\\frac{a_n}{a_{n-1}} = r$ implies' },
            
            { type: 'math', text: 'a_n = ra_{n-1}' },
            
            { type: 'connection', text: 'and basically tells us to start with a number $a_1$ and get the next term by multiplying it by $r$. So, we have' },
            
            { type: 'math', text: '\\begin{align} &a_1 \\\\ &a_2 = ra_1 \\\\ &a_3 = ra_2 \\\\ &a_4 = ra_3 \\\\ &\\cdots \\end{align}' },
            
            { type: 'summary-box', text: 'If we know the first term $a_1$ and the common ratio $r$, we can list a finite number of terms of the sequence.' },
            
            { type: 'subheading', text: 'Example 11. Write the first five terms of the sequence with the first term $a_1 = 3$ and the common ratio $r = -2$.' },
            
            { type: 'paragraph', text: '**Solution:** Using the defining property of a geometric sequence we have' },
            
            { type: 'step-by-step', text: 'Let\'s calculate each term step by step:' },
            { type: 'math', text: 'a_1 = 3' },
            { type: 'math', text: 'a_2 = (-2) \\cdot 3 = -6' },
            { type: 'math', text: 'a_3 = (-2) \\cdot (-6) = 12' },
            { type: 'math', text: 'a_4 = (-2) \\cdot 12 = -24' },
            { type: 'math', text: 'a_5 = (-2) \\cdot (-24) = 48' },
            
            { type: 'pattern-highlight', text: 'So, the first five terms of this geometric sequence are:' },
            { type: 'math', text: '3, -6, 12, -24, 48' },
            
            { type: 'connection', text: 'Notice the alternating signs! This happens when the common ratio is negative.' },
        ]
    },
    {
        id: 'W10-E12',
        title: 'Example 12: Determining if Sequences are Geometric',
        relatedPracticeProblemIds: ['SQ34', 'SQ35', 'SQ36'],
        segments: [
            { type: 'subheading', text: 'Example 12. Determine if each sequence is geometric. If so, indicate the common ratio.' },
            
            { type: 'step-by-step', text: '**Part a)** $4, 8, 16, 32, 64, 128$' },
            { type: 'step-by-step', text: '**Part b)** $-2, 6, -12, 36, -72, 216$' },
            
            { type: 'paragraph', text: '**Solution:**' },
            
            { type: 'step-by-step', text: '**Part a)** We have' },
            
            { type: 'paragraph', text: 'Let\'s create a table to check the ratios:' },
            
            { type: 'math', text: '\\begin{array}{|c|c|c|c|c|c|c|} \\hline a_n & 4 & 8 & 16 & 32 & 64 & 128 \\\\ \\hline \\frac{a_n}{a_{n-1}} & & \\frac{8}{4} & \\frac{16}{8} & \\frac{32}{16} & \\frac{64}{32} & \\frac{128}{64} \\\\ \\hline r & & 2 & 2 & 2 & 2 & 2 \\\\ \\hline \\end{array}' },
            
            { type: 'pattern-highlight', text: 'So, the sequence is geometric. The common ratio is $r = 2$.' },
            
            { type: 'step-by-step', text: '**Part b)** We have' },
            
            { type: 'math', text: '\\begin{array}{|c|c|c|c|c|c|c|} \\hline a_n & -2 & 6 & -12 & 36 & -72 & 216 \\\\ \\hline \\frac{a_n}{a_{n-1}} & & \\frac{6}{-2} & \\frac{-12}{6} & \\frac{36}{-12} & \\frac{-72}{36} & \\frac{216}{-72} \\\\ \\hline r & & -3 & -2 & -3 & -2 & -3 \\\\ \\hline \\end{array}' },
            
            { type: 'callout', text: 'So, the sequence is **not geometric**, not all ratios between the consecutive terms are equal.', emphasis: 'warning' },
            
            { type: 'summary-box', text: 'Key insight: For a sequence to be geometric, ALL consecutive ratios must be the same!' },
        ]
    },
    {
        id: 'W10-E13',
        title: 'Example 13: Savings Account Application',
        relatedPracticeProblemIds: ['SQ37', 'SQ38', 'SQ39'],
        segments: [
            { type: 'subheading', text: 'General Term Formula for Geometric Sequences' },
            
            { type: 'paragraph', text: 'We will now derive the formula for the general term of a geometric sequence. Let us look closely at the following pattern' },
            
            { type: 'pattern-highlight', text: 'Visual Pattern for Geometric Sequence Terms:' },
            { type: 'math', text: '\\begin{array}{lll} a_1 & & \\\\ a_2 \\cdot r & a_1 \\cdot r & \\\\ a_3 \\cdot r & a_2 \\cdot r & a_1 \\cdot r^2 \\\\ a_4 \\cdot r & a_3 \\cdot r & a_1 \\cdot r^3 \\\\ a_5 \\cdot r & a_4 \\cdot r & a_1 \\cdot r^4 \\end{array}' },
            
            { type: 'connection', text: 'The first term, $a_1$, is not multiplied by any $r$. In the second term, the $a_1$ is multiplied by $r$. In the third term, the $a_1$ is multiplied by $r$ two times ($r \\cdot r$ or $r^2$). In the fourth term, the $a_1$ is multiplied by $r$ three times ($r \\cdot r \\cdot r$ or $r^3$) and in the fifth term, the $a_1$ is multiplied by $r$ four times. In each term, the number of times $a_1$ is multiplied by $r$ is one less than the number of the term. This leads us to the following conclusion:' },
            
            { type: 'summary-box', text: '**Key Formula: General Term of Geometric Sequence**' },
            { type: 'callout', text: 'The general term of a geometric sequence with first term $a_1$ and the common ratio $r$ is:', emphasis: 'primary' },
            
            { type: 'math', text: '\\boxed{a_n = a_1 \\cdot r^{n-1}}' },
            
            { type: 'subheading', text: 'Example 13. (Savings account application)' },
            
            { type: 'step-by-step', text: 'A savings account, which earns interest at a rate of 5% compounded annually, contains \$125.00 and is forgotten. It is remembered 9 years later. How much does it then contain?' },
            
            { type: 'paragraph', text: '**Solution:** The sequence that determines the amount on this savings account is clearly increasing. We start with \$125.00. The 5% interest compounded annually means that we will multiply the previous year\'s amount by 1.05.' },
            
            { type: 'connection', text: 'This means that after one year the amount on the savings account will be \$125 \\cdot (1.05), after two years the amount on the savings account will be \$125 \\cdot (1.05)^2, etc. So, we can express the amount on the savings account after $n$ years as a geometric sequence' },
            
            { type: 'math', text: 'a_n = 125 \\cdot (1.05)^n' },
            
            { type: 'step-by-step', text: 'Plugging $n = 9$ in this formula gives' },
            
            { type: 'math', text: 'a_9 = 125 \\cdot (1.05)^9 = 193.92' },
            
            { type: 'pattern-highlight', text: 'i.e., the amount on the savings account after 9 years is \$193.92.' },
        ]
    },
    {
        id: 'W10-E14',
        title: 'Example 14: Finding Terms Using System of Equations',
        relatedPracticeProblemIds: ['SQ40', 'SQ41', 'SQ42'],
        segments: [
            { type: 'subheading', text: 'Example 14. Given that 10 and 80 are the second and fifth terms respectively of a geometric sequence, find the value of the third term.' },
            
            { type: 'paragraph', text: '**Solution:** Let us denote by $a_1$ the first term and by $r$ the ratio of this geometric sequence. Using the general term formula, we have' },
            
            { type: 'step-by-step', text: 'Set up the system using the general formula $a_n = a_1 \\cdot r^{n-1}$:' },
            { type: 'math', text: 'a_2 = a_1 \\cdot r^{2-1} = a_1 \\cdot r = 10 \\quad \\text{(equation 12)}' },
            { type: 'math', text: 'a_5 = a_1 \\cdot r^{5-1} = a_1 \\cdot r^4 = 80 \\quad \\text{(equation 13)}' },
            
            { type: 'step-by-step', text: 'Now, we need to solve the system of equations' },
            
            { type: 'math', text: 'a_1 \\cdot r = 10 \\quad \\text{(12)}' },
            { type: 'math', text: 'a_1 \\cdot r^4 = 80 \\quad \\text{(13)}' },
            
            { type: 'paragraph', text: 'We have that' },
            
            { type: 'math', text: '\\frac{a_1 \\cdot r^4}{a_1 \\cdot r} = \\frac{80}{10}' },
            
            { type: 'connection', text: 'which is equivalent to $r^3 = 8$, and finally $r = 2$. Now plugging $r = 2$ in equation (12) we find that $a_1 \\cdot 2 = 10$, which implies $a_1 = 5$. Finally, we have' },
            
            { type: 'math', text: 'a_n = 5 \\cdot 2^{n-1} \\quad \\text{(14)}' },
            
            { type: 'step-by-step', text: 'Plugging $n = 3$ in equation (14) we find $a_3 = 5 \\cdot 2^{3-1} = 5 \\cdot 2^2 = 20$.' },
            
            { type: 'summary-box', text: 'Therefore, the third term of the geometric sequence is 20.' },
            
            { type: 'connection', text: 'Given a geometric sequence $(a_i)$ with the common ratio $r$ we denote by $S_n$ the sum of the first $n$-terms of this sequence, i.e.,' },
            
            { type: 'math', text: 'S_n = \\sum_{i=1}^{n} a_i = a_1 + a_2 + \\cdots + a_n' },
            
            { type: 'paragraph', text: 'There is a simple formula for finding the sum of a sequence using the first term and the common ratio of the sequence.' },
            
            { type: 'callout', text: 'The sum, $S_n$, of the first $n$ terms of a geometric sequence is', emphasis: 'primary' },
            
            { type: 'math', text: '\\boxed{S_n = \\frac{a_1(1-r^n)}{1-r}}' },
        ]
    }
];