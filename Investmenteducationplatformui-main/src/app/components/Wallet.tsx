import { motion } from 'motion/react';
import { Wallet as WalletIcon, Plus, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
  method?: string;
  referenceId?: string;
}

interface WalletProps {
  language: 'en' | 'hi';
  balance: number;
  transactions: Transaction[];
  onAddMoney: () => void;
  onInvest: () => void;
}

const translations = {
  en: {
    title: 'My Wallet',
    balance: 'Available Balance',
    addMoney: 'Add Money',
    invest: 'Invest Now',
    transactions: 'Transaction History',
    noTransactions: 'No transactions yet',
    credit: 'Money Added',
    debit: 'Investment',
    via: 'via',
    ref: 'Ref',
  },
  hi: {
    title: 'मेरा वॉलेट',
    balance: 'उपलब्ध शेष',
    addMoney: 'पैसे जोड़ें',
    invest: 'अभी निवेश करें',
    transactions: 'लेनदेन इतिहास',
    noTransactions: 'अभी तक कोई लेनदेन नहीं',
    credit: 'पैसे जोड़े गए',
    debit: 'निवेश',
    via: 'द्वारा',
    ref: 'संदर्भ',
  },
};

export function Wallet({ language, balance, transactions, onAddMoney, onInvest }: WalletProps) {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-blue-900/20 p-8 mb-8 bg-gradient-to-br from-blue-900/10 to-transparent"
        >
          <div className="flex items-center gap-3 mb-4">
            <WalletIcon className="w-6 h-6 text-blue-400" />
            <span className="text-gray-400">{t.balance}</span>
          </div>
          <div className="text-5xl font-bold mb-8 text-blue-400">₹{balance.toLocaleString('en-IN')}</div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onAddMoney}
              className="px-6 py-3 bg-blue-900 text-white hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t.addMoney}
            </button>
            <button
              onClick={onInvest}
              className="px-6 py-3 border border-blue-900/20 hover:border-blue-400 hover:bg-blue-900/10 transition-all flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              {t.invest}
            </button>
          </div>
        </motion.div>

        {/* Transactions */}
        <div className="border border-blue-900/20 p-6">
          <h2 className="text-xl font-bold mb-6">{t.transactions}</h2>

          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <WalletIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{t.noTransactions}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((txn) => (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-blue-900/20 p-4 hover:bg-blue-900/5 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`p-2 ${
                          txn.type === 'credit'
                            ? 'bg-blue-900/20 text-blue-400'
                            : 'bg-blue-900/10 text-blue-300'
                        }`}
                      >
                        {txn.type === 'credit' ? (
                          <ArrowDownRight className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold mb-1">
                          {txn.type === 'credit' ? t.credit : t.debit}
                        </div>
                        <div className="text-sm text-gray-400">{txn.description}</div>
                        {txn.method && (
                          <div className="text-xs text-gray-500 mt-1">
                            {t.via} {txn.method}
                          </div>
                        )}
                        {txn.referenceId && (
                          <div className="text-xs text-gray-600 mt-1 font-mono">
                            {t.ref}: {txn.referenceId}
                          </div>
                        )}
                        <div className="text-xs text-gray-600 mt-1">
                          {txn.date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-bold text-lg ${
                        txn.type === 'credit' ? 'text-blue-400' : 'text-gray-400'
                      }`}
                    >
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
