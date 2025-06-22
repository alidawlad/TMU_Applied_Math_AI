import type { Module } from '@/lib/types';

export const modules: Module[] = [
  {
    id: 'module-1-linear-foundations',
    name: 'Module 1: Linear Functions & Advanced Algebra',
    description: 'Mastering function domains, advanced algebraic manipulation, and the core principles of linear equations.',
    problems: [
      {
        id: 'L4-S1-LEAD',
        title: 'Advanced Algebraic Manipulation: The Difference Quotient',
        description:
          'Let $f(x) = 2x^2 - x + 1$. We will find and simplify the difference quotient: $\\frac{f(a+h) - f(a)}{h}$. This is a critical skill for understanding rates of change.',
        steps: [
          {
            id: 1,
            title: 'Calculate $f(a+h)$',
            description:
              'First, substitute $(a+h)$ everywhere you see an $x$ in the function $f(x) = 2x^2 - x + 1$. Your goal is to fully expand this expression.',
            solution: '2a^2 + 4ah + 2h^2 - a - h + 1',
          },
          {
            id: 2,
            title: 'Calculate the Numerator: $f(a+h) - f(a)$',
            description:
              'Take the expression you just found and subtract the entire original function $f(a) = 2a^2 - a + 1$. What is the simplified result?',
            solution: '4ah + 2h^2 - h',
          },
          {
            id: 3,
            title: 'Final Simplification: Divide by $h$',
            description:
              'Now, take your simplified numerator and divide it by $h$. Factor out the common $h$ from the numerator and cancel.',
            solution: '4a + 2h - 1',
          },
        ],
      },
      {
        id: 'L4-S1-P1',
        title: 'Advanced Algebraic Manipulation: The Difference Quotient',
        description:
          'Let\'s try a harder version. If $f(x) = \\frac{x}{x+1}$, find and simplify $\\frac{f(x+h) - f(x)}{h}$.',
        steps: [
          {
            id: 1,
            title: 'Combine Fractions in the Numerator',
            description:
              'First, set up the numerator $f(x+h) - f(x)$. To combine these two rational expressions, you\'ll need to find a common denominator.',
            solution: '(h)/((x+1)*(x+h+1))',
          },
          {
            id: 2,
            title: 'Final Division',
            description:
              'Now, take the fraction you found in the previous step and divide the entire expression by $h$.',
            solution: '1/((x+1)*(x+h+1))',
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
          },
          {
            id: 2,
            title: 'Analyze the Denominator',
            description:
              'The denominator of a fraction cannot be zero. What condition does this place on $x$?',
            solution: 'x != 3',
          },
          {
            id: 3,
            title: 'Combine the Conditions',
            description:
              'You need all numbers where $x \\ge 2$ AND $x \\ne 3$. How do you write this using interval notation?',
            solution: '[2,3) U (3,inf)',
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
          },
          {
            id: 2,
            title: 'Solve and State the Domain',
            description:
              'Solve the inequality from the previous step and state the final domain in interval notation.',
            solution: '(2,inf)',
          },
        ],
      },
      {
        id: 'L4-S3-LEAD',
        title: 'Modeling with Linear Functions',
        description:
          "A machine was purchased for $120,000 and is depreciated linearly to a value of $0 over 10 years. Let's find the linear function $V(n)$ for its value after $n$ years.",
        steps: [
          {
            id: 1,
            title: 'Identify the Data Points',
            description:
              "We have two points in time that give us the machine's value. What are these two points in the form $(n, V)$?",
            solution: '(0, 120000) and (10, 0)',
          },
          {
            id: 2,
            title: 'Calculate the Slope (Rate of Depreciation)',
            description:
              'Using the two points, calculate the slope of the line, which represents the rate at which the machine loses value each year.',
            solution: '-12000',
          },
          {
            id: 3,
            title: 'Determine the y-intercept',
            description:
              'The y-intercept `b` is the value of the function when $n=0$. What is the y-intercept?',
            solution: '120000',
          },
          {
            id: 4,
            title: 'Write the Final Equation',
            description:
              'Now, assemble the slope `m` and y-intercept `b` into the final linear equation $V(n) = mn + b$.',
            solution: 'V(n) = -12000n + 120000',
          },
          {
            id: 5,
            title: 'Use the Model',
            description:
              'What is the book value of the machine at the end of the 6th year?',
            solution: '48000',
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
          },
          {
            id: 2,
            title: 'Calculate the Slope',
            description:
              'Calculate the rate of change in the number of pay phones per year.',
            solution: '-0.15',
          },
          {
            id: 3,
            title: 'Write the Final Equation',
            description:
              'Assemble the slope and y-intercept into the final linear equation $y=mx+b$.',
            solution: 'y = -0.15x + 1.3',
          },
          {
            id: 4,
            title: 'Make a Prediction',
            description:
              'What is the correct value of $x$ for the year 2012? Use that value in your equation to predict the number of pay phones (in millions).',
            solution: '0.1',
            calculator_callout: {
              title: 'TI-Nspire Tip',
              description: 'Define your function, then evaluate it for the correct x.',
            },
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
          },
          {
            id: 2,
            title: 'Solve the System',
            description:
              'Solve the system of equations you just created to find the values of $a$ and $b$.',
            solution: 'a=2, b=2',
            calculator_callout: {
              title: 'TI-Nspire Tip',
              description:
                'This is a perfect use case for the system solver. Go to **menu > Algebra > Solve System of Linear Equations** to solve for $a$ and $b$ instantly.',
            },
          },
        ],
      },
      {
        id: 'L4-S3-P3',
        title: 'Modeling with Linear Functions',
        description:
          'The point $P(-2,3)$ lies on the line $-2x+ky+10=0$. Find the value of $k$.',
        steps: [
          {
            id: 1,
            title: 'Substitute the Point',
            description:
              "If a point lies on a line, its coordinates must satisfy the line's equation. Substitute the x and y values from point P into the equation.",
            solution: '-2(-2) + k(3) + 10 = 0',
          },
          {
            id: 2,
            title: 'Solve for k',
            description:
              'Simplify the equation from Step 1 and solve for the variable $k$.',
            solution: '-14/3',
          },
        ],
      },
    ],
  },
];
