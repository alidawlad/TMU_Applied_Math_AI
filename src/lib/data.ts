import type { Lecture } from '@/lib/types';

export const lectures: Lecture[] = [
  {
    id: 'lecture-4',
    title: 'Lecture 4: Linear Functions and Modeling',
    modules: [
      {
        id: 'module-1-linear-foundations',
        name: 'Linear Functions & Advanced Algebra',
        description: 'Mastering function domains, advanced algebraic manipulation, and the core principles of linear equations.',
        problems: [
          {
            id: 'L4-S1-P1',
            title: 'Advanced Algebraic Manipulation: The Difference Quotient',
            description:
              "Let's try a harder version. If $f(x) = \\frac{x}{x+1}$, find and simplify $\\frac{f(x+h) - f(x)}{h}$.",
            steps: [
              {
                id: 1,
                title: 'Combine Fractions in the Numerator',
                description:
                  "First, set up the numerator $f(x+h) - f(x)$. To combine these two rational expressions, you'll need to find a common denominator.",
                solution: '(h)/((x+1)*(x+h+1))',
                hint: "The common denominator is the product of the two individual denominators: $(x+h+1)(x+1)$. Cross-multiply to get the new numerator."
              },
              {
                id: 2,
                title: 'Final Division',
                description:
                  "Now, take the fraction you found in the previous step and divide the entire expression by $h$.",
                solution: '1/((x+1)*(x+h+1))',
                hint: "Dividing by 'h' is the same as multiplying by '1/h'. The 'h' term in your numerator should cancel out."
              },
            ],
          },
          {
            id: 'L4-S2-LEAD',
            title: 'Finding Complex Domains',
            description:
              "Let's master finding the domain for complex functions. Find the domain of $f(x) = \\frac{\\sqrt{x-2}}{x-3}$.",
            steps: [
              {
                id: 1,
                title: 'Analyze the Numerator',
                description:
                  'The numerator contains a square root. The expression inside a square root cannot be negative. What condition does this place on $x$?',
                solution: 'x >= 2',
                hint: "Set the expression inside the square root to be 'greater than or equal to' zero and solve."
              },
              {
                id: 2,
                title: 'Analyze the Denominator',
                description:
                  'The denominator of a fraction cannot be zero. What condition does this place on $x$?',
                solution: 'x != 3',
                hint: "Set the denominator expression 'not equal to' zero and solve."
              },
              {
                id: 3,
                title: 'Combine the Conditions',
                description:
                  'You need all numbers where $x \\ge 2$ AND $x \\ne 3$. How do you write this using interval notation?',
                solution: '[2,3) U (3,inf)',
                hint: "The square bracket `[` means 'inclusive', while the parenthesis `(` means 'exclusive'. The `U` symbol stands for 'union'."
              },
            ],
          },
          {
            id: 'L4-S2-P1',
            title: 'Finding Complex Domains',
            description:
              "Let's practice with a slight twist. Find the domain of the function $f(x) = \\frac{x+1}{\\sqrt{x-2}}$.",
            steps: [
              {
                id: 1,
                title: 'Analyze the Denominator',
                description:
                  'The denominator contains a square root. This gives us two conditions simultaneously: the expression inside the root must be non-negative, AND the denominator itself cannot be zero. What single inequality combines both of these conditions?',
                solution: 'x - 2 > 0',
                hint: "In the lead example, we used `>=`. Why must we use strictly `>` here?"
              },
              {
                id: 2,
                title: 'Solve and State the Domain',
                description:
                  'Solve the inequality from the previous step and state the final domain in interval notation.',
                solution: '(2,inf)',
                hint: "Since the inequality is strict, the interval will use a parenthesis, not a square bracket."
              },
            ],
          },
        ],
      },
      {
        id: 'module-2-linear-modeling',
        name: 'Modeling with Linear Functions',
        description: 'Translate real-world scenarios into linear equations to make predictions. Master parallel and perpendicular lines.',
        problems: [
          {
            id: 'L4-S3-LEAD',
            title: 'Modeling with Linear Functions',
            description:
              "A machine was purchased for \\$120,000 and is depreciated linearly to a value of \\$0 over 10 years. Let's find the linear function $V(n)$ for its value after $n$ years.",
            steps: [
              {
                id: 1,
                title: 'Identify the Data Points',
                description:
                  "We have two points in time that give us the machine's value. What are these two points in the form $(n, V)$?",
                solution: '(0, 120000) and (10, 0)',
                hint: "The 'purchase' is at year 0. The 'end of life' is at year 10."
              },
              {
                id: 2,
                title: 'Calculate the Slope (Rate of Depreciation)',
                description:
                  'Using the two points, calculate the slope of the line, which represents the rate at which the machine loses value each year.',
                solution: '-12000',
                hint: "Use the formula $m = (V_2 - V_1) / (n_2 - n_1)$. You should get a negative number."
              },
              {
                id: 3,
                title: 'Determine the y-intercept',
                description:
                  'The y-intercept `b` is the value of the function when $n=0$. What is the y-intercept?',
                solution: '120000',
                hint: "One of your data points from Step 1 gives you this answer directly."
              },
              {
                id: 4,
                title: 'Write the Final Equation',
                description:
                  'Now, assemble the slope `m` and y-intercept `b` into the final linear equation $V(n) = mn + b$.',
                solution: 'V(n) = -12000n + 120000',
                hint: "Make sure the slope is negative."
              },
              {
                id: 5,
                title: 'Use the Model',
                description: 'What is the book value of the machine at the end of the 6th year?',
                solution: '48000',
                hint: "Substitute n=6 into your equation from the previous step.",
                calculator_callout: {
                  title: 'TI-Nspire Tip',
                  description:
                    'In a Calculator page, define your function by typing `v(n) := -12000*n + 120000`. Then, simply type `v(6)` and press enter to get the answer instantly.',
                },
              },
            ],
          },
          {
            id: 'L4-S3-P1',
            title: 'Modeling with Linear Functions',
            description:
              'The number of pay phones (in millions) was 1.3 in 2004 (year $x=0$) and 0.55 in 2009 (year $x=5$). Assume the trend is linear. Find the equation and predict the number of phones in 2012.',
            steps: [
              {
                id: 1,
                title: 'Identify Data Points',
                description: 'What are the two points in the form $(x, y)$?',
                solution: '(0, 1.3) and (5, 0.55)',
                hint: "The problem directly gives you the x and y values for the two years."
              },
              {
                id: 2,
                title: 'Calculate the Slope',
                description:
                  'Calculate the rate of change in the number of pay phones per year.',
                solution: '-0.15',
                hint: "The slope will be negative since the number of phones is decreasing."
              },
              {
                id: 3,
                title: 'Write the Final Equation',
                description:
                  'Assemble the slope and y-intercept into the final linear equation $y=mx+b$.',
                solution: 'y = -0.15x + 1.3',
                hint: "The y-intercept is given by the point where x=0."
              },
              {
                id: 4,
                title: 'Make a Prediction',
                description:
                  'What is the correct value of $x$ for the year 2012? Use that value in your equation to predict the number of pay phones (in millions).',
                solution: '0.1',
                hint: "The year 2012 is 8 years after 2004, so $x=8$. The final answer represents 0.1 million.",
                calculator_callout: {
                    title: 'TI-Nspire Tip',
                    description: 'Define your function, then evaluate it for the correct x.'
                }
              },
            ],
          },
          {
            id: 'L4-S3-P2',
            title: 'Modeling with Linear Functions',
            description:
              'A linear function $f(x)=ax+b$ has the values $f(-1)=0$ and $f(1)=4$. Find the values of $a$ and $b$.',
            steps: [
              {
                id: 1,
                title: 'Set up a System of Equations',
                description:
                  'Use the two given conditions to create a system of two linear equations with the variables $a$ and $b$.',
                solution: '-a+b=0 and a+b=4',
                hint: "Substitute x=-1 and f(x)=0 into the main equation for your first equation, and x=1 and f(x)=4 for the second."
              },
              {
                id: 2,
                title: 'Solve the System',
                description:
                  'Solve the system of equations you just created to find the values of $a$ and $b$.',
                solution: 'a=2, b=2',
                hint: "You can use substitution or elimination. Adding the two equations together is a very fast way to solve this particular system.",
                calculator_callout: {
                  title: 'TI-Nspire Tip',
                  description:
                    'This is a perfect use case for the system solver. Go to **menu > Algebra > Solve System of Linear Equations** to solve for $a$ and $b$ instantly.',
                },
              },
            ],
          },
           {
            id: 'L4-S3-P3-Perp',
            title: 'Modeling with Linear Functions (Parallel & Perpendicular)',
            description: 'Determine the value(s) of a such that the lines $L_1: a^2x+2y+1=0$ and $L_2: 4x+ay-1=0$ are **perpendicular**.',
            steps: [
                {
                    id: 1,
                    title: 'Find the Slope of Line 1',
                    description: 'First, rearrange the equation for $L_1$ into the slope-intercept form ($y=m_1x+b$). What is the slope, $m_1$?',
                    solution: '-a^2/2',
                    hint: "Isolate the 'y' term on one side of the equation and then divide by its coefficient."
                },
                {
                    id: 2,
                    title: 'Find the Slope of Line 2',
                    description: "Now, do the same for $L_2$. Rearrange its equation to find the slope, $m_2$.",
                    solution: '-4/a',
                    hint: "Be careful when dividing by 'a'."
                },
                {
                    id: 3,
                    title: 'Apply the Perpendicular Condition',
                    description: "The condition for perpendicular lines is $m_1 \\cdot m_2 = -1$. Set up this equation using the slopes you found.",
                    solution: "(-a^2/2)*(-4/a) = -1",
                    hint: "Make sure you set the product of the slopes equal to negative one."
                },
                {
                    id: 4,
                    title: 'Solve for a',
                    description: "Simplify and solve the equation from the previous step to find the value of $a$.",
                    solution: "-1/2",
                    hint: "Be very careful with your algebraic simplification. The 'a' in the denominator will cancel with one of the 'a's in the numerator."
                }
            ]
        }
        ],
      },
      {
        id: 'module-3-parallel-perpendicular-lines',
        name: 'Parallel & Perpendicular Lines',
        description: 'Mastering the rules of parallel and perpendicular slopes to solve for unknown variables and find specific line equations.',
        problems: [
            {
                id: 'L4-S4-LEAD',
                title: 'Solving for Parameters with Parallel/Perpendicular Rules',
                description: "This is a top-tier exam problem. Determine the value(s) of the parameter 'a' such that the lines $L_1: a^2x+2y+1=0$ and $L_2: 4x+ay-1=0$ are **parallel**.",
                steps: [
                    {
                        id: 1,
                        title: 'Find the Slope of Line 1',
                        description: 'First, rearrange the equation for $L_1$ into the slope-intercept form ($y=m_1x+b$). What is the slope, $m_1$?',
                        solution: '-a^2/2',
                        hint: "Isolate the 'y' term on one side of the equation and then divide by its coefficient, 2."
                    },
                    {
                        id: 2,
                        title: 'Find the Slope of Line 2',
                        description: "Now, do the same for $L_2$. Rearrange its equation to find the slope, $m_2$.",
                        solution: '-4/a',
                        hint: "Be careful when dividing by 'a'. Remember that 'a' cannot be zero."
                    },
                    {
                        id: 3,
                        title: 'Apply the Parallel Condition',
                        description: 'The condition for parallel lines is $m_1 = m_2$. Set up this equation using the two slopes you found.',
                        solution: '-a^2/2 = -4/a',
                        hint: 'Make sure you set the two slope expressions equal to each other.'
                    },
                    {
                        id: 4,
                        title: "Solve for 'a'",
                        description: "Simplify and solve the equation from the previous step to find the value of $a$.",
                        solution: '2',
                        hint: 'Multiply both sides by `2a` to clear the denominators. This should result in a simple cubic equation: $a^3=8$.',
                        calculator_callout: {
                            title: 'TI-Nspire Tip',
                            description: 'On a Calculator page, you can use the nSolve command. Type `nSolve(-a^2/2 = -4/a, a)` and press enter.'
                        }
                    }
                ]
            },
            {
                id: 'L4-S4-P1',
                title: 'Applying Parallel/Perpendicular Rules',
                description: 'Find the equation of the line that passes through the point $(1,1)$ and is **parallel** to the line joining points $(2, 4)$ and $(4,7)$.',
                steps: [
                    {
                        id: 1,
                        title: 'Find the Slope of the Given Line',
                        description: 'First, calculate the slope of the line that passes through $(2, 4)$ and $(4,7)$.',
                        solution: '3/2',
                        hint: 'Use the slope formula $m = (y_2 - y_1) / (x_2 - x_1)$.'
                    },
                    {
                        id: 2,
                        title: 'Determine the Slope of the Parallel Line',
                        description: 'A line parallel to the given line will have the same slope. What is the slope of the line we need to find?',
                        solution: '3/2',
                        hint: 'Parallel lines have equal slopes.'
                    },
                    {
                        id: 3,
                        title: 'Write the Equation of the New Line',
                        description: 'Now use the point-slope form, $y - y_1 = m(x - x_1)$, with the point $(1,1)$ and the slope you just found to write the final equation.',
                        solution: 'y - 1 = 3/2(x - 1)',
                        hint: 'Substitute m = 3/2, x1 = 1, and y1 = 1 into the point-slope formula.'
                    }
                ]
            },
            {
                id: 'L4-S4-P2',
                title: 'Applying Parallel/Perpendicular Rules',
                description: 'Find an equation of the line that passes through the point $(2,4)$ and is **perpendicular** to the line $3x+4y-22=0$.',
                steps: [
                    {
                        id: 1,
                        title: 'Find the Slope of the Given Line',
                        description: 'The given line is in general form. Rearrange the equation $3x+4y-22=0$ into the slope-intercept form ($y=mx+b$) to find its slope.',
                        solution: '-3/4',
                        hint: 'Start by isolating the `4y` term on one side of the equation.'
                    },
                    {
                        id: 2,
                        title: 'Determine the Slope of the Perpendicular Line',
                        description: 'The slope of a perpendicular line is the negative reciprocal of the original slope. Calculate this new slope.',
                        solution: '4/3',
                        hint: 'To find the negative reciprocal, flip the fraction and change its sign.'
                    },
                    {
                        id: 3,
                        title: 'Write the Equation of the New Line',
                        description: 'Use the point-slope form, $y - y_1 = m(x - x_1)$, with the point $(2,4)$ and the perpendicular slope you just found.',
                        solution: 'y - 4 = 4/3(x - 2)',
                        hint: 'You have the point and the perpendicular slope. Now just plug them into the formula.'
                    }
                ]
            },
            {
                id: 'L4-S4-P3',
                title: 'Applying Parallel/Perpendicular Rules',
                description: 'This problem combines multiple skills. Find the equation of the line that passes through $(-\\frac{1}{2},1)$ and $(1,-1)$ and express it in all three forms.',
                steps: [
                    {
                        id: 1,
                        title: 'Calculate the Slope',
                        description: 'First, calculate the slope of the line passing through the two given points.',
                        solution: '-4/3',
                        hint: 'Be careful with the fraction in the x-coordinate when using the slope formula.'
                    },
                    {
                        id: 2,
                        title: 'Point-Slope Form',
                        description: 'Using the point $(1,-1)$ and the slope you found, write the equation in point-slope form $y - y_1 = m(x - x_1)$.',
                        solution: 'y + 1 = -4/3(x - 1)',
                        hint: 'Remember that `y - (-1)` becomes `y + 1`.'
                    },
                    {
                        id: 3,
                        title: 'Slope-Intercept Form',
                        description: 'Convert your point-slope equation into the slope-intercept form $y=mx+b$.',
                        solution: 'y = -4/3x + 1/3',
                        hint: 'Distribute the slope `-4/3` and then isolate `y`.'
                    },
                    {
                        id: 4,
                        title: 'General Form',
                        description: 'Finally, convert your slope-intercept equation into the general form $Ax+By+C=0$.',
                        solution: '4x + 3y - 1 = 0',
                        hint: 'Move all terms to one side of the equation and multiply by the denominator (3) to clear the fractions. Conventionally, the coefficient of x (A) should be positive.',
                        calculator_callout: {
                          title: 'TI-Nspire Tip',
                          description: 'After getting the slope-intercept form, you can use the **nSolve** command to verify your other forms. For example, `nSolve(y = -4/3x + 1/3, y) | x=1` should give you `-1`.'
                        }
                    }
                ]
            }
        ]
      },
    ],
  },
  {
    id: 'lecture-5',
    title: 'Lecture 5: Systems of Equations',
    modules: [
      {
        id: 'module-1-systems-modeling',
        name: 'Modeling Business Problems with Systems of Equations',
        description: 'The core skill of translating complex word problems into precise systems of 2 or 3 linear equations.',
        problems: [
          {
            id: 'L5-S1-LEAD',
            title: 'Modeling from Data Points',
            description: 'At a price of \\$1.88/lb, the supply for cherries is 16,000 lbs and demand is 10,600 lbs. At \\$1.46/lb, supply is 10,000 lbs and demand is 12,700 lbs. Find the equilibrium price and quantity.',
            steps: [
              {
                id: 1,
                title: 'Find the Price-Supply Equation',
                description: 'First, let\'s model the supply. Use the two supply points $(16, 1.88)$ and $(10, 1.46)$ to find a linear equation in the form $p = mx + b$. What is the equation?',
                solution: 'p = 0.07x + 0.76',
                hint: 'First, calculate the slope \'m\' using the two supply points. Then, use the point-slope form $p - p_1 = m(x - x_1)$ to find the final equation.',
              },
              {
                id: 2,
                title: 'Find the Price-Demand Equation',
                description: 'Now, model the demand. Use the two demand points $(10.6, 1.88)$ and $(12.7, 1.46)$ to find the price-demand equation, also in the form $p = mx + b$.',
                solution: 'p = -0.2x + 4',
                hint: 'The slope for the demand curve should be negative, as demand typically decreases as price increases.',
              },
              {
                id: 3,
                title: 'Solve for Equilibrium',
                description: 'The equilibrium occurs when supply equals demand. You now have a system of two equations. Use your TI-Nspire to solve it. What is the equilibrium quantity $x$ (in thousands of pounds)?',
                solution: '12',
                hint: 'Set the two equations equal to each other: $0.07x + 0.76 = -0.2x + 4$. Then, solve for x.',
                calculator_callout: {
                  title: 'TI-Nspire Tip',
                  description: 'On your TI-Nspire Calculator page, use the system solver: [menu] > 3: Algebra > 2: Solve System of Linear Equations. Set it to 2 equations with variables x and p.',
                },
              },
              {
                id: 4,
                title: 'Find Equilibrium Price',
                description: 'Now that you have the equilibrium quantity, substitute it back into either the supply or demand equation to find the equilibrium price $p$.',
                solution: '1.6',
                hint: 'Plugging x=12 into $p = -0.2x + 4$ is a quick way to find the price.',
              },
            ],
          },
          {
            id: 'L5-S1-P1',
            title: '2-Variable Application: Investments',
            description: 'A total of \\$40,000 was invested in two accounts: a CD at 4% annual interest and a money market fund at 9%. The total simple interest for one year was 5% of the total investment. How much was invested in each account?',
            steps: [
              {
                id: 1,
                title: 'Set up the Principal Equation',
                description: "Let 'c' be the amount in the CD and 'm' be the amount in the money market fund. Write the equation representing the total amount invested.",
                solution: 'c + m = 40000',
                hint: 'The sum of the amounts in the two accounts must equal the total investment.',
              },
              {
                id: 2,
                title: 'Set up the Interest Equation',
                description: "The total interest earned ($0.04c + 0.09m$) was 5% of the total investment. First, calculate the total interest amount in dollars.",
                solution: '2000',
                hint: 'Calculate 5% of \\$40,000.',
              },
              {
                id: 3,
                title: 'Write the Full Interest Equation',
                description: 'Now, write the equation representing the total interest earned from both accounts.',
                solution: '0.04c + 0.09m = 2000',
                hint: 'Interest from CD + Interest from Money Market = Total Interest.',
              },
              {
                id: 4,
                title: 'Solve the System',
                description: 'You now have a system of two equations. Solve for c and m. What was the amount invested in the CD?',
                solution: '32000',
                hint: 'Use substitution or elimination. Multiplying the first equation by -0.04 is a good first step for elimination.',
                calculator_callout: {
                  title: 'TI-Nspire Tip',
                  description: 'Use the Solve System of Linear Equations tool on your TI-Nspire to solve for c and m quickly and avoid calculation errors.',
                },
              },
            ],
          },
          {
            id: 'L5-S1-P2',
            title: '2-Variable Application: Break-Even Analysis',
            description: 'An energy drink manufacturer spends \\$1.20 to make each drink and sells them for \\$2. The manufacturer also has fixed costs of \\$8,000 per month. Find the break-even point.',
            steps: [
              {
                id: 1,
                title: 'Write the Cost Function',
                description: 'The cost function is $C(x) = (variable\\ cost) \\cdot x + (fixed\\ costs)$. What is the cost function?',
                solution: 'C(x) = 1.20x + 8000',
                hint: 'Identify the variable cost per drink and the total fixed costs.',
              },
              {
                id: 2,
                title: 'Write the Revenue Function',
                description: 'The revenue function is $R(x) = (selling\\ price) \\cdot x$. What is the revenue function?',
                solution: 'R(x) = 2x',
                hint: 'The selling price is given as \\$2 per drink.',
              },
              {
                id: 3,
                title: 'Find the Break-Even Quantity',
                description: 'The break-even point occurs when Cost = Revenue. Set $C(x) = R(x)$ and solve for the quantity $x$.',
                solution: '10000',
                hint: 'Solve the equation $1.20x + 8000 = 2x$.',
              },
            ],
          },
          {
            id: 'L5-S1-P3',
            title: '3-Variable Application with a Twist',
            description: 'William invested a total of \\$2400 in three funds: Equity (E), Bond (B), and Money Market (M). His investment in E is \\$400 less than twice his investment in B. The ratio of investments B:M is 2:1. How much did he invest in each fund?',
            steps: [
              {
                id: 1,
                title: 'Total Investment Equation',
                description: 'Write the equation for the total amount invested.',
                solution: 'E + B + M = 2400',
                hint: 'The sum of the three amounts is \\$2400.',
              },
              {
                id: 2,
                title: 'Equity Fund Relationship Equation',
                description: "Translate 'Equity fund is \\$400 less than two times his investment in the Bond fund' into an equation.",
                solution: 'E = 2B - 400',
                hint: "'Less than' means you subtract from the other term.",
              },
              {
                id: 3,
                title: 'Ratio Equation (The Twist)',
                description: 'Translate the ratio $B:M = 2:1$ into an equation.',
                solution: 'B = 2M',
                hint: 'A ratio A:B = C:D is equivalent to the equation A/B = C/D. So, B/M = 2/1.',
              },
              {
                id: 4,
                title: 'Solve the 3x3 System',
                description: 'You now have a complete system of three equations. Solve it. What was the amount invested in the Equity fund (E)?',
                solution: '1200',
                hint: 'Use substitution. Substitute `B=2M` into the other two equations to reduce the system to two variables first.',
                calculator_callout: {
                  title: 'TI-Nspire Tip',
                  description: 'This is a perfect time to use your calculator. Before using the system solver, you must rearrange your equations into the standard form (e.g., E - 2B = -400). Then, enter the 3x3 system and solve instantly.',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'module-2-system-analysis',
        name: 'Analyzing System Properties & Parameters',
        description: 'Go beyond just solving. Master the logic behind system types (consistent, inconsistent) and solve for variables that define a system\'s behavior.',
        problems: [
          {
            id: 'L5-S2-LEAD',
            title: 'Solving for Parameters: No Solution',
            description: 'Let\'s learn to control the outcome. Determine the value of $k$ for which the system of equations $3x-2y=3$ and $6x+ky=4$ does **not** have a solution.',
            steps: [
              {
                id: 1,
                title: 'Find the Slope of Line 1',
                description: 'First, rearrange the equation $3x-2y=3$ into the slope-intercept form ($y=m_1x+b$). What is the slope, $m_1$?',
                solution: '3/2',
                hint: 'Start by isolating the `-2y` term on one side of the equation.',
              },
              {
                id: 2,
                title: 'Find the Slope of Line 2',
                description: 'Now, do the same for $6x+ky=4$. Rearrange it to find the slope, $m_2$, in terms of $k$.',
                solution: '-6/k',
                hint: 'Your expression for the slope will have \'k\' in the denominator.',
              },
              {
                id: 3,
                title: 'Apply the \'No Solution\' Condition',
                description: 'A system has no solution when the lines are parallel, which means their slopes are equal ($m_1 = m_2$). Set up the equation using the slopes you found.',
                solution: '3/2 = -6/k',
                hint: 'Set the two slope expressions equal to each other to find the value of \'k\' that makes them parallel.',
              },
              {
                id: 4,
                title: 'Solve for k',
                description: 'Solve the equation from the previous step to find the specific value of $k$.',
                solution: '-4',
                hint: 'Use cross-multiplication to solve the proportion.',
                calculator_callout: {
                  title: 'TI-Nspire Tip',
                  description: 'You can verify your answer. On your TI-Nspire Graphs page, graph the two lines, substituting the value you found for k. Do they look parallel? For example, plot $y = (3/2)x - 3/2$ and $y = (-6/-4)x + 4/-4$.',
                },
              },
            ],
          },
          {
            id: 'L5-S2-P1',
            title: 'Solving for Parameters: Infinite Solutions',
            description: 'Now for a different outcome. Determine the value of $r$ for which the system $-2x+6y=11$ and $-rx+18y=33$ has **infinitely many solutions**.',
            steps: [
              {
                id: 1,
                title: 'State the Conditions for Infinite Solutions',
                description: 'For a system to have infinite solutions, the two lines must be coincident (the exact same line). What must be true about their slopes AND their y-intercepts?',
                solution: 'Slopes must be equal AND y-intercepts must be equal.',
                hint: 'Parallel lines have equal slopes but different intercepts. Coincident lines are identical in every way.',
              },
              {
                id: 2,
                title: 'Find Slopes and Intercepts',
                description: 'Rearrange both equations into slope-intercept form ($y=mx+b$) to find their slopes and y-intercepts in terms of $r$.',
                solution: 'Line 1: y=(1/3)x + 11/6. Line 2: y=(r/18)x + 33/18',
                hint: 'For Line 1, the slope is $(-(-2)/6) = 1/3$. For Line 2, the slope is $(-(-r)/18) = r/18$.',
              },
              {
                id: 3,
                title: 'Solve for r',
                description: 'Set the two slopes equal to each other to find the value of $r$. Then, confirm that this value also makes the y-intercepts equal.',
                solution: '6',
                hint: 'Solve the equation $1/3 = r/18$. Then check if $11/6$ is equal to $33/18$ (it is).',
              },
            ],
          },
          {
            id: 'L5-S2-P2',
            title: 'Solving for Parameters: Unique Solution',
            description: 'This is a \'twisted\' version of the same skill. Determine the value(s) of $a$ for which the system $a^2x-3y=1$ and $9x+ay=1$ has a **unique solution**.',
            steps: [
              {
                id: 1,
                title: 'State the Condition for a Unique Solution',
                description: 'A system has a unique solution when the lines intersect at a single point. What must be true about their slopes for this to happen?',
                solution: 'The slopes must NOT be equal.',
                hint: 'If the slopes were equal, the lines would be parallel (no solution) or coincident (infinite solutions).',
              },
              {
                id: 2,
                title: "Find the Condition That a Unique Solution *Doesn't* Exist",
                description: "It's easier to first find the value of 'a' that makes the slopes equal (i.e., makes the lines parallel). Set the slopes of the two lines equal to each other and solve for 'a'.",
                solution: '-3',
                hint: "The slope of Line 1 is $a^2/3$. The slope of Line 2 is $-9/a$. Solve $a^2/3 = -9/a$.",
              },
              {
                id: 3,
                title: 'State the Final Answer',
                description: "A unique solution exists for all values of 'a' EXCEPT the one you just found. How do you write this condition?",
                solution: 'a != -3',
                hint: "The lines will always intersect unless they are parallel, which only happens at one specific value of 'a'.",
              },
            ],
          },
          {
            id: 'L5-S2-P3',
            title: 'Analyzing System Properties',
            description: 'Solve the system of equations $6x-2y=12$ and $y=3x-1$, and then classify it.',
            steps: [
              {
                id: 1,
                title: 'Attempt to Solve the System',
                description: 'Use the substitution method. Substitute the expression for $y$ from the second equation into the first equation.',
                solution: '6x - 2(3x - 1) = 12',
                hint: "Replace 'y' in the first equation with '(3x - 1)'.",
              },
              {
                id: 2,
                title: 'Simplify and Observe',
                description: 'Simplify the resulting equation. What do you get?',
                solution: '2 = 12',
                hint: "The 'x' variables should cancel out, leaving you with a statement that is mathematically impossible.",
              },
              {
                id: 3,
                title: 'Interpret the Result',
                description: 'When solving a system leads to a false statement (like $2=12$), what does this tell you about the number of solutions?',
                solution: 'No solution',
                hint: 'This contradiction means there is no value of x and y that can make both original equations true.',
              },
              {
                id: 4,
                title: 'Classify the System',
                description: 'Based on your result, is the system consistent or inconsistent? Are the equations dependent or independent?',
                solution: 'Inconsistent, Independent',
                hint: '\'Inconsistent\' means no solution. \'Independent\' means the equations represent different lines (in this case, they are parallel).',
              },
            ],
          },
        ],
      }
    ],
  },
];
