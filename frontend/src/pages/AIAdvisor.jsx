import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send,
  RotateCw,
  TrendingUp,
  Shield,
  Target,
  PieChart,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Sparkles,
  User,
  DollarSign,
  Wallet,
  Percent,
  Briefcase,
  Lock,
  Award,
  Lightbulb,
  HeartPulse,
  GraduationCap,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Info,
  ArrowRight,
  Check,
  ChevronRight,
  ArrowUpRight,
  TrendingDown,
  BookOpen
} from 'lucide-react';
import './AIAdvisor.css';
import {
  retrieveRelevantKnowledge,
  generateSystemPrompt,
  analyzeSpendingPattern,
  generateInvestmentRecommendations,
} from '../services/ragService';
import { getGeminiResponse } from '../services/geminiService';

// Mock transaction data matching global system state
const MOCK_TRANSACTIONS = [
  { id: 1, category: 'Food & Dining', amount: 4500, date: '2024-01-15', count: 22 },
  { id: 2, category: 'Transport', amount: 2200, date: '2024-01-15', count: 14 },
  { id: 3, category: 'Entertainment', amount: 1800, date: '2024-01-15', count: 8 },
  { id: 4, category: 'Shopping', amount: 3500, date: '2024-01-15', count: 6 },
  { id: 5, category: 'Bills & Utilities', amount: 5200, date: '2024-01-15', count: 5 },
  { id: 6, category: 'Health', amount: 1200, date: '2024-01-15', count: 3 },
  { id: 7, category: 'Education', amount: 2000, date: '2024-01-15', count: 2 },
];



const QUICK_PROMPTS = [
  { text: 'What is my savings potential?', type: 'savings' },
  { text: 'Best investments for my income?', type: 'investments' },
  { text: 'Analyze my spending habits', type: 'spending' },
  { text: 'How do I build an emergency fund?', type: 'emergency' },
  { text: 'Explain the 50-30-20 budget rule', type: 'rule' },
  { text: 'How can I reduce monthly expenses?', type: 'reduce' }
];

// Investment Recommendation Card (Emoji-free, custom react icons)
function InvestmentCard({ investment }) {
  const getIcon = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('emergency')) return <Shield className="icon-shield text-rose-500" size={20} />;
    if (lower.includes('mutual')) return <PieChart className="icon-pie text-indigo-600" size={20} />;
    if (lower.includes('stock') || lower.includes('equity')) return <TrendingUp className="icon-trending text-emerald-600" size={20} />;
    if (lower.includes('fixed') || lower.includes('fd')) return <Lock className="icon-lock text-amber-500" size={20} />;
    if (lower.includes('gold')) return <Award className="icon-gold text-yellow-600" size={20} />;
    if (lower.includes('pension') || lower.includes('nps')) return <Briefcase className="icon-pension text-purple-600" size={20} />;
    return <DollarSign className="icon-default text-slate-500" size={20} />;
  };

  return (
    <div className={`investment-card ${investment.priority === 1 ? 'priority-urgent' : 'priority-normal'}`}>
      <div className="investment-card-header">
        <div className="investment-card-icon">
          {getIcon(investment.title)}
        </div>
        <div className="investment-card-title-section">
          <h4>{investment.title}</h4>
          <p className="investment-card-desc">{investment.description}</p>
        </div>
      </div>

      <div className="investment-card-body">
        <div className="investment-stat">
          <span>Target Amount</span>
          <strong>₹{investment.amount?.toLocaleString()}</strong>
        </div>

        {investment.monthly && (
          <div className="investment-stat">
            <span>Monthly Commitment</span>
            <strong>₹{investment.monthly?.toLocaleString()}</strong>
          </div>
        )}

        {investment.percentage && (
          <div className="investment-stat">
            <span>Portfolio Share</span>
            <strong>{investment.percentage}%</strong>
          </div>
        )}

        <div className="investment-stat">
          <span>Investment Horizon</span>
          <strong>{investment.timeline}</strong>
        </div>
      </div>

      <div className="investment-card-action">
        {investment.priority === 1 ? (
          <span className="badge badge-urgent">Immediate Action</span>
        ) : (
          <span className="badge badge-priority">Recommended Allocation</span>
        )}
      </div>
    </div>
  );
}

// Spending Analysis Card (Emoji-free, custom react icons)
function SpendingCard({ category, amount, percentage, benchmark }) {
  const isOverBudget =
    benchmark && parseFloat(percentage) > parseFloat(benchmark.split('-')[1]);

  const getIcon = (cat) => {
    switch (cat) {
      case 'Food & Dining':
        return <Utensils size={18} />;
      case 'Transport':
        return <Car size={18} />;
      case 'Entertainment':
        return <Film size={18} />;
      case 'Shopping':
        return <ShoppingBag size={18} />;
      case 'Bills & Utilities':
        return <Lightbulb size={18} />;
      case 'Health':
        return <HeartPulse size={18} />;
      case 'Education':
        return <GraduationCap size={18} />;
      default:
        return <DollarSign size={18} />;
    }
  };

  return (
    <div className={`spending-card ${isOverBudget ? 'over-budget' : ''}`}>
      <div className="spending-card-header">
        <div className="spending-card-icon">
          {getIcon(category)}
        </div>
        <div className="spending-card-title">
          <h4>{category}</h4>
          <strong className="spending-amount">₹{amount?.toLocaleString()}</strong>
        </div>
      </div>
      <div className="spending-card-body">
        <div className="spending-progress-container">
          <div 
            className={`spending-progress-bar ${isOverBudget ? 'bg-rose-500' : 'bg-indigo-600'}`}
            style={{ width: `${Math.min(percentage * 3, 100)}%` }}
          />
        </div>
        <div className="spending-stats-row">
          <span className="spending-pct">{percentage}% of expenses</span>
          {benchmark && (
            <span className={`spending-benchmark ${isOverBudget ? 'status-warning' : 'status-healthy'}`}>
              Benchmark: {benchmark}
            </span>
          )}
        </div>
      </div>
      {isOverBudget && (
        <div className="spending-card-alert">
          <AlertCircle size={14} />
          <span>Exceeds recommended budget limit</span>
        </div>
      )}
    </div>
  );
}

// Main AI Advisor Component
export default function AIAdvisor() {
  const [modelReady, setModelReady] = useState(false);
  const [progress, setProgress] = useState(0);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'recommendations'
  const chatEndRef = useRef(null);

  // Analysis state
  const [investmentData, setInvestmentData] = useState(null);
  const [spendingAnalysis, setSpendingAnalysis] = useState(null);

  // User context state
  const [userContext, setUserContext] = useState({
    name: 'ZenPay Member',
    monthlyIncome: 45000,
    totalExpenses: 15000,
    savingsRate: '66.7',
    transactions: MOCK_TRANSACTIONS,
    age: 26,
  });

  const getCategoryByMerchant = (merchant) => {
    const m = String(merchant || '').toLowerCase();
    if (m.includes('swiggy') || m.includes('zomato') || m.includes('restaurant') || m.includes('food') || m.includes('starbucks')) {
      return 'Food & Dining';
    }
    if (m.includes('amazon') || m.includes('ajio') || m.includes('flipkart') || m.includes('shopping') || m.includes('myntra')) {
      return 'Shopping';
    }
    if (m.includes('uber') || m.includes('ola') || m.includes('transport') || m.includes('metro') || m.includes('car')) {
      return 'Transport';
    }
    if (m.includes('spotify') || m.includes('netflix') || m.includes('movie') || m.includes('show') || m.includes('entertainment') || m.includes('bookmyshow')) {
      return 'Entertainment';
    }
    return 'Shopping';
  };

  // Initialize data and run standard simulated setup animation for a premium feel
  useEffect(() => {
    const loadData = async () => {
      let activeIncome = 45000;
      let activeExpenses = 15000;
      let activeAge = 26;
      let activeName = 'ZenPay Member';
      let activeTransactions = MOCK_TRANSACTIONS;

      try {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const profileRes = await fetch('http://localhost:8000/api/profile', { headers });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData) {
            activeIncome = profileData.monthlyIncome || 45000;
            activeExpenses = profileData.monthlyExpenses || 15000;
            activeAge = profileData.age || 26;
            activeName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || 'ZenPay Member';
          }
        }
      } catch (err) {
        console.error('Error loading profile in AIAdvisor:', err);
      }

      try {
        const paymentsRes = await fetch('http://localhost:8000/api/payment/payments');
        if (paymentsRes.ok) {
          const paymentsData = await paymentsRes.json();
          const dbPayments = paymentsData.payments || [];
          const successful = dbPayments.filter(p => p.status === 'successful');
          if (successful.length > 0) {
            activeTransactions = successful.map((p, idx) => ({
              id: p._id || idx,
              category: getCategoryByMerchant(p.payeeName),
              amount: p.amount,
              date: (p.createdAt || new Date().toISOString()).split('T')[0],
              count: 1
            }));
            activeExpenses = successful.reduce((sum, p) => sum + (p.amount || 0), 0);
          }
        }
      } catch (err) {
        console.error('Error loading payments in AIAdvisor:', err);
      }

      const activeSavings = activeIncome - activeExpenses;
      const savingsRate = ((activeSavings / activeIncome) * 100).toFixed(1);

      const ctx = {
        name: activeName,
        monthlyIncome: activeIncome,
        totalExpenses: activeExpenses,
        savingsRate,
        transactions: activeTransactions,
        age: activeAge
      };

      setUserContext(ctx);

      const investments = generateInvestmentRecommendations(ctx);
      const spending = analyzeSpendingPattern(activeTransactions);
      setInvestmentData(investments);
      setSpendingAnalysis(spending);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setModelReady(true), 150);
        }
      }, 40);
    };

    loadData();
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, generating]);

  // Send message handler using RAG model + Gemini service
  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || generating) return;

      const userMsg = { role: 'user', content: text };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setGenerating(true);

      try {
        // 1. Retrieve RAG Knowledge Base context
        const knowledge = retrieveRelevantKnowledge(text, userContext);

        // 2. Generate custom user Context System Prompt
        const systemPrompt = generateSystemPrompt(userContext);

        // 3. Format RAG data to assist LLM
        let contextString = '';
        if (knowledge.strategies.length > 0) {
          contextString += `\nRelevant Investment Strategies from Knowledge Base:\n` + 
            knowledge.strategies.map(s => `- ${s.title}: ${s.description} (Risk: ${s.risk}, Min Investment: ₹${s.minAmount})`).join('\n');
        }
        if (knowledge.categoryTips.length > 0) {
          contextString += `\nRelevant Spending Category Tips from Knowledge Base:\n` + 
            knowledge.categoryTips.map(c => `- ${c.category} (Benchmark: ${c.benchmark}): ${c.tips.slice(0, 2).join(', ')}`).join('\n');
        }
        if (knowledge.rules.length > 0) {
          contextString += `\nRelevant General Financial Rules:\n` + 
            knowledge.rules.map(r => `- ${r.rule}: ${r.description}`).join('\n');
        }

        const userPrompt = contextString
          ? `Context from Local Knowledge Base:\n${contextString}\n\nUser Question: ${text}`
          : text;

        // 4. Generate response using Gemini API with context and history
        const geminiReply = await getGeminiResponse(systemPrompt, userPrompt, messages, userContext, knowledge);

        setMessages((prev) => [...prev, { role: 'assistant', content: geminiReply }]);
      } catch (err) {
        console.error('Chat generation error:', err);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'I apologize, but I encountered an error while processing your request. Please try again.',
          },
        ]);
      } finally {
        setGenerating(false);
      }
    },
    [messages, generating, userContext]
  );

  // Handle quick prompt click
  const handleQuickPrompt = (promptText) => {
    sendMessage(promptText);
  };

  // Helper to parse bold text, bullets, and titles for professional presentation without plugins
  const formatMessageText = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, index) => {
      let content = line.trim();
      
      // Check for headers
      if (content.startsWith('###')) {
        return <h4 key={index} className="chat-msg-h4">{content.replace('###', '').trim()}</h4>;
      }
      if (content.startsWith('##')) {
        return <h3 key={index} className="chat-msg-h3">{content.replace('##', '').trim()}</h3>;
      }
      
      // Check for bullet points
      if (content.startsWith('•') || content.startsWith('-') || content.startsWith('*')) {
        const cleanText = content.replace(/^[•\-*]\s*/, '');
        return (
          <li key={index} className="chat-msg-li">
            {parseBoldText(cleanText)}
          </li>
        );
      }
      
      if (content === '') {
        return <div key={index} className="chat-msg-spacer" />;
      }
      
      return <p key={index} className="chat-msg-p">{parseBoldText(content)}</p>;
    });
  };

  const parseBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const getQuickPromptIcon = (type) => {
    switch (type) {
      case 'savings': return <Percent size={14} />;
      case 'investments': return <TrendingUp size={14} />;
      case 'spending': return <PieChart size={14} />;
      case 'emergency': return <Shield size={14} />;
      case 'rule': return <BookOpen size={14} />;
      default: return <ArrowRight size={14} />;
    }
  };

  // Simulated setup screen for premium design feel
  if (!modelReady) {
    return (
      <div className="ai-advisor-page">
        <div className="ai-loading-screen">
          <div className="ai-loading-card">
            <div className="ai-loading-icon-container">
              <Sparkles size={40} className="text-indigo-600 animate-pulse" />
            </div>
            <h2>Initializing ZenPay Copilot</h2>
            <p>
              Establishing connection and loading localized RAG financial rules. 
              This private session ensures your financial calculations remain secure.
            </p>

            <div className="ai-progress-wrapper">
              <div className="ai-progress-bar">
                <div
                  className="ai-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="ai-progress-text">{progress}%</span>
            </div>

            <div className="ai-info-box">
              <Info size={16} />
              <p>
                RAG model loaded. Generative content is contextually tailored using local financial profile definitions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-advisor-page">
      {/* Header */}
      <div className="ai-header">
        <div className="ai-header-content">
          {/* <div className="ai-header-icon">
            <Sparkles size={28} />
          </div> */}
          {/* <div className="ai-header-text">
            <div className="ai-header-top-row">
              <h1>ZenPay AI Copilot</h1>
              <span className="rag-badge">RAG Context Engine Active</span>
            </div>
            <p>Context-aware portfolio advice and spending analysis backed by LLM capabilities</p>
          </div> */}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="ai-tabs">
        <button
          className={`ai-tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageCircle size={18} />
          <span>Chat Copilot</span>
        </button>
        <button
          className={`ai-tab ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          <TrendingUp size={18} />
          <span>Investment Blueprint</span>
        </button>
      </div>

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="ai-chat-container">
          <div className="ai-chat-main">
            <div className="ai-messages">
              {messages.length === 0 ? (
                <div className="ai-empty-state">
                  <div className="ai-empty-icon-wrap">
                    <MessageCircle size={36} />
                  </div>
                  <h3>Secure Financial Copilot</h3>
                  <p>Ask questions regarding investment portfolios, monthly allocation rules, or budget constraints.</p>
                  
                  <div className="ai-quick-prompts-grid">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        className="ai-quick-prompt-card"
                        onClick={() => handleQuickPrompt(prompt.text)}
                      >
                        <span className="quick-prompt-icon">{getQuickPromptIcon(prompt.type)}</span>
                        <span className="quick-prompt-text">{prompt.text}</span>
                        <ChevronRight size={14} className="quick-prompt-arrow" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`ai-message ai-message-${msg.role}`}>
                      <div className="ai-message-avatar">
                        {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                      </div>
                      <div className="ai-message-content">
                        {formatMessageText(msg.content)}
                      </div>
                    </div>
                  ))}
                  {generating && (
                    <div className="ai-message ai-message-assistant">
                      <div className="ai-message-avatar">
                        <Sparkles size={16} />
                      </div>
                      <div className="ai-message-content ai-typing">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Chat Input */}
            <div className="ai-input-area">
              <div className="ai-input-wrapper">
                <input
                  type="text"
                  placeholder="Ask a financial advice or strategy question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  disabled={generating}
                  className="ai-input"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={generating || !input.trim()}
                  className="ai-send-btn"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="ai-input-hint">
                <Info size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                Gemini engine will cross-reference answers with your local transaction history and financial rules.
              </p>
            </div>
          </div>

          {/* Financial Summary Sidebar */}
          <div className="ai-sidebar">
            <div className="ai-summary-card">
              <div className="ai-summary-header">
                <Wallet size={18} className="text-indigo-600" />
                <h4>Financial Profile</h4>
              </div>
              
              <div className="ai-summary-stats-list">
                <div className="ai-summary-stat">
                  <span>Monthly Income</span>
                  <strong>₹{userContext.monthlyIncome.toLocaleString()}</strong>
                </div>
                <div className="ai-summary-stat">
                  <span>Tracked Expenses</span>
                  <strong>₹{userContext.totalExpenses.toLocaleString()}</strong>
                </div>
                <div className="ai-summary-stat ai-savings">
                  <span>Savings Capacity</span>
                  <strong>₹{(userContext.monthlyIncome - userContext.totalExpenses).toLocaleString()}</strong>
                </div>
                <div className="ai-summary-stat">
                  <span>Savings Ratio</span>
                  <strong className="savings-ratio-value">{userContext.savingsRate}%</strong>
                </div>
              </div>

              <div className="savings-progress-container">
                <div className="savings-progress-track">
                  <div 
                    className="savings-progress-fill"
                    style={{ width: `${Math.min(parseFloat(userContext.savingsRate), 100)}%` }}
                  />
                </div>
                <div className="savings-level-label">
                  <span>Target Ratio: 20%</span>
                  <span className="status-badge status-healthy">Healthy</span>
                </div>
              </div>

              <div className="profile-attributes">
                <div className="profile-attribute-item">
                  <span className="attr-label">Assessed Risk Profile</span>
                  <span className="attr-val font-semibold text-indigo-600">Moderate Growth</span>
                </div>
                <div className="profile-attribute-item">
                  <span className="attr-label">Investor Age</span>
                  <span className="attr-val">{userContext.age} Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="ai-recommendations-container">
          {/* Row 1: Personalized Investment Strategy & Age-Based Target Allocation */}
          <div className="ai-recommendations-row-grid">
            <div className="ai-recommendations-left-column">
              <section className="ai-section">
                <div className="ai-section-header">
                  <TrendingUp size={22} className="text-indigo-600" />
                  <h2>Personalized Investment Strategy</h2>
                </div>
                <p className="ai-section-subtitle">
                  Suggested strategy derived from a ₹{(userContext.monthlyIncome - userContext.totalExpenses).toLocaleString()} monthly savings capability (allocating 70% to active assets)
                </p>

                <div className="ai-investment-cards">
                  {investmentData?.recommendations.map((investment, idx) => (
                    <InvestmentCard key={idx} investment={investment} />
                  ))}
                </div>
              </section>
            </div>

            <div className="ai-recommendations-right-column">
              <section className="ai-section">
                <div className="ai-section-header">
                  <PieChart size={22} className="text-indigo-600" />
                  <h2>Target Allocation</h2>
                </div>
                <p className="ai-section-subtitle">
                  Age-based asset distribution breakdown
                </p>
                <div className="ai-allocation-section">
                  <div className="allocation-header-wrap">
                    <PieChart size={18} className="text-indigo-600" />
                    <h3>Age-Based Target Allocation</h3>
                  </div>
                  <div className="ai-allocation-grid">
                    {Object.entries(investmentData?.allocation || {}).map(([type, percentage]) => (
                      <div key={type} className="ai-allocation-item">
                        <div className="ai-allocation-label">
                          <span>{type}</span>
                          <strong>{percentage}%</strong>
                        </div>
                        <div className="ai-allocation-bar">
                          <div
                            className="ai-allocation-fill"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Row 2: Expense Benchmark Review & Priority Implementation Checklist */}
          <div className="ai-recommendations-row-grid">
            <div className="ai-recommendations-left-column">
              <section className="ai-section">
                <div className="ai-section-header">
                  <PieChart size={22} className="text-indigo-600" />
                  <h2>Expense Benchmark Review</h2>
                </div>
                <p className="ai-section-subtitle">
                  Live comparison of category expenses against recommended industry budgeting benchmarks
                </p>

                <div className="ai-spending-grid">
                  {spendingAnalysis?.benchmarkComparison.map((item, idx) => (
                    <SpendingCard
                      key={idx}
                      category={item.category}
                      amount={item.amount}
                      percentage={item.percentage}
                      benchmark={item.benchmark}
                    />
                  ))}
                </div>
              </section>
            </div>

            <div className="ai-recommendations-right-column">
              <section className="ai-section">
                <div className="ai-section-header">
                  <Target size={22} className="text-indigo-600" />
                  <h2>Action Checklist</h2>
                </div>
                <p className="ai-section-subtitle">
                  Priority implementation checklist
                </p>

                <div className="ai-action-items">
                  <div className="ai-action-item priority-1">
                    <div className="ai-action-icon">
                      <Shield size={20} className="text-rose-500" />
                    </div>
                    <div className="ai-action-content">
                      <h4>Verify Emergency Liquidity</h4>
                      <p>Accumulate ₹{(userContext.totalExpenses * 3).toLocaleString()} (3 months buffer target) in liquid savings.</p>
                      <span className="ai-action-status status-critical">Core Foundation</span>
                    </div>
                  </div>

                  <div className="ai-action-item priority-2">
                    <div className="ai-action-icon">
                      <TrendingUp size={20} className="text-indigo-600" />
                    </div>
                    <div className="ai-action-content">
                      <h4>Configure Systematic Transfers (SIP)</h4>
                      <p>Deploy ₹{(investmentData?.recommendedMonthlyInvestment || 0).toLocaleString()}/month across mutual fund allocations.</p>
                      <span className="ai-action-status status-high">High Priority</span>
                    </div>
                  </div>

                  <div className="ai-action-item priority-3">
                    <div className="ai-action-icon">
                      <Lightbulb size={20} className="text-amber-500" />
                    </div>
                    <div className="ai-action-content">
                      <h4>Optimize Spending Deviations</h4>
                      <p>Audit category allocations exceeding specified benchmark percentages to recoup excess savings.</p>
                      <span className="ai-action-status status-medium">Ongoing Focus</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
