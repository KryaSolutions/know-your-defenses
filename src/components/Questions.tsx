import { useState, useContext } from "react";
import { ChevronDown } from "lucide-react";
import { ResponseContext } from "./Hero";
import type { responseType } from "./Hero";
import type { dataType, optionType } from "../utilities/assessmentMeta";

type Props = {
    assessment: string;
    data: dataType;
    options: optionType[];
};

const Questions = ({ assessment, data, options }: Props) => {
    const [expand, setExpand] = useState<Record<string, boolean>>({});

    const context = useContext(ResponseContext);
    if (!context) return null;
    const { response, setResponse } = context;

    const handleResults = (
        assessmentTitle: string,
        category: string,
        questionIndex: number,
        value: string,
        score: number
    ) => {
        setResponse((prevResponse: responseType) => {
            // Get previous responses for this assessment
            const prevAssessment = prevResponse[assessmentTitle] || {};

            // Get previous responses for this category
            const prevCategory = prevAssessment[category] || { score: 0 };
            const prevQuestionScore = prevCategory[questionIndex]
                ? options.find(
                    (opt) => opt.value === prevCategory[questionIndex]
                )?.score || 0
                : 0;

            // If same answer clicked, remove it
            if (prevCategory[questionIndex] === value) {
                const { [questionIndex]: _, ...restOfPrevCategory } =
                    prevCategory;

                return {
                    ...prevResponse,
                    [assessmentTitle]: {
                        ...prevAssessment,
                        [category]: {
                            ...restOfPrevCategory,
                            score: prevCategory.score - prevQuestionScore,
                        },
                    },
                };
            }

            // Otherwise, update the answer
            return {
                ...prevResponse,
                [assessmentTitle]: {
                    ...prevAssessment,
                    [category]: {
                        ...prevCategory,
                        [questionIndex]: value,
                        score: prevCategory.score - prevQuestionScore + score,
                    },
                },
            };
        });
    };

    const toggleSection = (assessment: string, category: string) => {
        const key = `${assessment}-${category}`;
        setExpand((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Categories */}
            <div className="space-y-6">
                {Object.entries(data).map(([categoryName, categoryData]) => {
                    const answers = response[assessment]?.[categoryName] ?? {};
                    const answeredCount = Object.keys(answers).filter(
                        (key) => !isNaN(Number(key)) && Number(key) >= 0
                    ).length;

                    const isExpanded = expand[`${assessment}-${categoryName}`];

                    return (
                        <div
                            key={categoryName}
                            className="rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            {/* Category Header */}
                            <button
                                onClick={() =>
                                    toggleSection(assessment, categoryName)
                                }
                                className="w-full flex items-center justify-between p-6 text-left rounded-xl"
                            >
                                <div className="flex items-center">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-lg border-2 mr-4 text-2xl shadow transition-all duration-300"
                                        style={{
                                            borderColor: categoryData.color,
                                            backgroundColor: `${categoryData.color}20`,
                                        }}
                                    >
                                        {categoryData.icon}
                                    </div>
                                    <div>
                                        <h3
                                            className="text-xl font-bold"
                                            style={{
                                                color: categoryData.color,
                                            }}
                                        >
                                            {categoryName}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {categoryData.questions.length}{" "}
                                            controls
                                        </p>
                                    </div>
                                </div>

                                {/* Progress + Chevron */}
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">
                                        {answeredCount}/
                                        {categoryData.questions.length}
                                    </span>
                                    <div
                                        className={`transition-transform duration-300 ${isExpanded
                                            ? "rotate-180"
                                            : "rotate-0"
                                            }`}
                                    >
                                        <ChevronDown className="text-gray-400" />
                                    </div>
                                </div>
                            </button>

                            {/* Questions Section */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded
                                    ? "max-h-[2000px] opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-6 pb-6 space-y-6">
                                    {categoryData.questions.map(
                                        (question, questionIndex) => {
                                            const currentResponse =
                                                response[assessment]?.[
                                                categoryName
                                                ]?.[questionIndex];

                                            return (
                                                <div
                                                    key={questionIndex}
                                                    className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md transition-all duration-300"
                                                >
                                                    {/* Question */}
                                                    <h4 className="text-lg font-semibold mb-4 flex items-start leading-relaxed">
                                                        <span
                                                            className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold mr-3 mt-1 flex-shrink-0 transition-colors duration-300"
                                                            style={{
                                                                backgroundColor:
                                                                    categoryData.color,
                                                            }}
                                                        >
                                                            {questionIndex + 1}
                                                        </span>
                                                        {question}
                                                    </h4>

                                                    {/* Options */}
                                                    <div className="ml-11 space-y-3">
                                                        {options.map(
                                                            (option) => (
                                                                <button
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    onClick={() =>
                                                                        handleResults(
                                                                            assessment,
                                                                            categoryName,
                                                                            questionIndex,
                                                                            option.value,
                                                                            option.score
                                                                        )
                                                                    }
                                                                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left transform ${currentResponse ===
                                                                        option.value
                                                                        ? "border-blue-500 bg-blue-500/10 shadow-md"
                                                                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center">
                                                                        <div
                                                                            className="w-4 h-4 rounded-full mr-4 transition-colors duration-300"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    option.color,
                                                                            }}
                                                                        />
                                                                        <div>
                                                                            <span className="font-semibold">
                                                                                {
                                                                                    option.label
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Questions;
