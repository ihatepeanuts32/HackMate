// Vaishali - Dark Mode Toggle
// Description: this code implements a toggle button to switch betwee light and dark modes

import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  // button details
  return (
    <div className="p-4 bg-white dark:bg-black text-pink-500 dark:text-pink-500">
      <button
        onClick={toggleTheme}
        className="px-6 py-2 bg-pink-500 text-white dark:bg-pink-500 dark:text-black rounded"
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
  
      <div className="mt-4 p-4 rounded bg-white dark:bg-black text-pink-500 dark:text-pink-500">
        {/* future content added here */}
      </div>
    </div>
  );
};

export default ThemeToggle;