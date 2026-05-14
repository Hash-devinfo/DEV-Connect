import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";  // 👈 fix this
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);