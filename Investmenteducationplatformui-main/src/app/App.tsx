import { useState, useEffect } from 'react';
import { Landing } from './components/Landing';
import { Features } from './components/Features';
import { Login } from './components/Login';
import { FinancialLiteracy } from './components/FinancialLiteracy';
import { OnboardingForm } from './components/OnboardingForm';
import { Recommendation } from './components/Recommendation';
import { InvestmentAction } from './components/InvestmentAction';
import { Dashboard } from './components/Dashboard';
import { ProgressCharts } from './components/ProgressCharts';
import { HabitTracker } from './components/HabitTracker';
import { Terms } from './components/Terms';
import { FAQ } from './components/FAQ';
import { Chatbot } from './components/Chatbot';
import { Navigation } from './components/Navigation';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { Footer } from './components/Footer';
import { GoalType } from './components/GoalTag';
import { BankConnection } from './components/BankConnection';
import { AddMoney } from './components/AddMoney';
import { Wallet } from './components/Wallet';
import { InvestmentHistory } from './components/InvestmentHistory';
import { Rewards, getDefaultMilestones } from './components/Rewards';
import { Profile } from './components/Profile';

export type Section = 
  | 'landing'
  | 'features'
  | 'login'
  | 'literacy'
  | 'onboarding'
  | 'bankConnection'
  | 'recommendation'
  | 'addMoney'
  | 'wallet'
  | 'invest'
  | 'dashboard'
  | 'investmentHistory'
  | 'progress'
  | 'habit'
  | 'rewards'
  | 'profile'
  | 'terms'
  | 'faq'
  | 'chatbot';

export interface UserProfile {
  name: string;
  age: number;
  role: 'student' | 'working' | 'senior' | '';
  investedBefore: boolean | null;
  challenges: string[];
  startingAmount: number;
  preference: 'regular' | 'senior' | '';
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountHolder: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
  method?: 'UPI' | 'Card';
  referenceId?: string;
}

export interface Investment {
  id: string;
  amount: number;
  type: 'FD' | 'Liquid' | 'Govt';
  date: Date;
  projectedReturn: number;
  duration: number; // months
  goal?: GoalType;
  fundName?: string;
  status: 'active' | 'completed' | 'pending';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
  date?: Date;
  type: 'first_investment' | 'consistency' | 'goal_completion' | 'amount_milestone';
}

export interface LiteracyProgress {
  [key: string]: {
    completed: boolean;
    quizAnswered?: boolean;
  };
}

export interface AppState {
  section: Section;
  language: 'en' | 'hi';
  userProfile: UserProfile | null;
  bankDetails: BankDetails | null;
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  investments: Investment[];
  habitStreak: number;
  lastInvestmentDate: Date | null;
  recommendation: {
    type: 'FD' | 'Liquid' | 'Govt';
    rate: number;
    reason: string;
  } | null;
  literacyProgress: LiteracyProgress;
  lastVisit: Date | null;
  milestones: Milestone[];
  rewardPoints: number;
  googleAccount: {
    name: string;
    email: string;
    avatar: string;
  } | null;
}

// Investment fund names pool
const FUND_NAMES = [
  'National Growth & Stability Fund',
  'Bharat Public Savings Authority',
  'Indian Long-Term Capital Trust',
  'Central Secure Investment Board',
  'Unified Citizen Wealth Fund',
  'Public Infrastructure Growth Fund',
  'BlueHarbor Wealth Partners',
  'Navia Capital Management',
  'Aurora Yield Fund',
  'Vertex Secure Investments',
  'TrueNest Financial Services',
  'Pinnacle MicroCap Fund',
];

export default function App() {
  const [state, setState] = useState<AppState>({
    section: 'landing',
    language: 'en',
    userProfile: null,
    bankDetails: null,
    walletBalance: 10000, // Updated to 10000 as requested
    walletTransactions: [],
    investments: [],
    habitStreak: 0,
    lastInvestmentDate: null,
    recommendation: null,
    literacyProgress: {},
    lastVisit: null,
    milestones: [],
    rewardPoints: 0,
    googleAccount: null,
  });

  const [showChatbot, setShowChatbot] = useState(false);
  const [loginName, setLoginName] = useState<string>('');

  // Auto-show chatbot after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatbot(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Update habit streak
  useEffect(() => {
    if (state.lastInvestmentDate) {
      const today = new Date();
      const lastDate = new Date(state.lastInvestmentDate);
      const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        setState(prev => ({ ...prev, habitStreak: prev.habitStreak + 1 }));
      } else if (diffDays > 1) {
        setState(prev => ({ ...prev, habitStreak: 1 }));
      }
    }
  }, [state.lastInvestmentDate]);

  // Track last visit
  useEffect(() => {
    if (!state.lastVisit) {
      setState(prev => ({ ...prev, lastVisit: new Date() }));
    }
  }, []);

  const navigateToSection = (section: Section) => {
    setState(prev => ({ ...prev, section }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setState(prev => ({ 
      ...prev, 
      language: prev.language === 'en' ? 'hi' : 'en' 
    }));
  };

  const updateUserProfile = (profile: UserProfile) => {
    setState(prev => ({ ...prev, userProfile: profile }));
  };

  const setRecommendation = (rec: AppState['recommendation']) => {
    setState(prev => ({ ...prev, recommendation: rec }));
  };

  const addInvestment = (investment: Omit<Investment, 'id' | 'date'>) => {
    const newInvestment: Investment = {
      ...investment,
      id: Date.now().toString(),
      date: new Date(),
      // Use the provided fundName, or randomly select one if not provided
      fundName: investment.fundName || FUND_NAMES[Math.floor(Math.random() * FUND_NAMES.length)],
      status: 'active',
    };

    setState(prev => {
      const newInvestments = [...prev.investments, newInvestment];
      
      // Calculate reward points
      // Base points: 10 points per investment
      // Bonus: 1 point per ₹10 invested
      // First investment bonus: 50 points
      const basePoints = 10;
      const amountBonus = Math.floor(investment.amount / 10);
      const firstInvestmentBonus = prev.investments.length === 0 ? 50 : 0;
      const streakBonus = prev.habitStreak >= 3 ? 20 : 0;
      const totalPointsEarned = basePoints + amountBonus + firstInvestmentBonus + streakBonus;
      
      // Calculate transaction
      const newTransaction: WalletTransaction = {
        id: Date.now().toString(),
        type: 'debit',
        amount: investment.amount,
        description: `Investment in ${newInvestment.fundName}`,
        date: new Date(),
        method: 'Wallet'
      };

      return {
        ...prev,
        investments: newInvestments,
        walletBalance: prev.walletBalance - investment.amount,
        walletTransactions: [newTransaction, ...prev.walletTransactions],
        lastInvestmentDate: new Date(),
        habitStreak: prev.investments.length === 0 ? 1 : prev.habitStreak,
        rewardPoints: prev.rewardPoints + totalPointsEarned,
      };
    });
  };

  const updateLiteracyProgress = (topicId: string, completed: boolean, quizAnswered?: boolean) => {
    setState(prev => ({
      ...prev,
      literacyProgress: {
        ...prev.literacyProgress,
        [topicId]: { completed, quizAnswered },
      },
    }));
  };

  const handleGoogleLogin = (account: { name: string; email: string; avatar: string; firstName: string }) => {
    setState(prev => ({ ...prev, googleAccount: account }));
    setLoginName(account.firstName);
  };

  const handlePhoneLogin = (name: string) => {
    setLoginName(name);
  };

  const handleLogout = () => {
    setState(prev => ({
      ...prev,
      googleAccount: null,
      userProfile: null,
      section: 'landing',
    }));
    setLoginName('');
  };

  const renderSection = () => {
    switch (state.section) {
      case 'landing':
        return <Landing onNavigate={navigateToSection} language={state.language} />;
      case 'features':
        return <Features onNavigate={navigateToSection} language={state.language} />;
      case 'login':
        return <Login onNavigate={navigateToSection} language={state.language} onGoogleLogin={handleGoogleLogin} onPhoneLogin={handlePhoneLogin} />;
      case 'literacy':
        return (
          <FinancialLiteracy
            onNavigate={navigateToSection}
            language={state.language}
            literacyProgress={state.literacyProgress}
            onUpdateProgress={updateLiteracyProgress}
          />
        );
      case 'onboarding':
        return (
          <OnboardingForm
            onNavigate={navigateToSection}
            language={state.language}
            onComplete={updateUserProfile}
            setRecommendation={setRecommendation}
            initialName={loginName}
          />
        );
      case 'bankConnection':
        return (
          <BankConnection
            language={state.language}
            onComplete={(details) => {
              setState(prev => ({ 
                ...prev, 
                bankDetails: { 
                  bankName: details.bankName,
                  accountNumber: details.accountLast4,
                  ifsc: 'SBIN0000001', // Mock
                  accountHolder: state.userProfile?.name || 'User' 
                } 
              }));
              navigateToSection('recommendation');
            }}
            onSkip={() => navigateToSection('recommendation')}
          />
        );
      case 'recommendation':
        return (
          <Recommendation
            onNavigate={navigateToSection}
            language={state.language}
            userProfile={state.userProfile}
            recommendation={state.recommendation}
            walletBalance={state.walletBalance}
          />
        );
      case 'addMoney':
        return (
          <AddMoney
            language={state.language}
            onSuccess={(amount, method) => {
              const newTxn: WalletTransaction = {
                id: Date.now().toString(),
                type: 'credit',
                amount,
                description: 'Added Money',
                date: new Date(),
                method: method as any,
              };
              setState(prev => ({
                ...prev,
                walletBalance: prev.walletBalance + amount,
                walletTransactions: [newTxn, ...prev.walletTransactions]
              }));
              navigateToSection('wallet');
            }}
            onBack={() => navigateToSection('recommendation')}
          />
        );
      case 'wallet':
        return (
          <Wallet
            language={state.language}
            balance={state.walletBalance}
            transactions={state.walletTransactions.map(t => ({...t, method: t.method || 'Wallet'}))}
            onAddMoney={() => navigateToSection('addMoney')}
            onInvest={() => navigateToSection('invest')}
          />
        );
      case 'invest':
        return (
          <InvestmentAction
            onNavigate={navigateToSection}
            language={state.language}
            recommendation={state.recommendation}
            walletBalance={state.walletBalance}
            onInvest={addInvestment}
            hasInvestedBefore={state.investments.length > 0}
            habitStreak={state.habitStreak}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={navigateToSection}
            language={state.language}
            investments={state.investments}
            walletBalance={state.walletBalance}
            literacyProgress={state.literacyProgress}
            habitStreak={state.habitStreak}
            lastVisit={state.lastVisit}
          />
        );
      case 'progress':
        return (
          <ProgressCharts
            onNavigate={navigateToSection}
            language={state.language}
            investments={state.investments}
          />
        );
      case 'habit':
        return (
          <HabitTracker
            onNavigate={navigateToSection}
            language={state.language}
            habitStreak={state.habitStreak}
            investments={state.investments}
          />
        );
      case 'investmentHistory':
        const historyInvestments = state.investments.map(inv => {
          const maturityDate = new Date(inv.date);
          maturityDate.setMonth(maturityDate.getMonth() + inv.duration);
          
          // Simple mock current value calculation
          // +0.5% per month elapsed roughly
          const monthsElapsed = Math.max(0, (new Date().getTime() - inv.date.getTime()) / (1000 * 60 * 60 * 24 * 30));
          const interest = inv.amount * (inv.projectedReturn / 100) * (monthsElapsed / 12);
          const currentValue = inv.amount + interest;

          return {
            id: inv.id,
            amount: inv.amount,
            fundName: inv.fundName || 'Unknown Fund',
            fundType: inv.type,
            date: inv.date,
            duration: inv.duration,
            returnRate: inv.projectedReturn,
            status: inv.status === 'pending' ? 'active' : inv.status,
            maturityDate: maturityDate,
            currentValue: Math.round(currentValue),
          };
        });

        return (
          <InvestmentHistory
            language={state.language}
            investments={historyInvestments}
          />
        );
      case 'rewards':
        const milestones = getDefaultMilestones(
          state.language,
          state.investments.length,
          state.habitStreak,
          state.investments.reduce((sum, i) => sum + i.amount, 0)
        );
        const achievedCount = milestones.filter(m => m.achieved).length;
        const totalPoints = achievedCount * 100;

        return (
          <Rewards
            language={state.language}
            milestones={milestones as any}
            totalPoints={totalPoints}
          />
        );
      case 'profile':
        const totalInvested = state.investments.reduce((sum, inv) => sum + inv.amount, 0);
        const totalReturns = state.investments.reduce((sum, inv) => {
          const monthsElapsed = Math.max(0, (new Date().getTime() - inv.date.getTime()) / (1000 * 60 * 60 * 24 * 30));
          const interest = inv.amount * (inv.projectedReturn / 100) * (monthsElapsed / 12);
          return sum + interest;
        }, 0);
        const currentValue = totalInvested + totalReturns;

        return (
          <Profile
            language={state.language}
            onNavigate={navigateToSection}
            userName={state.userProfile?.name || 'User'}
            totalInvested={totalInvested}
            totalReturns={totalReturns}
            currentValue={currentValue}
            investments={state.investments}
            walletTransactions={state.walletTransactions}
            habitStreak={state.habitStreak}
          />
        );
      case 'terms':
        return <Terms onNavigate={navigateToSection} language={state.language} />;
      case 'faq':
        return <FAQ onNavigate={navigateToSection} language={state.language} />;
      case 'chatbot':
        return <Chatbot onNavigate={navigateToSection} language={state.language} />;
      default:
        return <Landing onNavigate={navigateToSection} language={state.language} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <BackgroundAnimation />
      
      <Navigation
        currentSection={state.section}
        onNavigate={navigateToSection}
        language={state.language}
        onToggleLanguage={toggleLanguage}
        onToggleChatbot={() => setShowChatbot(!showChatbot)}
        hasUserProfile={!!state.userProfile}
        googleAccount={state.googleAccount}
        onLogout={handleLogout}
      />

      <main className="relative z-10">
        {renderSection()}
      </main>

      <Footer onNavigate={navigateToSection} language={state.language} />

      <Chatbot
        onNavigate={navigateToSection}
        language={state.language}
        onClose={() => setShowChatbot(false)}
        isOpen={showChatbot}
      />
    </div>
  );
}