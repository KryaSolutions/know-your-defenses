import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Header from "./components/Header";
import CalcWrapper from "./components/CalcWrapper";
import SurveyWrapper from "./components/SurveyWrapper";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Header />
        <CalcWrapper />
        <SurveyWrapper />
    </StrictMode>
);
