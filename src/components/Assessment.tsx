import { useState, useContext } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import { ResponseContext } from "./App";
import type { responseType } from "./App";
import type { dataType, optionType } from "../utilities/assessmentMeta";

type Props = {
    assessment: string;
    desc: string;
    data: dataType;
    options: optionType[];
};

const Assessment = ({ assessment, desc, data, options }: Props) => {
    const [expand, setExpand] = useState<Record<string, boolean>>({});

    const context = useContext(ResponseContext);
    if (!context) return null;
    const { response, setResponse } = context;

    const handleResults = (category: string, questionIndex: number, value: string) => {
        setResponse((prevResponse: responseType) => ({
            ...prevResponse,
            [category]: {
                ...prevResponse[category],
                [questionIndex]: value,
            },
        }));
    };

    const toggleSection = (domain: string) => {
        setExpand((prev) => ({
            ...prev,
            [domain]: !prev[domain],
        }));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{assessment}</h1>
                <p className="text-lg text-gray-600">{desc}</p>
            </div>

            {/* Categories */}
            <div className="space-y-6">
                {Object.entries(data).map(([categoryName, categoryData]) => {
                    const answeredCount = Object.keys(response[categoryName] ?? {}).length;
                    const isExpanded = expand[categoryName];

                    return (
                        <div
                            key={categoryName}
                            className="rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            {/* Category Header */}
                            <button
                                onClick={() => toggleSection(categoryName)}
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
                                        <h3 className="text-xl font-bold" style={{ color: categoryData.color }}>
                                            {categoryName}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {categoryData.questions.length} controls
                                        </p>
                                    </div>
                                </div>

                                {/* Progress + Chevron */}
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">
                                        {answeredCount}/{categoryData.questions.length}
                                    </span>
                                    <div
                                        className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"
                                            }`}
                                    >
                                        <ChevronDown className="text-gray-400" />
                                    </div>
                                </div>
                            </button>

                            {/* Questions Section */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-6 pb-6 space-y-6">
                                    {categoryData.questions.map((question, questionIndex) => {
                                        const currentResponse = response[categoryName]?.[questionIndex];

                                        return (
                                            <div
                                                key={questionIndex}
                                                className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md transition-all duration-300"
                                            >
                                                {/* Question */}
                                                <h4 className="text-lg font-semibold mb-4 flex items-start leading-relaxed">
                                                    <span
                                                        className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold mr-3 mt-1 flex-shrink-0 transition-colors duration-300"
                                                        style={{ backgroundColor: categoryData.color }}
                                                    >
                                                        {questionIndex + 1}
                                                    </span>
                                                    {question}
                                                </h4>

                                                {/* Options */}
                                                <div className="ml-11 space-y-3">
                                                    {options.map((option) => (
                                                        <button
                                                            key={option.value}
                                                            onClick={() =>
                                                                handleResults(categoryName, questionIndex, option.value)
                                                            }
                                                            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left transform ${currentResponse === option.value
                                                                ? "border-blue-500 bg-blue-500/10 shadow-md"
                                                                : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            <div className="flex items-center">
                                                                <div
                                                                    className="w-4 h-4 rounded-full mr-4 transition-colors duration-300"
                                                                    style={{ backgroundColor: option.color }}
                                                                />
                                                                <div>
                                                                    <span className="font-semibold">{option.label}</span>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Response recorded */}
                                                {currentResponse && (
                                                    <div className="ml-11 mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg transition-all duration-300">
                                                        <div className="flex items-center text-sm">
                                                            <CheckCircle className="text-green-500 mr-2" size={16} />
                                                            <span className="text-green-600 font-medium">
                                                                Response recorded:{" "}
                                                                {options.find((opt) => opt.value === currentResponse)?.label}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Assessment;
