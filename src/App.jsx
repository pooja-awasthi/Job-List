import React from "react";
import Home from "./components/Home.jsx";
import { useTheme } from "./contextApi/ThemeContext";

const App = () => {
  // `isDarkMode` variable to control Day Night Theme added
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`${isDarkMode ? "bg-slate-900 min-h-screen" : "bg-slate-300 h-auto min-h-screen"}`}
    >
      <Home />
    </div>
  );
};
export default App;
