import React from 'react';
import Home from "./components/Home.jsx";
import DayNightTheme from './common/DayNightTheme.jsx';
import { useTheme } from './contextApi/ThemeContext';

const App = () => {
  const { isDarkMode } = useTheme();
    console.log("inside app : ",isDarkMode)
  return (
      <div className={`${isDarkMode ?'bg-slate-900 min-h-screen' : 'bg-slate-300 h-auto min-h-screen'}`}>
        <Home />
      </div>
  );
}
export default App;