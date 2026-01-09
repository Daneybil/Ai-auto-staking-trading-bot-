
import React from 'react';
import { BookOpen, Target, Cpu, Database, Landmark, Shield } from 'lucide-react';

export const Whitepaper: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <div className="text-center mb-24">
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">Whitepaper <span className="text-[#F0B90B]">2.0</span></h1>
        <p className="text-[#848e9c] text-2xl md:text-3xl font-medium italic">The Future of AI-Powered Staking and Trading</p>
      </div>

      <div className="space-y-24">
        <section>
          <div className="flex items-center gap-6 mb-8">
            <Target className="text-[#F0B90B]" size={48} />
            <h2 className="text-4xl md:text-5xl font-black">1. Project Mission</h2>
          </div>
          <p className="text-[#848e9c] text-xl md:text-2xl leading-relaxed font-medium">
            AI Auto Staking Trading was established to bridge the gap between high-frequency institutional trading and individual investors. Our mission is to democratize access to sophisticated AI algorithms that scan global markets 24/7, providing consistent hourly returns to our community.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-6 mb-10">
            <Cpu className="text-[#F0B90B]" size={48} />
            <h2 className="text-4xl md:text-5xl font-black">2. Technology Stack</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#1e2329] p-10 rounded-3xl border border-[#2b2f36] shadow-xl">
              <h3 className="font-black text-2xl mb-4 flex items-center gap-3"><Database size={24} className="text-[#F0B90B]" /> Market Ingestion</h3>
              <p className="text-[#848e9c] text-lg leading-relaxed font-medium">
                Real-time data feeds from 100+ exchanges including Binance, Coinbase, and Kraken. Our proprietary engine processes 1.2M transactions per second to find arbitrage and swing opportunities.
              </p>
            </div>
            <div className="bg-[#1e2329] p-10 rounded-3xl border border-[#2b2f36] shadow-xl">
              <h3 className="font-black text-2xl mb-4 flex items-center gap-3"><Shield size={24} className="text-[#F0B90B]" /> Execution Logic</h3>
              <p className="text-[#848e9c] text-lg leading-relaxed font-medium">
                Trades are executed using a decentralized liquidity pool, ensuring that individual accounts are never liquidated. AI hedging strategies protect against sudden market crashes.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-6 mb-10">
            <Landmark className="text-[#F0B90B]" size={48} />
            <h2 className="text-4xl md:text-5xl font-black">3. Tokenomics & Rewards</h2>
          </div>
          <div className="bg-[#1e2329] p-10 rounded-[2.5rem] border-2 border-[#2b2f36]">
            <ul className="list-none space-y-8">
              <WhitepaperListItem label="Reward Rate" value="Fixed 10% hourly yield on principal." />
              <WhitepaperListItem label="Referral Incentive" value="2% direct commission on all deposits made by invites." />
              <WhitepaperListItem label="Lock-up Period" value="90 days from initial deposit for both principal and generated profit." />
              <WhitepaperListItem label="Minimum Staking" value="$100 equivalent in USDT/BNB/BTC." />
            </ul>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#1e2329] to-[#0b0e11] p-12 md:p-20 rounded-[3rem] border-4 border-[#F0B90B]/20 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Conclusion</h2>
          <p className="text-xl md:text-2xl text-[#848e9c] leading-relaxed font-medium max-w-4xl mx-auto">
            By leveraging advanced AI and a consolidated staking model, AI Auto Staking Trading provides an unparalleled investment vehicle. We invite all crypto enthusiasts to join the biggest unlimited AI staking platform of 2026.
          </p>
        </section>
      </div>
    </div>
  );
};

const WhitepaperListItem = ({ label, value }: { label: string, value: string }) => (
  <li className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
    <span className="text-[#F0B90B] font-black text-2xl min-w-[200px]">{label}:</span>
    <span className="text-[#848e9c] text-xl font-medium">{value}</span>
  </li>
);
