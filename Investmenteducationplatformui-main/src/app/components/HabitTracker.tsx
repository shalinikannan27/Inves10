import { motion } from 'motion/react';
import { Section, Investment } from '../App';
import { Flame, Calendar, TrendingUp, Award } from 'lucide-react';

interface HabitTrackerProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  habitStreak: number;
  investments: Investment[];
}

const content = {
  en: {
    title: 'Habit Tracker',
    subtitle: 'Building consistency',
    currentStreak: 'Current Streak',
    days: 'days',
    totalInvestments: 'Total Investments',
    message: 'You\'re building a consistent investing habit.',
    encouragement: [
      'Great start! Keep the momentum going.',
      'Consistency is key to financial growth.',
      'Small steps lead to big results.',
      'You\'re on the right path!',
    ],
    milestones: 'Milestones',
    firstInvestment: 'First Investment',
    fiveInvestments: '5 Investments',
    tenInvestments: '10 Investments',
    monthStreak: '30-Day Streak',
    unlocked: 'Unlocked',
    locked: 'Locked',
    keepInvesting: 'Keep Investing',
  },
  hi: {
    title: 'आदत ट्रैकर',
    subtitle: 'निरंतरता बनाना',
    currentStreak: 'वर्तमान स्ट्रीक',
    days: 'दिन',
    totalInvestments: 'कुल निवेश',
    message: 'आप एक सुसंगत निवेश आदत बना रहे हैं।',
    encouragement: [
      'बढ़िया शुरुआत! गति बनाए रखें।',
      'वित्तीय विकास के लिए निरंतरता महत्वपूर्ण है।',
      'छोटे कदम बड़े परिणामों की ओर ले जाते हैं।',
      'आप सही रास्ते पर हैं!',
    ],
    milestones: 'उपलब्धियां',
    firstInvestment: 'पहला निवेश',
    fiveInvestments: '5 निवेश',
    tenInvestments: '10 निवेश',
    monthStreak: '30-दिन की स्ट्रीक',
    unlocked: 'अनलॉक',
    locked: 'लॉक',
    keepInvesting: 'निवेश जारी रखें',
  },
};

export function HabitTracker({ onNavigate, language, habitStreak, investments }: HabitTrackerProps) {
  const t = content[language];

  const milestones = [
    { id: 'first', label: t.firstInvestment, achieved: investments.length >= 1, icon: Flame },
    { id: 'five', label: t.fiveInvestments, achieved: investments.length >= 5, icon: TrendingUp },
    { id: 'ten', label: t.tenInvestments, achieved: investments.length >= 10, icon: Award },
    { id: 'streak', label: t.monthStreak, achieved: habitStreak >= 30, icon: Calendar },
  ];

  const encouragementMessage = habitStreak > 0
    ? t.encouragement[Math.min(habitStreak - 1, t.encouragement.length - 1)]
    : t.encouragement[0];

  return (
    <div className="min-h-screen px-4 pt-24 pb-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-blue-400 bg-gradient-to-br from-blue-900/10 to-transparent p-8 shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 transition-all"
          >
            <Flame className="w-12 h-12 text-blue-400 mb-4" />
            <div className="text-sm text-gray-400 mb-2">{t.currentStreak}</div>
            <div className="text-5xl font-bold text-blue-400 mb-2">{habitStreak}</div>
            <div className="text-gray-400">{t.days}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-blue-900/20 p-8 hover:border-blue-400/50 hover:bg-blue-900/5 transition-all shadow-lg shadow-blue-900/5"
          >
            <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
            <div className="text-sm text-gray-400 mb-2">{t.totalInvestments}</div>
            <div className="text-5xl font-bold text-blue-400 mb-2">{investments.length}</div>
            <div className="text-gray-400">{t.message}</div>
          </motion.div>
        </div>

        {/* Encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-blue-900/30 bg-blue-900/5 p-6 mb-12 text-center"
        >
          <p className="text-lg text-blue-400 font-bold">{encouragementMessage}</p>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border border-blue-900/20 p-8 shadow-xl shadow-blue-900/10"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Award className="w-6 h-6 text-blue-400" />
            {t.milestones}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-6 border transition-all text-center ${
                  milestone.achieved
                    ? 'border-blue-400 bg-blue-900/10 shadow-lg shadow-blue-900/20'
                    : 'border-blue-900/20 opacity-50'
                }`}
              >
                <milestone.icon
                  className={`w-10 h-10 mx-auto mb-3 ${
                    milestone.achieved ? 'text-blue-400' : 'text-gray-600'
                  }`}
                />
                <div className="text-sm font-bold mb-2">{milestone.label}</div>
                <div
                  className={`text-xs px-2 py-1 inline-block rounded ${
                    milestone.achieved
                      ? 'bg-blue-900/20 text-blue-400'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {milestone.achieved ? t.unlocked : t.locked}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => onNavigate('invest')}
            className="px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all font-bold shadow-xl hover:shadow-2xl hover:scale-105"
          >
            {t.keepInvesting}
          </button>
        </motion.div>
      </div>
    </div>
  );
}