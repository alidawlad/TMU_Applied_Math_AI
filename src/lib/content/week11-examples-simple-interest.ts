import type { Example } from '@/lib/types';

export const week11SimpleInterestExamples: Example[] = [
    {
        id: 'W11-E1',
        title: 'Example 1: Understanding Interest Basics',
        relatedPracticeProblemIds: ['SI1', 'SI2', 'SI3'],
        segments: [
            { type: 'heading', text: 'Simple Interest Fundamentals' },
            
            { type: 'callout', text: 'Interest is the fee for borrowing money - it\'s everywhere in business!', emphasis: 'primary' },
            
            { type: 'paragraph', text: '**Interest** is the fee charged for the use of money. Some of the reasons for charging interest are:' },
            
            { type: 'list', items: [
                'The **time value of money** - One dollar today is worth more than one dollar at a later day',
                '**Inflationary expectations** - Money loses purchasing power over time',
                '**Alternative investments** - A lender gives up the option of using the money elsewhere',
                '**Risks of investment** - Since investors sometimes lose money'
            ]},
            
            { type: 'summary-box', text: 'The Simple Interest Formula' },
            { type: 'math', text: 'I = P \\times r \\times t' },
            { type: 'paragraph', text: 'Where:' },
            { type: 'list', items: [
                '$I$ = Interest earned (in dollars)',
                '$P$ = Principal amount (initial investment/loan)',
                '$r$ = Annual interest rate (as a decimal)',
                '$t$ = Time period (in years)'
            ]},
            
            { type: 'connection', text: 'Think of it as: Interest = Principal × Rate × Time' },
            
            { type: 'subheading', text: 'Example 1: Converting Rates and Time' },
            
            { type: 'step-by-step', text: '**Part a)** Convert 6.5% annual rate for 6 months to decimal form' },
            { type: 'paragraph', text: 'For the annual rate: $r = 6.5\\% = 0.065$' },
            { type: 'paragraph', text: 'For the time: $t = \\frac{6}{12} = 0.5$ years' },
            { type: 'pattern-highlight', text: 'Always convert percentages to decimals and match time units!' },
            
            { type: 'step-by-step', text: '**Part b)** Convert 5¼% annual rate for 245 days to decimal form' },
            { type: 'paragraph', text: 'For the annual rate: $r = 5\\frac{1}{4}\\% = 5.25\\% = 0.0525$' },
            { type: 'paragraph', text: 'For the time: $t = \\frac{245}{365} = 0.67$ years (approximately)' },
            
            { type: 'callout', text: 'Business tip: Most financial calculations use 365 days per year for accuracy!', emphasis: 'success' },
            
            { type: 'subheading', text: 'Real Business Application' },
            { type: 'paragraph', text: 'Sarah owns a small coffee shop and needs to understand interest calculations for her business loan and savings decisions.' },
            { type: 'connection', text: 'Understanding these basics helps make informed financial decisions for any business!' },
        ]
    },
    {
        id: 'W11-E2',
        title: 'Example 2: Computing Simple Interest',
        relatedPracticeProblemIds: ['SI4', 'SI5', 'SI6'],
        segments: [
            { type: 'subheading', text: 'Example 2: Computing Simple Interest' },
            
            { type: 'callout', text: 'Let\'s calculate real interest amounts for business scenarios!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: '**Part a)** A restaurant owner borrows $5,240 at 4.5% annual interest for 9 months. How much interest will they pay?' },
            { type: 'paragraph', text: 'Given: $P = \\$5240$, $r = 4.5\\% = 0.045$, $t = \\frac{9}{12} = 0.75$ years' },
            { type: 'paragraph', text: 'Using $I = P \\times r \\times t$:' },
            { type: 'math', text: 'I = 5240 \\times 0.045 \\times 0.75 = \\$176.85' },
            { type: 'connection', text: 'The restaurant will pay $176.85 in interest over 9 months' },
            
            { type: 'step-by-step', text: '**Part b)** A tech startup has $1,923.60 in a business savings account at 3% annual interest for 215 days. How much interest will they earn?' },
            { type: 'paragraph', text: 'Given: $P = \\$1923.60$, $r = 3\\% = 0.03$, $t = \\frac{215}{365}$ years' },
            { type: 'paragraph', text: 'Using $I = P \\times r \\times t$:' },
            { type: 'math', text: 'I = 1923.60 \\times 0.03 \\times \\frac{215}{365} = \\$33.99' },
            { type: 'connection', text: 'The startup will earn $33.99 in interest over 215 days' },
            
            { type: 'step-by-step', text: '**Part c)** A retail store deposits $785.95 at 8% annual interest from January 30, 2022, to March 21, 2022. How much interest will they earn?' },
            { type: 'paragraph', text: 'First, let\'s calculate the time period using the "count the first day but not the last day" method:' },
            { type: 'list', items: [
                'Days in January: 2 (from Jan 30)',
                'Days in February: 28 (full month)',
                'Days in March: 20 (up to Mar 21)'
            ]},
            { type: 'paragraph', text: 'Total days: $2 + 28 + 20 = 50$ days' },
            { type: 'paragraph', text: 'Given: $P = \\$785.95$, $r = 8\\% = 0.08$, $t = \\frac{50}{365}$ years' },
            { type: 'math', text: 'I = 785.95 \\times 0.08 \\times \\frac{50}{365} = \\$8.61' },
            { type: 'connection', text: 'The store will earn $8.61 in interest over 50 days' },
            
            { type: 'pattern-highlight', text: 'Notice how simple interest is always calculated on the original principal amount!' },
            { type: 'summary-box', text: 'Simple interest is used for short-term business loans, trade credit, and some savings accounts.' },
        ]
    },
    {
        id: 'W11-E3',
        title: 'Example 3: Solving for Principal, Rate, or Time',
        relatedPracticeProblemIds: ['SI7', 'SI8', 'SI9'],
        segments: [
            { type: 'subheading', text: 'Example 3: Solving for Principal, Rate, or Time' },
            
            { type: 'callout', text: 'Sometimes we need to work backwards from the interest to find missing information!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'The simple interest formula $I = P \\times r \\times t$ can be rearranged to solve for any variable:' },
            
            { type: 'summary-box', text: 'Rearranged Simple Interest Formulas' },
            { type: 'list', items: [
                'To find Principal: $P = \\frac{I}{r \\times t}$',
                'To find Rate: $r = \\frac{I}{P \\times t}$',
                'To find Time: $t = \\frac{I}{P \\times r}$'
            ]},
            
            { type: 'step-by-step', text: '**Part a)** A bakery owner needs to earn $42.46 in interest over 245 days at 5.75% annual rate. How much should they invest?' },
            { type: 'paragraph', text: 'Given: $I = \\$42.46$, $r = 5.75\\% = 0.0575$, $t = \\frac{245}{365}$ years' },
            { type: 'paragraph', text: 'Using $P = \\frac{I}{r \\times t}$:' },
            { type: 'math', text: 'P = \\frac{42.46}{0.0575 \\times \\frac{245}{365}} = \\$1100.12' },
            { type: 'connection', text: 'The bakery should invest $1,100.12 to earn $42.46 in interest' },
            
            { type: 'step-by-step', text: '**Part b)** A consulting firm has $744 invested for 10 months and earns $54.25 in interest. What annual rate did they receive?' },
            { type: 'paragraph', text: 'Given: $I = \\$54.25$, $P = \\$744$, $t = \\frac{10}{12}$ years' },
            { type: 'paragraph', text: 'Using $r = \\frac{I}{P \\times t}$:' },
            { type: 'math', text: 'r = \\frac{54.25}{744 \\times \\frac{10}{12}} = \\frac{54.25}{620} = 0.0875 = 8.75\\%' },
            { type: 'connection', text: 'The consulting firm earned an annual rate of 8.75%' },
            
            { type: 'step-by-step', text: '**Part c)** A food truck business has a $1,500 loan at 5.5% annual interest and pays $36.16 in interest. How long was the loan outstanding?' },
            { type: 'paragraph', text: 'Given: $I = \\$36.16$, $P = \\$1500$, $r = 5.5\\% = 0.055$' },
            { type: 'paragraph', text: 'Using $t = \\frac{I}{P \\times r}$:' },
            { type: 'math', text: 't = \\frac{36.16}{1500 \\times 0.055} = \\frac{36.16}{82.50} = 0.438 \\text{ years}' },
            { type: 'paragraph', text: 'Converting to days: $0.438 \\times 365 = 160$ days' },
            { type: 'connection', text: 'The food truck loan was outstanding for approximately 160 days' },
            
            { type: 'pattern-highlight', text: 'These formulas help business owners make informed decisions about loans and investments!' },
            { type: 'summary-box', text: 'Being able to solve for any variable helps you compare different financial options and make the best choice for your business.' },
        ]
    }
];