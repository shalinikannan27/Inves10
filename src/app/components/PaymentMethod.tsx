import { motion } from 'motion/react';
import { CreditCard, Smartphone, Wallet, ArrowRight } from 'lucide-react';

interface PaymentMethodProps {
  language: 'en' | 'hi';
  onSelect: (method: 'UPI' | 'Card' | 'Wallet') => void;
  onBack: () => void;
}

const content = {
  en: {
    title: 'Select Payment Method',
    subtitle: 'Choose how you want to pay',
    upi: 'UPI',
    upiDesc: 'Pay using UPI apps',
    card: 'Debit Card',
    cardDesc: 'Pay using your card',
    wallet: 'Wallet',
    walletDesc: 'Use wallet balance',
    back: 'Back',
  },
  hi: {
    title: 'भुगतान विधि चुनें',
    subtitle: 'आप कैसे भुगतान करना चाहते हैं',
    upi: 'UPI',
    upiDesc: 'UPI ऐप्स का उपयोग करें',
    card: 'डेबिट कार्ड',
    cardDesc: 'अपने कार्ड का उपयोग करें',
    wallet: 'वॉलेट',
    walletDesc: 'वॉलेट बैलेंस का उपयोग करें',
    back: 'वापस',
  },
};

export function PaymentMethod({ language, onSelect, onBack }: PaymentMethodProps) {
  const t = content[language];

  const methods = [
    {
      id: 'UPI' as const,
      icon: Smartphone,
      label: t.upi,
      description: t.upiDesc,
      color: 'blue',
    },
    {
      id: 'Card' as const,
      icon: CreditCard,
      label: t.card,
      description: t.cardDesc,
      color: 'purple',
    },
    {
      id: 'Wallet' as const,
      icon: Wallet,
      label: t.wallet,
      description: t.walletDesc,
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen px-4 pt-24 pb-24">
      <div className="max-w-2xl mx-auto">
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
          className="space-y-4 mb-8"
        >
          {methods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.button
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelect(method.id)}
                className="w-full border border-blue-900/20 p-6 hover:border-blue-400 hover:bg-blue-900/5 transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 border border-blue-900/20 bg-blue-900/10 group-hover:bg-blue-900/20 transition-all">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{method.label}</h3>
                    <p className="text-sm text-gray-400">{method.description}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </motion.button>
            );
          })}
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
