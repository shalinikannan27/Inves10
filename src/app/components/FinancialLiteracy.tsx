import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section, LiteracyProgress } from '../App';
import { Coins, Shield, TrendingUp, Clock, Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { ProgressRing } from './ProgressRing';

interface FinancialLiteracyProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  literacyProgress: LiteracyProgress;
  onUpdateProgress: (topicId: string, completed: boolean, quizAnswered?: boolean) => void;
}

const content = {
  en: {
    title: 'Financial Literacy',
    subtitle: 'Learn the basics before you start',
    cards: [
      {
        id: 'investing-vs-saving',
        icon: Coins,
        title: 'Investing vs Saving',
        description: 'Saving is keeping money safe. Investing is putting money to work so it can grow over time. Both are important, but investing helps your money grow faster.',
        quiz: {
          question: 'What is the main difference between saving and investing?',
          options: [
            'Investing grows your money, saving keeps it safe',
            'They are exactly the same',
            'Saving is riskier than investing',
          ],
          correctIndex: 0,
        },
      },
      {
        id: 'low-risk',
        icon: Shield,
        title: 'What "low risk" means',
        description: 'Low risk means your money is safer and more predictable. You might not earn huge returns, but you\'re unlikely to lose money. Perfect for beginners.',
        quiz: {
          question: 'Low risk investments mean:',
          options: [
            'Very high returns',
            'Safer with stable growth',
            'Complete loss of money',
          ],
          correctIndex: 1,
        },
      },
      {
        id: 'starting-small',
        icon: TrendingUp,
        title: 'Why starting small matters',
        description: 'Starting with ₹10 helps you learn without fear. You build confidence and understanding. As you learn, you can invest more. The habit matters more than the amount.',
        quiz: {
          question: 'Why is starting with small amounts good?',
          options: [
            'It\'s not good, you need large amounts',
            'It helps you learn without fear',
            'Small amounts never grow',
          ],
          correctIndex: 1,
        },
      },
      {
        id: 'returns-over-time',
        icon: Clock,
        title: 'How returns grow over time',
        description: 'Returns are the extra money you earn from investing. Even small amounts grow when given time. Consistent investing, even ₹10 regularly, adds up over months and years.',
        quiz: {
          question: 'What matters most for growth?',
          options: [
            'Investing a lot once',
            'Consistent investing over time',
            'Waiting for the perfect moment',
          ],
          correctIndex: 1,
        },
      },
    ],
    cta: 'Start Your Journey',
    applyNow: 'Apply This Now',
    takeQuiz: 'Test Your Knowledge',
    correct: 'Correct!',
    incorrect: 'Not quite right',
    tryAgain: 'Try Again',
    completed: 'Completed',
    progress: 'Your Progress',
  },
  hi: {
    title: 'वित्तीय साक्षरता',
    subtitle: 'शुरू करने से पहले बुनियादी बातें सीखें',
    cards: [
      {
        id: 'investing-vs-saving',
        icon: Coins,
        title: 'निवेश बनाम बचत',
        description: 'बचत पैसे को सुरक्षित रखना है। निवेश पैसे को काम पर लगाना है ताकि वह समय के साथ बढ़े। दोनों महत्वपूर्ण हैं।',
        quiz: {
          question: 'बचत और निवेश में मुख्य अंतर क्या है?',
          options: [
            'निवेश आपके पैसे को बढ़ाता है, बचत इसे सुरक्षित रखती है',
            'वे बिल्कुल एक जैसे हैं',
            'बचत निवेश से अधिक जोखिम भरी है',
          ],
          correctIndex: 0,
        },
      },
      {
        id: 'low-risk',
        icon: Shield,
        title: '"कम जोखिम" का मतलब',
        description: 'कम जोखिम का मतलब है आपका पैसा सुरक्षित है। बड़ा मुनाफा नहीं मिलता, लेकिन नुकसान की संभावना कम है।',
        quiz: {
          question: 'कम जोखिम वाले निवेश का मतलब है:',
          options: [
            'बहुत अधिक रिटर्न',
            'स्थिर वृद्धि के साथ सुरक्षित',
            'पैसे की पूरी हानि',
          ],
          correctIndex: 1,
        },
      },
      {
        id: 'starting-small',
        icon: TrendingUp,
        title: 'छोटी शुरुआत क्यों ज़रूरी है',
        description: '₹10 से शुरू करने से आप बिना डर के सीखते हैं। विश्वास बढ़ता है। जैसे-जैसे सीखते हैं, ज़्यादा निवेश कर सकते हैं।',
        quiz: {
          question: 'छोटी राशि से शुरू करना क्यों अच्छा है?',
          options: [
            'यह अच्छा नहीं है, आपको बड़ी राशि की आवश्यकता है',
            'यह आपको बिना डर के सीखने में मदद करता है',
            'छोटी राशि कभी नहीं बढ़ती',
          ],
          correctIndex: 1,
        },
      },
      {
        id: 'returns-over-time',
        icon: Clock,
        title: 'समय के साथ कैसे बढ़ता है',
        description: 'रिटर्न वह अतिरिक्त पैसा है जो आप निवेश से कमाते हैं। छोटी रकम भी समय के साथ बढ़ती है।',
        quiz: {
          question: 'विकास के लिए सबसे महत्वपूर्ण क्या है?',
          options: [
            'एक बार बहुत निवेश करना',
            'समय के साथ लगातार निवेश',
            'सही समय की प्रतीक्षा',
          ],
          correctIndex: 1,
        },
      },
    ],
    cta: 'अपनी यात्रा शुरू करें',
    applyNow: 'अभी लागू करें',
    takeQuiz: 'अपना ज्ञान परखें',
    correct: 'सही!',
    incorrect: 'बिल्कुल सही नहीं',
    tryAgain: 'फिर कोशिश करें',
    completed: 'पूर्ण',
    progress: 'आपकी प्रगति',
  },
};

export function FinancialLiteracy({ 
  onNavigate, 
  language,
  literacyProgress,
  onUpdateProgress,
}: FinancialLiteracyProps) {
  const t = content[language];
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleQuizStart = (topicId: string) => {
    setActiveQuiz(topicId);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (index: number, topicId: string, correctIndex: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    const isCorrect = index === correctIndex;
    if (isCorrect) {
      setTimeout(() => {
        onUpdateProgress(topicId, true, true);
        setActiveQuiz(null);
      }, 1500);
    }
  };

  const handleMarkComplete = (topicId: string) => {
    onUpdateProgress(topicId, true, false);
  };

  // Calculate overall progress
  const totalTopics = t.cards.length;
  const completedTopics = t.cards.filter(card => 
    literacyProgress[card.id]?.completed
  ).length;
  const overallProgress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  return (
    <div className="min-h-screen px-4 pt-24 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400 mb-6">{t.subtitle}</p>
          
          {/* Overall Progress */}
          <div className="inline-flex items-center gap-4 px-6 py-3 border border-blue-900/30 bg-blue-900/5">
            <ProgressRing progress={overallProgress} size={50} showPercentage />
            <div className="text-left">
              <div className="text-sm text-gray-400">{t.progress}</div>
              <div className="font-bold">{completedTopics} / {totalTopics} {t.completed}</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {t.cards.map((card, index) => {
            const isCompleted = literacyProgress[card.id]?.completed || false;
            const hasQuiz = literacyProgress[card.id]?.quizAnswered || false;
            const topicProgress = isCompleted ? 100 : 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border p-8 transition-all group shadow-lg hover:shadow-2xl
                  ${isCompleted 
                    ? 'border-blue-900/50 bg-blue-900/5 shadow-blue-900/10' 
                    : 'border-blue-900/20 hover:border-blue-900/50 hover:bg-blue-900/5 shadow-blue-900/5'
                  }`}
              >
                {/* Header with Progress Ring */}
                <div className="flex items-start justify-between mb-4">
                  <card.icon className={`w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform
                    ${isCompleted ? 'opacity-100' : 'opacity-80'}`} 
                  />
                  <ProgressRing progress={topicProgress} size={45} />
                </div>

                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{card.description}</p>

                {/* Quiz Section */}
                <AnimatePresence mode="wait">
                  {activeQuiz === card.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-blue-900/20 pt-4 mt-4"
                    >
                      <p className="text-sm font-bold mb-3">{card.quiz.question}</p>
                      <div className="space-y-2">
                        {card.quiz.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            onClick={() => handleAnswerSelect(optIndex, card.id, card.quiz.correctIndex)}
                            disabled={showResult}
                            className={`w-full text-left p-3 border transition-all text-sm
                              ${showResult && optIndex === selectedAnswer
                                ? optIndex === card.quiz.correctIndex
                                  ? 'border-blue-900 bg-blue-900/20'
                                  : 'border-red-500 bg-red-500/20'
                                : 'border-blue-900/20 hover:border-blue-900/50 hover:bg-blue-900/5'
                              }
                              ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
                            `}
                          >
                            <span className="flex items-center gap-2">
                              {showResult && optIndex === selectedAnswer && (
                                optIndex === card.quiz.correctIndex ? (
                                  <Check className="w-4 h-4 text-blue-400" />
                                ) : (
                                  <X className="w-4 h-4 text-red-500" />
                                )
                              )}
                              {option}
                            </span>
                          </button>
                        ))}
                      </div>
                      {showResult && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`mt-3 p-2 text-center text-sm font-bold
                            ${selectedAnswer === card.quiz.correctIndex 
                              ? 'text-blue-400' 
                              : 'text-red-500'
                            }`}
                        >
                          {selectedAnswer === card.quiz.correctIndex ? t.correct : t.incorrect}
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex gap-2 mt-4">
                      {!hasQuiz && (
                        <button
                          onClick={() => handleQuizStart(card.id)}
                          className="flex-1 py-3 border border-blue-900/50 hover:bg-blue-900/10 transition-all font-bold text-sm group/btn"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            {t.takeQuiz}
                          </span>
                        </button>
                      )}
                      {!isCompleted && (
                        <button
                          onClick={() => handleMarkComplete(card.id)}
                          className="flex-1 py-3 bg-blue-900/20 border border-blue-900 hover:bg-blue-900/30 transition-all font-bold text-sm group/btn"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Check className="w-4 h-4" />
                            {t.completed}
                          </span>
                        </button>
                      )}
                      <button
                        onClick={() => onNavigate('onboarding')}
                        className="flex-1 py-3 bg-blue-900 text-white hover:bg-blue-800 transition-all font-bold text-sm group/btn"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {t.applyNow}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>
                  )}
                </AnimatePresence>

                {/* Completion Badge */}
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate('onboarding')}
            className="group px-8 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-all font-bold inline-flex items-center gap-3 shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 hover:scale-105"
          >
            {t.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}