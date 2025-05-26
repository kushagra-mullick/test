export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // URL or icon name
  type: BadgeType;
}

export type BadgeType = 'streak' | 'xp' | 'quest' | 'misc';

export interface UserBadge {
  userId: string;
  badgeId: string;
  unlockedAt: string; // ISO date
} 