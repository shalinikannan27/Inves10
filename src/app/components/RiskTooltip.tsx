import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Info } from 'lucide-react';

interface RiskTooltipProps {
  riskLevel: 'low' | 'medium' | 'high';
  language: 'en' | 'hi';
}

const content = {
  en: {
    low: 'Low risk means slower but more stable growth. Your money is safer with minimal chance of loss.',
    medium: 'Medium risk offers better returns but with some ups and downs. Suitable for moderate investors.',
    high: 'High risk can offer higher returns but with significant fluctuations. Only for experienced investors.',
  },
  hi: {
    low: 'कम जोखिम का मतलब धीमी लेकिन स्थिर वृद्धि। आपका पैसा सुरक्षित है।',
    medium: 'मध्यम जोखिम बेहतर रिटर्न देता है लेकिन कुछ उतार-चढ़ाव के साथ।',
    high: 'उच्च जोखिम अधिक रिटर्न दे सकता है लेकिन महत्वपूर्ण उतार-चढ़ाव के साथ।',
  },
};

export function RiskTooltip({ riskLevel, language }: RiskTooltipProps) {
  const t = content[language];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
            <Info className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-gray-900 border-blue-900/30 text-white">
          <p className="text-sm">{t[riskLevel]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}