import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section, UserProfile } from '../App';
import { CircleCheck, TrendingUp, Shield, Wallet, Sparkles, ArrowRight } from 'lucide-react';
import { ReturnSimulator } from './ReturnSimulator';
import { TimelineView } from './TimelineView';
import { RiskTooltip } from './RiskTooltip';
import { InvestmentEntities } from './InvestmentEntities';

interface RecommendationProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  userProfile: UserProfile | null;
  recommendation: {
    type: 'FD' | 'Liquid' | 'Govt';
    rate: number;
    reason: string;
  } | null;
  walletBalance: number;
}

const content = {
  en: {
    title: 'Investment Recommendations',
    subtitle: 'Choose what fits you best',
    recommendedTag: 'Recommended for you',
    exploreOthers: 'You can also explore other options',
    walletLabel: 'Available Balance',
    typeLabel: 'Investment Type',
    rateLabel: 'Expected Annual Rate',
    riskLabel: 'Risk Level',
    whyRecommended: 'Why this option?',
    features: {
      FD: [
        'Safe and government-backed',
        'Predictable returns',
        'Ideal for beginners',
        'No hidden charges',
      ],
      Liquid: [
        'Quick access to money',
        'Minimal risk',
        'Better than savings account',
        'Transparent calculations',
      ],
      Govt: [
        'Government guaranteed',
        'Tax benefits available',
        'Long-term growth',
        'Withdraw anytime',
      ],
    },
    cta: 'Invest with This',
    selectOption: 'Select This Option',
  },
  hi: {
    title: 'निवेश सिफारिशें',
    subtitle: 'चुनें जो आपके लिए सबसे अच्छा है',
    recommendedTag: 'आपके लिए अनुशंसित',
    exploreOthers: 'आप अन्य विकल्प भी देख सकते हैं',
    walletLabel: 'उपलब्ध राशि',
    typeLabel: 'निवेश प्रकार',
    rateLabel: 'अपेक्षित वार्षिक दर',
    riskLabel: 'जोखिम स्तर',
    whyRecommended: 'यह विकल्प क्यों?',
    features: {
      FD: [
        'सुरक्षित और सरकार समर्थित',
        'पूर्वानुमानित रिटर्न',
        'शुरुआती के लिए आदर्श',
        'कोई छिपा शुल्क नहीं',
      ],
      Liquid: [
        'पैसे की त्वरित पहुंच',
        'न्यूनतम जोखिम',
        'बचत खाते से बेहतर',
        'पारदर्शी गणना',
      ],
      Govt: [
        'सरकारी गारंटी',
        'कर लाभ उपलब्ध',
        'दीर्घकालिक वृद्धि',
        'कभी भी निकालें',
      ],
    },
    cta: 'इसके साथ निवेश करें',
    selectOption: 'यह विकल्प चुनें',
  },
};

const investmentOptions = [
  {
    type: 'FD' as const,
    rate: 6.5,
    risk: 'low' as const,
    description: {
      en: 'Steady, predictable returns. Perfect for first-time investors.',
      hi: 'स्थिर, पूर्वानुमानित रिटर्न। पहली बार निवेशकों के लिए उपयुक्त।',
    },
  },
  {
    type: 'Liquid' as const,
    rate: 4.5,
    risk: 'low' as const,
    description: {
      en: 'Easy access with stable growth. Great for emergency funds.',
      hi: 'स्थिर वृद्धि के साथ आसान पहुंच। आपातकालीन फंड के लिए बढ़िया।',
    },
  },
  {
    type: 'Govt' as const,
    rate: 7.5,
    risk: 'low' as const,
    description: {
      en: 'Government-backed security with good returns.',
      hi: 'अच्छे रिटर्न के साथ सरकार समर्थित सुरक्षा।',
    },
  },
];

const typeNames = {
  FD: { en: 'Fixed Deposit', hi: 'सावधि जमा' },
  Liquid: { en: 'Liquid Fund', hi: 'लिक्विड फंड' },
  Govt: { en: 'Government Savings', hi: 'सरकारी बचत' },
};

export function Recommendation({
  onNavigate,
  language,
  userProfile,
  recommendation,
  walletBalance,
}: RecommendationProps) {
  const t = content[language];
  const [selectedOption, setSelectedOption] = useState(recommendation?.type || 'FD');

  if (!recommendation) return null;

  const selectedData = investmentOptions.find(opt => opt.type === selectedOption) || investmentOptions[0];

  return (
    <div className="min-h-screen px-4 pt-24 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        {/* Wallet Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-blue-900/20 p-6 mb-8 flex items-center justify-between hover:border-blue-400/40 transition-all shadow-lg shadow-blue-900/5"
        >
          <div className="flex items-center gap-3">
            <Wallet className="w-6 h-6 text-blue-400" />
            <span className="text-gray-400">{t.walletLabel}</span>
          </div>
          <span className="text-2xl font-bold text-blue-400">₹{walletBalance}</span>
        </motion.div>

        {/* Investment Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {investmentOptions.map((option, index) => {
            const isRecommended = option.type === recommendation.type;
            const isSelected = option.type === selectedOption;

            return (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedOption(option.type)}
                className={`relative border p-6 cursor-pointer transition-all group
                  ${isSelected 
                    ? 'border-blue-400 bg-blue-900/10 shadow-xl shadow-blue-900/20 scale-105' 
                    : 'border-blue-900/20 hover:border-blue-400/50 hover:bg-blue-900/5 hover:scale-102'
                  }`}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-400 text-black text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                      {t.recommendedTag}
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-2">{typeNames[option.type][language]}</h3>
                  <p className="text-sm text-gray-400">{option.description[language]}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{t.rateLabel}</span>
                    <span className="font-bold text-blue-400">{option.rate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      {t.riskLabel}
                      <RiskTooltip riskLevel={option.risk} language={language} />
                    </span>
                    <span className="text-sm font-bold text-blue-400 capitalize">{option.risk}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute inset-0 border-2 border-blue-400 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOption}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Selected Option Details */}
            <div className="border border-blue-900/20 p-8 bg-black/40 backdrop-blur-sm shadow-2xl shadow-blue-900/10">
              <div className="flex items-start gap-4 mb-6">
                <CircleCheck className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    {typeNames[selectedOption][language]}
                  </h2>
                  {selectedOption === recommendation.type && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-400">{t.whyRecommended}</span>
                      <p className="text-gray-300 mt-1">{recommendation.reason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {t.features[selectedOption].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 p-3 border border-blue-900/20 bg-black/20"
                  >
                    <Shield className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Return Simulator & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReturnSimulator language={language} interestRate={selectedData.rate} />
              <TimelineView 
                language={language} 
                principal={100} 
                interestRate={selectedData.rate} 
                duration={6} 
              />
            </div>

            {/* Investment Entities */}
            <InvestmentEntities language={language} />

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <button
                onClick={() => onNavigate('invest')}
                className="group px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all font-bold inline-flex items-center gap-3 shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 hover:scale-105"
              >
                {t.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {selectedOption !== recommendation.type && (
                <p className="text-sm text-gray-400 mt-4">
                  {language === 'en' 
                    ? 'You can change your selection at any time' 
                    : 'आप किसी भी समय अपना चयन बदल सकते हैं'}
                </p>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-sm border-t border-blue-900/20 md:hidden z-20">
          <button
            onClick={() => onNavigate('invest')}
            className="w-full py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all shadow-lg"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </div>
  );
}