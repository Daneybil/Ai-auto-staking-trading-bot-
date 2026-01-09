
import React, { useState, useEffect } from 'react';
import { CryptoPrice } from '../types';

export const CryptoPriceBar: React.FC = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC', name: 'Bitcoin', price: 0, change24h: 0 },
    { symbol: 'BNB', name: 'BNB', price: 0, change24h: 0 },
    { symbol: 'ETH', name: 'Ethereum', price: 0, change24h: 0 },
    { symbol: 'ADA', name: 'Cardano', price: 0, change24h: 0 },
    { symbol: 'TRX', name: 'TRON', price: 0, change24h: 0 },
  ]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Use a more reliable endpoint for simple price fetching
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        const symbolsToTrack = ['BTCUSDT', 'BNBUSDT', 'ETHUSDT', 'ADAUSDT', 'TRXUSDT'];
        
        const updatedPrices = data
          .filter((item: any) => symbolsToTrack.includes(item.symbol))
          .map((item: any) => ({
            symbol: item.symbol.replace('USDT', ''),
            name: item.symbol.replace('USDT', ''),
            price: parseFloat(item.lastPrice),
            change24h: parseFloat(item.priceChangePercent),
          }));

        if (updatedPrices.length > 0) {
          // Maintain the order requested: BTC, BNB, ETH, ADA, TRX
          const ordered = symbolsToTrack.map(s => 
            updatedPrices.find((p: any) => p.symbol === s.replace('USDT', ''))
          ).filter(Boolean);
          
          setPrices(ordered as CryptoPrice[]);
        }
      } catch (error) {
        console.error('Error fetching real-time prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 8000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#1e2329] border-y border-[#2b2f36] overflow-hidden py-4 whitespace-nowrap shadow-2xl">
      <div className="inline-block animate-marquee">
        {[...prices, ...prices, ...prices].map((crypto, idx) => (
          <div key={`${crypto.symbol}-${idx}`} className="inline-flex items-center gap-5 mx-10 text-sm font-black">
            <span className="text-[#F0B90B] uppercase tracking-widest">{crypto.symbol}</span>
            <span className="text-[#eaecef] font-mono text-base">
              {crypto.price > 0 ? `$${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '---'}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${crypto.change24h >= 0 ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
              {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};
