import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from './contextApi/ThemeContext';
import "./styles.css";
import App from "./App.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <StrictMode>
  <ThemeProvider>
      <App />
    </ThemeProvider>
    </StrictMode>
  </Provider>
);
