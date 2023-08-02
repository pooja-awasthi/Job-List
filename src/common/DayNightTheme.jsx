import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../contextApi/ThemeContext';
// import Tooltip from './ToolTip';

const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [ isDarkTheme, setIsDarkTheme ] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    setIsDarkTheme((prevTheme) => !prevTheme);
    const root = window.document.documentElement; 
    root.classList.toggle('dark');
  };

  return (
    <div className="relative flex items-center space-x-2 cursor-pointer group">
      <button onClick={handleThemeToggle} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
        <div className={`toggle-switch relative rounded-full w-8 h-8 ${isDarkTheme ? 'bg-blue-500' : 'bg-yellow-100'}`}>
        {/* <ToolTip message={`change to ${isDarkTheme ? 'light theme' : 'dark theme'}`} addClass="pointer-events-none absolute bottom-[-40px] left-[-55px] h-auto w-max"> */}
          <FontAwesomeIcon icon={isDarkTheme ? faMoon : faSun} className="text-yellow-400 w-6 h-6 absolute left-1 right-1 top-1 bottom-1" />
        {/* </ToolTip> */}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;