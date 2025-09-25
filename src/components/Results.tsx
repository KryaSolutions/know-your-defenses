import { useContext } from "react";
import { ResponseContext } from "./App";
import type { ResponseContextType } from "./App";
import assessmentData, { type assessmentType } from "../utilities/assessmentMeta";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = {
    addressed: "#10b981", // Emerald green for success
    ignored: "#ef4444", // Red for areas needing attention
    gradient: {
        addressed: "url(#addressedGradient)",
        ignored: "url(#ignoredGradient)"
    }
};

const rankDescriptions: { [key: string]: string } = {
    S: "Outstanding! You've addressed nearly all issues with exceptional performance.",
    A: "Excellent! You've addressed most issues effectively.",
    B: "Good job! You've addressed a majority of the issues.",
    C: "Fair. There's room for improvement in addressing issues.",
    D: "Needs work. Many issues remain unaddressed.",
    E: "Significant improvement needed. Most issues are unaddressed.",
    F: "Critical. Urgent attention required to address issues."
};

const rankColors: { [key: string]: string } = {
    S: "text-emerald-600 bg-emerald-50 border-emerald-200",
    A: "text-blue-600 bg-blue-50 border-blue-200",
    B: "text-green-600 bg-green-50 border-green-200",
    C: "text-yellow-600 bg-yellow-50 border-yellow-200",
    D: "text-orange-600 bg-orange-50 border-orange-200",
    E: "text-red-600 bg-red-50 border-red-200",
    F: "text-red-700 bg-red-100 border-red-300"
};

// Custom tooltip component with higher z-index and proper positioning
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="bg-white px-4 py-3 rounded-lg shadow-2xl border border-gray-200 relative z-50"
                style={{ zIndex: 9999, position: 'relative' }}>
                <p className="font-semibold text-gray-800">{data.name}</p>
                <p className="text-sm text-gray-600">
                    Score: <span className="font-medium">{data.value}</span>
                </p>
                <p className="text-sm text-gray-600">
                    Percentage: <span className="font-medium">{((data.value / (payload[0].payload.total || 1)) * 100).toFixed(1)}%</span>
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

    // Total possible score (all questions × 100)
    const countPerAssessment: { [title: string]: number } = assessmentData.reduce<
        { [title: string]: number }
    >((acc, assessment: assessmentType) => {
        const category = Object.values(assessment.questions);
        const count: number = category.reduce(
            (accumulator, object) => accumulator + object.questions.length * 100,
            0
        );
        acc[assessment.title] = count;
        return acc;
    }, {});

    const totalScore: number = Object.values(countPerAssessment).reduce(
        (accumulator, count) => accumulator + count,
        0
    );

    // Current earned score
    const currentScore = Object.values(response).reduce(
        (assessmentAcc, assessment) => {
            const assessmentScore = Object.values(assessment).reduce(
                (catAcc, category) => catAcc + (category.score || 0),
                0
            );
            return assessmentAcc + assessmentScore;
        },
        0
    );

    const chartData = [
        {
            name: "Points Scored",
            value: currentScore,
            total: totalScore
        },
        {
            name: "Areas for Improvement",
            value: totalScore - currentScore,
            total: totalScore
        },
    ];

    // Rank logic
    const percentage = totalScore > 0 ? (currentScore / totalScore) * 100 : 0;
    let rank = "F";
    if (percentage >= 90) rank = "S";
    else if (percentage >= 80) rank = "A";
    else if (percentage >= 70) rank = "B";
    else if (percentage >= 60) rank = "C";
    else if (percentage >= 50) rank = "D";
    else if (percentage >= 40) rank = "E";
    else rank = "F";

    return (
        <div className="max-w-4xl mx-auto my-8 p-8">
            {/* Main Results Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Rank Section */}
                <div className="bg-blue-500 p-8 text-center">
                    <div className="inline-flex flex-col items-center">
                        <p className="text-white/80 text-sm font-medium uppercase tracking-wide mb-2">
                            Your Grade
                        </p>
                        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl text-4xl font-black border-4 ${rankColors[rank]} shadow-lg transition-transform transform hover:scale-105`}>
                            {rank}
                        </div>
                        <div className="mt-4 text-white">
                            <p className="text-2xl font-bold">
                                {Math.round(percentage)}%
                            </p>
                            <p className="text-white/90 text-sm">
                                Overall Score
                            </p>
                        </div>
                    </div>
                </div>
                {/* Chart and Stats Section */}
                <div className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Left: Stats */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Performance Breakdown
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Points Scored:</span>
                                        <span className="font-semibold text-emerald-600">
                                            {currentScore}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Areas for Improvement:</span>
                                        <span className="font-semibold text-red-500">
                                            {totalScore - currentScore}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                        <span className="text-gray-900 font-medium">Total Possible:</span>
                                        <span className="font-bold text-gray-900">
                                            {totalScore}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h4 className="font-semibold text-blue-900 mb-2">
                                    {rankDescriptions[rank]}
                                </h4>
                            </div>
                        </div>
                        {/* Right: Chart */}
                        <div className="relative">
                            <div className="h-80 w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <defs>
                                            <linearGradient id="addressedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#10b981" />
                                                <stop offset="100%" stopColor="#059669" />
                                            </linearGradient>
                                            <linearGradient id="ignoredGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#ef4444" />
                                                <stop offset="100%" stopColor="#dc2626" />
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
                                            {chartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS.gradient[index === 0 ? 'addressed' : 'ignored']}
                                                    stroke="#ffffff"
                                                    strokeWidth={3}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            content={<CustomTooltip />}
                                            wrapperStyle={{ zIndex: 9999 }}
                                            allowEscapeViewBox={{ x: false, y: false }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            {/* Center Label */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-900">
                                        {Math.round(percentage)}%
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium">
                                        Complete
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
