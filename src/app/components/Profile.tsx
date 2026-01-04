import { motion } from 'motion/react';
import { User, TrendingUp, Wallet, Award, ArrowLeft, Calendar, Building2 } from 'lucide-react';
import { Section, Investment, WalletTransaction } from '../App';

interface ProfileProps {
  language: 'en' | 'hi';
  onNavigate: (section: Section) => void;
  userName: string;
  totalInvested: number;
  totalReturns: number;
  currentValue: number;
  investments: Investment[];
  walletTransactions: WalletTransaction[];
  habitStreak: number;
}

const content = {
  en: {
    title: 'My Profile',
    overview: 'Investment Overview',
    totalInvested: 'Total Invested',
    totalReturns: 'Total Returns',
    currentValue: 'Current Value',
    habitStreak: 'Investment Streak',
    days: 'days',
    investmentHistory: 'Investment History',
    transactionHistory: 'Transaction History',
    noInvestments: 'No investments yet',
    noTransactions: 'No transactions yet',
    active: 'Active',
    completed: 'Completed',
    pending: 'Pending',
    credit: 'Credit',
    debit: 'Debit',
    back: 'Back to Dashboard',
  },
  hi: {
    title: 'मेरा प्रोफाइल',
    overview: 'निवेश अवलोकन',
    totalInvested: 'कुल निवेश',
    totalReturns: 'कुल रिटर्न',
    currentValue: 'वर्तमान मूल्य',
    habitStreak: 'निवेश लकीर',
    days: 'दिन',
    investmentHistory: 'निवेश इतिहास',
    transactionHistory: 'लेनदेन इतिहास',
    noInvestments: 'अभी तक कोई निवेश नहीं',
    noTransactions: 'अभी तक कोई लेनदेन नहीं',
    active: 'सक्रिय',
    completed: 'पूर्ण',
    pending: 'लंबित',
    credit: 'जमा',
    debit: 'निकासी',
    back: 'डैशबोर्ड पर वापस',
  },
};

export function Profile({
  language,
  onNavigate,
  userName,
  totalInvested,
  totalReturns,
  currentValue,
  investments,
  walletTransactions,
  habitStreak,
}: ProfileProps) {
  const t = content[language];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t.back}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 border border-blue-400 bg-blue-900/10 flex items-center justify-center">
              <User className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{userName}</h1>
              <p className="text-gray-400">{t.title}</p>
            </div>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">{t.overview}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-blue-900/20 p-6 bg-black/20">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">{t.totalInvested}</span>
              </div>
              <p className="text-2xl font-bold">₹{totalInvested}</p>
            </div>

            <div className="border border-blue-900/20 p-6 bg-black/20">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">{t.totalReturns}</span>
              </div>
              <p className="text-2xl font-bold text-blue-400">+₹{totalReturns.toFixed(2)}</p>
            </div>

            <div className="border border-blue-900/20 p-6 bg-black/20">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">{t.currentValue}</span>
              </div>
              <p className="text-2xl font-bold">₹{currentValue.toFixed(2)}</p>
            </div>

            <div className="border border-blue-900/20 p-6 bg-black/20">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">{t.habitStreak}</span>
              </div>
              <p className="text-2xl font-bold">{habitStreak} {t.days}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Investment History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">{t.investmentHistory}</h2>
            <div className="border border-blue-900/20 bg-black/20 max-h-[600px] overflow-y-auto">
              {investments.length === 0 ? (
                <div className="p-8 text-center text-gray-400">{t.noInvestments}</div>
              ) : (
                <div className="divide-y divide-blue-900/20">
                  {investments.map((investment) => {
                    const maturityDate = new Date(investment.date);
                    maturityDate.setMonth(maturityDate.getMonth() + investment.duration);
                    
                    const monthsElapsed = Math.max(0, (new Date().getTime() - investment.date.getTime()) / (1000 * 60 * 60 * 24 * 30));
                    const interest = investment.amount * (investment.projectedReturn / 100) * (monthsElapsed / 12);
                    const currentVal = investment.amount + interest;

                    return (
                      <div key={investment.id} className="p-4 hover:bg-blue-900/5 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="p-2 border border-blue-900/20 bg-blue-900/10 shrink-0">
                            <Building2 className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold mb-1">{investment.fundName}</h3>
                            <div className="text-sm text-gray-400 space-y-1">
                              <div className="flex justify-between">
                                <span>Amount:</span>
                                <span className="font-bold">₹{investment.amount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Current Value:</span>
                                <span className="font-bold text-blue-400">₹{currentVal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Date:</span>
                                <span>{formatDate(investment.date)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Status:</span>
                                <span className={`text-xs px-2 py-1 border ${
                                  investment.status === 'active' 
                                    ? 'border-blue-400 text-blue-400 bg-blue-900/10'
                                    : investment.status === 'completed'
                                    ? 'border-green-400 text-green-400 bg-green-900/10'
                                    : 'border-yellow-400 text-yellow-400 bg-yellow-900/10'
                                }`}>
                                  {investment.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">{t.transactionHistory}</h2>
            <div className="border border-blue-900/20 bg-black/20 max-h-[600px] overflow-y-auto">
              {walletTransactions.length === 0 ? (
                <div className="p-8 text-center text-gray-400">{t.noTransactions}</div>
              ) : (
                <div className="divide-y divide-blue-900/20">
                  {walletTransactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 hover:bg-blue-900/5 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{transaction.description}</span>
                        <span className={`font-bold ${
                          transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                        {transaction.method && (
                          <span className="text-xs px-2 py-1 border border-blue-900/20 bg-blue-900/10">
                            {transaction.method}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
