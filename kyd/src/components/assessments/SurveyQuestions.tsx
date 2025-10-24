import { useState, useContext } from "react";
import { ChevronDown } from "lucide-react";
import { ResponseContext } from "../SurveyWrapper";
import EmailDialog from "../EmailDialog";
import { ResultContext } from "../SurveyWrapper";
import type { ResponseContextType, ResultContextType } from "../SurveyWrapper";
import type { responseType } from "../SurveyWrapper";
import type { dataType, optionType } from "../../utilities/assessmentMeta";

type Props = {
    assessment: string;
    data: dataType;
    options: optionType[];
};

const SurveyQuestions = ({ assessment, data, options }: Props) => {
    const [expand, setExpand] = useState<Record<string, boolean>>({});

    const responseContext = useContext<ResponseContextType | null>(
        ResponseContext
    );
    if (!responseContext) return null;
    const { response, setResponse } = responseContext;

    const resultContext = useContext<ResultContextType | null>(ResultContext);
    if (!resultContext) return null;
    const { setShowResults } = resultContext;

    const handleResults = (
        assessmentTitle: string,
        category: string,
        questionIndex: number,
        question: string,
        optionLabel: string,
        score: number
    ) => {
        setResponse((prevResponse: responseType) => {
            const newAnswerObject = {
                question: question,
                answer: optionLabel,
                score: score,
            };

            const prevAssessment = prevResponse[assessmentTitle] || {};

            const prevCategory = prevAssessment[category] || {
                categoryScore: 0,
            };

            const prevAnswerObject = prevCategory[questionIndex] as
                | { question: string; answer: string; score: number }
                | undefined;

            const prevQuestionScore = prevAnswerObject?.score || 0;

            if (prevAnswerObject?.answer === optionLabel) {
                const { [questionIndex]: _, ...restOfPrevCategory } =
                    prevCategory;

                const newCategoryTotalScore =
                    prevCategory.categoryScore - prevQuestionScore;

                return {
                    ...prevResponse,
                    [assessmentTitle]: {
                        ...prevAssessment,
                        [category]: {
                            ...restOfPrevCategory,
                            categoryScore: newCategoryTotalScore,
                        },
                    },
                };
            }

            const newCategoryTotalScore =
                prevCategory.categoryScore - prevQuestionScore + score;

            return {
                ...prevResponse,
                [assessmentTitle]: {
                    ...prevAssessment,
                    [category]: {
                        ...prevCategory,
                        [questionIndex]: newAnswerObject,
                        categoryScore: newCategoryTotalScore,
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
        <div className="max-w-4xl mx-auto p-4 bg-gray-50">
            {/* Categories */}
            <div className="space-y-4">
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
                                className="w-full flex items-center justify-between p-4 text-left rounded-xl"
                            >
                                <div className="flex items-center">
                                    <div
                                        className="w-9 h-9 flex items-center justify-center rounded-lg border-2 mr-3 text-xl shadow transition-all duration-300"
                                        style={{
                                            borderColor: categoryData.color,
                                            backgroundColor: `${categoryData.color}20`,
                                        }}
                                    >
                                        {categoryData.icon}
                                    </div>
                                    <div>
                                        <h3
                                            className="text-lg font-bold"
                                            style={{
                                                color: categoryData.color,
                                            }}
                                        >
                                            {categoryName}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {categoryData.questions.length}{" "}
                                            {categoryData.questions.length === 1
                                                ? "question"
                                                : "questions"}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress + Chevron */}
                                <div className="flex items-center space-x-3">
                                    <span className="text-xs text-gray-500">
                                        {answeredCount}/
                                        {categoryData.questions.length}
                                    </span>
                                    <div
                                        className={`transition-transform duration-300 ${
                                            isExpanded
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    >
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </button>

                            {/* Questions Section */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isExpanded
                                        ? "max-h-[2000px] opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="px-4 pb-4 space-y-4">
                                    {categoryData.questions.map(
                                        (question, questionIndex) => {
                                            const currentResponse =
                                                response[assessment]?.[
                                                    categoryName
                                                ]?.[questionIndex];

                                            return (
                                                <div
                                                    key={questionIndex}
                                                    className="p-4 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md transition-all duration-300"
                                                >
                                                    {/* Question */}
                                                    <h4 className="text-base font-semibold mb-3 flex items-start leading-relaxed">
                                                        <span
                                                            className="w-7 h-7 flex items-center justify-center rounded-full text-white font-bold mr-2 mt-0.5 flex-shrink-0 transition-colors duration-300 text-sm"
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
                                                    <div className="ml-9 space-y-2">
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
                                                                            question,
                                                                            option.value,
                                                                            option.score
                                                                        )
                                                                    }
                                                                    className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                                                                        currentResponse?.answer ===
                                                                        option.value
                                                                            ? "border-blue-500 bg-blue-500/10 shadow-md"
                                                                            : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center">
                                                                        <div
                                                                            className="w-3.5 h-3.5 rounded-full mr-3 transition-colors duration-300"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    option.color,
                                                                            }}
                                                                        />
                                                                        <span className="font-medium text-sm">
                                                                            {
                                                                                option.label
                                                                            }
                                                                        </span>
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

            {/* EmailDialog per assessment (after all categories) */}
            <div className="px-4 pb-3 mt-6 flex justify-center">
                <EmailDialog onSubmit={() => setShowResults(true)} />
            </div>
        </div>
    );
};

export default SurveyQuestions;
