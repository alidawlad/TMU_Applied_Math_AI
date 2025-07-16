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
    }
];