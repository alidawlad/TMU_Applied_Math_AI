import type { Lecture } from '@/lib/types';

export const lectures: Lecture[] = [
    {
        id: 'lecture-1',
        title: 'Week 8: Functions',
        modules: [
            {
                id: 'comp-functions',
                name: 'Composition of Functions',
                description: 'Understanding how to combine functions and evaluate composite functions.',
                problems: [
                    {
                        id: 'W8-CF-LEAD',
                        type: 'lead-example',
                        skill: 'Composition Basics',
                        source: 'Week 8 Example',
                        title: 'Let f(x) = 3x + 2 and g(x) = x^2 + 1. Find formulas for (f ∘ g)(x) and (g ∘ f)(x), and then compute (g ∘ f)(2).',
                        description: 'Let f(x) = 3x + 2 and g(x) = x^2 + 1. Find formulas for (f ∘ g)(x) and (g ∘ f)(x), and then compute (g ∘ f)(2).',
                        idealTime: 300,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Find the formula for (f ∘ g)(x).',
                                description: 'Substitute the entire function g(x) into f(x) in place of x.',
                                solution: '3x^2 + 5'
                            },
                            {
                                id: 'b',
                                title: 'b) Find the formula for (g ∘ f)(x).',
                                description: 'Substitute the entire function f(x) into g(x) in place of x and expand the expression.',
                                solution: '9x^2 + 12x + 5'
                            },
                            {
                                id: 'c',
                                title: 'c) Compute (g ∘ f)(2).',
                                description: 'Use the formula for (g ∘ f)(x) you just found and substitute x=2.',
                                solution: '65'
                            }
                        ]
                    },
                    {
                        id: 'CF1',
                        type: 'practice',
                        skill: 'Composition Basics',
                        source: 'Week 8 Practice',
                        title: 'Compute compositions',
                        fullQuestion: 'Let f(x) = x^2 - 6 and g(x) = 4x + 5.  Compute (g ∘ f)(-2) and (f ∘ f)(3).',
                        description: 'Let f(x) = x^2 - 6 and g(x) = 4x + 5.  Compute (g ∘ f)(-2) and (f ∘ f)(3).',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Compute (g ∘ f)(-2).',
                                description: 'First, calculate f(-2), then apply g to the result.',
                                solution: '-3'
                            },
                            {
                                id: 'b',
                                title: 'b) Compute (f ∘ f)(3).',
                                description: 'Similarly, calculate f(3), then apply f to that result.',
                                solution: '3'
                            }
                        ],
                        calculator_tip: 'Define f(x):=x^2-6 and g(x):=4*x+5, then evaluate g(f(-2)) and f(f(3)) directly.'
                    },
                    {
                        id: 'CF2',
                        type: 'practice',
                        skill: 'Formulas for Compositions',
                        source: 'Week 8 Practice',
                        title: 'Find formulas for compositions',
                        fullQuestion: 'Given f(x) = 2x - 5 and g(x) = 3x^2 + 1, find explicit formulas for (g ∘ f)(x) and (f ∘ g)(x).',
                        description: 'Given f(x) = 2x - 5 and g(x) = 3x^2 + 1, find explicit formulas for (g ∘ f)(x) and (f ∘ g)(x).',
                        idealTime: 300,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Find the formula for (g ∘ f)(x).',
                                description: 'Substitute f(x) into g(x) and expand the result.',
                                solution: '12x^2 - 60x + 76'
                            },
                            {
                                id: 'b',
                                title: 'b) Find the formula for (f ∘ g)(x).',
                                description: 'Substitute g(x) into f(x) and simplify.',
                                solution: '6x^2 - 3'
                            }
                        ],
                        calculator_tip: 'Use expand(g(f(x))) and expand(f(g(x))) after defining functions to get simplified formulas.'
                    },
                    {
                        id: 'CF3',
                        type: 'practice',
                        skill: 'Multi-function Composition',
                        source: 'Week 8 Practice',
                        title: 'Determine a three-function composition',
                        fullQuestion: 'For f(x) = 2x + 1, g(x) = x^2 - x + 1, and h(x) = √(x^2 + 3), determine (h ∘ g ∘ f)(x).',
                        description: 'For f(x) = 2x + 1, g(x) = x^2 - x + 1, and h(x) = √(x^2 + 3), determine (h ∘ g ∘ f)(x).',
                        idealTime: 360,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) First, find the composition (g ∘ f)(x).',
                                description: 'Substitute f(x) into g(x) and expand.',
                                solution: '4x^2 + 2x + 1'
                            },
                            {
                                id: 'b',
                                title: 'b) Now, find (h ∘ (g ∘ f))(x).',
                                description: 'Substitute the result from part (a) into h(x).',
                                solution: 'sqrt((4x^2 + 2x + 1)^2 + 3)'
                            }
                        ],
                        calculator_tip: 'Define all three functions, then use expand(h(g(f(x)))) to get the complete composition.'
                    },
                    {
                        id: 'CF4',
                        type: 'practice',
                        skill: 'Application of Composition',
                        source: 'Week 8 Practice',
                        title: 'Express profit as a function of price',
                        fullQuestion: "A company's profit P (in dollars) is P = g(x), where x is units sold, and x = f(p), where p is the unit price (in dollars). Express profit directly as a function of price.",
                        description: "A company's profit P (in dollars) is P = g(x), where x is units sold, and x = f(p), where p is the unit price (in dollars). Express profit directly as a function of price.",
                        idealTime: 180,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Determine the composition.',
                                description: 'To express profit (P) as a function of price (p), which composition makes sense: g(f(p)) or f(g(p))?',
                                solution: 'g(f(p))'
                            },
                            {
                                id: 'b',
                                title: 'b) Write the final function.',
                                description: 'Write the composition P(p) = (g ∘ f)(p).',
                                solution: 'P(p) = g(f(p))'
                            }
                        ],
                        calculator_tip: 'After defining g(x) and f(p), create the composition P(p):=g(f(p)) to get profit as function of price.'
                    },
                    {
                        id: 'CF5',
                        type: 'practice',
                        skill: 'Logarithmic and Exponential Composition',
                        source: 'Week 8 Practice',
                        title: 'Evaluate a composition of log and exponential functions',
                        fullQuestion: 'Let f(x) = ln x − ln (x + 1) and g(x) = e^x ⁄ (1 − e^x). Evaluate (f ∘ g)(x).',
                        description: 'Let f(x) = ln x − ln (x + 1) and g(x) = e^x ⁄ (1 − e^x). Evaluate (f ∘ g)(x).',
                        idealTime: 360,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Substitute g(x) into f(x).',
                                description: 'Replace every x in f(x) with the expression for g(x).',
                                solution: 'ln(e^x / (1 - e^x)) - ln((e^x / (1 - e^x)) + 1)'
                            },
                            {
                                id: 'b',
                                title: 'b) Simplify the expression.',
                                description: 'Use logarithm properties, specifically ln(a) - ln(b) = ln(a/b), to simplify the expression.',
                                solution: 'x'
                            }
                        ],
                        calculator_tip: 'Use simplify(f(g(x))) after defining both functions to automatically simplify the logarithmic expression.'
                    }
                ]
            },
            {
                id: 'inv-functions',
                name: 'Inverse Functions',
                description: 'Finding and verifying inverse functions, and understanding their properties and graphs.',
                problems: [
                    {
                        id: 'W8-IF-LEAD',
                        type: 'lead-example',
                        skill: 'Finding and Verifying Inverses',
                        source: 'Week 8 Example',
                        title: 'Find the inverse of f(x) = (2x + 1) / (x - 3) and verify your result.',
                        description: 'Find the inverse of f(x) = (2x + 1) / (x - 3) and verify your result.',
                        idealTime: 300,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Find the inverse function f⁻¹(x).',
                                description: 'Set y = f(x), then swap x and y. Solve the resulting equation for y.',
                                solution: 'f^{-1}(x) = (3x + 1) / (x - 2)'
                            },
                            {
                                id: 'b',
                                title: 'b) Verify that (f ∘ f⁻¹)(x) = x.',
                                description: 'Substitute your f⁻¹(x) into f(x) and simplify the complex fraction. The result should be x.',
                                solution: 'x'
                            }
                        ]
                    },
                    {
                        id: 'IF1',
                        type: 'practice',
                        skill: 'Finding and Verifying Inverses',
                        source: 'Week 8 Practice',
                        title: 'Find inverse of a linear function',
                        fullQuestion: 'Find f⁻¹(x) for f(x) = 4x + 9. State its domain and range, and verify that (f⁻¹ ∘ f)(x) = x.',
                        description: 'Find f⁻¹(x) for f(x) = 4x + 9. State its domain and range, and verify that (f⁻¹ ∘ f)(x) = x.',
                        idealTime: 300,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Find the inverse function f⁻¹(x).',
                                description: 'To find the inverse, set y = f(x), swap x and y, and solve for y.',
                                solution: 'f^{-1}(x) = (x - 9) / 4'
                            },
                            {
                                id: 'b',
                                title: 'b) State the domain and range of f⁻¹(x).',
                                description: 'The domain and range of a linear function and its inverse are all real numbers.',
                                solution: 'Domain: (-inf, inf), Range: (-inf, inf)'
                            },
                            {
                                id: 'c',
                                title: 'c) Verify that (f⁻¹ ∘ f)(x) = x.',
                                description: 'Substitute f(x) into your formula for f⁻¹(x) and simplify.',
                                solution: 'x'
                            }
                        ],
                        calculator_tip: 'Use solve(y=4*x+9,x) to get x=(y-9)/4, then verify with simplify(finv(f(x))).'
                    },
                    {
                        id: 'IF2',
                        type: 'practice',
                        skill: 'Restricted Domain Inverses',
                        source: 'Week 8 Practice',
                        title: 'Find inverse of a quadratic function',
                        fullQuestion: 'The function g(x) = x^2 − 2 is not one-to-one on ℝ. Restrict its domain so that it becomes one-to-one, then find g⁻¹ and sketch both graphs on the same axes.',
                        description: 'The function g(x) = x^2 − 2 is not one-to-one on ℝ. Restrict its domain so that it becomes one-to-one, then find g⁻¹ and sketch both graphs on the same axes.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Restrict the domain.',
                                description: 'The vertex of the parabola y = x^2 - 2 is at (0, -2). What is a simple domain restriction that makes it one-to-one?',
                                solution: 'x >= 0'
                            },
                            {
                                id: 'b',
                                title: 'b) Find the inverse g⁻¹(x).',
                                description: 'With the domain restricted to x ≥ 0, find the inverse of g(x) = x^2 - 2. Remember the range of g(x) becomes the domain of g⁻¹(x).',
                                solution: 'g^{-1}(x) = sqrt(x + 2)'
                            }
                        ],
                        calculator_tip: 'Graph g(x):=x^2-2 with domain restriction, then use solve(y=x^2-2,x) and graph both functions.'
                    },
                    {
                        id: 'IF3',
                        type: 'practice',
                        skill: 'Exponential Inverses',
                        source: 'Week 8 Practice',
                        title: 'Find inverse of an exponential function',
                        fullQuestion: 'For f(x) = 2^{−x}, determine f⁻¹(x) and sketch the graphs of f and f⁻¹ on a common set of axes.',
                        description: 'For f(x) = 2^{−x}, determine f⁻¹(x) and sketch the graphs of f and f⁻¹ on a common set of axes.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Find f⁻¹(x).',
                                description: 'Set y = 2^{-x}, swap variables, and solve for y using logarithms.',
                                solution: 'f^{-1}(x) = -log2(x)'
                            }
                        ],
                        calculator_tip: 'Use solve(y=2^(-x),x) to get x=-log(y)/log(2), then graph both f(x) and finv(x):=-log(x)/log(2).'
                    },
                    {
                        id: 'IF4',
                        type: 'practice',
                        skill: 'Logistic Function Inverses',
                        source: 'Week 8 Practice',
                        title: 'Find inverse of a logistic function',
                        fullQuestion: 'Suppose f(t) = 25 / [1 + 4 e^{−2t}]. (a) Find f⁻¹(t). (b) Compute f(2).',
                        description: 'Suppose f(t) = 25 / [1 + 4 e^{−2t}]. (a) Find f⁻¹(t). (b) Compute f(2).',
                        idealTime: 420,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Compute f(2).',
                                description: 'Substitute t=2 into the function f(t) and calculate the value.',
                                solution: '23.49'
                            },
                            {
                                id: 'b',
                                title: 'b) Find f⁻¹(t).',
                                description: 'Set y = f(t), swap t and y, and solve for y.',
                                solution: 'f^{-1}(t) = -1/2 * ln((25/t - 1) / 4)'
                            }
                        ],
                        calculator_tip: 'Use solve(y=25/(1+4*e^(-2*t)),t) for inverse, then evaluate f(2) directly with your defined function.'
                    },
                    {
                        id: 'IF5',
                        type: 'practice',
                        skill: 'Finding and Verifying Inverses',
                        source: 'Week 8 Practice',
                        title: 'Find inverse and verify',
                        fullQuestion: 'Let h(x) = (1/5)x − 2. Find h⁻¹(x) and verify h∘h⁻¹(x) = x.',
                        description: 'Let h(x) = (1/5)x − 2. Find h⁻¹(x) and verify h∘h⁻¹(x) = x.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Find h⁻¹(x).',
                                description: 'Set y = h(x), swap x and y, and solve for y.',
                                solution: 'h^{-1}(x) = 5(x + 2)'
                            },
                            {
                                id: 'b',
                                title: 'b) Verify the composition.',
                                description: 'Substitute h⁻¹(x) into h(x) and simplify.',
                                solution: 'x'
                            }
                        ],
                        calculator_tip: 'Use solve(y=(1/5)*x-2,x) to get hinv(x):=5*(x+2), then verify with simplify(h(hinv(x))).'
                    }
                ]
            },
            {
                id: 'one-to-one',
                name: 'One-to-One Property',
                description: 'Using algebraic methods and the horizontal-line test to determine if a function is one-to-one.',
                problems: [
                    {
                        id: 'W8-OO-LEAD',
                        type: 'lead-example',
                        skill: 'Algebraic and Graphical Tests',
                        source: 'Week 8 Example',
                        title: 'Determine if f(x) = (x-1)^2 is one-to-one using both algebraic proof and the horizontal-line test.',
                        description: 'Determine if f(x) = (x-1)^2 is one-to-one using both algebraic proof and the horizontal-line test.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Algebraic Proof',
                                description: 'Set f(a) = f(b). If you can show that a must equal b, the function is one-to-one. If other solutions exist, it is not.',
                                solution: 'Not one-to-one because a-1 = +-(b-1) -> a=b or a=2-b'
                            },
                            {
                                id: 'b',
                                title: 'b) Horizontal-Line Test',
                                description: 'Graph the function. If any horizontal line intersects the graph more than once, it fails the test. What do you conclude?',
                                solution: 'Fails the test, so it is not one-to-one.'
                            }
                        ]
                    },
                    {
                        id: 'OO1',
                        type: 'practice',
                        skill: 'Algebraic and Graphical Tests',
                        source: 'Week 8 Practice',
                        title: 'Prove if a linear function is one-to-one',
                        fullQuestion: 'Prove algebraically whether f(x) = 5x − 7 is one-to-one.',
                        description: 'Prove algebraically whether f(x) = 5x − 7 is one-to-one.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Set f(a) = f(b) and solve.',
                                description: 'Start with 5a - 7 = 5b - 7. Can you simplify this to a = b?',
                                solution: 'Yes, it simplifies to a = b, so it is one-to-one.'
                            }
                        ],
                        calculator_tip: 'Use solve(5*x-7=5*y-7,x) – if result is x=y only, then one-to-one.'
                    },
                    {
                        id: 'OO2',
                        type: 'practice',
                        skill: 'Algebraic and Graphical Tests',
                        source: 'Week 8 Practice',
                        title: 'Prove if a square root function is one-to-one',
                        fullQuestion: 'Is g(x) = √(x + 3) one-to-one? Justify your answer.',
                        description: 'Is g(x) = √(x + 3) one-to-one? Justify your answer.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Use the algebraic or graphical test.',
                                description: 'Set g(a) = g(b) or graph the function. What is the result?',
                                solution: 'Yes, it is one-to-one.'
                            }
                        ],
                        calculator_tip: 'Use solve(sqrt(x+3)=sqrt(y+3),x) or graph g(x):=sqrt(x+3) and apply horizontal line test visually.'
                    },
                    {
                        id: 'OO3',
                        type: 'practice',
                        skill: 'Algebraic and Graphical Tests',
                        source: 'Week 8 Practice',
                        title: 'Prove if an absolute value function is one-to-one',
                        fullQuestion: 'Determine if h(x) = |x − 2| is one-to-one and explain your reasoning.',
                        description: 'Determine if h(x) = |x − 2| is one-to-one and explain your reasoning.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Use the algebraic or graphical test.',
                                description: 'Set h(a) = h(b) or graph the function. What is the result?',
                                solution: 'No, it is not one-to-one.'
                            }
                        ],
                        calculator_tip: 'Use solve(abs(x-2)=abs(y-2),x) – multiple solutions or graph h(x):=abs(x-2) show it\'s not one-to-one.'
                    },
                    {
                        id: 'OO4',
                        type: 'practice',
                        skill: 'Horizontal Line Test',
                        source: 'Week 8 Practice',
                        title: 'Use HLT on a cubic function',
                        fullQuestion: 'Use the horizontal-line test to decide whether k(x) = x^3 − 2x is one-to-one. Explain briefly.',
                        description: 'Use the horizontal-line test to decide whether k(x) = x^3 − 2x is one-to-one. Explain briefly.',
                        idealTime: 180,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Graph the function and apply the test.',
                                description: 'Does any horizontal line cross the graph more than once?',
                                solution: 'No, it is not one-to-one. The line y=0 crosses at three points.'
                            }
                        ],
                        calculator_tip: 'Graph k(x):=x^3-2*x and visually check if any horizontal line crosses the graph more than once.'
                    },
                    {
                        id: 'OO5',
                        type: 'practice',
                        skill: 'Horizontal Line Test',
                        source: 'Week 8 Practice',
                        title: 'Use HLT on a piecewise function',
                        fullQuestion: 'For the piece-wise function m(x) = { x + 2 if x ≤ 0 ; x^2 if x > 0 }, determine whether m is one-to-one.',
                        description: 'For the piece-wise function m(x) = { x + 2 if x ≤ 0 ; x^2 if x > 0 }, determine whether m is one-to-one.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Graph the function and apply the horizontal-line test.',
                                description: 'Consider the two pieces. For example, does the line y=1 cross the graph in more than one place?',
                                solution: 'No, it is not one-to-one. The line y=1 intersects at x=-1 and x=1.'
                            }
                        ],
                        calculator_tip: 'Use piecewise template or graph m(x):=piecewise(x+2,x≤0,x^2,x>0) and apply horizontal line test.'
                    }
                ]
            },
            {
                id: 'exp-functions',
                name: 'Exponential Functions',
                description: 'Solving exponential equations and analyzing the graphs of exponential functions.',
                problems: [
                    {
                        id: 'W8-EX-LEAD',
                        type: 'lead-example',
                        skill: 'Solving Exponential Equations',
                        source: 'Week 8 Example',
                        title: 'An investment of $1000 grows according to the formula A(t) = 1000 * (1.05)^t. When will the investment reach $1500?',
                        description: 'An investment of $1000 grows according to the formula A(t) = 1000 * (1.05)^t. When will the investment reach $1500?',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Set up the equation.',
                                description: 'Set the function A(t) equal to the target amount.',
                                solution: '1500 = 1000 * (1.05)^t'
                            },
                            {
                                id: 'b',
                                title: 'b) Isolate the exponential term.',
                                description: 'Divide both sides by the principal amount.',
                                solution: '1.5 = (1.05)^t'
                            },
                            {
                                id: 'c',
                                title: 'c) Solve for t.',
                                description: 'Take the natural logarithm (ln) of both sides and solve for t.',
                                solution: 't = 8.31'
                            }
                        ]
                    },
                    {
                        id: 'EX1',
                        type: 'practice',
                        skill: 'Identifying Exponential Functions',
                        source: 'Week 8 Practice',
                        title: 'Identify exponential functions',
                        fullQuestion: 'Which of the following are exponential functions of the form y = ab^x? (a) y = −4^x (b) y = (1/2)^{-3x} (c) y = (√7)^{-x} (d) y = (−3)^x',
                        description: 'Which of the following are exponential functions of the form y = ab^x? (a) y = −4^x (b) y = (1/2)^{-3x} (c) y = (√7)^{-x} (d) y = (−3)^x',
                        idealTime: 180,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Analyze each function.',
                                description: 'Rewrite each function to see if it matches the form y = a * b^x, where b > 0 and b != 1.',
                                solution: '(a), (b), and (c) are exponential. (d) is not because the base is negative.'
                            }
                        ],
                        calculator_tip: 'Graph each function separately to verify exponential behavior and check for real vs complex values.'
                    },
                    {
                        id: 'EX2',
                        type: 'practice',
                        skill: 'Graphing Exponential Functions',
                        source: 'Week 8 Practice',
                        title: 'Sketch exponential functions',
                        fullQuestion: 'Sketch f(x) = (1/4)·3^x and g(x) = 3^x for −3 ≤ x ≤ 3, clearly labeling any intercepts and asymptotes.',
                        description: 'Sketch f(x) = (1/4)·3^x and g(x) = 3^x for −3 ≤ x ≤ 3, clearly labeling any intercepts and asymptotes.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Find y-intercepts.',
                                description: 'Calculate f(0) and g(0).',
                                solution: 'f(0) = 1/4, g(0) = 1'
                            },
                            {
                                id: 'b',
                                title: 'b) Identify the horizontal asymptote.',
                                description: 'What value do both functions approach as x approaches negative infinity?',
                                solution: 'y = 0'
                            }
                        ],
                        calculator_tip: 'Graph both functions, then use Menu→5→1 (Trace) to find y-intercepts and Menu→6→2 (Zero) if needed.'
                    },
                    {
                        id: 'EX3',
                        type: 'practice',
                        skill: 'Solving Exponential Equations',
                        source: 'Week 8 Practice',
                        title: 'Solve with common base',
                        fullQuestion: 'Solve for x: 5^{2x − 1} = 125.',
                        description: 'Solve for x: 5^{2x − 1} = 125.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Rewrite with a common base.',
                                description: 'Express 125 as a power of 5.',
                                solution: '5^3'
                            },
                            {
                                id: 'b',
                                title: 'b) Solve the equation.',
                                description: 'Now that the bases are the same, set the exponents equal to each other and solve for x.',
                                solution: '2'
                            }
                        ],
                        calculator_tip: 'Use solve(5^(2*x-1)=125,x) or recognize that 125=5^3 and solve 2x-1=3 directly.'
                    },
                    {
                        id: 'EX4',
                        type: 'practice',
                        skill: 'Solving Exponential Equations',
                        source: 'Week 8 Practice',
                        title: 'Solve with logarithms',
                        fullQuestion: 'Solve for x: e^{3x − 2} = 7.',
                        description: 'Solve for x: e^{3x − 2} = 7.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Isolate x using logarithms.',
                                description: 'Take the natural logarithm (ln) of both sides of the equation.',
                                solution: '3x - 2 = ln(7)'
                            },
                            {
                                id: 'b',
                                title: 'b) Solve for x.',
                                description: 'Solve the resulting linear equation for x.',
                                solution: 'x = (ln(7) + 2) / 3'
                            }
                        ],
                        calculator_tip: 'Use solve(e^(3*x-2)=7,x) or solve manually: 3x-2=ln(7), so x=(ln(7)+2)/3.'
                    },
                    {
                        id: 'EX5',
                        type: 'practice',
                        skill: 'Analyzing Exponential Functions',
                        source: 'Week 8 Practice',
                        title: 'Analyze exponential functions',
                        fullQuestion: 'For each function, state whether its graph is increasing or decreasing and give the y-intercept: (i) f(x) = (1/3)^x (ii) g(x) = 2^{x − 1}.',
                        description: 'For each function, state whether its graph is increasing or decreasing and give the y-intercept: (i) f(x) = (1/3)^x (ii) g(x) = 2^{x − 1}.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Analyze f(x) = (1/3)^x.',
                                description: 'Is the base greater than 1 or between 0 and 1? What is f(0)?',
                                solution: 'Decreasing, y-intercept = 1'
                            },
                            {
                                id: 'b',
                                title: 'b) Analyze g(x) = 2^{x-1}.',
                                description: 'Is the base greater than 1 or between 0 and 1? What is g(0)?',
                                solution: 'Increasing, y-intercept = 1/2'
                            }
                        ],
                        calculator_tip: 'Graph both functions, evaluate f(0) and g(0) for y-intercepts, and observe slope/behavior from graphs.'
                    }
                ]
            },
            {
                id: 'eulers-number',
                name: 'Euler’s Number e',
                description: 'Understanding the mathematical constant e and its applications in growth models.',
                problems: [
                    {
                        id: 'W8-EU-LEAD',
                        type: 'lead-example',
                        skill: 'Definition of e',
                        source: 'Week 8 Example',
                        title: 'Compute $(1 + 1/1000)^{1000}$ and compare it to the value of e.',
                        description: 'Compute $(1 + 1/1000)^{1000}$ and compare it to the value of e.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Calculate the value of the expression.',
                                description: 'Use a calculator to compute $(1 + 1/1000)^{1000}$.',
                                solution: '2.71692'
                            },
                            {
                                id: 'b',
                                title: 'b) Compare to e.',
                                description: 'The value of e is approximately 2.71828. How close is your result?',
                                solution: 'The value is very close to e, demonstrating the limit definition.'
                            }
                        ]
                    },
                    {
                        id: 'EU1',
                        type: 'practice',
                        skill: 'Definition of e',
                        source: 'Week 8 Practice',
                        title: 'Approximate e',
                        fullQuestion: 'Compute $(1 + 1/200)^{200}$ and compare it to the value of e. State the absolute error.',
                        description: 'Compute $(1 + 1/200)^{200}$ and compare it to the value of e. State the absolute error.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Compute the value.',
                                description: 'Calculate the value of the expression.',
                                solution: '2.7115'
                            },
                            {
                                id: 'b',
                                title: 'b) State the absolute error.',
                                description: 'Calculate the absolute difference between your result and e (≈2.71828).',
                                solution: '0.00678'
                            }
                        ]
                    },
                    {
                        id: 'EU2',
                        type: 'practice',
                        skill: 'Limits involving e',
                        source: 'Week 8 Practice',
                        title: 'Evaluate a limit involving e',
                        fullQuestion: 'Evaluate $\\lim_{n\\to\\infty}(1+\\frac{4}{n})^{n}$ correct to four decimal places.',
                        description: 'Evaluate $\\lim_{n\\to\\infty}(1+\\frac{4}{n})^{n}$ correct to four decimal places.',
                        idealTime: 300,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Identify the limit form.',
                                description: 'Recognize that this limit is of the form $\\lim_{n\\to\\infty}(1+\\frac{a}{n})^{n}$, which evaluates to $e^a$. What is $a$?',
                                solution: 'e^4'
                            },
                            {
                                id: 'b',
                                title: 'b) Calculate the value.',
                                description: 'Compute $e^4$ to four decimal places.',
                                solution: '54.5982'
                            }
                        ]
                    },
                    {
                        id: 'EU3',
                        type: 'practice',
                        skill: 'Solving with e',
                        source: 'Week 8 Practice',
                        title: 'Solve for an exponent with base e',
                        fullQuestion: 'Find k such that $e^{k}=5.2$. Give k to three decimal places.',
                        description: 'Find k such that $e^{k}=5.2$. Give k to three decimal places.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Solve for k.',
                                description: 'Use the natural logarithm to solve for k.',
                                solution: 'k = ln(5.2)'
                            },
                             {
                                id: 'b',
                                title: 'b) Calculate the value.',
                                description: 'Compute the value of k to three decimal places.',
                                solution: '1.649'
                            }
                        ]
                    },
                    {
                        id: 'EU4',
                        type: 'practice',
                        skill: 'Evaluating functions with e',
                        source: 'Week 8 Practice',
                        title: 'Evaluate a function with base e',
                        fullQuestion: 'For $f(x)=3e^{0.7x}$ evaluate f(0), f(1) and state the y-intercept of its graph.',
                        description: 'For $f(x)=3e^{0.7x}$ evaluate f(0), f(1) and state the y-intercept of its graph.',
                        idealTime: 180,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Evaluate f(0).',
                                description: 'Substitute x=0 into the function.',
                                solution: '3'
                            },
                            {
                                id: 'b',
                                title: 'b) Evaluate f(1).',
                                description: 'Substitute x=1 into the function.',
                                solution: '6.04'
                            },
                            {
                                id: 'c',
                                title: 'c) State the y-intercept.',
                                description: 'The y-intercept is the value of the function at x=0.',
                                solution: '3'
                            }
                        ]
                    },
                    {
                        id: 'EU5',
                        type: 'practice',
                        skill: 'Graphing functions with e',
                        source: 'Week 8 Practice',
                        title: 'Sketch y=e^x',
                        fullQuestion: 'Sketch $y=e^{x}$ and mark the points where x = −1, 0, 1. Label the horizontal asymptote.',
                        description: 'Sketch $y=e^{x}$ and mark the points where x = −1, 0, 1. Label the horizontal asymptote.',
                        idealTime: 240,
                        steps: [
                             {
                                id: 'a',
                                title: 'a) Find the point at x = -1.',
                                description: 'Evaluate the function at x=-1.',
                                solution: '(-1, 0.368)'
                            },
                            {
                                id: 'b',
                                title: 'b) Find the point at x = 0.',
                                description: 'Evaluate the function at x=0.',
                                solution: '(0, 1)'
                            },
                            {
                                id: 'c',
                                title: 'c) Find the point at x = 1.',
                                description: 'Evaluate the function at x=1.',
                                solution: '(1, 2.718)'
                            },
                            {
                                id: 'd',
                                title: 'd) Label the horizontal asymptote.',
                                description: 'What value does y approach as x approaches negative infinity?',
                                solution: 'y=0'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'laws-exponents',
                name: 'Laws of Exponents & Solving Exponential Equations',
                description: 'Using exponent laws to simplify expressions and solve equations.',
                problems: [
                    {
                        id: 'W8-LX-LEAD',
                        type: 'lead-example',
                        skill: 'Simplifying Exponential Expressions',
                        source: 'Week 8 Example',
                        title: 'Simplify $\\frac{3^{2x} \\cdot 9^x}{27^x}$ leaving the answer as a single power of 3.',
                        description: 'Simplify $\\frac{3^{2x} \\cdot 9^x}{27^x}$ leaving the answer as a single power of 3.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Express all terms with a base of 3.',
                                description: 'Rewrite 9 and 27 as powers of 3.',
                                solution: '\\frac{3^{2x} \\cdot (3^2)^x}{(3^3)^x}'
                            },
                            {
                                id: 'b',
                                title: 'b) Simplify the exponents.',
                                description: 'Use the power of a power rule $(a^m)^n = a^{mn}$.',
                                solution: '\\frac{3^{2x} \\cdot 3^{2x}}{3^{3x}}'
                            },
                            {
                                id: 'c',
                                title: 'c) Combine the exponents.',
                                description: 'Use the product and quotient rules for exponents.',
                                solution: '3^{2x+2x-3x}'
                            },
                            {
                                id: 'd',
                                title: 'd) State the final answer.',
                                description: 'Simplify the expression in the exponent.',
                                solution: '3^x'
                            }
                        ]
                    },
                    {
                        id: 'LX1',
                        type: 'practice',
                        skill: 'Simplifying Exponential Expressions',
                        source: 'Week 8 Practice',
                        title: 'Simplify an exponential expression',
                        fullQuestion: 'Simplify $\\frac{2^{3x} \\cdot 4^{x-1}}{8^{2-x}}$ leaving the answer as a single power of 2.',
                        description: 'Simplify $\\frac{2^{3x} \\cdot 4^{x-1}}{8^{2-x}}$ leaving the answer as a single power of 2.',
                        idealTime: 240,
                        steps: [
                             {
                                id: 'a',
                                title: 'a) Express all terms with a base of 2.',
                                description: 'Rewrite 4 and 8 as powers of 2.',
                                solution: '\\frac{2^{3x} \\cdot (2^2)^{x-1}}{(2^3)^{2-x}}'
                            },
                             {
                                id: 'b',
                                title: 'b) Combine the exponents.',
                                description: 'Use exponent rules to combine all terms into a single exponent.',
                                solution: '2^{3x + 2(x-1) - 3(2-x)}'
                            },
                            {
                                id: 'c',
                                title: 'c) State the final answer.',
                                description: 'Simplify the expression in the exponent.',
                                solution: '2^{8x - 8}'
                            }
                        ]
                    },
                    {
                        id: 'LX2',
                        type: 'practice',
                        skill: 'Solving Exponential Equations',
                        source: 'Week 8 Practice',
                        title: 'Solve with a common base',
                        fullQuestion: 'Solve for x: $7^{2x-3}=49^{x+1}$.',
                        description: 'Solve for x: $7^{2x-3}=49^{x+1}$.',
                        idealTime: 300,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Express both sides with the same base.',
                                description: 'Rewrite 49 as a power of 7.',
                                solution: '7^{2x-3}=(7^2)^{x+1}'
                            },
                            {
                                id: 'b',
                                title: 'b) Equate the exponents.',
                                description: 'Since the bases are equal, the exponents must be equal.',
                                solution: '2x-3 = 2(x+1)'
                            },
                             {
                                id: 'c',
                                title: 'c) Solve for x.',
                                description: 'Simplify and solve the equation. What do you notice?',
                                solution: 'No solution'
                            }
                        ]
                    },
                    {
                        id: 'LX3',
                        type: 'practice',
                        skill: 'Solving Exponential Equations',
                        source: 'Week 8 Practice',
                        title: 'Solve with logarithms',
                        fullQuestion: 'Solve for x: $3^{x+2}=5 \\cdot 3^{2-2x}$.',
                        description: 'Solve for x: $3^{x+2}=5 \\cdot 3^{2-2x}$.',
                        idealTime: 360,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Isolate the exponential terms.',
                                description: 'Group all terms with base 3 on one side of the equation.',
                                solution: '\\frac{3^{x+2}}{3^{2-2x}} = 5'
                            },
                            {
                                id: 'b',
                                title: 'b) Simplify the left side.',
                                description: 'Use the quotient rule for exponents.',
                                solution: '3^{3x} = 5'
                            },
                            {
                                id: 'c',
                                title: 'c) Solve for x.',
                                description: 'Use logarithms to solve for x.',
                                solution: 'x = \\frac{\\log_3(5)}{3}'
                            }
                        ]
                    },
                    {
                        id: 'LX4',
                        type: 'practice',
                        skill: 'Solving Quadratic-Form Equations',
                        source: 'Week 8 Practice',
                        title: 'Solve a quadratic-form exponential equation',
                        fullQuestion: 'Solve for x: $e^{2x}-5e^{x}+6=0$.',
                        description: 'Solve for x: $e^{2x}-5e^{x}+6=0$.',
                        idealTime: 300,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Rewrite as a quadratic equation.',
                                description: 'Let $u = e^x$ and rewrite the equation in terms of u.',
                                solution: 'u^2 - 5u + 6 = 0'
                            },
                            {
                                id: 'b',
                                title: 'b) Solve for u.',
                                description: 'Factor the quadratic or use the quadratic formula.',
                                solution: 'u=2 or u=3'
                            },
                            {
                                id: 'c',
                                title: 'c) Solve for x.',
                                description: 'Substitute back $u=e^x$ and solve for x for both values of u.',
                                solution: 'x=ln(2) or x=ln(3)'
                            }
                        ]
                    },
                    {
                        id: 'LX5',
                        type: 'practice',
                        skill: 'Modeling with Exponential Functions',
                        source: 'Week 8 Practice',
                        title: 'Find growth factor from data points',
                        fullQuestion: 'A population obeys $A(t)=ab^{t}$. If A(0)=15 and A(2)=60, find the growth factor b.',
                        description: 'A population obeys $A(t)=ab^{t}$. If A(0)=15 and A(2)=60, find the growth factor b.',
                        idealTime: 300,
                        steps: [
                             {
                                id: 'a',
                                title: 'a) Use A(0) to find a.',
                                description: 'Substitute t=0 into the equation to solve for the initial value a.',
                                solution: 'a = 15'
                            },
                             {
                                id: 'b',
                                title: 'b) Use A(2) to solve for b.',
                                description: 'Substitute t=2 and the value of a you just found into the equation.',
                                solution: '60 = 15 \\cdot b^2'
                            },
                            {
                                id: 'c',
                                title: 'c) Find the growth factor b.',
                                description: 'Solve the equation for b.',
                                solution: 'b = 2'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'compound-interest',
                name: 'Compound-Interest & Continuous-Growth Models',
                description: 'Modeling financial growth and natural decay using compound interest and continuous growth formulas.',
                problems: [
                    {
                        id: 'W8-CI-LEAD',
                        type: 'lead-example',
                        skill: 'Compound Interest',
                        source: 'Week 8 Example',
                        title: 'Find the future value of $1,000 invested at 5% compounded semi-annually for 10 years.',
                        description: 'Find the future value of $1,000 invested at 5% compounded semi-annually for 10 years.',
                        idealTime: 300,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Identify the variables for the formula.',
                                description: 'For the formula $A = P(1+\\frac{r}{n})^{nt}$, identify P, r, n, and t.',
                                solution: 'P=1000, r=0.05, n=2, t=10'
                            },
                            {
                                id: 'b',
                                title: 'b) Calculate the future value.',
                                description: 'Substitute the values into the formula and compute the result.',
                                solution: '1638.62'
                            }
                        ]
                    },
                    {
                        id: 'CI1',
                        type: 'practice',
                        skill: 'Compound Interest',
                        source: 'Week 8 Practice',
                        title: 'Calculate future value with compound interest',
                        fullQuestion: 'Find the future value of $2,500 invested at 6% compounded quarterly for 12 years.',
                        description: 'Find the future value of $2,500 invested at 6% compounded quarterly for 12 years.',
                        idealTime: 360,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Set up the formula.',
                                description: 'Use the future value formula for compound interest: $A = P(1+\\frac{r}{n})^{nt}$.',
                                solution: 'A = 2500(1+0.06/4)^{4*12}'
                            },
                            {
                                id: 'b',
                                title: 'b) Calculate the future value.',
                                description: 'Compute the final amount.',
                                solution: '5113.85'
                            }
                        ]
                    },
                    {
                        id: 'CI2',
                        type: 'practice',
                        skill: 'Continuous Growth',
                        source: 'Week 8 Practice',
                        title: 'Calculate doubling time with continuous compounding',
                        fullQuestion: 'How long will it take $500 to double if it earns 4% interest compounded continuously?',
                        description: 'How long will it take $500 to double if it earns 4% interest compounded continuously?',
                        idealTime: 360,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Set up the continuous growth formula.',
                                description: 'Use the formula $A = Pe^{rt}$. The future value A is double the principal P.',
                                solution: '1000 = 500e^{0.04t}'
                            },
                            {
                                id: 'b',
                                title: 'b) Solve for t.',
                                description: 'Isolate the exponential term and use natural logarithms to solve for t.',
                                solution: '17.33'
                            }
                        ]
                    },
                    {
                        id: 'CI3',
                        type: 'practice',
                        skill: 'Effective Annual Rate (EAR)',
                        source: 'Week 8 Practice',
                        title: 'Calculate Effective Annual Rate (EAR)',
                        fullQuestion: 'Compute the effective annual rate (EAR) for 5% nominal interest compounded monthly.',
                        description: 'Compute the effective annual rate (EAR) for 5% nominal interest compounded monthly.',
                        idealTime: 300,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Use the EAR formula.',
                                description: 'Use the formula $EAR = (1+\\frac{r}{n})^{n} - 1$.',
                                solution: 'EAR = (1+0.05/12)^{12} - 1'
                            },
                            {
                                id: 'b',
                                title: 'b) Calculate the rate.',
                                description: 'Compute the EAR and express it as a percentage.',
                                solution: '5.116%'
                            }
                        ]
                    },
                    {
                        id: 'CI4',
                        type: 'practice',
                        skill: 'Natural Decay Models',
                        source: 'Week 8 Practice',
                        title: 'Calculate decay constant from half-life',
                        fullQuestion: 'Carbon-14 decays according to $Q(t)=Q_{0}e^{-kt}$. Given a half-life of 5,730 years, find k to four decimals.',
                        description: 'Carbon-14 decays according to $Q(t)=Q_{0}e^{-kt}$. Given a half-life of 5,730 years, find k to four decimals.',
                        idealTime: 420,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Set up the half-life equation.',
                                description: 'At the half-life, $Q(t) = 0.5 Q_0$. Set up the equation with t=5730.',
                                solution: '0.5Q_0 = Q_0e^{-k*5730}'
                            },
                            {
                                id: 'b',
                                title: 'b) Solve for the decay constant k.',
                                description: 'Solve the equation for k.',
                                solution: 'k = -ln(0.5)/5730'
                            },
                             {
                                id: 'c',
                                title: 'c) Calculate k.',
                                description: 'Compute the value of k and round to four decimal places.',
                                solution: '0.0001'
                            }
                        ]
                    },
                    {
                        id: 'CI5',
                        type: 'practice',
                        skill: 'Solving for Rates',
                        source: 'Week 8 Practice',
                        title: 'Calculate nominal rate for a given growth',
                        fullQuestion: 'At what annual nominal rate r (compounded monthly) will an investment triple in 9 years?',
                        description: 'At what annual nominal rate r (compounded monthly) will an investment triple in 9 years?',
                        idealTime: 480,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Set up the compound interest formula.',
                                description: 'Use $A = P(1+\\frac{r}{n})^{nt}$ where A=3P, n=12, and t=9.',
                                solution: '3P = P(1+r/12)^{12*9}'
                            },
                             {
                                id: 'b',
                                title: 'b) Solve for r.',
                                description: 'Isolate and solve for the nominal rate r.',
                                solution: 'r = 12 * (3^{1/108} - 1)'
                            },
                            {
                                id: 'c',
                                title: 'c) Calculate the rate.',
                                description: 'Compute the value of r and express it as a percentage.',
                                solution: '12.28%'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'log-functions',
                name: 'Logarithmic Functions',
                description: 'Understanding logarithms as the inverse of exponentials and using their properties to solve equations.',
                problems: [
                    {
                        id: 'W8-LG-LEAD',
                        type: 'lead-example',
                        skill: 'Evaluating Logarithms',
                        source: 'Week 8 Example',
                        title: 'Evaluate $\\log_2(16) + \\log_2(0.5)$.',
                        description: 'Evaluate $\\log_2(16) + \\log_2(0.5)$.',
                        idealTime: 180,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Evaluate the first term.',
                                description: 'What is $\\log_2(16)$?',
                                solution: '4'
                            },
                            {
                                id: 'b',
                                title: 'b) Evaluate the second term.',
                                description: 'What is $\\log_2(0.5)$?',
                                solution: '-1'
                            },
                            {
                                id: 'c',
                                title: 'c) Compute the sum.',
                                description: 'Add the two results together.',
                                solution: '3'
                            }
                        ]
                    },
                    {
                        id: 'LG1',
                        type: 'practice',
                        skill: 'Logarithmic and Exponential Forms',
                        source: 'Week 8 Practice',
                        title: 'Convert log to exponential form',
                        fullQuestion: 'Rewrite $\\log_{3}81=4$ in exponential form and verify the equality.',
                        description: 'Rewrite $\\log_{3}81=4$ in exponential form and verify the equality.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Convert to exponential form.',
                                description: 'Use the definition $\\log_b(a)=c \\iff b^c=a$.',
                                solution: '3^4 = 81'
                            }
                        ]
                    },
                    {
                        id: 'LG2',
                        type: 'practice',
                        skill: 'Evaluating Logarithms',
                        source: 'Week 8 Practice',
                        title: 'Evaluate a log expression',
                        fullQuestion: 'Evaluate $\\log_{5}125-\\log_{5}25+\\log_{5}\\sqrt{5}$.',
                        description: 'Evaluate $\\log_{5}125-\\log_{5}25+\\log_{5}\\sqrt{5}$.',
                        idealTime: 180,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Evaluate each term.',
                                description: 'Calculate the value of each logarithm individually.',
                                solution: '3 - 2 + 0.5'
                            },
                            {
                                id: 'b',
                                title: 'b) Compute the result.',
                                description: 'Perform the addition and subtraction.',
                                solution: '1.5'
                            }
                        ]
                    },
                    {
                        id: 'LG3',
                        type: 'practice',
                        skill: 'Solving Logarithmic Equations',
                        source: 'Week 8 Practice',
                        title: 'Solve a logarithmic equation',
                        fullQuestion: 'Solve for x: $\\log_{2}(x-3)+\\log_{2}(x+1)=3$.',
                        description: 'Solve for x: $\\log_{2}(x-3)+\\log_{2}(x+1)=3$.',
                        idealTime: 360,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Combine the logarithms.',
                                description: 'Use the product rule for logs: $\\log_b(M) + \\log_b(N) = \\log_b(MN)$.',
                                solution: '\\log_2((x-3)(x+1)) = 3'
                            },
                            {
                                id: 'b',
                                title: 'b) Convert to exponential form.',
                                description: 'Rewrite the logarithmic equation in its equivalent exponential form.',
                                solution: '(x-3)(x+1) = 2^3'
                            },
                            {
                                id: 'c',
                                title: 'c) Solve the resulting quadratic equation.',
                                description: 'Expand and solve for x. Remember to check for extraneous solutions.',
                                solution: '4.464'
                            }
                        ]
                    },
                    {
                        id: 'LG4',
                        type: 'practice',
                        skill: 'Solving Exponential Equations with Logs',
                        source: 'Week 8 Practice',
                        title: 'Solve an exponential equation with logs',
                        fullQuestion: 'Solve for x to three decimals: $5^{2x}=18$.',
                        description: 'Solve for x to three decimals: $5^{2x}=18$.',
                        idealTime: 240,
                        steps: [
                             {
                                id: 'a',
                                title: 'a) Isolate x.',
                                description: 'Take the logarithm of both sides to solve for x.',
                                solution: 'x = \\frac{\\log_5(18)}{2}'
                            },
                             {
                                id: 'b',
                                title: 'b) Calculate the value.',
                                description: 'Compute the value of x and round to three decimal places.',
                                solution: '0.898'
                            }
                        ]
                    },
                    {
                        id: 'LG5',
                        type: 'practice',
                        skill: 'Finding Inverse Functions with Logs',
                        source: 'Week 8 Practice',
                        title: 'Find an inverse function with logs',
                        fullQuestion: 'Given $f(x)=-\\frac{1}{2} e^{x}$ (one-to-one on its domain), find $f^{-1}(x)$.',
                        description: 'Given $f(x)=-\\frac{1}{2} e^{x}$ (one-to-one on its domain), find $f^{-1}(x)$.',
                        idealTime: 360,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Set up the inverse relationship.',
                                description: 'Start with $y = -\\frac{1}{2} e^{x}$, then swap x and y.',
                                solution: 'x = -\\frac{1}{2} e^{y}'
                            },
                            {
                                id: 'b',
                                title: 'b) Solve for y.',
                                description: 'Isolate the exponential term and then use the natural logarithm to solve for y.',
                                solution: 'y = ln(-2x)'
                            },
                            {
                                id: 'c',
                                title: 'c) State the inverse function.',
                                description: 'Write the final answer for $f^{-1}(x)$.',
                                solution: 'f^{-1}(x) = ln(-2x)'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'lecture-2',
        title: 'Week 10: Sequences and Series',
        modules: [
            {
                id: 'sequences',
                name: 'Sequences',
                description: 'An infinite sequence is a function a: N → R. A finite sequence is a function a: {1, 2, . . . , n} → R. Given n ∈ N, the n-term of the sequence a is a(n). It is customary to write a_n instead of a(n) and we will adopt this notation.\n\nWe will use $(a_k)^n_{k=1}$ to indicate that the sequence is finite of length n, i.e., $a_1, a_2, a_3, . . . , a_n$. We will use $(a_k)^∞_{k=1}$ to indicate that the sequence is infinite, i.e., $a_1, a_2, a_3, . . . .$\n\nSequences can be given:\na) by specifying its general term, a formula for writing the n-th term of the sequence\nb) by listing the terms of the sequence\nc) by a recursive formula',
                problems: [
                    {
                        id: 'W10-SQ-LEAD',
                        type: 'lead-example',
                        skill: 'Sequences by General Term',
                        source: 'Week 10 Example 1',
                        title: 'Find the first four terms of the sequence given by the general term $a_n = 2n$.',
                        description: 'If the sequence $(a_n)^∞_{n=1}$ is given by $a_n = 2n$, then $a_1 = 2 \\cdot 1 = 2$, $a_2 = 2 \\cdot 2 = 4$, $a_3 = 2 \\cdot 3 = 6$, . . . are respectively the 1-st, 2-nd and 3-rd term of the sequence. We see that $a_n = 2n$ is the sequence of even numbers: 2, 4, 6, 8, 10, . . .',
                        idealTime: 180,
                        steps: [
                            {
                                id: '1',
                                title: 'Step 1: Find the first term ($a_1$)',
                                description: 'Substitute n=1 into the formula $a_n = 2n$.',
                                solution: '2'
                            },
                            {
                                id: '2',
                                title: 'Step 2: Find the second term ($a_2$)',
                                description: 'Substitute n=2 into the formula $a_n = 2n$.',
                                solution: '4'
                            },
                            {
                                id: '3',
                                title: 'Step 3: Find the third term ($a_3$)',
                                description: 'Substitute n=3 into the formula $a_n = 2n$.',
                                solution: '6'
                            },
                            {
                                id: '4',
                                title: 'Step 4: Find the fourth term ($a_4$)',
                                description: 'Substitute n=4 into the formula $a_n = 2n$.',
                                solution: '8'
                            }
                        ]
                    },
                    {
                        id: 'SQ1',
                        type: 'practice',
                        skill: 'Sequences by General Term',
                        source: 'Week 10 Example 1 Practice',
                        title: 'Find the first four terms for $a_n = n^2$.',
                        description: 'If the sequence $(a_n)^∞_{n=1}$ is given by $a_n = n^2$, then $a_1 = 1^2 = 1$, $a_2 = 2^2 = 4$, $a_3 = 3^2 = 9$, . . . are respectively the 1-st, 2-nd and 3-rd term of the sequence. We see that a(n) = n^2 is the sequence of squares of natural numbers: 1, 4, 9, 16, 25, . . .',
                        idealTime: 180,
                        steps: [
                             {
                                id: '1',
                                title: 'Step 1: Find the first term ($a_1$)',
                                description: 'Substitute n=1 into the formula $a_n = n^2$.',
                                solution: '1'
                            },
                            {
                                id: '2',
                                title: 'Step 2: Find the second term ($a_2$)',
                                description: 'Substitute n=2 into the formula $a_n = n^2$.',
                                solution: '4'
                            },
                            {
                                id: '3',
                                title: 'Step 3: Find the third term ($a_3$)',
                                description: 'Substitute n=3 into the formula $a_n = n^2$.',
                                solution: '9'
                            },
                            {
                                id: '4',
                                title: 'Step 4: Find the fourth term ($a_4$)',
                                description: 'Substitute n=4 into the formula $a_n = n^2$.',
                                solution: '16'
                            }
                        ]
                    },
                     {
                        id: 'SQ2',
                        type: 'practice',
                        skill: 'Sequences by General Term',
                        source: 'Week 10 Example 1 Practice',
                        title: 'Find specified terms for $a_n = \\frac{1}{2^n}$.',
                        description: 'If the sequence $(a_n)^∞_{n=1}$ is given by $a_n = \\frac{1}{2^n}$, then $a_1 = \\frac{1}{2^1} = \\frac{1}{2}$, $a_2 = \\frac{1}{2^2} = \\frac{1}{4}$, $a_5 = \\frac{1}{2^5} = \\frac{1}{32}$ are respectively the 1-st, 2-nd and 5-th term of the sequence.',
                        idealTime: 180,
                        steps: [
                             {
                                id: '1',
                                title: 'Step 1: Find the first term ($a_1$)',
                                description: 'Substitute n=1 into the formula $a_n = \\frac{1}{2^n}$.',
                                solution: '1/2'
                            },
                            {
                                id: '2',
                                title: 'Step 2: Find the second term ($a_2$)',
                                description: 'Substitute n=2 into the formula $a_n = \\frac{1}{2^n}$.',
                                solution: '1/4'
                            },
                            {
                                id: '3',
                                title: 'Step 3: Find the fifth term ($a_5$)',
                                description: 'Substitute n=5 into the formula $a_n = \\frac{1}{2^n}$.',
                                solution: '1/32'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
