import { Smartphone, Shield, TrendingUp, BookOpen, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { Section } from '../App';

interface FeaturesProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
}

const content = {
  en: {
    title: 'Why Inves10?',
    subtitle: 'Investing made simple for everyone',
    features: [
      {
        icon: DollarSign,
        title: 'Start with ₹10',
        description: 'Begin your investment journey with as little as ₹10. No minimum balance requirements.',
      },
      {
        icon: Shield,
        title: 'Low-risk guidance',
        description: 'We focus on beginner-friendly, low-risk investment options to help you learn safely.',
      },
      {
        icon: BookOpen,
        title: 'No financial jargon',
        description: 'Simple language, clear explanations. We break down complex concepts into easy steps.',
      },
      {
        icon: TrendingUp,
        title: 'Built for beginners',
        description: 'Designed specifically for first-time investors. Learn as you grow.',
      },
      {
        icon: Smartphone,
        title: 'Works on low-end phones',
        description: 'Lightweight and fast. Accessible to everyone, regardless of device.',
      },
    ],
    cta: 'Get Started',
  },
  hi: {
    title: 'Inves10 क्यों?',
    subtitle: 'सभी के लिए निवेश आसान बनाया गया',
    features: [
      {
        icon: DollarSign,
        title: '₹10 से शुरुआत',
        description: 'सिर्फ ₹10 से अपनी निवेश यात्रा शुरू करें। कोई न्यूनतम राशि नहीं।',
      },
      {
        icon: Shield,
        title: 'कम जोखिम मार्गदर्शन',
        description: 'हम शुरुआती के लिए कम जोखिम वाले विकल्पों पर ध्यान देते हैं।',
      },
      {
        icon: BookOpen,
        title: 'आसान भाषा',
        description: 'सरल भाषा, स्पष्ट व्याख्या। जटिल चीजों को आसान बनाते हैं।',
      },
      {
        icon: TrendingUp,
        title: 'शुरुआती के लिए बनाया',
        description: 'पहली बार निवेश करने वालों के लिए विशेष रूप से डिज़ाइन किया गया।',
      },
      {
        icon: Smartphone,
        title: 'सभी फोन पर काम करता है',
        description: 'हल्का और तेज़। हर डिवाइस पर उपलब्ध।',
      },
    ],
    cta: 'शुरू करें',
  },
};

export function Features({ onNavigate, language }: FeaturesProps) {
  const t = content[language];

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-blue-900/20 p-6 hover:border-blue-900 hover:bg-blue-900/5 transition-all group"
            >
              <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate('login')}
            className="px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all inline-block"
          >
            {t.cta}
          </button>
        </motion.div>
      </div>
    </div>
  );
}