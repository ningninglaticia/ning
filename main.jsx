import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import AdvisorContextProvider from "./context/AdvisorContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <AdvisorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </AdvisorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
