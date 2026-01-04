import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from '../App';
import { CircleHelp, ChevronDown } from 'lucide-react';

interface FAQProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
}

const content = {
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions',
    faqs: [
      {
        question: 'Is ₹10 enough to start investing?',
        answer: 'Yes! Starting with ₹10 is perfect for beginners. The goal is to build the habit and learn without risking large amounts. As you gain confidence, you can gradually increase your investment amount.',
      },
      {
        question: 'How are returns calculated?',
        answer: 'We use simple interest calculations: (Principal × Rate × Time) / 100. All rates are clearly displayed, and calculations are transparent. For example, ₹10 at 6.5% for 6 months = ₹0.33 in returns.',
      },
      {
        question: 'Is this low risk?',
        answer: 'Yes, we focus on low-risk investment options like Fixed Deposits, Government-backed savings, and Liquid Funds. These options prioritize safety and stability over high returns, making them ideal for beginners.',
      },
      {
        question: 'Can I change my investment later?',
        answer: 'This platform is designed for educational purposes. In real scenarios, investment terms vary by type. Fixed deposits typically have lock-in periods, while liquid funds offer more flexibility.',
      },
      {
        question: 'Why does regular investing help?',
        answer: 'Regular investing builds a consistent habit and takes advantage of rupee cost averaging. Even small amounts add up over time. Consistency matters more than the amount when you\'re starting out.',
      },
      {
        question: 'What makes Inves10 different?',
        answer: 'Inves10 is built specifically for first-time investors. We use simple language, transparent calculations, and focus on low-risk options. There\'s no jargon, no pressure, and no hidden fees.',
      },
    ],
    cta: 'Start Investing',
  },
  hi: {
    title: 'अक्सर पूछे जाने वाले प्रश्न',
    subtitle: 'सामान्य प्रश्नों के उत्तर खोजें',
    faqs: [
      {
        question: 'क्या निवेश शुरू करने के लिए ₹10 पर्याप्त है?',
        answer: 'हां! शुरुआती लोगों के लिए ₹10 से शुरुआत करना एकदम सही है। लक्ष्य बड़ी मात्रा में जोखिम उठाए बिना आदत बनाना और सीखना है।',
      },
      {
        question: 'रिटर्न की गणना कैसे की जाती है?',
        answer: 'हम साधारण ब्याज गणना का उपयोग करते हैं: (मूलधन × दर × समय) / 100। सभी दरें स्पष्ट रूप से प्रदर्शित की जाती हैं।',
      },
      {
        question: 'क्या यह कम जोखिम है?',
        answer: 'हां, हम कम जोखिम वाले निवेश विकल्पों पर ध्यान केंद्रित करते हैं जैसे सावधि जमा, सरकार समर्थित बचत, और लिक्विड फंड।',
      },
      {
        question: 'क्या मैं बाद में अपना निवेश बदल सकता हूं?',
        answer: 'यह प्लेटफ़ॉर्म शैक्षिक उद्देश्यों के लिए डिज़ाइन किया गया है। वास्तविक परिदृश्यों में, निवेश की शर्तें प्रकार के अनुसार भिन्न होती हैं।',
      },
      {
        question: 'नियमित निवेश क्यों मदद करता है?',
        answer: 'नियमित निवेश एक सुसंगत आदत बनाता है। छोटी रकम भी समय के साथ जुड़ती है। शुरुआत में राशि से ज्यादा निरंतरता मायने रखती है।',
      },
      {
        question: 'Inves10 को क्या अलग बनाता है?',
        answer: 'Inves10 विशेष रूप से पहली बार निवेश करने वालों के लिए बनाया गया है। हम सरल भाषा, पारदर्शी गणना और कम जोखिम वाले विकल्पों का उपयोग करते हैं।',
      },
    ],
    cta: 'निवेश शुरू करें',
  },
};

export function FAQ({ onNavigate, language }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = content[language];

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <CircleHelp className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-12"
        >
          {t.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="border border-blue-900/20 hover:border-blue-900 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between group"
              >
                <span className="font-bold text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform text-blue-400 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-blue-900/20 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate('login')}
            className="px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all"
          >
            {t.cta}
          </button>
        </motion.div>
      </div>
    </div>
  );
}