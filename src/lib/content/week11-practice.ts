import type { Problem } from '@/lib/types';

export const week11PracticeProblems: Problem[] = [
    // Simple Interest Examples 1-3 Practice Problems
    {
        id: 'SI1',
        skill: 'Interest Rate Conversion',
        type: 'practice',
        title: 'Coffee Shop Interest Rate Conversion',
        description: 'A coffee shop owner needs to convert interest rates and time periods for loan calculations.',
        idealTime: 3,
        steps: [
            {
                id: 'SI1-1',
                title: 'Convert the annual rate to decimal',
                description: 'Convert 7.25% annual rate to decimal form',
                solution: '0.0725',
                hint: 'To convert a percentage to decimal, divide by 100: 7.25 ÷ 100 = 0.0725'
            },
            {
                id: 'SI1-2',
                title: 'Convert time period to years',
                description: 'Convert 8 months to years',
                solution: '0.6667',
                hint: 'Divide the number of months by 12: 8 ÷ 12 = 0.6667 years'
            }
        ],
        relatedExampleIds: ['W11-E1']
    },
    {
        id: 'SI2',
        skill: 'Interest Rate Conversion',
        type: 'practice',
        title: 'Bakery Time Period Conversion',
        description: 'A bakery needs to calculate interest for a 180-day loan at 4.5% annual rate.',
        idealTime: 3,
        steps: [
            {
                id: 'SI2-1',
                title: 'Convert annual rate to decimal',
                description: 'Convert 4.5% to decimal form',
                solution: '0.045',
                hint: 'Divide the percentage by 100: 4.5 ÷ 100 = 0.045'
            },
            {
                id: 'SI2-2',
                title: 'Convert days to years',
                description: 'Convert 180 days to years (use 365 days per year)',
                solution: '0.4932',
                hint: 'Divide days by 365: 180 ÷ 365 = 0.4932 years'
            }
        ],
        relatedExampleIds: ['W11-E1']
    },
    {
        id: 'SI3',
        skill: 'Interest Rate Conversion',
        type: 'practice',
        title: 'Restaurant Mixed Fraction Rate',
        description: 'A restaurant has a loan with an interest rate of 6¾% for 15 months.',
        idealTime: 4,
        steps: [
            {
                id: 'SI3-1',
                title: 'Convert mixed fraction to decimal',
                description: 'Convert 6¾% to decimal form',
                solution: '0.0675',
                hint: 'First convert: 6¾ = 6.75, then divide by 100: 6.75 ÷ 100 = 0.0675'
            },
            {
                id: 'SI3-2',
                title: 'Convert months to years',
                description: 'Convert 15 months to years',
                solution: '1.25',
                hint: 'Divide months by 12: 15 ÷ 12 = 1.25 years'
            }
        ],
        relatedExampleIds: ['W11-E1']
    },
    // Simple Interest Calculation Problems
    {
        id: 'SI4',
        skill: 'Simple Interest Calculation',
        type: 'practice',
        title: 'Gym Equipment Loan',
        description: 'A gym owner borrows $3,500 at 5.5% annual interest for 6 months to buy new equipment.',
        idealTime: 4,
        steps: [
            {
                id: 'SI4-1',
                title: 'Identify the variables',
                description: 'List P, r, and t from the problem',
                solution: 'P = $3500, r = 0.055, t = 0.5 years',
                hint: 'Principal = $3500, rate = 5.5% = 0.055, time = 6 months = 0.5 years'
            },
            {
                id: 'SI4-2',
                title: 'Calculate simple interest',
                description: 'Use I = P × r × t to find the interest',
                solution: '$96.25',
                hint: 'I = 3500 × 0.055 × 0.5 = $96.25'
            }
        ],
        relatedExampleIds: ['W11-E2']
    },
    {
        id: 'SI5',
        skill: 'Simple Interest Calculation',
        type: 'practice',
        title: 'Clothing Store Inventory Loan',
        description: 'A clothing store has $2,750 in a business account at 2.5% annual interest for 120 days.',
        idealTime: 5,
        steps: [
            {
                id: 'SI5-1',
                title: 'Convert time to years',
                description: 'Convert 120 days to years',
                solution: '0.3288',
                hint: 'Divide by 365: 120 ÷ 365 = 0.3288 years'
            },
            {
                id: 'SI5-2',
                title: 'Calculate simple interest',
                description: 'Find the interest earned using I = P × r × t',
                solution: '$22.58',
                hint: 'I = 2750 × 0.025 × 0.3288 = $22.58'
            }
        ],
        relatedExampleIds: ['W11-E2']
    },
    {
        id: 'SI6',
        skill: 'Simple Interest Calculation',
        type: 'practice',
        title: 'Accounting Firm Short-term Investment',
        description: 'An accounting firm invests $1,200 at 3.8% annual interest from May 15 to August 10.',
        idealTime: 6,
        steps: [
            {
                id: 'SI6-1',
                title: 'Calculate the time period',
                description: 'Find the number of days from May 15 to August 10',
                solution: '87 days',
                hint: 'Count: May (17 days) + June (30 days) + July (31 days) + August (9 days) = 87 days'
            },
            {
                id: 'SI6-2',
                title: 'Convert to years and calculate interest',
                description: 'Convert days to years and find the interest',
                solution: '$10.89',
                hint: 'Time = 87/365 = 0.2384 years; I = 1200 × 0.038 × 0.2384 = $10.89'
            }
        ],
        relatedExampleIds: ['W11-E2']
    },
    // Solving for Principal, Rate, or Time Problems
    {
        id: 'SI7',
        skill: 'Solving for Principal',
        type: 'practice',
        title: 'Food Truck Investment Goal',
        description: 'A food truck owner wants to earn $85.50 in interest over 200 days at 4.25% annual rate.',
        idealTime: 5,
        steps: [
            {
                id: 'SI7-1',
                title: 'Convert time to years',
                description: 'Convert 200 days to years',
                solution: '0.5479',
                hint: 'Divide by 365: 200 ÷ 365 = 0.5479 years'
            },
            {
                id: 'SI7-2',
                title: 'Solve for principal',
                description: 'Use P = I/(r × t) to find the required investment',
                solution: '$3,669.68',
                hint: 'P = 85.50/(0.0425 × 0.5479) = $3,669.68'
            }
        ],
        relatedExampleIds: ['W11-E3']
    },
    {
        id: 'SI8',
        skill: 'Solving for Interest Rate',
        type: 'practice',
        title: 'Bookstore Loan Rate',
        description: 'A bookstore borrowed $2,500 for 8 months and paid $91.67 in interest.',
        idealTime: 5,
        steps: [
            {
                id: 'SI8-1',
                title: 'Convert time to years',
                description: 'Convert 8 months to years',
                solution: '0.6667',
                hint: 'Divide by 12: 8 ÷ 12 = 0.6667 years'
            },
            {
                id: 'SI8-2',
                title: 'Solve for interest rate',
                description: 'Use r = I/(P × t) to find the annual rate',
                solution: '5.5%',
                hint: 'r = 91.67/(2500 × 0.6667) = 0.055 = 5.5%'
            }
        ],
        relatedExampleIds: ['W11-E3']
    },
    {
        id: 'SI9',
        skill: 'Solving for Time',
        type: 'practice',
        title: 'Pet Store Loan Duration',
        description: 'A pet store has a $1,800 loan at 6.25% annual interest and pays $67.50 in interest.',
        idealTime: 5,
        steps: [
            {
                id: 'SI9-1',
                title: 'Solve for time in years',
                description: 'Use t = I/(P × r) to find the time',
                solution: '0.6 years',
                hint: 't = 67.50/(1800 × 0.0625) = 0.6 years'
            },
            {
                id: 'SI9-2',
                title: 'Convert to days',
                description: 'Convert 0.6 years to days',
                solution: '219 days',
                hint: 'Multiply by 365: 0.6 × 365 = 219 days'
            }
        ],
        relatedExampleIds: ['W11-E3']
    },
    // Future and Present Value Problems
    {
        id: 'SI10',
        skill: 'Future and Present Value',
        type: 'practice',
        title: 'Art Gallery Payment Consolidation',
        description: 'An art gallery has payments of $1,200 due in 6 months and $800 due in 1 year. Find the equivalent single payment today at 8% annual interest.',
        idealTime: 6,
        steps: [
            {
                id: 'SI10-1',
                title: 'Calculate present value of first payment',
                description: 'Find present value of $1,200 due in 6 months',
                solution: '$1,153.85',
                hint: 'P = 1200/(1 + 0.08 × 0.5) = 1200/1.04 = $1,153.85'
            },
            {
                id: 'SI10-2',
                title: 'Calculate present value of second payment',
                description: 'Find present value of $800 due in 1 year',
                solution: '$740.74',
                hint: 'P = 800/(1 + 0.08 × 1) = 800/1.08 = $740.74'
            },
            {
                id: 'SI10-3',
                title: 'Find total equivalent payment',
                description: 'Add the two present values',
                solution: '$1,894.59',
                hint: 'Total = $1,153.85 + $740.74 = $1,894.59'
            }
        ],
        relatedExampleIds: ['W11-E4']
    },
    {
        id: 'SI11',
        skill: 'Future and Present Value',
        type: 'practice',
        title: 'Hardware Store Future Payment',
        description: 'A hardware store wants to pay $2,000 today instead of $2,200 in 9 months. Is this fair at 7.5% annual interest?',
        idealTime: 5,
        steps: [
            {
                id: 'SI11-1',
                title: 'Calculate present value of future payment',
                description: 'Find present value of $2,200 due in 9 months',
                solution: '$1,956.52',
                hint: 'P = 2200/(1 + 0.075 × 0.75) = 2200/1.05625 = $1,956.52'
            },
            {
                id: 'SI11-2',
                title: 'Compare with proposed payment',
                description: 'Compare $2,000 today with the calculated present value',
                solution: 'No, not fair',
                hint: 'Since $2,000 > $1,956.52, paying $2,000 today is more than the fair amount'
            }
        ],
        relatedExampleIds: ['W11-E4']
    },
    {
        id: 'SI12',
        skill: 'Future and Present Value',
        type: 'practice',
        title: 'Spa Services Future Value',
        description: 'A spa has $3,500 available today. What will this be worth in 18 months at 4.5% annual interest?',
        idealTime: 4,
        steps: [
            {
                id: 'SI12-1',
                title: 'Convert time to years',
                description: 'Convert 18 months to years',
                solution: '1.5 years',
                hint: 'Divide by 12: 18 ÷ 12 = 1.5 years'
            },
            {
                id: 'SI12-2',
                title: 'Calculate future value',
                description: 'Use S = P(1 + rt) to find the future value',
                solution: '$3,736.25',
                hint: 'S = 3500(1 + 0.045 × 1.5) = 3500 × 1.0675 = $3,736.25'
            }
        ],
        relatedExampleIds: ['W11-E4']
    },
    // Compound Interest Problems
    {
        id: 'CI1',
        skill: 'Compound Interest Comparison',
        type: 'practice',
        title: 'Pharmacy Investment Comparison',
        description: 'A pharmacy invests $8,000 for 4 years at 6% annual rate. Compare simple vs compound interest.',
        idealTime: 6,
        steps: [
            {
                id: 'CI1-1',
                title: 'Calculate simple interest',
                description: 'Find the simple interest for 4 years',
                solution: '$1,920',
                hint: 'I = 8000 × 0.06 × 4 = $1,920'
            },
            {
                id: 'CI1-2',
                title: 'Calculate compound interest amount',
                description: 'Find the compound interest using A = P(1 + r)^t',
                solution: '$10,099.45',
                hint: 'A = 8000(1.06)^4 = 8000 × 1.2625 = $10,099.45'
            },
            {
                id: 'CI1-3',
                title: 'Find the difference',
                description: 'Calculate how much more compound interest earned',
                solution: '$179.45',
                hint: 'Compound interest = $10,099.45 - $8,000 = $2,099.45; Difference = $2,099.45 - $1,920 = $179.45'
            }
        ],
        relatedExampleIds: ['W11-E5']
    },
    {
        id: 'CI2',
        skill: 'Compound Interest Calculation',
        type: 'practice',
        title: 'Dental Office Equipment Fund',
        description: 'A dental office invests $12,000 at 5.5% compounded semi-annually for 3 years.',
        idealTime: 5,
        steps: [
            {
                id: 'CI2-1',
                title: 'Identify compound interest variables',
                description: 'Find P, r, m, and t values',
                solution: 'P = $12,000, r = 0.055, m = 2, t = 3',
                hint: 'Principal = $12,000, rate = 5.5% = 0.055, semi-annually means m = 2, time = 3 years'
            },
            {
                id: 'CI2-2',
                title: 'Calculate periodic rate and periods',
                description: 'Find i and n values',
                solution: 'i = 0.0275, n = 6',
                hint: 'i = 0.055/2 = 0.0275, n = 2 × 3 = 6'
            },
            {
                id: 'CI2-3',
                title: 'Calculate compound amount',
                description: 'Use A = P(1 + i)^n to find the final amount',
                solution: '$14,177.87',
                hint: 'A = 12000(1.0275)^6 = 12000 × 1.1815 = $14,177.87'
            }
        ],
        relatedExampleIds: ['W11-E5']
    },
    {
        id: 'CI3',
        skill: 'Compound Interest Calculation',
        type: 'practice',
        title: 'Law Firm Retirement Fund',
        description: 'A law firm contributes $25,000 to a retirement fund at 7% compounded quarterly for 6 years.',
        idealTime: 5,
        steps: [
            {
                id: 'CI3-1',
                title: 'Set up compound interest formula',
                description: 'Identify all variables for quarterly compounding',
                solution: 'P = $25,000, r = 0.07, m = 4, t = 6',
                hint: 'Principal = $25,000, rate = 7% = 0.07, quarterly means m = 4, time = 6 years'
            },
            {
                id: 'CI3-2',
                title: 'Calculate the compound amount',
                description: 'Find the final amount after 6 years',
                solution: '$37,856.86',
                hint: 'A = 25000(1 + 0.07/4)^(4×6) = 25000(1.0175)^24 = $37,856.86'
            }
        ],
        relatedExampleIds: ['W11-E5']
    },
    // Present Value with Compound Interest
    {
        id: 'CI4',
        skill: 'Present Value Compound Interest',
        type: 'practice',
        title: 'Veterinary Clinic Equipment Fund',
        description: 'A veterinary clinic wants $15,000 in 5 years for new equipment. How much should they invest today at 6.5% compounded monthly?',
        idealTime: 6,
        steps: [
            {
                id: 'CI4-1',
                title: 'Identify present value variables',
                description: 'List FV, r, m, and t values',
                solution: 'FV = $15,000, r = 0.065, m = 12, t = 5',
                hint: 'Future value = $15,000, rate = 6.5% = 0.065, monthly means m = 12, time = 5 years'
            },
            {
                id: 'CI4-2',
                title: 'Calculate periodic rate and periods',
                description: 'Find i and n values',
                solution: 'i = 0.005417, n = 60',
                hint: 'i = 0.065/12 = 0.005417, n = 12 × 5 = 60'
            },
            {
                id: 'CI4-3',
                title: 'Calculate present value',
                description: 'Use PV = FV/(1 + i)^n',
                solution: '$10,831.52',
                hint: 'PV = 15000/(1.005417)^60 = 15000/1.3852 = $10,831.52'
            }
        ],
        relatedExampleIds: ['W11-E6']
    },
    {
        id: 'CI5',
        skill: 'Present Value Compound Interest',
        type: 'practice',
        title: 'Florist Shop Expansion Fund',
        description: 'A florist wants to have $8,500 in 3 years for shop expansion. How much to invest at 4.8% compounded quarterly?',
        idealTime: 6,
        steps: [
            {
                id: 'CI5-1',
                title: 'Set up present value calculation',
                description: 'Identify all variables for the calculation',
                solution: 'FV = $8,500, r = 0.048, m = 4, t = 3',
                hint: 'Future value = $8,500, rate = 4.8% = 0.048, quarterly means m = 4, time = 3 years'
            },
            {
                id: 'CI5-2',
                title: 'Calculate the present value',
                description: 'Find how much to invest today',
                solution: '$7,335.45',
                hint: 'PV = 8500/(1 + 0.048/4)^(4×3) = 8500/(1.012)^12 = $7,335.45'
            }
        ],
        relatedExampleIds: ['W11-E6']
    },
    {
        id: 'CI6',
        skill: 'Present Value Compound Interest',
        type: 'practice',
        title: 'Photography Studio Equipment Purchase',
        description: 'A photography studio needs $12,750 in 2.5 years for new equipment. Investment rate is 5.2% compounded semi-annually.',
        idealTime: 6,
        steps: [
            {
                id: 'CI6-1',
                title: 'Identify all variables',
                description: 'List the known values for semi-annual compounding',
                solution: 'FV = $12,750, r = 0.052, m = 2, t = 2.5',
                hint: 'Future value = $12,750, rate = 5.2% = 0.052, semi-annually means m = 2, time = 2.5 years'
            },
            {
                id: 'CI6-2',
                title: 'Calculate present value needed',
                description: 'Find the required investment amount',
                solution: '$11,351.46',
                hint: 'PV = 12750/(1 + 0.052/2)^(2×2.5) = 12750/(1.026)^5 = $11,351.46'
            }
        ],
        relatedExampleIds: ['W11-E6']
    },
    // Mixed Problems
    {
        id: 'MP1',
        skill: 'Equivalent Payment Problems',
        type: 'practice',
        title: 'Marketing Agency Debt Restructuring',
        description: 'A marketing agency has debts of $500 due 5 months ago and $750 due in 4 months. Replace with equal payments now and in 2 months at 6% compounded monthly.',
        idealTime: 8,
        steps: [
            {
                id: 'MP1-1',
                title: 'Calculate equivalent value of past debt',
                description: 'Find equivalent value of $500 due 5 months ago',
                solution: '$512.76',
                hint: 'E1 = 500(1 + 0.06/12)^5 = 500(1.005)^5 = $512.76'
            },
            {
                id: 'MP1-2',
                title: 'Calculate equivalent value of future debt',
                description: 'Find equivalent value of $750 due in 4 months',
                solution: '$735.22',
                hint: 'E2 = 750/(1.005)^4 = 750/1.0201 = $735.22'
            },
            {
                id: 'MP1-3',
                title: 'Set up equation for equal payments',
                description: 'If equal payments are x, set up equation using focal date of now',
                solution: 'x + x/(1.005)^2 = 1247.98',
                hint: 'Total debt = $512.76 + $735.22 = $1,247.98; Payment in 2 months has PV = x/(1.005)^2'
            },
            {
                id: 'MP1-4',
                title: 'Solve for equal payment amount',
                description: 'Solve the equation for x',
                solution: '$634.15',
                hint: 'x(1 + 1/1.0101) = 1247.98; x(1.9900) = 1247.98; x = $634.15'
            }
        ],
        relatedExampleIds: ['W11-E7']
    },
    {
        id: 'MP2',
        skill: 'Equivalent Payment Problems',
        type: 'practice',
        title: 'Catering Business Payment Restructuring',
        description: 'A catering business owes $400 due 3 months ago and $600 due in 6 months. Replace with a single payment in 3 months at 8% compounded monthly.',
        idealTime: 7,
        steps: [
            {
                id: 'MP2-1',
                title: 'Calculate future value of past debt',
                description: 'Find equivalent value of $400 due 3 months ago at focal date (3 months from now)',
                solution: '$424.32',
                hint: 'FV = 400(1 + 0.08/12)^6 = 400(1.00667)^6 = $424.32'
            },
            {
                id: 'MP2-2',
                title: 'Calculate present value of future debt',
                description: 'Find equivalent value of $600 due in 6 months at focal date (3 months from now)',
                solution: '$588.24',
                hint: 'PV = 600/(1.00667)^3 = 600/1.0200 = $588.24'
            },
            {
                id: 'MP2-3',
                title: 'Calculate single equivalent payment',
                description: 'Add the two equivalent values',
                solution: '$1,012.56',
                hint: 'Single payment = $424.32 + $588.24 = $1,012.56'
            }
        ],
        relatedExampleIds: ['W11-E7']
    },
    {
        id: 'MP3',
        skill: 'Equivalent Payment Problems',
        type: 'practice',
        title: 'Consulting Firm Payment Consolidation',
        description: 'A consulting firm has payments of $800 due now, $650 due in 8 months, and $900 due in 1 year. Replace with equal payments in 6 months and 18 months at 7.2% compounded monthly.',
        idealTime: 9,
        steps: [
            {
                id: 'MP3-1',
                title: 'Choose focal date and calculate equivalents',
                description: 'Use 6 months from now as focal date and find equivalent values',
                solution: 'E1 = $838.16, E2 = $619.78, E3 = $856.80',
                hint: 'E1 = 800(1.006)^6 = $838.16; E2 = 650/(1.006)^2 = $619.78; E3 = 900/(1.006)^6 = $856.80'
            },
            {
                id: 'MP3-2',
                title: 'Set up equation for equal payments',
                description: 'If equal payments are x, set up the equation',
                solution: 'x + x/(1.006)^12 = 2314.74',
                hint: 'Total = $838.16 + $619.78 + $856.80 = $2,314.74; Second payment PV = x/(1.006)^12'
            },
            {
                id: 'MP3-3',
                title: 'Solve for equal payment amount',
                description: 'Calculate the equal payment amount',
                solution: '$1,208.43',
                hint: 'x(1 + 1/1.0744) = 2314.74; x(1.9308) = 2314.74; x = $1,208.43'
            }
        ],
        relatedExampleIds: ['W11-E7']
    },
    // Finding Unknown Interest Rates
    {
        id: 'MP4',
        skill: 'Finding Unknown Interest Rates',
        type: 'practice',
        title: 'Fitness Center Investment Analysis',
        description: 'A fitness center invests $2,000 today and $3,000 in 2 years, to be settled by $6,000 in 4 years. Find the annual interest rate (compounded annually).',
        idealTime: 8,
        steps: [
            {
                id: 'MP4-1',
                title: 'Set up equation at focal date',
                description: 'Use 4 years from now as focal date and express all amounts',
                solution: '2000(1+r)^4 + 3000(1+r)^2 = 6000',
                hint: 'Investment 1 grows for 4 years, investment 2 grows for 2 years, settlement is already at focal date'
            },
            {
                id: 'MP4-2',
                title: 'Substitute x = 1 + r',
                description: 'Let x = 1 + r and rewrite the equation',
                solution: '2000x^4 + 3000x^2 = 6000',
                hint: 'Substitute x = 1 + r: 2000x^4 + 3000x^2 = 6000'
            },
            {
                id: 'MP4-3',
                title: 'Simplify and solve',
                description: 'Divide by 1000 and solve the equation',
                solution: 'x^4 + 1.5x^2 - 3 = 0',
                hint: 'Divide by 1000: 2x^4 + 3x^2 - 6 = 0, or let y = x^2: 2y^2 + 3y - 6 = 0'
            },
            {
                id: 'MP4-4',
                title: 'Find the interest rate',
                description: 'Solve for r after finding x',
                solution: '5.74%',
                hint: 'Using quadratic formula on 2y^2 + 3y - 6 = 0 gives y ≈ 1.1174, so x ≈ 1.0574, thus r ≈ 5.74%'
            }
        ],
        relatedExampleIds: ['W11-E8']
    },
    {
        id: 'MP5',
        skill: 'Finding Unknown Interest Rates',
        type: 'practice',
        title: 'Auto Repair Shop Investment Return',
        description: 'An auto repair shop invests $4,000 today and $2,000 in 1 year, receiving $7,200 in 3 years. Find the annual compound interest rate.',
        idealTime: 7,
        steps: [
            {
                id: 'MP5-1',
                title: 'Set up the equation',
                description: 'Express all amounts at the 3-year focal date',
                solution: '4000(1+r)^3 + 2000(1+r)^2 = 7200',
                hint: 'First investment grows for 3 years, second grows for 2 years, settlement is at focal date'
            },
            {
                id: 'MP5-2',
                title: 'Substitute and simplify',
                description: 'Let x = 1 + r and divide by 400',
                solution: '10x^3 + 5x^2 = 18',
                hint: 'Substitute x = 1 + r and divide by 400: 10x^3 + 5x^2 = 18'
            },
            {
                id: 'MP5-3',
                title: 'Solve for x',
                description: 'Solve the cubic equation',
                solution: 'x ≈ 1.0954',
                hint: 'Using numerical methods or trial and error: x ≈ 1.0954'
            },
            {
                id: 'MP5-4',
                title: 'Calculate interest rate',
                description: 'Find r = x - 1',
                solution: '9.54%',
                hint: 'r = 1.0954 - 1 = 0.0954 = 9.54%'
            }
        ],
        relatedExampleIds: ['W11-E8']
    },
    {
        id: 'MP6',
        skill: 'Finding Unknown Interest Rates',
        type: 'practice',
        title: 'Electrical Contractor Investment Deal',
        description: 'An electrical contractor invests $3,500 now and $1,500 in 18 months, receiving $6,000 in 30 months. Find the annual rate compounded monthly.',
        idealTime: 9,
        steps: [
            {
                id: 'MP6-1',
                title: 'Convert time periods to months',
                description: 'Express all times in months and set up equation',
                solution: '3500(1+i)^30 + 1500(1+i)^12 = 6000',
                hint: 'First investment: 30 months, second investment: 12 months (30-18), where i = r/12'
            },
            {
                id: 'MP6-2',
                title: 'Substitute and simplify',
                description: 'Let x = 1 + i and divide by 500',
                solution: '7x^30 + 3x^12 = 12',
                hint: 'Substitute x = 1 + i and divide by 500: 7x^30 + 3x^12 = 12'
            },
            {
                id: 'MP6-3',
                title: 'Solve for monthly rate',
                description: 'Find the monthly periodic rate',
                solution: 'i ≈ 0.0075',
                hint: 'Using numerical methods: x ≈ 1.0075, so i ≈ 0.0075 = 0.75% per month'
            },
            {
                id: 'MP6-4',
                title: 'Calculate annual rate',
                description: 'Find the annual rate r = 12i',
                solution: '9.0%',
                hint: 'r = 12 × 0.0075 = 0.09 = 9.0% annually'
            }
        ],
        relatedExampleIds: ['W11-E8']
    },
    // Investment Doubling and Tripling
    {
        id: 'MP7',
        skill: 'Investment Doubling Time',
        type: 'practice',
        title: 'Retail Store Investment Doubling',
        description: 'A retail store invests at 6% compounded quarterly. How long will it take for the investment to double?',
        idealTime: 6,
        steps: [
            {
                id: 'MP7-1',
                title: 'Set up doubling equation',
                description: 'Use A = P(1 + i)^n where A = 2P',
                solution: '2P = P(1 + 0.015)^n',
                hint: 'For doubling: 2P = P(1.015)^n, where i = 0.06/4 = 0.015'
            },
            {
                id: 'MP7-2',
                title: 'Simplify and take logarithm',
                description: 'Simplify to 2 = (1.015)^n and solve',
                solution: 'n = ln(2)/ln(1.015)',
                hint: 'Taking ln of both sides: ln(2) = n × ln(1.015), so n = ln(2)/ln(1.015)'
            },
            {
                id: 'MP7-3',
                title: 'Calculate number of quarters',
                description: 'Find the number of compounding periods',
                solution: '46.56 quarters',
                hint: 'n = 0.6931/0.0149 = 46.56 quarters'
            },
            {
                id: 'MP7-4',
                title: 'Convert to years',
                description: 'Convert quarters to years',
                solution: '11.64 years',
                hint: 'Time in years = 46.56/4 = 11.64 years'
            }
        ],
        relatedExampleIds: ['W11-E9']
    },
    {
        id: 'MP8',
        skill: 'Investment Tripling Time',
        type: 'practice',
        title: 'Construction Company Investment Tripling',
        description: 'A construction company invests at 8% compounded semi-annually. How long to triple the investment?',
        idealTime: 6,
        steps: [
            {
                id: 'MP8-1',
                title: 'Set up tripling equation',
                description: 'Use compound interest formula for tripling',
                solution: '3 = (1.04)^n',
                hint: 'For tripling: 3P = P(1.04)^n, where i = 0.08/2 = 0.04'
            },
            {
                id: 'MP8-2',
                title: 'Solve using logarithms',
                description: 'Take natural log of both sides',
                solution: 'n = ln(3)/ln(1.04)',
                hint: 'ln(3) = n × ln(1.04), so n = ln(3)/ln(1.04)'
            },
            {
                id: 'MP8-3',
                title: 'Calculate number of periods',
                description: 'Find the number of semi-annual periods',
                solution: '28.01 periods',
                hint: 'n = 1.0986/0.0392 = 28.01 semi-annual periods'
            },
            {
                id: 'MP8-4',
                title: 'Convert to years',
                description: 'Convert semi-annual periods to years',
                solution: '14.01 years',
                hint: 'Time in years = 28.01/2 = 14.01 years'
            }
        ],
        relatedExampleIds: ['W11-E9']
    },
    {
        id: 'MP9',
        skill: 'Investment Growth Analysis',
        type: 'practice',
        title: 'Medical Office Investment Growth',
        description: 'A medical office invests $5,000 at 7.5% compounded monthly. How much will it be worth in 8 years, and how long to reach $12,000?',
        idealTime: 7,
        steps: [
            {
                id: 'MP9-1',
                title: 'Calculate future value after 8 years',
                description: 'Find A using compound interest formula',
                solution: '$10,226.09',
                hint: 'A = 5000(1 + 0.075/12)^(12×8) = 5000(1.00625)^96 = $10,226.09'
            },
            {
                id: 'MP9-2',
                title: 'Set up equation for $12,000 target',
                description: 'Find when A = $12,000',
                solution: '12000 = 5000(1.00625)^n',
                hint: 'Set up: 12000 = 5000(1.00625)^n, so 2.4 = (1.00625)^n'
            },
            {
                id: 'MP9-3',
                title: 'Solve for number of months',
                description: 'Use logarithms to find n',
                solution: '140.76 months',
                hint: 'n = ln(2.4)/ln(1.00625) = 0.8755/0.0062 = 140.76 months'
            },
            {
                id: 'MP9-4',
                title: 'Convert to years',
                description: 'Convert months to years',
                solution: '11.73 years',
                hint: 'Time = 140.76/12 = 11.73 years'
            }
        ],
        relatedExampleIds: ['W11-E9']
    },
    // Simple Interest Examples 5-11 Practice Problems (SI13-SI33)
    // W11-E5 Practice Problems: Simple Interest Applications with Different Time Periods
    {
        id: 'SI13',
        skill: 'Simple Interest Applications',
        type: 'practice',
        title: 'Healthcare Clinic Equipment Loan',
        description: 'A healthcare clinic borrows $62,000 at 5.8% annual interest for 15 months to purchase new diagnostic equipment.',
        idealTime: 4,
        steps: [
            {
                id: 'SI13-1',
                title: 'Convert time to years',
                description: 'Convert 15 months to years',
                solution: '1.25',
                hint: 'Divide months by 12: 15 ÷ 12 = 1.25 years'
            },
            {
                id: 'SI13-2',
                title: 'Calculate simple interest',
                description: 'Find the interest using I = P × r × t',
                solution: '$4,495',
                hint: 'I = 62,000 × 0.058 × 1.25 = $4,495'
            },
            {
                id: 'SI13-3',
                title: 'Calculate total repayment',
                description: 'Find the total amount to be repaid',
                solution: '$66,495',
                hint: 'Total = Principal + Interest = $62,000 + $4,495 = $66,495'
            }
        ],
        relatedExampleIds: ['W11-E5']
    },
    {
        id: 'SI14',
        skill: 'Simple Interest Applications',
        type: 'practice',
        title: 'Construction Company Seasonal Loan',
        description: 'A construction company has a loan from April 12, 2023, to November 25, 2023, at 6.75% annual interest on $85,000. Calculate using exact days.',
        idealTime: 6,
        steps: [
            {
                id: 'SI14-1',
                title: 'Calculate exact number of days',
                description: 'Find the total days from April 12 to November 25',
                solution: '227 days',
                hint: 'April: 19 days, May: 31, June: 30, July: 31, Aug: 31, Sept: 30, Oct: 31, Nov: 24 = 227 days'
            },
            {
                id: 'SI14-2',
                title: 'Convert days to years',
                description: 'Convert 227 days to years using 365 days per year',
                solution: '0.6219',
                hint: 'Time = 227 ÷ 365 = 0.6219 years'
            },
            {
                id: 'SI14-3',
                title: 'Calculate interest',
                description: 'Find the interest earned using the simple interest formula',
                solution: '$3,572.36',
                hint: 'I = 85,000 × 0.0675 × 0.6219 = $3,572.36'
            }
        ],
        relatedExampleIds: ['W11-E5']
    },
    {
        id: 'SI15',
        skill: 'Simple Interest Applications',
        type: 'practice',
        title: 'Technology Company Working Capital Analysis',
        description: 'A tech company needs $95,000 for working capital. Compare: quarterly borrowing at 4.8% vs. annual borrowing at 4.8%.',
        idealTime: 6,
        steps: [
            {
                id: 'SI15-1',
                title: 'Calculate quarterly borrowing cost',
                description: 'Find interest for 3 months (0.25 years) repeated 4 times',
                solution: '$1,140 per quarter',
                hint: 'Quarterly interest = 95,000 × 0.048 × 0.25 = $1,140 per quarter'
            },
            {
                id: 'SI15-2',
                title: 'Calculate annual cost for quarterly approach',
                description: 'Find total annual cost for quarterly borrowing',
                solution: '$4,560',
                hint: 'Annual cost = $1,140 × 4 quarters = $4,560'
            },
            {
                id: 'SI15-3',
                title: 'Compare with annual borrowing',
                description: 'Calculate interest for one-year borrowing and compare',
                solution: 'Same cost: $4,560',
                hint: 'Annual borrowing: 95,000 × 0.048 × 1 = $4,560. With simple interest, both approaches cost the same!'
            }
        ],
        relatedExampleIds: ['W11-E5']
    },
    // W11-E6 Practice Problems: Complex Solving for Missing Variables
    {
        id: 'SI16',
        skill: 'Complex Solving Applications',
        type: 'practice',
        title: 'Auto Dealership Loan Analysis',
        description: 'An auto dealership borrowed money at 7.2% annual interest. After paying $4,320 in interest for 10 months, they still owe $72,000. Find the original loan.',
        idealTime: 6,
        steps: [
            {
                id: 'SI16-1',
                title: 'Convert time to years',
                description: 'Convert 10 months to years',
                solution: '0.8333',
                hint: 'Time = 10 ÷ 12 = 0.8333 years'
            },
            {
                id: 'SI16-2',
                title: 'Calculate original principal',
                description: 'Use P = I/(r × t) to find original loan amount',
                solution: '$72,000',
                hint: 'P = 4,320/(0.072 × 0.8333) = 4,320/0.06 = $72,000'
            },
            {
                id: 'SI16-3',
                title: 'Verify the calculation',
                description: 'Check: Does this principal generate the given interest?',
                solution: 'Verified: $4,320',
                hint: 'Check: 72,000 × 0.072 × 0.8333 = $4,320 ✓ (Note: The loan amount equals the remaining balance)'
            }
        ],
        relatedExampleIds: ['W11-E6']
    },
    {
        id: 'SI17',
        skill: 'Complex Solving Applications',
        type: 'practice',
        title: 'Marketing Agency Investment Comparison',
        description: 'A marketing agency has two options: invest $40,000 now and earn $7,200 interest in 18 months, or invest at 8.5% for 2 years. Which is better?',
        idealTime: 6,
        steps: [
            {
                id: 'SI17-1',
                title: 'Calculate Option 1 annual rate',
                description: 'Find the annual rate for the first option',
                solution: '12%',
                hint: 'r = I/(P × t) = 7,200/(40,000 × 1.5) = 7,200/60,000 = 0.12 = 12%'
            },
            {
                id: 'SI17-2',
                title: 'Calculate Option 2 interest',
                description: 'Find interest earned at 8.5% for 2 years',
                solution: '$6,800',
                hint: 'Interest = 40,000 × 0.085 × 2 = $6,800'
            },
            {
                id: 'SI17-3',
                title: 'Compare and recommend',
                description: 'Which option provides better return?',
                solution: 'Option 1 is better',
                hint: 'Option 1: 12% annual rate ($7,200 interest) vs Option 2: 8.5% annual rate ($6,800 interest)'
            }
        ],
        relatedExampleIds: ['W11-E6']
    },
    {
        id: 'SI18',
        skill: 'Complex Solving Applications',
        type: 'practice',
        title: 'Real Estate Agency Multi-Loan Portfolio',
        description: 'A real estate agency made loans: $25,000 at 5.5% for 8 months, $35,000 at 7% for unknown time, $15,000 at 6% for 12 months. Total interest: $5,687.50. Find unknown time.',
        idealTime: 8,
        steps: [
            {
                id: 'SI18-1',
                title: 'Calculate known interest amounts',
                description: 'Find interest from Loan 1 and Loan 3',
                solution: 'Loan 1: $916.67, Loan 3: $900',
                hint: 'Loan 1: 25,000 × 0.055 × (8/12) = $916.67; Loan 3: 15,000 × 0.06 × 1 = $900'
            },
            {
                id: 'SI18-2',
                title: 'Find interest from Loan 2',
                description: 'Calculate remaining interest that must come from Loan 2',
                solution: '$3,870.83',
                hint: 'Loan 2 interest = Total - Loan 1 - Loan 3 = 5,687.50 - 916.67 - 900 = $3,870.83'
            },
            {
                id: 'SI18-3',
                title: 'Calculate time for Loan 2',
                description: 'Use t = I/(P × r) to find the unknown time period',
                solution: '1.58 years or 19 months',
                hint: 't = 3,870.83/(35,000 × 0.07) = 3,870.83/2,450 = 1.58 years = 19 months'
            }
        ],
        relatedExampleIds: ['W11-E6']
    },
    // W11-E7 Practice Problems: Business Loan Calculations
    {
        id: 'SI19',
        skill: 'Comprehensive Loan Analysis',
        type: 'practice',
        title: 'Restaurant Chain Equipment Financing',
        description: 'A restaurant chain needs $125,000 for kitchen equipment. Compare options: A) 5.8% for 3 years, B) 6.2% for 2 years, C) 7.5% for 1 year.',
        idealTime: 7,
        steps: [
            {
                id: 'SI19-1',
                title: 'Calculate Option A costs',
                description: 'Find interest and monthly payment for 3-year option',
                solution: 'Interest: $21,750, Monthly: $4,076.39',
                hint: 'Interest: 125,000 × 0.058 × 3 = $21,750; Monthly: (125,000 + 21,750) ÷ 36 = $4,076.39'
            },
            {
                id: 'SI19-2',
                title: 'Calculate Option B costs',
                description: 'Find interest and monthly payment for 2-year option',
                solution: 'Interest: $15,500, Monthly: $5,854.17',
                hint: 'Interest: 125,000 × 0.062 × 2 = $15,500; Monthly: (125,000 + 15,500) ÷ 24 = $5,854.17'
            },
            {
                id: 'SI19-3',
                title: 'Calculate Option C costs and recommend',
                description: 'Find 1-year option costs and make recommendation',
                solution: 'Interest: $9,375, Monthly: $11,197.92',
                hint: 'Interest: 125,000 × 0.075 × 1 = $9,375; Monthly: (125,000 + 9,375) ÷ 12 = $11,197.92; Lowest total cost but highest monthly payment'
            }
        ],
        relatedExampleIds: ['W11-E7']
    },
    {
        id: 'SI20',
        skill: 'Comprehensive Loan Analysis',
        type: 'practice',
        title: 'Manufacturing Company Early Payoff Analysis',
        description: 'A manufacturer has a $180,000 loan at 6.5% for 4 years. If they can pay off early after 2.5 years, calculate the savings.',
        idealTime: 5,
        steps: [
            {
                id: 'SI20-1',
                title: 'Calculate full-term interest',
                description: 'Find total interest if loan runs full 4 years',
                solution: '$46,800',
                hint: 'Full term interest = 180,000 × 0.065 × 4 = $46,800'
            },
            {
                id: 'SI20-2',
                title: 'Calculate early payoff interest',
                description: 'Find interest if paid off after 2.5 years',
                solution: '$29,250',
                hint: 'Early payoff interest = 180,000 × 0.065 × 2.5 = $29,250'
            },
            {
                id: 'SI20-3',
                title: 'Calculate interest savings',
                description: 'Find the savings from early payoff',
                solution: '$17,550',
                hint: 'Savings = $46,800 - $29,250 = $17,550'
            }
        ],
        relatedExampleIds: ['W11-E7']
    },
    {
        id: 'SI21',
        skill: 'Comprehensive Loan Analysis',
        type: 'practice',
        title: 'Retail Store Cash Flow Optimization',
        description: 'A retail store can choose: Option A) $90,000 at 5.2% for 30 months, or Option B) Two loans of $45,000 each at 5.5% for 15 months staggered 6 months apart.',
        idealTime: 8,
        steps: [
            {
                id: 'SI21-1',
                title: 'Calculate Option A total cost',
                description: 'Find total interest for single large loan',
                solution: '$11,700',
                hint: 'Interest = 90,000 × 0.052 × 2.5 = $11,700'
            },
            {
                id: 'SI21-2',
                title: 'Calculate Option B total cost',
                description: 'Find combined cost of two staggered loans',
                solution: '$6,187.50',
                hint: 'Each loan: 45,000 × 0.055 × 1.25 = $3,093.75; Total: $3,093.75 × 2 = $6,187.50'
            },
            {
                id: 'SI21-3',
                title: 'Compare cash flow impact',
                description: 'Analyze which option provides better cash flow management',
                solution: 'Option B saves $5,512.50',
                hint: 'Savings: $11,700 - $6,187.50 = $5,512.50; Option B also provides staggered cash flow with second loan starting 6 months later'
            }
        ],
        relatedExampleIds: ['W11-E7']
    },
    // W11-E8 Practice Problems: Trade Credit and Commercial Applications
    {
        id: 'SI22',
        skill: 'Trade Credit Analysis',
        type: 'practice',
        title: 'Electronics Store Trade Credit Decision',
        description: 'An electronics store purchases $24,000 of inventory with terms "3/15 net 45". Analyze the cost of not taking the discount.',
        idealTime: 6,
        steps: [
            {
                id: 'SI22-1',
                title: 'Calculate discount savings',
                description: 'Find the savings if discount is taken',
                solution: '$720',
                hint: 'Discount = 24,000 × 0.03 = $720'
            },
            {
                id: 'SI22-2',
                title: 'Calculate effective discount rate',
                description: 'Find the rate for the extra time period',
                solution: '3.09% for 30 days',
                hint: 'Rate = 720/(24,000 - 720) = 720/23,280 = 3.09% for (45-15) = 30 days'
            },
            {
                id: 'SI22-3',
                title: 'Convert to annual rate',
                description: 'Find the equivalent annual interest rate',
                solution: '37.63% annually',
                hint: 'Annual rate = 3.09% × (365/30) = 3.09% × 12.17 = 37.63%'
            }
        ],
        relatedExampleIds: ['W11-E8']
    },
    {
        id: 'SI23',
        skill: 'Trade Credit Analysis',
        type: 'practice',
        title: 'Furniture Store Credit vs Bank Loan',
        description: 'A furniture store has $35,000 purchase with "2/10 net 40" terms. Compare with bank loan at 15% annual interest for 30 days.',
        idealTime: 7,
        steps: [
            {
                id: 'SI23-1',
                title: 'Calculate trade credit cost',
                description: 'Find annual rate for giving up the trade discount',
                solution: '24.49% annually',
                hint: 'Discount = $700; Rate = 700/34,300 × (365/30) = 2.04% × 12.17 = 24.49%'
            },
            {
                id: 'SI23-2',
                title: 'Calculate bank loan cost',
                description: 'Find interest cost for 30-day bank loan',
                solution: '$431.51',
                hint: 'Bank loan interest = 34,300 × 0.15 × (30/365) = $431.51'
            },
            {
                id: 'SI23-3',
                title: 'Compare and recommend',
                description: 'Which option is more cost-effective?',
                solution: 'Bank loan is cheaper',
                hint: 'Trade credit cost = $700, Bank loan cost = $431.51. Bank loan saves $268.49'
            }
        ],
        relatedExampleIds: ['W11-E8']
    },
    {
        id: 'SI24',
        skill: 'Trade Credit Analysis',
        type: 'practice',
        title: 'Medical Supplies Late Payment Penalty',
        description: 'A medical supply company has $18,000 purchase with "net 30" terms and 4% penalty for overdue amounts. Payment is 20 days late. Calculate penalty and annual rate.',
        idealTime: 5,
        steps: [
            {
                id: 'SI24-1',
                title: 'Calculate penalty amount',
                description: 'Find the late payment penalty',
                solution: '$720',
                hint: 'Penalty = 18,000 × 0.04 = $720'
            },
            {
                id: 'SI24-2',
                title: 'Calculate effective rate for late period',
                description: 'Find the rate for 20 days late',
                solution: '4% for 20 days',
                hint: 'Rate = 720/18,000 = 4% for 20 days late'
            },
            {
                id: 'SI24-3',
                title: 'Convert to annual rate',
                description: 'Find the equivalent annual penalty rate',
                solution: '73% annually',
                hint: 'Annual rate = 4% × (365/20) = 4% × 18.25 = 73%'
            }
        ],
        relatedExampleIds: ['W11-E8']
    },
    // W11-E9 Practice Problems: Discount Calculations and Promissory Notes
    {
        id: 'SI25',
        skill: 'Bank Discount Analysis',
        type: 'practice',
        title: 'Construction Company Note Discounting',
        description: 'A construction company has a $15,000 promissory note due in 6 months. A bank offers 10% annual discount rate. Find proceeds and effective rate.',
        idealTime: 6,
        steps: [
            {
                id: 'SI25-1',
                title: 'Calculate bank discount',
                description: 'Find the discount amount using D = M × d × t',
                solution: '$750',
                hint: 'Discount = 15,000 × 0.10 × 0.5 = $750'
            },
            {
                id: 'SI25-2',
                title: 'Calculate proceeds',
                description: 'Find the amount received today',
                solution: '$14,250',
                hint: 'Proceeds = Maturity Value - Discount = 15,000 - 750 = $14,250'
            },
            {
                id: 'SI25-3',
                title: 'Calculate effective interest rate',
                description: 'Find the true annual interest rate paid',
                solution: '10.53%',
                hint: 'Effective rate = (750/14,250) × (12/6) = 0.0526 × 2 = 10.53%'
            }
        ],
        relatedExampleIds: ['W11-E9']
    },
    {
        id: 'SI26',
        skill: 'Bank Discount Analysis',
        type: 'practice',
        title: 'Professional Services Note vs Bank Loan',
        description: 'A consulting firm can discount a $25,000 note due in 4 months at 9% discount rate, or take a bank loan at 9.5% simple interest. Which is better?',
        idealTime: 7,
        steps: [
            {
                id: 'SI26-1',
                title: 'Calculate discounting option cost',
                description: 'Find proceeds and effective cost of discounting',
                solution: 'Proceeds: $24,250, Cost: $750',
                hint: 'Discount = 25,000 × 0.09 × (4/12) = $750; Proceeds = 25,000 - 750 = $24,250'
            },
            {
                id: 'SI26-2',
                title: 'Calculate bank loan option cost',
                description: 'Find interest cost for bank loan on proceeds amount',
                solution: 'Interest: $765',
                hint: 'For $24,250 loan: Interest = 24,250 × 0.095 × (4/12) = $765'
            },
            {
                id: 'SI26-3',
                title: 'Compare and recommend',
                description: 'Which option is more cost-effective?',
                solution: 'Discounting is cheaper',
                hint: 'Discounting cost: $750 vs Bank loan cost: $765. Discounting saves $15'
            }
        ],
        relatedExampleIds: ['W11-E9']
    },
    {
        id: 'SI27',
        skill: 'Bank Discount Analysis',
        type: 'practice',
        title: 'Manufacturing Company Discount Rate Analysis',
        description: 'A manufacturer has a $40,000 note due in 8 months. What discount rate would make them indifferent between discounting and a 12.5% bank loan?',
        idealTime: 8,
        steps: [
            {
                id: 'SI27-1',
                title: 'Set up break-even equation',
                description: 'Express when discount cost equals bank loan cost',
                solution: 'Discount = Bank loan interest on proceeds',
                hint: 'Let d = discount rate. Discount = 40,000 × d × (8/12); Proceeds = 40,000(1 - d × 8/12)'
            },
            {
                id: 'SI27-2',
                title: 'Express bank loan cost',
                description: 'Calculate bank loan interest on proceeds',
                solution: 'Interest = Proceeds × 0.125 × (8/12)',
                hint: 'Bank loan interest = 40,000(1 - d × 8/12) × 0.125 × (8/12)'
            },
            {
                id: 'SI27-3',
                title: 'Solve for break-even discount rate',
                description: 'Find the discount rate that makes both options equal',
                solution: '11.11%',
                hint: 'Setting discount = interest and solving: d = 0.125 × (8/12) ÷ [1 + 0.125 × (8/12)] = 11.11%'
            }
        ],
        relatedExampleIds: ['W11-E9']
    },
    // W11-E10 Practice Problems: Multiple Simple Interest Scenarios
    {
        id: 'SI28',
        skill: 'Portfolio Interest Analysis',
        type: 'practice',
        title: 'Investment Firm Portfolio Management',
        description: 'An investment firm has: $80,000 at 4.8% for 3 years, $120,000 at 5.5% for 2 years, $60,000 at 6.2% for 18 months. Calculate total interest and average return.',
        idealTime: 7,
        steps: [
            {
                id: 'SI28-1',
                title: 'Calculate individual interests',
                description: 'Find interest from each investment',
                solution: 'I1: $11,520, I2: $13,200, I3: $5,580',
                hint: 'I1 = 80,000 × 0.048 × 3 = $11,520; I2 = 120,000 × 0.055 × 2 = $13,200; I3 = 60,000 × 0.062 × 1.5 = $5,580'
            },
            {
                id: 'SI28-2',
                title: 'Calculate total interest',
                description: 'Sum all interest earned',
                solution: '$30,300',
                hint: 'Total interest = $11,520 + $13,200 + $5,580 = $30,300'
            },
            {
                id: 'SI28-3',
                title: 'Calculate weighted average return',
                description: 'Find the portfolio average annual return rate',
                solution: '5.25%',
                hint: 'Total principal = $260,000; Weighted avg time = 2.35 years; Rate = 30,300/(260,000 × 2.35) = 5.25%'
            }
        ],
        relatedExampleIds: ['W11-E10']
    },
    {
        id: 'SI29',
        skill: 'Debt Consolidation Analysis',
        type: 'practice',
        title: 'Small Business Debt Consolidation',
        description: 'A business has debts: $20,000 due in 3 months at 9%, $30,000 due in 8 months at 8%, $25,000 due in 15 months at 8.5%. Consolidate into equal payments now and in 9 months at 7.5%.',
        idealTime: 9,
        steps: [
            {
                id: 'SI29-1',
                title: 'Calculate equivalent values at focal date',
                description: 'Use 9 months as focal date and find equivalent values',
                solution: 'E1: $21,350, E2: $29,400, E3: $23,906.25',
                hint: 'E1 = 20,000(1 + 0.09×3/12)(1 + 0.075×6/12); E2 = 30,000(1 + 0.08×8/12)/(1 + 0.075×1/12); E3 = 25,000(1 + 0.085×15/12)/(1 + 0.075×6/12)'
            },
            {
                id: 'SI29-2',
                title: 'Calculate total equivalent debt',
                description: 'Sum all equivalent values at focal date',
                solution: '$74,656.25',
                hint: 'Total = $21,350 + $29,400 + $23,906.25 = $74,656.25'
            },
            {
                id: 'SI29-3',
                title: 'Calculate equal payment amount',
                description: 'Find equal payments now and in 9 months',
                solution: '$36,046.54',
                hint: 'If payments are x: x(1 + 0.075×9/12) + x = 74,656.25; x(1.05625) + x = 74,656.25; x = $36,046.54'
            }
        ],
        relatedExampleIds: ['W11-E10']
    },
    {
        id: 'SI30',
        skill: 'Net Interest Position Analysis',
        type: 'practice',
        title: 'Financial Services Net Interest Analysis',
        description: 'A firm has assets: $100,000 at 4.5% for 12 months, $75,000 at 5.8% for 18 months; liabilities: $120,000 at 6.8% for 15 months, $60,000 at 7.2% for 9 months. Find net position.',
        idealTime: 8,
        steps: [
            {
                id: 'SI30-1',
                title: 'Calculate interest income',
                description: 'Find total interest earned from assets',
                solution: '$11,025',
                hint: 'Asset 1: 100,000 × 0.045 × 1 = $4,500; Asset 2: 75,000 × 0.058 × 1.5 = $6,525; Total = $11,025'
            },
            {
                id: 'SI30-2',
                title: 'Calculate interest expense',
                description: 'Find total interest paid on liabilities',
                solution: '$13,440',
                hint: 'Liability 1: 120,000 × 0.068 × 1.25 = $10,200; Liability 2: 60,000 × 0.072 × 0.75 = $3,240; Total = $13,440'
            },
            {
                id: 'SI30-3',
                title: 'Calculate net interest position',
                description: 'Find the net interest cost or income',
                solution: 'Net cost: $2,415',
                hint: 'Net position = Income - Expense = $11,025 - $13,440 = -$2,415 (net cost)'
            }
        ],
        relatedExampleIds: ['W11-E10']
    },
    // W11-E11 Practice Problems: Advanced Simple Interest Applications
    {
        id: 'SI31',
        skill: 'Strategic Financial Analysis',
        type: 'practice',
        title: 'Technology Company Strategic Financing',
        description: 'A tech company needs $750,000 for R&D. Options: 1) Pay cash (lose 5.2% investment return), 2) Bank loan 7.5% for 3 years, 3) Equipment financing 6.8% for 4 years.',
        idealTime: 8,
        steps: [
            {
                id: 'SI31-1',
                title: 'Calculate opportunity cost of cash payment',
                description: 'Find lost investment return over 3 years',
                solution: '$117,000 opportunity cost',
                hint: 'Opportunity cost = 750,000 × 0.052 × 3 = $117,000; Annual cost = $39,000'
            },
            {
                id: 'SI31-2',
                title: 'Calculate bank loan cost',
                description: 'Find total interest for bank loan option',
                solution: '$168,750 interest cost',
                hint: 'Bank loan interest = 750,000 × 0.075 × 3 = $168,750; Annual cost = $56,250'
            },
            {
                id: 'SI31-3',
                title: 'Compare all options and recommend',
                description: 'Calculate equipment financing cost and make recommendation',
                solution: 'Pay cash: lowest annual cost',
                hint: 'Equipment financing: 750,000 × 0.068 × 4 = $204,000 (annual: $51,000). Pay cash has lowest annual cost at $39,000'
            }
        ],
        relatedExampleIds: ['W11-E11']
    },
    {
        id: 'SI32',
        skill: 'Cash Conversion Cycle Optimization',
        type: 'practice',
        title: 'Retail Chain Cash Flow Optimization',
        description: 'A retail chain can: extend supplier payments 20 days, offer 1.5/15 net 30 to customers, reduce inventory 10 days. Monthly sales $4M, purchases $2.5M. Analyze impact.',
        idealTime: 9,
        steps: [
            {
                id: 'SI32-1',
                title: 'Calculate supplier payment extension benefit',
                description: 'Find cash flow benefit from extended supplier terms',
                solution: '$2,192 annual savings',
                hint: 'Additional financing = 2,500,000 × (20/30) = $1,667,000 for 20 days; Savings = 1,667,000 × 0.06 × (20/365) = $5,479 if 6% cost'
            },
            {
                id: 'SI32-2',
                title: 'Analyze customer discount program',
                description: 'Calculate cost and benefit of customer discounts (assume 50% take discount)',
                solution: 'Net cost: $24,000 monthly',
                hint: 'Discount cost = 4,000,000 × 0.5 × 0.015 = $30,000/month; Cash benefit = 2,000,000 × 0.06 × (15/365) = $4,932; Net cost = $25,068'
            },
            {
                id: 'SI32-3',
                title: 'Calculate inventory reduction benefit',
                description: 'Find savings from inventory reduction',
                solution: '$66,667 annual savings',
                hint: 'Assuming 2 months inventory = $5,000,000; Reduction = 5,000,000 × (10/60) = $833,333; Annual savings = 833,333 × 0.08 = $66,667'
            }
        ],
        relatedExampleIds: ['W11-E11']
    },
    {
        id: 'SI33',
        skill: 'Complex Project Financing',
        type: 'practice',
        title: 'Manufacturing Project Financing Strategy',
        description: 'A manufacturer needs $3M for 6-year project. Options: 1) Construction loan 8.2% for 2 years, then permanent 7.8% for 4 years, 2) Bridge loan 9% for 18 months, then permanent 7.5% for 4.5 years.',
        idealTime: 8,
        steps: [
            {
                id: 'SI33-1',
                title: 'Calculate Option 1 total cost',
                description: 'Find combined cost of construction plus permanent financing',
                solution: '$1,428,000',
                hint: 'Construction: 3,000,000 × 0.082 × 2 = $492,000; Permanent: 3,000,000 × 0.078 × 4 = $936,000; Total = $1,428,000'
            },
            {
                id: 'SI33-2',
                title: 'Calculate Option 2 total cost',
                description: 'Find combined cost of bridge plus permanent financing',
                solution: '$1,417,500',
                hint: 'Bridge: 3,000,000 × 0.09 × 1.5 = $405,000; Permanent: 3,000,000 × 0.075 × 4.5 = $1,012,500; Total = $1,417,500'
            },
            {
                id: 'SI33-3',
                title: 'Compare options and analyze',
                description: 'Determine savings and consider strategic factors',
                solution: 'Option 2 saves $10,500',
                hint: 'Savings = $1,428,000 - $1,417,500 = $10,500. Small difference suggests choosing based on flexibility and risk factors rather than just cost'
            }
        ],
        relatedExampleIds: ['W11-E11']
    },
    // Compound Interest Examples 14-20 Practice Problems (CI7-CI27)
    // W11-E14 Practice Problems: Different Compounding Frequencies
    {
        id: 'CI7',
        skill: 'Compound Interest Frequency Comparison',
        type: 'practice',
        title: 'Law Firm Investment Portfolio Comparison',
        description: 'A law firm invests $15,000 at 7.5% annual interest. Compare results after 4 years with different compounding frequencies.',
        idealTime: 8,
        steps: [
            {
                id: 'CI7-1',
                title: 'Calculate annual compounding',
                description: 'Find future value with annual compounding (m=1)',
                solution: '$20,094.85',
                hint: 'A = 15,000(1 + 0.075/1)^(1×4) = 15,000(1.075)^4 = $20,094.85'
            },
            {
                id: 'CI7-2',
                title: 'Calculate quarterly compounding',
                description: 'Find future value with quarterly compounding (m=4)',
                solution: '$20,340.23',
                hint: 'A = 15,000(1 + 0.075/4)^(4×4) = 15,000(1.01875)^16 = $20,340.23'
            },
            {
                id: 'CI7-3',
                title: 'Calculate monthly compounding and compare',
                description: 'Find monthly compounding result and compare all options',
                solution: 'Monthly: $20,411.49',
                hint: 'A = 15,000(1 + 0.075/12)^(12×4) = 15,000(1.00625)^48 = $20,411.49; Monthly gives $316.64 more than annual'
            }
        ],
        relatedExampleIds: ['W11-E14']
    },
    {
        id: 'CI8',
        skill: 'Compound Interest Frequency Comparison',
        type: 'practice',
        title: 'Healthcare Practice Investment Decision',
        description: 'A medical practice has $25,000 to invest at 6.8% for 5 years. Compare semi-annual vs daily compounding (use 365 days).',
        idealTime: 6,
        steps: [
            {
                id: 'CI8-1',
                title: 'Calculate semi-annual compounding',
                description: 'Find future value with semi-annual compounding',
                solution: '$35,247.67',
                hint: 'A = 25,000(1 + 0.068/2)^(2×5) = 25,000(1.034)^10 = $35,247.67'
            },
            {
                id: 'CI8-2',
                title: 'Calculate daily compounding',
                description: 'Find future value with daily compounding',
                solution: '$35,572.48',
                hint: 'A = 25,000(1 + 0.068/365)^(365×5) = 25,000(1.000186)^1825 = $35,572.48'
            },
            {
                id: 'CI8-3',
                title: 'Calculate additional benefit',
                description: 'Find the extra benefit from daily vs semi-annual compounding',
                solution: '$324.81 additional',
                hint: 'Additional benefit = $35,572.48 - $35,247.67 = $324.81'
            }
        ],
        relatedExampleIds: ['W11-E14']
    },
    {
        id: 'CI9',
        skill: 'Compound Interest Frequency Comparison',
        type: 'practice',
        title: 'Engineering Firm Compounding Analysis',
        description: 'An engineering firm wants to invest $50,000 at 8% for 3 years. They can choose annual, quarterly, or continuous compounding. Calculate and recommend.',
        idealTime: 7,
        steps: [
            {
                id: 'CI9-1',
                title: 'Calculate annual and quarterly options',
                description: 'Find future values for annual (m=1) and quarterly (m=4) compounding',
                solution: 'Annual: $63,024.32, Quarterly: $63,537.49',
                hint: 'Annual: 50,000(1.08)^3 = $63,024.32; Quarterly: 50,000(1.02)^12 = $63,537.49'
            },
            {
                id: 'CI9-2',
                title: 'Calculate continuous compounding',
                description: 'Find future value with continuous compounding using A = Pe^(rt)',
                solution: '$63,684.43',
                hint: 'A = 50,000 × e^(0.08×3) = 50,000 × e^0.24 = 50,000 × 1.2737 = $63,684.43'
            },
            {
                id: 'CI9-3',
                title: 'Compare and make recommendation',
                description: 'Compare all options and determine incremental benefits',
                solution: 'Continuous best: $660.11 more than annual',
                hint: 'Continuous is best at $63,684.43, which is $660.11 more than annual and $146.94 more than quarterly'
            }
        ],
        relatedExampleIds: ['W11-E14']
    },
    // W11-E15 Practice Problems: Effective Annual Rate Calculations
    {
        id: 'CI10',
        skill: 'Effective Annual Rate Analysis',
        type: 'practice',
        title: 'Accounting Firm Investment Rate Comparison',
        description: 'An accounting firm is comparing: Option A: 9.2% compounded annually, Option B: 8.9% compounded monthly, Option C: 9.1% compounded quarterly. Which has the highest EAR?',
        idealTime: 7,
        steps: [
            {
                id: 'CI10-1',
                title: 'Calculate EAR for Option A',
                description: 'Find effective annual rate for annual compounding',
                solution: '9.2%',
                hint: 'For annual compounding, EAR = nominal rate = 9.2%'
            },
            {
                id: 'CI10-2',
                title: 'Calculate EAR for Option B',
                description: 'Find effective annual rate for monthly compounding',
                solution: '9.279%',
                hint: 'EAR = (1 + 0.089/12)^12 - 1 = (1.007417)^12 - 1 = 0.09279 = 9.279%'
            },
            {
                id: 'CI10-3',
                title: 'Calculate EAR for Option C and recommend',
                description: 'Find quarterly EAR and determine best option',
                solution: 'Option B: 9.279% (highest)',
                hint: 'Option C: EAR = (1 + 0.091/4)^4 - 1 = (1.02275)^4 - 1 = 9.374%. Option B has highest EAR at 9.279%'
            }
        ],
        relatedExampleIds: ['W11-E15']
    },
    {
        id: 'CI11',
        skill: 'Effective Annual Rate Analysis',
        type: 'practice',
        title: 'Real Estate Investment Trust Rate Analysis',
        description: 'A REIT is evaluating financing costs: Bank A offers 7.8% compounded semi-annually, Bank B offers 7.75% compounded weekly (52 times per year). Which is cheaper?',
        idealTime: 6,
        steps: [
            {
                id: 'CI11-1',
                title: 'Calculate EAR for Bank A',
                description: 'Find effective annual rate for semi-annual compounding',
                solution: '7.952%',
                hint: 'EAR = (1 + 0.078/2)^2 - 1 = (1.039)^2 - 1 = 0.07952 = 7.952%'
            },
            {
                id: 'CI11-2',
                title: 'Calculate EAR for Bank B',
                description: 'Find effective annual rate for weekly compounding',
                solution: '8.055%',
                hint: 'EAR = (1 + 0.0775/52)^52 - 1 = (1.001490)^52 - 1 = 0.08055 = 8.055%'
            },
            {
                id: 'CI11-3',
                title: 'Compare and recommend',
                description: 'Determine which bank offers the lower effective cost',
                solution: 'Bank A is cheaper',
                hint: 'Bank A: 7.952% vs Bank B: 8.055%. Bank A is cheaper by 0.103 percentage points'
            }
        ],
        relatedExampleIds: ['W11-E15']
    },
    {
        id: 'CI12',
        skill: 'Effective Annual Rate Analysis',
        type: 'practice',
        title: 'Manufacturing Company Credit Card Analysis',
        description: 'A manufacturer is analyzing business credit cards: Card A: 1.2% monthly (12 times per year), Card B: 14.9% compounded daily, Card C: 15.2% compounded annually. Find EARs.',
        idealTime: 8,
        steps: [
            {
                id: 'CI12-1',
                title: 'Calculate EAR for Card A',
                description: 'Find effective rate for monthly compounding at 1.2% per month',
                solution: '15.39%',
                hint: 'Annual nominal = 1.2% × 12 = 14.4%; EAR = (1.012)^12 - 1 = 0.1539 = 15.39%'
            },
            {
                id: 'CI12-2',
                title: 'Calculate EAR for Card B',
                description: 'Find effective rate for daily compounding',
                solution: '16.06%',
                hint: 'EAR = (1 + 0.149/365)^365 - 1 = (1.000408)^365 - 1 = 0.1606 = 16.06%'
            },
            {
                id: 'CI12-3',
                title: 'Compare all cards and rank',
                description: 'Compare Card C and rank all options',
                solution: 'Best to worst: A (15.39%), C (15.2%), B (16.06%)',
                hint: 'Card C EAR = 15.2% (already annual). Ranking: Card A: 15.39%, Card C: 15.2% (best), Card B: 16.06% (worst)'
            }
        ],
        relatedExampleIds: ['W11-E15']
    },
    // W11-E16 Practice Problems: Finding Time with Compound Interest
    {
        id: 'CI13',
        skill: 'Solving for Time Period',
        type: 'practice',
        title: 'Dental Practice Equipment Fund',
        description: 'A dental practice invests $18,000 at 6.5% compounded semi-annually. How long until it reaches $28,000?',
        idealTime: 7,
        steps: [
            {
                id: 'CI13-1',
                title: 'Set up the compound interest equation',
                description: 'Express the problem using A = P(1 + i)^n',
                solution: '28,000 = 18,000(1.0325)^n',
                hint: 'i = 0.065/2 = 0.0325; 28,000 = 18,000(1.0325)^n where n is semi-annual periods'
            },
            {
                id: 'CI13-2',
                title: 'Isolate and solve using logarithms',
                description: 'Solve for n using natural logarithms',
                solution: 'n = 14.24 periods',
                hint: '1.5556 = (1.0325)^n; ln(1.5556) = n × ln(1.0325); n = 0.4418/0.0320 = 14.24 periods'
            },
            {
                id: 'CI13-3',
                title: 'Convert to years',
                description: 'Convert semi-annual periods to years',
                solution: '7.12 years',
                hint: 'Time = 14.24/2 = 7.12 years = 7 years and 1.4 months'
            }
        ],
        relatedExampleIds: ['W11-E16']
    },
    {
        id: 'CI14',
        skill: 'Solving for Time Period',
        type: 'practice',
        title: 'Software Company Growth Target',
        description: 'A software company wants their $35,000 investment to triple at 8.2% compounded quarterly. How long will this take?',
        idealTime: 6,
        steps: [
            {
                id: 'CI14-1',
                title: 'Set up tripling equation',
                description: 'Express the tripling condition mathematically',
                solution: '105,000 = 35,000(1.0205)^n',
                hint: 'Target amount = 3 × 35,000 = $105,000; i = 0.082/4 = 0.0205'
            },
            {
                id: 'CI14-2',
                title: 'Solve for number of quarters',
                description: 'Use logarithms to find n',
                solution: 'n = 54.15 quarters',
                hint: '3 = (1.0205)^n; ln(3) = n × ln(1.0205); n = 1.0986/0.0203 = 54.15 quarters'
            },
            {
                id: 'CI14-3',
                title: 'Convert to years and months',
                description: 'Express the time in years and months',
                solution: '13.54 years',
                hint: 'Time = 54.15/4 = 13.54 years = 13 years and 6.5 months'
            }
        ],
        relatedExampleIds: ['W11-E16']
    },
    {
        id: 'CI15',
        skill: 'Solving for Time Period',
        type: 'practice',
        title: 'Consulting Firm Retirement Planning',
        description: 'A consulting firm invests $85,000 at 7.8% compounded monthly for retirement. When will it reach $200,000?',
        idealTime: 8,
        steps: [
            {
                id: 'CI15-1',
                title: 'Calculate monthly periodic rate',
                description: 'Find the monthly interest rate',
                solution: 'i = 0.0065',
                hint: 'Monthly rate i = 0.078/12 = 0.0065'
            },
            {
                id: 'CI15-2',
                title: 'Set up and solve equation',
                description: 'Solve 200,000 = 85,000(1.0065)^n for n',
                solution: 'n = 139.7 months',
                hint: '2.3529 = (1.0065)^n; ln(2.3529) = n × ln(1.0065); n = 0.8556/0.0065 = 131.6 months'
            },
            {
                id: 'CI15-3',
                title: 'Convert to years',
                description: 'Express the time in years',
                solution: '11.64 years',
                hint: 'Time = 139.7/12 = 11.64 years = 11 years and 7.7 months'
            }
        ],
        relatedExampleIds: ['W11-E16']
    },
    // W11-E17 Practice Problems: Finding Rate with Compound Interest
    {
        id: 'CI16',
        skill: 'Solving for Interest Rate',
        type: 'practice',
        title: 'Architecture Firm Investment Return',
        description: 'An architecture firm invested $22,000 which grew to $34,500 in 5 years with quarterly compounding. What was the annual interest rate?',
        idealTime: 7,
        steps: [
            {
                id: 'CI16-1',
                title: 'Set up the compound interest equation',
                description: 'Express using A = P(1 + r/m)^(mt)',
                solution: '34,500 = 22,000(1 + r/4)^20',
                hint: 'n = 4 × 5 = 20 quarters; 34,500 = 22,000(1 + r/4)^20'
            },
            {
                id: 'CI16-2',
                title: 'Isolate the compound factor',
                description: 'Solve for (1 + r/4)',
                solution: '(1 + r/4) = 1.0914',
                hint: '34,500/22,000 = (1 + r/4)^20; 1.5682 = (1 + r/4)^20; (1 + r/4) = (1.5682)^(1/20) = 1.0914'
            },
            {
                id: 'CI16-3',
                title: 'Calculate annual interest rate',
                description: 'Find the annual rate r',
                solution: '8.56%',
                hint: 'r/4 = 1.0914 - 1 = 0.0914; r = 4 × 0.0914 = 0.0856 = 8.56%'
            }
        ],
        relatedExampleIds: ['W11-E17']
    },
    {
        id: 'CI17',
        skill: 'Solving for Interest Rate',
        type: 'practice',
        title: 'Pharmaceutical Company Investment Analysis',
        description: 'A pharmaceutical company\'s $75,000 investment became $125,000 in 6 years with monthly compounding. Find the annual rate.',
        idealTime: 8,
        steps: [
            {
                id: 'CI17-1',
                title: 'Calculate growth factor',
                description: 'Find the ratio of final to initial amount',
                solution: '1.6667',
                hint: 'Growth factor = 125,000/75,000 = 1.6667'
            },
            {
                id: 'CI17-2',
                title: 'Find monthly compound factor',
                description: 'Calculate (1 + r/12) using the 72nd root',
                solution: '1.008498',
                hint: 'Total periods n = 12 × 6 = 72; (1 + r/12) = (1.6667)^(1/72) = 1.008498'
            },
            {
                id: 'CI17-3',
                title: 'Calculate annual interest rate',
                description: 'Find the annual rate from the monthly rate',
                solution: '10.20%',
                hint: 'Monthly rate = 1.008498 - 1 = 0.008498; Annual rate = 0.008498 × 12 = 0.1020 = 10.20%'
            }
        ],
        relatedExampleIds: ['W11-E17']
    },
    {
        id: 'CI18',
        skill: 'Solving for Interest Rate',
        type: 'practice',
        title: 'Transportation Company Fleet Investment',
        description: 'A transportation company invested $180,000 in fleet improvements. After 4.5 years with semi-annual compounding, it was worth $275,000. Find the rate.',
        idealTime: 7,
        steps: [
            {
                id: 'CI18-1',
                title: 'Calculate total compounding periods',
                description: 'Find total number of semi-annual periods',
                solution: 'n = 9 periods',
                hint: 'Semi-annual periods = 2 × 4.5 years = 9 periods'
            },
            {
                id: 'CI18-2',
                title: 'Find semi-annual compound factor',
                description: 'Calculate (1 + r/2) from the growth',
                solution: '1.0607',
                hint: '275,000 = 180,000(1 + r/2)^9; (1 + r/2) = (275,000/180,000)^(1/9) = (1.5278)^(1/9) = 1.0607'
            },
            {
                id: 'CI18-3',
                title: 'Calculate annual interest rate',
                description: 'Convert semi-annual rate to annual rate',
                solution: '12.14%',
                hint: 'Semi-annual rate = 1.0607 - 1 = 0.0607; Annual rate = 2 × 0.0607 = 0.1214 = 12.14%'
            }
        ],
        relatedExampleIds: ['W11-E17']
    },
    // W11-E18 Practice Problems: Compound Interest Business Applications
    {
        id: 'CI19',
        skill: 'Complex Business Applications',
        type: 'practice',
        title: 'Biotechnology Company Research Fund',
        description: 'A biotech company needs $75,000 for research in 5 years. They invest $25,000 today at 9.5% quarterly compounding. What quarterly payment for the last 3 years will meet their goal?',
        idealTime: 9,
        steps: [
            {
                id: 'CI19-1',
                title: 'Calculate future value of initial investment',
                description: 'Find what $25,000 grows to in 5 years',
                solution: '$39,516.72',
                hint: 'i = 0.095/4 = 0.02375; n = 4 × 5 = 20; FV = 25,000(1.02375)^20 = $39,516.72'
            },
            {
                id: 'CI19-2',
                title: 'Calculate remaining need',
                description: 'Find how much more is needed from quarterly payments',
                solution: '$35,483.28',
                hint: 'Remaining need = $75,000 - $39,516.72 = $35,483.28'
            },
            {
                id: 'CI19-3',
                title: 'Calculate required quarterly payment',
                description: 'Find quarterly payment needed for last 3 years (12 payments)',
                solution: '$2,571.88',
                hint: 'Using FV annuity: PMT = 35,483.28/[(1.02375^12 - 1)/0.02375] = 35,483.28/13.806 = $2,571.88'
            }
        ],
        relatedExampleIds: ['W11-E18']
    },
    {
        id: 'CI20',
        skill: 'Complex Business Applications',
        type: 'practice',
        title: 'Renewable Energy Company Equipment Planning',
        description: 'A renewable energy company plans to replace equipment costing $120,000 in 7 years. They can invest at 7.8% monthly compounding. How much monthly for 5 years starting year 3?',
        idealTime: 10,
        steps: [
            {
                id: 'CI20-1',
                title: 'Calculate present value of equipment cost',
                description: 'Find present value of $120,000 needed in 7 years',
                solution: '$69,286.35',
                hint: 'i = 0.078/12 = 0.0065; n = 12 × 7 = 84; PV = 120,000/(1.0065)^84 = $69,286.35'
            },
            {
                id: 'CI20-2',
                title: 'Calculate value needed from monthly payments',
                description: 'Find present value at start of year 3 (24 months from now)',
                solution: '$59,572.42',
                hint: 'Value needed in 24 months = 69,286.35/(1.0065)^24 = $59,572.42'
            },
            {
                id: 'CI20-3',
                title: 'Calculate required monthly payment',
                description: 'Find monthly payment for 5 years (60 payments)',
                solution: '$734.58',
                hint: 'Using PV annuity: PMT = 59,572.42/[1-(1.0065)^(-60)]/0.0065] = 59,572.42/81.097 = $734.58'
            }
        ],
        relatedExampleIds: ['W11-E18']
    },
    {
        id: 'CI21',
        skill: 'Complex Business Applications',
        type: 'practice',
        title: 'Food Processing Company Expansion Fund',
        description: 'A food processor needs $200,000 in 8 years for expansion. They invest $40,000 today and plan equal annual investments starting year 2. At 8.4% annual compounding, find annual payment.',
        idealTime: 8,
        steps: [
            {
                id: 'CI21-1',
                title: 'Calculate future value of initial investment',
                description: 'Find what $40,000 becomes in 8 years',
                solution: '$77,287.32',
                hint: 'FV = 40,000(1.084)^8 = 40,000(1.9322) = $77,287.32'
            },
            {
                id: 'CI21-2',
                title: 'Calculate remaining need',
                description: 'Find amount needed from annual payments',
                solution: '$122,712.68',
                hint: 'Remaining = $200,000 - $77,287.32 = $122,712.68'
            },
            {
                id: 'CI21-3',
                title: 'Calculate required annual payment',
                description: 'Find annual payment for 7 years (years 2-8)',
                solution: '$12,756.89',
                hint: 'Using FV annuity for 7 payments: PMT = 122,712.68/[(1.084^7 - 1)/0.084] = 122,712.68/9.620 = $12,756.89'
            }
        ],
        relatedExampleIds: ['W11-E18']
    },
    // W11-E19 Practice Problems: Investment Growth Analysis
    {
        id: 'CI22',
        skill: 'Portfolio Growth Analysis',
        type: 'practice',
        title: 'Investment Advisory Retirement Strategy',
        description: 'An investment advisor compares 30-year strategies for $40,000: Conservative 4.5% annually, Moderate 6.5% semi-annually, Aggressive 8.5% quarterly. Analyze outcomes.',
        idealTime: 8,
        steps: [
            {
                id: 'CI22-1',
                title: 'Calculate conservative strategy outcome',
                description: 'Find future value at 4.5% annual compounding',
                solution: '$153,014.45',
                hint: 'FV = 40,000(1.045)^30 = 40,000(3.8254) = $153,014.45'
            },
            {
                id: 'CI22-2',
                title: 'Calculate moderate strategy outcome',
                description: 'Find future value at 6.5% semi-annual compounding',
                solution: '$295,677.75',
                hint: 'FV = 40,000(1.0325)^60 = 40,000(7.3919) = $295,677.75'
            },
            {
                id: 'CI22-3',
                title: 'Calculate aggressive strategy and compare',
                description: 'Find aggressive outcome and analyze risk-return differences',
                solution: 'Aggressive: $565,712.60',
                hint: 'FV = 40,000(1.02125)^120 = 40,000(14.143) = $565,712.60; Aggressive earns $412,698.15 more than conservative!'
            }
        ],
        relatedExampleIds: ['W11-E19']
    },
    {
        id: 'CI23',
        skill: 'Portfolio Growth Analysis',
        type: 'practice',
        title: 'Wealth Management Doubling Analysis',
        description: 'A wealth management firm analyzes how long $100,000 takes to double under different strategies: 5.5% annually, 7% quarterly, 9% monthly.',
        idealTime: 9,
        steps: [
            {
                id: 'CI23-1',
                title: 'Calculate doubling time for 5.5% annual',
                description: 'Find when investment doubles at 5.5% annually',
                solution: '12.95 years',
                hint: '2 = (1.055)^t; t = ln(2)/ln(1.055) = 0.6931/0.0535 = 12.95 years'
            },
            {
                id: 'CI23-2',
                title: 'Calculate doubling time for 7% quarterly',
                description: 'Find when investment doubles at 7% quarterly compounding',
                solution: '9.93 years',
                hint: '2 = (1.0175)^n; n = ln(2)/ln(1.0175) = 39.73 quarters = 9.93 years'
            },
            {
                id: 'CI23-3',
                title: 'Calculate doubling time for 9% monthly',
                description: 'Find when investment doubles at 9% monthly compounding',
                solution: '7.73 years',
                hint: '2 = (1.0075)^n; n = ln(2)/ln(1.0075) = 92.76 months = 7.73 years'
            }
        ],
        relatedExampleIds: ['W11-E19']
    },
    {
        id: 'CI24',
        skill: 'Portfolio Growth Analysis',
        type: 'practice',
        title: 'Corporate Treasury Risk-Return Analysis',
        description: 'A corporation\'s treasury has $500,000. Compare: Safe 3.8% annually, Balanced 5.2% semi-annually, Growth 7.8% quarterly over 15 years. Include risk analysis.',
        idealTime: 10,
        steps: [
            {
                id: 'CI24-1',
                title: 'Calculate all strategy outcomes',
                description: 'Find future values for all three strategies',
                solution: 'Safe: $890,542, Balanced: $1,089,765, Growth: $1,598,234',
                hint: 'Safe: 500,000(1.038)^15 = $890,542; Balanced: 500,000(1.026)^30 = $1,089,765; Growth: 500,000(1.0195)^60 = $1,598,234'
            },
            {
                id: 'CI24-2',
                title: 'Calculate incremental returns',
                description: 'Find additional returns from higher risk strategies',
                solution: 'Balanced: +$199,223, Growth: +$707,692',
                hint: 'Balanced advantage = $1,089,765 - $890,542 = $199,223; Growth advantage = $1,598,234 - $890,542 = $707,692'
            },
            {
                id: 'CI24-3',
                title: 'Analyze risk-adjusted returns',
                description: 'Calculate return per unit of additional risk',
                solution: 'Growth provides $174,476 per 1% additional risk',
                hint: 'Growth has 4% more risk (7.8% - 3.8%) for $707,692 more return = $176,923 per 1% risk; Balanced: $142,302 per 1% risk'
            }
        ],
        relatedExampleIds: ['W11-E19']
    },
    // W11-E20 Practice Problems: Advanced Compound Interest Scenarios
    {
        id: 'CI25',
        skill: 'Advanced Multi-Component Analysis',
        type: 'practice',
        title: 'Technology Startup Complex Funding Plan',
        description: 'A tech startup plans: $50,000 today at 9% monthly, $10,000 every year starting year 1, $15,000 lump sum in year 3. Need $250,000 in 6 years. Will they succeed?',
        idealTime: 12,
        steps: [
            {
                id: 'CI25-1',
                title: 'Calculate future value of initial investment',
                description: 'Find FV of $50,000 at 9% monthly for 6 years',
                solution: '$85,518.27',
                hint: 'FV = 50,000(1 + 0.09/12)^(12×6) = 50,000(1.0075)^72 = $85,518.27'
            },
            {
                id: 'CI25-2',
                title: 'Calculate future value of annual payments',
                description: 'Find FV of $10,000 annual payments for 6 years',
                solution: '$81,152.91',
                hint: 'Annual effective rate = (1.0075)^12 - 1 = 9.38%; FV annuity = 10,000 × [(1.0938)^6 - 1]/0.0938 = $81,152.91'
            },
            {
                id: 'CI25-3',
                title: 'Calculate total and determine success',
                description: 'Add year 3 lump sum FV and compare to goal',
                solution: 'Total: $194,107, Goal not met',
                hint: 'Year 3 lump sum FV = 15,000(1.0938)^3 = $19,436; Total = $85,518 + $81,153 + $19,436 = $186,107; Shortfall: $63,893'
            }
        ],
        relatedExampleIds: ['W11-E20']
    },
    {
        id: 'CI26',
        skill: 'Advanced Multi-Component Analysis',
        type: 'practice',
        title: 'Manufacturing Company Capital Accumulation',
        description: 'A manufacturer plans: $80,000 now at 7.5% quarterly, $20,000 semi-annually starting month 6, target $400,000 in 8 years. What additional lump sum needed in year 4?',
        idealTime: 15,
        steps: [
            {
                id: 'CI26-1',
                title: 'Calculate FV of initial investment',
                description: 'Find what $80,000 grows to in 8 years',
                solution: '$149,857.28',
                hint: 'FV = 80,000(1 + 0.075/4)^(4×8) = 80,000(1.01875)^32 = $149,857.28'
            },
            {
                id: 'CI26-2',
                title: 'Calculate FV of semi-annual payments',
                description: 'Find FV of 15 payments of $20,000 each',
                solution: '$433,284.67',
                hint: 'Semi-annual rate = (1.01875)^2 - 1 = 3.79%; 15 payments; FV = 20,000 × [(1.0379)^15 - 1]/0.0379 = $433,284.67'
            },
            {
                id: 'CI26-3',
                title: 'Calculate required additional lump sum',
                description: 'Find lump sum needed in year 4 to reach $400,000',
                solution: 'Need deficit coverage first',
                hint: 'Current plan gives $583,142 which exceeds $400,000 goal by $183,142. No additional lump sum needed - plan overshoots target!'
            }
        ],
        relatedExampleIds: ['W11-E20']
    },
    {
        id: 'CI27',
        skill: 'Advanced Multi-Component Analysis',
        type: 'practice',
        title: 'Healthcare System Strategic Financial Planning',
        description: 'A healthcare system has complex needs: $100,000 today, $25,000 annually for 10 years, $50,000 in year 5. At 8.2% semi-annual compounding, compare with $750,000 lump sum today.',
        idealTime: 12,
        steps: [
            {
                id: 'CI27-1',
                title: 'Calculate present value of all payments',
                description: 'Find PV of the complex payment stream',
                solution: '$100,000 + $168,776 + $33,467 = $302,243',
                hint: 'Semi-annual rate = 4.1%; Annual effective = 8.3281%; PV of annuity = 25,000 × [1-(1.083281)^-10]/0.083281 = $168,776; PV of year 5 payment = 50,000/(1.083281)^5 = $33,467'
            },
            {
                id: 'CI27-2',
                title: 'Calculate future values at year 10',
                description: 'Find what each option is worth in 10 years',
                solution: 'Payment stream: $687,356, Lump sum: $1,706,729',
                hint: 'Payment stream FV = 302,243(1.083281)^10 = $687,356; Lump sum FV = 750,000(1.083281)^10 = $1,706,729'
            },
            {
                id: 'CI27-3',
                title: 'Analyze the strategic choice',
                description: 'Determine which option provides better financial outcome',
                solution: 'Lump sum better by $1,019,373',
                hint: 'Lump sum advantage = $1,706,729 - $687,356 = $1,019,373. The lump sum is significantly better despite the complex payment structure.'
            }
        ],
        relatedExampleIds: ['W11-E20']
    }
];