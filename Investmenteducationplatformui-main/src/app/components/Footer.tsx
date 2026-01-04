import { Section } from '../App';

interface FooterProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
}

const content = {
  en: {
    tagline: 'Begin with less, Build with trust.',
    about: 'Inves10 is a micro-investment platform designed to help first-time investors start their financial journey with as little as ₹10.',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    disclaimer: 'Disclaimer',
    disclaimerText: 'Inves10 is a prototype application for educational purposes. It does not provide real financial advice. Always consult with a certified financial advisor before making investment decisions.',
    links: {
      home: 'Home',
      features: 'Features',
      learn: 'Learn',
      faq: 'FAQ',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
    },
    copyright: '© 2026 Inves10. All rights reserved.',
  },
  hi: {
    tagline: 'कम से शुरू करें, भरोसे के साथ बढ़ें।',
    about: 'Inves10 एक माइक्रो-निवेश प्लेटफ़ॉर्म है जो पहली बार निवेशकों को सिर्फ ₹10 से अपनी वित्तीय यात्रा शुरू करने में मदद करने के लिए डिज़ाइन किया गया है।',
    quickLinks: 'त्वरित लिंक',
    legal: 'कानूनी',
    disclaimer: 'अस्वीकरण',
    disclaimerText: 'Inves10 शैक्षिक उद्देश्यों के लिए एक प्रोटोटाइप एप्लिकेशन है। यह वास्तविक वित्तीय सलाह प्रदान नहीं करता है। निवेश निर्णय लेने से पहले हमेशा प्रमाणित वित्तीय सलाहकार से परामर्श करें।',
    links: {
      home: 'होम',
      features: 'विशेषताएं',
      learn: 'सीखें',
      faq: 'सवाल-जवाब',
      terms: 'नियम व शर्तें',
      privacy: 'गोपनीयता नीति',
    },
    copyright: '© 2026 Inves10. सर्वाधिकार सुरक्षित।',
  },
};

export function Footer({ onNavigate, language }: FooterProps) {
  const t = content[language];

  return (
    <footer className="border-t border-blue-900/20 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold">
              <span className="text-blue-400">Inves</span>
              <span className="text-white">10</span>
            </h3>
            <p className="text-sm text-blue-400/80 font-bold">{t.tagline}</p>
            <p className="text-sm text-gray-400">{t.about}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('landing')}
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t.links.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t.links.features}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('literacy')}
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t.links.learn}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t.links.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">{t.legal}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t.links.terms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t.links.privacy}
                </button>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">{t.disclaimer}</h4>
            <p className="text-xs text-gray-500">{t.disclaimerText}</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-blue-900/10">
          <p className="text-center text-sm text-gray-500">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
