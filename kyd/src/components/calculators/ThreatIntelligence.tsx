import React, { useState, useMemo, useContext } from "react";
import { MetricsContext, updateCalcMetrics } from "../CalcWrapper";
import type { MetricsContextType } from "../CalcWrapper";

const SocThreatIntelligence = () => {
    const [metrics, setMetrics] = useState({
        threatsDetected: "",
        threatsBlocked: "",
        zeroDayThreats: "",
        threatFeeds: "",
        iocsProcessed: "",
        huntingSessions: "",
    });

    const [results, setResults] = useState<null | {
        iocsPerFeed: number;
        huntingEffectiveness: number;
        zeroDayDetection: number;
        iocsStatus: string;
        huntingStatus: string;
        zeroDayStatus: string;
    }>(null);

    const context = useContext<MetricsContextType | null>(MetricsContext);
    if (!context) return null;
    const { setCalcMetrics } = context;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setMetrics((prev) => ({ ...prev, [name]: value }));
            setResults(null);
        }
    };

    const validation = useMemo(() => {
        const errors: string[] = [];

        const threatsDetected = Number(metrics.threatsDetected) || 0;
        const threatsBlocked = Number(metrics.threatsBlocked) || 0;
        const zeroDayThreats = Number(metrics.zeroDayThreats) || 0;

        if (threatsBlocked > threatsDetected && threatsDetected > 0) {
            errors.push("Threats Blocked cannot exceed Threats Detected.");
        }

        if (zeroDayThreats > threatsDetected && threatsDetected > 0) {
            errors.push("Zero-Day Threats cannot exceed Threats Detected.");
        }

        const hasValues = Object.values(metrics).some((value) => value !== "");
        if (!hasValues) {
            errors.push("Please enter at least one metric.");
        }

        return { errors, hasError: errors.length > 0 };
    }, [metrics]);

    const getIOCsStatus = (iocsPerFeed: number): string => {
        if (iocsPerFeed === 0) return "N/A";
        if (iocsPerFeed < 500) return "Limited";
        if (iocsPerFeed < 1000) return "Fair";
        if (iocsPerFeed < 1500) return "Good";
        if (iocsPerFeed < 2000) return "Very Good";
        return "Excellent";
    };

    const getHuntingStatus = (effectiveness: number): string => {
        if (effectiveness === 0) return "N/A";
        if (effectiveness < 5) return "Needs Improvement";
        if (effectiveness < 10) return "Fair";
        if (effectiveness < 15) return "Good";
        if (effectiveness < 20) return "Very Good";
        return "Excellent";
    };

    const getZeroDayStatus = (rate: number): string => {
        if (rate === 0) return "N/A";
        if (rate < 0.5) return "Limited";
        if (rate < 1) return "Fair";
        if (rate < 2) return "Good";
        if (rate < 3) return "Very Good";
        return "Excellent";
    };

    const calculate = () => {
        const threatsDetected = Number(metrics.threatsDetected) || 0;
        const zeroDayThreats = Number(metrics.zeroDayThreats) || 0;
        const threatFeeds = Number(metrics.threatFeeds) || 0;
        const iocsProcessed = Number(metrics.iocsProcessed) || 0;
        const huntingSessions = Number(metrics.huntingSessions) || 0;

        const iocsPerFeed = threatFeeds > 0 ? iocsProcessed / threatFeeds : 0;

        const huntingEffectiveness =
            huntingSessions > 0 && threatsDetected > 0
                ? (huntingSessions / threatsDetected) * 100
                : 0;

        const zeroDayDetection =
            threatsDetected > 0 ? (zeroDayThreats / threatsDetected) * 100 : 0;

        const iocsStatus = getIOCsStatus(iocsPerFeed);
        const huntingStatus = getHuntingStatus(huntingEffectiveness);
        const zeroDayStatus = getZeroDayStatus(zeroDayDetection);

        const buffer = {
            iocsPerFeed,
            huntingEffectiveness,
            zeroDayDetection,
            iocsStatus,
            huntingStatus,
            zeroDayStatus,
        };

        setResults(buffer);
        updateCalcMetrics("threatIntelligence", buffer, setCalcMetrics);
    };

    const reset = () => {
        setMetrics({
            threatsDetected: "",
            threatsBlocked: "",
            zeroDayThreats: "",
            threatFeeds: "",
            iocsProcessed: "",
            huntingSessions: "",
        });
        setResults(null);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto p-6 border rounded-2xl bg-white relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Threat Intelligence & Detection
                </h2>

                {!results ? (
                    <div className="transition-all duration-500 ease-in-out">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries({
                                threatsDetected: "Threats Detected",
                                threatsBlocked: "Threats Blocked",
                                zeroDayThreats: "Zero-Day Threats Detected",
                                threatFeeds: "Threat Intelligence Feeds",
                                iocsProcessed: "IOCs Processed",
                                huntingSessions: "Threat Hunting Sessions",
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
                            🔍 Threat Intelligence
                        </h3>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                            {results.iocsPerFeed > 0 && (
                                <ThreatCard
                                    label="IOCs per Feed"
                                    value={results.iocsPerFeed}
                                    status={results.iocsStatus}
                                    statusLabel="Intelligence density"
                                />
                            )}
                            {results.huntingEffectiveness > 0 && (
                                <ThreatCard
                                    label="Hunting Effectiveness"
                                    value={results.huntingEffectiveness}
                                    status={results.huntingStatus}
                                    statusLabel="Threats found via hunting"
                                    unit="%"
                                />
                            )}
                            {results.zeroDayDetection > 0 && (
                                <ThreatCard
                                    label="Zero-Day Detection"
                                    value={results.zeroDayDetection}
                                    status={results.zeroDayStatus}
                                    statusLabel="Novel threat identification"
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
                                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 ${
                                    validation.hasError
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

function ThreatCard({
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
        if (lowerStatus === "needs improvement" || lowerStatus === "limited") {
            return "bg-orange-100 border-orange-300 text-orange-800";
        }
        return "bg-gray-100 border-gray-300 text-gray-800";
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col">
                <span className="text-gray-700 font-medium">{label}</span>
                <span className="text-blue-600 text-2xl font-bold mt-1">
                    {value.toFixed(2)}
                    {unit}
                </span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 mb-1">
                    {statusLabel}
                </span>
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

export default SocThreatIntelligence;
