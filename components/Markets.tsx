
import React, { useEffect, useRef } from 'react';

export const Markets: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "colorTheme": "dark",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "width": "100%",
        "height": "600",
        "plotLineColorGrowing": "rgba(240, 185, 11, 1)",
        "plotLineColorFalling": "rgba(240, 185, 11, 1)",
        "gridLineColor": "rgba(42, 46, 57, 0)",
        "scaleFontColor": "rgba(134, 140, 151, 1)",
        "belowLineFillColorGrowing": "rgba(240, 185, 11, 0.12)",
        "belowLineFillColorFalling": "rgba(240, 185, 11, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(240, 185, 11, 0.12)",
        "tabs": [
          {
            "title": "Crypto",
            "symbols": [
              { "s": "BINANCE:BTCUSDT" },
              { "s": "BINANCE:ETHUSDT" },
              { "s": "BINANCE:BNBUSDT" },
              { "s": "BINANCE:SOLUSDT" },
              { "s": "BINANCE:XRPUSDT" },
              { "s": "BINANCE:ADAUSDT" }
            ]
          }
        ]
      });
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">Market <span className="text-[#F0B90B]">Analytics</span></h1>
        <p className="text-[#848e9c] text-xl font-medium max-w-3xl mx-auto">Real-time technical data powered by the TradingView network, integrated directly into the AI Auto Staking execution layer.</p>
      </div>
      <div className="bg-[#1e2329] p-4 rounded-[2.5rem] border-2 border-[#2b2f36] shadow-2xl overflow-hidden min-h-[600px]">
        <div ref={containerRef} id="tradingview_widget"></div>
      </div>
    </div>
  );
};
