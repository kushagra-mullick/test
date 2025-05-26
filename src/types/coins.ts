export interface CoinTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earn' | 'spend';
  createdAt: string;
}

export interface UserCoins {
  userId: string;
  balance: number;
} 