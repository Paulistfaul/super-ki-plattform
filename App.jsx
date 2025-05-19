import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { TaskContext } from './contexts/TaskContext';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import RoadmapPage from './pages/RoadmapPage';
import ReflectionPage from './pages/ReflectionPage';
import SettingsPage from './pages/SettingsPage';

// App component is the main entry point of the application
function App() {
  // Initialize user state with default values
  const [user, setUser] = useState(() => {
    // Try to load user data from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      level: 1,
      xp: 0,
      streak: 0,
      badges: [],
      settings: {
        darkMode: true,
        hoursPerWeek: 15
      }
    };
  });

  // Initialize tasks state with default values
  const [tasks, setTasks] = useState(() => {
    // Try to load tasks from localStorage
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    
    // Apply dark mode based on user settings
    if (user.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to update user XP and level
  const updateXP = (amount) => {
    setUser(prevUser => {
      // Calculate new XP
      const newXP = prevUser.xp + amount;
      
      // Define XP thresholds for each level
      const levelThresholds = [0, 100, 250, 500, 1000, 2000];
      
      // Calculate new level based on XP
      let newLevel = prevUser.level;
      while (newLevel < 6 && newXP >= levelThresholds[newLevel]) {
        newLevel++;
      }
      
      return {
        ...prevUser,
        xp: newXP,
        level: newLevel
      };
    });
  };

  // Function to complete a task
  const completeTask = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: true } 
          : task
      )
    );
    
    // Find the task to get its XP reward
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      updateXP(task.xpReward);
    }
  };

  // Function to add a new task
  const addTask = (task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateXP }}>
      <TaskContext.Provider value={{ tasks, setTasks, completeTask, addTask }}>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/reflection" element={<ReflectionPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </TaskContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
