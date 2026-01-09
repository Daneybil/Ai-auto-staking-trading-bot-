
import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { Copy, ShieldAlert, ArrowRight, RefreshCcw, CheckCircle2 } from 'lucide-react';

interface SignupProps {
  onSignup: (phrase: string) => void;
  setView: (view: AppView) => void;
}

const WORD_LIST = [
  "ocean", "mountain", "crypto", "stable", "wealth", "secure", "future", "profit",
  "liquid", "token", "chain", "neural", "logic", "trade", "market", "active",
  "unlimited", "system", "earn", "payout", "stake", "hourly", "vault", "asset"
];

export const Signup: React.FC<SignupProps> = ({ onSignup, setView }) => {
  const [phrase, setPhrase] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generatePhrase = () => {
    const newPhrase = [];
    for (let i = 0; i < 12; i++) {
      newPhrase.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
    }
    setPhrase(newPhrase);
    setCopied(false);
  };

  useEffect(() => {
    generatePhrase();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(phrase.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      onSignup(phrase.join(' '));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 px-4 pb-24 font-black">
      <div className="bg-[#1e2329] p-12 md:p-16 rounded-[3.5rem] border-4 border-[#2b2f36] shadow-2xl">
        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-center uppercase">Secure Your AI</h2>
        <p className="text-xl text-[#848e9c] mb-12 text-center font-black uppercase tracking-tight">Your 12-word recovery phrase is the ONLY way to access your funds.</p>
        
        <div className="bg-red-500/10 border-4 border-red-500/20 p-8 rounded-3xl mb-12 flex items-start gap-6">
          <ShieldAlert className="text-red-500 shrink-0" size={48} />
          <div>
            <h4 className="text-red-500 text-2xl font-black uppercase mb-2">Warning: Never Share This!</h4>
            <p className="text-red-400/80 text-lg font-bold leading-tight uppercase">If you lose this phrase, you lose access to your staking balance forever. Write it down on paper.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {phrase.map((word, idx) => (
            <div key={idx} className="bg-[#0b0e11] border-2 border-[#2b2f36] p-5 rounded-2xl flex items-center gap-4">
              <span className="text-[#848e9c] text-xs font-black">{idx + 1}.</span>
              <span className="text-xl md:text-2xl font-black text-[#F0B90B] tracking-tight">{word}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <button 
              onClick={handleCopy}
              className="flex-1 bg-[#2b2f36] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#474d57] transition-all flex items-center justify-center gap-3 uppercase shadow-xl"
            >
              {copied ? <CheckCircle2 size={24} className="text-green-500" /> : <Copy size={24} />}
              {copied ? 'Phrase Copied' : 'Copy Phrase'}
            </button>
            <button 
              onClick={generatePhrase}
              className="bg-[#2b2f36] p-6 rounded-2xl hover:bg-[#474d57] transition-all"
            >
              <RefreshCcw size={32} />
            </button>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full bg-[#F0B90B] text-black py-8 rounded-3xl font-black text-4xl hover:bg-[#d8a60a] transition-all shadow-[0_20px_50px_rgba(240,185,11,0.3)] active:scale-95 flex items-center justify-center gap-4 uppercase ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? 'Securing Vault...' : 'I Have Saved It'}
            {!loading && <ArrowRight size={40} />}
          </button>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-[#848e9c] font-black uppercase mb-4">Already have a phrase?</p>
          <button 
            onClick={() => setView('login')} 
            className="text-2xl text-[#F0B90B] font-black hover:underline underline-offset-8 transition-all uppercase"
          >
            Import Existing Vault
          </button>
        </div>
      </div>
    </div>
  );
};
