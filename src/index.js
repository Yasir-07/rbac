import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import App from "./App";

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const theme = createTheme({
  palette: {
    mode: isDarkMode ? "dark" : "light",
    primary: {
      main: getComputedStyle(document.documentElement)
        .getPropertyValue("--primary-color")
        .trim(),
    },
    secondary: {
      main: getComputedStyle(document.documentElement)
        .getPropertyValue("--secondary-color")
        .trim(),
    },
    background: {
      default: getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim(),
      paper: isDarkMode ? "#1e1e1e" : "#ffffff",
    },
    text: {
      primary: getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim(),
      secondary: isDarkMode ? "#a9a9a9" : "#5f6368",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: "2.2rem",
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: "1.75",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
