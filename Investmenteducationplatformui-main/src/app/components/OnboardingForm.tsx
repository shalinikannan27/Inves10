import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Section, UserProfile } from '../App';

interface OnboardingFormProps {
  onNavigate: (section: Section) => void;
  language: 'en' | 'hi';
  onComplete: (profile: UserProfile) => void;
  setRecommendation: (rec: any) => void;
  initialName?: string;
}

const content = {
  en: {
    title: 'Tell us about yourself',
    subtitle: 'Help us personalize your experience',
    steps: [
      { label: 'Name', placeholder: 'Enter your name' },
      { label: 'Age', placeholder: 'Enter your age (must be 18+)' },
      { label: 'Role', options: ['Student', 'Working professional', 'Senior citizen'] },
      { label: 'Have you invested before?', options: ['Yes', 'No'] },
      {
        label: 'What are your main challenges?',
        options: [
          'Fear of losing money',
          'Don\'t understand process',
          'Don\'t trust apps',
          'Unsure how much to invest',
        ],
      },
      { label: 'Starting amount preference', options: ['₹10', '₹50', '₹100'] },
      { label: 'Investment preference', options: ['Regular investing', 'Senior citizen investing'] },
    ],
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
  },
  hi: {
    title: 'अपने बारे में बताएं',
    subtitle: 'हमें आपके अनुभव को निजीकृत करने में मदद करें',
    steps: [
      { label: 'नाम', placeholder: 'अपना नाम दर्ज करें' },
      { label: 'उम्र', placeholder: 'अपनी उम्र दर्ज करें (18+ होनी चाहिए)' },
      { label: 'भूमिका', options: ['छात्र', 'कामकाजी पेशेवर', 'वरिष्ठ नागरिक'] },
      { label: 'क्या आपने पहले निवेश किया है?', options: ['हाँ', 'नहीं'] },
      {
        label: 'आपकी मुख्य चुनौतियां क्या हैं?',
        options: [
          'पैसे खोने का डर',
          'प्रक्रिया समझ नहीं आती',
          'ऐप पर भरोसा नहीं',
          'कितना निवेश करें पता नहीं',
        ],
      },
      { label: 'शुरुआती राशि पसंद', options: ['₹10', '₹50', '₹100'] },
      { label: 'निवेश पसंद', options: ['नियमित निवेश', 'वरिष्ठ नागरिक निवेश'] },
    ],
    next: 'अगला',
    back: 'पीछे',
    submit: 'जमा करें',
  },
};

export function OnboardingForm({
  onNavigate,
  language,
  onComplete,
  setRecommendation,
  initialName = '',
}: OnboardingFormProps) {
  // If initialName is provided, start from step 1 (age), otherwise start from step 0 (name)
  const [currentStep, setCurrentStep] = useState(initialName ? 1 : 0);
  const [formData, setFormData] = useState({
    name: initialName,
    age: '',
    role: '',
    investedBefore: '',
    challenges: [] as string[],
    startingAmount: '',
    preference: '',
  });

  const t = content[language];

  const handleNext = () => {
    if (currentStep < t.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Validate age
    const age = parseInt(formData.age);
    if (age < 18) {
      alert(language === 'en' ? 'You must be 18 or older' : 'आपकी उम्र 18 या उससे अधिक होनी चाहिए');
      return;
    }

    // Create user profile
    const profile: UserProfile = {
      name: formData.name,
      age,
      role: formData.role === 'Student' || formData.role === 'छात्र'
        ? 'student'
        : formData.role === 'Senior citizen' || formData.role === 'वरिष्ठ नागरिक'
        ? 'senior'
        : 'working',
      investedBefore: formData.investedBefore === 'Yes' || formData.investedBefore === 'हाँ',
      challenges: formData.challenges,
      startingAmount: parseInt(formData.startingAmount.replace('₹', '')),
      preference: formData.preference.includes('Senior') || formData.preference.includes('वरिष्ठ')
        ? 'senior'
        : 'regular',
    };

    onComplete(profile);

    // Generate recommendation based on profile
    const recommendation = generateRecommendation(profile);
    setRecommendation(recommendation);

    // Navigate to bankConnection
    onNavigate('bankConnection');
  };

  const generateRecommendation = (profile: UserProfile) => {
    // Simple rule-based recommendation
    if (profile.role === 'senior' || profile.preference === 'senior') {
      return {
        type: 'FD' as const,
        rate: 7.5, // Senior citizen rate
        reason: language === 'en'
          ? 'Fixed Deposit with senior citizen benefits - safe and stable returns'
          : 'वरिष्ठ नागरिक लाभ के साथ सावधि जमा - सुरक्षित और स्थिर रिटर्न',
      };
    } else if (profile.investedBefore) {
      return {
        type: 'Liquid' as const,
        rate: 6.0,
        reason: language === 'en'
          ? 'Liquid Fund - flexible, low-risk option for experienced investors'
          : 'लिक्विड फंड - अनुभवी निवेशकों के लिए लचीला, कम जोखिम वाला विकल्प',
      };
    } else {
      return {
        type: 'Govt' as const,
        rate: 6.5,
        reason: language === 'en'
          ? 'Government-backed savings - perfect for first-time investors'
          : 'सरकार समर्थित बचत - पहली बार निवेश करने वालों के लिए एकदम सही',
      };
    }
  };

  const renderStep = () => {
    const step = t.steps[currentStep];

    switch (currentStep) {
      case 0: // Name
        return (
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={step.placeholder}
            className="w-full bg-transparent border border-blue-900/20 px-4 py-3 focus:border-blue-400 focus:outline-none transition-colors"
          />
        );

      case 1: // Age
        return (
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder={step.placeholder}
            className="w-full bg-transparent border border-blue-900/20 px-4 py-3 focus:border-blue-400 focus:outline-none transition-colors"
            min="18"
          />
        );

      case 2: // Role
        return (
          <div className="space-y-3">
            {step.options?.map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, role: option })}
                className={`w-full p-4 border transition-all text-left ${
                  formData.role === option
                    ? 'border-blue-400 bg-blue-900/10'
                    : 'border-blue-900/20 hover:border-blue-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 3: // Invested before
        return (
          <div className="space-y-3">
            {step.options?.map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, investedBefore: option })}
                className={`w-full p-4 border transition-all text-left ${
                  formData.investedBefore === option
                    ? 'border-blue-400 bg-blue-900/10'
                    : 'border-blue-900/20 hover:border-blue-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 4: // Challenges (multiple)
        return (
          <div className="space-y-3">
            {step.options?.map((option) => (
              <button
                key={option}
                onClick={() => {
                  const newChallenges = formData.challenges.includes(option)
                    ? formData.challenges.filter((c) => c !== option)
                    : [...formData.challenges, option];
                  setFormData({ ...formData, challenges: newChallenges });
                }}
                className={`w-full p-4 border transition-all text-left ${
                  formData.challenges.includes(option)
                    ? 'border-blue-400 bg-blue-900/10'
                    : 'border-blue-900/20 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 border transition-all ${
                      formData.challenges.includes(option)
                        ? 'bg-blue-400 border-blue-400'
                        : 'border-blue-900/40'
                    }`}
                  >
                    {formData.challenges.includes(option) && (
                      <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12l5 5L20 7"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="square"
                        />
                      </svg>
                    )}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        );

      case 5: // Starting amount
        return (
          <div className="space-y-3">
            {step.options?.map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, startingAmount: option })}
                className={`w-full p-4 border transition-all text-left ${
                  formData.startingAmount === option
                    ? 'border-blue-400 bg-blue-900/10'
                    : 'border-blue-900/20 hover:border-blue-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 6: // Preference
        return (
          <div className="space-y-3">
            {step.options?.map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, preference: option })}
                className={`w-full p-4 border transition-all text-left ${
                  formData.preference === option
                    ? 'border-blue-400 bg-blue-900/10'
                    : 'border-blue-900/20 hover:border-blue-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== '';
      case 1:
        return formData.age.trim() !== '';
      case 2:
        return formData.role !== '';
      case 3:
        return formData.investedBefore !== '';
      case 4:
        return formData.challenges.length > 0;
      case 5:
        return formData.startingAmount !== '';
      case 6:
        return formData.preference !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="border border-blue-900/20 p-8 bg-black">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
            <p className="text-gray-400">{t.subtitle}</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} of {t.steps.length}
              </span>
              <span className="text-sm text-gray-400">
                {Math.round(((currentStep + 1) / t.steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-1 bg-blue-900/20">
              <motion.div
                className="h-full bg-blue-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / t.steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">{t.steps[currentStep].label}</h2>
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-blue-900/20 hover:border-blue-400 hover:bg-blue-900/5 transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                {t.back}
              </button>
            )}

            {currentStep < t.steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 px-6 py-3 bg-blue-900 text-white hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {t.next}
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="flex-1 px-6 py-3 bg-blue-900 text-white hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.submit}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}