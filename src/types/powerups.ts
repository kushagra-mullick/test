export interface PowerUp {
  id: string;
  name: string;
  description: string;
  type: PowerUpType;
  cost: number;
}

export type PowerUpType = 'hint' | 'retry' | 'streak_freeze' | 'other';

export interface UserPowerUp {
  userId: string;
  powerUpId: string;
  owned: number;
} 