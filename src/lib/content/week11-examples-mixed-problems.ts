import type { Example } from '@/lib/types';

export const week11MixedProblemsExamples: Example[] = [
    {
        id: 'W11-E7',
        title: 'Example 7: Equivalent Payment Problems',
        relatedPracticeProblemIds: ['MP1', 'MP2', 'MP3'],
        segments: [
            { type: 'heading', text: 'Advanced Equivalent Payment Problems' },
            
            { type: 'callout', text: 'Real businesses often need to restructure multiple payments - let\'s see how!', emphasis: 'primary' },
            
            { type: 'subheading', text: 'Example 7: Multiple Payment Restructuring' },
            { type: 'step-by-step', text: 'A construction company has scheduled debt payments of $750 due 7 months ago, $600 due 2 months ago, and $900 due in 5 months. They want to replace these with two equal payments: one due now and one due 3 months from now. Find the payment amount if interest is 9% compounded monthly.' },
            
            { type: 'paragraph', text: 'Let\'s use **now** as our focal date and call the equal replacement payments $x$.' },
            
            { type: 'paragraph', text: 'Given: $r = 9\\% = 0.09$, $m = 12$ (monthly), so $i = \\frac{0.09}{12} = 0.0075$' },
            
            { type: 'summary-box', text: 'Step 1: Calculate equivalent values of original payments at focal date (now)' },
            
            { type: 'paragraph', text: 'For the $750 payment due 7 months ago (use future value):' },
            { type: 'math', text: 'E_1 = 750(1 + 0.0075)^7 = 750(1.0540) = \\$790.50' },
            
            { type: 'paragraph', text: 'For the $600 payment due 2 months ago (use future value):' },
            { type: 'math', text: 'E_2 = 600(1 + 0.0075)^2 = 600(1.0150) = \\$609.00' },
            
            { type: 'paragraph', text: 'For the $900 payment due in 5 months (use present value):' },
            { type: 'math', text: 'E_3 = \\frac{900}{(1 + 0.0075)^5} = \\frac{900}{1.0378} = \\$867.27' },
            
            { type: 'summary-box', text: 'Step 2: Calculate equivalent values of replacement payments' },
            
            { type: 'paragraph', text: 'First payment: $x$ due now = $x$' },
            { type: 'paragraph', text: 'Second payment: $x$ due in 3 months = $\\frac{x}{(1.0075)^3} = \\frac{x}{1.0226} = 0.9779x$' },
            
            { type: 'summary-box', text: 'Step 3: Set up equation (total original = total replacement)' },
            { type: 'math', text: '790.50 + 609.00 + 867.27 = x + 0.9779x' },
            { type: 'math', text: '2266.77 = 1.9779x' },
            { type: 'math', text: 'x = \\frac{2266.77}{1.9779} = \\$1146.00' },
            
            { type: 'pattern-highlight', text: 'Each equal payment should be $1,146.00' },
            
            { type: 'connection', text: 'This allows the company to restructure their debt payments in a way that\'s financially equivalent!' },
        ]
    },
    {
        id: 'W11-E8',
        title: 'Example 8: Finding Unknown Interest Rates',
        relatedPracticeProblemIds: ['MP4', 'MP5', 'MP6'],
        segments: [
            { type: 'subheading', text: 'Example 8: Solving for Unknown Interest Rates' },
            
            { type: 'callout', text: 'Sometimes we need to find what rate of return we\'re actually getting!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: 'A tech startup invests $5,000 today, $3,000 in one year, and $2,000 in two years. These investments will be settled by a single payment of $11,000 in three years. What annual interest rate (compounded annually) makes this arrangement fair?' },
            
            { type: 'paragraph', text: 'Let\'s use **three years from now** as our focal date and call the unknown rate $r$.' },
            
            { type: 'summary-box', text: 'Step 1: Express all payments at the focal date' },
            
            { type: 'paragraph', text: 'Investment of $5,000 today (grows for 3 years):' },
            { type: 'math', text: 'FV_1 = 5000(1 + r)^3' },
            
            { type: 'paragraph', text: 'Investment of $3,000 in 1 year (grows for 2 years):' },
            { type: 'math', text: 'FV_2 = 3000(1 + r)^2' },
            
            { type: 'paragraph', text: 'Investment of $2,000 in 2 years (grows for 1 year):' },
            { type: 'math', text: 'FV_3 = 2000(1 + r)^1' },
            
            { type: 'paragraph', text: 'The settlement payment is $11,000 at the focal date.' },
            
            { type: 'summary-box', text: 'Step 2: Set up equation' },
            { type: 'math', text: '5000(1 + r)^3 + 3000(1 + r)^2 + 2000(1 + r) = 11000' },
            
            { type: 'paragraph', text: 'Let $x = 1 + r$, then:' },
            { type: 'math', text: '5000x^3 + 3000x^2 + 2000x = 11000' },
            { type: 'math', text: '5x^3 + 3x^2 + 2x - 11 = 0' },
            
            { type: 'summary-box', text: 'Step 3: Solve the cubic equation' },
            { type: 'paragraph', text: 'Using the quadratic formula or numerical methods, we find:' },
            { type: 'math', text: 'x = 1.074727' },
            
            { type: 'paragraph', text: 'Therefore: $r = x - 1 = 0.074727 \\approx 7.47\\%$' },
            
            { type: 'connection', text: 'The startup is effectively earning about 7.47% annually on their investments!' },
            
            { type: 'pattern-highlight', text: 'This type of analysis helps evaluate whether investment opportunities are worthwhile.' },
        ]
    },
    {
        id: 'W11-E9',
        title: 'Example 9: Investment Doubling and Tripling Time',
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