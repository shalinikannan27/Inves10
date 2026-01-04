import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Smartphone, Check, ArrowLeft, Copy } from 'lucide-react';

interface AddMoneyProps {
  language: 'en' | 'hi';
  onSuccess: (amount: number, method: string) => void;
  onBack: () => void;
}

const translations = {
  en: {
    title: 'Add Money to Wallet',
    subtitle: 'Secure and instant transfer',
    selectMethod: 'Select Payment Method',
    upi: 'UPI',
    debitCard: 'Debit / Credit Card',
    enterAmount: 'Enter Amount',
    amountPlaceholder: 'Enter amount (₹)',
    upiId: 'UPI ID',
    upiPlaceholder: 'yourname@bank',
    cardNumber: 'Card Number',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Expiry Date',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '123',
    proceed: 'Proceed to Pay',
    processing: 'Processing...',
    success: 'Money Added Successfully',
    amount: 'Amount',
    method: 'Method',
    refId: 'Reference ID',
    copyRef: 'Copy',
    done: 'Done',
    back: 'Back',
    quickAmounts: 'Quick Add',
  },
  hi: {
    title: 'वॉलेट में पैसे जोड़ें',
    subtitle: 'सुरक्षित और तुरंत स्थानांतरण',
    selectMethod: 'भुगतान विधि चुनें',
    upi: 'UPI',
    debitCard: 'डेबिट / क्रेडिट कार्ड',
    enterAmount: 'राशि दर्ज करें',
    amountPlaceholder: 'राशि दर्ज करें (₹)',
    upiId: 'UPI आईडी',
    upiPlaceholder: 'yourname@bank',
    cardNumber: 'कार्ड नंबर',
    cardPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'समाप्ति तिथि',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '123',
    proceed: 'भुगतान करें',
    processing: 'प्रोसेस हो रहा है...',
    success: 'पैसे सफलतापूर्वक जोड़े गए',
    amount: 'राशि',
    method: 'विधि',
    refId: 'संदर्भ आईडी',
    copyRef: 'कॉपी करें',
    done: 'हो गया',
    back: 'वापस',
    quickAmounts: 'त्वरित जोड़ें',
  },
};

const quickAmounts = [100, 500, 1000, 2000, 5000];

export function AddMoney({ language, onSuccess, onBack }: AddMoneyProps) {
  const t = translations[language];
  const [step, setStep] = useState<'method' | 'amount' | 'details' | 'success'>('method');
  const [method, setMethod] = useState<'upi' | 'card'>('upi');
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [referenceId] = useState(`INV10${Date.now().toString().slice(-10)}`);
  const [copied, setCopied] = useState(false);

  const handleMethodSelect = (selectedMethod: 'upi' | 'card') => {
    setMethod(selectedMethod);
    setStep('amount');
  };

  const handleAmountContinue = () => {
    if (parseInt(amount) >= 10) {
      setStep('details');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  const handleDone = () => {
    onSuccess(parseInt(amount), method === 'upi' ? 'UPI' : 'Card');
  };

  const canProceed = () => {
    if (method === 'upi') {
      return upiId.includes('@');
    }
    return cardNumber.length >= 16 && expiry.length === 5 && cvv.length === 3;
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="border border-blue-900/20 p-8 bg-black">
          <div className="mb-6">
            {step !== 'method' && step !== 'success' && (
              <button
                onClick={() => setStep(step === 'amount' ? 'method' : 'amount')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.back}
              </button>
            )}
            <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
            <p className="text-gray-400 text-sm">{t.subtitle}</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'method' && (
              <motion.div
                key="method"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-xl mb-6">{t.selectMethod}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    onClick={() => handleMethodSelect('upi')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-8 border border-blue-900/20 hover:border-blue-400 hover:bg-blue-900/10 transition-all"
                  >
                    <Smartphone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <div className="font-bold text-xl">{t.upi}</div>
                    <div className="text-sm text-gray-400 mt-2">Fast & Secure</div>
                  </motion.button>

                  <motion.button
                    onClick={() => handleMethodSelect('card')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-8 border border-blue-900/20 hover:border-blue-400 hover:bg-blue-900/10 transition-all"
                  >
                    <CreditCard className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <div className="font-bold text-xl">{t.debitCard}</div>
                    <div className="text-sm text-gray-400 mt-2">All major cards</div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'amount' && (
              <motion.div
                key="amount"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-xl mb-6">{t.enterAmount}</h2>

                <div className="mb-6">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="w-full bg-transparent border border-blue-900/20 pl-12 pr-4 py-4 focus:border-blue-400 focus:outline-none transition-colors text-3xl"
                      min="10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Minimum ₹10</p>
                </div>

                <div className="mb-8">
                  <div className="text-sm text-gray-400 mb-3">{t.quickAmounts}</div>
                  <div className="flex flex-wrap gap-2">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt.toString())}
                        className="px-4 py-2 border border-blue-900/20 hover:border-blue-400 hover:bg-blue-900/10 transition-all"
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAmountContinue}
                  disabled={parseInt(amount) < 10}
                  className="w-full px-6 py-3 bg-blue-900 text-white hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.proceed}
                </button>
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="border border-blue-900/20 p-4 mb-6 bg-blue-900/5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t.amount}</span>
                    <span className="text-2xl font-bold">₹{amount}</span>
                  </div>
                </div>

                {method === 'upi' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        {t.upiId}
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder={t.upiPlaceholder}
                        className="w-full bg-transparent border border-blue-900/20 px-4 py-3 focus:border-blue-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        {t.cardNumber}
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))
                        }
                        placeholder={t.cardPlaceholder}
                        className="w-full bg-transparent border border-blue-900/20 px-4 py-3 focus:border-blue-400 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          {t.expiryDate}
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) {
                              val = val.slice(0, 2) + '/' + val.slice(2, 4);
                            }
                            setExpiry(val.slice(0, 5));
                          }}
                          placeholder={t.expiryPlaceholder}
                          className="w-full bg-transparent border border-blue-900/20 px-4 py-3 focus:border-blue-400 focus:outline-none transition-colors font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          {t.cvv}
                        </label>
                        <input
                          type="password"
                          value={cvv}
                          onChange={(e) =>
                            setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))
                          }
                          placeholder={t.cvvPlaceholder}
                          className="w-full bg-transparent border border-blue-900/20 px-4 py-3 focus:border-blue-400 focus:outline-none transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={!canProceed() || isProcessing}
                  className="w-full mt-6 px-6 py-3 bg-blue-900 text-white hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? t.processing : `Pay ₹${amount}`}
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
                  <h2 className="text-3xl font-bold mb-2">{t.success}</h2>
                  <p className="text-gray-400 mb-8">Transaction completed successfully</p>

                  <div className="border border-blue-900/20 p-6 mb-8 space-y-4 bg-blue-900/5">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.amount}:</span>
                      <span className="font-bold text-2xl text-blue-400">₹{amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.method}:</span>
                      <span className="font-bold">{method === 'upi' ? 'UPI' : 'Card'}</span>
                    </div>
                    <div className="pt-4 border-t border-blue-900/20">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">{t.refId}:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{referenceId}</span>
                          <button
                            onClick={handleCopyRef}
                            className="p-1 hover:bg-blue-900/20 transition-colors"
                            title={t.copyRef}
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-blue-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleDone}
                    className="w-full px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all"
                  >
                    {t.done}
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