import { motion } from 'motion/react';
import { TrendingUp, Clock, CheckCircle, Calendar } from 'lucide-react';

interface InvestmentRecord {
  id: string;
  amount: number;
  fundName: string;
  fundType: 'FD' | 'Liquid' | 'Govt';
  date: Date;
  duration: number; // months
  returnRate: number;
  status: 'active' | 'completed';
  maturityDate: Date;
  currentValue: number;
}

interface InvestmentHistoryProps {
  language: 'en' | 'hi';
  investments: InvestmentRecord[];
}

const fundNames = {
  FD: [
    'National Growth & Stability Fund',
    'Bharat Public Savings Authority',
    'Central Secure Investment Board',
  ],
  Liquid: [
    'BlueHarbor Wealth Partners',
    'Navia Capital Management',
    'Aurora Yield Fund',
  ],
  Govt: [
    'Indian Long-Term Capital Trust',
    'Unified Citizen Wealth Fund',
    'Public Infrastructure Growth Fund',
  ],
};

const translations = {
  en: {
    title: 'Investment History',
    totalInvested: 'Total Invested',
    currentValue: 'Current Value',
    noInvestments: 'No investments yet',
    startInvesting: 'Start your investment journey',
    active: 'Active',
    completed: 'Completed',
    amount: 'Amount',
    duration: 'Duration',
    returns: 'Returns',
    maturity: 'Maturity',
    months: 'months',
    status: 'Status',
    investedOn: 'Invested on',
  },
  hi: {
    title: 'निवेश इतिहास',
    totalInvested: 'कुल निवेश',
    currentValue: 'वर्तमान मूल्य',
    noInvestments: 'अभी तक कोई निवेश नहीं',
    startInvesting: 'अपनी निवेश यात्रा शुरू करें',
    active: 'सक्रिय',
    completed: 'पूर्ण',
    amount: 'राशि',
    duration: 'अवधि',
    returns: 'रिटर्न',
    maturity: 'परिपक्वता',
    months: 'महीने',
    status: 'स्थिति',
    investedOn: 'निवेश किया गया',
  },
};

const typeColors = {
  FD: 'text-blue-400',
  Liquid: 'text-blue-300',
  Govt: 'text-blue-500',
};

export function InvestmentHistory({ language, investments }: InvestmentHistoryProps) {
  const t = translations[language];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">{t.title}</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border border-blue-900/20 p-6 bg-blue-900/5">
              <div className="text-sm text-gray-400 mb-2">{t.totalInvested}</div>
              <div className="text-3xl font-bold text-white">
                ₹{totalInvested.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="border border-blue-900/20 p-6 bg-blue-900/10">
              <div className="text-sm text-gray-400 mb-2">{t.currentValue}</div>
              <div className="text-3xl font-bold text-blue-400">
                ₹{currentValue.toLocaleString('en-IN')}
              </div>
              {currentValue > totalInvested && (
                <div className="text-sm text-blue-400 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +₹{(currentValue - totalInvested).toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Investments List */}
        {investments.length === 0 ? (
          <div className="border border-blue-900/20 p-12 text-center">
            <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400 mb-2">{t.noInvestments}</p>
            <p className="text-sm text-gray-600">{t.startInvesting}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {investments.map((investment, index) => (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-blue-900/20 p-6 hover:border-blue-400/30 hover:bg-blue-900/5 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 bg-blue-900/20 ${typeColors[investment.fundType]}`}>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{investment.fundName}</h3>
                        <div className="text-sm text-gray-400">{investment.fundType}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">{t.amount}</div>
                        <div className="font-bold">₹{investment.amount.toLocaleString('en-IN')}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">{t.duration}</div>
                        <div className="font-bold">
                          {investment.duration} {t.months}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">{t.returns}</div>
                        <div className="font-bold text-blue-400">{investment.returnRate}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">{t.status}</div>
                        <div className="flex items-center gap-1">
                          {investment.status === 'active' ? (
                            <>
                              <Clock className="w-3 h-3 text-blue-400" />
                              <span className="font-bold text-blue-400">{t.active}</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3 text-blue-400" />
                              <span className="font-bold text-blue-400">{t.completed}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="text-right border-t md:border-t-0 md:border-l border-blue-900/20 pt-4 md:pt-0 md:pl-6">
                    <div className="text-sm text-gray-500 mb-1">{t.currentValue}</div>
                    <div className="text-2xl font-bold text-blue-400 mb-3">
                      ₹{investment.currentValue.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center justify-end gap-1">
                      <Calendar className="w-3 h-3" />
                      {t.investedOn}{' '}
                      {investment.date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {t.maturity}:{' '}
                      {investment.maturityDate.toLocaleDateString(
                        language === 'hi' ? 'hi-IN' : 'en-IN',
                        {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        }
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Helper function to assign fund names
export function assignFundName(type: 'FD' | 'Liquid' | 'Govt'): string {
  const funds = fundNames[type];
  return funds[Math.floor(Math.random() * funds.length)];
}
