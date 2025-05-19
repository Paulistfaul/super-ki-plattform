import React, { useState, useEffect } from 'react';

// StreakCalendar component displays a calendar with the user's learning streak
const StreakCalendar = () => {
  const [currentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  
  // Mock data for streak days - in a real app, this would come from user data
  const [streakDays] = useState(() => {
    // Generate some random streak days for the last month
    const days = [];
    const today = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      // Randomly mark some days as active (70% chance)
      if (Math.random() > 0.3) {
        days.push(date.toISOString().split('T')[0]);
      }
    }
    return days;
  });
  
  // Generate calendar days for the current month
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    // Get last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Create array of days
    const days = [];
    
    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    for (let i = firstDayOfWeek; i > 0; i--) {
      const prevDate = new Date(year, month, 1 - i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        hasStreak: streakDays.includes(prevDate.toISOString().split('T')[0])
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === new Date().toDateString(),
        hasStreak: streakDays.includes(dateString)
      });
    }
    
    // Add days from next month to fill the last week
    const lastDayOfWeek = lastDay.getDay(); // 0 = Sunday, 6 = Saturday
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        hasStreak: streakDays.includes(nextDate.toISOString().split('T')[0])
      });
    }
    
    setCalendarDays(days);
  }, [currentDate, streakDays]);
  
  // Calculate current streak
  const calculateCurrentStreak = () => {
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    // Check if today has a streak
    if (streakDays.includes(today)) {
      streak = 1;
      
      // Count backwards from yesterday
      let checkDate = new Date();
      while (true) {
        checkDate.setDate(checkDate.getDate() - 1);
        const dateString = checkDate.toISOString().split('T')[0];
        if (streakDays.includes(dateString)) {
          streak++;
        } else {
          break;
        }
      }
    }
    
    return streak;
  };
  
  const currentStreak = calculateCurrentStreak();
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Lern-Streak</h3>
        <div className="flex items-center space-x-1">
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
          <span className="font-medium">{currentStreak} Tage</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map((day, index) => (
          <div key={index} className="text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            className={`
              text-xs rounded-full w-8 h-8 mx-auto flex items-center justify-center
              ${day.isCurrentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'}
              ${day.isToday ? 'bg-primary-100 dark:bg-primary-900 font-bold' : ''}
              ${day.hasStreak ? 'bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200' : ''}
            `}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
        <div>
          <span className="inline-block w-3 h-3 bg-accent-100 dark:bg-accent-900 rounded-full mr-1"></span>
          Aktiver Tag
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-primary-100 dark:bg-primary-900 rounded-full mr-1"></span>
          Heute
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;
