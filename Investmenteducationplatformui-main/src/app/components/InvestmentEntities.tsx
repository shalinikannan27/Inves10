import { motion } from 'motion/react';
import { Building2, Shield, TrendingUp } from 'lucide-react';

interface InvestmentEntitiesProps {
  language: 'en' | 'hi';
}

const content = {
  en: {
    title: 'Regulated Investment Entities',
    subtitle: 'Your investments are managed by these trusted organizations',
    description: 'All entities are subject to regulatory oversight and maintain strict compliance standards.',
  },
  hi: {
    title: 'विनियमित निवेश संस्थाएं',
    subtitle: 'आपके निवेश इन विश्वसनीय संगठनों द्वारा प्रबंधित हैं',
    description: 'सभी संस्थाएं नियामक निगरानी के अधीन हैं और कड़े अनुपालन मानकों का पालन करती हैं।',
  },
};

// Investment entities from the approved list
const entities = [
  {
    name: 'National Growth & Stability Fund',
    type: 'Government-backed',
    icon: Shield,
  },
  {
    name: 'Bharat Public Savings Authority',
    type: 'Public Sector',
    icon: Building2,
  },
  {
    name: 'Indian Long-Term Capital Trust',
    type: 'Public Trust',
    icon: Shield,
  },
  {
    name: 'Central Secure Investment Board',
    type: 'Regulatory Body',
    icon: Shield,
  },
  {
    name: 'Unified Citizen Wealth Fund',
    type: 'Public Fund',
    icon: Building2,
  },
  {
    name: 'Public Infrastructure Growth Fund',
    type: 'Infrastructure Fund',
    icon: TrendingUp,
  },
  {
    name: 'BlueHarbor Wealth Partners',
    type: 'Asset Management',
    icon: Building2,
  },
  {
    name: 'Navia Capital Management',
    type: 'Asset Management',
    icon: Building2,
  },
  {
    name: 'Aurora Yield Fund',
    type: 'Investment Fund',
    icon: TrendingUp,
  },
  {
    name: 'Vertex Secure Investments',
    type: 'Securities Firm',
    icon: Shield,
  },
  {
    name: 'TrueNest Financial Services',
    type: 'Financial Services',
    icon: Building2,
  },
  {
    name: 'Pinnacle MicroCap Fund',
    type: 'Investment Fund',
    icon: TrendingUp,
  },
];

export function InvestmentEntities({ language }: InvestmentEntitiesProps) {
  const t = content[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-blue-900/20 p-8 bg-black/20 mb-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-400 mb-1">{t.subtitle}</p>
        <p className="text-sm text-gray-500">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entities.map((entity, index) => {
          const Icon = entity.icon;
          
          return (
            <motion.div
              key={entity.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-blue-900/20 p-4 hover:border-blue-400/30 transition-all bg-black/40"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 border border-blue-900/20 bg-blue-900/10">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1 text-gray-200 leading-tight">
                    {entity.name}
                  </h3>
                  <p className="text-xs text-gray-500">{entity.type}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}