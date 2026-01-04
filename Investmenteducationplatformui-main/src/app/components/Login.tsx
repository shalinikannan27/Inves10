import { useState } from 'react';
import { Phone, ArrowRight, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from '../App';

interface LoginProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  onGoogleLogin: (account: { name: string; email: string; avatar: string; firstName: string }) => void;
  onPhoneLogin: (name: string) => void;
}

const content = {
  en: {
    title: 'Welcome to Inves10',
    subtitle: 'Start your investment journey',
    nameLabel: 'Your Name',
    namePlaceholder: 'Enter your name',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'Enter your phone number',
    googleButton: 'Continue with Google',
    continueButton: 'Continue',
    or: 'or',
    chooseAccount: 'Choose an account',
    continueAs: 'to continue to Inves10',
    useAnother: 'Use another account',
  },
  hi: {
    title: 'Inves10 में आपका स्वागत है',
    subtitle: 'अपनी निवेश यात्रा शुरू करें',
    nameLabel: 'आपका नाम',
    namePlaceholder: 'अपना नाम दर्ज करें',
    phoneLabel: 'फ़ोन नंबर',
    phonePlaceholder: 'अपना फ़ोन नंबर दर्ज करें',
    googleButton: 'Google से जारी रखें',
    continueButton: 'जारी रखें',
    or: 'या',
    chooseAccount: 'एक खाता चुनें',
    continueAs: 'Inves10 पर जारी रखने के लिए',
    useAnother: 'दूसरे खाते का उपयोग करें',
  },
};

// Mock Google accounts
const mockAccounts = [
  {
    id: 1,
    name: 'Shalini Kannan',
    email: 'shalinikannan2005@gmail.com',
    avatar: 'SK',
    color: '#1a73e8',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    avatar: 'PS',
    color: '#ea4335',
  },
];

export function Login({ onNavigate, language, onGoogleLogin, onPhoneLogin }: LoginProps) {
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const t = content[language];

  const handlePhoneContinue = () => {
    if (!showNameInput) {
      // First click - show name input
      setShowNameInput(true);
    } else {
      // Second click - validate and proceed
      if (!userName.trim()) {
        alert(language === 'en' ? 'Please enter your name' : 'कृपया अपना नाम दर्ज करें');
        return;
      }
      // Call the phone login callback and navigate to onboarding
      onPhoneLogin(userName);
      onNavigate('onboarding');
    }
  };

  const handleGoogleLogin = () => {
    // Show the account picker modal
    setShowAccountPicker(true);
  };

  const handleAccountSelect = (account: typeof mockAccounts[0]) => {
    console.log('Selected account:', account.email);
    // Extract first name from full name
    const firstName = account.name.split(' ')[0];
    onGoogleLogin({ 
      name: account.name, 
      email: account.email, 
      avatar: account.avatar,
      firstName 
    });
    setShowAccountPicker(false);
    // Navigate to onboarding after account selection
    onNavigate('onboarding');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="border border-blue-900/20 p-8 bg-black">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
            <p className="text-gray-400">{t.subtitle}</p>
          </div>

          <div className="space-y-6">
            {/* Name Input - Shows when user clicks phone continue */}
            <AnimatePresence>
              {showNameInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block mb-2 text-sm">{t.nameLabel}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full bg-transparent border border-blue-900/20 pl-12 pr-4 py-3 focus:border-blue-900 focus:outline-none transition-colors mb-4"
                      autoFocus
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phone Input */}
            <div>
              <label className="block mb-2 text-sm">{t.phoneLabel}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full bg-transparent border border-blue-900/20 pl-12 pr-4 py-3 focus:border-blue-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handlePhoneContinue}
              className="w-full bg-blue-900 text-white py-3 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 group"
            >
              {t.continueButton}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-900/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">{t.or}</span>
              </div>
            </div>

            {/* Google Button - Simulated */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white text-gray-700 py-3 px-4 hover:bg-gray-100 transition-all flex items-center justify-center gap-3 font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t.googleButton}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Google Account Picker Modal */}
      <AnimatePresence>
        {showAccountPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAccountPicker(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white text-gray-800 rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="border-b border-gray-200 p-6 text-center">
                <button
                  onClick={() => setShowAccountPicker(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                
                <h2 className="text-xl font-medium mb-1">{t.chooseAccount}</h2>
                <p className="text-sm text-gray-600">{t.continueAs}</p>
              </div>

              {/* Account List */}
              <div className="p-2">
                {mockAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => handleAccountSelect(account)}
                    className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: account.color }}
                    >
                      {account.avatar}
                    </div>
                    
                    {/* Account Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {account.name}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {account.email}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Use Another Account */}
              <div className="border-t border-gray-200 p-4">
                <button
                  onClick={() => handleAccountSelect(mockAccounts[0])}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {t.useAnother}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
