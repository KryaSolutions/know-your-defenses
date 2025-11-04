import React, { useState, useMemo, useContext } from "react";
import { MetricsContext, updateCalcMetrics } from "../CalcWrapper";
import type { MetricsContextType } from "../CalcWrapper";

const SlaPerformance = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [metrics, setMetrics] = useState({
        slaComplianceTarget: "",
        slaBreaches: "",
        totalSlaTrackedIncidents: "",
        complianceAuditsPassed: "",
        totalComplianceAudits: "",
        totalIncidents: "",
        resolvedIncidents: "",
        securityBreaches: "",
        socTotalTime: "",
        downtime: "",
    });

    const [results, setResults] = useState<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const context = useContext<MetricsContextType | null>(MetricsContext);
    if (!context) return null;
    const { setCalcMetrics } = context;

    const steps = [
        {
            title: "SLA Compliance",
            subtitle: "Track and evaluate SLA performance",
            fields: [
                {
                    key: "slaComplianceTarget",
                    label: "SLA Compliance Target (%)",
                    type: "percentage",
                },
                { key: "slaBreaches", label: "SLA Breaches", type: "number" },
                {
                    key: "totalSlaTrackedIncidents",
                    label: "Total SLA-Tracked Incidents",
                    type: "number",
                },
                {
                    key: "complianceAuditsPassed",
                    label: "Compliance Audits Passed",
                    type: "number",
                },
                {
                    key: "totalComplianceAudits",
                    label: "Total Compliance Audits",
                    type: "number",
                },
            ],
        },
        {
            title: "Performance KPIs",
            subtitle: "Operational efficiency and uptime",
            fields: [
                {
                    key: "totalIncidents",
                    label: "Total Incidents",
                    type: "number",
                },
                {
                    key: "resolvedIncidents",
                    label: "Resolved Incidents",
                    type: "number",
                },
                {
                    key: "securityBreaches",
                    label: "Security Breaches",
                    type: "number",
                },
                {
                    key: "socTotalTime",
                    label: "SOC Total Available Time (minutes)",
                    type: "number",
                },
                {
                    key: "downtime",
                    label: "Downtime (minutes)",
                    type: "number",
                },
            ],
        },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setMetrics((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateStep = (stepIndex: number) => {
        const currentFields = steps[stepIndex].fields;
        const errors: string[] = [];
        let isValid = true;

        for (const field of currentFields) {
            const value = metrics[field.key as keyof typeof metrics];
            if (value === "" || value === undefined) {
                errors.push(`${field.label} is required`);
                isValid = false;
                break;
            }

            const num = Number(value);
            if (isNaN(num)) {
                errors.push(`${field.label} must be a valid number`);
                isValid = false;
                break;
            }

            if (field.type === "percentage" && (num < 0 || num > 100)) {
                errors.push(`${field.label} must be between 0 and 100`);
                isValid = false;
                break;
            } else if (field.type === "number" && num < 0) {
                errors.push(`${field.label} must be non-negative`);
                isValid = false;
                break;
            }
        }

        if (isValid && stepIndex === 0) {
            const slaBreaches = Number(metrics.slaBreaches);
            const totalSlaIncidents = Number(metrics.totalSlaTrackedIncidents);
            const auditsPassed = Number(metrics.complianceAuditsPassed);
            const totalAudits = Number(metrics.totalComplianceAudits);

            if (slaBreaches > totalSlaIncidents) {
                errors.push(
                    "SLA Breaches cannot exceed Total SLA-Tracked Incidents"
                );
                isValid = false;
            } else if (auditsPassed > totalAudits) {
                errors.push("Audits Passed cannot exceed Total Audits");
                isValid = false;
            }
        }

        if (isValid && stepIndex === 1) {
            const resolved = Number(metrics.resolvedIncidents);
            const total = Number(metrics.totalIncidents);
            const breaches = Number(metrics.securityBreaches);
            const downtime = Number(metrics.downtime);
            const totalTime = Number(metrics.socTotalTime);

            if (resolved > total) {
                errors.push("Resolved Incidents cannot exceed Total Incidents");
                isValid = false;
            } else if (breaches > total) {
                errors.push("Security Breaches cannot exceed Total Incidents");
                isValid = false;
            } else if (downtime > totalTime) {
                errors.push("Downtime cannot exceed Total Available Time");
                isValid = false;
            }
        }

        return { isValid, errors };
    };

    const validation = useMemo(
        () => validateStep(currentStep),
        [currentStep, metrics]
    );

    const calculateResults = () => {
        const m = {
            slaComplianceTarget: Number(metrics.slaComplianceTarget),
            slaBreaches: Number(metrics.slaBreaches),
            totalSlaTrackedIncidents: Number(metrics.totalSlaTrackedIncidents),
            complianceAuditsPassed: Number(metrics.complianceAuditsPassed),
            totalComplianceAudits: Number(metrics.totalComplianceAudits),
            totalIncidents: Number(metrics.totalIncidents),
            resolvedIncidents: Number(metrics.resolvedIncidents),
            securityBreaches: Number(metrics.securityBreaches),
            socTotalTime: Number(metrics.socTotalTime),
            downtime: Number(metrics.downtime),
        };

        // SLA Metrics
        const slaComplianceRate =
            ((m.totalSlaTrackedIncidents - m.slaBreaches) /
                m.totalSlaTrackedIncidents) *
            100;
        const auditPassRate =
            (m.complianceAuditsPassed / m.totalComplianceAudits) * 100;
        const slaTargetAchievement =
            (slaComplianceRate / m.slaComplianceTarget) * 100;

        // Performance KPIs
        const incidentResolutionRate =
            (m.resolvedIncidents / m.totalIncidents) * 100;
        const securityBreachRate =
            (m.securityBreaches / m.totalIncidents) * 100;
        const socAvailability =
            ((m.socTotalTime - m.downtime) / m.socTotalTime) * 100;

        // Combined performance score
        const overallEfficiency =
            (slaComplianceRate +
                auditPassRate +
                incidentResolutionRate +
                socAvailability) /
            4;

        const strengths = [
            { name: "SLA Compliance", value: slaComplianceRate },
            { name: "Incident Resolution", value: incidentResolutionRate },
            { name: "SOC Availability", value: socAvailability },
            { name: "Audit Pass Rate", value: auditPassRate },
        ].filter((m) => m.value >= 90);

        const improvements = [
            { name: "SLA Compliance", value: slaComplianceRate },
            { name: "Incident Resolution", value: incidentResolutionRate },
            { name: "SOC Availability", value: socAvailability },
            { name: "Audit Pass Rate", value: auditPassRate },
        ].filter((m) => m.value <= 80);

        setIsTransitioning(true);
        setTimeout(() => {
            const buffer = {
                overallEfficiency,
                slaComplianceRate,
                auditPassRate,
                slaTargetAchievement,
                incidentResolutionRate,
                securityBreachRate,
                socAvailability,
            };
            updateCalcMetrics("slaPerformance", buffer, setCalcMetrics);

            setResults({
                overallEfficiency,
                slaComplianceRate,
                auditPassRate,
                slaTargetAchievement,
                incidentResolutionRate,
                securityBreachRate,
                socAvailability,
                strengths,
                improvements,
            });

            setIsTransitioning(false);
        }, 300);
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
                setIsTransitioning(false);
            }, 300);
        } else {
            calculateResults();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep(currentStep - 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const reset = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentStep(0);
            setMetrics({
                slaComplianceTarget: "",
                slaBreaches: "",
                totalSlaTrackedIncidents: "",
                complianceAuditsPassed: "",
                totalComplianceAudits: "",
                totalIncidents: "",
                resolvedIncidents: "",
                securityBreaches: "",
                socTotalTime: "",
                downtime: "",
            });
            setResults(null);
            setIsTransitioning(false);
        }, 300);
    };

    const getStatus = (score: number) => {
        if (score >= 90)
            return {
                label: "Excellent",
                color: "bg-green-100 border-green-300 text-green-800",
            };
        if (score >= 75)
            return {
                label: "Good",
                color: "bg-blue-100 border-blue-300 text-blue-800",
            };
        if (score >= 60)
            return {
                label: "Fair",
                color: "bg-yellow-100 border-yellow-300 text-yellow-800",
            };
        return {
            label: "Needs Improvement",
            color: "bg-orange-100 border-orange-300 text-orange-800",
        };
    };

    if (results) {
        const overallStatus = getStatus(results.overallEfficiency);
        return (
            <>
                <div
                    className={`max-w-5xl mx-auto p-6 ${isTransitioning ? "animate-fadeOut" : "animate-fadeIn"}`}
                >
                    <div className="max-w-3xl mx-auto p-6 border rounded-2xl bg-white relative">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                SLA & Performance KPI Results
                            </h2>
                            <p className="text-sm text-gray-600">
                                Comprehensive SLA and performance assessment
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Overall Efficiency
                                </div>
                                <div className="text-2xl font-bold text-gray-800 mb-2">
                                    {results.overallEfficiency.toFixed(1)}%
                                </div>
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${overallStatus.color}`}
                                >
                                    {overallStatus.label}
                                </span>
                            </div>
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    SLA Compliance
                                </div>
                                <div className="text-2xl font-bold text-gray-800 mb-2">
                                    {results.slaComplianceRate.toFixed(1)}%
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-3">
                                Key Performance Metrics
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    {
                                        label: "Audit Pass Rate",
                                        score: results.auditPassRate,
                                    },
                                    {
                                        label: "Incident Resolution",
                                        score: results.incidentResolutionRate,
                                    },
                                    {
                                        label: "SOC Availability",
                                        score: results.socAvailability,
                                    },
                                    {
                                        label: "Security Breach Rate",
                                        score: results.securityBreachRate,
                                    },
                                ].map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="border rounded-lg p-3 bg-gray-50"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">
                                                {metric.label}
                                            </span>
                                            <span className="text-lg font-bold text-gray-800">
                                                {metric.score.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="bg-(--brand-blue) h-1.5 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${Math.min(100, metric.score)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="mt-6">
                                {results.strengths.length > 0 && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                        <div className="text-sm font-medium text-green-800 mb-1">
                                            Top Strengths (≥90%)
                                        </div>
                                        <ul className="text-xs text-green-700 space-y-1">
                                            {results.strengths.map(
                                                (s: any, i: number) => (
                                                    <li key={i}>
                                                        • {s.name}:{" "}
                                                        {s.value.toFixed(1)}%
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                                {results.improvements.length > 0 && (
                                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                        <div className="text-sm font-medium text-orange-800 mb-1">
                                            Improvement Areas (≤80%)
                                        </div>
                                        <ul className="text-xs text-orange-700 space-y-1">
                                            {results.improvements.map(
                                                (s: any, i: number) => (
                                                    <li key={i}>
                                                        • {s.name}:{" "}
                                                        {s.value.toFixed(1)}%
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={reset}
                            className="w-full px-4 py-2 bg-(--brand-blue) text-white rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300"
                        >
                            Recalculate
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const currentStepData = steps[currentStep];
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <>
            <div
                className={`max-w-3xl mx-auto p-6 ${isTransitioning ? "animate-fadeOut" : "animate-fadeIn"}`}
            >
                <div className="border rounded-2xl bg-white p-6">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-semibold text-gray-800">
                                SLA & Performance Calculator
                            </h2>
                            <span className="text-xs text-gray-600">
                                Step {currentStep + 1} of {steps.length}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                            <div
                                className="bg-(--brand-blue) h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <h3 className="text-base font-semibold text-gray-800 mb-1">
                            {currentStepData.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                            {currentStepData.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {currentStepData.fields.map((field) => (
                            <div key={field.key} className="flex flex-col">
                                <label className="text-sm text-gray-600 mb-1">
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    name={field.key}
                                    value={
                                        metrics[
                                            field.key as keyof typeof metrics
                                        ]
                                    }
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-blue) transition-all duration-300"
                                    placeholder="Enter value"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                currentStep === 0
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "border border-gray-300 text-gray-700 hover:scale-105"
                            }`}
                        >
                            Previous
                        </button>
                        {!validation.isValid && (
                            <div className="text-red-600 text-sm text-center flex-1 transition-all duration-300">
                                • {validation.errors[0]}
                            </div>
                        )}
                        <button
                            onClick={nextStep}
                            disabled={!validation.isValid}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                !validation.isValid
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-(--brand-blue) text-white hover:scale-105"
                            }`}
                        >
                            {currentStep === steps.length - 1
                                ? "Calculate Results"
                                : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SlaPerformance;
