import type { Example } from '@/lib/types';

export const week10InfiniteSeriesExamples: Example[] = [
    {
        id: 'W10-E17',
        title: 'Example 17: Sum of Infinite Geometric Series',
        relatedPracticeProblemIds: ['SQ49', 'SQ50', 'SQ51'],
        segments: [
            { type: 'heading', text: '5. Infinite geometric series' },
            
            { type: 'connection', text: 'We learned in Section 4 how to find the sum of the first $n$ terms of a geometric series using formula (15). How do we find the sum of an infinite geometric series?' },
            
            { type: 'paragraph', text: 'Let\'s look at the infinite geometric series $(a_n)$ with the first term $a_1 = 3$ and the common ratio $r = 2$, i.e.,' },
            
            { type: 'math', text: '3, 6, 12, 24, 48, 96, \\ldots' },
            
            { type: 'paragraph', text: 'Let\'s look at a few partial sums for this series' },
            
            { type: 'math', text: 'S_n = \\frac{a_1(1-r^n)}{1-r}' },
            { type: 'math', text: 'S_{10} = \\frac{3(1-2^{10})}{1-2} = 3069' },
            { type: 'math', text: 'S_{30} = \\frac{3(1-2^{30})}{1-2} = 3,221,225,469' },
            { type: 'math', text: 'S_{50} = \\frac{3(1-2^{50})}{1-2} \\approx 3.38 \\times 10^{15}' },
            
            { type: 'callout', text: 'We see that as $n$ gets larger and larger the sum gets larger and larger. This is true if the common ratio $r$ of a geometric series satisfies $|r| \\geq 1$, and we call the series **divergent**. We cannot find a sum of an infinite geometric series when $|r| \\geq 1$.', emphasis: 'warning' },
            
            { type: 'paragraph', text: 'Let\'s look now at the infinite geometric series $(a_n)$ with the first term $a_1 = \\frac{1}{2}$ and the common ratio $r = \\frac{1}{2}$, i.e.,' },
            
            { type: 'math', text: '\\frac{1}{2}, \\frac{1}{4}, \\frac{1}{8}, \\frac{1}{16}, \\frac{1}{32}, \\frac{1}{64}, \\ldots' },
            
            { type: 'paragraph', text: 'Let\'s look at a few partial sums for this series' },
            
            { type: 'math', text: 'S_{10} = \\frac{\\frac{1}{2}\\left(1-\\left(\\frac{1}{2}\\right)^{10}\\right)}{1-\\frac{1}{2}} \\approx .999023375' },
            { type: 'math', text: 'S_{20} = \\frac{\\frac{1}{2}\\left(1-\\left(\\frac{1}{2}\\right)^{20}\\right)}{1-\\frac{1}{2}} \\approx 0.999999046' },
            { type: 'math', text: 'S_{30} = \\frac{\\frac{1}{2}\\left(1-\\left(\\frac{1}{2}\\right)^{30}\\right)}{1-\\frac{1}{2}} \\approx 0.999999991' },
            
            { type: 'pattern-highlight', text: 'We see that as $n$ gets larger and larger the sum gets closer to 1. This is true in general if the common ratio $r$ of a geometric sequence satisfies $|r| < 1$. In this case, we call the series **convergent**. We can find a sum of an infinite geometric series when $|r| < 1$ using the formula' },
            
            { type: 'math', text: '\\boxed{S = \\frac{a_1}{1-r}} \\quad \\text{(18)}' },
            
            { type: 'subheading', text: 'Example 17. Find the sum of the infinite geometric series' },
            
            { type: 'math', text: '54 + 18 + 6 + 2 + \\frac{2}{3} + \\frac{2}{9} + \\ldots' },
            
            { type: 'paragraph', text: '**Solution:** We are given $a_1 = 54$. Using the defining property of a geometric sequence we have that the common ratio is' },
            
            { type: 'step-by-step', text: 'Let\'s find the common ratio:' },
            { type: 'math', text: 'r = \\frac{18}{54} = \\frac{6}{18} = \\frac{2}{6} = \\frac{\\frac{2}{3}}{2} = \\frac{1}{3}' },
            
            { type: 'step-by-step', text: 'Check convergence and calculate sum:' },
            { type: 'paragraph', text: 'Plugging $a_1 = 54$ and $r = \\frac{1}{3}$ into formula (18) we have' },
            
            { type: 'math', text: 'S = \\frac{54}{1 - \\frac{1}{3}} = 81' },
            
            { type: 'connection', text: 'One application of geometric sequences has to do with consumer spending. If a tax rebate is given to each household, the effect on the economy is many times the amount of the individual rebate.' },
        ]
    },
    {
        id: 'W10-E18',
        title: 'Example 18: Tax Rebate Multiplier Effect',
        relatedPracticeProblemIds: ['SQ52', 'SQ53', 'SQ54'],
        segments: [
            { type: 'subheading', text: 'Example 18. (Tax rebate application)' },
            
            { type: 'step-by-step', text: 'The government has decided to give a \\$1,000 tax rebate to each household in order to stimulate the economy. The government statistics say that each household will spend 80% of the rebate in goods and services. The businesses and individuals who benefitted from that 80% will then spend 80% of what they received and so on. The result is called **the multiplier effect**. What is the total effect of the rebate on the economy?' },
            
            { type: 'paragraph', text: '**Solution:** Every time money goes into the economy, 80% of it is spent and is then in the economy to be spent. Again, 80% of this money is spent in the economy again. This situation continues and so leads us to an infinite geometric series' },
            
            { type: 'math', text: '1000 + 1000 \\cdot (0.8) + 1000 \\cdot (0.8)^2 + \\ldots' },
            
            { type: 'connection', text: 'Here the first term is $a_1 = 1000$, and the common ratio is $r = 0.8$. We can evaluate this sum since $r = 0.8 < 1$. We use the formula (18) for the sum on an infinite geometric series and substitute $a_1 = 1000$ and $r = 0.8$. We have' },
            
            { type: 'math', text: 'S = \\frac{1000}{1 - 0.8} = 5000' },
            
            { type: 'pattern-highlight', text: 'The total effect of the \\$1,000 received by each household will be a \\$5,000 growth in the economy.' },
            
            { type: 'connection', text: 'You can find out a bit more details about the multiplier effect here:' },
            { type: 'paragraph', text: 'https://www.economicsonline.co.uk/Managing_the_economy/The_multiplier_effect.html' },
            
            { type: 'paragraph', text: 'In our case the marginal propensity to consume is $mpc = 0.8$. The formula for the multiplier $\\frac{1}{1-mpc}$ from the article corresponds to $\\frac{1}{1-r}$ in our formula (18) for the sum on an infinite geometric series.' },
        ]
    },
    {
        id: 'W10-E19',
        title: 'Example 19: Perpetuity Application',
        relatedPracticeProblemIds: ['SQ55', 'SQ56', 'SQ57'],
        segments: [
            { type: 'subheading', text: 'Example 19. (Perpetuity application)' },
            
            { type: 'step-by-step', text: 'A rich woman would like to leave \\$100,000 a year, starting now, to be divided equally among all her direct descendants. She puts no time limit on this bequeathment and is able to invest for this long-term outlay of funds at 2% compounded annually. How much must she invest now to meet such a long-term commitment?' },
            
            { type: 'paragraph', text: '**Solution:** Let us put $R = 100,000$ and set the clock to 0 now and measure time in years from now. With these conventions we are to account for payments of $R$ at times $0, 1, 2, \\ldots, k, \\ldots$ by making a single investment now.' },
            
            { type: 'connection', text: 'Such a sequence of payments is called **perpetuity**. The payment now simply cost her $R$. The payment at time 1 has a **present value** of $R(1.02)^{-1}$. Similarly, the payment at time $k$ has a present value $R(1.02)^{-k}$. Her investment now must exactly cover the present value of all these future payments. In other words, the investment must be equal the sum' },
            
            { type: 'math', text: 'R + R(1.02)^{-1} + R(1.02)^{-2} + \\cdots + R(1.02)^{-k} + \\ldots' },
            
            { type: 'step-by-step', text: 'We can recognize the infinite sum as that of a geometric series, with first term $a_1 = R = 100,000$ and the common ratio $r = (1.02)^{-1}$. Since $|r| = (1.02)^{-1} < 1$, we can evaluate the sum as' },
            
            { type: 'math', text: 'S = \\frac{100,000}{1 - \\frac{1}{1.02}} = \\frac{100,000}{\\frac{0.02}{1.02}} = \\frac{100,000(1.02)}{0.02} = 5,100,000' },
            
            { type: 'summary-box', text: 'In other words, an investment of more \\$5,100,000 now will allow her to leave \\$100,000 per year to her descendants forever!' },
        ]
    }
];
