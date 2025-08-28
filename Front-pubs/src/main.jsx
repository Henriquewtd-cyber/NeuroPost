import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DadosProvider } from "./context/DadosContext";
import Modal from "react-modal";

import "./index.css";
import Routes from "./routes";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <DadosProvider>
    <BrowserRouter>
      <main>
        <Routes />
      </main>
    </BrowserRouter>
  </DadosProvider>
  //</StrictMode>
);
