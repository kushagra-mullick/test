// Service for managing badges and achievements
// TODO: Implement badge logic and connect to user actions

import { supabase } from '@/integrations/supabase/client';
import { Badge, UserBadge } from '@/types/badges';

// Get all possible badges
export const getAllBadges = async (): Promise<Badge[]> => {
  const { data, error } = await supabase.from('badges').select('*');
  if (error) throw error;
  return data as Badge[];
};

// Get all badges unlocked by a user
export const getUserBadges = async (userId: string): Promise<UserBadge[]> => {
  const { data, error } = await supabase
    .from('user_badges')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data as UserBadge[];
};

// Unlock a badge for a user (if not already unlocked)
export const unlockBadge = async (userId: string, badgeId: string): Promise<boolean> => {
  // Check if already unlocked
  const { data: existing } = await supabase
    .from('user_badges')
    .select('id')
    .eq('user_id', userId)
    .eq('badge_id', badgeId)
    .maybeSingle();
  if (existing) return false;
  // Insert new user_badge
  const { error } = await supabase
    .from('user_badges')
    .insert({ user_id: userId, badge_id: badgeId });
  if (error) throw error;
  return true;
};

// Check if user has a badge
export const hasBadge = async (userId: string, badgeId: string): Promise<boolean> => {
  const { data } = await supabase
    .from('user_badges')
    .select('id')
    .eq('user_id', userId)
    .eq('badge_id', badgeId)
    .maybeSingle();
  return !!data;
}; 