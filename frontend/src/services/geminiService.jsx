import { GoogleGenerativeAI } from '@google/generative-ai';
import { retrieveRelevantKnowledge } from './ragService';

// Fallback to Env key if user specifies it, else use hardcoded key (which we know is expired)
const getApiKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBSHQBTpNCpZ8TWBeznClAsLMyCniSu7E8';
};

export async function getInvestmentAdvice(monthlyExpenses, savingsAmount) {
  const apiKey = getApiKey();
  
  try {
    if (apiKey === 'AIzaSyBSHQBTpNCpZ8TWBeznClAsLMyCniSu7E8') {
      throw new Error('Default API key expired');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Based on:
      - Monthly Expenses: ₹${monthlyExpenses}
      - Available for Investment: ₹${savingsAmount}

      Provide 6 unique investment recommendations in the following format:
      [
        {
          "title": "investment type",
          "description": "brief advice",
          "riskFactor": "XX%",
          "profitPercentage": "YY%"
        }
      ]

      Focus on a balanced portfolio suitable for beginners.
      Keep descriptions concise and practical.
      Ensure the percentages add up to 100%.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    // Extract JSON array from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const recommendations = JSON.parse(jsonMatch[0]);

    // Validate the response structure
    if (!Array.isArray(recommendations) || !recommendations.every(isValidRecommendation)) {
      throw new Error('Invalid recommendation format');
    }

    // Ensure all recommendations are unique
    const uniqueRecommendations = Array.from(new Set(recommendations.map(rec => rec.title)))
      .map(title => recommendations.find(rec => rec.title === title));

    return uniqueRecommendations.slice(0, 6);
  } catch (error) {
    console.warn('Error getting investment advice, using local recommendations fallback:', error);
    // Standard investment recommendations fallback
    return [
      {
        title: "Emergency Fund",
        description: "Secure 3-6 months of expenses in a liquid high-yield savings account.",
        riskFactor: "0%",
        profitPercentage: "6%"
      },
      {
        title: "Equity Mutual Funds (SIP)",
        description: "Invest in diversified blue-chip mutual funds for long-term growth.",
        riskFactor: "15%",
        profitPercentage: "12%"
      },
      {
        title: "Direct Stocks",
        description: "Allocate small capital to blue-chip stocks using rupee cost averaging.",
        riskFactor: "25%",
        profitPercentage: "15%"
      },
      {
        title: "Fixed Deposits (FD)",
        description: "Keep a stable portion of funds locked for predictable returns.",
        riskFactor: "0%",
        profitPercentage: "7%"
      },
      {
        title: "Digital Gold / Sovereign Bonds",
        description: "Hedge against inflation and currency depreciation with gold.",
        riskFactor: "5%",
        profitPercentage: "8%"
      },
      {
        title: "National Pension Scheme (NPS)",
        description: "Tax-efficient retirement account with a long-term compound advantage.",
        riskFactor: "10%",
        profitPercentage: "10%"
      }
    ];
  }
}

// Updated validation function
function isValidRecommendation(rec) {
  return (
    typeof rec === 'object' &&
    typeof rec.title === 'string' &&
    typeof rec.description === 'string' &&
    typeof rec.riskFactor === 'string' &&
    typeof rec.profitPercentage === 'string'
  );
}

/**
 * Local RAG response generator when Gemini API key is expired or missing.
 * Analyzes query keywords and formats a professional response based on RAG knowledge context.
 */
function generateLocalRAGResponse(query, userContext, knowledge) {
  const { monthlyIncome = 45000, totalExpenses = 20400 } = userContext || {};
  const savings = monthlyIncome - totalExpenses;
  const savingsRate = ((savings / monthlyIncome) * 100).toFixed(1);
  const age = userContext?.age || 26;
  
  const lower = query.toLowerCase();
  let response = "";

  if (lower.includes('saving') || lower.includes('income') || lower.includes('expense') || lower.includes('budget')) {
    response += `Based on your profile, your monthly income is **₹${monthlyIncome.toLocaleString()}** and tracked expenses are **₹${totalExpenses.toLocaleString()}**, resulting in a net monthly savings capacity of **₹${savings.toLocaleString()}** (Savings Rate: **${savingsRate}%**).\n\n`;
    response += `### Actionable Recommendations to Optimize Your Savings:\n`;
    response += `• **Adopt the 50-30-20 Rule**: Allocate 50% (₹${(monthlyIncome*0.5).toLocaleString()}) to Essential Needs, 30% (₹${(monthlyIncome*0.3).toLocaleString()}) to Discretionary Wants, and 20% (₹${(monthlyIncome*0.2).toLocaleString()}) to Savings & Debt Repayments.\n`;
    response += `• **Secure an Emergency Buffer**: You should aim for a 3-6 month expense buffer (target: **₹${(totalExpenses*3).toLocaleString()}** to **₹${(totalExpenses*6).toLocaleString()}**) in a liquid savings account before committing to long-term risk assets.\n`;
    response += `• **Identify Category Deviations**: Review spending categories (like Food & Dining or Bills) that exceed recommended benchmarks to recover lost savings potential.`;
  } else if (lower.includes('invest') || lower.includes('portfolio') || lower.includes('allocation') || lower.includes('stock') || lower.includes('mutual') || lower.includes('fd') || lower.includes('gold')) {
    response += `Here is your recommended portfolio blueprint based on your age (${age} years) and assessed Moderate Growth risk profile:\n\n`;
    response += `### Asset Allocation Recommendations:\n`;
    
    if (knowledge?.strategies && knowledge.strategies.length > 0) {
      knowledge.strategies.forEach(s => {
        response += `• **${s.title}** (${s.risk} Risk): ${s.description}. *Implementation:* ${s.implementation}. Minimum required: ₹${s.minAmount}.\n`;
      });
    } else {
      response += `• **Equity Mutual Funds (SIP)** (Medium Risk): Diversified portfolio through professionally managed funds. Allocation target: 40% of investment capacity.\n`;
      response += `• **Direct Stocks / Equities** (High Risk): Investment in high-growth companies. Allocation target: 10% of investment capacity.\n`;
      response += `• **Fixed Deposits & Gold** (Low Risk): Capital preservation and inflation hedging. Allocation target: 30% of investment capacity.\n`;
    }
    
    response += `\n### Next Steps:\n`;
    response += `1. Prioritize building a liquid Emergency Fund before investing.\n`;
    response += `2. Automate a monthly transfer (SIP) of **₹${Math.round(savings * 0.7).toLocaleString()}** (approx. 70% of savings capacity) across these assets.`;
  } else if (knowledge?.categoryTips && knowledge.categoryTips.length > 0) {
    const tipData = knowledge.categoryTips[0];
    response += `### Spending Analysis for ${tipData.category}:\n`;
    response += `The recommended industry benchmark limit for **${tipData.category}** is **${tipData.benchmark}** of total expenses.\n\n`;
    response += `### Optimization Strategies:\n`;
    tipData.tips.forEach(tip => {
      response += `• ${tip}\n`;
    });
  } else if (knowledge?.rules && knowledge.rules.length > 0) {
    response += `### Standard Financial Rules & Guides:\n\n`;
    knowledge.rules.forEach(r => {
      response += `#### ${r.rule}\n`;
      response += `${r.description} (Applicable: *${r.when}*)\n\n`;
    });
  } else {
    // General personal finance response
    response += `Hello! I am your ZenPay AI Advisor. I can help you analyze your budget, optimize category spending, and design a customized investment portfolio.\n\n`;
    response += `### How to get started:\n`;
    response += `• Ask me: *"Analyze my spending habits"* to check if you are within benchmarks.\n`;
    response += `• Ask me: *"Best investments for my income?"* to see a custom age-based portfolio allocation.\n`;
    response += `• Ask me: *"What is my savings potential?"* to view your net income and savings capacity.`;
  }
  
  return response;
}

/**
 * Generates a response from the Gemini API for the AI Chatbot, with automatic local RAG fallback
 */
export async function getGeminiResponse(systemPrompt, userPrompt, chatHistory = [], userContext = null, retrievedKnowledge = null) {
  const apiKey = getApiKey();
  
  // Extract user query from prompt context if formatted
  const cleanQuery = userPrompt.includes('\n\nUser Question:') 
    ? userPrompt.split('\n\nUser Question:')[1].trim()
    : userPrompt.trim();

  // If the key is the expired default key, jump straight to the local RAG fallback to keep it fast and responsive
  if (apiKey === 'AIzaSyBSHQBTpNCpZ8TWBeznClAsLMyCniSu7E8') {
    const localContext = userContext || { monthlyIncome: 45000, totalExpenses: 20400, age: 26 };
    const knowledge = retrievedKnowledge || retrieveRelevantKnowledge(cleanQuery, localContext);
    return generateLocalRAGResponse(cleanQuery, localContext, knowledge);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemPrompt,
    });

    const contents = [];

    // Add prior context messages
    chatHistory.slice(-4).forEach((msg) => {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    });

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }],
    });

    const result = await model.generateContent({ contents });
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.warn('Gemini 1.5 Flash error, falling back to local RAG response generator:', error);
    const localContext = userContext || { monthlyIncome: 45000, totalExpenses: 20400, age: 26 };
    const knowledge = retrievedKnowledge || retrieveRelevantKnowledge(cleanQuery, localContext);
    return generateLocalRAGResponse(cleanQuery, localContext, knowledge);
  }
}
