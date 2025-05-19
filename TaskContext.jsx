import React, { createContext } from 'react';

// Create a context for task data and functions
export const TaskContext = createContext({
  tasks: [],
  setTasks: () => {},
  completeTask: () => {},
  addTask: () => {}
});
