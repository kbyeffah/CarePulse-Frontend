import React, { createContext, useState, useEffect } from 'react';

// Create the Theme Context
export const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Apply the theme to the root element and save to localStorage
  useEffect(() => {
    document.documentElement.className = theme; // Apply theme class to <html>
    localStorage.setItem('theme', theme); // Persist theme
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};