export type DailyRewardType = 'coins' | 'xp' | 'badge' | 'powerup';

export interface DailyRewardStatus {
  claimed: boolean;
  nextAvailable: string; // ISO date
}

export interface DailyRewardResult {
  success: boolean;
  reward: DailyRewardType;
  amount: number;
} 