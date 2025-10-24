import React, { useState, useMemo } from "react";

const SocLatency = () => {
    const [metrics, setMetrics] = useState({
        mttd: "",
        mttr: "",
        mttc: "",
        mttr2: "",
        mtta: "",
        mtbf: "",
    });

    const [results, setResults] = useState<null | {
        mttd: number;
        mttr: number;
        mttc: number;
        mttr2: number;
        mtta: number;
        mtbf: number;
        totalResponseTime: number;
        averageMetric: number;
    }>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setMetrics((prev) => ({ ...prev, [name]: value }));
            setResults(null);
        }
    };

    const validation = useMemo(() => {
        const mttd = Number(metrics.mttd) || 0;
        const mttr = Number(metrics.mttr) || 0;
        const mttc = Number(metrics.mttc) || 0;
        const mttr2 = Number(metrics.mttr2) || 0;
        const mtta = Number(metrics.mtta) || 0;

        const errors: string[] = [];

        if (mtta > 0 && mttd > 0 && mtta > mttd) {
            errors.push("MTTA should typically be less than or equal to MTTD.");
        }
        if (mttd > 0 && mttr > 0 && mttd > mttr) {
            errors.push("MTTD should typically be less than or equal to MTTR.");
        }
        if (mttr > 0 && mttc > 0 && mttr > mttc) {
            errors.push("MTTR should typically be less than or equal to MTTC.");
        }
        if (mttc > 0 && mttr2 > 0 && mttc > mttr2) {
            errors.push(
                "MTTC should typically be less than or equal to MTTR2."
            );
        }

        const hasValues = Object.values(metrics).some((v) => v !== "");
        if (!hasValues) {
            errors.push("Please enter at least one metric value.");
        }

        return { errors, hasError: errors.length > 0 };
    }, [metrics]);

    const calculate = () => {
        const mttd = Number(metrics.mttd) || 0;
        const mttr = Number(metrics.mttr) || 0;
        const mttc = Number(metrics.mttc) || 0;
        const mttr2 = Number(metrics.mttr2) || 0;
        const mtta = Number(metrics.mtta) || 0;
        const mtbf = Number(metrics.mtbf) || 0;

        const totalResponseTime = mttd + mttr + mttc + mttr2;

        const values = [mttd, mttr, mttc, mttr2, mtta, mtbf].filter(
            (v) => v > 0
        );
        const averageMetric =
            values.length > 0
                ? values.reduce((a, b) => a + b, 0) / values.length
                : 0;

        setResults({
            mttd,
            mttr,
            mttc,
            mttr2,
            mtta,
            mtbf,
            totalResponseTime,
            averageMetric,
        });
    };

    const reset = () => {
        setMetrics({
            mttd: "",
            mttr: "",
            mttc: "",
            mttr2: "",
            mtta: "",
            mtbf: "",
        });
        setResults(null);
    };

    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
            <div className="max-w-3xl mx-auto p-6 border rounded-2xl bg-white relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Latency Metrics (in minutes)
                </h2>

                {!results ? (
                    <div className="transition-all duration-500 ease-in-out">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries({
                                mttd: "Mean Time to Detect (MTTD)",
                                mttr: "Mean Time to Respond (MTTR)",
                                mttc: "Mean Time to Contain (MTTC)",
                                mttr2: "Mean Time to Resolve (MTTR2)",
                                mtta: "Mean Time to Acknowledge (MTTA)",
                                mtbf: "Mean Time Between Failures (MTBF)",
                            }).map(([key, label]) => (
                                <div
                                    key={key}
                                    className="flex flex-col transition-all duration-300"
                                >
                                    <label className="text-sm text-gray-600 mb-1">
                                        {label}
                                    </label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={
                                            metrics[key as keyof typeof metrics]
                                        }
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] transition-all duration-200"
                                        placeholder="Enter minutes"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="transition-all duration-500 ease-in-out animate-fadeIn">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                            Time Metrics Summary
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
                            {results.mttd > 0 && (
                                <MetricCard
                                    label="Mean Time to Detect"
                                    value={results.mttd}
                                    unit="min"
                                />
                            )}
                            {results.mttr > 0 && (
                                <MetricCard
                                    label="Mean Time to Respond"
                                    value={results.mttr}
                                    unit="min"
                                />
                            )}
                            {results.mttc > 0 && (
                                <MetricCard
                                    label="Mean Time to Contain"
                                    value={results.mttc}
                                    unit="min"
                                />
                            )}
                            {results.mttr2 > 0 && (
                                <MetricCard
                                    label="Mean Time to Resolve"
                                    value={results.mttr2}
                                    unit="min"
                                />
                            )}
                            {results.mtta > 0 && (
                                <MetricCard
                                    label="Mean Time to Acknowledge"
                                    value={results.mtta}
                                    unit="min"
                                />
                            )}
                            {results.mtbf > 0 && (
                                <MetricCard
                                    label="Mean Time Between Failures"
                                    value={results.mtbf}
                                    unit="min"
                                />
                            )}
                        </div>
                        <div className="border-t pt-3 mt-3">
                            <h4 className="text-md font-medium text-gray-800 mb-2">
                                Calculated Insights
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <InsightCard
                                    label="Total Response Time"
                                    value={results.totalResponseTime}
                                    unit="min"
                                    description="MTTD + MTTR + MTTC + MTTR2"
                                />
                                <InsightCard
                                    label="Average Metric"
                                    value={results.averageMetric}
                                    unit="min"
                                    description="Average of all entered metrics"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-start mt-6">
                    {validation.hasError && (
                        <div className="text-red-600 text-sm max-w-md transition-all duration-300">
                            <ul className="space-y-1">
                                {validation.errors.map((err, i) => (
                                    <li key={i} className="animate-slideIn">
                                        • {err}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {!validation.hasError && <div></div>}
                    <div className="flex gap-3">
                        <button
                            onClick={reset}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        >
                            Reset
                        </button>

                        {!results && (
                            <button
                                onClick={calculate}
                                disabled={validation.hasError}
                                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 ${
                                    validation.hasError
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-[var(--brand-blue)]"
                                }`}
                            >
                                Calculate
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

function MetricCard({
    label,
    value,
    unit,
}: {
    label: string;
    value: number;
    unit: string;
}) {
    return (
        <div className="p-3 border rounded-lg bg-gray-50 flex flex-col transition-all duration-300 hover:shadow-md">
            <span className="text-gray-700 font-medium">{label}</span>
            <span className="text-[var(--brand-blue)] text-lg font-semibold mt-1">
                {value.toFixed(1)} {unit}
            </span>
        </div>
    );
}

function InsightCard({
    label,
    value,
    unit,
    description,
}: {
    label: string;
    value: number;
    unit: string;
    description: string;
}) {
    return (
        <div className="p-3 border-2 border-[var(--brand-blue)] rounded-lg bg-blue-50 flex flex-col transition-all duration-300 hover:shadow-md">
            <span className="text-gray-700 font-medium">{label}</span>
            <span className="text-[var(--brand-blue)] text-xl font-bold mt-1">
                {value.toFixed(1)} {unit}
            </span>
            <span className="text-xs text-gray-500 mt-1">{description}</span>
        </div>
    );
}

export default SocLatency;
