import { useContext } from "react";
import { ResponseContext } from "../SurveyWrapper";
import type { ResponseContextType } from "../SurveyWrapper";
import assessmentData, {
    type assessmentType,
} from "../../utilities/assessmentMeta";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
    addressed: "#10b981",
    ignored: "#ef4444",
    gradient: {
        addressed: "url(#addressedGradient)",
        ignored: "url(#ignoredGradient)",
    },
};

const rankDescriptions: { [key: string]: string } = {
    S: "Outstanding! You've addressed nearly all issues with exceptional performance.",
    A: "Excellent! You've addressed most issues effectively.",
    B: "Good job! You've addressed a majority of the issues.",
    C: "Fair. There's room for improvement in addressing issues.",
    D: "Needs work. Many issues remain unaddressed.",
    E: "Significant improvement needed. Most issues are unaddressed.",
    F: "Critical. Urgent attention required to address issues.",
};

const rankColors: { [key: string]: string } = {
    S: "text-emerald-600 bg-emerald-50 border-emerald-200",
    A: "text-blue-600 bg-blue-50 border-blue-200",
    B: "text-green-600 bg-green-50 border-green-200",
    C: "text-yellow-600 bg-yellow-50 border-yellow-200",
    D: "text-orange-600 bg-orange-50 border-orange-200",
    E: "text-red-600 bg-red-50 border-red-200",
    F: "text-red-700 bg-red-100 border-red-300",
};

// Custom tooltip component with higher z-index and proper positioning
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="bg-white/50 px-4 py-3 rounded-lg shadow-2xl">
                <p className="font-semibold text-gray-800">
                    {data.name}:{" "}
                    <span className="font-medium">
                        {data.value.toFixed(2)}%
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

const Results = () => {
    const context = useContext<ResponseContextType | null>(ResponseContext);
    if (!context) return null;
    const { response } = context;

    const attendedAssessments = Object.keys(response);

    const countPerAssessment: { [title: string]: number } =
        assessmentData.reduce<{ [title: string]: number }>(
            (acc, assessment: assessmentType) => {
                if (attendedAssessments.includes(assessment.title)) {
                    const category = Object.values(assessment.questions);
                    const count: number = category.reduce(
                        (accumulator, object) =>
                            accumulator + object.questions.length * 100,
                        0
                    );
                    acc[assessment.title] = count;
                }
                return acc;
            },
            {}
        );

    const totalScore: number = Object.values(countPerAssessment).reduce(
        (accumulator, count) => accumulator + count,
        0
    );

    const earnedPerAssessment: { [title: string]: number } = {};
    Object.entries(response).forEach(([title, assessment]) => {
        const assessmentScore = Object.values(assessment).reduce(
            (catAcc, category) => catAcc + (category.categoryScore || 0),
            0
        );
        earnedPerAssessment[title] = assessmentScore;
    });

    const currentScore: number = Object.values(earnedPerAssessment).reduce(
        (acc, object) => {
            return acc + object;
        },
        0
    );

    const percentage = totalScore > 0 ? (currentScore / totalScore) * 100 : 0;
    let rank = "F";
    if (percentage >= 90) rank = "S";
    else if (percentage >= 80) rank = "A";
    else if (percentage >= 70) rank = "B";
    else if (percentage >= 60) rank = "C";
    else if (percentage >= 50) rank = "D";
    else if (percentage >= 40) rank = "E";
    else rank = "F";

    const chartData = [
        {
            name: "Defenses addressed",
            value: percentage,
        },
        {
            name: "Unaddressed areas",
            value: 100 - percentage,
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Main Results Card */}
            <div className="bg-white/5 rounded-2xl shadow-xl overflow-hidden">
                {/* Rank Section */}
                <div className="bg-white/5 p-8 text-center">
                    <div className="inline-flex flex-col items-center">
                        <p className="text-white/80 text-sm font-medium tracking-wide mb-2">
                            Your Security Strength is at
                        </p>
                        <div
                            className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl text-4xl font-medium border-4 ${rankColors[rank]} shadow-lg transition-transform transform hover:scale-105`}
                        >
                            {Math.round(percentage)}%
                        </div>
                    </div>
                </div>
                {/* Chart and Stats Section */}
                <div className="p-8">
                    {/* Right: Chart */}
                    <div className="relative">
                        <div className="h-80 w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <defs>
                                        <linearGradient
                                            id="addressedGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="var(--brand-blue)"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="var(--brand-blue)"
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="ignoredGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="var(--brand-orange)"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="var(--brand-orange)"
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        innerRadius={60}
                                        paddingAngle={3}
                                        dataKey="value"
                                        animationBegin={0}
                                        animationDuration={1200}
                                        animationEasing="ease-in-out"
                                    >
                                        {chartData.map((_entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS.gradient[
                                                    index === 0
                                                        ? "addressed"
                                                        : "ignored"
                                                    ]
                                                }
                                                stroke="#ffffff"
                                                strokeWidth={3}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={<CustomTooltip />}
                                        wrapperStyle={{ zIndex: 9999 }}
                                        allowEscapeViewBox={{
                                            x: false,
                                            y: false,
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Center Label */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                            <div className="text-center">
                                <div className="text-3xl font-medium text-white">
                                    {Math.round(percentage)}%
                                </div>
                                <div className="text-sm text-white font-medium">
                                    Addressed
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Assessments Attended */}
                    <div className="bg-gray-50/5 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Assessments Attended
                        </h3>
                        <div className="space-y-3">
                            {attendedAssessments.length > 0 ? (
                                attendedAssessments.map((title) => {
                                    const earned =
                                        earnedPerAssessment[title] || 0;
                                    const max = countPerAssessment[title] || 0;
                                    const percent =
                                        max > 0
                                            ? ((earned / max) * 100).toFixed(1)
                                            : "0";
                                    return (
                                        <div
                                            key={title}
                                            className="flex justify-between items-center border-b pb-2 last:border-none"
                                        >
                                            <span className="text-white">
                                                {title}
                                            </span>
                                            <span className="font-medium text-(--brand-orange)">
                                                {percent}%
                                            </span>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-sm text-white">
                                    No assessments attended yet.
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Rank Description */}
                    <div className="bg-blue-50/5 rounded-xl p-6 mt-6">
                        <h4 className="font-semibold text-white mb-2">
                            {rankDescriptions[rank]}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
