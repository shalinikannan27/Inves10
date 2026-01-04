import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from '../App';
import { MessageCircle, Send, X, Bot } from 'lucide-react';

interface ChatbotProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  onClose?: () => void;
  isOpen?: boolean;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const content = {
  en: {
    title: 'Inves10 Assistant',
    placeholder: 'Ask a question...',
    send: 'Send',
    quickQuestions: [
      'How do I start?',
      'Is ₹10 enough?',
      'How are returns calculated?',
      'Is it safe?',
    ],
    responses: {
      greeting: 'Hello! I\'m here to help you get started with Inves10. How can I assist you today?',
      howToStart: 'Starting is easy! Just click "Start with ₹10" on the home page, sign in, and complete the quick onboarding form. You\'ll get a personalized recommendation based on your profile.',
      isEnough: 'Absolutely! ₹10 is perfect for beginners. The goal is to build the habit of investing without risking large amounts. As you gain confidence, you can gradually increase your investment.',
      returns: 'We use simple interest: (Amount × Rate × Time) / 100. For example, ₹10 at 6.5% for 6 months = ₹0.33 in returns. All calculations are transparent and explained clearly.',
      safety: 'Yes! We focus on low-risk options like Fixed Deposits, Government-backed savings, and Liquid Funds. These prioritize safety and stability over high returns.',
      default: 'That\'s a great question! For detailed information, please check our FAQ section or feel free to ask about: starting investing, minimum amounts, return calculations, or safety.',
    },
  },
  hi: {
    title: 'Inves10 सहायक',
    placeholder: 'एक सवाल पूछें...',
    send: 'भेजें',
    quickQuestions: [
      'मैं कैसे शुरू करूं?',
      'क्या ₹10 पर्याप्त है?',
      'रिटर्न की गणना कैसे होती है?',
      'क्या यह सुरक्षित है?',
    ],
    responses: {
      greeting: 'नमस्ते! मैं Inves10 के साथ शुरुआत करने में आपकी मदद के लिए यहां हूं। मैं आज आपकी कैसे सहायता कर सकता हूं?',
      howToStart: 'शुरू करना आसान है! होम पेज पर "₹10 से शुरू करें" पर क्लिक करें, साइन इन करें, और त्वरित ऑनबोर्डिंग फॉर्म पूरा करें।',
      isEnough: 'बिल्कुल! शुरुआती लोगों के लिए ₹10 एकदम सही है। लक्ष्य बड़ी रकम का जोखिम उठाए बिना निवेश की आदत बनाना है।',
      returns: 'हम साधारण ब्याज का उपयोग करते हैं: (राशि × दर × समय) / 100। उदाहरण के लिए, 6.5% पर 6 महीने के लिए ₹10 = ₹0.33 रिटर्न।',
      safety: 'हां! हम कम जोखिम वाले विकल्पों पर ध्यान केंद्रित करते हैं जैसे सावधि जमा, सरकार समर्थित बचत, और लिक्विड फंड।',
      default: 'यह एक अच्छा सवाल है! विस्तृत जानकारी के लिए, कृपया हमारे FAQ अनुभाग देखें।',
    },
  },
};

export function Chatbot({ onNavigate, language, onClose, isOpen }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: content[language].responses.greeting,
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');

  const t = content[language];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('start') || lowerMessage.includes('शुरू')) {
      return t.responses.howToStart;
    } else if (lowerMessage.includes('₹10') || lowerMessage.includes('enough') || lowerMessage.includes('पर्याप्त')) {
      return t.responses.isEnough;
    } else if (lowerMessage.includes('return') || lowerMessage.includes('calculate') || lowerMessage.includes('गणना')) {
      return t.responses.returns;
    } else if (lowerMessage.includes('safe') || lowerMessage.includes('risk') || lowerMessage.includes('सुरक्षित')) {
      return t.responses.safety;
    } else {
      return t.responses.default;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(input),
      isBot: true,
    };

    setMessages([...messages, userMessage, botResponse]);
    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] border border-blue-900 bg-black shadow-2xl flex flex-col h-[600px] max-h-[80vh]"
        >
          {/* Header */}
          <div className="border-b border-blue-900/20 p-4 flex items-center justify-between bg-blue-900/20">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-blue-400" />
              <h3 className="font-bold">{t.title}</h3>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-blue-900/10 transition-all"
                aria-label="Close chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 ${
                      message.isBot
                        ? 'bg-blue-900/10 border border-blue-900/20'
                        : 'bg-blue-900 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Quick Questions */}
          <div className="border-t border-blue-900/20 p-3">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {t.quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-1 text-sm border border-blue-900/20 hover:border-blue-900 hover:bg-blue-900/5 transition-all whitespace-nowrap"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-blue-900/20 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent border border-blue-900/20 px-4 py-2 focus:border-blue-900 focus:outline-none transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-4 py-2 bg-blue-900 text-white hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={t.send}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}