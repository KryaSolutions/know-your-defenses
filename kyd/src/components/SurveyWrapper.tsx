import React, { useState, useEffect, createContext } from "react";
import Survey from "./assessments/Survey";
import Results from "./assessments/Results";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import EmailDialog from "./EmailDialog";

export type ResponseContextType = {
    response: responseType;
    setResponse: React.Dispatch<React.SetStateAction<responseType>>;
};

export type responseType = {
    [title: string]: {
        [category: string]: {
            [questionIndex: number]: {
                question: string;
                answer: string;
                score: number;
            };
            categoryScore: number;
        };
    };
};

export const ResponseContext = createContext<ResponseContextType | null>(null);

export type ResultContextType = {
    showResults: boolean;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ResultContext = createContext<ResultContextType | null>(null);

const SurveyWrapper = () => {
    const [response, setResponse] = useState<responseType>({});
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        setResponse({});
    }, []);

    return (
        <div className="flex-grow flex-shrink p-4 sm:p-6 md:p-8 lg:p-10 bg-[var(--brand-blue)]">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
                <ResponseContext.Provider value={{ response, setResponse }}>
                    {/* Header Section */}
                    <div
                        id="survey-section"
                        className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 p-6 sm:p-8 border-b border-blue-100"
                    >
                        <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                            <div className="p-2 sm:p-3 bg-[var(--brand-light-blue)] rounded-full flex-shrink-0">
                                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--brand-blue)] text-center">
                                {!showResults
                                    ? "Discover your Security Posture"
                                    : "Your Defense stats"}
                            </h2>
                        </div>
                    </div>

                    <ResultContext.Provider
                        value={{ showResults, setShowResults }}
                    >
                        {/* Content Section */}
                        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
                            <div className="space-y-6">
                                {!showResults && (
                                    <div className="text-center">
                                        <p className="text-slate-700 text-base sm:text-lg">
                                            Take the quick assessments to
                                            understand your organization's
                                            current security posture.
                                        </p>
                                    </div>
                                )}

                                {/* Assessment Content */}
                                <div className="mb-8">
                                    {!showResults ? <Survey /> : <Results />}
                                </div>
                            </div>
                        </div>
                    </ResultContext.Provider>

                    {/* Action Buttons */}
                    <div className="p-6 sm:p-8 border-t border-gray-200 flex justify-center bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                        {!showResults ? (
                            <EmailDialog
                                triggerButtonText="Evaluate Assessments"
                                onSubmit={() => setShowResults(true)}
                            />
                        ) : (
                            <Button
                                variant="outline"
                                onClick={() => setShowResults(false)}
                                className="border-2 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Return to Assessment
                            </Button>
                        )}
                    </div>
                </ResponseContext.Provider>
            </div>
        </div>
    );
};

export default SurveyWrapper;
