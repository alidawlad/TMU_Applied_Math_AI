import type { Example } from '@/lib/types';

export const week11MixedProblemsExamples: Example[] = [
    {
        id: 'W11-E21',
        title: 'Example 21: Business Decision Making',
        relatedPracticeProblemIds: ['MP1', 'MP2', 'MP3'],
        segments: [
            { type: 'subheading', text: 'Example 21: Business Decision Making' },
            
            { type: 'callout', text: 'Which option provides better value? Use present value analysis to make informed business decisions!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: 'A man can buy a piece of land for $400,000 cash now, or by payments of $230,000 down and $200,000 in 5 years. If he can earn 4% interest compounded semi-annually, which plan is better?' },
            
            { type: 'paragraph', text: 'To compare the two plans fairly, we need to calculate their present values and choose the smaller amount.' },
            
            { type: 'paragraph', text: 'Given: $r = 4\\% = 0.04$, $m = 2$ (semi-annually), so $i = \\frac{0.04}{2} = 0.02$, and $n = 2 \\times 5 = 10$ periods' },
            
            { type: 'summary-box', text: 'Plan 1: Full Cash Payment Now' },
            { type: 'paragraph', text: 'Present value of Plan 1: $P_1 = \\$400,000$' },
            
            { type: 'summary-box', text: 'Plan 2: Down Payment Plus Future Payment' },
            { type: 'paragraph', text: 'The down payment of $230,000 is already at present value.' },
            { type: 'paragraph', text: 'For the $200,000 payment in 5 years, we need to discount it to present value:' },
            { type: 'math', text: 'PV = \\frac{200,000}{(1 + 0.02)^{10}} = \\frac{200,000}{(1.02)^{10}}' },
            
            { type: 'paragraph', text: 'Calculate $(1.02)^{10}$:' },
            { type: 'math', text: '(1.02)^{10} = 1.218994' },
            
            { type: 'paragraph', text: 'Therefore:' },
            { type: 'math', text: 'PV = \\frac{200,000}{1.218994} = \\$164,069.66' },
            
            { type: 'paragraph', text: 'Total present value of Plan 2:' },
            { type: 'math', text: 'P_2 = 230,000 + 164,069.66 = \\$394,069.66' },
            
            { type: 'connection', text: 'Comparison of Plans:' },
            { type: 'list', items: [
                'Plan 1: $400,000 present value',
                'Plan 2: $394,069.66 present value'
            ]},
            
            { type: 'pattern-highlight', text: 'Plan 2 is better by saving $400,000 - $394,069.66 = $5,930.34' },
            
            { type: 'summary-box', text: 'Business Decision: Choose Plan 2 - the payment plan with $230,000 down and $200,000 in 5 years provides better value.' },
            
            { type: 'callout', text: 'Key insight: When comparing payment options, always convert to present value using your opportunity cost of capital!', emphasis: 'success' }
        ]
    },
    {
        id: 'W11-E22',
        title: 'Example 22: Computing Interest Rate for Equivalent Payments',
        relatedPracticeProblemIds: ['MP4', 'MP5', 'MP6'],
        segments: [
            { type: 'subheading', text: 'Example 22: Computing Interest Rate for Equivalent Payments' },
            
            { type: 'callout', text: 'Find the interest rate that makes a series of payments equivalent to a final balance!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: 'Caitlin opens a saving account with a deposit of $5000. She deposits $3000 a year later and $2000 a year after that. The account grows by interest rate $r$ compounded yearly. Just after Caitlin\'s $2000 deposit, her balance is $11,000. Find the annual rate of interest $r$.' },
            
            { type: 'paragraph', text: 'We need to arrange the payments on a time diagram and find the focal date. Since the most logical focal date is 2 years from now (when the final balance is known), we use the future value formula.' },
            
            { type: 'paragraph', text: 'Given: $m = 1$ (annual compounding), $t = 2$ years' },
            
            { type: 'summary-box', text: 'Setting up the timeline:' },
            { type: 'list', items: [
                'Year 0: $5000 deposit',
                'Year 1: $3000 deposit', 
                'Year 2: $2000 deposit + final balance = $11,000'
            ]},
            
            { type: 'summary-box', text: 'Step 1: Express future values at the focal date (2 years)' },
            
            { type: 'paragraph', text: 'We are given $PV = \\$5000.00$, $m = 1$, and $t = 2$. Hence $n = (1)(2) = 2$. Using formula (6) we have:' },
            { type: 'math', text: 'FV = 5000(1 + r)^2' },
            
            { type: 'paragraph', text: 'So, the equivalent value of the $5000 at the focal date is $5000(1 + r)^2$.' },
            
            { type: 'paragraph', text: 'For the $3000 deposit made 1 year before the focal date:' },
            { type: 'math', text: 'FV = 3000(1 + r)^1 = 3000(1 + r)' },
            
            { type: 'paragraph', text: 'The $2000 deposit is made exactly at the focal date, so its value is $2000.' },
            
            { type: 'summary-box', text: 'Step 2: Set up the equation of equivalent values' },
            { type: 'paragraph', text: 'Total future value of all deposits = Final account balance' },
            { type: 'math', text: '5000(1 + r)^2 + 3000(1 + r) + 2000 = 11000' },
            
            { type: 'paragraph', text: 'Rearranging:' },
            { type: 'math', text: '5000(1 + r)^2 + 3000(1 + r) = 9000' },
            
            { type: 'paragraph', text: 'Let $x = 1 + r$:' },
            { type: 'math', text: '5000x^2 + 3000x = 9000' },
            { type: 'math', text: '5x^2 + 3x - 9 = 0' },
            
            { type: 'summary-box', text: 'Step 3: Solve the quadratic equation' },
            { type: 'paragraph', text: 'Using the quadratic formula: $x = \\frac{-3 \\pm \\sqrt{9 + 180}}{10} = \\frac{-3 \\pm \\sqrt{189}}{10}$' },
            
            { type: 'paragraph', text: 'Since $x = 1 + r$ must be positive, we take the positive root:' },
            { type: 'math', text: 'x = \\frac{-3 + \\sqrt{189}}{10} = \\frac{-3 + 13.75}{10} = 1.075' },
            
            { type: 'paragraph', text: 'Therefore: $r = x - 1 = 0.075 = 7.5\\%$' },
            
            { type: 'connection', text: 'Verification: $5000(1.075)^2 + 3000(1.075) + 2000 = 5000(1.1556) + 3225 + 2000 = 5778 + 3225 + 2000 = 11,003 \\approx 11,000$ ✓' },
            
            { type: 'pattern-highlight', text: 'The annual interest rate is 7.5%' },
            
            { type: 'callout', text: 'This technique helps determine the effective return rate on investment accounts with multiple deposits!', emphasis: 'success' }
        ]
    },
    {
        id: 'W11-E23',
        title: 'Example 23: Investment Doubling and Tripling Time',
        relatedPracticeProblemIds: ['MP7', 'MP8', 'MP9'],
        segments: [
            { type: 'subheading', text: 'Example 9: How Long to Double or Triple an Investment' },
            
            { type: 'callout', text: 'A key question for any investor: "How long until my money doubles?"', emphasis: 'primary' },
            
            { type: 'step-by-step', text: '**Part a)** If an amount is invested at 5% compounded annually, how many years will it take to triple?' },
            
            { type: 'paragraph', text: 'Let the principal amount be $P$. We want to find when $A = 3P$.' },
            { type: 'paragraph', text: 'Given: $r = 5\\% = 0.05$, $m = 1$ (annually)' },
            
            { type: 'paragraph', text: 'Using the compound interest formula:' },
            { type: 'math', text: '3P = P(1 + 0.05)^n' },
            { type: 'math', text: '3 = (1.05)^n' },
            
            { type: 'paragraph', text: 'Taking the natural logarithm of both sides:' },
            { type: 'math', text: '\\ln(3) = n \\ln(1.05)' },
            { type: 'math', text: 'n = \\frac{\\ln(3)}{\\ln(1.05)} = \\frac{1.0986}{0.0487} = 22.52' },
            
            { type: 'connection', text: 'It will take approximately 22.5 years for the investment to triple.' },
            
            { type: 'step-by-step', text: '**Part b)** Using logarithm properties, express the tripling time in different bases:' },
            
            { type: 'paragraph', text: 'We found that $n = \\frac{\\ln 3}{\\ln 1.05}$. Using the change of base formula:' },
            
            { type: 'list', items: [
                '$\\log_3 \\frac{100}{105}$ - This doesn\'t match our expression',
                '$\\log_{100} 3$ - This doesn\'t match our expression', 
                '$\\ln 3$ - This is just the numerator',
                '$\\log_{105} 3$ - This matches! Since $\\log_{105} 3 = \\frac{\\ln 3}{\\ln 105}$',
                '$\\log_3 \\frac{105}{100}$ - This equals $\\log_3 1.05 = \\frac{\\ln 1.05}{\\ln 3}$'
            ]},
            
            { type: 'paragraph', text: 'The correct answer is option d) $\\log_{105} 3$' },
            
            { type: 'pattern-highlight', text: 'Understanding logarithms helps solve exponential growth problems in finance!' },
            
            { type: 'summary-box', text: 'Rule of 72: A quick approximation for doubling time is $\\frac{72}{\\text{interest rate}}$ years.' },
            
            { type: 'callout', text: 'For 5% interest, the Rule of 72 gives $\\frac{72}{5} = 14.4$ years to double (actual: 14.2 years)', emphasis: 'success' },
            
            { type: 'connection', text: 'These calculations help investors set realistic expectations for their long-term financial goals.' },
        ]
    }
];