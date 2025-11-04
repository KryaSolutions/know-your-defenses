import { ResponseContext } from "../SurveyWrapper";
import { useState, useEffect, useContext } from "react";
import { Shield, ChevronRight, X } from "lucide-react";
import SurveyQuestions from "./SurveyQuestions";
import type { ResponseContextType } from "../SurveyWrapper";
import assessmentData from "../../utilities/assessmentMeta";
import type { assessmentType } from "../../utilities/assessmentMeta";

const Survey = () => {
    const [selectedAssessment, setSelectedAssessment] =
        useState<assessmentType | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClosePopup();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isVisible) handleClosePopup();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isVisible]);

    const context = useContext<ResponseContextType | null>(ResponseContext);
    if (!context) return null;
    const { response } = context;

    const handleStartAssessment = (assessment: assessmentType) => {
        setSelectedAssessment(assessment);
        setIsVisible(true);
        setIsClosing(false);
    };

    const handleClosePopup = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setSelectedAssessment(null);
            setIsClosing(false);
        }, 300);
    };

    return (
        <>
            <div className="space-y-6">
                {/* Assessment Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                    {assessmentData.map((assessment) => {
                        // Total questions in this assessment
                        const totalQuestions = Object.values(
                            assessment.questions
                        ).reduce(
                            (sum, category: any) =>
                                sum + category.questions.length,
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
                                ? Math.round(
                                      (answeredCount / totalQuestions) * 100
                                  )
                                : 0;

                        return (
                            <button
                                key={assessment.title}
                                onClick={() =>
                                    handleStartAssessment(assessment)
                                }
                                className={`group relative p-5 sm:p-6 rounded-xl transition-all duration-300 ease-out bg-(--brand-light-blue)/20 text-white backdrop-blur-sm hover:shadow-lg hover:scale-105 active:scale-100 text-left`}
                            >
                                <div className="flex flex-col space-y-3">
                                    {/* Assessment Title */}
                                    <h3 className="text-base sm:text-lg font-semibold pr-6">
                                        {assessment.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs sm:text-sm opacity-80 line-clamp-4">
                                        {assessment.desc}
                                    </p>

                                    {/* Progress Section */}
                                    <div className="space-y-1.5 pt-2">
                                        <div className="flex justify-between items-center text-xs sm:text-sm">
                                            <span className="font-medium">
                                                Progress
                                            </span>
                                            <span className="font-bold">
                                                {progressPercent}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/60 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full transition-all duration-500 bg-current"
                                                style={{
                                                    width: `${progressPercent}%`,
                                                }}
                                            />
                                        </div>
                                        <div className="text-xs opacity-70">
                                            {answeredCount}/{totalQuestions}{" "}
                                            questions answered
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow Icon */}
                                <div className="absolute top-5 right-5 transition-transform duration-300 group-hover:translate-x-1">
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Modal/Dialog for Assessment Questions */}
            {isVisible && selectedAssessment && (
                <div
                    className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 
            ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}
                    onAnimationEnd={(e) => {
                        if (isClosing && e.animationName === "fadeOut") {
                            setIsVisible(false);
                            setSelectedAssessment(null);
                            setIsClosing(false);
                        }
                    }}
                >
                    <div
                        className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col 
              ${isClosing ? "animate-scaleDown" : "animate-scaleUp"}`}
                    >
                        {/* Dialog Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-500 rounded-lg flex-shrink-0">
                                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                                    {selectedAssessment.title}
                                </h3>
                            </div>
                            <button
                                onClick={handleClosePopup}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex-shrink-0"
                                aria-label="Close dialog"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Dialog Content */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            <SurveyQuestions
                                assessment={selectedAssessment.title}
                                data={selectedAssessment.questions}
                                options={selectedAssessment.options}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Survey;
