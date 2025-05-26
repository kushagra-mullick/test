export type BossBattleStatus = 'not_started' | 'in_progress' | 'completed';

export interface BossBattle {
  battleId: string;
  userId: string;
  topicId: string;
  status: BossBattleStatus;
  startedAt: string;
  completedAt?: string;
}

export interface BossBattleResult {
  status: BossBattleStatus;
  reward?: string;
  amount?: number;
} 