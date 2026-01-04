import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight } from 'lucide-react';

interface PINConfirmationProps {
  language: 'en' | 'hi';
  amount: number;
  paymentMethod: 'UPI' | 'Card' | 'Wallet';
  onConfirm: (pin: string) => void;
  onBack: () => void;
}

const content = {
  en: {
    title: 'Confirm Payment',
    subtitle: 'Enter your PIN to complete the transaction',
    amount: 'Amount',
    method: 'Payment Method',
    pinLabel: 'Enter 4-digit PIN',
    pinPlaceholder: '• • • •',
    confirmButton: 'Confirm Payment',
    back: 'Back',
    invalidPin: 'Please enter a 4-digit PIN',
    samplePin: 'Sample PIN: Any 4 digits',
  },
  hi: {
    title: 'भुगतान की पुष्टि करें',
    subtitle: 'लेनदेन पूरा करने के लिए अपना PIN दर्ज करें',
    amount: 'राशि',
    method: 'भुगतान विधि',
    pinLabel: '4 अंकों का PIN दर्ज करें',
    pinPlaceholder: '• • • •',
    confirmButton: 'भुगतान की पुष्टि करें',
    back: 'वापस',
    invalidPin: 'कृपया 4 अंकों का PIN दर्ज करें',
    samplePin: 'नमूना PIN: कोई भी 4 अंक',
  },
};

export function PINConfirmation({
  language,
  amount,
  paymentMethod,
  onConfirm,
  onBack,
}: PINConfirmationProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const t = content[language];

  const handlePinChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '').slice(0, 4);
    setPin(numericValue);
    setError('');
  };

  const handleConfirm = () => {
    if (pin.length !== 4) {
      setError(t.invalidPin);
      return;
    }
    onConfirm(pin);
  };

  return (
    <div className="min-h-screen px-4 pt-24 pb-24">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-6 border border-blue-400 bg-blue-900/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-blue-900/20 p-8 mb-8"
        >
          {/* Transaction Details */}
          <div className="space-y-4 mb-6 pb-6 border-b border-blue-900/20">
            <div className="flex justify-between">
              <span className="text-gray-400">{t.amount}</span>
              <span className="text-2xl font-bold text-blue-400">₹{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t.method}</span>
              <span className="font-bold">{paymentMethod}</span>
            </div>
          </div>

          {/* PIN Input */}
          <div className="mb-6">
            <label className="block mb-3 font-bold">{t.pinLabel}</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              placeholder={t.pinPlaceholder}
              className="w-full bg-black border border-blue-900/20 px-4 py-4 text-center text-2xl tracking-[1em] focus:border-blue-400 focus:outline-none transition-all"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
            <p className="text-xs text-gray-500 mt-2 text-center">{t.samplePin}</p>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={pin.length !== 4}
            className="w-full py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold shadow-xl hover:shadow-2xl hover:scale-105 disabled:hover:scale-100"
          >
            {t.confirmButton}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        <button
          onClick={onBack}
          className="w-full py-3 border border-blue-900/20 hover:border-blue-400 transition-all"
        >
          {t.back}
        </button>
      </div>
    </div>
  );
}
