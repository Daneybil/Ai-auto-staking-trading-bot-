
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, User as UserIcon } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the AI Auto Staking Vault Support. How can I assist you with your 2026 earnings strategy today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: 'You are the official AI Auto Staking Assistant. You help users with crypto staking, trading bots, and profit accumulation. You are bold, professional, and focus on the 10% hourly profit model for 2026. Always remind users of the 90-day lockup for security. Do not provide specific financial advice outside the platform scope.',
        },
      });

      const response = await chat.sendMessage({ message: input });
      const modelText = response.text || "I am currently processing market data. Please try again in a moment.";
      
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'System busy. Please ensure your connection to the Neural Core is stable.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[100] bg-[#F0B90B] text-black p-5 rounded-full shadow-[0_15px_40px_rgba(240,185,11,0.4)] hover:scale-110 active:scale-95 transition-all border-4 border-black group"
      >
        {isOpen ? <X size={32} /> : <MessageSquare size={32} className="group-hover:rotate-12 transition-transform" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-[90vw] md:w-[450px] h-[600px] bg-[#1e2329] border-4 border-[#2b2f36] rounded-[2.5rem] shadow-2xl z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-[#F0B90B] p-6 flex items-center justify-between border-b-4 border-black">
            <div className="flex items-center gap-3">
              <div className="bg-black p-2 rounded-xl">
                <Bot size={24} className="text-[#F0B90B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-black font-black uppercase text-sm tracking-tighter">AI Core Neural Assistant</span>
                <span className="text-[10px] text-black/60 font-black uppercase">Status: Online & Scanning</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black/50 hover:text-black transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Messages Container */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 ${m.role === 'user' ? 'bg-[#2b2f36] border-[#474d57]' : 'bg-[#F0B90B]/10 border-[#F0B90B]/30'}`}>
                    {m.role === 'user' ? <UserIcon size={20} className="text-[#848e9c]" /> : <Bot size={20} className="text-[#F0B90B]" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm font-bold leading-relaxed uppercase tracking-tight ${m.role === 'user' ? 'bg-[#2b2f36] text-[#eaecef]' : 'bg-[#0b0e11] text-[#F0B90B] border border-[#2b2f36]'}`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#0b0e11] p-4 rounded-2xl flex items-center gap-3">
                  <Loader2 className="animate-spin text-[#F0B90B]" size={16} />
                  <span className="text-[10px] font-black uppercase text-[#F0B90B] tracking-widest">Bot is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t-4 border-[#2b2f36] bg-[#0b0e11]">
            <div className="relative flex items-center gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about AI Staking..."
                className="flex-1 bg-[#1e2329] border-2 border-[#2b2f36] rounded-2xl p-4 pr-16 outline-none focus:border-[#F0B90B] transition-all font-bold uppercase text-xs placeholder:text-[#848e9c]"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="absolute right-2 p-3 bg-[#F0B90B] text-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
