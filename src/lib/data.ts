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
                        id: 'W8-CF-P1',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Let f(x) = x^2 - 6 and g(x) = 4x + 5. Compute (g ∘ f)(-2) and (f ∘ f)(3).',
                        description: 'Let f(x) = x^2 - 6 and g(x) = 4x + 5. Compute (g ∘ f)(-2) and (f ∘ f)(3).',
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
                                solution: '3',
                                calculator_tip: 'Define f(x):=x^2-6 and g(x):=4*x+5, then evaluate g(f(-2)) and f(f(3)) directly.'
                            }
                        ]
                    },
                    {
                        id: 'W8-CF-P2',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Given f(x) = 2x - 5 and g(x) = 3x^2 + 1, find explicit formulas for (g ∘ f)(x) and (f ∘ g)(x).',
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
                                solution: '6x^2 - 3',
                                calculator_tip: 'Use expand(g(f(x))) and expand(f(g(x))) after defining functions to get simplified formulas.'
                            }
                        ]
                    },
                    {
                        id: 'W8-CF-P3',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'For f(x) = 2x + 1, g(x) = x^2 - x + 1, and h(x) = √(x^2 + 3), determine (h ∘ g ∘ f)(x).',
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
                                solution: 'sqrt((4x^2 + 2x + 1)^2 + 3)',
                                calculator_tip: 'Define all three functions, then use expand(h(g(f(x)))) to get the complete composition.'
                            }
                        ]
                    },
                    {
                        id: 'W8-CF-P4',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'A company\'s profit P (in dollars) is P = g(x), where x is units sold, and x = f(p), where p is the unit price (in dollars). Express profit directly as a function of price.',
                        description: 'A company\'s profit P (in dollars) is P = g(x), where x is units sold, and x = f(p), where p is the unit price (in dollars). Express profit directly as a function of price.',
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
                                solution: 'P(p) = g(f(p))',
                                calculator_tip: 'After defining g(x) and f(p), create the composition P(p):=g(f(p)) to get profit as function of price.'
                            }
                        ]
                    },
                    {
                        id: 'W8-CF-P5',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Let f(x) = ln x − ln (x + 1) and g(x) = e^x ⁄ (1 − e^x). Evaluate (f ∘ g)(x).',
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
                                solution: 'x',
                                calculator_tip: 'Use simplify(f(g(x))) after defining both functions to automatically simplify the logarithmic expression.'
                            }
                        ]
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
                        id: 'W8-IF-P1',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Find f⁻¹(x) for f(x) = 4x + 9. State its domain and range, and verify that (f⁻¹ ∘ f)(x) = x.',
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
                                solution: 'x',
                                calculator_tip: 'Use solve(y=4*x+9,x) to get x=(y-9)/4, then verify with simplify(finv(f(x))).'
                            }
                        ]
                    },
                    {
                        id: 'W8-IF-P2',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'The function g(x) = x^2 − 2 is not one-to-one on ℝ. Restrict its domain so that it becomes one-to-one, then find g⁻¹ and sketch both graphs on the same axes.',
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
                                solution: 'g^{-1}(x) = sqrt(x + 2)',
                                calculator_tip: 'Graph g(x):=x^2-2 with domain restriction, then use solve(y=x^2-2,x) and graph both functions.'
                            }
                        ]
                    },
                    {
                        id: 'W8-IF-P3',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'For f(x) = 2^{−x}, determine f⁻¹(x) and sketch the graphs of f and f⁻¹ on a common set of axes.',
                        description: 'For f(x) = 2^{−x}, determine f⁻¹(x) and sketch the graphs of f and f⁻¹ on a common set of axes.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Find f⁻¹(x).',
                                description: 'Set y = 2^{-x}, swap variables, and solve for y using logarithms.',
                                solution: 'f^{-1}(x) = -log2(x)',
                                calculator_tip: 'Use solve(y=2^(-x),x) to get x=-log(y)/log(2), then graph both f(x) and finv(x):=-log(x)/log(2).'
                            }
                        ]
                    },
                    {
                        id: 'W8-IF-P4',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Suppose f(t) = 25 ⁄ [1 + 4 e^{−2t}]. (a) Find f⁻¹(t). (b) Compute f(2).',
                        description: 'Suppose f(t) = 25 ⁄ [1 + 4 e^{−2t}]. (a) Find f⁻¹(t). (b) Compute f(2).',
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
                                solution: 'f^{-1}(t) = -1/2 * ln((25/t - 1) / 4)',
                                calculator_tip: 'Use solve(y=25/(1+4*e^(-2*t)),t) for inverse, then evaluate f(2) directly with your defined function.'
                            }
                        ]
                    },
                    {
                        id: 'W8-IF-P5',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Let h(x) = (1⁄5)x − 2. Find h⁻¹(x) and verify h∘h⁻¹(x) = x.',
                        description: 'Let h(x) = (1⁄5)x − 2. Find h⁻¹(x) and verify h∘h⁻¹(x) = x.',
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
                                solution: 'x',
                                calculator_tip: 'Use solve(y=(1/5)*x-2,x) to get hinv(x):=5*(x+2), then verify with simplify(h(hinv(x))).'
                            }
                        ]
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
                        id: 'W8-OO-P1',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Prove algebraically whether f(x) = 5x − 7 is one-to-one.',
                        description: 'Prove algebraically whether f(x) = 5x − 7 is one-to-one.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Set f(a) = f(b) and solve.',
                                description: 'Start with 5a - 7 = 5b - 7. Can you simplify this to a = b?',
                                solution: 'Yes, it simplifies to a = b, so it is one-to-one.',
                                calculator_tip: 'Use solve(5*x-7=5*y-7,x) – if result is x=y only, then one-to-one.'
                            }
                        ]
                    },
                    {
                        id: 'W8-OO-P2',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Is g(x) = √(x + 3) one-to-one? Justify your answer.',
                        description: 'Is g(x) = √(x + 3) one-to-one? Justify your answer.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Use the algebraic or graphical test.',
                                description: 'Set g(a) = g(b) or graph the function. What is the result?',
                                solution: 'Yes, it is one-to-one.',
                                calculator_tip: 'Use solve(sqrt(x+3)=sqrt(y+3),x) or graph g(x):=sqrt(x+3) and apply horizontal line test visually.'
                            }
                        ]
                    },
                    {
                        id: 'W8-OO-P3',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Determine if h(x) = |x − 2| is one-to-one and explain your reasoning.',
                        description: 'Determine if h(x) = |x − 2| is one-to-one and explain your reasoning.',
                        idealTime: 120,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Use the algebraic or graphical test.',
                                description: 'Set h(a) = h(b) or graph the function. What is the result?',
                                solution: 'No, it is not one-to-one.',
                                calculator_tip: 'Use solve(abs(x-2)=abs(y-2),x) – multiple solutions or graph h(x):=abs(x-2) show it\'s not one-to-one.'
                            }
                        ]
                    },
                    {
                        id: 'W8-OO-P4',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Use the horizontal-line test to decide whether k(x) = x^3 − 2x is one-to-one. Explain briefly.',
                        description: 'Use the horizontal-line test to decide whether k(x) = x^3 − 2x is one-to-one. Explain briefly.',
                        idealTime: 180,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Graph the function and apply the test.',
                                description: 'Does any horizontal line cross the graph more than once?',
                                solution: 'No, it is not one-to-one. The line y=0 crosses at three points.',
                                calculator_tip: 'Graph k(x):=x^3-2*x and visually check if any horizontal line crosses the graph more than once.'
                            }
                        ]
                    },
                    {
                        id: 'W8-OO-P5',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'For the piece-wise function m(x) = { x + 2 if x ≤ 0 ; x^2 if x > 0 }, determine whether m is one-to-one.',
                        description: 'For the piece-wise function m(x) = { x + 2 if x ≤ 0 ; x^2 if x > 0 }, determine whether m is one-to-one.',
                        idealTime: 240,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Graph the function and apply the horizontal-line test.',
                                description: 'Consider the two pieces. For example, does the line y=1 cross the graph in more than one place?',
                                solution: 'No, it is not one-to-one. The line y=1 intersects at x=-1 and x=1.',
                                calculator_tip: 'Use piecewise template or graph m(x):=piecewise(x+2,x≤0,x^2,x>0) and apply horizontal line test.'
                            }
                        ]
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
                        id: 'W8-EX-P1',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Which of the following are exponential functions of the form y = ab^x? (a) y = −4^x (b) y = (1⁄2)^{-3x} (c) y = (√7)^{-x} (d) y = (−3)^x',
                        description: 'Which of the following are exponential functions of the form y = ab^x? (a) y = −4^x (b) y = (1⁄2)^{-3x} (c) y = (√7)^{-x} (d) y = (−3)^x',
                        idealTime: 180,
                        steps: [
                            {
                                id: 'a',
                                title: 'a) Analyze each function.',
                                description: 'Rewrite each function to see if it matches the form y = a * b^x, where b > 0 and b != 1.',
                                solution: '(a), (b), and (c) are exponential. (d) is not because the base is negative.',
                                calculator_tip: 'Graph each function separately to verify exponential behavior and check for real vs complex values.'
                            }
                        ]
                    },
                    {
                        id: 'W8-EX-P2',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Sketch f(x) = (1⁄4)·3^x and g(x) = 3^x for −3 ≤ x ≤ 3, clearly labeling any intercepts and asymptotes.',
                        description: 'Sketch f(x) = (1⁄4)·3^x and g(x) = 3^x for −3 ≤ x ≤ 3, clearly labeling any intercepts and asymptotes.',
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
                                solution: 'y = 0',
                                calculator_tip: 'Graph both functions, then use Menu→5→1 (Trace) to find y-intercepts and Menu→6→2 (Zero) if needed.'
                            }
                        ]
                    },
                    {
                        id: 'W8-EX-P3',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Solve for x: 5^{2x − 1} = 125.',
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
                                solution: '2',
                                calculator_tip: 'Use solve(5^(2*x-1)=125,x) or recognize that 125=5^3 and solve 2x-1=3 directly.'
                            }
                        ]
                    },
                    {
                        id: 'W8-EX-P4',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'Solve for x: e^{3x − 2} = 7.',
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
                                solution: 'x = (ln(7) + 2) / 3',
                                calculator_tip: 'Use solve(e^(3*x-2)=7,x) or solve manually: 3x-2=ln(7), so x=(ln(7)+2)/3.'
                            }
                        ]
                    },
                    {
                        id: 'W8-EX-P5',
                        type: 'practice',
                        source: 'Week 8 Practice',
                        title: 'For each function, state whether its graph is increasing or decreasing and give the y-intercept: (i) f(x) = (1⁄3)^x (ii) g(x) = 2^{x − 1}.',
                        description: 'For each function, state whether its graph is increasing or decreasing and give the y-intercept: (i) f(x) = (1⁄3)^x (ii) g(x) = 2^{x − 1}.',
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
                                solution: 'Increasing, y-intercept = 1/2',
                                calculator_tip: 'Graph both functions, evaluate f(0) and g(0) for y-intercepts, and observe slope/behavior from graphs.'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
