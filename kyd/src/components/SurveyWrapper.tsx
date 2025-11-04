import React, { useState, useEffect, createContext } from "react";
import Survey from "./assessments/Survey";
import Results from "./assessments/Results";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import EmailDialog from "./EmailDialog";

export type ResponseContextType = {
    response: ResponseType;
    setResponse: React.Dispatch<React.SetStateAction<ResponseType>>;
};

export type ResponseType = {
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

const apiUrl: string =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_URL
        : import.meta.env.VITE_PROD_URL;

const SurveyWrapper = () => {
    const [response, setResponse] = useState<ResponseType>({});
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        setResponse({});
    }, []);

    return (
        <div className="flex-grow flex-shrink p-4 sm:p-6 md:p-8 lg:p-10 bg-[var(--brand-blue)]">
            <div className="max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                <ResponseContext.Provider value={{ response, setResponse }}>
                    {/* Header Section */}
                    <div
                        id="survey-section"
                        className="p-6 sm:p-8"
                    >
                        <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                            <div className="p-2 sm:p-3 bg-white rounded-full flex-shrink-0">
                                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-(--brand-blue)" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
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
                        <div className="flex-1 pt-3 pb-6 sm:pt-3 sm:pb-6 px-6 sm:px-8 overflow-y-auto">
                            <div className="space-y-6">
                                {!showResults && (
                                    <div className="text-center">
                                        <p className="text-white text-base sm:text-lg">
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
                    <div className="p-6 mb-4 sm:p-8 flex justify-center">
                        {!showResults ? (
                            <EmailDialog
                                triggerButtonText="Evaluate Assessments"
                                onSubmit={() => setShowResults(true)}
                                apiRoute={`${apiUrl}/api/appendCustomer`}
                                blob={response}
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
