import React, { useState, useMemo } from "react";

const SocAlerts = () => {
    const [metrics, setMetrics] = useState({
        totalAlerts: "",
        truePositives: "",
        falsePositives: "",
        incidentsCreated: "",
        incidentsResolved: "",
        critical: "",
        high: "",
        medium: "",
        low: "",
    });

    const [results, setResults] = useState<null | {
        detectionAccuracy: number;
        falsePositiveRate: number;
        incidentClosureRate: number;
        alertToIncidentRate: number;
    }>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setMetrics((prev) => ({ ...prev, [name]: value }));
            setResults(null);
        }
    };

    const validation = useMemo(() => {
        const tA = Number(metrics.totalAlerts) || 0;
        const tP = Number(metrics.truePositives) || 0;
        const fP = Number(metrics.falsePositives) || 0;
        const iC = Number(metrics.incidentsCreated) || 0;
        const iR = Number(metrics.incidentsResolved) || 0;
        const c = Number(metrics.critical) || 0;
        const h = Number(metrics.high) || 0;
        const m = Number(metrics.medium) || 0;
        const l = Number(metrics.low) || 0;

        const errors: string[] = [];

        if (tA === 0) errors.push("Total alerts must be greater than zero.");
        if (tP + fP > tA)
            errors.push("True + False Positives cannot exceed Total Alerts.");
        if (iR > iC)
            errors.push("Resolved Incidents cannot exceed Incidents Created.");
        if (c + h + m + l > iC)
            errors.push("Sum of severity incidents cannot exceed Incidents Created.");

        return { errors, hasError: errors.length > 0 };
    }, [metrics]);

    const calculate = () => {
        const {
            totalAlerts,
            truePositives,
            falsePositives,
            incidentsCreated,
            incidentsResolved,
        } = metrics;

        const tA = Number(totalAlerts) || 0;
        const tP = Number(truePositives) || 0;
        const fP = Number(falsePositives) || 0;
        const iC = Number(incidentsCreated) || 0;
        const iR = Number(incidentsResolved) || 0;

        const detectionAccuracy = tP + fP > 0 ? (tP / (tP + fP)) * 100 : 0;
        const falsePositiveRate = tP + fP > 0 ? (fP / (tP + fP)) * 100 : 0;
        const incidentClosureRate = iC > 0 ? (iR / iC) * 100 : 0;
        const alertToIncidentRate = tA > 0 ? (iC / tA) * 100 : 0;

        setResults({
            detectionAccuracy,
            falsePositiveRate,
            incidentClosureRate,
            alertToIncidentRate,
        });
    };

    const reset = () => {
        setMetrics({
            totalAlerts: "",
            truePositives: "",
            falsePositives: "",
            incidentsCreated: "",
            incidentsResolved: "",
            critical: "",
            high: "",
            medium: "",
            low: "",
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
            <div className="max-w-3xl mx-auto p-6 border rounded-2xl shadow-sm bg-white relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Alert & Incident Metrics
                </h2>

                {!results ? (
                    <div className="transition-all duration-500 ease-in-out">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.entries({
                                totalAlerts: "Total Alerts Received",
                                truePositives: "True Positive Alerts",
                                falsePositives: "False Positive Alerts",
                                incidentsCreated: "Incidents Created",
                                incidentsResolved: "Incidents Resolved",
                                critical: "Critical Incidents",
                                high: "High Severity Incidents",
                                medium: "Medium Severity Incidents",
                                low: "Low Severity Incidents",
                            }).map(([key, label]) => (
                                <div key={key} className="flex flex-col transition-all duration-300">
                                    <label className="text-sm text-gray-600 mb-1">{label}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={metrics[key as keyof typeof metrics]}
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
                            Efficiency Results
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <ResultCard
                                label="Detection Accuracy"
                                value={results.detectionAccuracy}
                            />
                            <ResultCard
                                label="False Positive Rate"
                                value={results.falsePositiveRate}
                            />
                            <ResultCard
                                label="Incident Closure Rate"
                                value={results.incidentClosureRate}
                            />
                            <ResultCard
                                label="Alert-to-Incident Conversion"
                                value={results.alertToIncidentRate}
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-start mt-6">
                    {validation.hasError && (
                        <div className="text-red-600 text-sm max-w-md transition-all duration-300">
                            <ul className="space-y-1">
                                {validation.errors.map((err, i) => (
                                    <li key={i} className="animate-slideIn">• {err}</li>
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
                    </div>
                </div>
            </div>
        </>
    );
}

function ResultCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="p-3 border rounded-lg bg-gray-50 flex flex-col transition-all duration-300 hover:shadow-md">
            <span className="text-gray-700 font-medium">{label}</span>
            <span className="text-[var(--brand-blue)] text-lg font-semibold mt-1">
                {value.toFixed(1)}%
            </span>
        </div>
    );
}

export default SocAlerts;
