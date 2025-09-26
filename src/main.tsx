import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Hero from "./components/Hero";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Hero />
    </StrictMode>
);
