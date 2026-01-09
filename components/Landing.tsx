
import React, { useState, useEffect } from 'react';
import { AppView, CryptoPrice } from '../types';
import { BRAND_COLOR, TEXT_SECONDARY } from '../constants';
import { TrendingUp, ShieldCheck, Zap, Users, ArrowRight, BarChart2 } from 'lucide-react';
import { CryptoPriceBar } from './CryptoPriceBar';

interface LandingProps {
  setView: (view: AppView) => void;
}

export const Landing: React.FC<LandingProps> = ({ setView }) => {
  const [livePrices, setLivePrices] = useState<CryptoPrice[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();
        const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT'];
        const updated = data
          .filter((item: any) => symbols.includes(item.symbol))
          .map((item: any) => ({
            symbol: item.symbol.replace('USDT', ''),
            name: item.symbol.replace('USDT', ''),
            price: parseFloat(item.lastPrice),
            change24h: parseFloat(item.priceChangePercent),
          }));
        setLivePrices(updated);
      } catch (e) {
        console.error("Landing price fetch error", e);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-24 font-bold">
      <CryptoPriceBar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 w-full flex flex-col lg:flex-row items-center gap-16 mt-16">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 leading-[1] tracking-tighter">
            Welcome to <span className="text-[#F0B90B]">AI Auto Staking</span>
          </h1>
          <p className="text-2xl md:text-3xl text-[#848e9c] mb-12 max-w-4xl mx-auto lg:mx-0 leading-tight font-extrabold uppercase tracking-tight">
            The ultimate crypto investment platform for 2026. Experience the power of AI-driven automated trades.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
            <button 
              onClick={() => setView('signup')}
              className="w-full sm:w-auto bg-[#F0B90B] text-black px-12 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-transform flex items-center justify-center gap-4 shadow-[0_12px_40px_rgb(240,185,11,0.3)] uppercase"
            >
              Sign up now <ArrowRight size={32} />
            </button>
            <button 
              onClick={() => setView('whitepaper')}
              className="w-full sm:w-auto bg-[#1e2329] border-4 border-[#474d57] px-12 py-7 rounded-2xl font-black text-2xl hover:bg-[#2b2f36] transition-colors uppercase"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-1 relative w-full lg:max-w-[700px]">
          <div className="aspect-video bg-[#1e2329] rounded-[3rem] overflow-hidden border-8 border-[#2b2f36] shadow-2xl relative group">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/P_N78vUqXnQ?autoplay=1&mute=1&loop=1&playlist=P_N78vUqXnQ" 
              title="Crypto Trading Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="absolute -bottom-10 -right-10 bg-[#F0B90B] p-10 rounded-full border-8 border-[#0b0e11] shadow-2xl hidden md:block animate-bounce">
            <div className="text-black font-black text-5xl">10%</div>
            <div className="text-xs uppercase tracking-widest font-black text-black">Profit Hourly</div>
          </div>
        </div>
      </section>

      {/* Live Market Snapshot Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Market <span className="text-[#F0B90B]">Pulse</span></h2>
          <div className="flex items-center gap-4 text-[#F0B90B] font-black uppercase text-sm tracking-[0.3em] bg-[#1e2329] px-8 py-3 rounded-full border-2 border-[#2b2f36]">
            <BarChart2 size={24} /> Real-time Binance API
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {livePrices.map(coin => (
            <div key={coin.symbol} className="bg-[#1e2329] p-10 rounded-[2.5rem] border-4 border-[#2b2f36] hover:border-[#F0B90B] transition-all flex flex-col items-center gap-4 group">
              <span className="text-xl font-black text-[#848e9c] uppercase tracking-widest group-hover:text-[#F0B90B]">{coin.symbol}</span>
              <span className="text-3xl font-black font-mono tracking-tighter text-[#eaecef]">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className={`text-sm font-black px-4 py-1.5 rounded-full ${coin.change24h >= 0 ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[#1e2329] py-32 mt-20 border-y-8 border-[#F0B90B]/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          <FeatureCard 
            icon={<Zap className="text-[#F0B90B]" size={60} />}
            title="Instant AI Execution"
            description="Our bot scans 100+ exchanges to fetch the best market opportunities instantly."
          />
          <FeatureCard 
            icon={<TrendingUp className="text-[#F0B90B]" size={60} />}
            title="Hourly Accumulation"
            description="Earn 10% profit on your deposited amount every single hour. Watch it grow."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-[#F0B90B]" size={60} />}
            title="BSC Consolidation"
            description="All funds are consolidated into a high-security vault with BEP20 technology."
          />
        </div>
      </section>

      {/* Earnings Tier */}
      <section className="max-w-7xl mx-auto px-4 py-24 w-full">
        <h2 className="text-6xl md:text-8xl font-black text-center mb-24 tracking-tighter uppercase">Earnings <span className="text-[#F0B90B]">Potential</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <EarningTier amount={100} hourly={10} />
          <EarningTier amount={1000} hourly={100} featured />
          <EarningTier amount={10000} hourly={1000} />
        </div>
      </section>

      {/* Referral */}
      <section className="max-w-6xl mx-auto px-4 text-center py-24">
        <div className="bg-[#F0B90B] p-16 md:p-24 rounded-[4rem] text-black shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10"><Users size={300} /></div>
          <h2 className="text-6xl md:text-8xl font-black mb-10 leading-none uppercase tracking-tighter">Referral System</h2>
          <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-tight font-black uppercase">
            Share your link and earn <span className="underline decoration-8">2% bonus</span> on every deposit!
          </p>
          <div className="bg-black/10 p-8 rounded-3xl font-mono text-xl md:text-2xl break-all mb-10 border-4 border-black/20">
            https://aiautostakingtrading.com/ref/USER_ID
          </div>
          <button className="bg-black text-[#F0B90B] px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase">
            Copy My Link
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col gap-8 p-12 bg-[#0b0e11] rounded-[3rem] border-4 border-[#2b2f36] hover:border-[#F0B90B] transition-all text-center">
    <div className="flex justify-center">{icon}</div>
    <h3 className="text-3xl font-black uppercase tracking-tight">{title}</h3>
    <p className="text-[#848e9c] text-xl font-bold leading-tight">{description}</p>
  </div>
);

const EarningTier = ({ amount, hourly, featured }: { amount: number, hourly: number, featured?: boolean }) => (
  <div className={`p-16 rounded-[4rem] border-8 ${featured ? 'border-[#F0B90B] bg-[#1e2329] scale-110' : 'border-[#2b2f36] bg-[#0b0e11]'} flex flex-col items-center gap-10 transition-all shadow-2xl`}>
    <div className="text-xl text-[#848e9c] uppercase font-black tracking-[0.4em]">Deposit</div>
    <div className="text-7xl font-black tracking-tighter">${amount.toLocaleString()}</div>
    <div className="w-full h-2 bg-[#2b2f36]"></div>
    <div className="text-xl text-[#848e9c] uppercase font-black tracking-[0.4em]">Payout</div>
    <div className="text-5xl font-black text-[#F0B90B]">${hourly.toLocaleString()} / HR</div>
  </div>
);
