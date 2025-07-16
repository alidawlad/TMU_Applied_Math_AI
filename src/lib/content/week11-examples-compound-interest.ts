import type { Example } from '@/lib/types';

export const week11CompoundInterestExamples: Example[] = [
    {
        id: 'W11-E4',
        title: 'Example 4: Future and Present Value with Simple Interest',
        relatedPracticeProblemIds: ['SI10', 'SI11', 'SI12'],
        segments: [
            { type: 'heading', text: 'Future and Present Value Calculations' },
            
            { type: 'callout', text: 'Understanding when to use future vs. present value formulas is crucial for business decisions!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'The **future value** $S$ is the total amount after interest is added to the principal:' },
            { type: 'math', text: 'S = P(1 + rt)' },
            { type: 'paragraph', text: 'The **present value** $P$ is the initial amount needed to reach a future value:' },
            { type: 'math', text: 'P = \\frac{S}{1 + rt}' },
            
            { type: 'summary-box', text: 'Choosing the Right Formula' },
            { type: 'list', items: [
                'If the **due date falls before** the focal date, use **future value**: $S = P(1 + rt)$',
                'If the **due date falls after** the focal date, use **present value**: $P = \\frac{S}{1 + rt}$'
            ]},
            
            { type: 'connection', text: 'Think of focal date as "today" - payments before today grow with interest, payments after today are discounted' },
            
            { type: 'subheading', text: 'Example 4: Equivalent Single Payment' },
            { type: 'step-by-step', text: 'A small business has scheduled payments of $872 due one year from now and $1,180 due two years from now. They want to replace these with a single payment today. What should this payment be at 9% annual interest?' },
            
            { type: 'paragraph', text: 'Since we\'re finding the equivalent payment **today** (focal date = now), both scheduled payments are **after** the focal date, so we use present value formula.' },
            
            { type: 'paragraph', text: 'For the $872 payment due in 1 year:' },
            { type: 'math', text: 'P_1 = \\frac{872}{1 + (0.09)(1)} = \\frac{872}{1.09} = \\$800.00' },
            
            { type: 'paragraph', text: 'For the $1,180 payment due in 2 years:' },
            { type: 'math', text: 'P_2 = \\frac{1180}{1 + (0.09)(2)} = \\frac{1180}{1.18} = \\$1000.00' },
            
            { type: 'paragraph', text: 'Total equivalent payment today:' },
            { type: 'math', text: 'P_{total} = P_1 + P_2 = \\$800.00 + \\$1000.00 = \\$1800.00' },
            
            { type: 'pattern-highlight', text: 'The business should pay $1,800 today to replace both future payments!' },
            
            { type: 'callout', text: 'This helps businesses manage cash flow by consolidating future obligations into present payments.', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E5',
        title: 'Example 5: Introduction to Compound Interest',
        relatedPracticeProblemIds: ['CI1', 'CI2', 'CI3'],
        segments: [
            { type: 'subheading', text: 'Example 5: Compound Interest vs. Simple Interest' },
            
            { type: 'callout', text: 'Compound interest is interest earning interest - it\'s the secret to wealth building!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'With **compound interest**, interest earned is reinvested at the same rate, so the interest earns interest during the next payment period.' },
            
            { type: 'summary-box', text: 'Compound Interest Formula' },
            { type: 'math', text: 'A = P\\left(1 + \\frac{r}{m}\\right)^{mt}' },
            { type: 'paragraph', text: 'Where:' },
            { type: 'list', items: [
                '$A$ = Future value (amount after compound interest)',
                '$P$ = Present value (initial principal)',
                '$r$ = Annual interest rate (as decimal)',
                '$m$ = Number of compounding periods per year',
                '$t$ = Time in years'
            ]},
            
            { type: 'connection', text: 'The periodic interest rate is $i = \\frac{r}{m}$ and total compounding periods is $n = mt$' },
            
            { type: 'paragraph', text: 'This can be rewritten as: $FV = PV(1 + i)^n$' },
            
            { type: 'subheading', text: 'Visual Comparison: Simple vs. Compound Interest' },
            { type: 'step-by-step', text: 'Compare $10,000 invested for 5 years at 10% annual rate:' },
            
            { type: 'paragraph', text: '**Simple Interest:**' },
            { type: 'math', text: 'Interest = \\$10,000 - \\$10,000 = \\$5,000' },
            { type: 'paragraph', text: 'Amount after 5 years = $15,000' },
            
            { type: 'paragraph', text: '**Compound Interest (annually):**' },
            { type: 'math', text: 'A = 10,000(1 + 0.10)^5 = 10,000(1.61051) = \\$16,105.10' },
            { type: 'paragraph', text: 'Interest = $16,105.10 - $10,000 = $6,105.10' },
            
            { type: 'pattern-highlight', text: 'Compound interest earned $1,105.10 MORE than simple interest!' },
            { type: 'paragraph', text: 'This difference represents the **interest earned by interest** added to the principal at the end of each compounding period.' },
            
            { type: 'callout', text: 'For long-term business investments, compound interest can significantly boost returns!', emphasis: 'success' },
            
            { type: 'summary-box', text: 'Key Insight: The compound interest exceeds simple interest by the amount of interest earned by interest.' },
        ]
    },
    {
        id: 'W11-E6',
        title: 'Example 6: Present Value with Compound Interest',
        relatedPracticeProblemIds: ['CI4', 'CI5', 'CI6'],
        segments: [
            { type: 'subheading', text: 'Example 6: Present Value with Compound Interest' },
            
            { type: 'callout', text: 'Present value helps determine how much to invest today to reach a future goal!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'The **present value** formula for compound interest is:' },
            { type: 'math', text: 'PV = \\frac{FV}{(1 + i)^n}' },
            { type: 'paragraph', text: 'Where $i = \\frac{r}{m}$ is the periodic interest rate and $n = mt$ is the total number of compounding periods.' },
            
            { type: 'step-by-step', text: 'A restaurant owner wants to have $6,836.56 available in 9 years to renovate their kitchen. If they can invest at 6% compounded quarterly, how much should they invest today?' },
            
            { type: 'paragraph', text: 'Given: $FV = \\$6,836.56$, $r = 6\\% = 0.06$, $m = 4$ (quarterly), $t = 9$ years' },
            
            { type: 'paragraph', text: 'Calculate the periodic rate and number of periods:' },
            { type: 'math', text: 'i = \\frac{0.06}{4} = 0.015' },
            { type: 'math', text: 'n = 4 \\times 9 = 36' },
            
            { type: 'paragraph', text: 'Using the present value formula:' },
            { type: 'math', text: 'PV = \\frac{6836.56}{(1 + 0.015)^{36}} = \\frac{6836.56}{(1.015)^{36}}' },
            
            { type: 'paragraph', text: 'Calculate $(1.015)^{36}$:' },
            { type: 'math', text: '(1.015)^{36} = 1.709140' },
            
            { type: 'paragraph', text: 'Therefore:' },
            { type: 'math', text: 'PV = \\frac{6836.56}{1.709140} = \\$4,000.00' },
            
            { type: 'connection', text: 'The restaurant owner should invest $4,000 today to have $6,836.56 in 9 years.' },
            
            { type: 'pattern-highlight', text: 'Notice how compound interest allows a smaller initial investment to grow to the desired amount!' },
            
            { type: 'summary-box', text: 'Present value calculations help businesses plan for future expenses and investment goals.' },
            
            { type: 'callout', text: 'Business tip: Higher compounding frequency (quarterly vs. annually) means you need less initial investment!', emphasis: 'success' },
        ]
    }
];