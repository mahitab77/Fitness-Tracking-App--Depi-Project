import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./lib/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
