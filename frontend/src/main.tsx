import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Assessments from "./components/Assessments";
import Survey from "./components/assessments/Survey";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Assessments />
        <Survey />
    </StrictMode>
);
