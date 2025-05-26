export interface Quest {
  id: string;
  name: string;
  description: string;
  type: QuestType;
  reward: string;
  amount: number;
}

export type QuestType = 'deck' | 'study' | 'misc';

export interface UserQuest {
  userId: string;
  questId: string;
  completed: boolean;
  completedAt?: string;
} 