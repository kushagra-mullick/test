import { supabase } from '@/integrations/supabase/client';
import { GamificationState, UpdateGamificationInput } from '@/types/gamification';

// Table: gamification_state (user_id, xp, level, streak, last_active)

export const getGamificationState = async (userId: string): Promise<GamificationState | null> => {
  const { data, error } = await supabase
    .from('gamification_state')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data as GamificationState;
};

export const initializeGamificationState = async (userId: string): Promise<GamificationState> => {
  const initialState: GamificationState = {
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from('gamification_state')
    .insert({ user_id: userId, ...initialState })
    .select()
    .single();
  if (error) throw error;
  return data as GamificationState;
};

export const updateGamificationState = async (
  userId: string,
  input: UpdateGamificationInput
): Promise<GamificationState> => {
  // Fetch current state
  const current = await getGamificationState(userId);
  if (!current) throw new Error('Gamification state not initialized');

  let { xp, level, streak, lastActive } = current;
  if (input.xpDelta) xp += input.xpDelta;
  if (input.streakDelta) streak += input.streakDelta;
  if (input.resetStreak) streak = 0;
  if (input.setLastActive) lastActive = input.setLastActive;

  // Level up logic: 100 XP per level (customize as needed)
  while (xp >= level * 100) {
    xp -= level * 100;
    level += 1;
  }

  const { data, error } = await supabase
    .from('gamification_state')
    .update({ xp, level, streak, last_active: lastActive })
    .eq('user_id', userId)
    .select()
    .single();
  if (error) throw error;
  return data as GamificationState;
}; 