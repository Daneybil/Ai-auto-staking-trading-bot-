
import React, { useState, useEffect } from 'react';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { Whitepaper } from './components/Whitepaper';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Services } from './components/Services';
import { Support } from './components/Support';
import { Markets } from './components/Markets';
import { Terms } from './components/Terms';
import { ChatBot } from './components/ChatBot';
import { AppView, User } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('currentUser');
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // This ensures the user gets the same address even if they clear cache
  const generateDeterministicAddress = (phrase: string) => {
    let hash = 0;
    const cleanPhrase = phrase.toLowerCase().trim();
    for (let i = 0; i < cleanPhrase.length; i++) {
      hash = (hash << 5) - hash + cleanPhrase.charCodeAt(i);
      hash |= 0;
    }
    // Generates a consistent 0x... address based on the 12 words
    return '0x' + Math.abs(hash).toString(16).padStart(40, 'a').substring(0, 40);
  };

  const handleSignup = (phrase: string) => {
    const users = JSON.parse(localStorage.getItem('app_users_v2') || '[]');
    const existing = users.find((u: any) => u.phrase.toLowerCase().trim() === phrase.toLowerCase().trim());
    
    if (existing) {
      handleLogin(phrase);
      return;
    }

    const newUser: User = {
      recoveryPhrase: phrase,
      balance: 0,
      depositedAmount: 0,
      referralCode: phrase.split(' ')[0].toUpperCase() + Math.floor(Math.random() * 1000),
      referralRewards: 0,
      walletAddress: generateDeterministicAddress(phrase),
      joinedAt: Date.now(),
      notifications: [{
        id: '1',
        title: 'Vault Initialized',
        message: 'Your 12-word phrase is your key. Deposit $100 min to start AI trading.',
        timestamp: Date.now(),
        read: false
      }]
    };

    users.push({ phrase, profile: newUser });
    localStorage.setItem('app_users_v2', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setView('dashboard');
  };

  const handleLogin = (phrase: string) => {
    const users = JSON.parse(localStorage.getItem('app_users_v2') || '[]');
    const found = users.find((u: any) => u.phrase.toLowerCase().trim() === phrase.toLowerCase().trim());
    
    if (found) {
      setUser(found.profile);
      localStorage.setItem('currentUser', JSON.stringify(found.profile));
      setView('dashboard');
    } else {
      // DUAL RECOVERY: If phrase is valid but cache is empty, restore the profile deterministically
      const restoredUser: User = {
        recoveryPhrase: phrase,
        balance: 0, // Reset balance simulation but keep identity
        depositedAmount: 0,
        referralCode: phrase.split(' ')[0].toUpperCase() + "R",
        referralRewards: 0,
        walletAddress: generateDeterministicAddress(phrase),
        joinedAt: Date.now(),
        notifications: [{ id: '1', title: 'Vault Restored', message: 'Account identity synced from recovery phrase.', timestamp: Date.now(), read: false }]
      };
      setUser(restoredUser);
      localStorage.setItem('currentUser', JSON.stringify(restoredUser));
      
      // Save back to local storage
      users.push({ phrase, profile: restoredUser });
      localStorage.setItem('app_users_v2', JSON.stringify(users));
      
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setView('landing');
  };

  const handleUpdateUser = (updatedUser: User | null) => {
    if (!updatedUser) return;
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem('app_users_v2') || '[]');
    const index = users.findIndex((u: any) => u.phrase === updatedUser.recoveryPhrase);
    if (index !== -1) {
      users[index].profile = updatedUser;
      localStorage.setItem('app_users_v2', JSON.stringify(users));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0e11] text-[#eaecef] selection:bg-[#F0B90B] selection:text-black font-bold">
      <div className="bg-[#F0B90B] text-[#0b0e11] py-5 md:py-8 text-center font-black text-2xl md:text-4xl uppercase tracking-tighter animate-pulse border-b-8 border-black/10 px-4">
        Unlimited earnings in 2026, the biggest unlimited AI staking trading bot
      </div>

      <Header currentView={view} setView={setView} user={user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        {view === 'landing' && <Landing setView={setView} />}
        {view === 'dashboard' && user && <Dashboard user={user} setUser={handleUpdateUser} />}
        {view === 'whitepaper' && <Whitepaper />}
        {view === 'services' && <Services />}
        {view === 'support' && <Support />}
        {view === 'markets' && <Markets />}
        {view === 'terms' && <Terms />}
        {view === 'login' && <Login onLogin={handleLogin} setView={setView} />}
        {view === 'signup' && <Signup onSignup={handleSignup} setView={setView} />}
      </main>

      <Footer setView={setView} />
      
      {/* Persisted AI Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default App;