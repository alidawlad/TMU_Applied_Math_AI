import type { Example } from '@/lib/types';

export const week11CompoundInterestExamples: Example[] = [
    {
        id: 'W11-E12',
        title: 'Example 12: Introduction to Compound Interest',
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
        id: 'W11-E13',
        title: 'Example 13: Present Value with Compound Interest',
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
    },
    {
        id: 'W11-E14',
        title: 'Example 14: Different Compounding Frequencies',
        relatedPracticeProblemIds: ['CI7', 'CI8', 'CI9'],
        segments: [
            { type: 'subheading', text: 'Example 14: Comparing Compounding Frequencies' },
            
            { type: 'callout', text: 'More frequent compounding = higher returns! Compare the impact of different compounding periods.', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'A tech startup has $8,000 to invest at 9% annual interest. Compare the results after 3 years with different compounding frequencies.' },
            
            { type: 'step-by-step', text: 'Calculate future values for different compounding frequencies:' },
            
            { type: 'paragraph', text: '**Annual Compounding** (m = 1):' },
            { type: 'math', text: 'A = 8000\\left(1 + \\frac{0.09}{1}\\right)^{1 \\times 3} = 8000(1.09)^3' },
            { type: 'math', text: 'A = 8000(1.295029) = \\$10,360.23' },
            
            { type: 'paragraph', text: '**Semi-Annual Compounding** (m = 2):' },
            { type: 'math', text: 'A = 8000\\left(1 + \\frac{0.09}{2}\\right)^{2 \\times 3} = 8000(1.045)^6' },
            { type: 'math', text: 'A = 8000(1.302260) = \\$10,418.08' },
            
            { type: 'paragraph', text: '**Quarterly Compounding** (m = 4):' },
            { type: 'math', text: 'A = 8000\\left(1 + \\frac{0.09}{4}\\right)^{4 \\times 3} = 8000(1.0225)^{12}' },
            { type: 'math', text: 'A = 8000(1.305866) = \\$10,446.93' },
            
            { type: 'paragraph', text: '**Monthly Compounding** (m = 12):' },
            { type: 'math', text: 'A = 8000\\left(1 + \\frac{0.09}{12}\\right)^{12 \\times 3} = 8000(1.0075)^{36}' },
            { type: 'math', text: 'A = 8000(1.308645) = \\$10,469.16' },
            
            { type: 'connection', text: 'Notice how more frequent compounding increases the return, but with diminishing benefits.' },
            
            { type: 'pattern-highlight', text: 'Comparison of Additional Interest Earned:' },
            { type: 'list', items: [
                'Annual: $2,360.23 interest',
                'Semi-Annual: $2,418.08 interest (+$57.85)',
                'Quarterly: $2,446.93 interest (+$28.85 more)',
                'Monthly: $2,469.16 interest (+$22.23 more)'
            ]},
            
            { type: 'summary-box', text: 'Key Insight: The benefit of more frequent compounding decreases as frequency increases. The jump from annual to semi-annual provides more benefit than from quarterly to monthly.' },
            
            { type: 'callout', text: 'Business tip: When choosing investments, consider both the interest rate AND compounding frequency!', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E15',
        title: 'Example 15: Effective Annual Rate Calculations',
        relatedPracticeProblemIds: ['CI10', 'CI11', 'CI12'],
        segments: [
            { type: 'subheading', text: 'Example 15: Effective Annual Rate (EAR)' },
            
            { type: 'callout', text: 'The Effective Annual Rate shows the true annual return when compounding occurs more than once per year!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'The **Effective Annual Rate (EAR)** formula is:' },
            { type: 'math', text: 'EAR = \\left(1 + \\frac{r}{m}\\right)^m - 1' },
            { type: 'paragraph', text: 'Where $r$ is the nominal (stated) annual rate and $m$ is the compounding frequency.' },
            
            { type: 'step-by-step', text: 'A marketing firm is comparing two investment options:' },
            { type: 'list', items: [
                'Option A: 8.5% compounded annually',
                'Option B: 8.25% compounded monthly'
            ]},
            { type: 'paragraph', text: 'Which option provides a higher effective annual return?' },
            
            { type: 'paragraph', text: '**Option A:** Already compounded annually, so:' },
            { type: 'math', text: 'EAR_A = 8.5\\% = 0.085' },
            
            { type: 'paragraph', text: '**Option B:** Calculate effective rate for monthly compounding:' },
            { type: 'math', text: 'EAR_B = \\left(1 + \\frac{0.0825}{12}\\right)^{12} - 1' },
            { type: 'math', text: 'EAR_B = (1 + 0.006875)^{12} - 1' },
            { type: 'math', text: 'EAR_B = (1.006875)^{12} - 1' },
            { type: 'math', text: 'EAR_B = 1.085836 - 1 = 0.085836' },
            { type: 'math', text: 'EAR_B = 8.5836\\%' },
            
            { type: 'connection', text: 'Compare the effective rates:' },
            { type: 'list', items: [
                'Option A: 8.5000% effective rate',
                'Option B: 8.5836% effective rate'
            ]},
            
            { type: 'pattern-highlight', text: 'Option B provides a higher effective return despite having a lower nominal rate!' },
            
            { type: 'paragraph', text: 'The difference is: 8.5836% - 8.5000% = 0.0836 percentage points' },
            
            { type: 'summary-box', text: 'Key Insight: When comparing investments, always convert to effective annual rates for fair comparison. More frequent compounding can make a lower nominal rate more attractive.' },
            
            { type: 'callout', text: 'Business application: Credit cards often quote monthly rates - calculate the EAR to see the true annual cost!', emphasis: 'warning' },
        ]
    },
    {
        id: 'W11-E16',
        title: 'Example 16: Finding Time with Compound Interest',
        relatedPracticeProblemIds: ['CI13', 'CI14', 'CI15'],
        segments: [
            { type: 'subheading', text: 'Example 16: Solving for Time in Compound Interest' },
            
            { type: 'callout', text: 'How long will it take to reach your financial goal? Use logarithms to solve for time!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'When solving for time in compound interest problems, we rearrange the formula and use logarithms:' },
            { type: 'math', text: 'A = P\\left(1 + \\frac{r}{m}\\right)^{mt}' },
            { type: 'paragraph', text: 'Solving for $t$:' },
            { type: 'math', text: 't = \\frac{\\ln\\left(\\frac{A}{P}\\right)}{m \\cdot \\ln\\left(1 + \\frac{r}{m}\\right)}' },
            
            { type: 'step-by-step', text: 'A coffee shop owner invests $4,500 at 7.2% compounded quarterly. How long until the investment grows to $8,000?' },
            
            { type: 'paragraph', text: 'Given: $P = \\$4,500$, $A = \\$8,000$, $r = 7.2\\% = 0.072$, $m = 4$ (quarterly)' },
            
            { type: 'paragraph', text: 'Step 1: Calculate the periodic rate' },
            { type: 'math', text: 'i = \\frac{0.072}{4} = 0.018' },
            
            { type: 'paragraph', text: 'Step 2: Set up the equation' },
            { type: 'math', text: '8000 = 4500(1.018)^{4t}' },
            
            { type: 'paragraph', text: 'Step 3: Isolate the exponential term' },
            { type: 'math', text: '\\frac{8000}{4500} = (1.018)^{4t}' },
            { type: 'math', text: '1.777778 = (1.018)^{4t}' },
            
            { type: 'paragraph', text: 'Step 4: Take natural logarithm of both sides' },
            { type: 'math', text: '\\ln(1.777778) = 4t \\cdot \\ln(1.018)' },
            { type: 'math', text: '0.575364 = 4t \\cdot 0.017833' },
            
            { type: 'paragraph', text: 'Step 5: Solve for $t$' },
            { type: 'math', text: '4t = \\frac{0.575364}{0.017833} = 32.26' },
            { type: 'math', text: 't = \\frac{32.26}{4} = 8.07 \\text{ years}' },
            
            { type: 'connection', text: 'Converting to years and months: 8.07 years = 8 years and 0.84 months = 8 years and 25 days' },
            
            { type: 'pattern-highlight', text: 'The investment will reach $8,000 in approximately 8 years and 1 month.' },
            
            { type: 'summary-box', text: 'Time Calculation Steps: 1) Isolate exponential term, 2) Take natural log of both sides, 3) Solve for time variable, 4) Convert to desired time units.' },
            
            { type: 'callout', text: 'Business planning: Knowing investment timelines helps set realistic financial goals and cash flow expectations!', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E17',
        title: 'Example 17: Finding Rate with Compound Interest',
        relatedPracticeProblemIds: ['CI16', 'CI17', 'CI18'],
        segments: [
            { type: 'subheading', text: 'Example 17: Solving for Interest Rate' },
            
            { type: 'callout', text: 'What interest rate do you need to reach your goal? Solve for the unknown rate!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'When solving for interest rate in compound interest, we rearrange and use roots:' },
            { type: 'math', text: 'A = P\\left(1 + \\frac{r}{m}\\right)^{mt}' },
            { type: 'paragraph', text: 'Solving for $r$:' },
            { type: 'math', text: 'r = m\\left[\\left(\\frac{A}{P}\\right)^{\\frac{1}{mt}} - 1\\right]' },
            
            { type: 'step-by-step', text: 'A restaurant invested $12,000 and it grew to $18,500 in 4 years with monthly compounding. What was the annual interest rate?' },
            
            { type: 'paragraph', text: 'Given: $P = \\$12,000$, $A = \\$18,500$, $t = 4$ years, $m = 12$ (monthly)' },
            
            { type: 'paragraph', text: 'Step 1: Calculate total compounding periods' },
            { type: 'math', text: 'n = mt = 12 \\times 4 = 48 \\text{ periods}' },
            
            { type: 'paragraph', text: 'Step 2: Set up the equation' },
            { type: 'math', text: '18500 = 12000\\left(1 + \\frac{r}{12}\\right)^{48}' },
            
            { type: 'paragraph', text: 'Step 3: Isolate the compound factor' },
            { type: 'math', text: '\\frac{18500}{12000} = \\left(1 + \\frac{r}{12}\\right)^{48}' },
            { type: 'math', text: '1.541667 = \\left(1 + \\frac{r}{12}\\right)^{48}' },
            
            { type: 'paragraph', text: 'Step 4: Take the 48th root of both sides' },
            { type: 'math', text: '\\left(1 + \\frac{r}{12}\\right) = (1.541667)^{\\frac{1}{48}}' },
            { type: 'math', text: '\\left(1 + \\frac{r}{12}\\right) = 1.009167' },
            
            { type: 'paragraph', text: 'Step 5: Solve for the monthly rate' },
            { type: 'math', text: '\\frac{r}{12} = 1.009167 - 1 = 0.009167' },
            
            { type: 'paragraph', text: 'Step 6: Find the annual rate' },
            { type: 'math', text: 'r = 12 \\times 0.009167 = 0.11 = 11\\%' },
            
            { type: 'connection', text: 'Verification: $12,000(1.009167)^{48} = 12,000(1.541667) = $18,500 ✓' },
            
            { type: 'pattern-highlight', text: 'The restaurant earned an annual interest rate of 11% compounded monthly.' },
            
            { type: 'summary-box', text: 'Rate Calculation Steps: 1) Isolate compound factor, 2) Take the nth root, 3) Solve for periodic rate, 4) Convert to annual rate, 5) Verify the answer.' },
            
            { type: 'callout', text: 'Investment analysis: Calculating historical returns helps evaluate investment performance and set future expectations!', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E18',
        title: 'Example 18: Compound Interest Business Applications',
        relatedPracticeProblemIds: ['CI19', 'CI20', 'CI21'],
        segments: [
            { type: 'subheading', text: 'Example 18: Business Equipment Financing' },
            
            { type: 'callout', text: 'Real business scenario: Planning for equipment replacement using compound interest projections!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'A manufacturing company needs to replace equipment worth $45,000 in 6 years. They want to invest money today and make additional quarterly investments to meet this goal.' },
            
            { type: 'step-by-step', text: 'The company can invest at 8.4% compounded quarterly. They invest $15,000 today. What quarterly payment is needed for the remaining 5 years to reach their $45,000 goal?' },
            
            { type: 'paragraph', text: 'Given: Future goal = $45,000, Initial investment = $15,000, Time = 6 years, Rate = 8.4% quarterly compounding' },
            
            { type: 'paragraph', text: 'Step 1: Calculate the future value of initial investment' },
            { type: 'math', text: 'i = \\frac{0.084}{4} = 0.021, \\quad n = 4 \\times 6 = 24 \\text{ periods}' },
            { type: 'math', text: 'FV_{initial} = 15000(1.021)^{24} = 15000(1.6765) = \\$25,147.50' },
            
            { type: 'paragraph', text: 'Step 2: Calculate remaining amount needed' },
            { type: 'math', text: 'Remaining = 45000 - 25147.50 = \\$19,852.50' },
            
            { type: 'paragraph', text: 'Step 3: The quarterly payments start after 1 year (year 2-6)' },
            { type: 'paragraph', text: 'Time for quarterly payments = 5 years = 20 quarters' },
            
            { type: 'paragraph', text: 'Step 4: Use future value of ordinary annuity formula' },
            { type: 'math', text: 'FV = PMT \\times \\frac{(1+i)^n - 1}{i}' },
            { type: 'math', text: '19852.50 = PMT \\times \\frac{(1.021)^{20} - 1}{0.021}' },
            
            { type: 'paragraph', text: 'Step 5: Calculate the annuity factor' },
            { type: 'math', text: '\\frac{(1.021)^{20} - 1}{0.021} = \\frac{1.5157 - 1}{0.021} = \\frac{0.5157}{0.021} = 24.556' },
            
            { type: 'paragraph', text: 'Step 6: Solve for quarterly payment' },
            { type: 'math', text: 'PMT = \\frac{19852.50}{24.556} = \\$808.33' },
            
            { type: 'connection', text: 'Total investment strategy: $15,000 today + $808.33 quarterly for 5 years = $45,000 equipment fund' },
            
            { type: 'pattern-highlight', text: 'The company needs quarterly payments of $808.33 starting in year 2 to meet their equipment replacement goal.' },
            
            { type: 'summary-box', text: 'Business Planning Strategy: 1) Calculate future value of lump sum, 2) Determine remaining need, 3) Calculate required periodic payments, 4) Verify total equals goal.' },
            
            { type: 'callout', text: 'Strategic advantage: Planning equipment replacement in advance provides better cash flow management and avoids emergency financing!', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E19',
        title: 'Example 19: Investment Growth Analysis',
        relatedPracticeProblemIds: ['CI22', 'CI23', 'CI24'],
        segments: [
            { type: 'subheading', text: 'Example 19: Portfolio Growth Projections' },
            
            { type: 'callout', text: 'Long-term wealth building: Analyze how different investment scenarios affect portfolio growth!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'A consulting firm has $25,000 to invest and wants to analyze different scenarios for retirement planning over 25 years.' },
            
            { type: 'step-by-step', text: 'Compare three investment strategies:' },
            { type: 'list', items: [
                'Conservative: 5% compounded annually',
                'Moderate: 7% compounded semi-annually', 
                'Aggressive: 9% compounded quarterly'
            ]},
            
            { type: 'paragraph', text: '**Conservative Strategy:** 5% annual compounding' },
            { type: 'math', text: 'A_1 = 25000(1.05)^{25} = 25000(3.3864) = \\$84,660' },
            
            { type: 'paragraph', text: '**Moderate Strategy:** 7% semi-annual compounding' },
            { type: 'math', text: 'A_2 = 25000\\left(1 + \\frac{0.07}{2}\\right)^{2 \\times 25} = 25000(1.035)^{50}' },
            { type: 'math', text: 'A_2 = 25000(5.5849) = \\$139,623' },
            
            { type: 'paragraph', text: '**Aggressive Strategy:** 9% quarterly compounding' },
            { type: 'math', text: 'A_3 = 25000\\left(1 + \\frac{0.09}{4}\\right)^{4 \\times 25} = 25000(1.0225)^{100}' },
            { type: 'math', text: 'A_3 = 25000(9.3326) = \\$233,315' },
            
            { type: 'connection', text: 'Growth Analysis:' },
            { type: 'list', items: [
                'Conservative: $59,660 interest earned (2.39x growth)',
                'Moderate: $114,623 interest earned (5.58x growth)',
                'Aggressive: $208,315 interest earned (9.33x growth)'
            ]},
            
            { type: 'paragraph', text: '**Risk-Return Analysis:**' },
            { type: 'paragraph', text: 'Additional return from moderate vs conservative: $139,623 - $84,660 = $54,963' },
            { type: 'paragraph', text: 'Additional return from aggressive vs moderate: $233,315 - $139,623 = $93,692' },
            
            { type: 'pattern-highlight', text: 'Key Insight: The 2% increase from 5% to 7% adds $54,963, while the 2% increase from 7% to 9% adds $93,692 - compounding amplifies higher rates!' },
            
            { type: 'paragraph', text: '**Break-even Analysis:** How long for each strategy to double the investment?' },
            { type: 'math', text: '\\text{Conservative: } t = \\frac{\\ln(2)}{\\ln(1.05)} = \\frac{0.693}{0.0488} = 14.2 \\text{ years}' },
            { type: 'math', text: '\\text{Moderate: } t = \\frac{\\ln(2)}{2 \\ln(1.035)} = \\frac{0.693}{0.0689} = 10.1 \\text{ years}' },
            { type: 'math', text: '\\text{Aggressive: } t = \\frac{\\ln(2)}{4 \\ln(1.0225)} = \\frac{0.693}{0.0893} = 7.8 \\text{ years}' },
            
            { type: 'summary-box', text: 'Investment Strategy Comparison: Higher returns compound dramatically over time, but consider risk tolerance and investment horizon in decision-making.' },
            
            { type: 'callout', text: 'Business insight: Small differences in return rates create massive differences in long-term wealth accumulation!', emphasis: 'success' },
        ]
    },
    {
        id: 'W11-E20',
        title: 'Example 20: Advanced Compound Interest Scenarios',
        relatedPracticeProblemIds: ['CI25', 'CI26', 'CI27'],
        segments: [
            { type: 'subheading', text: 'Example 20: Complex Financial Planning' },
            
            { type: 'callout', text: 'Master level: Combine multiple compound interest concepts to solve complex business scenarios!', emphasis: 'primary' },
            
            { type: 'paragraph', text: 'A tech startup has the following financial plan:' },
            { type: 'list', items: [
                'Invest $30,000 today at 8.5% compounded monthly',
                'Add $5,000 every 6 months starting in month 6',
                'Need $150,000 for expansion in 5 years',
                'Determine if the plan meets their goal'
            ]},
            
            { type: 'step-by-step', text: 'Complex Multi-Component Analysis:' },
            
            { type: 'paragraph', text: '**Component 1:** Future value of initial $30,000 investment' },
            { type: 'math', text: 'i = \\frac{0.085}{12} = 0.007083, \\quad n = 12 \\times 5 = 60' },
            { type: 'math', text: 'FV_1 = 30000(1.007083)^{60} = 30000(1.5348) = \\$46,044' },
            
            { type: 'paragraph', text: '**Component 2:** Future value of semi-annual $5,000 payments' },
            { type: 'paragraph', text: 'Semi-annual rate: $(1.007083)^6 - 1 = 1.0433 - 1 = 0.0433 = 4.33\\%$' },
            { type: 'paragraph', text: 'Number of payments: 10 payments (every 6 months for 5 years)' },
            
            { type: 'paragraph', text: 'Using future value of ordinary annuity:' },
            { type: 'math', text: 'FV_2 = 5000 \\times \\frac{(1.0433)^{10} - 1}{0.0433}' },
            { type: 'math', text: 'FV_2 = 5000 \\times \\frac{1.5348 - 1}{0.0433} = 5000 \\times 12.342 = \\$61,710' },
            
            { type: 'paragraph', text: '**Total Future Value:**' },
            { type: 'math', text: 'Total = FV_1 + FV_2 = 46044 + 61710 = \\$107,754' },
            
            { type: 'connection', text: 'Gap Analysis: Goal = $150,000, Achieved = $107,754, Shortfall = $42,246' },
            
            { type: 'paragraph', text: '**Solution Options:**' },
            { type: 'paragraph', text: 'Option A: Increase semi-annual payments' },
            { type: 'math', text: 'Required\\,FV_2 = 150000 - 46044 = \\$103,956' },
            { type: 'math', text: 'Required\\,PMT = \\frac{103956}{12.342} = \\$8,426' },
            { type: 'paragraph', text: 'Need to increase payments from $5,000 to $8,426 (+$3,426)' },
            
            { type: 'paragraph', text: 'Option B: Higher interest rate needed' },
            { type: 'math', text: 'Keep\\,payments\\,at\\,\\$5,000: 150000 = 30000(1+i)^{60} + 5000 \\times Annuity Factor' },
            { type: 'paragraph', text: 'This would require approximately 10.2% annual rate (trial and error/financial calculator)' },
            
            { type: 'pattern-highlight', text: 'Current plan falls short by $42,246. The startup needs either higher payments ($8,426 vs $5,000) or higher returns (10.2% vs 8.5%).' },
            
            { type: 'summary-box', text: 'Advanced Planning Process: 1) Calculate each component separately, 2) Sum total future values, 3) Compare to goal, 4) Adjust parameters as needed, 5) Present multiple scenarios for decision-making.' },
            
            { type: 'callout', text: 'Strategic business planning: Complex scenarios require breaking down into components, then adjusting variables to meet objectives!', emphasis: 'success' },
            
            { type: 'callout', text: 'Remember: Financial planning is iterative - test different scenarios to find the optimal strategy for your business goals!', emphasis: 'accent' },
        ]
    }
];