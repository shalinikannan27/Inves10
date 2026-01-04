import { motion } from 'motion/react';
import { Section, Investment } from '../App';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ChartBar } from 'lucide-react';

interface ProgressChartsProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  investments: Investment[];
}

const content = {
  en: {
    title: 'Investment Progress',
    subtitle: 'Visualize your growth',
    investmentOverTime: 'Investment Over Time',
    projectedGrowth: 'Projected Growth Curve',
    investmentBreakdown: 'Investment Breakdown by Type',
    noData: 'No investment data yet',
    startInvesting: 'Start Investing',
    month: 'Month',
    amount: 'Amount (₹)',
    total: 'Total (₹)',
  },
  hi: {
    title: 'निवेश प्रगति',
    subtitle: 'अपनी वृद्धि देखें',
    investmentOverTime: 'समय के साथ निवेश',
    projectedGrowth: 'अनुमानित वृद्धि वक्र',
    investmentBreakdown: 'प्रकार के अनुसार निवेश विभाजन',
    noData: 'अभी तक कोई निवेश डेटा नहीं',
    startInvesting: 'निवेश शुरू करें',
    month: 'महीना',
    amount: 'राशि (₹)',
    total: 'कुल (₹)',
  },
};

export function ProgressCharts({ onNavigate, language, investments }: ProgressChartsProps) {
  const t = content[language];

  if (investments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <TrendingUp className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">{t.noData}</h2>
          <button
            onClick={() => onNavigate('invest')}
            className="px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all"
          >
            {t.startInvesting}
          </button>
        </motion.div>
      </div>
    );
  }

  // Prepare data for charts
  const timelineData = investments.map((inv, index) => ({
    name: `Inv ${index + 1}`,
    amount: inv.amount,
    date: new Date(inv.date).toLocaleDateString(),
  }));

  // Projected growth data (6 months)
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = investments.reduce((sum, inv) => sum + inv.projectedReturn, 0);
  
  const growthData = [
    { month: 'Now', value: totalInvested },
    { month: 'Month 1', value: totalInvested + (totalReturns * 0.16) },
    { month: 'Month 2', value: totalInvested + (totalReturns * 0.33) },
    { month: 'Month 3', value: totalInvested + (totalReturns * 0.5) },
    { month: 'Month 4', value: totalInvested + (totalReturns * 0.66) },
    { month: 'Month 5', value: totalInvested + (totalReturns * 0.83) },
    { month: 'Month 6', value: totalInvested + totalReturns },
  ];

  // Investment breakdown by type
  const breakdownData = investments.reduce((acc, inv) => {
    const existing = acc.find(item => item.type === inv.type);
    if (existing) {
      existing.amount += inv.amount;
    } else {
      acc.push({ type: inv.type, amount: inv.amount });
    }
    return acc;
  }, [] as { type: string; amount: number }[]);

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        {/* Investment Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-blue-900/20 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <ChartBar className="w-6 h-6 text-blue-400" />
            {t.investmentOverTime}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a20" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000',
                  border: '1px solid #60a5fa40',
                  borderRadius: 0,
                }}
              />
              <Bar dataKey="amount" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Projected Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-blue-900/20 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            {t.projectedGrowth}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a20" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000',
                  border: '1px solid #60a5fa40',
                  borderRadius: 0,
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#60a5fa"
                strokeWidth={3}
                dot={{ fill: '#60a5fa', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Investment Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-blue-900/20 p-8"
        >
          <h2 className="text-2xl font-bold mb-6">{t.investmentBreakdown}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {breakdownData.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="border border-blue-900/20 p-6 hover:border-blue-400 transition-all"
              >
                <div className="text-sm text-gray-400 mb-2">{item.type}</div>
                <div className="text-3xl font-bold text-blue-400">₹{item.amount}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}