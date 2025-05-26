export interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  lastActive: string; // ISO date string
}

export interface UpdateGamificationInput {
  xpDelta?: number;
  streakDelta?: number;
  resetStreak?: boolean;
  setLastActive?: string;
} 