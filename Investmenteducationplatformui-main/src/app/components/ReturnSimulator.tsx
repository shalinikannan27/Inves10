import { useState } from 'react';
import { motion } from 'motion/react';
import { Slider } from './ui/slider';
import { TrendingUp, Calendar } from 'lucide-react';

interface ReturnSimulatorProps {
  language: 'en' | 'hi';
  interestRate: number;
}

const content = {
  en: {
    title: 'Return Simulator',
    subtitle: 'Adjust to see how your returns change',
    amountLabel: 'Investment Amount',
    durationLabel: 'Duration (months)',
    projectedReturn: 'Projected Return',
    totalValue: 'Total Value',
    calculation: 'Using simple interest formula',
    disclaimer: 'Educational estimate only',
  },
  hi: {
    title: 'रिटर्न सिमुलेटर',
    subtitle: 'अपने रिटर्न में बदलाव देखें',
    amountLabel: 'निवेश राशि',
    durationLabel: 'अवधि (महीने)',
    projectedReturn: 'अनुमानित रिटर्न',
    totalValue: 'कुल मूल्य',
    calculation: 'साधारण ब्याज फॉर्मूले का उपयोग',
    disclaimer: 'केवल शैक्षिक अनुमान',
  },
};

export function ReturnSimulator({ language, interestRate }: ReturnSimulatorProps) {
  const t = content[language];
  const [amount, setAmount] = useState(100);
  const [duration, setDuration] = useState(6);

  const calculateReturns = () => {
    const years = duration / 12;
    const interest = (amount * interestRate * years) / 100;
    return {
      returns: parseFloat(interest.toFixed(2)),
      total: parseFloat((amount + interest).toFixed(2)),
    };
  };

  const { returns, total } = calculateReturns();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-blue-900/20 p-6 bg-black/40 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-bold">{t.title}</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">{t.subtitle}</p>

      {/* Amount Slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">{t.amountLabel}</span>
          <span className="text-sm font-bold text-blue-400">₹{amount}</span>
        </div>
        <Slider
          value={[amount]}
          onValueChange={(value) => setAmount(value[0])}
          min={10}
          max={1000}
          step={10}
          className="w-full"
        />
      </div>

      {/* Duration Slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">{t.durationLabel}</span>
          <span className="text-sm font-bold text-blue-400">{duration}</span>
        </div>
        <Slider
          value={[duration]}
          onValueChange={(value) => setDuration(value[0])}
          min={1}
          max={24}
          step={1}
          className="w-full"
        />
      </div>

      {/* Results */}
      <div className="border-t border-blue-900/20 pt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">{t.projectedReturn}</span>
          <motion.span
            key={returns}
            initial={{ scale: 1.2, color: '#60a5fa' }}
            animate={{ scale: 1, color: '#60a5fa' }}
            className="font-bold text-blue-400"
          >
            +₹{returns}
          </motion.span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-bold">{t.totalValue}</span>
          <motion.span
            key={total}
            initial={{ scale: 1.2, color: '#60a5fa' }}
            animate={{ scale: 1, color: '#60a5fa' }}
            className="font-bold text-blue-400"
          >
            ₹{total}
          </motion.span>
        </div>
        <div className="text-xs text-gray-500 italic pt-2">
          {t.calculation} • {t.disclaimer}
        </div>
      </div>
    </motion.div>
  );
}