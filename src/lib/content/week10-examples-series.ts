import type { Example } from '@/lib/types';

export const week10SeriesExamples: Example[] = [
    {
        id: 'W10-E4',
        title: 'Example 4: Summation Notation - Basic Expansion',
        relatedPracticeProblemIds: ['SQ10', 'SQ11', 'SQ12'],
        segments: [
            { type: 'heading', text: '2. Summation notation' },
            
            { type: 'callout', text: 'The Greek letter Σ (Sigma) is our mathematical shorthand for adding up lots of numbers!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'Given a sequence $(a_i)^n_{i=1}$ we use a special symbol $\\Sigma$ (the Greek capital letter sigma) to denote the sum $a_1 + a_2 + \\cdots + a_n$, namely' },
            
            { type: 'math', text: '\\sum_{i=1}^{n} a_i = a_1 + a_2 + \\cdots + a_n' },
            
            { type: 'connection', text: '$\\Sigma$ stands for "sum" and the expression $\\sum_{i=1}^{n} a_i$ can be read as the sum of all numbers $a_i$ when $i$ ranges from 1 to $n$.' },
            
            { type: 'pattern-highlight', text: 'The $i$ is called the **index of summation** and the 1 tells us where to start and the $n$ tells us where to end.' },
            
            { type: 'subheading', text: 'Example 4. Expand the sum and find its value' },
            
            { type: 'step-by-step', text: 'Expand the sum $\\sum_{i=1}^{5} 2i$ and find its value.' },
            
            { type: 'paragraph', text: '**Solution:** The index of summation $i$ goes from 1 to 5. We substitute the values 1, 2, 3, 4, 5 in $2i$ and add these numbers, i.e.,' },
            
            { type: 'math', text: '\\sum_{i=1}^{5} 2i = 2 \\cdot 1 + 2 \\cdot 2 + 2 \\cdot 3 + 2 \\cdot 4 + 2 \\cdot 5 = 2 + 4 + 6 + 8 + 10 = 30' },
            
            { type: 'summary-box', text: 'Key insight: We substitute each value of the index into the expression and add all the results!' },
            
            { type: 'connection', text: 'The index of summation $i$ does not have to start from 1. Given a sequence $(a_i)^n_{i=1}$ and $m < n$ we have:' },
            
            { type: 'math', text: '\\sum_{i=m}^{n} a_i = a_m + a_{m+1} + \\cdots + a_n' },
        ]
    },
    {
        id: 'W10-E5',
        title: 'Example 5: Summation with Different Starting Index',
        relatedPracticeProblemIds: ['SQ13', 'SQ14', 'SQ15'],
        segments: [
            { type: 'callout', text: 'Now let\'s practice with a more complex summation that doesn\'t start from 1!', emphasis: 'primary' },
            
            { type: 'subheading', text: 'Example 5. Summation starting from index 3' },
            
            { type: 'step-by-step', text: 'Expand the sum $\\sum_{i=3}^{7} (5i - 2)$ and find its value.' },
            
            { type: 'paragraph', text: '**Solution:** The index of summation $i$ goes from 3 to 7. We substitute the values 3, 4, 5, 6, 7 in $(5i - 2)$ and add these numbers, i.e.,' },
            
            { type: 'math', text: '\\sum_{i=3}^{7} (5i - 2) = (5 \\cdot 3 - 2) + (5 \\cdot 4 - 2) + (5 \\cdot 5 - 2) + (5 \\cdot 6 - 2) + (5 \\cdot 7 - 2)' },
            
            { type: 'step-by-step', text: 'Let\'s calculate each term step by step:' },
            { type: 'paragraph', text: '$(5 \\cdot 3 - 2) = 15 - 2 = 13$' },
            { type: 'paragraph', text: '$(5 \\cdot 4 - 2) = 20 - 2 = 18$' },
            { type: 'paragraph', text: '$(5 \\cdot 5 - 2) = 25 - 2 = 23$' },
            { type: 'paragraph', text: '$(5 \\cdot 6 - 2) = 30 - 2 = 28$' },
            { type: 'paragraph', text: '$(5 \\cdot 7 - 2) = 35 - 2 = 33$' },
            
            { type: 'math', text: '= 13 + 18 + 23 + 28 + 33 = 115' },
            
            { type: 'pattern-highlight', text: 'Notice how we get an arithmetic sequence: 13, 18, 23, 28, 33 with common difference 5!' },
            
            { type: 'connection', text: 'In statistics $\\Sigma$ is often used in formulas to express them in a compact way. For example, given a sequence $a_1, a_2, a_3, \\cdots, a_n$ of real numbers we define the **mean (average)** by:' },
            
            { type: 'math', text: '\\frac{a_1 + a_2 + a_3 + \\cdots + a_n}{n}' },
            
            { type: 'paragraph', text: 'Using $\\Sigma$ notation we can rewrite this formula in the following way:' },
            
            { type: 'math', text: '\\frac{\\sum_{i=1}^{n} a_i}{n} = \\frac{1}{n} \\sum_{i=1}^{n} a_i' },
        ]
    },
    {
        id: 'W10-E6',
        title: 'Example 6: Arithmetic Sequences - Finding Terms',
        relatedPracticeProblemIds: ['SQ16', 'SQ17', 'SQ18'],
        segments: [
            { type: 'connection', text: 'Now that we understand summation notation, let\'s explore a special type of sequence that appears frequently in mathematics and real-world applications.' },
            
            { type: 'heading', text: '3. Arithmetic Sequences' },
            
            { type: 'callout', text: 'An arithmetic sequence is like climbing stairs - each step is exactly the same size!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'A sequence $(a_n)$ is said to be **arithmetic** if the difference between consecutive terms is constant, i.e.,' },
            
            { type: 'math', text: 'a_n - a_{n-1} = d' },
            
            { type: 'paragraph', text: 'for $n \\geq 2$ and a fixed number $d$ called the **common difference**. The defining formula $a_n - a_{n-1} = d$ implies' },
            
            { type: 'math', text: 'a_n = d + a_{n-1}' },
            
            { type: 'connection', text: 'This basically tells us to start with a number $a_1$ and get the next term by adding $d$. So, we have:' },
            
            { type: 'math', text: '\\begin{align*} a_1 \\\\ a_2 &= d + a_1 \\\\ a_3 &= d + a_2 \\\\ a_4 &= d + a_3 \\\\ &\\vdots \\end{align*}' },
            
            { type: 'summary-box', text: 'If we know the first term $a_1$ and the common difference $d$, we can list a finite number of terms of the sequence.' },
            
            { type: 'subheading', text: 'Example 6. Writing arithmetic sequence terms' },
            
            { type: 'step-by-step', text: 'Write the first five terms of an arithmetic sequence with the first term $a_1 = 5$ and the common difference $d = -6$.' },
            
            { type: 'paragraph', text: '**Solution:** Using the defining property of an arithmetic sequence we have' },
            
            { type: 'math', text: '\\begin{align} a_1 &= 5 \\\\ a_2 &= -6 + 5 = -1 \\\\ a_3 &= -6 + (-1) = -7 \\\\ a_4 &= -6 + (-7) = -13 \\\\ a_5 &= -6 + (-13) = -19 \\end{align}' },
            
            { type: 'pattern-highlight', text: 'So, the first five terms of this arithmetic sequence are: $5, -1, -7, -13, -19$' },
            
            { type: 'connection', text: 'Notice how each term decreases by exactly 6 from the previous term - that\'s our common difference $d = -6$!' },
        ]
    },
    {
        id: 'W10-E7',
        title: 'Example 7: Identifying Arithmetic Sequences',
        relatedPracticeProblemIds: ['SQ19', 'SQ20', 'SQ21'],
        segments: [
            { type: 'subheading', text: 'Example 7. Determine if sequences are arithmetic' },
            
            { type: 'step-by-step', text: 'Determine if each sequence is arithmetic. If so, indicate the common difference.' },
            
            { type: 'paragraph', text: 'a) $5, 9, 13, 17, 21, 25$' },
            { type: 'paragraph', text: 'b) $4, 9, 12, 17, 20, 25$' },
            
            { type: 'paragraph', text: '**Solution:**' },
            
            { type: 'step-by-step', text: '**Part a)** We have' },
            
            { type: 'paragraph', text: 'Let\'s create a table to check the differences:' },
            
            { type: 'math', text: '\\begin{array}{|c|c|c|c|c|c|c|} \\hline a_n & 5 & 9 & 13 & 17 & 21 & 25 \\\\ \\hline a_n - a_{n-1} & & 9-5 & 13-9 & 17-13 & 21-17 & 25-21 \\\\ \\hline d & & 4 & 4 & 4 & 4 & 4 \\\\ \\hline \\end{array}' },
            
            { type: 'pattern-highlight', text: 'So, the sequence is arithmetic. The common difference is $d = 4$.' },
            
            { type: 'step-by-step', text: '**Part b)** We have' },
            
            { type: 'math', text: '\\begin{array}{|c|c|c|c|c|c|c|} \\hline a_n & 4 & 9 & 12 & 17 & 20 & 25 \\\\ \\hline a_n - a_{n-1} & & 9-4 & 12-9 & 17-12 & 20-17 & 25-20 \\\\ \\hline d & & 5 & 3 & 5 & 3 & 5 \\\\ \\hline \\end{array}' },
            
            { type: 'callout', text: 'So, the sequence is **not arithmetic**, not all differences between the consecutive terms are equal.', emphasis: 'warning' },
            
            { type: 'summary-box', text: 'Key insight: For a sequence to be arithmetic, ALL consecutive differences must be the same!' },
        ]
    },
    {
        id: 'W10-E8',
        title: 'Example 8: Arithmetic Sequence Formula and Applications',
        relatedPracticeProblemIds: ['SQ22', 'SQ23', 'SQ24'],
        segments: [
            { type: 'subheading', text: 'General Term Formula for Arithmetic Sequences' },
            
            { type: 'paragraph', text: 'We will now derive the formula for the general term of an arithmetic sequence. Let us look closely at the following pattern:' },
            
            { type: 'pattern-highlight', text: 'Visual Pattern for Arithmetic Sequence Terms:' },
            { type: 'math', text: '\\begin{array}{ccccc} \\text{Term 1:} & a_1 & & & \\\\ \\text{Term 2:} & a_1 + d & = & a_1 + 1d & \\\\ \\text{Term 3:} & a_1 + d + d & = & a_1 + 2d & \\\\ \\text{Term 4:} & a_1 + d + d + d & = & a_1 + 3d & \\\\ \\text{Term 5:} & a_1 + d + d + d + d & = & a_1 + 4d & \\\\ \\vdots & \\vdots & & \\vdots & \\end{array}' },
            
            { type: 'connection', text: 'Looking at the pattern, we can see how each term builds on the first term $a_1$:' },
            { type: 'paragraph', text: 'The first term adds $0d$ to $a_1$, the second term adds $1d$, the third term adds $2d$, the fourth term adds $3d$, and the fifth term adds $4d$.' },
            { type: 'paragraph', text: 'The number of $d$s that we added to $a_1$ is one less than the number of the term.' },
            
            { type: 'pattern-highlight', text: 'This leads us to the following conclusion:' },
            
            { type: 'summary-box', text: '**Key Formula: General Term of Arithmetic Sequence**' },
            { type: 'callout', text: 'The general term of an arithmetic sequence with first term $a_1$ and common difference $d$ is:', emphasis: 'primary' },
            
            { type: 'math', text: '\\boxed{a_n = a_1 + (n - 1)d}' },
            
            { type: 'subheading', text: 'Example 8. (Inventory application)' },
            
            { type: 'step-by-step', text: 'Every 30 days a grocery store stocks 90 cans of noodle soup, and sells 3 cans each day. Describe the inventory levels of noodle soup at the end of each day as a sequence, and determine the inventory level 19 days after restocking.' },
            
            { type: 'paragraph', text: '**Solution:** Let\'s think step by step about this inventory problem.' },
            
            { type: 'step-by-step', text: '**Step 1: Understand the pattern**' },
            { type: 'paragraph', text: 'The grocery store starts with 90 cans and sells 3 cans each day, including the first day.' },
            
            { type: 'step-by-step', text: '**Step 2: Find the first term**' },
            { type: 'paragraph', text: 'At the end of day 1: $a_1 = 90 - 3 = 87$ cans remaining' },
            
            { type: 'step-by-step', text: '**Step 3: Identify the pattern**' },
            { type: 'paragraph', text: 'Each day, 3 fewer cans remain, so the common difference is $d = -3$.' },
            
            { type: 'step-by-step', text: '**Step 4: Apply the general formula**' },
            { type: 'paragraph', text: 'Using $a_n = a_1 + (n - 1)d$ with $a_1 = 87$ and $d = -3$:' },
            
            { type: 'math', text: 'a_n = 87 + (n - 1) \\cdot (-3) = 90 - 3n' },
            
            { type: 'step-by-step', text: '**Step 5: Find the inventory after 19 days**' },
            { type: 'paragraph', text: 'Substitute $n = 19$ into our formula:' },
            
            { type: 'math', text: 'a_{19} = 87 + (19 - 1) \\cdot (-3) = 87 + 18 \\cdot (-3) = 87 - 54 = 33' },
            
            { type: 'summary-box', text: '**Answer:** After 19 days, there will be 33 cans of noodle soup remaining in inventory.' },
        ]
    },
    {
        id: 'W10-E9', 
        title: 'Example 9: Arithmetic Series and Revenue Application',
        relatedPracticeProblemIds: ['SQ25', 'SQ26', 'SQ27'],
        segments: [
            { type: 'subheading', text: 'Sum of Arithmetic Sequences' },
            
            { type: 'connection', text: 'Remember the summation notation we learned in Examples 4 and 5? Now we\'ll use it for arithmetic sequences!' },
            
            { type: 'paragraph', text: 'Given an arithmetic sequence $(a_i)$ with the common difference $d$ we denote by $S_n$ the sum of the first $n$-terms of this sequence, i.e.,' },
            
            { type: 'math', text: 'S_n = \\sum_{i=1}^{n} a_i = a_1 + a_2 + \\cdots + a_n' },
            
            { type: 'callout', text: 'There is a simple formula for finding the sum of a sequence using the first and last term of the sequence.', emphasis: 'primary' },
            
            { type: 'summary-box', text: '**Key Formula: Sum of Arithmetic Series**' },
            { type: 'callout', text: 'The sum $S_n$ of the first $n$ terms of an arithmetic sequence is:', emphasis: 'success' },
            
            { type: 'math', text: '\\boxed{S_n = \\frac{n}{2}(a_1 + a_n)}' },
            
            { type: 'subheading', text: 'Example 9. (Revenue application)' },
            
            { type: 'step-by-step', text: 'Current daily revenue at a campus burger restaurant is \\$12,000. Over the next 30 days revenue is expected to increase by \\$1,000 each day as students return for the fall semester. What is the projected total revenue for the 31 days for which we have projected data?' },
            
            { type: 'paragraph', text: '**Solution:** The daily revenue at the campus burger restaurant can be described as an arithmetic sequence with $a_1 = 12000$ and $d = 1000$. So, the revenue at $n^{th}$ day is given by' },
            
            { type: 'math', text: 'a_n = 12000 + (n - 1) \\cdot 1000' },
            
            { type: 'connection', text: 'The total projected revenue for the 31 days is given by:' },
            
            { type: 'math', text: 'S_{31} = \\frac{31}{2} \\cdot (a_1 + a_{31})' },
            
            { type: 'step-by-step', text: 'First, let\'s find $a_{31}$:' },
            { type: 'paragraph', text: 'Plugging $n = 31$ in the formula we find that $a_{31} = 12000 + (31 - 1) \\cdot 1000 = 42000$.' },
            
            { type: 'step-by-step', text: 'Now we can calculate the total:' },
            { type: 'paragraph', text: 'Now, plugging $a_1 = 12000$ and $a_{31} = 42000$ in the sum formula we find' },
            
            { type: 'math', text: 'S_{31} = \\frac{31}{2} \\cdot (12000 + 42000) = 837000' },
            
            { type: 'pattern-highlight', text: 'So, the projected total revenue for the 31 days for which we have projected data is expected to be \\$837000.' },
        ]
    }
];
