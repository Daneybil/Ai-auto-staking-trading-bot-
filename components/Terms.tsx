
import React from 'react';
import { ShieldCheck, FileText, Scale, AlertTriangle } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="flex items-center gap-6 mb-12">
        <div className="bg-[#F0B90B] p-4 rounded-3xl">
          <Scale size={40} className="text-black" />
        </div>
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">Terms of Service</h1>
          <p className="text-[#848e9c] text-xl font-medium uppercase tracking-widest">Effective Date: January 1, 2026</p>
        </div>
      </div>

      <div className="space-y-16">
        <section>
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3"><FileText className="text-[#F0B90B]" /> 1. Service Description</h2>
          <p className="text-[#848e9c] text-xl leading-relaxed font-medium">
            AI Auto Staking Trading (the "Platform") provides a simulated environment where users can delegate digital assets to high-frequency AI-driven trading algorithms. By using this platform, you acknowledge that all staking yields are calculated based on proprietary trading logic and are subject to market conditions.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3"><ShieldCheck className="text-[#F0B90B]" /> 2. Staking & Lockup Policy</h2>
          <p className="text-[#848e9c] text-xl leading-relaxed font-medium mb-6">
            All deposits made to the Platform's consolidated addresses are subject to a mandatory 90-day lockup period. During this period:
          </p>
          <ul className="list-disc list-inside text-[#848e9c] text-lg space-y-4 font-medium pl-4">
            <li>Principal funds cannot be withdrawn under any circumstances.</li>
            <li>Hourly profits are credited to your virtual dashboard balance.</li>
            <li>Yield rates of 10% hourly are guaranteed within the simulation layer.</li>
          </ul>
        </section>

        <section className="bg-red-500/10 p-10 rounded-[2.5rem] border-2 border-red-500/20">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-red-400"><AlertTriangle /> 3. Risk Disclosure</h2>
          <p className="text-red-400/80 text-lg leading-relaxed font-bold uppercase tracking-wide">
            CRYPTO TRADING INVOLVES SIGNIFICANT RISK. AI AUTO STAKING TRADING IS A PROFESSIONAL SUITE DESIGNED FOR INSTITUTIONAL CONSOLIDATION. USERS SHOULD ONLY STAKE ASSETS THEY INTEND TO HOLD FOR THE ENTIRE 90-DAY DURATION.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black mb-6">4. Referral Integrity</h2>
          <p className="text-[#848e9c] text-xl leading-relaxed font-medium">
            Referral commissions (2%) are paid directly from our marketing budget and do not affect the principal of the referred user. Any attempt to "self-refer" or manipulate the growth network will result in an immediate account suspension and forfeiture of rewards.
          </p>
        </section>
      </div>
    </div>
  );
};
