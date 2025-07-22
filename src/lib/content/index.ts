import type { Lecture, ModuleContent } from '@/lib/types';
import { week10Examples } from './week10-examples';
import { week10SeriesExamples } from './week10-examples-series';
import { week10ArithmeticAdvancedExamples } from './week10-examples-arithmetic-advanced';
import { week10GeometricExamples } from './week10-examples-geometric';
import { week10GeometricSeriesExamples } from './week10-examples-geometric-series';
import { week10InfiniteSeriesExamples } from './week10-examples-infinite-series';
import { week10PracticeProblems } from './week10-practice';
import { week11SimpleInterestExamples } from './week11-examples-simple-interest';
import { week11CompoundInterestExamples } from './week11-examples-compound-interest';
import { week11MixedProblemsExamples } from './week11-examples-mixed-problems';
import { week11PracticeProblems } from './week11-practice';
import { sampleEnhancedQuestions } from './sample-enhanced-questions';

// Create modules by combining examples and practice problems
const sequencesByGeneralTermModule: ModuleContent = {
    id: 'sequences-general-term',
    name: 'Sequences by General Term',
    description: 'Understanding sequences defined by explicit formulas.',
    examples: week10Examples.filter(e => e.id === 'W10-E1'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Sequences by General Term')
};

const sequencesListingAndRecursiveModule: ModuleContent = {
    id: 'sequences-listing-recursive',
    name: 'Sequences by Listing Terms & Recursive Definitions',
    description: 'Finding patterns in sequences and working with recursive definitions.',
    examples: week10Examples.filter(e => e.id === 'W10-E2'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Pattern Recognition' || p.skill === 'Recursive Sequences')
};

const fibonacciModule: ModuleContent = {
    id: 'fibonacci-sequence',
    name: 'Fibonacci Sequence',
    description: 'The famous Fibonacci sequence and its properties.',
    examples: week10Examples.filter(e => e.id === 'W10-E3'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Fibonacci Sequence' || p.skill === 'Modified Fibonacci' || p.skill === 'Golden Ratio Application')
};

// New modules for summation notation and arithmetic sequences
const summationNotationModule: ModuleContent = {
    id: 'summation-notation',
    name: 'Summation Notation',
    description: 'Understanding and working with sigma notation for series.',
    examples: week10SeriesExamples.filter(e => e.id === 'W10-E4' || e.id === 'W10-E5'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Summation Notation' || p.skill === 'Index Manipulation')
};

const arithmeticSequencesModule: ModuleContent = {
    id: 'arithmetic-sequences',
    name: 'Arithmetic Sequences',
    description: 'Understanding arithmetic sequences and their properties.',
    examples: week10SeriesExamples.filter(e => e.id === 'W10-E6' || e.id === 'W10-E7'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Arithmetic Sequences' || p.skill === 'Common Difference')
};

const arithmeticApplicationsModule: ModuleContent = {
    id: 'arithmetic-applications',
    name: 'Arithmetic Sequences & Series Applications',
    description: 'Real-world applications of arithmetic sequences and series.',
    examples: week10SeriesExamples.filter(e => e.id === 'W10-E8' || e.id === 'W10-E9'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Arithmetic Applications' || p.skill === 'Revenue Modeling')
};

// New modules for advanced topics (Examples 10-19)
const arithmeticAdvancedModule: ModuleContent = {
    id: 'arithmetic-advanced',
    name: 'Advanced Arithmetic Sequences',
    description: 'Solving systems to find arithmetic sequence parameters.',
    examples: week10ArithmeticAdvancedExamples.filter(e => e.id === 'W10-E10'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Arithmetic Systems')
};

const geometricFundamentalsModule: ModuleContent = {
    id: 'geometric-fundamentals',
    name: 'Geometric Sequences Fundamentals',
    description: 'Introduction to geometric sequences and identification.',
    examples: week10GeometricExamples.filter(e => e.id === 'W10-E11' || e.id === 'W10-E12'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Geometric Sequences' || p.skill === 'Geometric Identification')
};

const geometricApplicationsModule: ModuleContent = {
    id: 'geometric-applications',
    name: 'Geometric Sequences Applications',
    description: 'Real-world applications and advanced geometric sequence problems.',
    examples: week10GeometricExamples.filter(e => e.id === 'W10-E13' || e.id === 'W10-E14'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Compound Interest Applications' || p.skill === 'Geometric Systems')
};

const finiteGeometricSeriesModule: ModuleContent = {
    id: 'finite-geometric-series',
    name: 'Finite Geometric Series',
    description: 'Calculating sums of finite geometric series and future value applications.',
    examples: week10GeometricSeriesExamples.filter(e => e.id === 'W10-E15' || e.id === 'W10-E16'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Finite Geometric Series' || p.skill === 'Future Value Applications')
};

const infiniteSeriesApplicationsModule: ModuleContent = {
    id: 'infinite-series-applications',
    name: 'Infinite Series & Applications',
    description: 'Convergent infinite series, economic multipliers, and perpetuity calculations.',
    examples: week10InfiniteSeriesExamples.filter(e => e.id === 'W10-E17' || e.id === 'W10-E18' || e.id === 'W10-E19'),
    problems: week10PracticeProblems.filter(p => p.skill === 'Infinite Geometric Series' || p.skill === 'Economic Multiplier' || p.skill === 'Perpetuity Applications')
};

// Week 11 Modules - Financial Mathematics
const simpleInterestFundamentalsModule: ModuleContent = {
    id: 'simple-interest-fundamentals',
    name: 'Simple Interest Fundamentals',
    description: 'Understanding interest basics, rate conversions, and simple interest calculations.',
    examples: week11SimpleInterestExamples.filter(e => e.id === 'W11-E1' || e.id === 'W11-E2' || e.id === 'W11-E3'),
    problems: week11PracticeProblems.filter(p => p.skill === 'Interest Rate Conversion' || p.skill === 'Simple Interest Calculation')
};

const simpleInterestApplicationsModule: ModuleContent = {
    id: 'simple-interest-applications',
    name: 'Simple Interest Applications',
    description: 'Solving for principal, rate, time, and advanced simple interest problems.',
    examples: week11SimpleInterestExamples.filter(e => e.id === 'W11-E4' || e.id === 'W11-E5' || e.id === 'W11-E6' || e.id === 'W11-E7'),
    problems: week11PracticeProblems.filter(p => p.skill === 'Solving for Principal' || p.skill === 'Solving for Interest Rate' || p.skill === 'Solving for Time' || p.skill === 'Future and Present Value')
};

const simpleInterestAdvancedModule: ModuleContent = {
    id: 'simple-interest-advanced',
    name: 'Advanced Simple Interest',
    description: 'Complex simple interest scenarios including business applications and comparison problems.',
    examples: week11SimpleInterestExamples.filter(e => e.id === 'W11-E8' || e.id === 'W11-E9' || e.id === 'W11-E10' || e.id === 'W11-E11'),
    problems: week11PracticeProblems.filter(p => p.skill === 'Complex Business Applications' || p.skill === 'Portfolio Interest Analysis' || p.skill === 'Strategic Financial Analysis')
};

const compoundInterestFundamentalsModule: ModuleContent = {
    id: 'compound-interest-fundamentals',
    name: 'Compound Interest Fundamentals',
    description: 'Introduction to compound interest, present value, and compounding frequency comparison.',
    examples: week11CompoundInterestExamples.filter(e => e.id === 'W11-E12' || e.id === 'W11-E13' || e.id === 'W11-E14'),
    problems: week11PracticeProblems.filter(p => p.skill === 'Compound Interest Comparison' || p.skill === 'Compound Interest Calculation' || p.skill === 'Present Value Compound Interest' || p.skill === 'Compound Interest Frequency Comparison')
};

const compoundInterestApplicationsModule: ModuleContent = {
    id: 'compound-interest-applications',
    name: 'Compound Interest Applications',
    description: 'Effective annual rates, solving for time and rate in compound interest problems.',
    examples: week11CompoundInterestExamples.filter(e => e.id === 'W11-E15' || e.id === 'W11-E16' || e.id === 'W11-E17'),
    problems: week11PracticeProblems.filter(p => p.skill === 'Effective Annual Rate Analysis' || p.skill === 'Solving for Time Period' || p.skill === 'Solving for Interest Rate')
};

const advancedFinancialApplicationsModule: ModuleContent = {
    id: 'advanced-financial-applications',
    name: 'Advanced Financial Applications',
    description: 'Complex business scenarios, investment analysis, and multi-component financial planning.',
    examples: week11CompoundInterestExamples.filter(e => e.id === 'W11-E18' || e.id === 'W11-E19' || e.id === 'W11-E20'),
    problems: week11PracticeProblems.filter(p => p.skill === 'Complex Project Financing' || p.skill === 'Investment Growth Analysis' || p.skill === 'Advanced Multi-Component Analysis')
};

const mixedFinancialProblemsModule: ModuleContent = {
    id: 'mixed-financial-problems',
    name: 'Mixed Financial Problems',
    description: 'Complex equivalent payments, unknown interest rates, and specialized financial scenarios.',
    examples: week11MixedProblemsExamples.filter(e => e.id === 'W11-E21' || e.id === 'W11-E22' || e.id === 'W11-E23'),
    problems: week11PracticeProblems.filter(p => p.skill === 'Equivalent Payment Problems' || p.skill === 'Finding Unknown Interest Rates' || p.skill === 'Investment Doubling Time' || p.skill === 'Investment Tripling Time' || p.skill === 'Investment Growth Analysis')
};

// New enhanced questions module for demonstration
const enhancedQuestionsModule: ModuleContent = {
    id: 'enhanced-questions-demo',
    name: 'Enhanced Question Types Demo',
    description: 'Demonstration of multiple-choice, fill-in-blank, and mixed question formats.',
    examples: [], // No examples for this demo module
    problems: sampleEnhancedQuestions
};

// Assemble the lectures
export const lectures: Lecture[] = [
    {
        id: 'lecture-10',
        title: 'Week 10: Sequences and Series',
        modules: [
            sequencesByGeneralTermModule,
            sequencesListingAndRecursiveModule,
            fibonacciModule,
            summationNotationModule,
            arithmeticSequencesModule,
            arithmeticApplicationsModule,
            arithmeticAdvancedModule,
            geometricFundamentalsModule,
            geometricApplicationsModule,
            finiteGeometricSeriesModule,
            infiniteSeriesApplicationsModule,
        ]
    },
    {
        id: 'lecture-11',
        title: 'Week 11: Financial Mathematics',
        modules: [
            simpleInterestFundamentalsModule,
            simpleInterestApplicationsModule,
            simpleInterestAdvancedModule,
            compoundInterestFundamentalsModule,
            compoundInterestApplicationsModule,
            advancedFinancialApplicationsModule,
            mixedFinancialProblemsModule,
            enhancedQuestionsModule,
        ]
    }
];
