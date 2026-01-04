import { motion } from 'motion/react';
import { Building2, Shield, TrendingUp, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';

interface EntitySelectionProps {
  language: 'en' | 'hi';
  onSelect: (entityName: string) => void;
  onBack: () => void;
}

const content = {
  en: {
    title: 'Choose Investment Entity',
    subtitle: 'Select where you want to invest',
    search: 'Search entities...',
    back: 'Back',
  },
  hi: {
    title: 'निवेश संस्था चुनें',
    subtitle: 'चुनें कि आप कहां निवेश करना चाहते हैं',
    search: 'संस्थाएं खोजें...',
    back: 'वापस',
  },
};

const entities = [
  {
    name: 'National Growth & Stability Fund',
    type: 'Government-backed',
    icon: Shield,
    rating: 4.8,
  },
  {
    name: 'Bharat Public Savings Authority',
    type: 'Public Sector',
    icon: Building2,
    rating: 4.7,
  },
  {
    name: 'Indian Long-Term Capital Trust',
    type: 'Public Trust',
    icon: Shield,
    rating: 4.6,
  },
  {
    name: 'Central Secure Investment Board',
    type: 'Regulatory Body',
    icon: Shield,
    rating: 4.9,
  },
  {
    name: 'Unified Citizen Wealth Fund',
    type: 'Public Fund',
    icon: Building2,
    rating: 4.5,
  },
  {
    name: 'Public Infrastructure Growth Fund',
    type: 'Infrastructure Fund',
    icon: TrendingUp,
    rating: 4.4,
  },
  {
    name: 'BlueHarbor Wealth Partners',
    type: 'Asset Management',
    icon: Building2,
    rating: 4.6,
  },
  {
    name: 'Navia Capital Management',
    type: 'Asset Management',
    icon: Building2,
    rating: 4.7,
  },
  {
    name: 'Aurora Yield Fund',
    type: 'Investment Fund',
    icon: TrendingUp,
    rating: 4.5,
  },
  {
    name: 'Vertex Secure Investments',
    type: 'Securities Firm',
    icon: Shield,
    rating: 4.8,
  },
  {
    name: 'TrueNest Financial Services',
    type: 'Financial Services',
    icon: Building2,
    rating: 4.6,
  },
  {
    name: 'Pinnacle MicroCap Fund',
    type: 'Investment Fund',
    icon: TrendingUp,
    rating: 4.3,
  },
];

export function EntitySelection({ language, onSelect, onBack }: EntitySelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const t = content[language];

  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entity.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 pt-24 pb-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search}
              className="w-full bg-black border border-blue-900/20 pl-12 pr-4 py-3 focus:border-blue-400 focus:outline-none transition-all"
            />
          </div>
        </motion.div>

        {/* Entities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          {filteredEntities.map((entity, index) => {
            const Icon = entity.icon;
            return (
              <motion.button
                key={entity.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(entity.name)}
                className="border border-blue-900/20 p-5 hover:border-blue-400 hover:bg-blue-900/5 transition-all group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-blue-900/20 bg-blue-900/10 group-hover:bg-blue-900/20 transition-all shrink-0">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold mb-1 text-gray-200 leading-tight">
                      {entity.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{entity.type}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-400">{entity.rating}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {filteredEntities.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            {language === 'en' ? 'No entities found' : 'कोई संस्था नहीं मिली'}
          </div>
        )}

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
