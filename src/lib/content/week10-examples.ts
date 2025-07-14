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
    }
];
