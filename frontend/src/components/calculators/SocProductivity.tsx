import React, { useState, useMemo } from "react";

const SocProductivity = () => {
    const [metrics, setMetrics] = useState({
        socAnalysts: "",
        automatedAlerts: "",
        assetsMonitored: "",
        securityTools: "",
        trainingHours: "",
        incidentsResolved: "",
    });

    const [results, setResults] = useState<null | {
        alertsPerAnalyst: number;
        assetsPerAnalyst: number;
        toolsPerAnalyst: number;
        trainingHoursPerAnalyst: number;
        incidentsPerAnalyst: number;
        efficiencyScore: number;
        alertWorkloadStatus: string;
        coverageStatus: string;
        toolUtilizationStatus: string;
        trainingStatus: string;
        incidentStatus: string;
        efficiencyStatus: string;
    }>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setMetrics((prev) => ({ ...prev, [name]: value }));
            setResults(null);
        }
    };

    const validation = useMemo(() => {
        const errors: string[] = [];

        const socAnalysts = Number(metrics.socAnalysts) || 0;

        if (socAnalysts === 0) {
            errors.push("Number of SOC Analysts must be greater than zero.");
        }

        const hasOtherValues = Object.entries(metrics)
            .filter(([key]) => key !== "socAnalysts")
            .some(([_, value]) => value !== "");

        if (socAnalysts > 0 && !hasOtherValues) {
            errors.push("Please enter at least one additional metric.");
        }

        return { errors, hasError: errors.length > 0 };
    }, [metrics]);

    const getWorkloadStatus = (alertsPerAnalyst: number): string => {
        if (alertsPerAnalyst === 0) return "N/A";
        if (alertsPerAnalyst < 50) return "Low";
        if (alertsPerAnalyst < 100) return "Optimal";
        if (alertsPerAnalyst < 150) return "Good";
        if (alertsPerAnalyst < 200) return "High";
        return "Critical";
    };

    const getCoverageStatus = (assetsPerAnalyst: number): string => {
        if (assetsPerAnalyst === 0) return "N/A";
        if (assetsPerAnalyst < 300) return "Excellent";
        if (assetsPerAnalyst < 500) return "Very Good";
        if (assetsPerAnalyst < 700) return "Good";
        if (assetsPerAnalyst < 1000) return "Fair";
        return "Stretched";
    };

    const getToolUtilizationStatus = (toolsPerAnalyst: number): string => {
        if (toolsPerAnalyst === 0) return "N/A";
        if (toolsPerAnalyst < 2) return "Limited";
        if (toolsPerAnalyst < 4) return "Excellent";
        if (toolsPerAnalyst < 6) return "Good";
        if (toolsPerAnalyst < 8) return "Fair";
        return "Overwhelming";
    };

    const getTrainingStatus = (hoursPerAnalyst: number): string => {
        if (hoursPerAnalyst === 0) return "N/A";
        if (hoursPerAnalyst < 10) return "Needs Improvement";
        if (hoursPerAnalyst < 20) return "Fair";
        if (hoursPerAnalyst < 40) return "Good";
        if (hoursPerAnalyst < 80) return "Very Good";
        return "Excellent";
    };

    const getIncidentStatus = (incidentsPerAnalyst: number): string => {
        if (incidentsPerAnalyst === 0) return "N/A";
        if (incidentsPerAnalyst < 20) return "Light";
        if (incidentsPerAnalyst < 50) return "Optimal";
        if (incidentsPerAnalyst < 75) return "Good";
        if (incidentsPerAnalyst < 100) return "Heavy";
        return "Critical";
    };

    const getEfficiencyStatus = (score: number): string => {
        if (score === 0) return "N/A";
        if (score < 50) return "Needs Improvement";
        if (score < 70) return "Fair";
        if (score < 85) return "Good";
        if (score < 95) return "Very Good";
        return "Excellent";
    };

    const calculate = () => {
        const socAnalysts = Number(metrics.socAnalysts) || 0;
        const automatedAlerts = Number(metrics.automatedAlerts) || 0;
        const assetsMonitored = Number(metrics.assetsMonitored) || 0;
        const securityTools = Number(metrics.securityTools) || 0;
        const trainingHours = Number(metrics.trainingHours) || 0;
        const incidentsResolved = Number(metrics.incidentsResolved) || 0;

        const alertsPerAnalyst = socAnalysts > 0 ? automatedAlerts / socAnalysts : 0;
        const assetsPerAnalyst = socAnalysts > 0 ? assetsMonitored / socAnalysts : 0;
        const toolsPerAnalyst = socAnalysts > 0 ? securityTools / socAnalysts : 0;
        const trainingHoursPerAnalyst = socAnalysts > 0 ? trainingHours / socAnalysts : 0;
        const incidentsPerAnalyst = socAnalysts > 0 ? incidentsResolved / socAnalysts : 0;

        const efficiencyScore = socAnalysts > 0 ?
            Math.min(100, (incidentsResolved / (automatedAlerts + incidentsResolved + 1)) * 200) : 0;

        const alertWorkloadStatus = getWorkloadStatus(alertsPerAnalyst);
        const coverageStatus = getCoverageStatus(assetsPerAnalyst);
        const toolUtilizationStatus = getToolUtilizationStatus(toolsPerAnalyst);
        const trainingStatus = getTrainingStatus(trainingHoursPerAnalyst);
        const incidentStatus = getIncidentStatus(incidentsPerAnalyst);
        const efficiencyStatus = getEfficiencyStatus(efficiencyScore);

        setResults({
            alertsPerAnalyst,
            assetsPerAnalyst,
            toolsPerAnalyst,
            trainingHoursPerAnalyst,
            incidentsPerAnalyst,
            efficiencyScore,
            alertWorkloadStatus,
            coverageStatus,
            toolUtilizationStatus,
            trainingStatus,
            incidentStatus,
            efficiencyStatus,
        });
    };

    const reset = () => {
        setMetrics({
            socAnalysts: "",
            automatedAlerts: "",
            assetsMonitored: "",
            securityTools: "",
            trainingHours: "",
            incidentsResolved: "",
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
                    Resource & Coverage Metrics
                </h2>

                {!results ? (
                    <div className="transition-all duration-500 ease-in-out">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries({
                                socAnalysts: "Number of SOC Analysts",
                                automatedAlerts: "Automated Alerts Handled",
                                assetsMonitored: "Assets Monitored",
                                securityTools: "Security Tools Deployed",
                                trainingHours: "Training Hours (total)",
                                incidentsResolved: "Incidents Resolved",
                            }).map(([key, label]) => (
                                <div key={key} className="flex flex-col transition-all duration-300">
                                    <label className="text-sm text-gray-600 mb-1">
                                        {label}
                                    </label>
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
                            Resource & Productivity
                        </h3>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                            {results.alertsPerAnalyst > 0 && (
                                <ProductivityCard
                                    label="Alerts per Analyst"
                                    value={results.alertsPerAnalyst}
                                    status={results.alertWorkloadStatus}
                                    statusLabel="Workload distribution"
                                />
                            )}
                            {results.assetsPerAnalyst > 0 && (
                                <ProductivityCard
                                    label="Assets per Analyst"
                                    value={results.assetsPerAnalyst}
                                    status={results.coverageStatus}
                                    statusLabel="Coverage ratio"
                                />
                            )}
                            {results.toolsPerAnalyst > 0 && (
                                <ProductivityCard
                                    label="Tools per Analyst"
                                    value={results.toolsPerAnalyst}
                                    status={results.toolUtilizationStatus}
                                    statusLabel="Tool utilization"
                                />
                            )}
                            {results.trainingHoursPerAnalyst > 0 && (
                                <ProductivityCard
                                    label="Training Hours per Analyst"
                                    value={results.trainingHoursPerAnalyst}
                                    status={results.trainingStatus}
                                    statusLabel="Development investment"
                                    unit=" hrs"
                                />
                            )}
                            {results.incidentsPerAnalyst > 0 && (
                                <ProductivityCard
                                    label="Incidents per Analyst"
                                    value={results.incidentsPerAnalyst}
                                    status={results.incidentStatus}
                                    statusLabel="Incident load"
                                />
                            )}
                            {results.efficiencyScore > 0 && (
                                <ProductivityCard
                                    label="Efficiency Score"
                                    value={results.efficiencyScore}
                                    status={results.efficiencyStatus}
                                    statusLabel="Overall performance"
                                    unit="%"
                                />
                            )}
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

function ProductivityCard({
    label,
    value,
    status,
    statusLabel,
    unit = "",
}: {
    label: string;
    value: number;
    status: string;
    statusLabel: string;
    unit?: string;
}) {
    const getStatusColor = (status: string): string => {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus === "excellent" || lowerStatus === "very good" || lowerStatus === "optimal") {
            return "bg-green-100 border-green-300 text-green-800";
        }
        if (lowerStatus === "good" || lowerStatus === "fair" || lowerStatus === "light") {
            return "bg-blue-100 border-blue-300 text-blue-800";
        }
        if (lowerStatus === "high" || lowerStatus === "stretched" || lowerStatus === "needs improvement" || lowerStatus === "heavy") {
            return "bg-orange-100 border-orange-300 text-orange-800";
        }
        if (lowerStatus === "critical" || lowerStatus === "overwhelming") {
            return "bg-red-100 border-red-300 text-red-800";
        }
        return "bg-gray-100 border-gray-300 text-gray-800";
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col">
                <span className="text-gray-700 font-medium">{label}</span>
                <span className="text-blue-600 text-2xl font-bold mt-1">
                    {value.toFixed(1)}{unit}
                </span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 mb-1">{statusLabel}</span>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        status
                    )}`}
                >
                    {status}
                </span>
            </div>
        </div>
    );
}

export default SocProductivity;
