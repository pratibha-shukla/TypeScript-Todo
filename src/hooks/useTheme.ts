
import { useState, useEffect } from 'react';

export const useTheme = () => {
  // Check if user has a saved preference, otherwise default to 'light'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('app-theme') as 'light' | 'dark') || 'light';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Apply the class to the body for global CSS targeting
    document.body.className = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
};
