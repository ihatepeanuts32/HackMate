// Vaishali - Dark Mode Toggle
// Description: this code implements a toggle button to switch betwee light and dark modes

import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  //checks whether dark mode is enabled and applies class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

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