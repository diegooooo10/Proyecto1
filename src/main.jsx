import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { DarkModeProvider } from "./context/DarkModeProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </StrictMode>
);
