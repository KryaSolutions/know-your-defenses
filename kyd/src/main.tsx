import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import CalcWrapper from "./components/CalcWrapper";
import SurveyWrapper from "./components/SurveyWrapper";
import Footer from "./components/Footer";
import Bot from "./components/Bot";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Navbar />
        <Header />
        <CalcWrapper />
        <SurveyWrapper />
        <Footer />
        <Bot />
    </StrictMode>
);
