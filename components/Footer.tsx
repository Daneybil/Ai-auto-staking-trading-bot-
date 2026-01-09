
import React from 'react';
import { BINANCE_SOCIALS, BRAND_COLOR } from '../constants';
import { Twitter, Facebook, MessageCircle, Instagram, Github, ArrowRight } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  setView: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-[#0b0e11] border-t border-[#2b2f36] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="flex flex-col gap-8">
           <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-[#F0B90B] p-2 rounded-xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M12 0l4.3 4.3L12 8.6l-4.3-4.3L12 0zm-8.6 8.6L7.7 12.9 3.4 17.2l-3.4-4.3 3.4-4.3zm17.2 0l3.4 4.3-3.4 4.3-4.3-4.3 4.3-4.3zM12 11.4l4.3 4.3L12 20l-4.3-4.3 4.3-4.3zm0 8.6l3.4 4.3L12 24l-3.4-4.3L12 20z" /></svg>
            </div>
            <span className="text-2xl font-black tracking-tight uppercase">AI AUTO STAKE</span>
          </div>
          <p className="text-[#848e9c] text-lg leading-relaxed font-medium">Reaching unlimited earnings potential in 2026 through neural high-frequency staking architecture.</p>
        </div>
        <div className="flex flex-col gap-8">
          <h4 className="font-black text-xl uppercase tracking-widest text-[#F0B90B]">Ecosystem</h4>
          <ul className="text-[#eaecef] text-lg font-bold space-y-4 uppercase">
            <li className="hover:text-[#F0B90B] cursor-pointer flex items-center gap-2 group" onClick={() => setView('markets')}>Live Markets <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" /></li>
            <li className="hover:text-[#F0B90B] cursor-pointer flex items-center gap-2 group" onClick={() => setView('services')}>AI Bots <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" /></li>
            <li className="hover:text-[#F0B90B] cursor-pointer flex items-center gap-2 group" onClick={() => setView('whitepaper')}>Whitepaper <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" /></li>
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <h4 className="font-black text-xl uppercase tracking-widest text-[#F0B90B]">Legal</h4>
          <ul className="text-[#eaecef] text-lg font-bold space-y-4 uppercase">
            <li className="hover:text-[#F0B90B] cursor-pointer flex items-center gap-2 group" onClick={() => setView('terms')}>Terms of Service <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" /></li>
            <li className="hover:text-[#F0B90B] cursor-pointer flex items-center gap-2 group" onClick={() => setView('support')}>Help Center <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" /></li>
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <h4 className="font-black text-xl uppercase tracking-widest text-[#F0B90B]">Community</h4>
          <div className="flex flex-wrap gap-5">
            <SocialIcon href={BINANCE_SOCIALS.twitter} icon={<Twitter size={24} />} />
            <SocialIcon href={BINANCE_SOCIALS.telegram} icon={<MessageCircle size={24} />} />
            <SocialIcon href={BINANCE_SOCIALS.instagram} icon={<Instagram size={24} />} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-[#2b2f36] pt-12 text-center">
        <p className="text-[#848e9c] text-sm font-bold uppercase tracking-[0.3em] mb-4">© 2026 AI AUTO STAKING TRADING | UNLIMITED POTENTIAL</p>
        <p className="text-[#848e9c]/40 text-[10px] max-w-4xl mx-auto uppercase tracking-widest font-bold leading-loose">All assets consolidated into secure TRC20 vaults. 90-day lockup applies to all deposits. High-yield rewards calculated by AI neural core.</p>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="bg-[#1e2329] p-4 rounded-2xl text-[#848e9c] hover:text-black hover:bg-[#F0B90B] transition-all border border-[#2b2f36]">{icon}</a>
);
