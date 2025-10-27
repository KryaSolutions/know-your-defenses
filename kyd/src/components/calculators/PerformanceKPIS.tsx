import React, { useState, useMemo } from "react";

const PerformanceKPIS = () => {
    const [metrics, setMetrics] = useState({
        totalIncidents: "",
        resolvedIncidents: "",
        securityBreaches: "",
        totalTime: "",
        downtime: "",
    });

    const [results, setResults] = useState<null | {
        incidentResolutionRate: number;
        securityBreachRate: number;
        socAvailability: number;
    }>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setMetrics((prev) => ({ ...prev, [name]: value }));
            setResults(null);
        }
    };

    const validation = useMemo(() => {
        const tI = Number(metrics.totalIncidents) || 0;
        const rI = Number(metrics.resolvedIncidents) || 0;
        const tT = Number(metrics.totalTime) || 0;
        const dT = Number(metrics.downtime) || 0;

        const errors: string[] = [];

        if (tI === 0) errors.push("Total Incidents must be greater than zero.");
        if (rI > tI)
            errors.push("Resolved Incidents cannot exceed Total Incidents.");
        if (tT === 0) errors.push("Total Time must be greater than zero.");
        if (dT > tT)
            errors.push("Downtime cannot exceed Total Time.");

        return { errors, hasError: errors.length > 0 };
    }, [metrics]);

    const calculate = () => {
        const {
            totalIncidents,
            resolvedIncidents,
            securityBreaches,
            totalTime,
            downtime,
        } = metrics;

        const tI = Number(totalIncidents) || 0;
        const rI = Number(resolvedIncidents) || 0;
        const sB = Number(securityBreaches) || 0;
        const tT = Number(totalTime) || 0;
        const dT = Number(downtime) || 0;

        const incidentResolutionRate = tI > 0 ? (rI / tI) * 100 : 0;
        const securityBreachRate = tI > 0 ? (sB / tI) * 100 : 0;
        const socAvailability = tT > 0 ? ((tT - dT) / tT) * 100 : 0;

        setResults({
            incidentResolutionRate,
            securityBreachRate,
            socAvailability,
        });
    };

    const reset = () => {
        setMetrics({
            totalIncidents: "",
            resolvedIncidents: "",
            securityBreaches: "",
            totalTime: "",
            downtime: "",
        });
        setResults(null);
    };

    const getStatusColor = (metric: string, value: number) => {
        if (metric === "incidentResolutionRate") {
            return value >= 95 ? "text-green-600" : "text-red-600";
        }
        if (metric === "securityBreachRate") {
            return value < 1 ? "text-green-600" : "text-red-600";
        }
        if (metric === "socAvailability") {
            return value >= 99.5 ? "text-green-600" : "text-red-600";
        }
        return "text-gray-800";
    };

    const getTargetText = (metric: string) => {
        if (metric === "incidentResolutionRate") return "Target: ≥ 95%";
        if (metric === "securityBreachRate") return "Target: < 1%";
        if (metric === "socAvailability") return "Target: ≥ 99.5%";
        return "";
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
                    Overall Performance KPIs
                </h2>

                {!results ? (
                    <div className="transition-all duration-500 ease-in-out">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries({
                                totalIncidents: "Total Incidents",
                                resolvedIncidents: "Resolved Incidents",
                                securityBreaches: "Security Breaches",
                                totalTime: "SOC Availability - Total Time (minutes)",
                                downtime: "Downtime (minutes)",
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
                            Performance Results
                        </h3>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                            <ResultCard
                                label="Incident Resolution Rate"
                                value={results.incidentResolutionRate}
                                target={getTargetText("incidentResolutionRate")}
                                statusColor={getStatusColor("incidentResolutionRate", results.incidentResolutionRate)}
                            />
                            <ResultCard
                                label="Security Breach Rate"
                                value={results.securityBreachRate}
                                target={getTargetText("securityBreachRate")}
                                statusColor={getStatusColor("securityBreachRate", results.securityBreachRate)}
                            />
                            <ResultCard
                                label="SOC Availability"
                                value={results.socAvailability}
                                target={getTargetText("socAvailability")}
                                statusColor={getStatusColor("socAvailability", results.socAvailability)}
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

function ResultCard({ label, value, target, statusColor }: { label: string; value: number; target: string; statusColor: string }) {
    return (
        <div className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col">
                <span className="text-gray-700 font-medium">{label}</span>
                <span className="text-xs text-gray-500 mt-0.5">{target}</span>
            </div>
            <span className={`text-2xl font-semibold ${statusColor}`}>
                {value.toFixed(value < 10 ? 2 : 4)}%
            </span>
        </div>
    );
}

export default PerformanceKPIS;
