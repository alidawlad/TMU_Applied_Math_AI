import type { Problem } from '@/lib/types';

export const sampleEnhancedQuestions: Problem[] = [
    // Fill-in-blank question example (like the reference image)
    {
        id: 'FIB1',
        skill: 'Arithmetic Operations',
        type: 'practice',
        title: 'Order of Operations Practice',
        description: 'Evaluate the mathematical expression using correct order of operations.',
        questionType: 'fill-in-blank',
        idealTime: 2,
        steps: [
            {
                id: 'FIB1-1',
                title: 'Evaluate the expression',
                description: 'Follow the order of operations (PEMDAS/BODMAS) to simplify.',
                questionType: 'fill-in-blank',
                questionTemplate: '$7 \\cdot [3(7 - 3) - 7] = {blank1}$',
                instructionText: '(Simplify your answer.)',
                solution: '21',
                hint: 'Start with the innermost parentheses: 7 - 3 = 4, then 3(4) = 12, then 12 - 7 = 5, finally 7 × 5 = 35',
                blankPositions: [
                    {
                        id: 'blank1',
                        placeholder: 'blank1',
                        solution: '21'
                    }
                ]
            }
        ]
    },
    
    // Multiple choice question example (like the reference image with graphs)
    {
        id: 'MC1',
        skill: 'Function Analysis',
        type: 'practice',
        title: 'Inverse Functions and Graphs',
        description: 'Identify the correct graph representation of inverse functions.',
        questionType: 'multiple-choice',
        idealTime: 3,
        steps: [
            {
                id: 'MC1-1',
                title: 'Choose the correct graph',
                description: 'Show that the given functions are inverse functions of each other. Then display the graphs of each function and the line y = x on a graphing calculator and note that each is the mirror image of the other across y = x.',
                questionType: 'multiple-choice',
                instructionText: 'Choose the correct answer below.',
                solution: 'A',
                hint: 'Inverse functions are reflections of each other across the line y = x',
                choices: [
                    {
                        id: 'A',
                        text: 'Graph A',
                        mathContent: 'y = e^x \\text{ and } y = \\log_e x',
                        isCorrect: true
                    },
                    {
                        id: 'B',
                        text: 'Graph B',
                        mathContent: 'y = x^2 \\text{ and } y = \\sqrt{x}',
                        isCorrect: false
                    },
                    {
                        id: 'C',
                        text: 'Graph C',
                        mathContent: 'y = x^3 \\text{ and } y = \\sqrt[3]{x}',
                        isCorrect: false
                    },
                    {
                        id: 'D',
                        text: 'Graph D',
                        mathContent: 'y = \\sin(x) \\text{ and } y = \\cos(x)',
                        isCorrect: false
                    }
                ]
            }
        ]
    },
    
    // Complex fill-in-blank with multiple blanks
    {
        id: 'FIB2',
        skill: 'Algebraic Manipulation',
        type: 'practice',
        title: 'Quadratic Formula Application',
        description: 'Use the quadratic formula to solve the equation.',
        questionType: 'fill-in-blank',
        idealTime: 4,
        steps: [
            {
                id: 'FIB2-1',
                title: 'Solve using quadratic formula',
                description: 'Apply the quadratic formula to find the solutions.',
                questionType: 'fill-in-blank',
                questionTemplate: 'For $2x^2 - 5x + 3 = 0$, the solutions are $x = {blank1}$ and $x = {blank2}$',
                instructionText: 'Use the quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$',
                solution: '1.5, 1',
                hint: 'Identify a = 2, b = -5, c = 3, then substitute into the formula',
                blankPositions: [
                    {
                        id: 'blank1',
                        placeholder: 'blank1',
                        solution: '1.5'
                    },
                    {
                        id: 'blank2',
                        placeholder: 'blank2',
                        solution: '1'
                    }
                ]
            }
        ]
    },
    
    // Multiple choice with mathematical choices
    {
        id: 'MC2',
        skill: 'Limits and Continuity',
        type: 'practice',
        title: 'Limit Evaluation',
        description: 'Evaluate the limit of a function as x approaches a specific value.',
        questionType: 'multiple-choice',
        idealTime: 3,
        steps: [
            {
                id: 'MC2-1',
                title: 'Evaluate the limit',
                description: 'Find the limit as x approaches 2.',
                questionType: 'multiple-choice',
                instructionText: 'What is $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$?',
                solution: 'B',
                hint: 'Factor the numerator and simplify before taking the limit',
                choices: [
                    {
                        id: 'A',
                        text: 'The limit does not exist',
                        mathContent: '\\text{DNE}',
                        isCorrect: false
                    },
                    {
                        id: 'B',
                        text: 'The limit equals 4',
                        mathContent: '4',
                        isCorrect: true
                    },
                    {
                        id: 'C',
                        text: 'The limit equals 0',
                        mathContent: '0',
                        isCorrect: false
                    },
                    {
                        id: 'D',
                        text: 'The limit equals infinity',
                        mathContent: '\\infty',
                        isCorrect: false
                    }
                ]
            }
        ]
    },
    
    // Mixed question types in one problem
    {
        id: 'MIX1',
        skill: 'Comprehensive Problem Solving',
        type: 'practice',
        title: 'Business Mathematics Application',
        description: 'A comprehensive problem involving multiple mathematical concepts.',
        idealTime: 8,
        steps: [
            {
                id: 'MIX1-1',
                title: 'Calculate the interest rate',
                description: 'Convert the annual percentage rate to decimal form.',
                questionType: 'fill-in-blank',
                questionTemplate: 'Annual rate of 8.5% = {blank1} in decimal form',
                instructionText: '(Express as a decimal to 4 places)',
                solution: '0.0850',
                hint: 'Divide the percentage by 100',
                blankPositions: [
                    {
                        id: 'blank1',
                        placeholder: 'blank1',
                        solution: '0.0850'
                    }
                ]
            },
            {
                id: 'MIX1-2',
                title: 'Choose the correct formula',
                description: 'Select the appropriate formula for compound interest.',
                questionType: 'multiple-choice',
                instructionText: 'Which formula should be used for compound interest?',
                solution: 'A',
                hint: 'Compound interest includes the effect of compounding periods',
                choices: [
                    {
                        id: 'A',
                        text: 'Compound Interest Formula',
                        mathContent: 'A = P(1 + \\frac{r}{n})^{nt}',
                        isCorrect: true
                    },
                    {
                        id: 'B',
                        text: 'Simple Interest Formula',
                        mathContent: 'I = Prt',
                        isCorrect: false
                    },
                    {
                        id: 'C',
                        text: 'Present Value Formula',
                        mathContent: 'PV = \\frac{FV}{(1 + r)^n}',
                        isCorrect: false
                    },
                    {
                        id: 'D',
                        text: 'Annuity Formula',
                        mathContent: 'A = PMT \\cdot \\frac{(1 + r)^n - 1}{r}',
                        isCorrect: false
                    }
                ]
            },
            {
                id: 'MIX1-3',
                title: 'Calculate the final amount',
                description: 'Use the compound interest formula to find the final amount.',
                questionType: 'step-by-step',
                solution: '2653.30',
                hint: 'Substitute P = 2000, r = 0.085, n = 4, t = 3.5 into the formula'
            }
        ]
    }
];

// Helper function to get all enhanced questions
export function getAllEnhancedQuestions(): Problem[] {
    return sampleEnhancedQuestions;
}

// Helper function to get questions by type
export function getQuestionsByType(type: 'fill-in-blank' | 'multiple-choice' | 'step-by-step'): Problem[] {
    return sampleEnhancedQuestions.filter(problem => 
        problem.questionType === type || 
        problem.steps.some(step => step.questionType === type)
    );
}