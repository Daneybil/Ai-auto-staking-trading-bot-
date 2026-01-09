
import React from 'react';
import { Headphones, MessageCircle, Mail, HelpCircle, FileText } from 'lucide-react';

export const Support: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 font-black">
      <h1 className="text-6xl md:text-8xl font-black mb-16 text-center tracking-tighter uppercase">Vault <span className="text-[#F0B90B]">Support</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="bg-[#1e2329] p-12 rounded-[3.5rem] border-4 border-[#2b2f36]">
          <h2 className="text-4xl font-black mb-8 flex items-center gap-4 uppercase"><MessageCircle className="text-[#F0B90B]" size={40} /> Live Desk</h2>
          <p className="text-[#848e9c] text-xl mb-10 leading-tight font-bold uppercase tracking-tight">Our engineers are available 24/7 to help with recovery phrase and multi-chain settlement issues.</p>
          <button className="bg-[#F0B90B] text-black w-full py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-transform uppercase shadow-2xl">Open Live Chat</button>
        </div>
        
        <div className="bg-[#1e2329] p-12 rounded-[3.5rem] border-4 border-[#2b2f36]">
          <h2 className="text-4xl font-black mb-8 flex items-center gap-4 uppercase"><Mail className="text-[#F0B90B]" size={40} /> Verification</h2>
          <p className="text-[#848e9c] text-xl mb-10 leading-tight font-bold uppercase tracking-tight">For institutional KYC or large-scale consolidation, contact our compliance desk directly.</p>
          <a href="mailto:admin@aiautostaking.com" className="bg-[#2b2f36] text-white block text-center w-full py-7 rounded-2xl font-black text-2xl hover:bg-[#474d57] transition-all uppercase shadow-2xl">admin@aiautostaking.com</a>
        </div>
      </div>

      <div className="bg-[#1e2329] p-12 md:p-20 rounded-[4rem] border-8 border-[#F0B90B]/10 shadow-2xl">
        <h2 className="text-5xl font-black mb-16 text-center uppercase tracking-tighter">Automatic Settlement FAQ</h2>
        <div className="space-y-12">
          <HelpItem question="What is the minimum stake?" answer="The minimum requirement is exactly $100 USD. Our neural bot does not generate signals for smaller liquidity amounts." />
          <HelpItem question="How does automatic crediting work?" answer="Our blockchain scanner monitors BTC, ETH, and BSC mainnets. Once your transaction hits 3 confirmations, the AI core automatically updates your dashboard principal." />
          <HelpItem question="I lost my recovery phrase, what now?" answer="Because we use true decentralized vaulting, there is no 'Forgot Password'. If you lose your 12 words, the assets are locked in the smart contract forever." />
        </div>
      </div>
    </div>
  );
};

const HelpItem = ({ question, answer }: { question: string, answer: string }) => (
  <div className="border-b-4 border-[#2b2f36] pb-10">
    <h4 className="text-2xl font-black text-[#F0B90B] mb-4 uppercase tracking-tighter">{question}</h4>
    <p className="text-[#848e9c] text-xl font-black uppercase leading-tight tracking-tight opacity-80">{answer}</p>
  </div>
);
