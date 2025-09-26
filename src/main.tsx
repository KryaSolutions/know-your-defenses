import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Hero from "./components/Hero";
import SecurityAssessmentHeader from "./components/Header";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SecurityAssessmentHeader />
        <Hero />
    </StrictMode>
);
