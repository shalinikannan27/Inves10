import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Section } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
}

const content = {
  en: {
    tagline: 'Begin with less, Build with trust.',
    description: 'Inves10 helps first-time users start investing with as little as ₹10 in a simple, low-risk way.',
    explanation: 'We believe everyone deserves a chance to grow their money, no matter how small the starting amount. Learn the basics, invest without fear, and build your financial future one step at a time.',
    trustPoints: [
      { icon: Users, text: 'Beginner friendly' },
      { icon: Shield, text: 'Low-risk focused' },
      { icon: TrendingUp, text: 'Transparent calculations' },
    ],
    primaryCTA: 'Start with ₹10',
    secondaryCTA: 'Learn how it works',
  },
  hi: {
    tagline: 'कम से शुरू करें, भरोसे के साथ बढ़ें।',
    description: 'Inves10 पहली बार निवेश करने वालों को सिर्फ ₹10 से शुरुआत करने में मदद करता है।',
    explanation: 'हम मानते हैं कि हर किसी को अपने पैसे बढ़ाने का मौका मिलना चाहिए। बुनियादी बातें सीखें, बिना डर के निवेश करें।',
    trustPoints: [
      { icon: Users, text: 'शुरुआती के लिए आसान' },
      { icon: Shield, text: 'कम जोखिम' },
      { icon: TrendingUp, text: 'पारदर्शी गणना' },
    ],
    primaryCTA: '₹10 से शुरू करें',
    secondaryCTA: 'जानें कैसे काम करता है',
  },
};

export function Landing({ onNavigate, language }: LandingProps) {
  const t = content[language];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-12">
            {/* Main Heading */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold"
              >
                <span className="text-blue-400">Inves</span>
                <span className="text-white">10</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl text-blue-400/80 font-bold"
              >
                {t.tagline}
              </motion.p>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                {t.description}
              </p>
              
              <p className="text-base text-gray-400">
                {t.explanation}
              </p>
            </motion.div>

            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {t.trustPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="border border-blue-900/20 p-6 hover:border-blue-900 hover:bg-blue-900/5 transition-all group"
                >
                  <point.icon className="w-8 h-8 mx-auto lg:mx-0 mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-gray-300">{point.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <button
                onClick={() => onNavigate('login')}
                className="px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all group flex items-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">{t.primaryCTA}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-blue-800"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>

              <button
                onClick={() => onNavigate('literacy')}
                className="px-8 py-4 border border-blue-900 hover:bg-blue-900/10 transition-all group flex items-center gap-2"
              >
                {t.secondaryCTA}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden border border-blue-900/30 shadow-2xl shadow-blue-900/20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1633158829875-e5316a358c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZ3Jvd3RoJTIwZmluYW5jZXxlbnwxfHx8fDE3Njc0NDgyODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Investment Growth"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}