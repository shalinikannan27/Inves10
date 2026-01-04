import { motion } from 'motion/react';
import { Trophy, Target, Flame, Star, Award, Gift } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'target' | 'flame' | 'star' | 'award' | 'gift';
  achieved: boolean;
  progress?: number;
  maxProgress?: number;
}

interface RewardsProps {
  language: 'en' | 'hi';
  milestones: Milestone[];
  totalPoints: number;
}

const translations = {
  en: {
    title: 'Rewards & Milestones',
    subtitle: 'Track your investment journey',
    points: 'Points',
    achieved: 'Achieved',
    inProgress: 'In Progress',
    locked: 'Locked',
    allMilestones: 'All Milestones',
    noRewards: 'Start investing to earn rewards!',
  },
  hi: {
    title: 'पुरस्कार और मील के पत्थर',
    subtitle: 'अपनी निवेश यात्रा को ट्रैक करें',
    points: 'अंक',
    achieved: 'प्राप्त',
    inProgress: 'प्रगति में',
    locked: 'लॉक',
    allMilestones: 'सभी मील के पत्थर',
    noRewards: 'पुरस्कार अर्जित करने के लिए निवेश शुरू करें!',
  },
};

const iconComponents = {
  trophy: Trophy,
  target: Target,
  flame: Flame,
  star: Star,
  award: Award,
  gift: Gift,
};

export function Rewards({ language, milestones, totalPoints }: RewardsProps) {
  const t = translations[language];

  const achievedCount = milestones.filter((m) => m.achieved).length;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>

        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-blue-900/20 p-8 mb-8 bg-gradient-to-br from-blue-900/10 to-transparent"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm text-gray-400 mb-2">{t.points}</div>
              <div className="text-5xl font-bold text-blue-400">{totalPoints}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-2">{t.allMilestones}</div>
              <div className="text-3xl font-bold">
                {achievedCount} <span className="text-gray-600">/ {milestones.length}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Milestones Grid */}
        {milestones.length === 0 ? (
          <div className="border border-blue-900/20 p-12 text-center">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">{t.noRewards}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((milestone, index) => {
              const IconComponent = iconComponents[milestone.icon];
              const hasProgress =
                milestone.progress !== undefined && milestone.maxProgress !== undefined;
              const progressPercent = hasProgress
                ? (milestone.progress! / milestone.maxProgress!) * 100
                : 0;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border p-6 transition-all ${
                    milestone.achieved
                      ? 'border-blue-400 bg-blue-900/10'
                      : 'border-blue-900/20 hover:border-blue-900/40'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 ${
                        milestone.achieved
                          ? 'bg-blue-400 text-black'
                          : 'bg-blue-900/20 text-blue-400'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{milestone.title}</h3>
                      <p className="text-sm text-gray-400">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {hasProgress && !milestone.achieved && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{t.inProgress}</span>
                        <span>
                          {milestone.progress} / {milestone.maxProgress}
                        </span>
                      </div>
                      <div className="h-2 bg-blue-900/20 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-blue-400"
                        />
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    {milestone.achieved ? (
                      <span className="text-xs px-3 py-1 bg-blue-400 text-black font-bold">
                        {t.achieved}
                      </span>
                    ) : hasProgress ? (
                      <span className="text-xs px-3 py-1 border border-blue-900/40 text-blue-400">
                        {t.inProgress}
                      </span>
                    ) : (
                      <span className="text-xs px-3 py-1 border border-blue-900/20 text-gray-600">
                        {t.locked}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Helper function to generate default milestones
export function getDefaultMilestones(
  language: 'en' | 'hi',
  investmentCount: number,
  habitStreak: number,
  totalInvested: number
): Milestone[] {
  const milestones: Record<'en' | 'hi', Omit<Milestone, 'achieved' | 'progress' | 'maxProgress'>[]> = {
    en: [
      {
        id: 'first-investment',
        title: 'First Step',
        description: 'Make your first investment',
        icon: 'star',
      },
      {
        id: 'streak-7',
        title: '7 Day Streak',
        description: 'Check your portfolio for 7 days',
        icon: 'flame',
      },
      {
        id: 'invest-5',
        title: 'Regular Investor',
        description: 'Complete 5 investments',
        icon: 'target',
      },
      {
        id: 'invest-1000',
        title: 'Thousand Club',
        description: 'Invest a total of ₹1000',
        icon: 'trophy',
      },
      {
        id: 'streak-30',
        title: '30 Day Champion',
        description: 'Maintain a 30-day habit streak',
        icon: 'award',
      },
      {
        id: 'invest-10',
        title: 'Committed Investor',
        description: 'Complete 10 investments',
        icon: 'gift',
      },
    ],
    hi: [
      {
        id: 'first-investment',
        title: 'पहला कदम',
        description: 'अपना पहला निवेश करें',
        icon: 'star',
      },
      {
        id: 'streak-7',
        title: '7 दिन की लकीर',
        description: '7 दिनों तक अपने पोर्टफोलियो की जांच करें',
        icon: 'flame',
      },
      {
        id: 'invest-5',
        title: 'नियमित निवेशक',
        description: '5 निवेश पूरे करें',
        icon: 'target',
      },
      {
        id: 'invest-1000',
        title: 'हजार क्लब',
        description: 'कुल ₹1000 का निवेश करें',
        icon: 'trophy',
      },
      {
        id: 'streak-30',
        title: '30 दिन का चैंपियन',
        description: '30 दिनों की आदत बनाए रखें',
        icon: 'award',
      },
      {
        id: 'invest-10',
        title: 'प्रतिबद्ध निवेशक',
        description: '10 निवेश पूरे करें',
        icon: 'gift',
      },
    ],
  };

  return milestones[language].map((m) => {
    let achieved = false;
    let progress: number | undefined;
    let maxProgress: number | undefined;

    switch (m.id) {
      case 'first-investment':
        achieved = investmentCount >= 1;
        progress = Math.min(investmentCount, 1);
        maxProgress = 1;
        break;
      case 'streak-7':
        achieved = habitStreak >= 7;
        progress = Math.min(habitStreak, 7);
        maxProgress = 7;
        break;
      case 'invest-5':
        achieved = investmentCount >= 5;
        progress = Math.min(investmentCount, 5);
        maxProgress = 5;
        break;
      case 'invest-1000':
        achieved = totalInvested >= 1000;
        progress = Math.min(totalInvested, 1000);
        maxProgress = 1000;
        break;
      case 'streak-30':
        achieved = habitStreak >= 30;
        progress = Math.min(habitStreak, 30);
        maxProgress = 30;
        break;
      case 'invest-10':
        achieved = investmentCount >= 10;
        progress = Math.min(investmentCount, 10);
        maxProgress = 10;
        break;
    }

    return {
      ...m,
      achieved,
      progress,
      maxProgress,
    };
  });
}
