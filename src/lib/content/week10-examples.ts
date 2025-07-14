import type { Example } from '@/lib/types';

export const week10Examples: Example[] = [
    {
        id: 'W10-E1',
        title: 'Example 1: Sequences given by its general term',
        relatedPracticeProblemIds: ['SQ1', 'SQ2', 'SQ3'],
        segments: [
            { type: 'heading', text: '1. Sequences' },
            { type: 'paragraph', text: 'An infinite sequence is a function $a: \\mathbb{N} \\to \\mathbb{R}$. A finite sequence is a function $a: \\{1, 2, ..., n\\} \\to \\mathbb{R}$. Given $n \\in \\mathbb{N}$, the n-term of the sequence $a$ is $a(n)$. It is customary to write $a_n$ instead of $a(n)$ and we will adopt this notation.' },
            { type: 'paragraph', text: 'We will use $(a_k)^n_{k=1}$ to indicate that the sequence is finite of length $n$, i.e.,' },
            { type: 'math', text: 'a_1, a_2, a_3, ... , a_n' },
            { type: 'paragraph', text: 'We will use $(a_k)^\\infty_{k=1}$ to indicate that the sequence is infinite, i.e.,' },
            { type: 'math', text: 'a_1, a_2, a_3, ...' },
            { type: 'paragraph', text: 'Sequences can be given:'},
            { type: 'numbered-list', items: ['by specifying its general term, a formula for writing the n-th term of the sequence', 'by listing the terms of the sequence', 'by a recursive formula']},
            { type: 'subheading', text: 'Example 1. Sequences given by its general term'},
            { type: 'paragraph', text: 'a) If the sequence $(a_n)^\\infty_{n=1}$ is given by $a_n = 2n$, then' },
            { type: 'math', text: 'a_1 = 2 \\cdot 1 = 2, a_2 = 2 \\cdot 2 = 4, a_3 = 2 \\cdot 3 = 6, ...' },
            { type: 'paragraph', text: 'are respectively the 1-st, 2-nd and 3-rd term of the sequence. We see that $a_n = 2n$ is the sequence of even numbers' },
            { type: 'math', text: '2, 4, 6, 8, 10, ...' },
            { type: 'paragraph', text: 'b) If the sequence $(a_n)^\\infty_{n=1}$ is given by $a_n = n^2$, then' },
            { type: 'math', text: 'a_1 = 1^2 = 1, a_2 = 2^2 = 4, a_3 = 3^2 = 9, ...' },
            { type: 'paragraph', text: 'are respectively the 1-st, 2-nd and 3-rd term of the sequence. We see that $a(n) = n^2$ is the sequence of squares of natural numbers' },
            { type: 'math', text: '1, 4, 9, 16, 25, ...' },
            { type: 'paragraph', text: 'c) If the sequence $(a_n)^\\infty_{n=1}$ is given by $a_n = \\frac{1}{2^n}$, then' },
            { type: 'math', text: 'a_1 = \\frac{1}{2^1} = \\frac{1}{2}, a_2 = \\frac{1}{2^2} = \\frac{1}{4}, a_5 = \\frac{1}{2^5} = \\frac{1}{32}' },
            { type: 'paragraph', text: 'are respectively the 1-st, 2-nd and 5-th term of the sequence.' },
        ]
    },
    {
        id: 'W10-E2',
        title: 'Example 2: Summation Notation',
        relatedPracticeProblemIds: ['SN1', 'SN2', 'SN3'],
        segments: [
            { type: 'heading', text: '2. Summation notation' },
            { type: 'paragraph', text: 'Let $(a_k)_{k=1}^n$ be a finite sequence of n terms. Then the sum of the terms of this sequence is denoted by' },
            { type: 'math', text: '\\sum_{k=1}^n a_k = a_1 + a_2 + a_3 + \\dots + a_n' },
            { type: 'paragraph', text: 'The symbol $\\sum$ is the capital Greek letter Sigma. We call $k$ the index of summation, 1 is the lower limit and $n$ is the upper limit.' },
            { type: 'subheading', text: 'Example 2.' },
            { type: 'paragraph', text: 'a) Evaluate the sum $\\sum_{k=1}^5 k^2$.' },
            { type: 'paragraph', text: 'Solution: We have $a_k = k^2$. Then,' },
            { type: 'math', text: '\\sum_{k=1}^5 k^2 = 1^2 + 2^2 + 3^2 + 4^2 + 5^2' },
            { type: 'math', text: '= 1 + 4 + 9 + 16 + 25 = 55' },
            { type: 'paragraph', text: 'b) Evaluate the sum $\\sum_{k=1}^4 (2k+1)$.' },
            { type: 'paragraph', text: 'Solution: We have $a_k = 2k+1$. Then,' },
            { type: 'math', text: '\\sum_{k=1}^4 (2k+1) = (2(1)+1) + (2(2)+1) + (2(3)+1) + (2(4)+1)' },
            { type: 'math', text: '= 3 + 5 + 7 + 9 = 24' },
            { type: 'paragraph', text: 'c) Evaluate the sum $\\sum_{k=1}^5 3$.' },
            { type: 'paragraph', text: 'Solution: Here $a_k = 3$ for every $k$. Then,' },
            { type: 'math', text: '\\sum_{k=1}^5 3 = 3 + 3 + 3 + 3 + 3 = 5 \\cdot 3 = 15' },
        ]
    },
    {
        id: 'W10-E3',
        title: 'Example 3: Properties of Summation',
        relatedPracticeProblemIds: ['PS1', 'PS2', 'PS3'],
        segments: [
            { type: 'heading', text: 'Properties of summation notation' },
            { type: 'paragraph', text: 'Let $(a_k)$ and $(b_k)$ be two sequences and $c$ be a real number. Then the following properties hold:' },
            { type: 'numbered-list', items: [
                '$\\sum_{k=1}^n (a_k + b_k) = \\sum_{k=1}^n a_k + \\sum_{k=1}^n b_k$',
                '$\\sum_{k=1}^n (a_k - b_k) = \\sum_{k=1}^n a_k - \\sum_{k=1}^n b_k$',
                '$\\sum_{k=1}^n c \\cdot a_k = c \\cdot \\sum_{k=1}^n a_k$'
            ]},
            { type: 'subheading', text: 'Example 3.'},
            { type: 'paragraph', text: 'a) $\\sum_{k=1}^{100} (2k + k^2) = \\sum_{k=1}^{100} 2k + \\sum_{k=1}^{100} k^2 = 2 \\sum_{k=1}^{100} k + \\sum_{k=1}^{100} k^2$' },
            { type: 'paragraph', text: 'b) $\\sum_{k=1}^{25} (3k^2 - 5k) = \\sum_{k=1}^{25} 3k^2 - \\sum_{k=1}^{25} 5k = 3 \\sum_{k=1}^{25} k^2 - 5 \\sum_{k=1}^{25} k$' },
            { type: 'paragraph', text: 'c) $\\sum_{k=1}^{n} (1+k) = \\sum_{k=1}^{n} 1 + \\sum_{k=1}^{n} k$. Since $\\sum_{k=1}^{n} 1 = \\underbrace{1+1+\\dots+1}_{n \\text{ times}} = n$, we get' },
            { type: 'math', text: '\\sum_{k=1}^{n} (1+k) = n + \\sum_{k=1}^{n} k' }
        ]
    }
];
