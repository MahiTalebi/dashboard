import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { AppProvider } from "./contexts/app/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>
);
