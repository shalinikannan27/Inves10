import { Target, Shield, TrendingUp, Clock } from 'lucide-react';

export type GoalType = 'emergency' | 'short-term' | 'learning' | 'retirement';

interface GoalTagProps {
  goal: GoalType;
  language: 'en' | 'hi';
  size?: 'sm' | 'md';
}

const goalConfig = {
  emergency: {
    label: { en: 'Emergency', hi: 'आपातकाल' },
    icon: Shield,
    color: 'text-blue-400 border-blue-900/30 bg-blue-900/10',
  },
  'short-term': {
    label: { en: 'Short-term', hi: 'अल्पकालिक' },
    icon: Clock,
    color: 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10',
  },
  learning: {
    label: { en: 'Learning', hi: 'सीखना' },
    icon: Target,
    color: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  },
  retirement: {
    label: { en: 'Retirement', hi: 'सेवानिवृत्ति' },
    icon: TrendingUp,
    color: 'text-purple-500 border-purple-500/30 bg-purple-500/10',
  },
};

export function GoalTag({ goal, language, size = 'md' }: GoalTagProps) {
  const config = goalConfig[goal];
  const Icon = config.icon;
  
  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2 py-1 gap-1' 
    : 'text-sm px-3 py-1.5 gap-2';

  return (
    <span className={`inline-flex items-center border rounded-full ${config.color} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span>{config.label[language]}</span>
    </span>
  );
}