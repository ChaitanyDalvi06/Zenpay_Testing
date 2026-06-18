import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, PiggyBank, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import SpendingCategory from '../../components/spending/SpendingCategory';
import './Dashboard.css'; 
import TransactionHistory from '../../components/TransactionHistory';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const profileRes = await fetch('http://localhost:8000/api/profile', { headers });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }

      try {
        const paymentsRes = await fetch('http://localhost:8000/api/payment/payments');
        if (paymentsRes.ok) {
          const paymentsData = await paymentsRes.json();
          setPayments(paymentsData.payments || []);
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
      }
    };
    fetchData();
  }, []);

  const successfulPayments = payments.filter(p => p.status === 'successful');
  const totalSpent = successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const displayMonthlySpending = totalSpent > 0 ? totalSpent : (profile?.monthlyExpenses || 15000);
  
  const income = profile?.monthlyIncome || 50000;
  const displayAvailableCredit = Math.max(0, income - totalSpent);
  
  const displayInvestmentPotential = profile?.monthlySavings || (income - (profile?.monthlyExpenses || 15000));

  // Determine current month name for chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthName = months[new Date().getMonth()];

  const chartData = [
    { month: 'Jan', expenses: 4000 },
    { month: 'Feb', expenses: 3000 },
    { month: 'Mar', expenses: 5000 },
    { month: 'Apr', expenses: 2780 },
    { month: 'May', expenses: 1890 },
    { month: currentMonthName, expenses: displayMonthlySpending }
  ];

  // Get category from payee name
  const getCategoryByMerchant = (merchant) => {
    const m = String(merchant || '').toLowerCase();
    if (m.includes('swiggy') || m.includes('zomato') || m.includes('restaurant') || m.includes('food') || m.includes('starbucks')) {
      return 'Food & Dining';
    }
    if (m.includes('amazon') || m.includes('ajio') || m.includes('flipkart') || m.includes('shopping') || m.includes('myntra')) {
      return 'Shopping';
    }
    if (m.includes('uber') || m.includes('ola') || m.includes('transport') || m.includes('metro') || m.includes('car')) {
      return 'Transportation';
    }
    if (m.includes('spotify') || m.includes('netflix') || m.includes('movie') || m.includes('show') || m.includes('entertainment') || m.includes('bookmyshow')) {
      return 'Entertainment';
    }
    return 'Shopping';
  };

  // Group successful payments by category
  const categorySums = {
    'Food & Dining': 0,
    'Shopping': 0,
    'Transportation': 0,
    'Entertainment': 0
  };

  successfulPayments.forEach(p => {
    const cat = getCategoryByMerchant(p.payeeName);
    if (categorySums[cat] !== undefined) {
      categorySums[cat] += p.amount || 0;
    } else {
      categorySums['Shopping'] += p.amount || 0;
    }
  });

  const totalCategorized = Object.values(categorySums).reduce((sum, val) => sum + val, 0);

  const categoriesList = totalCategorized > 0 ? [
    { name: 'Food & Dining', amount: categorySums['Food & Dining'], percentage: `${Math.round((categorySums['Food & Dining'] / totalCategorized) * 100)}%` },
    { name: 'Shopping', amount: categorySums['Shopping'], percentage: `${Math.round((categorySums['Shopping'] / totalCategorized) * 100)}%` },
    { name: 'Transportation', amount: categorySums['Transportation'], percentage: `${Math.round((categorySums['Transportation'] / totalCategorized) * 100)}%` },
    { name: 'Entertainment', amount: categorySums['Entertainment'], percentage: `${Math.round((categorySums['Entertainment'] / totalCategorized) * 100)}%` }
  ] : [
    { name: 'Food & Dining', amount: 5000, percentage: '33%' },
    { name: 'Shopping', amount: 4000, percentage: '27%' },
    { name: 'Transportation', amount: 3000, percentage: '20%' },
    { name: 'Entertainment', amount: 3000, percentage: '20%' }
  ];

  return (
    <div className="dashboard-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Available Credit"
          value={formatCurrency(displayAvailableCredit)}
          icon={<CreditCard className="w-8 h-8 text-indigo-600" />}
        />
        <StatCard
          title="Monthly Spending"
          value={formatCurrency(displayMonthlySpending)}
          icon={<TrendingUp className="w-8 h-8 text-green-600" />}
        />
        <StatCard
          title="Investment Potential"
          value={formatCurrency(displayInvestmentPotential)}
          icon={<PiggyBank className="w-8 h-8 text-purple-600" />}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Expense Trends</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="expenses" stroke="#4f46e5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending Analysis Box */}
      <div className="spending-analysis">
        <h3 className="spending-analysis-title">
          <PieChart className="w-5 h-5 mr-2 text-purple-600" />
          Spending Analysis
        </h3>
        <div className="space-y-4">
          {categoriesList.map((cat, idx) => (
            <SpendingCategory 
              key={idx}
              category={cat.name} 
              amount={formatCurrency(cat.amount)} 
              percentage={cat.percentage} 
            />
          ))}
        </div>
      </div>

      <TransactionHistory />
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div>
        <p className="stat-card-title">{title}</p>
        <p className="stat-card-value">{value}</p>
      </div>
      {icon}
    </div>
  );
}

export default Dashboard;
