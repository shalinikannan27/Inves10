import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, ChevronRight, Shield, Check, Lock } from 'lucide-react';

interface BankConnectionProps {
  language: 'en' | 'hi';
  onComplete: (bankDetails: { bankName: string; accountLast4: string }) => void;
  onSkip: () => void;
}

const banks = [
  { id: 'sbi', name: 'State Bank of India', short: 'SBI' },
  { id: 'hdfc', name: 'HDFC Bank', short: 'HDFC' },
  { id: 'icici', name: 'ICICI Bank', short: 'ICICI' },
  { id: 'axis', name: 'Axis Bank', short: 'Axis' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', short: 'Kotak' },
  { id: 'pnb', name: 'Punjab National Bank', short: 'PNB' },
];

const translations = {
  en: {
    title: 'Connect Your Bank Account',
    subtitle: 'This is a simulation. No real bank connection will be made.',
    selectBank: 'Select your bank',
    secureNote: 'Your data is secure and encrypted',
    accountNumber: 'Account Number',
    accountPlaceholder: 'Enter last 4 digits',
    confirmDetails: 'Confirm Details',
    connected: 'Bank Connected Successfully',
    bankLabel: 'Bank',
    accountLabel: 'Account',
    continue: 'Continue',
    skip: 'Skip for now',
    connecting: 'Connecting...',
  },
  hi: {
    title: 'अपना बैंक खाता कनेक्ट करें',
    subtitle: 'यह एक सिमुलेशन है। कोई वास्तविक बैंक कनेक्शन नहीं बनाया जाएगा।',
    selectBank: 'अपना बैंक चुनें',
    secureNote: 'आपका डेटा सुरक्षित और एन्क्रिप्टेड है',
    accountNumber: 'खाता संख्या',
    accountPlaceholder: 'अंतिम 4 अंक दर्ज करें',
    confirmDetails: 'विवरण की पुष्टि करें',
    connected: 'बैंक सफलतापूर्वक कनेक्ट हुआ',
    bankLabel: 'बैंक',
    accountLabel: 'खाता',
    continue: 'जारी रखें',
    skip: 'अभी छोड़ें',
    connecting: 'कनेक्ट हो रहा है...',
  },
};

export function BankConnection({ language, onComplete, onSkip }: BankConnectionProps) {
  const t = translations[language];
  const [step, setStep] = useState<'select' | 'account' | 'success'>('select');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [accountLast4, setAccountLast4] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    setStep('account');
  };

  const handleConnect = () => {
    if (accountLast4.length === 4) {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setStep('success');
      }, 2000);
    }
  };

  const handleContinue = () => {
    const bank = banks.find((b) => b.id === selectedBank);
    if (bank) {
      onComplete({
        bankName: bank.name,
        accountLast4,
      });
    }
  };

  const selectedBankData = banks.find((b) => b.id === selectedBank);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="border border-blue-900/20 p-8 bg-black">
          <AnimatePresence mode="wait">
            {step === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-8">
                  <Building2 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
                  <p className="text-gray-400 text-sm">{t.subtitle}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl mb-4">{t.selectBank}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {banks.map((bank) => (
                      <motion.button
                        key={bank.id}
                        onClick={() => handleBankSelect(bank.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-6 border border-blue-900/20 hover:border-blue-400 hover:bg-blue-900/10 transition-all flex items-center justify-between group"
                      >
                        <div className="text-left">
                          <div className="font-bold text-lg">{bank.short}</div>
                          <div className="text-sm text-gray-400">{bank.name}</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>{t.secureNote}</span>
                </div>

                <button
                  onClick={onSkip}
                  className="w-full mt-6 px-6 py-3 border border-blue-900/20 hover:border-blue-400 hover:bg-blue-900/5 transition-all"
                >
                  {t.skip}
                </button>
              </motion.div>
            )}

            {step === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-8">
                  <Lock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold mb-2">{t.confirmDetails}</h1>
                  <p className="text-gray-400">{selectedBankData?.name}</p>
                </div>

                <div className="mb-8">
                  <label className="block text-sm text-gray-400 mb-2">
                    {t.accountNumber}
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={accountLast4}
                    onChange={(e) => setAccountLast4(e.target.value.replace(/\D/g, ''))}
                    placeholder={t.accountPlaceholder}
                    className="w-full bg-transparent border border-blue-900/20 px-4 py-3 focus:border-blue-400 focus:outline-none transition-colors text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Simulated • No real data required
                  </p>
                </div>

                <button
                  onClick={handleConnect}
                  disabled={accountLast4.length !== 4 || isConnecting}
                  className="w-full px-6 py-3 bg-blue-900 text-white hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isConnecting ? t.connecting : t.continue}
                </button>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <Check className="w-24 h-24 text-blue-400 mx-auto mb-6" />
                  </motion.div>
                  <h1 className="text-3xl font-bold mb-4">{t.connected}</h1>

                  <div className="border border-blue-900/20 p-6 mb-8 bg-blue-900/5">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-400">{t.bankLabel}:</span>
                      <span className="font-bold">{selectedBankData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.accountLabel}:</span>
                      <span className="font-mono">****{accountLast4}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all"
                  >
                    {t.continue}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
