import React, { useState, useMemo } from "react";

const IdamEffCalc = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [metrics, setMetrics] = useState({
        privilegedAccounts: "",
        pamCoverage: "",
        sessionMonitoring: "",
        passwordVaulting: "",
        totalUsers: "",
        accessReviewCompliance: "",
        provisioningTime: "",
        deprovisioningTime: "",
        roleBasedAccess: "",
        mfaAdoption: "",
        ssoImplementation: "",
        adaptiveAuth: "",
        policyCompliance: "",
        auditReadiness: "",
        segregationDuties: "",
        mtDetect: "",
        mtRespond: "",
        automatedRemediation: "",
        annualBudget: "",
        securityIncidents: "",
    });

    const [results, setResults] = useState<any>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const steps = [
        {
            title: "PIM/PAM",
            subtitle: "Privileged Access Management",
            fields: [
                { key: "privilegedAccounts", label: "Privileged Accounts", type: "number" },
                { key: "pamCoverage", label: "PAM Coverage (%)", type: "percentage" },
                { key: "sessionMonitoring", label: "Session Monitoring (%)", type: "percentage" },
                { key: "passwordVaulting", label: "Password Vaulting (%)", type: "percentage" },
            ],
        },
        {
            title: "IGA",
            subtitle: "Identity Governance & Administration",
            fields: [
                { key: "totalUsers", label: "Total Users", type: "number" },
                { key: "accessReviewCompliance", label: "Access Review Compliance (%)", type: "percentage" },
                { key: "provisioningTime", label: "Provisioning Time (hrs)", type: "number" },
                { key: "deprovisioningTime", label: "De-Provisioning Time (hrs)", type: "number" },
                { key: "roleBasedAccess", label: "Role-Based Access (%)", type: "percentage" },
            ],
        },
        {
            title: "Authentication",
            subtitle: "Authentication & Access Control",
            fields: [
                { key: "mfaAdoption", label: "MFA Adoption (%)", type: "percentage" },
                { key: "ssoImplementation", label: "SSO Implementation (%)", type: "percentage" },
                { key: "adaptiveAuth", label: "Adaptive Auth Coverage (%)", type: "percentage" },
            ],
        },
        {
            title: "Governance",
            subtitle: "Governance & Compliance",
            fields: [
                { key: "policyCompliance", label: "Policy Compliance (%)", type: "percentage" },
                { key: "auditReadiness", label: "Audit Readiness (%)", type: "percentage" },
                { key: "segregationDuties", label: "Segregation of Duties (%)", type: "percentage" },
            ],
        },
        {
            title: "Incident Response",
            subtitle: "Detection & Response Capabilities",
            fields: [
                { key: "mtDetect", label: "Mean Time to Detect (hrs)", type: "number" },
                { key: "mtRespond", label: "Mean Time to Respond (hrs)", type: "number" },
                { key: "automatedRemediation", label: "Automated Remediation (%)", type: "percentage" },
            ],
        },
        {
            title: "Cost & Risk",
            subtitle: "Financial Impact Assessment",
            fields: [
                { key: "annualBudget", label: "Annual IDAM Budget ($)", type: "currency" },
                { key: "securityIncidents", label: "Security Incidents per Year", type: "number" },
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

            switch (field.type) {
                case "percentage":
                    if (num < 0 || num > 100) {
                        errors.push(`${field.label} must be between 0 and 100`);
                        isValid = false;
                        break;
                    }
                    break;
                case "number":
                case "currency":
                    if (num < 0) {
                        errors.push(`${field.label} must be non-negative`);
                        isValid = false;
                        break;
                    }
                    break;
            }
            if (!isValid) break;
        }

        return { isValid, errors };
    };

    const validation = useMemo(() => validateStep(currentStep), [currentStep, metrics]);

    const calculateResults = () => {
        const m = {
            pamCoverage: Number(metrics.pamCoverage) || 0,
            sessionMonitoring: Number(metrics.sessionMonitoring) || 0,
            passwordVaulting: Number(metrics.passwordVaulting) || 0,
            accessReviewCompliance: Number(metrics.accessReviewCompliance) || 0,
            provisioningTime: Number(metrics.provisioningTime) || 72,
            deprovisioningTime: Number(metrics.deprovisioningTime) || 48,
            roleBasedAccess: Number(metrics.roleBasedAccess) || 0,
            mfaAdoption: Number(metrics.mfaAdoption) || 0,
            ssoImplementation: Number(metrics.ssoImplementation) || 0,
            adaptiveAuth: Number(metrics.adaptiveAuth) || 0,
            policyCompliance: Number(metrics.policyCompliance) || 0,
            auditReadiness: Number(metrics.auditReadiness) || 0,
            segregationDuties: Number(metrics.segregationDuties) || 0,
            mtDetect: Number(metrics.mtDetect) || 24,
            mtRespond: Number(metrics.mtRespond) || 48,
            automatedRemediation: Number(metrics.automatedRemediation) || 0,
            annualBudget: Number(metrics.annualBudget) || 500000,
            securityIncidents: Number(metrics.securityIncidents) || 10,
        };

        const pimPamScore = (m.pamCoverage + m.sessionMonitoring + m.passwordVaulting) / 3;
        const igaScore = (m.accessReviewCompliance + m.roleBasedAccess +
            (100 - Math.min(100, (m.provisioningTime / 72) * 100)) +
            (100 - Math.min(100, (m.deprovisioningTime / 48) * 100))) / 4;
        const authScore = (m.mfaAdoption + m.ssoImplementation + m.adaptiveAuth) / 3;
        const govScore = (m.policyCompliance + m.auditReadiness + m.segregationDuties) / 3;
        const irScore = ((100 - Math.min(100, (m.mtDetect / 24) * 100)) +
            (100 - Math.min(100, (m.mtRespond / 48) * 100)) +
            m.automatedRemediation) / 3;

        const overallEfficiency = (pimPamScore + igaScore + authScore + govScore + irScore) / 5;

        const provisioningEff = 100 - Math.min(100, (m.provisioningTime / 72) * 100);
        const deprovisioningEff = 100 - Math.min(100, (m.deprovisioningTime / 48) * 100);
        const riskReduction = ((m.pamCoverage + m.mfaAdoption + m.segregationDuties) / 3) * 0.7;

        const avgIncidentCost = 75000;
        const potentialLossPrevented = m.securityIncidents * avgIncidentCost * (riskReduction / 100);
        const automationSavings = m.annualBudget * 0.05 * (m.automatedRemediation / 100);
        const totalValue = potentialLossPrevented + automationSavings;
        const roi = (totalValue / m.annualBudget) * 100;

        const timeToValue = Math.max(30, 180 - (overallEfficiency * 1.5));

        setIsTransitioning(true);
        setTimeout(() => {
            setResults({
                overallEfficiency,
                roi,
                timeToValue,
                pimPamScore,
                igaScore,
                authScore,
                govScore,
                irScore,
                provisioningEff,
                deprovisioningEff,
                riskReduction,
                potentialLossPrevented,
                automationSavings,
                totalValue,
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
                privilegedAccounts: "", pamCoverage: "", sessionMonitoring: "", passwordVaulting: "",
                totalUsers: "", accessReviewCompliance: "", provisioningTime: "", deprovisioningTime: "", roleBasedAccess: "",
                mfaAdoption: "", ssoImplementation: "", adaptiveAuth: "",
                policyCompliance: "", auditReadiness: "", segregationDuties: "",
                mtDetect: "", mtRespond: "", automatedRemediation: "",
                annualBudget: "", securityIncidents: "",
            });
            setResults(null);
            setIsTransitioning(false);
        }, 300);
    };

    const getStatus = (score: number) => {
        if (score >= 90) return { label: "Excellent", color: "bg-green-100 border-green-300 text-green-800" };
        if (score >= 75) return { label: "Good", color: "bg-blue-100 border-blue-300 text-blue-800" };
        if (score >= 60) return { label: "Fair", color: "bg-yellow-100 border-yellow-300 text-yellow-800" };
        return { label: "Needs Improvement", color: "bg-orange-100 border-orange-300 text-orange-800" };
    };

    if (results) {
        const overallStatus = getStatus(results.overallEfficiency);

        return (
            <>
                <div className={`max-w-5xl mx-auto p-6 ${isTransitioning ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                    <div className="max-w-3xl mx-auto p-6 border rounded-2xl bg-white relative">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">IDAM Efficiency Analysis</h2>
                            <p className="text-sm text-gray-600">Comprehensive security posture assessment</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">Overall IDAM Efficiency</div>
                                <div className="text-2xl font-bold text-gray-800 mb-2">{results.overallEfficiency.toFixed(1)}%</div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${overallStatus.color}`}>
                                    {overallStatus.label}
                                </span>
                            </div>

                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">Estimated ROI</div>
                                <div className="text-2xl font-bold text-gray-800 mb-2">{results.roi.toFixed(0)}%</div>
                                <div className="text-xs text-gray-600">${(results.totalValue / 1000).toFixed(0)}K value</div>
                            </div>

                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="text-xs text-gray-600 mb-1">Time to Value</div>
                                <div className="text-2xl font-bold text-gray-800 mb-2">{Math.round(results.timeToValue)}</div>
                                <div className="text-xs text-gray-600">days</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-3">Component Efficiency Scores</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {[
                                    { label: "PIM/PAM", score: results.pimPamScore },
                                    { label: "IGA", score: results.igaScore },
                                    { label: "Authentication", score: results.authScore },
                                    { label: "Governance", score: results.govScore },
                                    { label: "Incident Response", score: results.irScore },
                                ].map((component) => (
                                    <div key={component.label} className="border rounded-lg p-3 bg-gray-50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">{component.label}</span>
                                            <span className="text-lg font-bold text-gray-800">{component.score.toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                                                style={{ width: `${component.score}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-3">Detailed Analysis</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="border rounded-lg p-3 bg-gray-50">
                                    <div className="text-xs text-gray-600 mb-1">Provisioning Efficiency</div>
                                    <div className="text-lg font-bold text-gray-800">{results.provisioningEff.toFixed(1)}%</div>
                                    <div className="text-xs text-gray-500">vs. 72-hour baseline</div>
                                </div>
                                <div className="border rounded-lg p-3 bg-gray-50">
                                    <div className="text-xs text-gray-600 mb-1">De-Provisioning Efficiency</div>
                                    <div className="text-lg font-bold text-gray-800">{results.deprovisioningEff.toFixed(1)}%</div>
                                    <div className="text-xs text-gray-500">vs. 48-hour baseline</div>
                                </div>
                                <div className="border rounded-lg p-3 bg-gray-50">
                                    <div className="text-xs text-gray-600 mb-1">Risk Reduction</div>
                                    <div className="text-lg font-bold text-gray-800">{results.riskReduction.toFixed(1)}%</div>
                                    <div className="text-xs text-gray-500">estimated impact</div>
                                </div>
                                <div className="border rounded-lg p-3 bg-gray-50">
                                    <div className="text-xs text-gray-600 mb-1">Potential Loss Prevented</div>
                                    <div className="text-lg font-bold text-gray-800">${(results.potentialLossPrevented / 1000).toFixed(0)}K</div>
                                    <div className="text-xs text-gray-500">annually</div>
                                </div>
                            </div>
                        </div>

                        {results.igaScore < 70 && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                                <div className="font-medium text-orange-800 text-sm mb-1">IGA Optimization Needed</div>
                                <div className="text-xs text-orange-700">
                                    Focus on reducing provisioning times and improving access review compliance.
                                </div>
                            </div>
                        )}

                        <button
                            onClick={reset}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
                        >
                            Start New Assessment
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
            <div className={`max-w-3xl mx-auto p-6 ${isTransitioning ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                <div className="border rounded-2xl bg-white p-6">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-semibold text-gray-800">IDAM Efficiency Calculator</h2>
                            <span className="text-xs text-gray-600">Step {currentStep + 1} of {steps.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                            <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <h3 className="text-base font-semibold text-gray-800 mb-1">{currentStepData.title}</h3>
                        <p className="text-xs text-gray-600">{currentStepData.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {currentStepData.fields.map((field) => (
                            <div key={field.key} className="flex flex-col">
                                <label className="text-sm text-gray-600 mb-1">{field.label}</label>
                                <input
                                    type="text"
                                    name={field.key}
                                    value={metrics[field.key as keyof typeof metrics]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    placeholder="Enter value"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between gap-3">
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
                            <div className="text-red-600 text-sm text-center flex-1 transition-all duration-300">
                                • {validation.errors[0]}
                            </div>
                        )}
                        <button
                            onClick={nextStep}
                            disabled={!validation.isValid}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${!validation.isValid
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            {currentStep === steps.length - 1 ? "Calculate Results" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IdamEffCalc;
