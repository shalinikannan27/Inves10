import { Menu, X, Globe, MessageCircle, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Section } from '../App';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
  onToggleChatbot: () => void;
  hasUserProfile: boolean;
  googleAccount: {
    name: string;
    email: string;
    avatar: string;
  } | null;
  onLogout: () => void;
}

export function Navigation({
  currentSection,
  onNavigate,
  language,
  onToggleLanguage,
  onToggleChatbot,
  hasUserProfile,
  googleAccount,
  onLogout,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'landing' as Section, label: { en: 'Home', hi: 'होम' } },
    { id: 'features' as Section, label: { en: 'Features', hi: 'विशेषताएं' } },
    { id: 'literacy' as Section, label: { en: 'Learn', hi: 'सीखें' } },
    ...(hasUserProfile
      ? [
          { id: 'dashboard' as Section, label: { en: 'Dashboard', hi: 'डैशबोर्ड' } },
          { id: 'progress' as Section, label: { en: 'Progress', hi: 'प्रगति' } },
          { id: 'habit' as Section, label: { en: 'Habits', hi: 'आदतें' } },
        ]
      : []),
    { id: 'faq' as Section, label: { en: 'FAQ', hi: 'सवाल-जवाब' } },
    { id: 'terms' as Section, label: { en: 'Terms', hi: 'नियम' } },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="text-xl font-bold hover:text-blue-400 transition-colors"
          >
            <span className="text-blue-400">Inves</span>10
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`hover:text-blue-400 transition-colors relative group ${
                  currentSection === item.id ? 'text-blue-400' : ''
                }`}
              >
                {item.label[language]}
                {currentSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLanguage}
              className="p-2 hover:bg-blue-900/10 rounded border border-blue-900/20 hover:border-blue-900 transition-all"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleChatbot}
              className="p-2 hover:bg-blue-900/10 rounded border border-blue-900/20 hover:border-blue-900 transition-all"
              aria-label="Open chatbot"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            {hasUserProfile && (
              <button
                onClick={() => onNavigate('profile')}
                className={`p-2 hover:bg-blue-900/10 rounded border transition-all ${
                  currentSection === 'profile'
                    ? 'border-blue-400 bg-blue-900/10'
                    : 'border-blue-900/20 hover:border-blue-900'
                }`}
                aria-label="View profile"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-blue-900/10 rounded border border-blue-900/20"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-blue-900/20 overflow-hidden"
            >
              <div className="flex flex-col gap-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`text-left py-2 px-4 hover:bg-blue-900/10 rounded transition-colors ${
                      currentSection === item.id ? 'text-blue-400 bg-blue-900/10' : ''
                    }`}
                  >
                    {item.label[language]}
                  </button>
                ))}
                {hasUserProfile && (
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setIsOpen(false);
                    }}
                    className={`text-left py-2 px-4 hover:bg-blue-900/10 rounded transition-colors ${
                      currentSection === 'profile' ? 'text-blue-400 bg-blue-900/10' : ''
                    }`}
                  >
                    {language === 'en' ? 'Profile' : 'प्रोफ़ाइल'}
                  </button>
                )}
                {googleAccount && (
                  <button
                    onClick={onLogout}
                    className="text-left py-2 px-4 hover:bg-blue-900/10 rounded transition-colors"
                  >
                    {language === 'en' ? 'Logout' : 'लॉगआउट'}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}