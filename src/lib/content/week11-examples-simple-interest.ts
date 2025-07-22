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
    },
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
        title: 'Example 5: Simple Interest Applications with Different Time Periods',
        relatedPracticeProblemIds: ['SI13', 'SI14', 'SI15'],
        segments: [
            { type: 'subheading', text: 'Example 5: Business Loans with Various Time Periods' },
            
            { type: 'callout', text: 'Different businesses have different cash flow cycles - let\'s see how this affects interest calculations!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: '**Part a)** A manufacturing company borrows $45,000 at 6.8% annual interest for 18 months to purchase equipment. Calculate the interest and total repayment.' },
            { type: 'paragraph', text: 'Given: $P = \\$45,000$, $r = 6.8\\% = 0.068$, $t = \\frac{18}{12} = 1.5$ years' },
            { type: 'paragraph', text: 'Using $I = P \\times r \\times t$:' },
            { type: 'math', text: 'I = 45,000 \\times 0.068 \\times 1.5 = \\$4,590' },
            { type: 'paragraph', text: 'Total repayment: $S = P + I = 45,000 + 4,590 = \\$49,590$' },
            { type: 'connection', text: 'The manufacturing company will pay $4,590 in interest over 18 months' },
            
            { type: 'step-by-step', text: '**Part b)** A retail store has a loan from March 15, 2023, to October 8, 2023, at 7.25% annual interest on $28,500. Find the interest using exact days.' },
            { type: 'paragraph', text: 'First, calculate the exact number of days:' },
            { type: 'list', items: [
                'Days in March: 17 (from Mar 15)',
                'Days in April: 30',
                'Days in May: 31',
                'Days in June: 30',
                'Days in July: 31',
                'Days in August: 31',
                'Days in September: 30',
                'Days in October: 7 (up to Oct 8)'
            ]},
            { type: 'paragraph', text: 'Total days: $17 + 30 + 31 + 30 + 31 + 31 + 30 + 7 = 207$ days' },
            { type: 'paragraph', text: 'Time in years: $t = \\frac{207}{365} = 0.5671$ years' },
            { type: 'paragraph', text: 'Interest: $I = 28,500 \\times 0.0725 \\times 0.5671 = \\$1,172.26$' },
            
            { type: 'step-by-step', text: '**Part c)** A food service company needs $12,000 for quarterly inventory purchases at 5.5% annual interest. Compare quarterly vs. annual borrowing costs.' },
            { type: 'paragraph', text: 'For quarterly borrowing (3 months = 0.25 years):' },
            { type: 'math', text: 'I_{quarterly} = 12,000 \\times 0.055 \\times 0.25 = \\$165 \\text{ per quarter}' },
            { type: 'paragraph', text: 'Annual cost: $165 \\times 4 = \\$660$' },
            
            { type: 'paragraph', text: 'For annual borrowing (1 year):' },
            { type: 'math', text: 'I_{annual} = 12,000 \\times 0.055 \\times 1 = \\$660' },
            
            { type: 'pattern-highlight', text: 'With simple interest, multiple short-term loans cost the same as one long-term loan!' },
            { type: 'callout', text: 'This principle helps businesses choose between different financing structures.', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E6',
        title: 'Example 6: Complex Solving for Missing Variables',
        relatedPracticeProblemIds: ['SI16', 'SI17', 'SI18'],
        segments: [
            { type: 'subheading', text: 'Example 6: Advanced Problem-Solving Techniques' },
            
            { type: 'callout', text: 'Sometimes business problems require working backwards from multiple pieces of information!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: '**Part a)** A restaurant chain borrowed money at 8.5% annual interest. After paying $2,856 in interest for 8 months, they still owe $38,000. What was the original loan amount?' },
            { type: 'paragraph', text: 'Given: $I = \\$2,856$, $r = 8.5\\% = 0.085$, $t = \\frac{8}{12} = 0.6667$ years' },
            { type: 'paragraph', text: 'We know the remaining balance is $38,000, so:' },
            { type: 'paragraph', text: 'Original principal: $P = \\frac{I}{r \\times t} = \\frac{2,856}{0.085 \\times 0.6667} = \\frac{2,856}{0.0567} = \\$50,400$' },
            { type: 'connection', text: 'We can verify: Interest on $50,400 for 8 months = $50,400 × 0.085 × 0.6667 = $2,856 ✓' },
            
            { type: 'step-by-step', text: '**Part b)** A tech startup has two investment options: invest $25,000 now and earn $3,750 interest in 15 months, or invest the same amount at 7% for 2 years. Which option provides a better annual rate?' },
            { type: 'paragraph', text: 'Option 1 rate calculation:' },
            { type: 'paragraph', text: '$r_1 = \\frac{I}{P \\times t} = \\frac{3,750}{25,000 \\times \\frac{15}{12}} = \\frac{3,750}{31,250} = 0.12 = 12\\%$' },
            
            { type: 'paragraph', text: 'Option 2 interest calculation:' },
            { type: 'math', text: 'I_2 = 25,000 \\times 0.07 \\times 2 = \\$3,500' },
            { type: 'paragraph', text: 'Option 2 annual rate: $7\\%$' },
            
            { type: 'pattern-highlight', text: 'Option 1 at 12% annual rate is better than Option 2 at 7% annual rate' },
            
            { type: 'step-by-step', text: '**Part c)** A consulting firm made three loans: $15,000 at 6% for 10 months, $20,000 at 7.5% for unknown time, and $10,000 at 5.5% for 6 months. If total interest earned was $3,420, find the unknown time period.' },
            { type: 'paragraph', text: 'Calculate known interest amounts:' },
            { type: 'paragraph', text: 'Loan 1: $I_1 = 15,000 \\times 0.06 \\times \\frac{10}{12} = \\$750$' },
            { type: 'paragraph', text: 'Loan 3: $I_3 = 10,000 \\times 0.055 \\times \\frac{6}{12} = \\$275$' },
            
            { type: 'paragraph', text: 'Interest from Loan 2: $I_2 = 3,420 - 750 - 275 = \\$2,395$' },
            { type: 'paragraph', text: 'Time for Loan 2: $t_2 = \\frac{I_2}{P_2 \\times r_2} = \\frac{2,395}{20,000 \\times 0.075} = \\frac{2,395}{1,500} = 1.597$ years' },
            { type: 'paragraph', text: 'Converting to months: $1.597 \\times 12 = 19.16 \\approx 19$ months' },
            
            { type: 'connection', text: 'Complex multi-loan scenarios require systematic organization and careful calculation verification!' },
        ]
    },
    {
        id: 'W11-E7',
        title: 'Example 7: Business Loan Calculations',
        relatedPracticeProblemIds: ['SI19', 'SI20', 'SI21'],
        segments: [
            { type: 'subheading', text: 'Example 7: Comprehensive Loan Analysis' },
            
            { type: 'callout', text: 'Smart businesses compare multiple financing options to minimize costs!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: 'A manufacturing company needs $75,000 for equipment and has three loan options:' },
            { type: 'list', items: [
                '**Option A**: 6.5% simple interest for 2 years',
                '**Option B**: 6.8% simple interest for 18 months', 
                '**Option C**: 7.2% simple interest for 1 year'
            ]},
            
            { type: 'paragraph', text: '**Option A Analysis:**' },
            { type: 'math', text: 'I_A = 75,000 \\times 0.065 \\times 2 = \\$9,750' },
            { type: 'paragraph', text: 'Total payment: $S_A = 75,000 + 9,750 = \\$84,750$' },
            { type: 'paragraph', text: 'Monthly payment: $\\frac{84,750}{24} = \\$3,531.25$' },
            
            { type: 'paragraph', text: '**Option B Analysis:**' },
            { type: 'math', text: 'I_B = 75,000 \\times 0.068 \\times 1.5 = \\$7,650' },
            { type: 'paragraph', text: 'Total payment: $S_B = 75,000 + 7,650 = \\$82,650$' },
            { type: 'paragraph', text: 'Monthly payment: $\\frac{82,650}{18} = \\$4,591.67$' },
            
            { type: 'paragraph', text: '**Option C Analysis:**' },
            { type: 'math', text: 'I_C = 75,000 \\times 0.072 \\times 1 = \\$5,400' },
            { type: 'paragraph', text: 'Total payment: $S_C = 75,000 + 5,400 = \\$80,400$' },
            { type: 'paragraph', text: 'Monthly payment: $\\frac{80,400}{12} = \\$6,700$' },
            
            { type: 'summary-box', text: 'Loan Comparison Summary' },
            { type: 'list', items: [
                'Option A: $9,750 total interest, $3,531.25/month',
                'Option B: $7,650 total interest, $4,591.67/month',
                'Option C: $5,400 total interest, $6,700/month'
            ]},
            
            { type: 'pattern-highlight', text: 'Lower total interest doesn\'t always mean better cash flow - consider monthly payment amounts!' },
            
            { type: 'paragraph', text: '**Early Payoff Analysis:**' },
            { type: 'paragraph', text: 'If the company can pay off Option A after 15 months instead of 24:' },
            { type: 'math', text: 'I_{early} = 75,000 \\times 0.065 \\times 1.25 = \\$6,093.75' },
            { type: 'paragraph', text: 'Savings: $9,750 - 6,093.75 = \\$3,656.25$' },
            
            { type: 'connection', text: 'Early payoff can significantly reduce total interest costs, improving overall profitability!' },
            { type: 'callout', text: 'Choose the loan that best matches your business cash flow and growth strategy.', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E8',
        title: 'Example 8: Trade Credit and Commercial Applications',
        relatedPracticeProblemIds: ['SI22', 'SI23', 'SI24'],
        segments: [
            { type: 'subheading', text: 'Example 8: Understanding Trade Credit Terms' },
            
            { type: 'callout', text: 'Trade credit is often the largest source of short-term financing for businesses!', emphasis: 'primary' },
            
            { type: 'paragraph', text: '**Trade credit** allows businesses to buy goods and pay later, often with discounts for early payment.' },
            
            { type: 'step-by-step', text: '**Part a)** A retailer purchases $18,000 of inventory with terms "2/10 net 30" (2% discount if paid in 10 days, full amount due in 30 days). Analyze the cost of not taking the discount.' },
            
            { type: 'paragraph', text: 'If discount is taken (paid in 10 days):' },
            { type: 'paragraph', text: 'Payment = $18,000 × (1 - 0.02) = $18,000 × 0.98 = \\$17,640$' },
            { type: 'paragraph', text: 'Savings = \\$360' },
            
            { type: 'paragraph', text: 'If discount is not taken:' },
            { type: 'paragraph', text: 'Extra time to pay = 30 - 10 = 20 days' },
            { type: 'paragraph', text: 'Cost of not taking discount = $\\frac{360}{17,640} = 2.04\\%$ for 20 days' },
            
            { type: 'paragraph', text: 'Annual interest rate equivalent:' },
            { type: 'math', text: 'r = \\frac{2.04\\%}{20} \\times 365 = 37.23\\% \\text{ annually}' },
            
            { type: 'pattern-highlight', text: 'Not taking trade discounts can be equivalent to borrowing at very high interest rates!' },
            
            { type: 'step-by-step', text: '**Part b)** Compare trade credit "1/15 net 45" with a bank loan at 12% annual interest for a $25,000 purchase.' },
            
            { type: 'paragraph', text: 'Trade credit cost analysis:' },
            { type: 'paragraph', text: 'Discount savings: $25,000 × 0.01 = \\$250$' },
            { type: 'paragraph', text: 'Extra payment time: 45 - 15 = 30 days' },
            { type: 'paragraph', text: 'Annual rate: $\\frac{250}{24,750} \\times \\frac{365}{30} = 1.01\\% \\times 12.17 = 12.29\\%$ annually' },
            
            { type: 'paragraph', text: 'Bank loan cost for 30 days:' },
            { type: 'math', text: 'I = 25,000 \\times 0.12 \\times \\frac{30}{365} = \\$246.58' },
            
            { type: 'connection', text: 'The bank loan ($246.58) is slightly cheaper than giving up the trade discount ($250)' },
            
            { type: 'step-by-step', text: '**Part c)** A supplier offers 3% penalty on overdue amounts after the net period. If payment is 25 days late on a $15,000 purchase with "net 20" terms, calculate the penalty and effective annual rate.' },
            
            { type: 'paragraph', text: 'Penalty calculation:' },
            { type: 'paragraph', text: 'Penalty = $15,000 × 0.03 = \\$450$' },
            
            { type: 'paragraph', text: 'Effective annual rate:' },
            { type: 'math', text: 'r = \\frac{450}{15,000} \\times \\frac{365}{25} = 3\\% \\times 14.6 = 43.8\\% \\text{ annually}' },
            
            { type: 'callout', text: 'Late payment penalties can be extremely expensive - always factor these into cash flow planning!', emphasis: 'warning' },
            
            { type: 'summary-box', text: 'Trade Credit Key Insights' },
            { type: 'list', items: [
                'Early payment discounts are usually worth taking',
                'Compare trade credit costs with bank loan rates',
                'Late payment penalties can be extremely expensive',
                'Consider cash flow impact of different payment terms'
            ]},
        ]
    },
    {
        id: 'W11-E9',
        title: 'Example 9: Discount Calculations and Promissory Notes',
        relatedPracticeProblemIds: ['SI25', 'SI26', 'SI27'],
        segments: [
            { type: 'subheading', text: 'Example 9: Bank Discounting of Promissory Notes' },
            
            { type: 'callout', text: 'Banks can purchase promissory notes before maturity at a discount - let\'s see how this works!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'A **promissory note** is a written promise to pay a specific amount at a future date. Banks can buy these notes at a **discount** to provide immediate cash.' },
            
            { type: 'step-by-step', text: '**Part a)** A business has a promissory note for $12,000 due in 8 months. A bank offers to buy it at a 9% annual discount rate. Calculate the proceeds and effective interest rate.' },
            
            { type: 'paragraph', text: '**Step 1: Calculate the discount**' },
            { type: 'paragraph', text: 'Discount = Maturity Value × Discount Rate × Time' },
            { type: 'math', text: 'D = 12,000 \\times 0.09 \\times \\frac{8}{12} = 12,000 \\times 0.09 \\times 0.6667 = \\$720' },
            
            { type: 'paragraph', text: '**Step 2: Calculate proceeds**' },
            { type: 'paragraph', text: 'Proceeds = Maturity Value - Discount' },
            { type: 'math', text: 'P = 12,000 - 720 = \\$11,280' },
            
            { type: 'paragraph', text: '**Step 3: Calculate effective interest rate**' },
            { type: 'paragraph', text: 'The business receives $11,280 now and pays $12,000 in 8 months:' },
            { type: 'math', text: 'r = \\frac{720}{11,280} \\times \\frac{12}{8} = 0.0638 \\times 1.5 = 9.57\\% \\text{ annually}' },
            
            { type: 'pattern-highlight', text: 'The effective rate (9.57%) is higher than the discount rate (9%) because you earn interest on less money!' },
            
            { type: 'step-by-step', text: '**Part b)** Compare discounting a $20,000 note due in 6 months at 8% discount rate versus a traditional bank loan at 8.5% simple interest.' },
            
            { type: 'paragraph', text: '**Discounting Option:**' },
            { type: 'paragraph', text: 'Discount: $D = 20,000 \\times 0.08 \\times 0.5 = \\$800$' },
            { type: 'paragraph', text: 'Proceeds: $P = 20,000 - 800 = \\$19,200$' },
            { type: 'paragraph', text: 'Effective rate: $r = \\frac{800}{19,200} \\times 2 = 8.33\\%$ annually' },
            
            { type: 'paragraph', text: '**Bank Loan Option:**' },
            { type: 'paragraph', text: 'For $19,200 loan at 8.5% for 6 months:' },
            { type: 'math', text: 'I = 19,200 \\times 0.085 \\times 0.5 = \\$816' },
            { type: 'paragraph', text: 'Total repayment: $19,200 + 816 = \\$20,016$' },
            
            { type: 'connection', text: 'Discounting is cheaper ($800 cost vs. $816 interest) and provides the exact amount needed for the note' },
            
            { type: 'step-by-step', text: '**Part c)** A construction company has a $35,000 note due in 10 months but needs cash now. If they can get an 11% discount rate, what discount rate would make them indifferent between discounting and a bank loan at 12% simple interest?' },
            
            { type: 'paragraph', text: 'Let $d$ be the break-even discount rate.' },
            { type: 'paragraph', text: 'Discounting proceeds: $P = 35,000(1 - d \\times \\frac{10}{12})$' },
            { type: 'paragraph', text: 'Bank loan interest: $I = P \\times 0.12 \\times \\frac{10}{12}$' },
            
            { type: 'paragraph', text: 'At break-even: Discount = Bank loan interest' },
            { type: 'math', text: '35,000 \\times d \\times \\frac{10}{12} = P \\times 0.12 \\times \\frac{10}{12}' },
            
            { type: 'paragraph', text: 'Substituting and solving: $d = 10.91\\%$' },
            
            { type: 'connection', text: 'Any discount rate below 10.91% makes discounting more attractive than the bank loan' },
            
            { type: 'callout', text: 'Understanding these calculations helps businesses choose the most cost-effective financing option!', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E10',
        title: 'Example 10: Multiple Simple Interest Scenarios',
        relatedPracticeProblemIds: ['SI28', 'SI29', 'SI30'],
        segments: [
            { type: 'subheading', text: 'Example 10: Portfolio Management and Debt Consolidation' },
            
            { type: 'callout', text: 'Real businesses often juggle multiple loans and investments simultaneously!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: '**Part a)** An investment company has three simple interest investments: $50,000 at 5.5% for 2 years, $75,000 at 6.2% for 18 months, and $40,000 at 4.8% for 30 months. Calculate the total interest earned and average annual return rate.' },
            
            { type: 'paragraph', text: '**Investment 1:**' },
            { type: 'math', text: 'I_1 = 50,000 \\times 0.055 \\times 2 = \\$5,500' },
            
            { type: 'paragraph', text: '**Investment 2:**' },
            { type: 'math', text: 'I_2 = 75,000 \\times 0.062 \\times 1.5 = \\$6,975' },
            
            { type: 'paragraph', text: '**Investment 3:**' },
            { type: 'math', text: 'I_3 = 40,000 \\times 0.048 \\times 2.5 = \\$4,800' },
            
            { type: 'paragraph', text: '**Total interest:** $I_{total} = 5,500 + 6,975 + 4,800 = \\$17,275$' },
            
            { type: 'paragraph', text: '**Average return calculation:**' },
            { type: 'paragraph', text: 'Total principal: $50,000 + 75,000 + 40,000 = \\$165,000$' },
            { type: 'paragraph', text: 'Weighted average time: $\\frac{50,000 \\times 2 + 75,000 \\times 1.5 + 40,000 \\times 2.5}{165,000} = \\frac{312,500}{165,000} = 1.894$ years' },
            { type: 'math', text: 'r_{avg} = \\frac{17,275}{165,000 \\times 1.894} = \\frac{17,275}{312,510} = 5.53\\%' },
            
            { type: 'step-by-step', text: '**Part b)** A small business has three debts: $15,000 due in 4 months at 8%, $22,000 due in 7 months at 7.5%, and $18,000 due in 12 months at 8.5%. They want to consolidate into two equal payments: one now and one in 6 months, using 7.8% interest rate.' },
            
            { type: 'paragraph', text: 'Using 6 months as the focal date, calculate equivalent values:' },
            
            { type: 'paragraph', text: '**Debt 1** (grows from 4 to 6 months):' },
            { type: 'math', text: 'S_1 = 15,000 \\times (1 + 0.08 \\times \\frac{4}{12}) \\times (1 + 0.078 \\times \\frac{2}{12})' },
            { type: 'math', text: 'S_1 = 15,000 \\times 1.0267 \\times 1.013 = \\$15,602' },
            
            { type: 'paragraph', text: '**Debt 2** (grows from 7 to 6 months - actually discounted):' },
            { type: 'math', text: 'P_2 = \\frac{22,000 \\times (1 + 0.075 \\times \\frac{7}{12})}{1 + 0.078 \\times \\frac{1}{12}} = \\frac{22,963}{1.0065} = \\$22,815' },
            
            { type: 'paragraph', text: '**Debt 3** (discounted from 12 to 6 months):' },
            { type: 'math', text: 'P_3 = \\frac{18,000 \\times (1 + 0.085 \\times 1)}{1 + 0.078 \\times \\frac{6}{12}} = \\frac{19,530}{1.039} = \\$18,804' },
            
            { type: 'paragraph', text: '**Total equivalent debt at 6 months:** $15,602 + 22,815 + 18,804 = \\$57,221$' },
            
            { type: 'paragraph', text: 'If equal payments are $x$:' },
            { type: 'paragraph', text: 'Payment now (future value at 6 months): $x \\times (1 + 0.078 \\times 0.5) = 1.039x$' },
            { type: 'paragraph', text: 'Payment in 6 months: $x$' },
            { type: 'math', text: '1.039x + x = 57,221' },
            { type: 'math', text: '2.039x = 57,221' },
            { type: 'math', text: 'x = \\$28,061' },
            
            { type: 'pattern-highlight', text: 'Each equal payment should be $28,061' },
            
            { type: 'step-by-step', text: '**Part c)** Calculate the net interest position for a business with both assets and liabilities: Assets: $80,000 at 5.2% for 15 months, $60,000 at 4.8% for 20 months; Liabilities: $90,000 at 7.1% for 18 months, $45,000 at 6.5% for 10 months.' },
            
            { type: 'paragraph', text: '**Interest Income:**' },
            { type: 'paragraph', text: 'Asset 1: $80,000 \\times 0.052 \\times 1.25 = \\$5,200$' },
            { type: 'paragraph', text: 'Asset 2: $60,000 \\times 0.048 \\times 1.667 = \\$4,800$' },
            { type: 'paragraph', text: 'Total income: $5,200 + 4,800 = \\$10,000$' },
            
            { type: 'paragraph', text: '**Interest Expense:**' },
            { type: 'paragraph', text: 'Liability 1: $90,000 \\times 0.071 \\times 1.5 = \\$9,585$' },
            { type: 'paragraph', text: 'Liability 2: $45,000 \\times 0.065 \\times 0.833 = \\$2,437$' },
            { type: 'paragraph', text: 'Total expense: $9,585 + 2,437 = \\$12,022$' },
            
            { type: 'paragraph', text: '**Net Interest Position:** $10,000 - 12,022 = -\\$2,022$ (net cost)' },
            
            { type: 'connection', text: 'This business has a negative net interest margin - they pay more in interest than they earn' },
            { type: 'callout', text: 'Understanding your overall interest position helps optimize financing and investment decisions!', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E11',
        title: 'Example 11: Advanced Simple Interest Applications',
        relatedPracticeProblemIds: ['SI31', 'SI32', 'SI33'],
        segments: [
            { type: 'subheading', text: 'Example 11: Strategic Financial Decision Making' },
            
            { type: 'callout', text: 'Master-level problems combining multiple financial concepts for strategic business decisions!', emphasis: 'primary' },
            
            { type: 'step-by-step', text: '**Part a)** A manufacturing company is considering three financing strategies for a $500,000 equipment purchase:' },
            { type: 'list', items: [
                '**Strategy 1**: Pay cash (losing 4.5% investment return)',
                '**Strategy 2**: Bank loan at 6.8% for 3 years',
                '**Strategy 3**: Equipment financing at 5.9% for 4 years'
            ]},
            
            { type: 'paragraph', text: '**Strategy 1 (Opportunity Cost Analysis):**' },
            { type: 'paragraph', text: 'Lost investment return: $500,000 \\times 0.045 \\times 3 = \\$67,500$ (over 3 years)' },
            { type: 'paragraph', text: 'Annual opportunity cost: $\\frac{67,500}{3} = \\$22,500$ per year' },
            
            { type: 'paragraph', text: '**Strategy 2 (Bank Loan):**' },
            { type: 'paragraph', text: 'Interest cost: $500,000 \\times 0.068 \\times 3 = \\$102,000$' },
            { type: 'paragraph', text: 'Annual cost: $\\frac{102,000}{3} = \\$34,000$ per year' },
            
            { type: 'paragraph', text: '**Strategy 3 (Equipment Financing):**' },
            { type: 'paragraph', text: 'Interest cost: $500,000 \\times 0.059 \\times 4 = \\$118,000$' },
            { type: 'paragraph', text: 'Annual cost: $\\frac{118,000}{4} = \\$29,500$ per year' },
            
            { type: 'pattern-highlight', text: 'Strategy 1 (pay cash) has the lowest annual cost at $22,500 per year!' },
            
            { type: 'step-by-step', text: '**Part b)** A retail chain is optimizing their cash conversion cycle. They can:' },
            { type: 'list', items: [
                'Extend payment terms from suppliers from 30 to 45 days',
                'Offer 2/10 net 30 terms to customers (currently net 45)',
                'Reduce inventory holding from 60 to 45 days'
            ]},
            
            { type: 'paragraph', text: 'Current monthly purchases: $2,000,000; Current monthly sales: $3,000,000' },
            
            { type: 'paragraph', text: '**Supplier Payment Extension:**' },
            { type: 'paragraph', text: 'Additional financing: $2,000,000 \\times \\frac{15}{30} = \\$1,000,000$ for 15 days' },
            { type: 'paragraph', text: 'Equivalent annual rate needed: Assume 6% annual cost' },
            { type: 'paragraph', text: 'Interest saved: $1,000,000 \\times 0.06 \\times \\frac{15}{365} = \\$2,466$' },
            
            { type: 'paragraph', text: '**Customer Payment Acceleration:**' },
            { type: 'paragraph', text: 'If 60% of customers take the discount:' },
            { type: 'paragraph', text: 'Monthly sales taking discount: $3,000,000 \\times 0.6 = \\$1,800,000$' },
            { type: 'paragraph', text: 'Discount cost: $1,800,000 \\times 0.02 = \\$36,000$ per month' },
            { type: 'paragraph', text: 'Cash flow improvement: $1,800,000$ received 20 days earlier' },
            { type: 'paragraph', text: 'Interest savings: $1,800,000 \\times 0.06 \\times \\frac{20}{365} = \\$5,918$ per month' },
            { type: 'paragraph', text: 'Net monthly cost: $36,000 - 5,918 = \\$30,082$' },
            
            { type: 'paragraph', text: '**Inventory Reduction:**' },
            { type: 'paragraph', text: 'Assuming inventory value of $4,000,000 (2 months of purchases):' },
            { type: 'paragraph', text: 'Reduction: $4,000,000 \\times \\frac{15}{60} = \\$1,000,000$' },
            { type: 'paragraph', text: 'Annual carrying cost savings: $1,000,000 \\times 0.08 = \\$80,000$ (assuming 8% carrying cost)' },
            
            { type: 'connection', text: 'Inventory reduction provides the biggest benefit with $80,000 annual savings!' },
            
            { type: 'step-by-step', text: '**Part c)** A construction company needs to choose between two project financing options for a $2,000,000 project:' },
            { type: 'list', items: [
                '**Option 1**: Construction loan at 7.2% simple interest, converting to permanent financing at 6.8% after 18 months',
                '**Option 2**: Bridge loan at 8.5% for 12 months, then permanent loan at 6.5% for remaining period'
            ]},
            
            { type: 'paragraph', text: 'Assume total financing period is 5 years.' },
            
            { type: 'paragraph', text: '**Option 1 Analysis:**' },
            { type: 'paragraph', text: 'Construction phase (18 months): $2,000,000 \\times 0.072 \\times 1.5 = \\$216,000$' },
            { type: 'paragraph', text: 'Permanent phase (42 months): $2,000,000 \\times 0.068 \\times 3.5 = \\$476,000$' },
            { type: 'paragraph', text: 'Total cost: $216,000 + 476,000 = \\$692,000$' },
            
            { type: 'paragraph', text: '**Option 2 Analysis:**' },
            { type: 'paragraph', text: 'Bridge phase (12 months): $2,000,000 \\times 0.085 \\times 1 = \\$170,000$' },
            { type: 'paragraph', text: 'Permanent phase (48 months): $2,000,000 \\times 0.065 \\times 4 = \\$520,000$' },
            { type: 'paragraph', text: 'Total cost: $170,000 + 520,000 = \\$690,000$' },
            
            { type: 'pattern-highlight', text: 'Option 2 saves $2,000 over 5 years - the savings are minimal, so choose based on other factors like flexibility!' },
            
            { type: 'callout', text: 'Advanced financial analysis considers not just costs, but also strategic flexibility and risk management!', emphasis: 'success' },
            
            { type: 'summary-box', text: 'Key Strategic Considerations' },
            { type: 'list', items: [
                'Always include opportunity costs in cash vs. financing decisions',
                'Cash conversion cycle optimization can provide significant benefits',
                'Small percentage differences matter on large amounts',
                'Consider qualitative factors beyond just numerical costs',
                'Risk management and flexibility have value'
            ]},
        ]
    }
];