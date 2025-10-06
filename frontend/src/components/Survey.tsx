import { useState, useEffect, useContext } from "react";
import { ResponseContext } from "./Hero";
import type { ResponseContextType } from "./Hero";
import assessmentData from "../utilities/assessmentMeta";
import Questions from "./Questions";
import type { assessmentType } from "../utilities/assessmentMeta";

const Survey = () => {
    const context = useContext<ResponseContextType | null>(ResponseContext);
    if (!context) return null;
    const { response } = context;

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
                {assessmentData.map((assessment) => {
                    // Total questions in this assessment
                    const totalQuestions = Object.values(
                        assessment.questions
                    ).reduce(
                        (sum, category) => sum + category.questions.length,
                        0
                    );

                    // Questions answered from response
                    const answeredCount = Object.values(
                        response[assessment.title] || {}
                    ).reduce((sum, category: any) => {
                        return (
                            sum +
                            Object.keys(category).filter(
                                (key) => !isNaN(Number(key))
                            ).length
                        );
                    }, 0);

                    const progressPercent =
                        totalQuestions > 0
                            ? Math.round((answeredCount / totalQuestions) * 100)
                            : 0;

                    return (
                        <li
                            key={assessment.title}
                            className="p-6 rounded-xl bg-white shadow-sm border border-gray-200 transition hover:shadow-md"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                {assessment.title}
                            </h2>

                            <p className="text-gray-600 mb-4">
                                {assessment.desc}
                            </p>

                            {/* Progress bar and button in the same row - always visible */}
                            <div className="flex items-center gap-4">
                                {/* Progress section */}
                                <div className="flex-1">
                                    {/* Text above the progress bar */}
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600">
                                            {answeredCount}/{totalQuestions}{" "}
                                            answered
                                        </span>
                                        <span className="text-sm font-medium text-blue-600">
                                            {progressPercent}%
                                        </span>
                                    </div>

                                    {/* Colored progress bar */}
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[var(--brand-light-blue)] transition-all duration-500"
                                            style={{
                                                width: `${progressPercent}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() =>
                                        handleStartAssessment(assessment)
                                    }
                                    className="px-5 py-2.5 rounded-lg bg-[var(--brand-blue)] text-white font-medium transition whitespace-nowrap"
                                    tabIndex={-1}
                                >
                                    Start Assessment
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {selectedAssessment && (
                <div
                    className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity duration-300 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div
                        className={`bg-white rounded-t-2xl shadow-2xl w-full max-w-4xl h-[90vh] relative transform transition-all duration-300 ${
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
                                assessment={selectedAssessment.title}
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

export default Survey;
