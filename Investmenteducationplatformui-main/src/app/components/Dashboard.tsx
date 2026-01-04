import { motion } from 'motion/react';
import { Section, Investment, LiteracyProgress } from '../App';
import { Wallet, TrendingUp, Shield, Calendar, Sparkles, ArrowUpRight, Target } from 'lucide-react';
import { ConfidenceScore } from './ConfidenceScore';
import { GoalTag } from './GoalTag';

interface DashboardProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  investments: Investment[];
  walletBalance: number;
  literacyProgress: LiteracyProgress;
  habitStreak: number;
  lastVisit: Date | null;
}

const content = {
  en: {
    title: 'Investment Dashboard',
    subtitle: 'Track your progress',
    whatsNew: 'What\'s New',
    whatsNewSubtitle: 'Since your last visit',
    newInvestments: 'New investments',
    growthThisWeek: 'Growth this week',
    weeklyInsight: 'Weekly Insight',
    consistency: 'Great consistency!',
    keepGoing: 'Keep investing regularly to build a strong habit.',
    walletBalance: 'Available Balance',
    totalInvested: 'Total Invested',
    projectedReturns: 'Projected Returns',
    totalValue: 'Total Projected Value',
    riskLevel: 'Risk Level',
    low: 'Low',
    explanation: 'Returns grow gradually with lower risk using simple assumptions.',
    recentInvestments: 'Recent Investments',
    amount: 'Amount',
    type: 'Type',
    date: 'Date',
    returns: 'Returns',
    goal: 'Goal',
    noInvestments: 'No investments yet',
    startInvesting: 'Start Investing',
    makeInvestment: 'Make New Investment',
    viewProgress: 'View Detailed Progress',
  },
  hi: {
    title: 'निवेश डैशबोर्ड',
    subtitle: 'अपनी प्रगति ट्रैक करें',
    whatsNew: 'नया क्या है',
    whatsNewSubtitle: 'आपकी पिछली यात्रा के बाद से',
    newInvestments: 'नए निवेश',
    growthThisWeek: 'इस सप्ताह की वृद्धि',
    weeklyInsight: 'साप्ताहिक अंतर्दृष्टि',
    consistency: 'बेहतरीन निरंतरता!',
    keepGoing: 'एक मजबूत आदत बनाने के लिए नियमित रूप से निवेश करते रहें।',
    walletBalance: 'उपलब्ध राशि',
    totalInvested: 'कुल निवेश',
    projectedReturns: 'अनुमानित रिटर्न',
    totalValue: 'कुल अनुमानित मूल्य',
    riskLevel: 'जोखिम स्तर',
    low: 'कम',
    explanation: 'साधारण मान्यताओं का उपयोग करके कम जोखिम के साथ रिटर्न धीरे-धीरे बढ़ता है।',
    recentInvestments: 'हाल के निवेश',
    amount: 'राशि',
    type: 'प्रकार',
    date: 'तारीख',
    returns: 'रिटर्न',
    goal: 'लक्ष्य',
    noInvestments: 'अभी तक कोई निवेश नहीं',
    startInvesting: 'निवेश शुरू करें',
    makeInvestment: 'नया निवेश करें',
    viewProgress: 'विस्तृत प्रगति देखें',
  },
};

export function Dashboard({ 
  onNavigate, 
  language, 
  investments, 
  walletBalance,
  literacyProgress,
  habitStreak,
  lastVisit,
}: DashboardProps) {
  const t = content[language];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalProjectedReturns = investments.reduce((sum, inv) => sum + inv.projectedReturn, 0);
  const totalValue = totalInvested + totalProjectedReturns;

  // Calculate literacy progress percentage
  const literacyTopics = Object.keys(literacyProgress);
  const completedTopics = literacyTopics.filter(key => literacyProgress[key].completed).length;
  const literacyPercentage = literacyTopics.length > 0 
    ? (completedTopics / literacyTopics.length) * 100 
    : 0;

  // Calculate what's new since last visit
  const recentInvestments = lastVisit 
    ? investments.filter(inv => new Date(inv.date) > new Date(lastVisit))
    : [];
  
  const weeklyGrowth = recentInvestments.reduce((sum, inv) => sum + inv.projectedReturn, 0);

  const stats = [
    {
      icon: Wallet,
      label: t.totalInvested,
      value: `₹${totalInvested}`,
      color: 'text-blue-400',
      trend: investments.length > 0 ? 'up' : null,
    },
    {
      icon: TrendingUp,
      label: t.projectedReturns,
      value: `₹${totalProjectedReturns.toFixed(2)}`,
      color: 'text-blue-400',
      trend: totalProjectedReturns > 0 ? 'up' : null,
    },
    {
      icon: Shield,
      label: t.riskLevel,
      value: t.low,
      color: 'text-blue-400',
      trend: null,
    },
  ];

  return (
    <div className="min-h-screen px-4 pt-24 pb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        {/* What's New Card (if there's activity) */}
        {lastVisit && recentInvestments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-blue-900/30 bg-gradient-to-br from-blue-900/10 to-transparent p-6 mb-8 shadow-xl shadow-blue-900/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">{t.whatsNew}</h3>
                <p className="text-sm text-gray-400">{t.whatsNewSubtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-blue-900/20 bg-black/20">
                <div className="text-2xl font-bold text-blue-400">{recentInvestments.length}</div>
                <div className="text-sm text-gray-400">{t.newInvestments}</div>
              </div>
              <div className="p-4 border border-blue-900/20 bg-black/20">
                <div className="text-2xl font-bold text-blue-400">+₹{weeklyGrowth.toFixed(2)}</div>
                <div className="text-sm text-gray-400">{t.growthThisWeek}</div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Stats Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="border border-blue-900/20 p-5 hover:border-blue-400/50 hover:bg-blue-900/5 transition-all group shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <stat.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      {stat.trend === 'up' && (
                        <ArrowUpRight className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                  <div className="text-xl font-bold">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Total Value */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-blue-900 bg-gradient-to-br from-blue-900/10 to-transparent p-8 shadow-2xl shadow-blue-900/20"
            >
              <div className="text-center mb-6">
                <div className="text-sm text-gray-400 mb-2">{t.totalValue}</div>
                <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-4">
                  ₹{totalValue.toFixed(2)}
                </div>
                <p className="text-gray-400 max-w-2xl mx-auto">{t.explanation}</p>
              </div>
            </motion.div>

            {/* Recent Investments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-blue-900/20 p-8 shadow-xl shadow-blue-900/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t.recentInvestments}</h2>
                <button
                  onClick={() => onNavigate('progress')}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  {t.viewProgress}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {investments.length === 0 ? (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-blue-400/50 mx-auto mb-4" />
                  <p className="text-gray-400 mb-6">{t.noInvestments}</p>
                  <button
                    onClick={() => onNavigate('invest')}
                    className="px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    {t.startInvesting}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {investments.slice().reverse().slice(0, 5).map((investment, index) => (
                    <motion.div
                      key={investment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="border border-blue-900/20 p-5 hover:border-blue-400/50 hover:bg-blue-900/5 transition-all group"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">{t.amount}</div>
                          <div className="font-bold">₹{investment.amount}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">{t.type}</div>
                          <div className="font-bold">{investment.type}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">{t.date}</div>
                          <div className="text-sm">
                            {new Date(investment.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">{t.returns}</div>
                          <div className="font-bold text-blue-400 flex items-center gap-1">
                            +₹{investment.projectedReturn.toFixed(2)}
                            <ArrowUpRight className="w-3 h-3" />
                          </div>
                        </div>
                        <div>
                          {investment.goal && (
                            <GoalTag goal={investment.goal} language={language} size="sm" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <button
                    onClick={() => onNavigate('invest')}
                    className="w-full py-4 border border-blue-400 hover:bg-blue-900/10 transition-all font-bold group mt-4"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t.makeInvestment}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar - Confidence Score */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="sticky top-24"
            >
              <ConfidenceScore
                language={language}
                literacyProgress={literacyPercentage}
                investmentCount={investments.length}
                habitStreak={habitStreak}
              />
            </motion.div>
          </div>
        </div>

        {/* Sticky Mobile CTA */}
        {investments.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-sm border-t border-blue-900/20 md:hidden z-20">
            <button
              onClick={() => onNavigate('invest')}
              className="w-full py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all shadow-lg"
            >
              {t.makeInvestment}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}