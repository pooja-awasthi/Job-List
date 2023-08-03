import React, { createContext, useContext, useState, useEffect } from "react";

// `createContext` used to create Context Object.
export const ThemeContext = createContext();

// `useContext` custom API hook is created of context API.
export const useTheme = () => useContext(ThemeContext);

// Context API - `ThemeProvider` created to handle Day Night Theme across App.
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * LocalStorage variable taken to check theme prefrence on window switch etc, events.
   */

  useEffect(() => {
    const storedTheme = localStorage.getItem("isDarkMode");
    if (storedTheme) {
      setIsDarkMode(JSON.parse(storedTheme));
    }
  }, []);

  /**
   * LocalStorage variable is set.
   */
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</ThemeContext.Provider>
  );
};
