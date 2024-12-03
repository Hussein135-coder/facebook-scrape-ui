import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import DataContextProvider from "./context/DataContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <DataContextProvider>
    <Router>
      <App />
    </Router>
  </DataContextProvider>
);
