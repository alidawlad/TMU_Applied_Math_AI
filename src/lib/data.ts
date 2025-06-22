import type { Module } from '@/lib/types';

export const modules: Module[] = [
  {
    id: 'algebra',
    name: 'Algebra Basics',
    description: 'Master the fundamentals of algebraic expressions and equations.',
    problems: [
      {
        id: 1,
        title: 'Solving Linear Equations',
        description: 'Find the value of x in the equation: 2x + 5 = 15',
        steps: [
          {
            id: 1,
            title: 'Isolate the variable term',
            description: 'Your first goal is to get the term with "x" by itself on one side of the equation. What do you do to both sides of `2x + 5 = 15` to achieve this?',
            solution: '2x=10',
            calculator_callout: {
              title: 'TI-Nspire: Basic Arithmetic',
              description: 'You can type `15 - 5` directly into the calculator screen and press [enter] to get the result.',
            }
          },
          {
            id: 2,
            title: 'Solve for x',
            description: 'Now that you have `2x = 10`, how do you find the value of a single "x"?',
            solution: 'x=5',
          },
        ],
      },
      {
        id: 2,
        title: 'Factoring Quadratic Expressions',
        description: 'Factor the expression: x² + 7x + 12',
        steps: [
          {
            id: 1,
            title: 'Identify two numbers',
            description: 'Find two numbers that multiply to 12 and add up to 7.',
            solution: '3,4',
          },
          {
            id: 2,
            title: 'Write the factored form',
            description: 'Using the numbers you found, write the expression in its factored form.',
            solution: '(x+3)(x+4)',
          },
        ],
      },
    ],
  },
  {
    id: 'geometry',
    name: 'Geometry',
    description: 'Explore shapes, sizes, positions of figures, and properties of space.',
    problems: [
      {
        id: 1,
        title: 'Area of a Triangle',
        description: 'A triangle has a base of 10 cm and a height of 8 cm. Calculate its area.',
        steps: [
          {
            id: 1,
            title: 'Recall the formula',
            description: 'What is the formula for the area of a triangle?',
            solution: 'A=1/2*b*h',
          },
          {
            id: 2,
            title: 'Substitute and calculate',
            description: 'Substitute the given base and height into the formula and calculate the area.',
            solution: 'A=40',
            calculator_callout: {
                title: 'TI-Nspire: Fractions',
                description: 'Use the fraction template by pressing [ctrl] + [÷]. Enter 1 in the numerator and 2 in the denominator.'
            }
          },
        ],
      },
    ],
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    description: 'Learn about the relationships between side lengths and angles of triangles.',
    problems: [
      {
        id: 1,
        title: 'Using Sine Function',
        description: 'In a right-angled triangle, the side opposite to angle θ is 5, and the hypotenuse is 10. Find sin(θ).',
        steps: [
            {
                id: 1,
                title: 'Recall the definition of sine',
                description: 'What is the definition of the sine of an angle in a right-angled triangle?',
                solution: 'sin(theta)=opposite/hypotenuse'
            },
            {
                id: 2,
                title: 'Calculate the value',
                description: 'Substitute the given values to find sin(θ).',
                solution: 'sin(theta)=0.5'
            }
        ]
      }
    ],
  },
  {
    id: 'calculus',
    name: 'Calculus',
    description: 'Dive into the study of continuous change.',
    problems: [
      {
        id: 1,
        title: 'Basic Differentiation',
        description: 'Find the derivative of f(x) = 3x⁴.',
        steps: [
            {
                id: 1,
                title: 'Apply the Power Rule',
                description: 'What is the power rule for differentiation? (d/dx(x^n) = nx^(n-1))',
                solution: 'f\'(x)=4*3x^(4-1)'
            },
            {
                id: 2,
                title: 'Simplify the expression',
                description: 'Simplify the result to find the final derivative.',
                solution: 'f\'(x)=12x^3',
                calculator_callout: {
                    title: 'TI-Nspire: Derivative',
                    description: 'Press [shift] + [-] to open the derivative template. Enter x for the variable and 3x⁴ for the expression.'
                }
            }
        ]
      }
    ],
  },
];
