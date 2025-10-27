import React, { useState, useMemo } from "react";

const ResponseAndResolution = () => {
    const [metrics, setMetrics] = useState({
        totalResponseTime: "",
        targetResponseTime: "",
        totalResolutionTime: "",
        targetResolutionTime: "",
        incidentsRespondedTo: "",
        incidentsResolved: "",
    });

    const [results, setResults] = useState<null | {
        mttr: number;
        responseSLACompliance: number;
        mttre: number;
        resolutionSLACompliance: number;
    }>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setMetrics((prev) => ({ ...prev, [name]: value }));
            setResults(null);
        }
    };

    const validation = useMemo(() => {
        const targetRT = Number(metrics.targetResponseTime) || 0;
        const targetResT = Number(metrics.targetResolutionTime) || 0;
        const iR = Number(metrics.incidentsRespondedTo) || 0;
        const iRes = Number(metrics.incidentsResolved) || 0;

        const errors: string[] = [];

        if (iR === 0) errors.push("Number of Incidents Responded To must be greater than zero.");
        if (iRes === 0) errors.push("Number of Incidents Resolved must be greater than zero.");
        if (targetRT === 0) errors.push("Target Response Time must be greater than zero.");
        if (targetResT === 0) errors.push("Target Resolution Time must be greater than zero.");

        return { errors, hasError: errors.length > 0 };
    }, [metrics]);

    const calculate = () => {
        const {
            totalResponseTime,
            targetResponseTime,
            totalResolutionTime,
            targetResolutionTime,
            incidentsRespondedTo,
            incidentsResolved,
        } = metrics;

        const tRT = Number(totalResponseTime) || 0;
        const targetRT = Number(targetResponseTime) || 0;
        const tResT = Number(totalResolutionTime) || 0;
        const targetResT = Number(targetResolutionTime) || 0;
        const iR = Number(incidentsRespondedTo) || 0;
        const iRes = Number(incidentsResolved) || 0;

        const mttr = iR > 0 ? tRT / iR : 0;
        const mttre = iRes > 0 ? tResT / iRes : 0;

        // SLA Compliance: percentage of incidents meeting target time
        // If MTTR <= Target, then compliance is good
        const responseSLACompliance = targetRT > 0 ? Math.min((targetRT / mttr) * 100, 100) : 0;
        const resolutionSLACompliance = targetResT > 0 ? Math.min((targetResT / mttre) * 100, 100) : 0;

        setResults({
            mttr,
            responseSLACompliance,
            mttre,
            resolutionSLACompliance,
        });
    };

    const reset = () => {
        setMetrics({
            totalResponseTime: "",
            targetResponseTime: "",
            totalResolutionTime: "",
            targetResolutionTime: "",
            incidentsRespondedTo: "",
            incidentsResolved: "",
        });
        setResults(null);
    };

    const getStatusColor = (metric: string, value: number) => {
        if (metric === "responseSLACompliance" || metric === "resolutionSLACompliance") {
            return value >= 95 ? "text-green-600" : value >= 80 ? "text-yellow-600" : "text-red-600";
        }
        return "text-[var(--brand-blue)]";
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
                    Response & Resolution Times
                </h2>

                {!results ? (
                    <div className="transition-all duration-500 ease-in-out">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries({
                                totalResponseTime: "Total Response Time (minutes)",
                                targetResponseTime: "Target Response Time (minutes)",
                                totalResolutionTime: "Total Resolution Time (minutes)",
                                targetResolutionTime: "Target Resolution Time (minutes)",
                                incidentsRespondedTo: "Number of Incidents Responded To",
                                incidentsResolved: "Number of Incidents Resolved",
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
                                        placeholder="Enter value"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="transition-all duration-500 ease-in-out animate-fadeIn">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                            Time Metrics Results
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <ResultCard
                                label="MTTR (Mean Time to Respond)"
                                value={results.mttr}
                                unit="minutes"
                                statusColor="text-[var(--brand-blue)]"
                            />
                            <ResultCard
                                label="Response SLA Compliance"
                                value={results.responseSLACompliance}
                                unit="%"
                                statusColor={getStatusColor("responseSLACompliance", results.responseSLACompliance)}
                            />
                            <ResultCard
                                label="MTTRe (Mean Time to Resolve)"
                                value={results.mttre}
                                unit="minutes"
                                statusColor="text-[var(--brand-blue)]"
                            />
                            <ResultCard
                                label="Resolution SLA Compliance"
                                value={results.resolutionSLACompliance}
                                unit="%"
                                statusColor={getStatusColor("resolutionSLACompliance", results.resolutionSLACompliance)}
                            />
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
                                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 ${validation.hasError
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

function ResultCard({ label, value, unit, statusColor }: { label: string; value: number; unit: string; statusColor: string }) {
    return (
        <div className="p-3 border rounded-lg bg-gray-50 flex flex-col transition-all duration-300 hover:shadow-md">
            <span className="text-gray-700 font-medium">{label}</span>
            <span className={`${statusColor} text-lg font-semibold mt-1`}>
                {value.toFixed(2)}{unit}
            </span>
        </div>
    );
}

export default ResponseAndResolution;
