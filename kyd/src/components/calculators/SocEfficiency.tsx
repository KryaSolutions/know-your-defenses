import React, { useState, useMemo, useContext } from "react";
import { MetricsContext, updateCalcMetrics } from "../CalcWrapper";
import type { MetricsContextType } from "../CalcWrapper";

const SocEfficiency = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [metrics, setMetrics] = useState({
        totalAlerts: "",
        truePositiveAlerts: "",
        falsePositiveAlerts: "",
        incidentsCreated: "",
        incidentsResolved: "",
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
        mttd: "",
        mttr: "",
        mttc: "",
        mttr2: "",
        mtta: "",
        mtbf: "",
        targetResponseTime: "",
        actualResponseTime: "",
        targetResolutionTime: "",
        actualResolutionTime: "",
    });

    const [results, setResults] = useState<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const context = useContext<MetricsContextType | null>(MetricsContext);
    if (!context) return null;
    const { setCalcMetrics } = context;

    const steps = [
        {
            title: "Alert & Incident Metrics",
            subtitle: "Monitor detection and incident management",
            fields: [
                {
                    key: "totalAlerts",
                    label: "Total Alerts Received",
                    type: "number",
                },
                {
                    key: "truePositiveAlerts",
                    label: "True Positive Alerts",
                    type: "number",
                },
                {
                    key: "falsePositiveAlerts",
                    label: "False Positive Alerts",
                    type: "number",
                },
                {
                    key: "incidentsCreated",
                    label: "Total Incidents Created",
                    type: "number",
                },
                {
                    key: "incidentsResolved",
                    label: "Total Incidents Resolved",
                    type: "number",
                },
            ],
        },
        {
            title: "SLA Compliance",
            subtitle: "Service Level Agreement tracking",
            fields: [
                {
                    key: "slaComplianceTarget",
                    label: "SLA Compliance Target (%)",
                    type: "percentage",
                },
                {
                    key: "slaBreaches",
                    label: "SLA Breaches",
                    type: "number",
                },
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
            subtitle: "Core operational metrics",
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
        {
            title: "Latency Metrics",
            subtitle: "Detection and response timing",
            fields: [
                {
                    key: "mttd",
                    label: "Mean Time to Detect (MTTD, minutes)",
                    type: "number",
                },
                {
                    key: "mttr",
                    label: "Mean Time to Respond (MTTR, minutes)",
                    type: "number",
                },
                {
                    key: "mttc",
                    label: "Mean Time to Contain (MTTC, minutes)",
                    type: "number",
                },
                {
                    key: "mttr2",
                    label: "Mean Time to Resolve (MTTR2, minutes)",
                    type: "number",
                },
                {
                    key: "mtta",
                    label: "Mean Time to Acknowledge (MTTA, minutes)",
                    type: "number",
                },
                {
                    key: "mtbf",
                    label: "Mean Time Between Failures (MTBF, minutes)",
                    type: "number",
                },
            ],
        },
        {
            title: "Response & Resolution SLAs",
            subtitle: "Target vs actual performance",
            fields: [
                {
                    key: "targetResponseTime",
                    label: "Target Response Time (minutes)",
                    type: "number",
                },
                {
                    key: "actualResponseTime",
                    label: "Actual Average Response Time (minutes)",
                    type: "number",
                },
                {
                    key: "targetResolutionTime",
                    label: "Target Resolution Time (minutes)",
                    type: "number",
                },
                {
                    key: "actualResolutionTime",
                    label: "Actual Average Resolution Time (minutes)",
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

            if (field.type === "percentage") {
                if (num < 0 || num > 100) {
                    errors.push(`${field.label} must be between 0 and 100`);
                    isValid = false;
                    break;
                }
            } else if (field.type === "number") {
                if (num < 0) {
                    errors.push(`${field.label} must be non-negative`);
                    isValid = false;
                    break;
                }
            }

            if (!isValid) break;
        }

        // Additional cross-field validations
        if (isValid && stepIndex === 0) {
            const totalAlerts = Number(metrics.totalAlerts);
            const truePositive = Number(metrics.truePositiveAlerts);
            const falsePositive = Number(metrics.falsePositiveAlerts);
            const incidentsCreated = Number(metrics.incidentsCreated);
            const incidentsResolved = Number(metrics.incidentsResolved);

            if (truePositive + falsePositive > totalAlerts) {
                errors.push("Total Alerts must be ≥ True + False Positives");
                isValid = false;
            }
            if (incidentsResolved > incidentsCreated) {
                errors.push("Resolved incidents cannot exceed Total incidents");
                isValid = false;
            }
        }

        if (isValid && stepIndex === 1) {
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

        if (isValid && stepIndex === 2) {
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

        if (isValid && stepIndex === 3) {
            const mttd = Number(metrics.mttd);
            const mttr = Number(metrics.mttr);
            const mttc = Number(metrics.mttc);
            const mttr2 = Number(metrics.mttr2);
            const mtta = Number(metrics.mtta);
            const mtbf = Number(metrics.mtbf);

            // MTTA should typically be the fastest (acknowledgment happens first)
            if (mtta > mttd) {
                errors.push(
                    "Mean Time to Acknowledge should typically be ≤ Mean Time to Detect"
                );
                isValid = false;
            }
            // Detection should happen before response
            else if (mttd > mttr && mttr > 0) {
                errors.push(
                    "Mean Time to Detect should typically be ≤ Mean Time to Respond"
                );
                isValid = false;
            }
            // Response should happen before containment
            else if (mttr > mttc && mttc > 0) {
                errors.push(
                    "Mean Time to Respond should typically be ≤ Mean Time to Contain"
                );
                isValid = false;
            }
            // Containment should happen before resolution
            else if (mttc > mttr2 && mttr2 > 0) {
                errors.push(
                    "Mean Time to Contain should typically be ≤ Mean Time to Resolve"
                );
                isValid = false;
            }
            // MTBF should be significantly larger than other metrics
            else if (mtbf > 0 && mtbf < mttr2) {
                errors.push(
                    "Mean Time Between Failures should be > Mean Time to Resolve"
                );
                isValid = false;
            }
        }

        if (isValid && stepIndex === 4) {
            const targetResponse = Number(metrics.targetResponseTime);
            const actualResponse = Number(metrics.actualResponseTime);
            const targetResolution = Number(metrics.targetResolutionTime);
            const actualResolution = Number(metrics.actualResolutionTime);

            if (targetResolution < targetResponse) {
                errors.push(
                    "Target Resolution Time should be ≥ Target Response Time"
                );
                isValid = false;
            } else if (actualResolution < actualResponse) {
                errors.push(
                    "Actual Resolution Time should be ≥ Actual Response Time"
                );
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
            totalAlerts: Number(metrics.totalAlerts) || 1,
            truePositiveAlerts: Number(metrics.truePositiveAlerts) || 0,
            falsePositiveAlerts: Number(metrics.falsePositiveAlerts) || 0,
            incidentsCreated: Number(metrics.incidentsCreated) || 0,
            incidentsResolved: Number(metrics.incidentsResolved) || 0,
            slaComplianceTarget: Number(metrics.slaComplianceTarget) || 95,
            slaBreaches: Number(metrics.slaBreaches) || 0,
            totalSlaTrackedIncidents:
                Number(metrics.totalSlaTrackedIncidents) || 1,
            complianceAuditsPassed: Number(metrics.complianceAuditsPassed) || 0,
            totalComplianceAudits: Number(metrics.totalComplianceAudits) || 1,
            totalIncidents: Number(metrics.totalIncidents) || 1,
            resolvedIncidents: Number(metrics.resolvedIncidents) || 0,
            securityBreaches: Number(metrics.securityBreaches) || 0,
            socTotalTime: Number(metrics.socTotalTime) || 1,
            downtime: Number(metrics.downtime) || 0,
            mttd: Number(metrics.mttd) || 0,
            mttr: Number(metrics.mttr) || 0,
            mttc: Number(metrics.mttc) || 0,
            mttr2: Number(metrics.mttr2) || 0,
            mtta: Number(metrics.mtta) || 0,
            mtbf: Number(metrics.mtbf) || 0,
            targetResponseTime: Number(metrics.targetResponseTime) || 1,
            actualResponseTime: Number(metrics.actualResponseTime) || 1,
            targetResolutionTime: Number(metrics.targetResolutionTime) || 1,
            actualResolutionTime: Number(metrics.actualResolutionTime) || 1,
        };

        // Step 1: Alert & Incident Metrics
        const detectionAccuracy = (m.truePositiveAlerts / m.totalAlerts) * 100;
        const falsePositiveRate = (m.falsePositiveAlerts / m.totalAlerts) * 100;
        const alertToIncidentConversion =
            (m.incidentsCreated / m.totalAlerts) * 100;
        const incidentClosureRate =
            (m.incidentsResolved / m.incidentsCreated) * 100;

        // Step 2: SLA Compliance
        const slaComplianceRate =
            ((m.totalSlaTrackedIncidents - m.slaBreaches) /
                m.totalSlaTrackedIncidents) *
            100;
        const auditPassRate =
            (m.complianceAuditsPassed / m.totalComplianceAudits) * 100;
        const slaTargetAchievement =
            (slaComplianceRate / m.slaComplianceTarget) * 100;

        // Step 3: Performance KPIs
        const incidentResolutionRate =
            (m.resolvedIncidents / m.totalIncidents) * 100;
        const securityBreachRate =
            (m.securityBreaches / m.totalIncidents) * 100;
        const socAvailability =
            ((m.socTotalTime - m.downtime) / m.socTotalTime) * 100;

        // Step 4: Latency Metrics
        const totalResponseTime = m.mttd + m.mttr + m.mttc + m.mttr2;
        const averageLatency =
            (m.mttd + m.mttr + m.mttc + m.mttr2 + m.mtta + m.mtbf) / 6;
        const detectionToResolutionEfficiency =
            ((m.mttd + m.mttr2) / totalResponseTime) * 100;

        // Step 5: Response & Resolution SLAs
        const responseSlaCompliance = Math.min(
            100,
            (m.targetResponseTime / m.actualResponseTime) * 100
        );
        const resolutionSlaCompliance = Math.min(
            100,
            (m.targetResolutionTime / m.actualResolutionTime) * 100
        );

        // Overall SOC Efficiency
        const overallEfficiency =
            (detectionAccuracy +
                slaComplianceRate +
                incidentResolutionRate +
                socAvailability +
                responseSlaCompliance +
                resolutionSlaCompliance) /
            6;

        // Identify strengths and improvements
        const allMetrics = [
            { name: "Detection Accuracy", value: detectionAccuracy },
            { name: "SLA Compliance", value: slaComplianceRate },
            { name: "Incident Resolution", value: incidentResolutionRate },
            { name: "SOC Availability", value: socAvailability },
            { name: "Response SLA", value: responseSlaCompliance },
            { name: "Resolution SLA", value: resolutionSlaCompliance },
        ];

        const strengths = allMetrics.filter((m) => m.value >= 90);
        const improvements = allMetrics.filter((m) => m.value <= 80);

        setIsTransitioning(true);
        setTimeout(() => {
            const buffer = {
                overallEfficiency,
                detectionAccuracy,
                falsePositiveRate,
                alertToIncidentConversion,
                incidentClosureRate,
                slaComplianceRate,
                auditPassRate,
                slaTargetAchievement,
                incidentResolutionRate,
                securityBreachRate,
                socAvailability,
                totalResponseTime,
                averageLatency,
                detectionToResolutionEfficiency,
                mtbf: m.mtbf,
                responseSlaCompliance,
                resolutionSlaCompliance,
                mttrActual: m.actualResponseTime,
                mttrResolve: m.actualResolutionTime,
            };
            updateCalcMetrics("slaPerformance", buffer, setCalcMetrics);

            setResults({
                overallEfficiency,
                detectionAccuracy,
                falsePositiveRate,
                alertToIncidentConversion,
                incidentClosureRate,
                slaComplianceRate,
                auditPassRate,
                slaTargetAchievement,
                incidentResolutionRate,
                securityBreachRate,
                socAvailability,
                totalResponseTime,
                averageLatency,
                detectionToResolutionEfficiency,
                mtbf: m.mtbf,
                responseSlaCompliance,
                resolutionSlaCompliance,
                mttrActual: m.actualResponseTime,
                mttrResolve: m.actualResolutionTime,
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
                totalAlerts: "",
                truePositiveAlerts: "",
                falsePositiveAlerts: "",
                incidentsCreated: "",
                incidentsResolved: "",
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
                mttd: "",
                mttr: "",
                mttc: "",
                mttr2: "",
                mtta: "",
                mtbf: "",
                targetResponseTime: "",
                actualResponseTime: "",
                targetResolutionTime: "",
                actualResolutionTime: "",
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
            <div
                className={`max-w-5xl mx-auto p-4 sm:p-6 ${isTransitioning ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
            >
                <div className="max-w-4xl mx-auto p-4 sm:p-6 border rounded-2xl bg-white">
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                            SOC Efficiency Analysis
                        </h2>
                        <p className="text-sm text-gray-600">
                            Comprehensive security operations assessment
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <div className="text-xs text-gray-600 mb-1">
                                Overall SOC Efficiency
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
                                Detection Accuracy
                            </div>
                            <div className="text-2xl font-bold text-gray-800 mb-2">
                                {results.detectionAccuracy.toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-600">
                                True positive rate
                            </div>
                        </div>

                        <div className="border rounded-lg p-4 bg-gray-50">
                            <div className="text-xs text-gray-600 mb-1">
                                SLA Compliance
                            </div>
                            <div className="text-2xl font-bold text-gray-800 mb-2">
                                {results.slaComplianceRate.toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-600">
                                Target achievement
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Key Performance Indicators
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                                {
                                    label: "Incident Resolution",
                                    score: results.incidentResolutionRate,
                                },
                                {
                                    label: "SOC Availability",
                                    score: results.socAvailability,
                                },
                                {
                                    label: "Response SLA",
                                    score: results.responseSlaCompliance,
                                },
                                {
                                    label: "Resolution SLA",
                                    score: results.resolutionSlaCompliance,
                                },
                                {
                                    label: "Audit Pass Rate",
                                    score: results.auditPassRate,
                                },
                                {
                                    label: "Incident Closure",
                                    score: results.incidentClosureRate,
                                },
                            ].map((component) => (
                                <div
                                    key={component.label}
                                    className="border rounded-lg p-3 bg-gray-50"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            {component.label}
                                        </span>
                                        <span className="text-lg font-bold text-gray-800">
                                            {component.score.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className="bg-(--brand-blue) h-1.5 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${Math.min(100, component.score)}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Operational Metrics
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    False Positive Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.falsePositiveRate.toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-500">
                                    Lower is better
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Security Breach Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.securityBreachRate.toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-500">
                                    Lower is better
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Alert-to-Incident Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.alertToIncidentConversion.toFixed(
                                        1
                                    )}
                                    %
                                </div>
                                <div className="text-xs text-gray-500">
                                    Conversion efficiency
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Total Response Time
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.totalResponseTime.toFixed(0)} min
                                </div>
                                <div className="text-xs text-gray-500">
                                    Detection to resolution
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    MTBF
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.mtbf.toFixed(0)} min
                                </div>
                                <div className="text-xs text-gray-500">
                                    Higher is better
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Average Latency
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.averageLatency.toFixed(0)} min
                                </div>
                                <div className="text-xs text-gray-500">
                                    Response metrics
                                </div>
                            </div>
                        </div>
                    </div>

                    {results.strengths.length > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <div className="font-medium text-green-800 text-sm mb-2">
                                Top Strengths (≥90%)
                            </div>
                            <div className="text-xs text-green-700 space-y-1">
                                {results.strengths.map((s: any, i: number) => (
                                    <div key={i}>
                                        • {s.name}: {s.value.toFixed(1)}%
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.improvements.length > 0 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                            <div className="font-medium text-orange-800 text-sm mb-2">
                                Improvement Areas (≤80%)
                            </div>
                            <div className="text-xs text-orange-700 space-y-1">
                                {results.improvements.map(
                                    (s: any, i: number) => (
                                        <div key={i}>
                                            • {s.name}: {s.value.toFixed(1)}%
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={reset}
                        className="w-full px-4 py-2 bg-(--brand-blue) text-white rounded-lg text-sm font-medium hover:scale-105 transition-colors duration-300"
                    >
                        Recalculate
                    </button>
                </div>
            </div>
        );
    }

    const currentStepData = steps[currentStep];
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <div
            className={`max-w-4xl mx-auto p-4 sm:p-6 ${isTransitioning ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        >
            <div className="border rounded-2xl bg-white p-4 sm:p-6">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                            SOC Efficiency Calculator
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
                                    metrics[field.key as keyof typeof metrics]
                                }
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-blue) transition-all duration-200"
                                placeholder="Enter value"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentStep === 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        Previous
                    </button>
                    {!validation.isValid && (
                        <div className="text-red-600 text-xs sm:text-sm text-center flex-1 transition-all duration-300">
                            • {validation.errors[0]}
                        </div>
                    )}
                    <button
                        onClick={nextStep}
                        disabled={!validation.isValid}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${!validation.isValid
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
    );
};

export default SocEfficiency;
