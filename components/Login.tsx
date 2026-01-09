
import React, { useState } from 'react';
import { AppView } from '../types';
import { Key, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: (phrase: string) => void;
  setView: (view: AppView) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, setView }) => {
  const [phrase, setPhrase] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phrase.split(' ').length < 12) {
      alert("Please enter a valid 12-word recovery phrase.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onLogin(phrase.trim());
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 px-4 pb-24 font-black">
      <div className="bg-[#1e2329] p-12 md:p-16 rounded-[3rem] border-4 border-[#2b2f36] shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
        <div className="flex justify-center mb-8">
          <div className="bg-[#F0B90B] p-5 rounded-full shadow-2xl">
            <ShieldCheck size={48} className="text-black" />
          </div>
        </div>
        <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-center uppercase">Access Vault</h2>
        <p className="text-xl text-[#848e9c] mb-12 text-center font-extrabold uppercase tracking-tight">Enter your 12-word recovery phrase to continue.</p>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-4">
            <label className="text-xl font-black uppercase tracking-widest text-[#F0B90B] ml-1">Your 12-Word Phrase</label>
            <div className="relative">
              <textarea 
                required
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                className="w-full bg-[#0b0e11] border-4 border-[#474d57] rounded-3xl p-8 text-xl md:text-2xl outline-none focus:border-[#F0B90B] transition-all font-mono min-h-[180px] leading-relaxed"
                placeholder="word1 word2 word3..."
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-[#F0B90B] text-black py-7 rounded-2xl font-black text-3xl hover:bg-[#d8a60a] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 uppercase ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Decrypting...' : 'Restore Access'}
            {!loading && <ArrowRight size={32} />}
          </button>
        </form>
        
        <div className="mt-12 text-center">
          <p className="text-xl text-[#848e9c] font-black uppercase mb-4">Don't have a recovery phrase?</p>
          <button 
            onClick={() => setView('signup')} 
            className="text-3xl text-[#F0B90B] font-black hover:underline underline-offset-8 transition-all uppercase tracking-tighter"
          >
            Generate New Phrase
          </button>
        </div>
      </div>
    </div>
  );
};
