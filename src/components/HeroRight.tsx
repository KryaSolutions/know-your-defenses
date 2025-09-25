import { useState, useEffect } from "react";
import assessmentData from "../utilities/assessmentMeta";
import Questions from "./Questions";
import type { assessmentType } from "../utilities/assessmentMeta";

const HeroRight = () => {
    const [selectedAssessment, setSelectedAssessment] =
        useState<assessmentType | null>(null);

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleStartAssessment = (assessment: assessmentType) => {
        setSelectedAssessment(assessment);

        setTimeout(() => setIsVisible(true), 10);
    };

    const handleClosePopup = () => {
        setIsVisible(false);

        setTimeout(() => setSelectedAssessment(null), 300);
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClosePopup();
        };

        window.addEventListener("keydown", handleEsc);

        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <ul className="space-y-6">
                {assessmentData.map((assessment) => (
                    <li
                        key={assessment.title}
                        className="p-6 rounded-xl bg-white shadow-sm border border-gray-200 transition hover:shadow-md"
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            {assessment.title}
                        </h2>

                        <p className="text-gray-600 mb-4">{assessment.desc}</p>

                        <button
                            onClick={() => handleStartAssessment(assessment)}
                            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 hover:shadow-md transition"
                        >
                            Start Assessment
                        </button>
                    </li>
                ))}
            </ul>

            {selectedAssessment && (
                <div
                    className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity duration-300 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div
                        className={`bg-white rounded-t-2xl shadow-2xl w-full max-w-5xl h-[92vh] relative transform transition-all duration-300 ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        {/* Close button */}

                        <button
                            onClick={handleClosePopup}
                            className="absolute top-4 right-4 px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                        >
                            ✕
                        </button>

                        {/* Scrollable content */}

                        <div className="p-8 h-full overflow-y-auto scrollbar-hide">
                            <Questions
                                data={selectedAssessment.questions}
                                options={selectedAssessment.options}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroRight;
