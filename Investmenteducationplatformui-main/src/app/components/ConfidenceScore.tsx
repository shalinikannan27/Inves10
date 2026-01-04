import { motion } from 'motion/react';
import { TrendingUp, BookOpen, Target, Zap } from 'lucide-react';

interface ConfidenceScoreProps {
  language: 'en' | 'hi';
  literacyProgress: number; // 0-100
  investmentCount: number;
  habitStreak: number;
}

const content = {
  en: {
    title: 'Investment Confidence',
    subtitle: 'Your learning & consistency score',
    factors: {
      literacy: 'Literacy',
      investments: 'Investments',
      streak: 'Consistency',
    },
    level: {
      beginner: 'Beginner',
      learning: 'Learning',
      confident: 'Confident',
      expert: 'Expert',
    },
    message: {
      beginner: 'Keep learning! Every step counts.',
      learning: 'You\'re making progress!',
      confident: 'Great consistency!',
      expert: 'You\'re doing amazing!',
    },
  },
  hi: {
    title: 'निवेश आत्मविश्वास',
    subtitle: 'आपका सीखने और निरंतरता स्कोर',
    factors: {
      literacy: 'साक्षरता',
      investments: 'निवेश',
      streak: 'निरंतरता',
    },
    level: {
      beginner: 'शुरुआती',
      learning: 'सीख रहे हैं',
      confident: 'आत्मविश्वासी',
      expert: 'विशेषज्ञ',
    },
    message: {
      beginner: 'सीखते रहें! हर कदम मायने रखता है।',
      learning: 'आप प्रगति कर रहे हैं!',
      confident: 'बेहतरीन निरंतरता!',
      expert: 'आप शानदार कर रहे हैं!',
    },
  },
};

export function ConfidenceScore({ 
  language, 
  literacyProgress, 
  investmentCount, 
  habitStreak 
}: ConfidenceScoreProps) {
  const t = content[language];

  // Calculate confidence score (0-100)
  const literacyScore = literacyProgress * 0.4; // 40% weight
  const investmentScore = Math.min(investmentCount * 10, 40); // 40% weight, max at 4 investments
  const streakScore = Math.min(habitStreak * 4, 20); // 20% weight, max at 5 streak
  
  const totalScore = Math.round(literacyScore + investmentScore + streakScore);

  // Determine level
  let level: 'beginner' | 'learning' | 'confident' | 'expert';
  if (totalScore < 25) level = 'beginner';
  else if (totalScore < 50) level = 'learning';
  else if (totalScore < 75) level = 'confident';
  else level = 'expert';

  const factors = [
    { icon: BookOpen, label: t.factors.literacy, value: Math.round(literacyProgress) },
    { icon: Target, label: t.factors.investments, value: investmentCount },
    { icon: Zap, label: t.factors.streak, value: habitStreak },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-blue-900/20 p-6 bg-gradient-to-br from-blue-900/5 to-transparent"
    >
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-blue-400" />
        <div>
          <h3 className="text-xl font-bold">{t.title}</h3>
          <p className="text-xs text-gray-400">{t.subtitle}</p>
        </div>
      </div>

      {/* Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-blue-900/20"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - totalScore / 100)}`}
              strokeLinecap="round"
              className="text-blue-400"
              initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - totalScore / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-blue-400">{totalScore}</div>
            <div className="text-xs text-gray-400">{t.level[level]}</div>
          </div>
        </div>
      </div>

      {/* Factors */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {factors.map((factor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="text-center p-3 border border-blue-900/20 bg-black/20"
          >
            <factor.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-400">{factor.value}</div>
            <div className="text-xs text-gray-400">{factor.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Message */}
      <div className="text-center text-sm text-gray-400 border-t border-blue-900/20 pt-4">
        {t.message[level]}
      </div>
    </motion.div>
  );
}