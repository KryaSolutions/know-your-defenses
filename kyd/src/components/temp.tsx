import { useState, useMemo } from "react";
import {
    Shield,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    Clock,
    DollarSign,
    Users,
    Activity,
} from "lucide-react";

export default function EDREfficiencyCalculator() {
    const [metrics, setMetrics] = useState({
        // Detection Metrics
        totalAlerts: 1000,
        truePositives: 150,
        falsePositives: 850,
        detectionTime: 30, // minutes
        responseTime: 60, // minutes

        // Coverage Metrics
        totalEndpoints: 500,
        protectedEndpoints: 450,
        criticalAssets: 100,
        protectedCriticalAssets: 85,

        // Operational Metrics
        securityStaff: 5,
        hoursPerAlert: 0.5,
        automatedActions: 30, // percentage
        escalatedIncidents: 50,
        resolvedIncidents: 45,

        // Cost Metrics
        annualLicenseCost: 50000,
        staffCostPerYear: 400000,
        breachCostAverted: 500000,

        // Performance Metrics
        systemUptime: 99.5, // percentage
        scanImpact: 15, // percentage CPU impact
        queriesPerDay: 200,
        successfulQueries: 190,

        // Threat Metrics
        threatsDetected: 120,
        threatsBlocked: 100,
        zeroDay: 5,
        knownThreats: 115,

        // Integration Metrics
        integratedTools: 8,
        totalSecurityTools: 12,
        dataSourcesConnected: 15,
        apiCallSuccessRate: 95,
    });

    const handleChange = (field, value) => {
        setMetrics((prev) => ({
            ...prev,
            [field]: parseFloat(value) || 0,
        }));
    };

    const calculations = useMemo(() => {
        // Detection Efficiency
        const alertAccuracy =
            metrics.totalAlerts > 0
                ? (metrics.truePositives / metrics.totalAlerts) * 100
                : 0;
        const falsePositiveRate =
            metrics.totalAlerts > 0
                ? (metrics.falsePositives / metrics.totalAlerts) * 100
                : 0;
        const meanTimeToDetect = metrics.detectionTime;
        const meanTimeToRespond = metrics.responseTime;
        const totalResponseTime = meanTimeToDetect + meanTimeToRespond;

        // Coverage Score
        const endpointCoverage =
            metrics.totalEndpoints > 0
                ? (metrics.protectedEndpoints / metrics.totalEndpoints) * 100
                : 0;
        const criticalAssetCoverage =
            metrics.criticalAssets > 0
                ? (metrics.protectedCriticalAssets / metrics.criticalAssets) *
                  100
                : 0;

        // Operational Efficiency
        const alertsPerAnalyst =
            metrics.securityStaff > 0
                ? metrics.totalAlerts / metrics.securityStaff
                : 0;
        const timeSpentOnAlerts = metrics.totalAlerts * metrics.hoursPerAlert;
        const automationRate = metrics.automatedActions;
        const incidentResolutionRate =
            metrics.escalatedIncidents > 0
                ? (metrics.resolvedIncidents / metrics.escalatedIncidents) * 100
                : 0;

        // Cost Efficiency
        const totalCost = metrics.annualLicenseCost + metrics.staffCostPerYear;
        const costPerEndpoint =
            metrics.protectedEndpoints > 0
                ? totalCost / metrics.protectedEndpoints
                : 0;
        const costPerAlert =
            metrics.totalAlerts > 0 ? totalCost / metrics.totalAlerts : 0;
        const roi =
            totalCost > 0
                ? ((metrics.breachCostAverted - totalCost) / totalCost) * 100
                : 0;

        // Threat Prevention
        const threatBlockRate =
            metrics.threatsDetected > 0
                ? (metrics.threatsBlocked / metrics.threatsDetected) * 100
                : 0;
        const zeroDayPercentage =
            metrics.threatsDetected > 0
                ? (metrics.zeroDay / metrics.threatsDetected) * 100
                : 0;

        // System Performance
        const querySuccessRate =
            metrics.queriesPerDay > 0
                ? (metrics.successfulQueries / metrics.queriesPerDay) * 100
                : 0;
        const integrationRate =
            metrics.totalSecurityTools > 0
                ? (metrics.integratedTools / metrics.totalSecurityTools) * 100
                : 0;

        // Overall Efficiency Score (weighted average)
        const efficiencyScore =
            alertAccuracy * 0.2 +
            endpointCoverage * 0.15 +
            criticalAssetCoverage * 0.15 +
            (100 - falsePositiveRate) * 0.1 +
            automationRate * 0.1 +
            incidentResolutionRate * 0.1 +
            threatBlockRate * 0.1 +
            metrics.systemUptime * 0.1;

        return {
            alertAccuracy,
            falsePositiveRate,
            meanTimeToDetect,
            meanTimeToRespond,
            totalResponseTime,
            endpointCoverage,
            criticalAssetCoverage,
            alertsPerAnalyst,
            timeSpentOnAlerts,
            automationRate,
            incidentResolutionRate,
            totalCost,
            costPerEndpoint,
            costPerAlert,
            roi,
            threatBlockRate,
            zeroDayPercentage,
            querySuccessRate,
            integrationRate,
            efficiencyScore,
        };
    }, [metrics]);

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        if (score >= 40) return "Fair";
        return "Needs Improvement";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Shield className="w-12 h-12 text-blue-400" />
                        <h1 className="text-4xl font-bold text-white">
                            EDR Efficiency Calculator
                        </h1>
                    </div>
                    <p className="text-blue-200 text-lg">
                        Comprehensive analysis of your endpoint detection and
                        response solution
                    </p>
                </div>

                {/* Overall Score */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Overall Efficiency Score
                        </h2>
                        <div
                            className={`text-7xl font-bold mb-2 ${getScoreColor(calculations.efficiencyScore)}`}
                        >
                            {calculations.efficiencyScore.toFixed(1)}%
                        </div>
                        <div className="text-xl text-blue-200">
                            {getScoreLabel(calculations.efficiencyScore)}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Detection Metrics Input */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-6 h-6 text-yellow-400" />
                            <h3 className="text-xl font-bold text-white">
                                Detection Metrics
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Total Alerts (monthly)
                                </label>
                                <input
                                    type="number"
                                    value={metrics.totalAlerts}
                                    onChange={(e) =>
                                        handleChange(
                                            "totalAlerts",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    True Positives
                                </label>
                                <input
                                    type="number"
                                    value={metrics.truePositives}
                                    onChange={(e) =>
                                        handleChange(
                                            "truePositives",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    False Positives
                                </label>
                                <input
                                    type="number"
                                    value={metrics.falsePositives}
                                    onChange={(e) =>
                                        handleChange(
                                            "falsePositives",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Detection Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={metrics.detectionTime}
                                    onChange={(e) =>
                                        handleChange(
                                            "detectionTime",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Response Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={metrics.responseTime}
                                    onChange={(e) =>
                                        handleChange(
                                            "responseTime",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Detection Results */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-6 h-6 text-green-400" />
                            <h3 className="text-xl font-bold text-white">
                                Detection Analysis
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Alert Accuracy
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(calculations.alertAccuracy)}`}
                                >
                                    {calculations.alertAccuracy.toFixed(1)}%
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    False Positive Rate
                                </div>
                                <div
                                    className={`text-3xl font-bold ${calculations.falsePositiveRate < 20 ? "text-green-600" : calculations.falsePositiveRate < 50 ? "text-yellow-600" : "text-red-600"}`}
                                >
                                    {calculations.falsePositiveRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Mean Time to Detect (MTTD)
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {calculations.meanTimeToDetect} min
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Total Response Time
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {calculations.totalResponseTime} min
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coverage Metrics Input */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-6 h-6 text-blue-400" />
                            <h3 className="text-xl font-bold text-white">
                                Coverage Metrics
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Total Endpoints
                                </label>
                                <input
                                    type="number"
                                    value={metrics.totalEndpoints}
                                    onChange={(e) =>
                                        handleChange(
                                            "totalEndpoints",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Protected Endpoints
                                </label>
                                <input
                                    type="number"
                                    value={metrics.protectedEndpoints}
                                    onChange={(e) =>
                                        handleChange(
                                            "protectedEndpoints",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Critical Assets
                                </label>
                                <input
                                    type="number"
                                    value={metrics.criticalAssets}
                                    onChange={(e) =>
                                        handleChange(
                                            "criticalAssets",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Protected Critical Assets
                                </label>
                                <input
                                    type="number"
                                    value={metrics.protectedCriticalAssets}
                                    onChange={(e) =>
                                        handleChange(
                                            "protectedCriticalAssets",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Coverage Results */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                            <h3 className="text-xl font-bold text-white">
                                Coverage Analysis
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Endpoint Coverage
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(calculations.endpointCoverage)}`}
                                >
                                    {calculations.endpointCoverage.toFixed(1)}%
                                </div>
                                <div className="mt-2 text-sm text-blue-300">
                                    {metrics.protectedEndpoints} of{" "}
                                    {metrics.totalEndpoints} endpoints protected
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Critical Asset Coverage
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(calculations.criticalAssetCoverage)}`}
                                >
                                    {calculations.criticalAssetCoverage.toFixed(
                                        1
                                    )}
                                    %
                                </div>
                                <div className="mt-2 text-sm text-blue-300">
                                    {metrics.protectedCriticalAssets} of{" "}
                                    {metrics.criticalAssets} critical assets
                                    protected
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Metrics Input */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="w-6 h-6 text-purple-400" />
                            <h3 className="text-xl font-bold text-white">
                                Operational Metrics
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Security Staff
                                </label>
                                <input
                                    type="number"
                                    value={metrics.securityStaff}
                                    onChange={(e) =>
                                        handleChange(
                                            "securityStaff",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Hours Per Alert
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={metrics.hoursPerAlert}
                                    onChange={(e) =>
                                        handleChange(
                                            "hoursPerAlert",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Automated Actions (%)
                                </label>
                                <input
                                    type="number"
                                    value={metrics.automatedActions}
                                    onChange={(e) =>
                                        handleChange(
                                            "automatedActions",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Escalated Incidents
                                </label>
                                <input
                                    type="number"
                                    value={metrics.escalatedIncidents}
                                    onChange={(e) =>
                                        handleChange(
                                            "escalatedIncidents",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Resolved Incidents
                                </label>
                                <input
                                    type="number"
                                    value={metrics.resolvedIncidents}
                                    onChange={(e) =>
                                        handleChange(
                                            "resolvedIncidents",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Operational Results */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-6 h-6 text-yellow-400" />
                            <h3 className="text-xl font-bold text-white">
                                Operational Analysis
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Alerts Per Analyst
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {calculations.alertsPerAnalyst.toFixed(0)}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Time Spent on Alerts (hours/month)
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {calculations.timeSpentOnAlerts.toFixed(0)}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Automation Rate
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(calculations.automationRate)}`}
                                >
                                    {calculations.automationRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Incident Resolution Rate
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(calculations.incidentResolutionRate)}`}
                                >
                                    {calculations.incidentResolutionRate.toFixed(
                                        1
                                    )}
                                    %
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cost Metrics Input */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="w-6 h-6 text-green-400" />
                            <h3 className="text-xl font-bold text-white">
                                Cost Metrics
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Annual License Cost ($)
                                </label>
                                <input
                                    type="number"
                                    value={metrics.annualLicenseCost}
                                    onChange={(e) =>
                                        handleChange(
                                            "annualLicenseCost",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Staff Cost Per Year ($)
                                </label>
                                <input
                                    type="number"
                                    value={metrics.staffCostPerYear}
                                    onChange={(e) =>
                                        handleChange(
                                            "staffCostPerYear",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Breach Cost Averted ($)
                                </label>
                                <input
                                    type="number"
                                    value={metrics.breachCostAverted}
                                    onChange={(e) =>
                                        handleChange(
                                            "breachCostAverted",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cost Results */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-6 h-6 text-green-400" />
                            <h3 className="text-xl font-bold text-white">
                                Cost Analysis
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Total Annual Cost
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    ${calculations.totalCost.toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Cost Per Endpoint
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    ${calculations.costPerEndpoint.toFixed(2)}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Cost Per Alert
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    ${calculations.costPerAlert.toFixed(2)}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Return on Investment
                                </div>
                                <div
                                    className={`text-3xl font-bold ${calculations.roi > 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                    {calculations.roi.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Threat Metrics Input */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-6 h-6 text-red-400" />
                            <h3 className="text-xl font-bold text-white">
                                Threat Metrics
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Threats Detected
                                </label>
                                <input
                                    type="number"
                                    value={metrics.threatsDetected}
                                    onChange={(e) =>
                                        handleChange(
                                            "threatsDetected",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Threats Blocked
                                </label>
                                <input
                                    type="number"
                                    value={metrics.threatsBlocked}
                                    onChange={(e) =>
                                        handleChange(
                                            "threatsBlocked",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Zero-Day Threats
                                </label>
                                <input
                                    type="number"
                                    value={metrics.zeroDay}
                                    onChange={(e) =>
                                        handleChange("zeroDay", e.target.value)
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Known Threats
                                </label>
                                <input
                                    type="number"
                                    value={metrics.knownThreats}
                                    onChange={(e) =>
                                        handleChange(
                                            "knownThreats",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Threat Results */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                            <h3 className="text-xl font-bold text-white">
                                Threat Analysis
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Threat Block Rate
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(calculations.threatBlockRate)}`}
                                >
                                    {calculations.threatBlockRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Zero-Day Detection
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {calculations.zeroDayPercentage.toFixed(1)}%
                                </div>
                                <div className="mt-2 text-sm text-blue-300">
                                    {metrics.zeroDay} zero-day threats detected
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics Input */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-6 h-6 text-cyan-400" />
                            <h3 className="text-xl font-bold text-white">
                                Performance & Integration
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    System Uptime (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={metrics.systemUptime}
                                    onChange={(e) =>
                                        handleChange(
                                            "systemUptime",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Scan CPU Impact (%)
                                </label>
                                <input
                                    type="number"
                                    value={metrics.scanImpact}
                                    onChange={(e) =>
                                        handleChange(
                                            "scanImpact",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Queries Per Day
                                </label>
                                <input
                                    type="number"
                                    value={metrics.queriesPerDay}
                                    onChange={(e) =>
                                        handleChange(
                                            "queriesPerDay",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Successful Queries
                                </label>
                                <input
                                    type="number"
                                    value={metrics.successfulQueries}
                                    onChange={(e) =>
                                        handleChange(
                                            "successfulQueries",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Integrated Tools
                                </label>
                                <input
                                    type="number"
                                    value={metrics.integratedTools}
                                    onChange={(e) =>
                                        handleChange(
                                            "integratedTools",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    Total Security Tools
                                </label>
                                <input
                                    type="number"
                                    value={metrics.totalSecurityTools}
                                    onChange={(e) =>
                                        handleChange(
                                            "totalSecurityTools",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-200 mb-1">
                                    API Success Rate (%)
                                </label>
                                <input
                                    type="number"
                                    value={metrics.apiCallSuccessRate}
                                    onChange={(e) =>
                                        handleChange(
                                            "apiCallSuccessRate",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Performance Results */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-6 h-6 text-cyan-400" />
                            <h3 className="text-xl font-bold text-white">
                                Performance Analysis
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    System Uptime
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(metrics.systemUptime)}`}
                                >
                                    {metrics.systemUptime.toFixed(2)}%
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Endpoint Performance Impact
                                </div>
                                <div
                                    className={`text-3xl font-bold ${metrics.scanImpact < 10 ? "text-green-600" : metrics.scanImpact < 20 ? "text-yellow-600" : "text-red-600"}`}
                                >
                                    {metrics.scanImpact}%
                                </div>
                                <div className="mt-1 text-xs text-blue-300">
                                    CPU impact during scans
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Query Success Rate
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(calculations.querySuccessRate)}`}
                                >
                                    {calculations.querySuccessRate.toFixed(1)}%
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    Integration Rate
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(calculations.integrationRate)}`}
                                >
                                    {calculations.integrationRate.toFixed(1)}%
                                </div>
                                <div className="mt-2 text-sm text-blue-300">
                                    {metrics.integratedTools} of{" "}
                                    {metrics.totalSecurityTools} tools
                                    integrated
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="text-sm text-blue-200 mb-1">
                                    API Success Rate
                                </div>
                                <div
                                    className={`text-3xl font-bold ${getScoreColor(metrics.apiCallSuccessRate)}`}
                                >
                                    {metrics.apiCallSuccessRate.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">
                        Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {calculations.falsePositiveRate > 50 && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                                <div className="font-semibold text-red-200 mb-2">
                                    ⚠️ High False Positive Rate
                                </div>
                                <div className="text-sm text-red-100">
                                    Your false positive rate is{" "}
                                    {calculations.falsePositiveRate.toFixed(1)}
                                    %. Consider tuning detection rules,
                                    implementing better threat intelligence, or
                                    adjusting sensitivity thresholds.
                                </div>
                            </div>
                        )}

                        {calculations.endpointCoverage < 95 && (
                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                                <div className="font-semibold text-yellow-200 mb-2">
                                    ⚠️ Coverage Gap
                                </div>
                                <div className="text-sm text-yellow-100">
                                    Only{" "}
                                    {calculations.endpointCoverage.toFixed(1)}%
                                    of endpoints are protected. Expand EDR
                                    deployment to achieve comprehensive
                                    coverage.
                                </div>
                            </div>
                        )}

                        {calculations.automationRate < 50 && (
                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                                <div className="font-semibold text-yellow-200 mb-2">
                                    💡 Low Automation
                                </div>
                                <div className="text-sm text-yellow-100">
                                    Only{" "}
                                    {calculations.automationRate.toFixed(1)}% of
                                    actions are automated. Implement more
                                    automated response playbooks to improve
                                    efficiency.
                                </div>
                            </div>
                        )}

                        {calculations.totalResponseTime > 120 && (
                            <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                                <div className="font-semibold text-orange-200 mb-2">
                                    ⏱️ Slow Response Time
                                </div>
                                <div className="text-sm text-orange-100">
                                    Total response time is{" "}
                                    {calculations.totalResponseTime} minutes.
                                    Work on reducing MTTD and MTTR through
                                    automation and improved detection.
                                </div>
                            </div>
                        )}

                        {calculations.alertsPerAnalyst > 500 && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                                <div className="font-semibold text-red-200 mb-2">
                                    👥 Analyst Overload
                                </div>
                                <div className="text-sm text-red-100">
                                    Each analyst handles{" "}
                                    {calculations.alertsPerAnalyst.toFixed(0)}{" "}
                                    alerts. Consider hiring more staff or
                                    implementing better alert filtering and
                                    automation.
                                </div>
                            </div>
                        )}

                        {calculations.incidentResolutionRate < 80 && (
                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                                <div className="font-semibold text-yellow-200 mb-2">
                                    📊 Low Resolution Rate
                                </div>
                                <div className="text-sm text-yellow-100">
                                    Only{" "}
                                    {calculations.incidentResolutionRate.toFixed(
                                        1
                                    )}
                                    % of incidents are resolved. Review incident
                                    response processes and resource allocation.
                                </div>
                            </div>
                        )}

                        {calculations.threatBlockRate < 85 && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                                <div className="font-semibold text-red-200 mb-2">
                                    🛡️ Threat Prevention Gap
                                </div>
                                <div className="text-sm text-red-100">
                                    Only{" "}
                                    {calculations.threatBlockRate.toFixed(1)}%
                                    of threats are blocked. Enhance prevention
                                    capabilities and automated blocking rules.
                                </div>
                            </div>
                        )}

                        {metrics.scanImpact > 20 && (
                            <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                                <div className="font-semibold text-orange-200 mb-2">
                                    ⚡ High Performance Impact
                                </div>
                                <div className="text-sm text-orange-100">
                                    EDR scans cause {metrics.scanImpact}% CPU
                                    impact. Optimize scan schedules or consider
                                    lighter-weight agents to reduce endpoint
                                    disruption.
                                </div>
                            </div>
                        )}

                        {calculations.integrationRate < 70 && (
                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                                <div className="font-semibold text-yellow-200 mb-2">
                                    🔗 Integration Gaps
                                </div>
                                <div className="text-sm text-yellow-100">
                                    Only{" "}
                                    {calculations.integrationRate.toFixed(1)}%
                                    of security tools are integrated. Improve
                                    integrations for better visibility and
                                    coordinated response.
                                </div>
                            </div>
                        )}

                        {calculations.costPerEndpoint > 200 && (
                            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                                <div className="font-semibold text-blue-200 mb-2">
                                    💰 High Cost Per Endpoint
                                </div>
                                <div className="text-sm text-blue-100">
                                    Cost per endpoint is $
                                    {calculations.costPerEndpoint.toFixed(2)}.
                                    Consider optimizing licensing or evaluating
                                    more cost-effective solutions.
                                </div>
                            </div>
                        )}

                        {calculations.roi < 0 && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                                <div className="font-semibold text-red-200 mb-2">
                                    📉 Negative ROI
                                </div>
                                <div className="text-sm text-red-100">
                                    Current ROI is {calculations.roi.toFixed(1)}
                                    %. Reassess breach prevention value or
                                    optimize costs to improve investment
                                    returns.
                                </div>
                            </div>
                        )}

                        {calculations.efficiencyScore >= 80 && (
                            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                                <div className="font-semibold text-green-200 mb-2">
                                    ✅ Excellent Performance
                                </div>
                                <div className="text-sm text-green-100">
                                    Your EDR solution is performing excellently
                                    with an efficiency score of{" "}
                                    {calculations.efficiencyScore.toFixed(1)}%.
                                    Maintain current practices and continue
                                    monitoring.
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Key Metrics Summary */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">
                        Executive Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-xs text-blue-300 mb-1">
                                Alert Accuracy
                            </div>
                            <div
                                className={`text-2xl font-bold ${getScoreColor(calculations.alertAccuracy)}`}
                            >
                                {calculations.alertAccuracy.toFixed(1)}%
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-xs text-blue-300 mb-1">
                                Coverage
                            </div>
                            <div
                                className={`text-2xl font-bold ${getScoreColor(calculations.endpointCoverage)}`}
                            >
                                {calculations.endpointCoverage.toFixed(1)}%
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-xs text-blue-300 mb-1">
                                Threat Block Rate
                            </div>
                            <div
                                className={`text-2xl font-bold ${getScoreColor(calculations.threatBlockRate)}`}
                            >
                                {calculations.threatBlockRate.toFixed(1)}%
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-xs text-blue-300 mb-1">
                                Automation
                            </div>
                            <div
                                className={`text-2xl font-bold ${getScoreColor(calculations.automationRate)}`}
                            >
                                {calculations.automationRate.toFixed(1)}%
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-xs text-blue-300 mb-1">
                                Response Time
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {calculations.totalResponseTime} min
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-xs text-blue-300 mb-1">
                                Cost/Endpoint
                            </div>
                            <div className="text-2xl font-bold text-white">
                                ${calculations.costPerEndpoint.toFixed(0)}
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-xs text-blue-300 mb-1">
                                ROI
                            </div>
                            <div
                                className={`text-2xl font-bold ${calculations.roi > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                                {calculations.roi.toFixed(1)}%
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-xs text-blue-300 mb-1">
                                System Uptime
                            </div>
                            <div
                                className={`text-2xl font-bold ${getScoreColor(metrics.systemUptime)}`}
                            >
                                {metrics.systemUptime.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
