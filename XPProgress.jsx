import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { TaskContext } from '../../contexts/TaskContext';

// XP Progress component displays the user's level and XP progress
const XPProgress = () => {
  const { user } = useContext(UserContext);
  
  // Define XP thresholds for each level
  const levelThresholds = [0, 100, 250, 500, 1000, 2000];
  
  // Calculate progress percentage for current level
  const currentLevelXP = user.xp - (user.level > 1 ? levelThresholds[user.level - 1] : 0);
  const nextLevelXP = levelThresholds[user.level] - (user.level > 1 ? levelThresholds[user.level - 1] : 0);
  const progressPercentage = Math.min(100, (currentLevelXP / nextLevelXP) * 100);
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">Level {user.level}</h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">{user.xp} XP</span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-dark-300 rounded-full h-2.5">
        <div 
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs mt-1">
        <span>{currentLevelXP} XP</span>
        <span>{nextLevelXP} XP</span>
      </div>
      
      {user.level < 6 && (
        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
          {nextLevelXP - currentLevelXP} XP bis Level {user.level + 1}
        </p>
      )}
      
      {user.level === 6 && (
        <p className="text-sm mt-2 text-accent-600 dark:text-accent-400">
          Maximales Level erreicht!
        </p>
      )}
    </div>
  );
};

export default XPProgress;
