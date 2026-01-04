import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section, Investment } from '../App';
import { CircleCheck, TrendingUp, ArrowRight, X, Target, Shield, Clock, Zap } from 'lucide-react';
import { GoalType, GoalTag } from './GoalTag';
import { EntitySelection } from './EntitySelection';
import { PaymentMethod } from './PaymentMethod';
import { PINConfirmation } from './PINConfirmation';

interface InvestmentActionProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  recommendation: {
    type: 'FD' | 'Liquid' | 'Govt';
    rate: number;
    reason: string;
  } | null;
  walletBalance: number;
  onInvest: (investment: Omit<Investment, 'id' | 'date'>) => void;
  hasInvestedBefore: boolean;
  habitStreak?: number;
}

const content = {
  en: {
    title: 'Invest Now',
    subtitle: 'Start your investment journey',
    amount: 'Investment Amount',
    balance: 'Available Balance',
    duration: 'Duration',
    months: 'months',
    goal: 'Investment Goal (Optional)',
    selectGoal: 'Select a goal for this investment',
    projectedReturn: 'Projected Return (6 months)',
    totalValue: 'Total Value',
    confirmButton: 'Confirm Investment',
    cancelButton: 'Cancel',
    successTitle: 'Investment Successful!',
    successMessage: 'You\'ve taken your first step towards financial growth',
    motivationTitle: 'Building Your Future',
    motivationMessage: 'You\'ve taken your first step. Increasing your amount next time can help your money grow faster.',
    motivationSubtext: 'Consistency matters more than amount when starting out.',
    comparisonTitle: 'Compare Potential Returns',
    viewDashboard: 'View Dashboard',
    investAgain: 'Invest Again',
    close: 'Close',
  },
  hi: {
    title: 'अभी निवेश करें',
    subtitle: 'अपनी निवेश यात्रा शुरू करें',
    amount: 'निवेश राशि',
    balance: 'उपलब्ध राशि',
    duration: 'अवधि',
    months: 'महीने',
    goal: 'निवेश लक्ष्य (वैकल्पिक)',
    selectGoal: 'इस निवेश के लिए एक लक्ष्य चुनें',
    projectedReturn: 'अनुमानित रिटर्न (6 महीने)',
    totalValue: 'कुल मूल्य',
    confirmButton: 'निवेश की पुष्टि करें',
    cancelButton: 'रद्द करें',
    successTitle: 'निवेश सफल!',
    successMessage: 'आपने वित्तीय विकास की दिशा में अपना पहला कदम उठाया है',
    motivationTitle: 'अपना भविष्य बनाएं',
    motivationMessage: 'आपने अपना पहला कदम उठाया है। अगली बार अपनी राशि बढ़ाने से आपका पैसा तेजी से बढ़ सकता है।',
    motivationSubtext: 'शुरुआत में राशि से ज्यादा निरंतरता मायने रखती है।',
    comparisonTitle: 'संभावित रिटर्न की तुलना करें',
    viewDashboard: 'डैशबोर्ड देखें',
    investAgain: 'फिर से निवेश करें',
    close: 'बंद करें',
  },
};

export function InvestmentAction({
  onNavigate,
  language,
  recommendation,
  walletBalance,
  onInvest,
  hasInvestedBefore,
  habitStreak,
}: InvestmentActionProps) {
  const [amount, setAmount] = useState(10);
  const [selectedGoal, setSelectedGoal] = useState<GoalType | undefined>(undefined);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'UPI' | 'Card' | 'Wallet' | null>(null);
  const [step, setStep] = useState<'amount' | 'entity' | 'payment' | 'pin' | 'success'>('amount');
  const [showSuccess, setShowSuccess] = useState(false);

  const t = content[language];

  if (!recommendation) return null;

  const calculateReturns = (investAmount: number) => {
    const interest = (investAmount * recommendation.rate * 0.5) / 100;
    return {
      principal: investAmount,
      returns: parseFloat(interest.toFixed(2)),
      total: parseFloat((investAmount + interest).toFixed(2)),
    };
  };

  const projection = calculateReturns(amount);
  const comparisons = [10, 50, 100].map((amt) => ({
    amount: amt,
    ...calculateReturns(amt),
  }));

  const handleEntitySelect = (entityName: string) => {
    setSelectedEntity(entityName);
    setStep('payment');
  };

  const handlePaymentSelect = (method: 'UPI' | 'Card' | 'Wallet') => {
    setSelectedPaymentMethod(method);
    setStep('pin');
  };

  const handlePINConfirm = (pin: string) => {
    onInvest({
      amount,
      type: recommendation.type,
      projectedReturn: projection.returns,
      duration: 6,
      goal: selectedGoal,
      fundName: selectedEntity || undefined,
    });
    setStep('success');
    setShowSuccess(true);
  };

  const goalOptions: { type: GoalType; icon: typeof Target }[] = [
    { type: 'emergency', icon: Shield },
    { type: 'short-term', icon: Clock },
    { type: 'learning', icon: Target },
    { type: 'retirement', icon: Zap },
  ];

  // Show entity selection
  if (step === 'entity') {
    return (
      <EntitySelection
        language={language}
        onSelect={handleEntitySelect}
        onBack={() => setStep('amount')}
      />
    );
  }

  // Show payment method selection
  if (step === 'payment') {
    return (
      <PaymentMethod
        language={language}
        onSelect={handlePaymentSelect}
        onBack={() => setStep('entity')}
      />
    );
  }

  // Show PIN confirmation
  if (step === 'pin' && selectedPaymentMethod) {
    return (
      <PINConfirmation
        language={language}
        amount={amount}
        paymentMethod={selectedPaymentMethod}
        onConfirm={handlePINConfirm}
        onBack={() => setStep('payment')}
      />
    );
  }

  return (
    <div className="min-h-screen px-4 pt-24 pb-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-blue-900/20 p-8 mb-8 shadow-xl shadow-blue-900/10"
        >
          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block mb-3 font-bold">{t.amount}</label>
            <div className="flex gap-3 mb-4">
              {[10, 50, 100].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`flex-1 py-3 border transition-all font-bold ${
                    amount === amt
                      ? 'border-blue-400 bg-blue-900/20 scale-105 shadow-lg shadow-blue-900/20'
                      : 'border-blue-900/20 hover:border-blue-400 hover:bg-blue-900/5'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full accent-blue-400"
            />
            <div className="text-center mt-2">
              <span className="text-3xl font-bold text-blue-400">₹{amount}</span>
            </div>
          </div>

          {/* Goal Selection */}
          <div className="mb-6">
            <label className="block mb-3 font-bold">{t.goal}</label>
            <p className="text-sm text-gray-400 mb-3">{t.selectGoal}</p>
            <div className="grid grid-cols-2 gap-3">
              {goalOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => setSelectedGoal(selectedGoal === option.type ? undefined : option.type)}
                  className={`p-3 border transition-all ${
                    selectedGoal === option.type
                      ? 'border-blue-400 bg-blue-900/10 scale-105'
                      : 'border-blue-900/20 hover:border-blue-400/50 hover:bg-blue-900/5'
                  }`}
                >
                  <GoalTag goal={option.type} language={language} size="sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Balance */}
          <div className="mb-6 p-4 border border-blue-900/20 bg-black/20">
            <div className="flex justify-between">
              <span className="text-gray-400">{t.balance}</span>
              <span className="font-bold text-lg">₹{walletBalance}</span>
            </div>
          </div>

          {/* Projection */}
          <div className="border border-blue-400 bg-gradient-to-br from-blue-900/10 to-transparent p-6 mb-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              {t.projectedReturn}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">{t.amount}</span>
                <span className="font-bold">₹{projection.principal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t.projectedReturn}</span>
                <motion.span 
                  key={projection.returns}
                  initial={{ scale: 1.2, color: '#60a5fa' }}
                  animate={{ scale: 1, color: '#60a5fa' }}
                  className="text-blue-400 font-bold"
                >
                  +₹{projection.returns}
                </motion.span>
              </div>
              <div className="h-px bg-blue-900/20" />
              <div className="flex justify-between text-lg">
                <span className="font-bold">{t.totalValue}</span>
                <motion.span 
                  key={projection.total}
                  initial={{ scale: 1.2, color: '#60a5fa' }}
                  animate={{ scale: 1, color: '#60a5fa' }}
                  className="font-bold text-blue-400"
                >
                  ₹{projection.total}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Invest Button */}
          <button
            onClick={() => setStep('entity')}
            disabled={amount > walletBalance}
            className="w-full py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold shadow-xl hover:shadow-2xl hover:scale-105"
          >
            {t.confirmButton}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-blue-400 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  setShowSuccess(false);
                  onNavigate('dashboard');
                }}
                className="absolute top-4 right-4 p-2 hover:bg-blue-900/10 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <CircleCheck className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">{t.successTitle}</h2>
                <p className="text-gray-400">{t.successMessage}</p>
              </div>

              {!hasInvestedBefore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="border border-blue-900/20 p-6 mb-6"
                >
                  <h3 className="text-xl font-bold mb-3">{t.motivationTitle}</h3>
                  <p className="text-gray-300 mb-2">{t.motivationMessage}</p>
                  <p className="text-sm text-gray-400 italic">{t.motivationSubtext}</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-xl font-bold mb-4">{t.comparisonTitle}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {comparisons.map((comp, index) => (
                    <div
                      key={index}
                      className={`border p-4 transition-all ${
                        comp.amount === amount
                          ? 'border-blue-400 bg-blue-900/10'
                          : 'border-blue-900/20'
                      }`}
                    >
                      <div className="text-sm text-gray-400 mb-2">₹{comp.amount}</div>
                      <div className="text-lg font-bold text-blue-400">+₹{comp.returns}</div>
                      <div className="text-xs text-gray-400">in 6 months</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setAmount(10);
                    setSelectedEntity(null);
                    setSelectedPaymentMethod(null);
                    setStep('amount');
                  }}
                  className="flex-1 py-3 border border-blue-900/20 hover:border-blue-400 transition-all"
                >
                  {t.investAgain}
                </button>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    onNavigate('dashboard');
                  }}
                  className="flex-1 py-3 bg-blue-900 text-white hover:bg-blue-800 transition-all"
                >
                  {t.viewDashboard}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}