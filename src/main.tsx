import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/navbar";
import "./index.css";

const [darkMode, setDarkMode] = useState<boolean>(true);
const [showResults, setShowResults] = useState<boolean>(false);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Navbar />
    </StrictMode>
);
