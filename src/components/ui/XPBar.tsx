import React from 'react';

interface XPBarProps {
  xp: number;
  level: number;
}

// XP required for next level (customize as needed)
function xpForLevel(level: number) {
  return level * 100;
}

export const XPBar: React.FC<XPBarProps> = ({ xp, level }) => {
  const nextLevelXP = xpForLevel(level);
  const percent = Math.min(100, (xp / nextLevelXP) * 100);

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700">Level {level}</span>
        <span className="text-sm text-gray-500">{xp} / {nextLevelXP} XP</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div
          className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}; 