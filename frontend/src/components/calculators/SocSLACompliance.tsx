import React, { useState, useMemo } from "react";

const SocSlaCompliance = () => {
    const [metrics, setMetrics] = useState({
        slaTarget: "",
        slaBreaches: "",
        totalSLAIncidents: "",
        auditsPassed: "",
        totalAudits: "",
        coverageScore: "",
    });

    const [results, setResults] = useState<null | {
        slaComplianceRate: number;
        auditPassRate: number;
        coverageScore: number;
        slaStatus: string;
        auditStatus: string;
        coverageStatus: string;
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

        const slaTarget = Number(metrics.slaTarget) || 0;
        const slaBreaches = Number(metrics.slaBreaches) || 0;
        const totalSLAIncidents = Number(metrics.totalSLAIncidents) || 0;
        const auditsPassed = Number(metrics.auditsPassed) || 0;
        const totalAudits = Number(metrics.totalAudits) || 0;
        const coverageScore = Number(metrics.coverageScore) || 0;

        if (slaTarget > 0 && slaTarget > 100) {
            errors.push("SLA Compliance Target cannot exceed 100%.");
        }

        if (totalSLAIncidents > 0 && slaBreaches > totalSLAIncidents) {
            errors.push("SLA Breaches cannot exceed Total SLA-Tracked Incidents.");
        }

        if (totalAudits > 0 && auditsPassed > totalAudits) {
            errors.push("Compliance Audits Passed cannot exceed Total Compliance Audits.");
        }

        if (coverageScore > 0 && coverageScore > 100) {
            errors.push("Coverage Assessment Score cannot exceed 100%.");
        }

        const hasValues = Object.values(metrics).some(value => value !== "");
        if (!hasValues) {
            errors.push("Please enter at least one metric.");
        }

        return { errors, hasError: errors.length > 0 };
    }, [metrics]);

    const getSLAStatus = (rate: number): string => {
        if (rate === 0) return "N/A";
        if (rate < 80) return "Needs Improvement";
        if (rate < 90) return "Fair";
        if (rate < 95) return "Good";
        if (rate < 98) return "Very Good";
        return "Excellent";
    };

    const getAuditStatus = (rate: number): string => {
        if (rate === 0) return "N/A";
        if (rate < 70) return "Needs Improvement";
        if (rate < 85) return "Fair";
        if (rate < 90) return "Good";
        if (rate < 95) return "Very Good";
        return "Excellent";
    };

    const getCoverageStatus = (score: number): string => {
        if (score === 0) return "N/A";
        if (score < 60) return "Needs Improvement";
        if (score < 75) return "Fair";
        if (score < 85) return "Good";
        if (score < 95) return "Very Good";
        return "Excellent";
    };

    const calculate = () => {
        const slaBreaches = Number(metrics.slaBreaches) || 0;
        const totalSLAIncidents = Number(metrics.totalSLAIncidents) || 0;
        const auditsPassed = Number(metrics.auditsPassed) || 0;
        const totalAudits = Number(metrics.totalAudits) || 0;
        const coverageScore = Number(metrics.coverageScore) || 0;

        const slaComplianceRate = totalSLAIncidents > 0
            ? ((totalSLAIncidents - slaBreaches) / totalSLAIncidents) * 100
            : 0;

        const auditPassRate = totalAudits > 0
            ? (auditsPassed / totalAudits) * 100
            : 0;

        const slaStatus = getSLAStatus(slaComplianceRate);
        const auditStatus = getAuditStatus(auditPassRate);
        const coverageStatus = getCoverageStatus(coverageScore);

        setResults({
            slaComplianceRate,
            auditPassRate,
            coverageScore,
            slaStatus,
            auditStatus,
            coverageStatus,
        });
    };

    const reset = () => {
        setMetrics({
            slaTarget: "",
            slaBreaches: "",
            totalSLAIncidents: "",
            auditsPassed: "",
            totalAudits: "",
            coverageScore: "",
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
                    SLA & Compliance Metrics
                </h2>

                {!results ? (
                    <div className="transition-all duration-500 ease-in-out">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries({
                                slaTarget: "SLA Compliance Target (%)",
                                slaBreaches: "SLA Breaches",
                                totalSLAIncidents: "Total SLA-Tracked Incidents",
                                auditsPassed: "Compliance Audits Passed",
                                totalAudits: "Total Compliance Audits",
                                coverageScore: "Coverage Assessment Score (%)",
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
                            📋 SLA & Compliance
                        </h3>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                            {results.slaComplianceRate > 0 && (
                                <ComplianceCard
                                    label="SLA Compliance Rate"
                                    value={results.slaComplianceRate}
                                    status={results.slaStatus}
                                    statusLabel="Met SLAs / Total tracked"
                                    unit="%"
                                />
                            )}
                            {results.auditPassRate > 0 && (
                                <ComplianceCard
                                    label="Audit Pass Rate"
                                    value={results.auditPassRate}
                                    status={results.auditStatus}
                                    statusLabel="Passed / Total audits"
                                    unit="%"
                                />
                            )}
                            {results.coverageScore > 0 && (
                                <ComplianceCard
                                    label="Coverage Score"
                                    value={results.coverageScore}
                                    status={results.coverageStatus}
                                    statusLabel="Security coverage assessment"
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
};

function ComplianceCard({
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
        if (lowerStatus === "excellent" || lowerStatus === "very good") {
            return "bg-green-100 border-green-300 text-green-800";
        }
        if (lowerStatus === "good") {
            return "bg-blue-100 border-blue-300 text-blue-800";
        }
        if (lowerStatus === "fair") {
            return "bg-yellow-100 border-yellow-300 text-yellow-800";
        }
        if (lowerStatus === "needs improvement") {
            return "bg-orange-100 border-orange-300 text-orange-800";
        }
        return "bg-gray-100 border-gray-300 text-gray-800";
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col">
                <span className="text-gray-700 font-medium">{label}</span>
                <span className="text-blue-600 text-2xl font-bold mt-1">
                    {value.toFixed(2)}{unit}
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

export default SocSlaCompliance;
