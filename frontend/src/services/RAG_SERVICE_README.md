# RAG Service - Retrieval Augmented Generation for Financial Advice

## Overview

The RAG Service (`ragService.js`) is the intelligent backbone of the AI Financial Advisor. It implements Retrieval Augmented Generation (RAG) - a technique that combines a large language model with a knowledge base to provide more accurate, contextual, and grounded financial advice.

## What is RAG?

RAG is a hybrid approach that:
1. **Retrieves** relevant information from a knowledge base based on user queries
2. **Augments** the LLM response with retrieved context
3. **Generates** more accurate and grounded answers

### Traditional LLM Approach:
```
User Query → LLM → Response
(Risk of hallucination, generic answers)
```

### RAG Approach:
```
User Query → Knowledge Retrieval → Context + LLM → Enhanced Response
(Accurate, contextual, grounded in knowledge base)
```

## Knowledge Base Architecture

### 1. Investment Strategies

**Structure:**
```javascript
{
  id: 'strategy_id',
  title: 'Strategy Name',
  description: 'What is it?',
  benefit: 'Why use it?',
  implementation: 'How to start?',
  risk: 'Low/Medium/High',
  timeline: 'Investment duration',
  minAmount: 1000, // Minimum investment
}
```

**Included Strategies:**
- Emergency Fund
- Mutual Funds (SIP)
- Stock Market
- Fixed Deposits
- Gold Investment
- National Pension Scheme (NPS)

### 2. Spending Categories

**Structure:**
```javascript
'Category Name': {
  benchmark: '10-15%', // % of income
  tips: [
    'Optimization tip 1',
    'Optimization tip 2',
    // More tips
  ]
}
```

**Categories:**
- Food & Dining
- Transport
- Entertainment
- Shopping
- Bills & Utilities
- Health
- Education

### 3. Financial Rules

**Structure:**
```javascript
{
  rule: 'Rule Name',
  description: 'What it is',
  when: 'When to use it'
}
```

**Included Rules:**
- 50-30-20 Rule (Budget allocation)
- 4% Rule (Retirement)
- 6 Month Emergency Fund
- Asset Allocation by Age

### 4. Risk Profiles

**Structure:**
```javascript
{
  description: 'Profile description',
  allocation: 'Asset allocation %',
  target_return: 'Expected annual return'
}
```

**Profiles:**
- Conservative (Low risk)
- Moderate (Balanced)
- Aggressive (High growth)

## Core Functions

### 1. `retrieveRelevantKnowledge(query, context)`

Intelligently retrieves relevant information from the knowledge base based on user query.

**Parameters:**
- `query` (string): User's question or prompt
- `context` (object): User's financial context (optional)

**Returns:**
```javascript
{
  strategies: [], // Relevant investment strategies
  rules: [], // Relevant financial rules
  categoryTips: [], // Category-specific tips
  riskProfile: 'conservative' | 'moderate' | 'aggressive'
}
```

**Example:**
```javascript
const knowledge = retrieveRelevantKnowledge(
  "I have ₹10,000 to invest. What are my options?",
  userContext
);
// Returns strategies with minAmount <= 10,000
```

**Logic:**
- Analyzes query keywords (invest, portfolio, allocation, etc.)
- Matches against investment strategies
- Extracts category mentions for tips
- Detects financial rules
- Calculates risk profile from age (if provided)

### 2. `generateSystemPrompt(userContext)`

Creates a dynamic, context-aware system prompt for the LLM.

**Parameters:**
```javascript
{
  name: 'User Name',
  monthlyIncome: 45000,
  totalExpenses: 20400,
  savingsRate: 54.7,
  age: 35, // Optional
  transactions: [] // Array of transactions
}
```

**Returns:** System prompt string with:
- User's financial profile
- Income, expenses, savings
- Savings rate and risk profile
- Interaction guidelines
- Tone and style instructions

**Example Output:**
```
You are ZenPay AI, a professional financial advisor...

USER PROFILE:
- Monthly Income: ₹45,000
- Monthly Expenses: ₹20,400
- Monthly Savings: ₹24,600
- Savings Rate: 54.7%
- Risk Profile: moderate

INTERACTION GUIDELINES:
1. Provide specific, actionable advice...
...
```

**Customization:**
- Automatically determines risk profile based on age
- Personalizes advice for user's specific situation
- Sets professional yet friendly tone
- Emphasizes emergency fund as foundation

### 3. `analyzeSpendingPattern(transactions)`

Analyzes transaction data to identify patterns and benchmark compliance.

**Parameters:**
```javascript
[
  { category: 'Food & Dining', amount: 4500, date: '...' },
  { category: 'Transport', amount: 2200, date: '...' },
  // ...
]
```

**Returns:**
```javascript
{
  topCategories: [
    {
      category: 'Food & Dining',
      amount: 4500,
      percentage: '22.1%'
    },
    // ...
  ],
  benchmarkComparison: [
    {
      category: 'Food & Dining',
      amount: 4500,
      percentage: '22.1%',
      benchmark: '10-15%'
    },
    // ...
  ],
  savings: 24600,
  savingsRate: 54.7,
  recommendations: [] // Future enhancement
}
```

**Analysis Includes:**
- Top spending categories
- Percentage of total expenses
- Comparison against recommended benchmarks
- Identification of over-budget categories
- Savings calculation

### 4. `generateInvestmentRecommendations(userContext)`

Generates personalized investment recommendations based on user profile.

**Parameters:**
```javascript
{
  monthlyIncome: 45000,
  totalExpenses: 20400,
  age: 35
}
```

**Returns:**
```javascript
{
  totalSavings: 24600,
  investmentCapacity: 17220, // 70% of savings
  recommendedMonthlyInvestment: 1435,
  allocation: {
    'Stocks/Equity MF': 40,
    'Bonds/Debt MF': 30,
    'Gold': 15,
    'Fixed Deposits': 15
  },
  recommendations: [
    {
      priority: 1,
      title: 'Build Emergency Fund First',
      description: '...',
      amount: 61200,
      timeline: '6-12 months',
      icon: '🛡️'
    },
    // More recommendations
  ]
}
```

**Age-Based Allocation:**
- **Under 30:** 50% Stocks, 20% Bonds, 15% Gold, 15% FD
- **30-45:** 40% Stocks, 30% Bonds, 15% Gold, 15% FD
- **45+:** 25% Stocks, 40% Bonds, 20% Gold, 15% FD

**Priority System:**
1. Build emergency fund (3-6 months expenses)
2. Start investing according to allocation

### 5. `formatAdviceWithContext(baseAdvice, knowledgeContext)`

Enhances LLM response with knowledge base context.

**Parameters:**
- `baseAdvice` (string): Initial LLM response
- `knowledgeContext` (object): Retrieved knowledge

**Returns:** Enhanced advice string with:
- Original response
- Relevant investment strategies
- Category optimization tips
- Financial rules
- Implementation guidance

**Example:**
```
Original response...

📚 Relevant Investment Strategies:
• Mutual Funds: Diversified portfolio...
  Minimum: ₹500, Risk: Medium

💡 Category Optimization Tips:
• Food & Dining (Benchmark: 10-15%):
  • Cook meals at home to save 40-50%
  • Plan grocery shopping with a list

📋 Relevant Financial Rules:
• 50-30-20 Rule: 50% needs, 30% wants, 20% savings
```

## Usage Patterns

### Pattern 1: Chat-based Advice

```javascript
// In AIAdvisor.jsx sendMessage function
const knowledge = retrieveRelevantKnowledge(userMessage, userContext);
const systemPrompt = generateSystemPrompt(userContext);
const enhancedResponse = formatAdviceWithContext(llmResponse, knowledge);
```

### Pattern 2: Automated Analysis

```javascript
// Analyze spending on page load
const spending = analyzeSpendingPattern(transactions);
const investments = generateInvestmentRecommendations(userContext);
```

### Pattern 3: Query-Specific Retrieval

```javascript
// User asks about investment
if (userQuery.includes('invest')) {
  const knowledge = retrieveRelevantKnowledge(userQuery, userContext);
  // knowledge.strategies now contains relevant investments
  // knowledge.allocation shows recommended allocation
}
```

## Extending the Knowledge Base

### Adding a New Investment Strategy

```javascript
// In FINANCIAL_KNOWLEDGE_BASE.investment_strategies

{
  id: 'crypto',
  title: 'Cryptocurrency',
  description: 'Digital assets and blockchain-based investments',
  benefit: 'High growth potential, technological exposure',
  implementation: 'Start with small amounts on established platforms',
  risk: 'Very High',
  timeline: '5+ years',
  minAmount: 100,
}
```

### Adding Spending Tips

```javascript
// In FINANCIAL_KNOWLEDGE_BASE.spending_categories

'Subscriptions': {
  benchmark: '2-5%',
  tips: [
    'Audit all recurring subscriptions quarterly',
    'Share family plans with friends',
    'Cancel unused subscriptions',
    'Use annual billing for discounts',
  ]
}
```

### Adding Financial Rules

```javascript
// In FINANCIAL_KNOWLEDGE_BASE.financial_rules

{
  rule: 'Dollar Cost Averaging (DCA)',
  description: 'Invest fixed amount regularly regardless of price',
  when: 'For beginners in stock market'
}
```

## Performance Considerations

### Knowledge Base Size
- Current: ~6 strategies, 7 categories, 4 rules, 3 profiles
- Lightweight: ~15KB of data
- Minimal memory impact
- Fast retrieval (<5ms)

### Optimization Techniques

1. **Efficient Matching:**
   - Uses simple string matching (case-insensitive)
   - Could optimize with fuzzy matching if needed

2. **Lazy Evaluation:**
   - Knowledge retrieved only when relevant
   - No processing of unused categories

3. **Caching Opportunities:**
   - Investment recommendations can be cached
   - Spending analysis cached until data changes

## Testing the RAG Service

### Test Case 1: Investment Query

```javascript
const query = 'I want to invest ₹5000 monthly';
const knowledge = retrieveRelevantKnowledge(query, userContext);
console.assert(knowledge.strategies.length > 0, 'Should retrieve strategies');
```

### Test Case 2: Spending Analysis

```javascript
const spending = analyzeSpendingPattern(mockTransactions);
console.assert(spending.topCategories.length > 0, 'Should identify top categories');
console.assert(spending.savingsRate > 0, 'Should calculate savings rate');
```

### Test Case 3: System Prompt Generation

```javascript
const prompt = generateSystemPrompt(userContext);
console.assert(prompt.includes(userContext.name), 'Should personalize');
console.assert(prompt.includes('₹45,000'), 'Should include income');
```

## Future Enhancements

1. **Semantic Search:**
   - Use embeddings for better query matching
   - Similarity-based retrieval

2. **Learning:**
   - Track user preferences
   - Personalize suggestions based on feedback

3. **Real-time Data:**
   - Connect to live market data
   - Real portfolio tracking

4. **Multilingual:**
   - Support for Hindi and regional languages
   - Localized financial rules

5. **Domain Expansion:**
   - Tax planning
   - Insurance recommendations
   - Debt management
   - Retirement planning

6. **Integration:**
   - Connect to actual investment platforms
   - Real transaction feeds
   - Real portfolio data

## API Reference

### `retrieveRelevantKnowledge(query, context)`
- **Query**: User input string
- **Context**: Optional user financial context
- **Returns**: Structured knowledge object
- **Time Complexity**: O(n) where n = knowledge base size

### `generateSystemPrompt(userContext)`
- **Context**: User financial profile
- **Returns**: String system prompt
- **Time Complexity**: O(1)

### `analyzeSpendingPattern(transactions)`
- **Transactions**: Array of transaction objects
- **Returns**: Spending analysis object
- **Time Complexity**: O(n log n) due to sorting

### `generateInvestmentRecommendations(userContext)`
- **Context**: User financial profile
- **Returns**: Investment recommendations object
- **Time Complexity**: O(1)

### `formatAdviceWithContext(advice, knowledge)`
- **Advice**: Base LLM response
- **Knowledge**: Retrieved context
- **Returns**: Enhanced advice string
- **Time Complexity**: O(m) where m = advice length

---

**Version:** 1.0.0  
**Last Updated:** June 2024  
**Maintainer:** ZenPay Development Team
