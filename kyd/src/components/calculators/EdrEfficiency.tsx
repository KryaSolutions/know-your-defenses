import React, { useState, useMemo, useContext } from "react";
import { MetricsContext, updateCalcMetrics } from "../CalcWrapper";
import type { MetricsContextType } from "../CalcWrapper";

const EdrEfficiency = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [metrics, setMetrics] = useState({
        totalAlerts: "",
        truePositives: "",
        falsePositives: "",
        detectionTime: "",
        responseTime: "",
        totalEndpoints: "",
        protectedEndpoints: "",
        criticalAssets: "",
        protectedCriticalAssets: "",
        securityStaff: "",
        hoursPerAlert: "",
        automatedActions: "",
        escalatedIncidents: "",
        resolvedIncidents: "",
        annualLicenseCost: "",
        staffCostPerYear: "",
        breachCostAverted: "",
        threatsDetected: "",
        threatsBlocked: "",
        zeroDayThreats: "",
        knownThreats: "",
        systemUptime: "",
        scanCpuImpact: "",
        queriesPerDay: "",
        successfulQueries: "",
        integratedTools: "",
        totalSecurityTools: "",
        apiSuccessRate: "",
    });

    const [results, setResults] = useState<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const context = useContext<MetricsContextType | null>(MetricsContext);
    if (!context) return null;
    const { setCalcMetrics } = context;

    const steps = [
        {
            title: "Detection Metrics",
            subtitle: "Alert accuracy and response timing",
            fields: [
                {
                    key: "totalAlerts",
                    label: "Total Alerts (monthly)",
                    type: "number",
                },
                {
                    key: "truePositives",
                    label: "True Positives",
                    type: "number",
                },
                {
                    key: "falsePositives",
                    label: "False Positives",
                    type: "number",
                },
                {
                    key: "detectionTime",
                    label: "Detection Time (minutes)",
                    type: "number",
                },
                {
                    key: "responseTime",
                    label: "Response Time (minutes)",
                    type: "number",
                },
            ],
        },
        {
            title: "Coverage Metrics",
            subtitle: "Endpoint and asset protection",
            fields: [
                {
                    key: "totalEndpoints",
                    label: "Total Endpoints",
                    type: "number",
                },
                {
                    key: "protectedEndpoints",
                    label: "Protected Endpoints",
                    type: "number",
                },
                {
                    key: "criticalAssets",
                    label: "Critical Assets",
                    type: "number",
                },
                {
                    key: "protectedCriticalAssets",
                    label: "Protected Critical Assets",
                    type: "number",
                },
            ],
        },
        {
            title: "Operational Metrics",
            subtitle: "Staff efficiency and automation",
            fields: [
                {
                    key: "securityStaff",
                    label: "Security Staff",
                    type: "number",
                },
                {
                    key: "hoursPerAlert",
                    label: "Hours Per Alert",
                    type: "number",
                },
                {
                    key: "automatedActions",
                    label: "Automated Actions (%)",
                    type: "percentage",
                },
                {
                    key: "escalatedIncidents",
                    label: "Escalated Incidents",
                    type: "number",
                },
                {
                    key: "resolvedIncidents",
                    label: "Resolved Incidents",
                    type: "number",
                },
            ],
        },
        {
            title: "Cost Metrics",
            subtitle: "Financial analysis",
            fields: [
                {
                    key: "annualLicenseCost",
                    label: "Annual License Cost ($)",
                    type: "currency",
                },
                {
                    key: "staffCostPerYear",
                    label: "Staff Cost Per Year ($)",
                    type: "currency",
                },
                {
                    key: "breachCostAverted",
                    label: "Breach Cost Averted ($)",
                    type: "currency",
                },
            ],
        },
        {
            title: "Threat Metrics",
            subtitle: "Detection and prevention capabilities",
            fields: [
                {
                    key: "threatsDetected",
                    label: "Threats Detected",
                    type: "number",
                },
                {
                    key: "threatsBlocked",
                    label: "Threats Blocked",
                    type: "number",
                },
                {
                    key: "zeroDayThreats",
                    label: "Zero-Day Threats",
                    type: "number",
                },
                {
                    key: "knownThreats",
                    label: "Known Threats",
                    type: "number",
                },
            ],
        },
        {
            title: "Performance & Integration",
            subtitle: "System health and tool integration",
            fields: [
                {
                    key: "systemUptime",
                    label: "System Uptime (%)",
                    type: "percentage",
                },
                {
                    key: "scanCpuImpact",
                    label: "Scan CPU Impact (%)",
                    type: "percentage",
                },
                {
                    key: "queriesPerDay",
                    label: "Queries Per Day",
                    type: "number",
                },
                {
                    key: "successfulQueries",
                    label: "Successful Queries",
                    type: "number",
                },
                {
                    key: "integratedTools",
                    label: "Integrated Tools",
                    type: "number",
                },
                {
                    key: "totalSecurityTools",
                    label: "Total Security Tools",
                    type: "number",
                },
                {
                    key: "apiSuccessRate",
                    label: "API Success Rate (%)",
                    type: "percentage",
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
            } else if (field.type === "number" || field.type === "currency") {
                if (num < 0) {
                    errors.push(`${field.label} must be non-negative`);
                    isValid = false;
                    break;
                }
            }

            if (!isValid) break;
        }

        // Cross-field validations
        if (isValid && stepIndex === 0) {
            const total = Number(metrics.totalAlerts);
            const truePos = Number(metrics.truePositives);
            const falsePos = Number(metrics.falsePositives);

            if (truePos > total) {
                errors.push("True Positives cannot exceed Total Alerts");
                isValid = false;
            } else if (falsePos > total) {
                errors.push("False Positives cannot exceed Total Alerts");
                isValid = false;
            } else if (truePos + falsePos > total) {
                errors.push(
                    "True + False Positives cannot exceed Total Alerts"
                );
                isValid = false;
            }
        }

        if (isValid && stepIndex === 1) {
            const totalEndpoints = Number(metrics.totalEndpoints);
            const protectedEndpoints = Number(metrics.protectedEndpoints);
            const criticalAssets = Number(metrics.criticalAssets);
            const protectedCritical = Number(metrics.protectedCriticalAssets);

            if (protectedEndpoints > totalEndpoints) {
                errors.push(
                    "Protected Endpoints cannot exceed Total Endpoints"
                );
                isValid = false;
            } else if (protectedCritical > criticalAssets) {
                errors.push(
                    "Protected Critical Assets cannot exceed Critical Assets"
                );
                isValid = false;
            } else if (criticalAssets > totalEndpoints) {
                errors.push("Critical Assets cannot exceed Total Endpoints");
                isValid = false;
            }
        }

        if (isValid && stepIndex === 2) {
            const escalated = Number(metrics.escalatedIncidents);
            const resolved = Number(metrics.resolvedIncidents);

            if (resolved < escalated) {
                errors.push(
                    "Resolved Incidents should typically be ≥ Escalated Incidents"
                );
                isValid = false;
            }
        }

        if (isValid && stepIndex === 4) {
            const detected = Number(metrics.threatsDetected);
            const blocked = Number(metrics.threatsBlocked);
            const zeroDay = Number(metrics.zeroDayThreats);
            const known = Number(metrics.knownThreats);

            if (blocked > detected) {
                errors.push("Threats Blocked cannot exceed Threats Detected");
                isValid = false;
            } else if (zeroDay > detected) {
                errors.push("Zero-Day Threats cannot exceed Threats Detected");
                isValid = false;
            } else if (known > detected) {
                errors.push("Known Threats cannot exceed Threats Detected");
                isValid = false;
            } else if (zeroDay + known > detected) {
                errors.push(
                    "Zero-Day + Known Threats cannot exceed Threats Detected"
                );
                isValid = false;
            }
        }

        if (isValid && stepIndex === 5) {
            const queriesPerDay = Number(metrics.queriesPerDay);
            const successful = Number(metrics.successfulQueries);
            const integrated = Number(metrics.integratedTools);
            const totalTools = Number(metrics.totalSecurityTools);

            if (successful > queriesPerDay) {
                errors.push("Successful Queries cannot exceed Queries Per Day");
                isValid = false;
            } else if (integrated > totalTools) {
                errors.push(
                    "Integrated Tools cannot exceed Total Security Tools"
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
            truePositives: Number(metrics.truePositives) || 0,
            falsePositives: Number(metrics.falsePositives) || 0,
            detectionTime: Number(metrics.detectionTime) || 0,
            responseTime: Number(metrics.responseTime) || 0,
            totalEndpoints: Number(metrics.totalEndpoints) || 1,
            protectedEndpoints: Number(metrics.protectedEndpoints) || 0,
            criticalAssets: Number(metrics.criticalAssets) || 1,
            protectedCriticalAssets:
                Number(metrics.protectedCriticalAssets) || 0,
            securityStaff: Number(metrics.securityStaff) || 1,
            hoursPerAlert: Number(metrics.hoursPerAlert) || 0,
            automatedActions: Number(metrics.automatedActions) || 0,
            escalatedIncidents: Number(metrics.escalatedIncidents) || 0,
            resolvedIncidents: Number(metrics.resolvedIncidents) || 1,
            annualLicenseCost: Number(metrics.annualLicenseCost) || 0,
            staffCostPerYear: Number(metrics.staffCostPerYear) || 0,
            breachCostAverted: Number(metrics.breachCostAverted) || 0,
            threatsDetected: Number(metrics.threatsDetected) || 1,
            threatsBlocked: Number(metrics.threatsBlocked) || 0,
            zeroDayThreats: Number(metrics.zeroDayThreats) || 0,
            knownThreats: Number(metrics.knownThreats) || 0,
            systemUptime: Number(metrics.systemUptime) || 0,
            scanCpuImpact: Number(metrics.scanCpuImpact) || 0,
            queriesPerDay: Number(metrics.queriesPerDay) || 1,
            successfulQueries: Number(metrics.successfulQueries) || 0,
            integratedTools: Number(metrics.integratedTools) || 0,
            totalSecurityTools: Number(metrics.totalSecurityTools) || 1,
            apiSuccessRate: Number(metrics.apiSuccessRate) || 0,
        };

        // Detection Analysis
        const alertAccuracy = (m.truePositives / m.totalAlerts) * 100;
        const falsePositiveRate = (m.falsePositives / m.totalAlerts) * 100;
        const mttd = m.detectionTime;
        const totalResponseTime = m.detectionTime + m.responseTime;

        // Coverage Analysis
        const endpointCoverage =
            (m.protectedEndpoints / m.totalEndpoints) * 100;
        const criticalAssetCoverage =
            (m.protectedCriticalAssets / m.criticalAssets) * 100;

        // Operational Analysis
        const alertsPerAnalyst = m.totalAlerts / m.securityStaff;
        const timeSpentOnAlerts = m.totalAlerts * m.hoursPerAlert;
        const automationRate = m.automatedActions;
        const incidentResolutionRate =
            (m.resolvedIncidents / (m.escalatedIncidents || 1)) * 100;

        // Cost Analysis
        const totalAnnualCost = m.annualLicenseCost + m.staffCostPerYear;
        const costPerEndpoint = totalAnnualCost / m.totalEndpoints;
        const costPerAlert = totalAnnualCost / (m.totalAlerts * 12);
        const roi =
            ((m.breachCostAverted - totalAnnualCost) / totalAnnualCost) * 100;

        // Threat Analysis
        const threatBlockRate = (m.threatsBlocked / m.threatsDetected) * 100;
        const zeroDayDetection = (m.zeroDayThreats / m.threatsDetected) * 100;

        // Performance Analysis
        const querySuccessRate = (m.successfulQueries / m.queriesPerDay) * 100;
        const integrationRate =
            (m.integratedTools / m.totalSecurityTools) * 100;

        // Overall Efficiency Score
        const overallEfficiency =
            (alertAccuracy +
                endpointCoverage +
                criticalAssetCoverage +
                automationRate +
                incidentResolutionRate +
                threatBlockRate +
                m.systemUptime +
                integrationRate +
                querySuccessRate +
                m.apiSuccessRate) /
            10;

        // Recommendations
        type Recommendations = {
            type: string;
            title: string;
            message: string;
        };

        const recommendations: Recommendations[] = [];
        if (falsePositiveRate > 50) {
            recommendations.push({
                type: "warning",
                title: "High False Positive Rate",
                message: `Your false positive rate is ${falsePositiveRate.toFixed(1)}%. Consider tuning detection rules, implementing better threat intelligence, or adjusting sensitivity thresholds.`,
            });
        }
        if (endpointCoverage < 95) {
            recommendations.push({
                type: "warning",
                title: "Coverage Gap",
                message: `Only ${endpointCoverage.toFixed(1)}% of endpoints are protected. Expand EDR deployment to achieve comprehensive coverage.`,
            });
        }
        if (automationRate < 50) {
            recommendations.push({
                type: "info",
                title: "Low Automation",
                message: `Only ${automationRate.toFixed(1)}% of actions are automated. Implement more automated response playbooks to improve efficiency.`,
            });
        }
        if (threatBlockRate < 90) {
            recommendations.push({
                type: "warning",
                title: "Threat Prevention Gap",
                message: `Only ${threatBlockRate.toFixed(1)}% of threats are blocked. Enhance prevention capabilities and automated blocking rules.`,
            });
        }
        if (integrationRate < 75) {
            recommendations.push({
                type: "info",
                title: "Integration Gaps",
                message: `Only ${integrationRate.toFixed(1)}% of security tools are integrated. Improve integrations for better visibility and coordinated response.`,
            });
        }
        if (costPerEndpoint > 800) {
            recommendations.push({
                type: "info",
                title: "High Cost Per Endpoint",
                message: `Cost per endpoint is $${costPerEndpoint.toFixed(2)}. Consider optimizing licensing or evaluating more cost-effective solutions.`,
            });
        }

        setIsTransitioning(true);
        setTimeout(() => {
            const buffer = {
                overallEfficiency,
                alertAccuracy,
                falsePositiveRate,
                mttd,
                totalResponseTime,
                endpointCoverage,
                criticalAssetCoverage,
                protectedEndpointsCount: m.protectedEndpoints,
                totalEndpointsCount: m.totalEndpoints,
                protectedCriticalCount: m.protectedCriticalAssets,
                totalCriticalCount: m.criticalAssets,
                alertsPerAnalyst,
                timeSpentOnAlerts,
                automationRate,
                incidentResolutionRate,
                totalAnnualCost,
                costPerEndpoint,
                costPerAlert,
                roi,
                threatBlockRate,
                zeroDayDetection,
                zeroDayCount: m.zeroDayThreats,
                systemUptime: m.systemUptime,
                scanCpuImpact: m.scanCpuImpact,
                querySuccessRate,
                integrationRate,
                integratedToolsCount: m.integratedTools,
                totalToolsCount: m.totalSecurityTools,
                apiSuccessRate: m.apiSuccessRate,
            };
            updateCalcMetrics("edrEfficiency", buffer, setCalcMetrics);

            setResults({
                overallEfficiency,
                alertAccuracy,
                falsePositiveRate,
                mttd,
                totalResponseTime,
                endpointCoverage,
                criticalAssetCoverage,
                protectedEndpointsCount: m.protectedEndpoints,
                totalEndpointsCount: m.totalEndpoints,
                protectedCriticalCount: m.protectedCriticalAssets,
                totalCriticalCount: m.criticalAssets,
                alertsPerAnalyst,
                timeSpentOnAlerts,
                automationRate,
                incidentResolutionRate,
                totalAnnualCost,
                costPerEndpoint,
                costPerAlert,
                roi,
                threatBlockRate,
                zeroDayDetection,
                zeroDayCount: m.zeroDayThreats,
                systemUptime: m.systemUptime,
                scanCpuImpact: m.scanCpuImpact,
                querySuccessRate,
                integrationRate,
                integratedToolsCount: m.integratedTools,
                totalToolsCount: m.totalSecurityTools,
                apiSuccessRate: m.apiSuccessRate,
                recommendations,
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
                truePositives: "",
                falsePositives: "",
                detectionTime: "",
                responseTime: "",
                totalEndpoints: "",
                protectedEndpoints: "",
                criticalAssets: "",
                protectedCriticalAssets: "",
                securityStaff: "",
                hoursPerAlert: "",
                automatedActions: "",
                escalatedIncidents: "",
                resolvedIncidents: "",
                annualLicenseCost: "",
                staffCostPerYear: "",
                breachCostAverted: "",
                threatsDetected: "",
                threatsBlocked: "",
                zeroDayThreats: "",
                knownThreats: "",
                systemUptime: "",
                scanCpuImpact: "",
                queriesPerDay: "",
                successfulQueries: "",
                integratedTools: "",
                totalSecurityTools: "",
                apiSuccessRate: "",
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
                className={`max-w-6xl mx-auto p-4 sm:p-6 ${isTransitioning ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
            >
                <div className="p-4 sm:p-6 border rounded-2xl bg-white">
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                            EDR Efficiency Analysis
                        </h2>
                        <p className="text-sm text-gray-600">
                            Comprehensive endpoint security assessment
                        </p>
                    </div>

                    {/* Executive Summary */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Executive Summary
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Overall Efficiency
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    {results.overallEfficiency.toFixed(1)}%
                                </div>
                                <span
                                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${overallStatus.color}`}
                                >
                                    {overallStatus.label}
                                </span>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Alert Accuracy
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    {results.alertAccuracy.toFixed(1)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Coverage
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    {results.endpointCoverage.toFixed(1)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Threat Block Rate
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    {results.threatBlockRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Automation
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    {results.automationRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Response Time
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    {results.totalResponseTime.toFixed(0)} min
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Cost/Endpoint
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    ${results.costPerEndpoint.toFixed(0)}
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    ROI
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    {results.roi.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detection Analysis */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Detection Analysis
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Alert Accuracy
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.alertAccuracy.toFixed(1)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    False Positive Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.falsePositiveRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Mean Time to Detect
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.mttd.toFixed(0)} min
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Total Response Time
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.totalResponseTime.toFixed(0)} min
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coverage Analysis */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Coverage Analysis
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Endpoint Coverage
                                </div>
                                <div className="text-2xl font-bold text-gray-800 mb-1">
                                    {results.endpointCoverage.toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-500">
                                    {results.protectedEndpointsCount} of{" "}
                                    {results.totalEndpointsCount} endpoints
                                    protected
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-(--brand-blue) h-2 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${results.endpointCoverage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Critical Asset Coverage
                                </div>
                                <div className="text-2xl font-bold text-gray-800 mb-1">
                                    {results.criticalAssetCoverage.toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-500">
                                    {results.protectedCriticalCount} of{" "}
                                    {results.totalCriticalCount} critical assets
                                    protected
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-(--brand-blue) h-2 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${results.criticalAssetCoverage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Analysis */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Operational Analysis
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Alerts Per Analyst
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.alertsPerAnalyst.toFixed(0)}
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Time on Alerts (hrs/month)
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.timeSpentOnAlerts.toFixed(0)}
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Automation Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.automationRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Incident Resolution Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.incidentResolutionRate.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cost Analysis */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Cost Analysis
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Total Annual Cost
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    $
                                    {(results.totalAnnualCost / 1000).toFixed(
                                        0
                                    )}
                                    K
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Cost Per Endpoint
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    ${results.costPerEndpoint.toFixed(2)}
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Cost Per Alert
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    ${results.costPerAlert.toFixed(2)}
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Return on Investment
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.roi.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Threat Analysis */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Threat Analysis
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Threat Block Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.threatBlockRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Zero-Day Detection
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.zeroDayDetection.toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-500">
                                    {results.zeroDayCount} zero-day threats
                                    detected
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance & Integration Analysis */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">
                            Performance Analysis
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    System Uptime
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.systemUptime.toFixed(2)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Endpoint Performance Impact
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.scanCpuImpact.toFixed(0)}%
                                </div>
                                <div className="text-xs text-gray-500">
                                    CPU impact during scans
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Query Success Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.querySuccessRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    Integration Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.integrationRate.toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-500">
                                    {results.integratedToolsCount} of{" "}
                                    {results.totalToolsCount} tools integrated
                                </div>
                            </div>
                            <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">
                                    API Success Rate
                                </div>
                                <div className="text-lg font-bold text-gray-800">
                                    {results.apiSuccessRate.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    {results.recommendations.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-3">
                                Recommendations
                            </h3>
                            <div className="space-y-3">
                                {results.recommendations.map(
                                    (rec: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`border rounded-lg p-3 ${
                                                rec.type === "warning"
                                                    ? "bg-orange-50 border-orange-200"
                                                    : "bg-blue-50 border-blue-200"
                                            }`}
                                        >
                                            <div
                                                className={`font-medium text-sm mb-1 ${
                                                    rec.type === "warning"
                                                        ? "text-orange-800"
                                                        : "text-blue-800"
                                                }`}
                                            >
                                                {rec.type === "warning"
                                                    ? "⚠️"
                                                    : "💡"}{" "}
                                                {rec.title}
                                            </div>
                                            <div
                                                className={`text-xs ${
                                                    rec.type === "warning"
                                                        ? "text-orange-700"
                                                        : "text-blue-700"
                                                }`}
                                            >
                                                {rec.message}
                                            </div>
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
                            EDR Efficiency Calculator
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
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-blue) transition-all duration-300"
                                placeholder="Enter value"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            currentStep === 0
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
    );
};

export default EdrEfficiency;
