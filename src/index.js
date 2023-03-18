import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MemeApp from "./MemeGen/MemeApp";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MemeApp />
  </StrictMode>
);
