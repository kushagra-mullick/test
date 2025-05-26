import React from 'react';

interface StreakCounterProps {
  streak: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
  return (
    <div className="flex items-center gap-2 my-2">
      <span className="text-2xl">🔥</span>
      <span className="text-lg font-semibold text-orange-600">{streak} day streak</span>
    </div>
  );
}; 