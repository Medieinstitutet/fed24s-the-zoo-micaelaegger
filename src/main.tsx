import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ZooApp } from "./components/ZooApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ZooApp />
  </StrictMode>
);
