import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import ControlSense from "./GRC";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/kyd" element={<Landing />} />
                <Route path="/control-sense" element={<ControlSense />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
