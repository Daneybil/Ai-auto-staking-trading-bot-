
import React from 'react';
import { Cpu, Zap, BarChart3, Binary, ShieldCheck, Globe } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-5xl md:text-7xl font-black mb-16 text-center tracking-tighter uppercase">Our <span className="text-[#F0B90B]">AI Services</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <ServiceCard 
          icon={<Cpu size={40} className="text-[#F0B90B]" />}
          title="Neural Trading Core"
          description="Our proprietary LLM-based neural engine analyzes 10,000+ data points per second across global centralized and decentralized exchanges."
        />
        <ServiceCard 
          icon={<Zap size={40} className="text-[#F0B90B]" />}
          title="Arbitrage Flash Bots"
          description="Instant cross-chain liquidity scanning to capture price discrepancies between assets in milliseconds, ensuring 10% hourly stability."
        />
        <ServiceCard 
          icon={<BarChart3 size={40} className="text-[#F0B90B]" />}
          title="Market Sentiment Analysis"
          description="Real-time scanning of social media, news feeds, and whale wallets to predict volatility before it hits the charts."
        />
        <ServiceCard 
          icon={<Binary size={40} className="text-[#F0B90B]" />}
          title="API Infrastructure"
          description="Direct low-latency connections to top-tier exchange liquidity providers, ensuring minimal slippage on high-volume consolidated trades."
        />
        <ServiceCard 
          icon={<ShieldCheck size={40} className="text-[#F0B90B]" />}
          title="Risk Mitigation Engine"
          description="Automated stop-loss and hedging strategies that dynamically adjust according to market heatmaps to protect the principal."
        />
        <ServiceCard 
          icon={<Globe size={40} className="text-[#F0B90B]" />}
          title="Global Asset Staking"
          description="A multi-asset pool architecture that optimizes yield by rotating funds into the highest-demand staking protocols dynamically."
        />
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-[#1e2329] p-10 rounded-[2.5rem] border-2 border-[#2b2f36] hover:border-[#F0B90B]/50 transition-all group">
    <div className="mb-6 bg-[#0b0e11] w-fit p-5 rounded-3xl border border-[#2b2f36]">{icon}</div>
    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-[#848e9c] text-lg leading-relaxed font-medium">{description}</p>
  </div>
);
