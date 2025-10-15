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

const Assessments = () => {
    const [response, setResponse] = useState<responseType>({});
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        setResponse({});
    }, []);

    return (
        <div
            id="hero-section"
            className="min-h-screen bg-[var(--brand-blue)]/10 to-indigo-100 relative overflow-hidden"
        >

            <div className="relative max-w-5xl mx-auto px-6 py-12">
                <ResponseContext.Provider value={{ response, setResponse }}>
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600/5 to-cyan-600/5 p-8 mb-6 rounded-xl">
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="p-3 bg-[var(--brand-light-blue)] rounded-full">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-[var(--brand-blue)]">
                                {!showResults
                                    ? "Know Your Defenses"
                                    : "Your Defense stats"}
                            </h2>
                        </div>
                    </div>

                    <ResultContext.Provider
                        value={{ showResults, setShowResults }}
                    >
                        {/* Assessment Content */}
                        <div className="mb-8">
                            {!showResults ? <Survey /> : <Results />}
                        </div>
                    </ResultContext.Provider>

                    {/* Action Buttons */}
                    <div className="p-8 flex justify-center">
                        {!showResults ? (
                            <EmailDialog
                                triggerButtonText="Evaluate Assessments"
                                onSubmit={() => setShowResults(true)}
                            />
                        ) : (
                            <Button
                                variant="outline"
                                onClick={() => setShowResults(false)}
                                className="border-2 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
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

export default Assessments;
