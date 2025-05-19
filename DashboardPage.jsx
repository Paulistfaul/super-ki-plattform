import React, { useContext } from 'react';
import XPProgress from '../components/dashboard/XPProgress';
import TaskList from '../components/dashboard/TaskList';
import StreakCalendar from '../components/dashboard/StreakCalendar';
import { UserContext } from '../contexts/UserContext';

// Dashboard page component - the main landing page of the app
const DashboardPage = () => {
  const { user } = useContext(UserContext);
  
  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-2">Willkommen zurück, Paul!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Du bist auf Level {user.level} deiner KI-Lernreise. Setze deinen Fortschritt fort und erreiche dein Ziel, eine "Super-KI" zu entwickeln!
        </p>
      </div>
      
      {/* Dashboard grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* XP Progress */}
        <XPProgress />
        
        {/* Streak Calendar */}
        <StreakCalendar />
        
        {/* Task List */}
        <div className="md:col-span-2">
          <TaskList />
        </div>
        
        {/* Quick stats */}
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Deine Statistiken</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-dark-300 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Erledigte Aufgaben</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {user.completedTasks || 0}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-300 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Aktuelle Streak</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {user.streak} Tage
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-300 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Gesammelte XP</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {user.xp}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-300 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Badges</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {user.badges?.length || 0}
              </p>
            </div>
          </div>
        </div>
        
        {/* Next steps */}
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Nächste Schritte</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-accent-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Schließe deine täglichen Aufgaben ab</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-accent-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Arbeite an deinem wöchentlichen Projekt</span>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-accent-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Führe deine wöchentliche Reflexion durch</span>
            </li>
          </ul>
          <button className="btn-primary w-full mt-4">
            Zur Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
