
export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export interface User {
  recoveryPhrase: string;
  balance: number;
  depositedAmount: number;
  referralCode: string;
  referralRewards: number;
  walletAddress: string;
  joinedAt: number;
  notifications: AppNotification[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface TradeLog {
  id: string;
  asset: string;
  type: 'BUY' | 'SELL';
  amount: number;
  profit: number;
  timestamp: number;
}

export type AppView = 'landing' | 'dashboard' | 'whitepaper' | 'login' | 'signup' | 'terms' | 'support' | 'services' | 'markets';
