import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { DarkModeProvider } from "./context/DarkModeProvider";
import "./index.css";
import { ReservePlacesProvider } from "./context/ReservePlacesProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <ReservePlacesProvider>
        <App />
      </ReservePlacesProvider>
    </DarkModeProvider>
  </StrictMode>
);
