import React, { createContext } from 'react';

// Create a context for user data and functions
export const UserContext = createContext({
  user: {
    level: 1,
    xp: 0,
    streak: 0,
    badges: [],
    settings: {
      darkMode: true,
      hoursPerWeek: 15
    }
  },
  setUser: () => {},
  updateXP: () => {}
});
