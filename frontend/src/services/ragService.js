/**
 * RAG Service - Retrieval Augmented Generation for Financial Advice
 * This service provides a knowledge base and retrieval system for context-aware financial recommendations
 */

// Financial Knowledge Base
const FINANCIAL_KNOWLEDGE_BASE = {
  investment_strategies: [
    {
      id: 'emergency_fund',
      title: 'Emergency Fund',
      description: 'Build a safety net with 3-6 months of living expenses',
      benefit: 'Financial security and peace of mind',
      implementation: 'Start with 500-1000, increase gradually',
      risk: 'Low',
      timeline: '6-12 months',
      minAmount: 10000,
    },
    {
      id: 'mutual_funds',
      title: 'Mutual Funds',
      description: 'Diversified portfolio through professionally managed funds',
      benefit: 'Diversification, professional management, tax benefits',
      implementation: 'SIP (Systematic Investment Plan) starting from ₹500-1000/month',
      risk: 'Medium',
      timeline: '3-5 years',
      minAmount: 5000,
    },
    {
      id: 'stocks',
      title: 'Stock Market',
      description: 'Direct equity investment in blue-chip or growth stocks',
      benefit: 'High growth potential, ownership stake',
      implementation: 'Start with 2-3 quality stocks, use DCA strategy',
      risk: 'High',
      timeline: '5-10 years',
      minAmount: 3000,
    },
    {
      id: 'fixed_deposits',
      title: 'Fixed Deposits',
      description: 'Safe, predictable returns from banks',
      benefit: 'Safety, guaranteed returns, FDIC protection',
      implementation: 'Lock amount for 1-5 years at 5-7% interest',
      risk: 'Very Low',
      timeline: '1-5 years',
      minAmount: 1000,
    },
    {
      id: 'gold',
      title: 'Gold Investment',
      description: 'Traditional wealth store and inflation hedge',
      benefit: 'Inflation hedge, portfolio diversification, cultural value',
      implementation: 'Digital gold or SGBs (Sovereign Gold Bonds)',
      risk: 'Low-Medium',
      timeline: 'Long-term',
      minAmount: 500,
    },
    {
      id: 'nps',
      title: 'National Pension Scheme',
      description: 'Government retirement savings scheme with tax benefits',
      benefit: 'Tax deduction (Section 80C), long-term growth',
      implementation: 'Monthly SIP through NPS account',
      risk: 'Medium',
      timeline: 'Until retirement (25-40 years)',
      minAmount: 500,
    },
  ],

  spending_categories: {
    'Food & Dining': {
      benchmark: '10-15%',
      tips: [
        'Cook meals at home to save 40-50%',
        'Plan grocery shopping with a list',
        'Use cashback apps for dining out',
        'Avoid impulse food purchases',
      ],
    },
    'Transport': {
      benchmark: '5-10%',
      tips: [
        'Use public transport where available',
        'Carpool to split fuel costs',
        'Regular maintenance prevents costly repairs',
        'Compare fuel prices at different pumps',
      ],
    },
    'Entertainment': {
      benchmark: '5-8%',
      tips: [
        'Use streaming services family plans',
        'Look for free events and activities',
        'Set entertainment budget limits',
        'Use discount platforms for movies/shows',
      ],
    },
    'Shopping': {
      benchmark: '5-10%',
      tips: [
        'Make shopping lists and stick to them',
        'Avoid shopping when emotional',
        'Use discount codes and cashback',
        'Buy generic brands instead of premium',
      ],
    },
    'Bills & Utilities': {
      benchmark: '15-20%',
      tips: [
        'Reduce electricity by using LEDs',
        'Monitor water usage',
        'Negotiate internet and mobile plans',
        'Use energy-efficient appliances',
      ],
    },
    'Health': {
      benchmark: '5-8%',
      tips: [
        'Preventive care saves money long-term',
        'Buy generic medicines when possible',
        'Use health insurance benefits fully',
        'Exercise regularly to avoid medical costs',
      ],
    },
    'Education': {
      benchmark: '5-10%',
      tips: [
        'Use free online learning platforms',
        'Share course costs with friends',
        'Invest in skills that increase income',
        'Library resources are free',
      ],
    },
  },

  financial_rules: [
    {
      rule: '50-30-20 Rule',
      description: '50% needs, 30% wants, 20% savings',
      when: 'For overall budget planning',
    },
    {
      rule: '4% Rule',
      description: 'Withdraw 4% of invested amount annually',
      when: 'For retirement planning',
    },
    {
      rule: '6 Month Emergency Fund',
      description: 'Keep 6 months of expenses as emergency fund',
      when: 'For financial security',
    },
    {
      rule: 'Asset Allocation by Age',
      description: 'Stocks: (100 - age)%, Bonds: age%',
      when: 'For long-term investment planning',
    },
  ],

  risk_profiles: {
    conservative: {
      description: 'Low risk tolerance, capital preservation priority',
      allocation: 'FD: 40%, Gold: 20%, Mutual Funds: 30%, NPS: 10%',
      target_return: '5-7% annually',
    },
    moderate: {
      description: 'Balanced growth and safety',
      allocation: 'Stocks: 40%, Mutual Funds: 30%, FD: 20%, Gold: 10%',
      target_return: '8-12% annually',
    },
    aggressive: {
      description: 'High growth potential, can withstand volatility',
      allocation: 'Stocks: 60%, Mutual Funds: 25%, Others: 15%',
      target_return: '12-15%+ annually',
    },
  },
};

// Helper: Calculate spending ratio
const calculateSpendingRatio = (amount, income) => {
  return ((amount / income) * 100).toFixed(1);
};

// Helper: Get category benchmark
const getCategoryBenchmark = (category) => {
  return FINANCIAL_KNOWLEDGE_BASE.spending_categories[category];
};

// Main RAG retrieval function
export const retrieveRelevantKnowledge = (query, context) => {
  const lowerQuery = query.toLowerCase();
  const retrieved = {
    strategies: [],
    rules: [],
    categoryTips: [],
    riskProfile: null,
  };

  // Retrieve relevant investment strategies
  if (
    lowerQuery.includes('invest') ||
    lowerQuery.includes('portfolio') ||
    lowerQuery.includes('allocation')
  ) {
    retrieved.strategies = FINANCIAL_KNOWLEDGE_BASE.investment_strategies;
  }

  // Retrieve specific strategy if mentioned
  Object.entries(FINANCIAL_KNOWLEDGE_BASE.investment_strategies).forEach(([key, strategy]) => {
    if (lowerQuery.includes(strategy.id) || lowerQuery.includes(key.toLowerCase())) {
      retrieved.strategies = [strategy];
    }
  });

  // Retrieve category-specific tips
  Object.entries(FINANCIAL_KNOWLEDGE_BASE.spending_categories).forEach(([category, data]) => {
    if (lowerQuery.includes(category.toLowerCase())) {
      retrieved.categoryTips.push({ category, ...data });
    }
  });

  // Retrieve financial rules
  if (lowerQuery.includes('rule') || lowerQuery.includes('principle') || lowerQuery.includes('guide')) {
    retrieved.rules = FINANCIAL_KNOWLEDGE_BASE.financial_rules;
  }

  // Determine risk profile
  if (context?.age) {
    if (context.age < 30) retrieved.riskProfile = 'aggressive';
    else if (context.age < 45) retrieved.riskProfile = 'moderate';
    else retrieved.riskProfile = 'conservative';
  }

  return retrieved;
};

// Generate context-aware system prompt
export const generateSystemPrompt = (userContext) => {
  const {
    name = 'User',
    monthlyIncome = 45000,
    totalExpenses = 20400,
    savingsRate = ((monthlyIncome - totalExpenses) / monthlyIncome * 100).toFixed(1),
    age = null,
    transactions = [],
  } = userContext;

  const savings = monthlyIncome - totalExpenses;
  let riskProfile = 'moderate';
  if (age && age < 30) riskProfile = 'aggressive';
  else if (age && age >= 50) riskProfile = 'conservative';

  return `You are ZenPay AI, a professional financial advisor with expertise in personal finance, investments, and wealth management.

USER PROFILE:
- Name: ${name}
- Monthly Income: ₹${monthlyIncome.toLocaleString()}
- Monthly Expenses: ₹${totalExpenses.toLocaleString()}
- Monthly Savings: ₹${savings.toLocaleString()}
- Savings Rate: ${savingsRate}%
- Risk Profile: ${riskProfile}
${age ? `- Age: ${age}` : ''}

INTERACTION GUIDELINES:
1. Provide specific, actionable advice based on the user's financial situation
2. Always reference amounts in Indian Rupees (₹)
3. Consider the user's savings capacity and spending patterns
4. Suggest multiple options with pros/cons for each
5. Be encouraging but realistic about financial goals
6. Ask clarifying questions when needed
7. Provide step-by-step implementation plans
8. Consider tax implications where relevant
9. Emphasize emergency fund as foundation

KNOWLEDGE BASE:
- You have access to investment strategies, spending optimization tips, and financial rules
- Use the 50-30-20 budgeting rule when relevant
- Consider the 4% withdrawal rule for retirement planning
- Recommend 6-month emergency fund as essential

TONE:
- Professional yet friendly and approachable
- Data-driven and evidence-based
- Encouraging and supportive
- Non-judgmental about spending habits`;
};

// Analyze spending pattern
export const analyzeSpendingPattern = (transactions) => {
  const analysis = {
    topCategories: [],
    benchmarkComparison: [],
    savings: 0,
    savingsRate: 0,
    recommendations: [],
  };

  if (!transactions || transactions.length === 0) return analysis;

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const categoryTotals = {};

  transactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  // Top categories
  analysis.topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / totalSpent) * 100).toFixed(1),
    }));

  // Benchmark comparison
  analysis.benchmarkComparison = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: ((amount / totalSpent) * 100).toFixed(1),
    benchmark: getCategoryBenchmark(category)?.benchmark || 'N/A',
  }));

  return analysis;
};

// Generate investment recommendations
export const generateInvestmentRecommendations = (userContext) => {
  const { monthlyIncome, totalExpenses, age = 35 } = userContext;
  const savings = monthlyIncome - totalExpenses;
  const savingsPercentage = (savings / monthlyIncome) * 100;

  const recommendations = [];

  // Priority 1: Emergency Fund
  if (savings > 0) {
    recommendations.push({
      priority: 1,
      title: 'Build Emergency Fund First',
      description: 'Save 3-6 months of living expenses before investing',
      amount: totalExpenses * 3,
      timeline: '6-12 months',
      icon: '🛡️',
    });
  }

  // Priority 2: Determine investment capacity
  const investmentCapacity = savings * 0.7; // 70% of savings

  // Priority 3: Risk-based allocation
  let allocation = {};
  if (age < 30) {
    allocation = {
      'Stocks/Equity MF': 50,
      'Bonds/Debt MF': 20,
      'Gold': 15,
      'Fixed Deposits': 15,
    };
  } else if (age < 45) {
    allocation = {
      'Stocks/Equity MF': 40,
      'Bonds/Debt MF': 30,
      'Gold': 15,
      'Fixed Deposits': 15,
    };
  } else {
    allocation = {
      'Stocks/Equity MF': 25,
      'Bonds/Debt MF': 40,
      'Gold': 20,
      'Fixed Deposits': 15,
    };
  }

  // Generate specific recommendations
  Object.entries(allocation).forEach(([type, percentage]) => {
    const amount = (investmentCapacity * percentage) / 100;
    if (amount > 0) {
      recommendations.push({
        priority: 2,
        title: `Invest in ${type}`,
        description: `Allocate ${percentage}% of investment capacity`,
        amount: Math.round(amount),
        percentage,
        monthly: Math.round(amount / 12),
        icon: '📈',
      });
    }
  });

  return {
    totalSavings: savings,
    investmentCapacity: Math.round(investmentCapacity),
    recommendedMonthlyInvestment: Math.round(investmentCapacity / 12),
    allocation,
    recommendations,
  };
};

// Format advice with knowledge context
export const formatAdviceWithContext = (baseAdvice, knowledgeContext) => {
  let enhancedAdvice = baseAdvice;

  if (knowledgeContext.strategies?.length > 0) {
    enhancedAdvice += '\n\n📚 Relevant Investment Strategies:\n';
    knowledgeContext.strategies.forEach((strategy) => {
      enhancedAdvice += `\n• ${strategy.title}: ${strategy.description}`;
      enhancedAdvice += `\n  Minimum: ₹${strategy.minAmount}, Risk: ${strategy.risk}`;
    });
  }

  if (knowledgeContext.categoryTips?.length > 0) {
    enhancedAdvice += '\n\n💡 Category Optimization Tips:\n';
    knowledgeContext.categoryTips.forEach((category) => {
      enhancedAdvice += `\n${category.category} (Benchmark: ${category.benchmark}):\n`;
      category.tips.slice(0, 2).forEach((tip) => {
        enhancedAdvice += `  • ${tip}\n`;
      });
    });
  }

  if (knowledgeContext.rules?.length > 0) {
    enhancedAdvice += '\n\n📋 Relevant Financial Rules:\n';
    knowledgeContext.rules.slice(0, 2).forEach((rule) => {
      enhancedAdvice += `\n• ${rule.rule}: ${rule.description}`;
    });
  }

  return enhancedAdvice;
};

export default {
  FINANCIAL_KNOWLEDGE_BASE,
  retrieveRelevantKnowledge,
  generateSystemPrompt,
  analyzeSpendingPattern,
  generateInvestmentRecommendations,
  formatAdviceWithContext,
};
