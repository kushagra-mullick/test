export type PvPBattleStatus = 'waiting_for_opponent' | 'in_progress' | 'completed';

export interface PvPBattle {
  battleId: string;
  userIds: string[];
  status: PvPBattleStatus;
  startedAt: string;
  completedAt?: string;
  winnerId?: string;
}

export interface PvPBattleResult {
  status: PvPBattleStatus;
  winnerId?: string;
} 