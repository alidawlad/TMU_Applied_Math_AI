import type { Lecture, ModuleContent } from '@/lib/types';
import { week10Examples } from './week10-examples';
import { week10SeriesExamples } from './week10-examples-series';
import { week10ArithmeticAdvancedExamples } from './week10-examples-arithmetic-advanced';
import { week10GeometricExamples } from './week10-examples-geometric';
import { week10GeometricSeriesExamples } from './week10-examples-geometric-series';
import { week10InfiniteSeriesExamples } from './week10-examples-infinite-series';
import { week10PracticeProblems } from './week10-practice';

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

// Assemble the lecture
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
    }
];
