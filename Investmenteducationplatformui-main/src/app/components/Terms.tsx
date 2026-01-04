import { motion } from 'motion/react';
import { Section } from '../App';
import { FileText } from 'lucide-react';

interface TermsProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
}

const content = {
  en: {
    title: 'Terms & Conditions',
    subtitle: 'Please read carefully',
    sections: [
      {
        title: '1. Nature of Service',
        content: 'Inves10 is an educational platform designed to help beginners understand investment concepts. All investment recommendations are based on simple rule-based calculations using predetermined assumptions.',
      },
      {
        title: '2. Investment Calculations',
        content: 'All projected returns are calculated using simple interest formulas with fixed rates. These are educational projections and do not represent actual investment guarantees. Actual returns may vary based on market conditions.',
      },
      {
        title: '3. Risk Disclosure',
        content: 'While we focus on low-risk investment options, all investments carry some level of risk. Past performance and projected returns do not guarantee future results. Users should understand the risks before investing.',
      },
      {
        title: '4. No Financial Advice',
        content: 'The information provided on this platform is for educational purposes only and should not be considered as financial advice. Users should consult with qualified financial advisors before making investment decisions.',
      },
      {
        title: '5. User Responsibility',
        content: 'Users must be 18 years or older to use this service. Users are responsible for verifying all information and understanding the terms of any investment they make.',
      },
      {
        title: '6. Data Usage',
        content: 'User data is stored locally for educational purposes. We do not share personal information with third parties. Users can delete their data at any time.',
      },
      {
        title: '7. Platform Limitations',
        content: 'This is a frontend demonstration platform. No actual financial transactions are processed. The wallet balance and investments shown are simulated for educational purposes.',
      },
      {
        title: '8. Modifications',
        content: 'We reserve the right to modify these terms at any time. Users will be notified of any significant changes to the terms and conditions.',
      },
    ],
    acceptance: 'By using Inves10, you acknowledge that you have read, understood, and agree to these terms and conditions.',
    backButton: 'Back to Home',
  },
  hi: {
    title: 'नियम और शर्तें',
    subtitle: 'कृपया ध्यान से पढ़ें',
    sections: [
      {
        title: '1. सेवा की प्रकृति',
        content: 'Inves10 एक शैक्षिक मंच है जो शुरुआती लोगों को निवेश की अवधारणाओं को समझने में मदद करता है। सभी निवेश सिफारिशें पूर्व निर्धारित मान्यताओं का उपयोग करके सरल नियम-आधारित गणनाओं पर आधारित हैं।',
      },
      {
        title: '2. निवेश गणना',
        content: 'सभी अनुमानित रिटर्न निश्चित दरों के साथ साधारण ब्याज सूत्रों का उपयोग करके गणना की जाती है। ये शैक्षिक अनुमान हैं और वास्तविक निवेश गारंटी का प्रतिनिधित्व नहीं करते हैं।',
      },
      {
        title: '3. जोखिम प्रकटीकरण',
        content: 'जबकि हम कम जोखिम वाले निवेश विकल्पों पर ध्यान केंद्रित करते हैं, सभी निवेशों में कुछ स्तर का जोखिम होता है। उपयोगकर्ताओं को निवेश करने से पहले जोखिमों को समझना चाहिए।',
      },
      {
        title: '4. कोई वित्तीय सलाह नहीं',
        content: 'इस प्लेटफ़ॉर्म पर प्रदान की गई जानकारी केवल शैक्षिक उद्देश्यों के लिए है और इसे वित्तीय सलाह नहीं माना जाना चाहिए।',
      },
      {
        title: '5. उपयोगकर्ता जिम्मेदारी',
        content: 'इस सेवा का उपयोग करने के लिए उपयोगकर्ताओं की आयु 18 वर्ष या उससे अधिक होनी चाहिए।',
      },
      {
        title: '6. डेटा उपयोग',
        content: 'उपयोगकर्ता डेटा शैक्षिक उद्देश्यों के लिए स्थानीय रूप से संग्रहीत किया जाता है। हम तीसरे पक्ष के साथ व्यक्तिगत जानकारी साझा नहीं करते हैं।',
      },
      {
        title: '7. प्लेटफ़ॉर्म सीमाएं',
        content: 'यह एक फ्रंटएंड डेमो प्लेटफ़ॉर्म है। कोई वास्तविक वित्तीय लेनदेन संसाधित नहीं किया जाता है।',
      },
      {
        title: '8. संशोधन',
        content: 'हम किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं।',
      },
    ],
    acceptance: 'Inves10 का उपयोग करके, आप स्वीकार करते हैं कि आपने इन नियमों और शर्तों को पढ़ा, समझा और सहमत हैं।',
    backButton: 'होम पर वापस जाएं',
  },
};

export function Terms({ onNavigate, language }: TermsProps) {
  const t = content[language];

  return (
    <div className="min-h-screen px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <FileText className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-blue-900/20 p-8 mb-8"
        >
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="border-l-2 border-blue-900/20 pl-6"
              >
                <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                <p className="text-gray-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-8 border-t border-blue-900/20"
          >
            <p className="text-center text-gray-300 italic">{t.acceptance}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate('landing')}
            className="px-8 py-4 border border-blue-900 hover:bg-blue-900/10 transition-all"
          >
            {t.backButton}
          </button>
        </motion.div>
      </div>
    </div>
  );
}