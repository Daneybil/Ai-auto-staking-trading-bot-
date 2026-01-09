
import React from 'react';
import { AppView, User } from '../types';
import { BRAND_COLOR } from '../constants';
import { Menu, X, Wallet, LogOut, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  user: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavItems = () => (
    <>
      <button onClick={() => { setView('landing'); setIsMobileMenuOpen(false); }} className={`hover:text-[#F0B90B] transition-colors ${currentView === 'landing' ? 'text-[#F0B90B]' : ''}`}>Home</button>
      <button onClick={() => { setView('markets'); setIsMobileMenuOpen(false); }} className={`hover:text-[#F0B90B] transition-colors ${currentView === 'markets' ? 'text-[#F0B90B]' : ''}`}>Markets</button>
      <button onClick={() => { setView('whitepaper'); setIsMobileMenuOpen(false); }} className={`hover:text-[#F0B90B] transition-colors ${currentView === 'whitepaper' ? 'text-[#F0B90B]' : ''}`}>Whitepaper</button>
      <button onClick={() => { setView('services'); setIsMobileMenuOpen(false); }} className={`hover:text-[#F0B90B] transition-colors ${currentView === 'services' ? 'text-[#F0B90B]' : ''}`}>AI Services</button>
      <button onClick={() => { setView('support'); setIsMobileMenuOpen(false); }} className={`hover:text-[#F0B90B] transition-colors ${currentView === 'support' ? 'text-[#F0B90B]' : ''}`}>Support</button>
      {user && <button onClick={() => { setView('dashboard'); setIsMobileMenuOpen(false); }} className={`hover:text-[#F0B90B] transition-colors ${currentView === 'dashboard' ? 'text-[#F0B90B]' : ''}`}>Dashboard</button>}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0e11]/95 backdrop-blur-md border-b-4 border-[#2b2f36] px-4 py-6 md:px-12 font-black">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-5 cursor-pointer group" onClick={() => setView('landing')}>
            <div className="bg-[#F0B90B] p-3 rounded-2xl group-hover:rotate-12 transition-transform shadow-2xl">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="black"><path d="M12 0l4.3 4.3L12 8.6l-4.3-4.3L12 0zm-8.6 8.6L7.7 12.9 3.4 17.2l-3.4-4.3 3.4-4.3zm17.2 0l3.4 4.3-3.4 4.3-4.3-4.3 4.3-4.3zM12 11.4l4.3 4.3L12 20l-4.3-4.3 4.3-4.3zm0 8.6l3.4 4.3L12 24l-3.4-4.3L12 20z" /></svg>
            </div>
            <span className="text-3xl font-black hidden xl:block tracking-tighter uppercase">AI AUTO STAKE</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-lg uppercase tracking-widest">
            <NavItems />
          </div>
        </div>
        <div className="flex items-center gap-8">
          {!user ? (
            <div className="flex items-center gap-8">
              <button onClick={() => setView('login')} className="hover:text-[#F0B90B] transition-colors font-black text-2xl uppercase tracking-tighter">Log In</button>
              <button onClick={() => setView('signup')} className="bg-[#F0B90B] text-black px-12 py-5 rounded-2xl font-black text-2xl uppercase hover:scale-105 transition-all shadow-2xl active:scale-95">Register</button>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <div className="hidden sm:flex items-center gap-4 bg-[#1e2329] px-8 py-4 rounded-2xl border-4 border-[#F0B90B]/20">
                <ShieldCheck size={28} className="text-[#F0B90B]" />
                <span className="text-lg font-black text-[#F0B90B] uppercase">Vault Secured</span>
              </div>
              <button onClick={onLogout} className="bg-red-500 text-white px-10 py-4 rounded-2xl font-black text-xl uppercase transition-all shadow-xl hover:bg-red-600">
                <LogOut size={24} className="inline mr-3" /> Exit
              </button>
            </div>
          )}
          <button className="lg:hidden p-4 text-[#F0B90B] bg-[#1e2329] rounded-2xl border-2 border-[#2b2f36]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <X size={40} /> : <Menu size={40} />}</button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0b0e11] border-b-8 border-[#2b2f36] p-12 flex flex-col gap-10 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-8 font-black text-4xl uppercase tracking-tighter"><NavItems /></div>
        </div>
      )}
    </nav>
  );
};
