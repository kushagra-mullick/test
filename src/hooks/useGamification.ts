import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  getGamificationState,
  initializeGamificationState,
  updateGamificationState,
} from '@/services/gamificationService';
import { GamificationState, UpdateGamificationInput } from '@/types/gamification';

// Hook to provide gamification state and update methods for the current user
export function useGamification() {
  const { user } = useAuth();
  const [state, setState] = useState<GamificationState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load or initialize gamification state
  useEffect(() => {
    if (!user) {
      setState(null);
      return;
    }
    setLoading(true);
    getGamificationState(user.id)
      .then((data) => {
        if (!data) {
          // Initialize if not found
          return initializeGamificationState(user.id);
        }
        return data;
      })
      .then((data) => setState(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user]);

  // Update gamification state
  const update = useCallback(
    async (input: UpdateGamificationInput) => {
      if (!user) return;
      setLoading(true);
      try {
        const updated = await updateGamificationState(user.id, input);
        setState(updated);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return { state, loading, error, update };
} 