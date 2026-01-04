import { motion } from 'motion/react';
import { CheckCircle2, Calendar } from 'lucide-react';

interface TimelineViewProps {
  language: 'en' | 'hi';
  principal: number;
  interestRate: number;
  duration: number; // in months
}

const content = {
  en: {
    title: 'Growth Timeline',
    today: 'Today',
    month: 'Month',
    value: 'Value',
  },
  hi: {
    title: 'वृद्धि समयरेखा',
    today: 'आज',
    month: 'महीना',
    value: 'मूल्य',
  },
};

export function TimelineView({ language, principal, interestRate, duration }: TimelineViewProps) {
  const t = content[language];

  // Generate timeline points
  const timelinePoints = [0, 1, 3, 6].filter(month => month <= duration);
  
  const calculateValue = (months: number) => {
    const years = months / 12;
    const interest = (principal * interestRate * years) / 100;
    return principal + interest;
  };

  return (
    <div className="border border-blue-900/20 p-6 bg-black/20">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        {t.title}
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-blue-900/20" />
        
        {/* Timeline points */}
        <div className="relative flex justify-between">
          {timelinePoints.map((month, index) => {
            const value = calculateValue(month);
            const isToday = month === 0;
            
            return (
              <motion.div
                key={month}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center"
              >
                {/* Point */}
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-3 ${
                  isToday 
                    ? 'bg-blue-400 border-blue-400' 
                    : 'bg-black border-blue-400/50'
                }`}>
                  {isToday ? (
                    <CheckCircle2 className="w-5 h-5 text-black" />
                  ) : (
                    <span className="text-xs font-bold text-blue-400">{month}</span>
                  )}
                </div>
                
                {/* Label */}
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">
                    {isToday ? t.today : `${month} ${t.month}`}
                  </div>
                  <motion.div
                    key={value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-sm font-bold text-blue-400"
                  >
                    ₹{value.toFixed(2)}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500 text-center">
        {language === 'en' 
          ? 'Visual representation of gradual growth over time'
          : 'समय के साथ धीरे-धीरे वृद्धि का दृश्य प्रतिनिधित्व'}
      </div>
    </div>
  );
}