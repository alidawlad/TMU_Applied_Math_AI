import type { Example } from '@/lib/types';

export const week10Examples: Example[] = [
    {
        id: 'W10-E1',
        title: 'Example 1: Sequences given by its general term',
        relatedPracticeProblemIds: ['SQ1', 'SQ2', 'SQ3'],
        segments: [
            { type: 'heading', text: '1. Sequences' },
            
            { type: 'callout', text: 'A sequence is just a list of numbers in a specific order!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'An **infinite sequence** is a function $a: \\mathbb{N} \\to \\mathbb{R}$.' },
            { type: 'paragraph', text: 'A **finite sequence** is a function $a: \\{1, 2, ..., n\\} \\to \\mathbb{R}$.' },
            
            { type: 'connection', text: 'Think of it like this: Instead of $a(n)$, we write $a_n$ to mean "the n-th term of the sequence".' },
            
            { type: 'paragraph', text: 'We use $(a_k)^n_{k=1}$ to show a **finite sequence** of length $n$:' },
            { type: 'math', text: 'a_1, a_2, a_3, ..., a_n' },
            
            { type: 'paragraph', text: 'We use $(a_k)^\\infty_{k=1}$ to show an **infinite sequence**:' },
            { type: 'math', text: 'a_1, a_2, a_3, ...' },
            
            { type: 'summary-box', text: 'Sequences can be given in three ways:' },
            { type: 'numbered-list', items: [
                'by specifying its **general term** (a formula for the n-th term)',
                'by **listing the terms** of the sequence', 
                'by a **recursive formula** (each term depends on previous terms)'
            ]},
            
            { type: 'subheading', text: 'Example 1. Sequences given by its general term' },
            
            { type: 'step-by-step', text: '**Part a)** If the sequence $(a_n)^\\infty_{n=1}$ is given by $a_n = 2n$, then:' },
            { type: 'math', text: 'a_1 = 2 \\cdot 1 = 2, \\quad a_2 = 2 \\cdot 2 = 4, \\quad a_3 = 2 \\cdot 3 = 6, \\quad ...' },
            { type: 'paragraph', text: 'These are the 1st, 2nd, and 3rd terms of the sequence.' },
            
            { type: 'pattern-highlight', text: 'We see that $a_n = 2n$ gives us the sequence of **even numbers**:' },
            { type: 'math', text: '2, 4, 6, 8, 10, ...' },
            
            { type: 'step-by-step', text: '**Part b)** If the sequence $(a_n)^\\infty_{n=1}$ is given by $a_n = n^2$, then:' },
            { type: 'math', text: 'a_1 = 1^2 = 1, \\quad a_2 = 2^2 = 4, \\quad a_3 = 3^2 = 9, \\quad ...' },
            { type: 'paragraph', text: 'These are the 1st, 2nd, and 3rd terms of the sequence.' },
            
            { type: 'pattern-highlight', text: 'We see that $a_n = n^2$ gives us the sequence of **squares of natural numbers**:' },
            { type: 'math', text: '1, 4, 9, 16, 25, ...' },
            
            { type: 'step-by-step', text: '**Part c)** If the sequence $(a_n)^\\infty_{n=1}$ is given by $a_n = \\frac{1}{2^n}$, then:' },
            { type: 'math', text: 'a_1 = \\frac{1}{2^1} = \\frac{1}{2}, \\quad a_2 = \\frac{1}{2^2} = \\frac{1}{4}, \\quad a_5 = \\frac{1}{2^5} = \\frac{1}{32}' },
            { type: 'paragraph', text: 'These are the 1st, 2nd, and 5th terms of the sequence.' },
            
            { type: 'pattern-highlight', text: 'Notice how each term gets smaller! This is a **decreasing sequence**.' },
        ]
    },
    {
        id: 'W10-E2',
        title: 'Example 2: Sequences given by listing the terms',
        relatedPracticeProblemIds: ['SQ4', 'SQ5', 'SQ6'],
        segments: [
            { type: 'subheading', text: 'Example 2. Sequences given by listing the terms' },
            
            { type: 'callout', text: 'Sometimes we get just a list of numbers and need to find the pattern!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: '**Part a)** Write the sequence $1, 3, 5, 7, 9, 11$ in the form $(a_n)^6_{n=1}$.' },
            { type: 'paragraph', text: 'The sequence is apparently the sequence of the **first six odd numbers**.' },
            { type: 'pattern-highlight', text: 'Look at the pattern: $1, 3, 5, 7, 9, 11$ - each number is 2 more than the previous!' },
            { type: 'paragraph', text: 'So, we can determine its terms by formula $(2n - 1)^6_{n=1}$' },
            
            { type: 'connection', text: 'Let\'s verify: $2(1)-1=1$, $2(2)-1=3$, $2(3)-1=5$, $2(4)-1=7$, $2(5)-1=9$, $2(6)-1=11$ ✓' },
            
            { type: 'step-by-step', text: '**Part b)** Write the sequence $1, 4, 9, 16, ...$ in the form $(a_n)$.' },
            { type: 'paragraph', text: 'The sequence is apparently the sequence of **squares of positive integers**.' },
            { type: 'pattern-highlight', text: 'Most people would consider the correct answer $(n^2)^\\infty_{n=1}$.' },
            
            { type: 'callout', text: 'BUT WAIT! Be careful about assuming patterns from just a few terms!', emphasis: 'warning' },
            
            { type: 'paragraph', text: 'But if we look at the sequence $(n^4 - 10n^3 + 36n^2 - 50n + 24)^\\infty_{n=1}$ we will see that it also has its first four terms given by $1, 4, 9, 16$, and yet $a_5 = 49$, $a_6 = 156$, $a_7 = 409$.' },
            
            { type: 'paragraph', text: 'While $1, 4, 9, 16$ are the squares of $1, 2, 3, 4$ respectively, $a_5 = 49$, $a_6 = 156$, $a_7 = 409$ are **not** squares of $5, 6, 7$.' },
            
            { type: 'paragraph', text: 'So, we can conclude that $(n^2)^4_{n=1} = (n^4 - 10n^3 + 36n^2 - 50n + 24)^4_{n=1}$ but for example' },
            
            { type: 'math', text: '5^2 = 25 \\neq 49 = 5^4 - 10 \\cdot 5^3 + 36 \\cdot 5^2 - 50 \\cdot 5 + 24' },
            
            { type: 'summary-box', text: 'Key lesson: An infinite sequence **cannot be determined** by finitely many values alone!' },
        ]
    },
    {
        id: 'W10-E3',
        title: 'Example 3: Recursively defined sequences',
        relatedPracticeProblemIds: ['SQ7', 'SQ8', 'SQ9'],
        segments: [
            { type: 'subheading', text: 'Example 3. Recursively defined sequences' },
            { type: 'paragraph', text: 'A sequence that is defined in terms of itself evaluated at smaller values, and some explicitly given smaller values is said to be **recursively defined**.' },
            
            { type: 'step-by-step', text: '**Part a)** Suppose that the sequence $(a_n)^\\infty_{n=1}$ is defined by:' },
            { type: 'math', text: 'a_1 = 1, \\quad \\text{and for every } k \\geq 1, \\quad a_{k+1} = (k + 1)a_k' },
            
            { type: 'paragraph', text: 'If $k = 1$ we have:' },
            { type: 'math', text: 'a_2 = (2)a_1 = (2)1 = 2' },
            
            { type: 'paragraph', text: 'If $k = 2$ we have:' },
            { type: 'math', text: 'a_3 = (3)a_2 = (3)2 = 6' },
            
            { type: 'pattern-highlight', text: 'Do you see the pattern? We\'re building factorials! $a_1 = 1!$, $a_2 = 2!$, $a_3 = 3!$' },
            { type: 'step-by-step', text: '**Part b)** Suppose that the sequence $(F_n)^\\infty_{n=1}$ is defined by:' },
            { type: 'math', text: 'F_1 = 1, \\quad F_2 = 1, \\quad \\text{and for every } k \\geq 1, \\quad F_{k+2} = F_{k+1} + F_k' },
            
            { type: 'paragraph', text: 'If $k = 1$ we have:' },
            { type: 'math', text: 'F_3 = F_2 + F_1 = 1 + 1 = 2' },
            
            { type: 'paragraph', text: 'If $k = 2$ we have:' },
            { type: 'math', text: 'F_4 = F_3 + F_2 = 2 + 1 = 3' },
            
            { type: 'paragraph', text: 'If $k = 3$ we have:' },
            { type: 'math', text: 'F_5 = F_4 + F_3 = 3 + 2 = 5' },
            
            { type: 'paragraph', text: 'The first ten numbers of this sequence are:' },
            { type: 'math', text: '1, 1, 2, 3, 5, 8, 13, 21, 34, 55' },
            
            { type: 'callout', text: 'This famous sequence is called the **Fibonacci sequence**!', emphasis: 'success' },
            
            { type: 'paragraph', text: 'Computing the $k^{th}$ term of a recursively defined sequence may be time consuming. Sometimes, it is possible to find an explicit formula that would compute the $k^{th}$ term without using the values of previous terms.' },
            
            { type: 'paragraph', text: 'In case of the Fibonacci sequence such a formula exist but it is not easy to derive. One can show that:' },
            
            { type: 'math', text: 'F_n = \\frac{1}{\\sqrt{5}} \\left( \\left( \\frac{1 + \\sqrt{5}}{2} \\right)^n - \\left( \\frac{1 - \\sqrt{5}}{2} \\right)^n \\right)' },
            
            { type: 'callout', text: 'This is called **Binet\'s formula** - it gives us any Fibonacci number directly!', emphasis: 'primary' },
            
            { type: 'connection', text: 'The number $\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$ is called the **golden ratio** and appears throughout nature!' },
            
            { type: 'summary-box', text: 'Fibonacci numbers appear everywhere: flower petals, spiral shells, tree branches, and even in art and architecture!' },
        ]
    }
];
