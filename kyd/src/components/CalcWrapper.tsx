import { useState, useEffect, createContext } from "react";
import type { ComponentType } from "react";
import {
    Eye,
    Radar,
    Calculator,
    Shield,
    TrendingUp,
    Users,
    Zap,
    X,
    CheckCircle,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmailDialog from "./EmailDialog";
import SocEfficiency from "./calculators/SocEfficiency";
import EdrEfficiency from "./calculators/EdrEfficiency";
import SocProductivity from "./calculators/Productivity";
import SlaPerformance from "./calculators/SlaPerformance";
import IdamEfficiency from "./calculators/IdamEfficiency";
import SocThreatIntelligence from "./calculators/ThreatIntelligence";

const apiUrl: string =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_URL
        : import.meta.env.VITE_PROD_URL;

interface CalculatorItem {
    id: string;
    name: string;
    component: ComponentType;
    icon: ComponentType<{ className?: string }>;
    color: keyof typeof colorMap;
}

const calculators: CalculatorItem[] = [
    {
        id: "soc",
        name: "SOC Efficiency",
        component: SocEfficiency,
        icon: Shield,
        color: "blue",
    },
    {
        id: "idam",
        name: "IDAM Efficiency",
        component: IdamEfficiency,
        icon: Users,
        color: "green",
    },
    {
        id: "edr",
        name: "EDR Efficiency",
        component: EdrEfficiency,
        icon: Radar,
        color: "purple",
    },
    {
        id: "productivity",
        name: "Productivity",
        component: SocProductivity,
        icon: TrendingUp,
        color: "orange",
    },
    {
        id: "threat",
        name: "Threat Intelligence",
        component: SocThreatIntelligence,
        icon: Eye,
        color: "teal",
    },
    {
        id: "slaPerformance",
        name: "SLA / Performance KPIs",
        component: SlaPerformance,
        icon: Zap,
        color: "amber",
    },
];

const colorMap: Record<string, string> = {
    blue: "bg-blue-500/20 text-blue-400",
    purple: "bg-purple-500/20 text-purple-400",
    green: "bg-green-500/20 text-green-400",
    orange: "bg-orange-500/20 text-orange-400",
    teal: "bg-teal-500/20 text-teal-400",
    amber: "bg-amber-500/20 text-amber-400",
};

export type CalcMetricsType = {
    [calc: string]: {
        [metric: string]: number | string;
    };
};

export type MetricsContextType = {
    calcMetrics: CalcMetricsType;
    setCalcMetrics: React.Dispatch<React.SetStateAction<CalcMetricsType>>;
};

export const MetricsContext = createContext<MetricsContextType | null>(null);

export const updateCalcMetrics = (
    calcName: string,
    calcResults: { [metric: string]: number | string },
    setCalcMetrics: React.Dispatch<React.SetStateAction<CalcMetricsType>>
) => {
    setCalcMetrics((prev) => ({
        ...prev,
        [calcName]: calcResults,
    }));
};

const CalcWrapper = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [calcMetrics, setCalcMetrics] = useState<CalcMetricsType>({});
    const [selectedCalc, setSelectedCalc] = useState<CalculatorItem | null>(
        null
    );
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isDialogOpen) {
                closeDialog();
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isDialogOpen]);

    const SelectedComponent = selectedCalc?.component;

    const closeDialog = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsDialogOpen(false);
            setSelectedCalc(null);
            setIsClosing(false);
        }, 300);
    };

    const openDialog = (calc: CalculatorItem) => {
        setSelectedCalc(calc);
        setIsDialogOpen(true);
        setIsClosing(false);
    };

    const handleSubmitSuccess = () => {
        setShowSuccessDialog(true);
    };

    return (
        <MetricsContext.Provider value={{ calcMetrics, setCalcMetrics }}>
            <div
                id="calcs-section"
                className="flex-grow flex-shrink p-4 sm:p-6 md:p-8 lg:p-10 bg-[var(--brand-blue)]"
            >
                <div className="max-w-6xl mx-auto border border-white/10 bg-white/5 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                    {/* Header Section */}
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                            <div className="p-2 sm:p-3 bg-white rounded-full flex-shrink-0">
                                <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-(--brand-blue)" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                                Sec-Ops Efficiency
                            </h2>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 pt-3 pb-6 sm:pt-3 sm:pb-6 px-6 sm:px-8 overflow-y-auto">
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-white text-base sm:text-lg">
                                    Fiddle with our suite of security operation
                                    calculators
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                {calculators.map((calc) => {
                                    const Icon = calc.icon;
                                    return (
                                        <button
                                            key={calc.id}
                                            onClick={() => openDialog(calc)}
                                            className={`group relative p-5 sm:p-6 rounded-xl transition-all duration-300 ease-out
                                                bg-(--brand-light-blue)/20 border-blue-200 backdrop-blur-sm 
                                                hover:shadow-lg hover:scale-105 active:scale-100`}
                                        >
                                            <div className="flex flex-col items-start space-y-3">
                                                <div className={`p-2 rounded-lg shadow-sm ${colorMap[calc.color]} group-hover:shadow-md transition-shadow duration-300`}>
                                                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 `} />
                                                </div>
                                                <h3 className="text-base text-white sm:text-lg font-semibold text-left">
                                                    {calc.name}
                                                </h3>
                                            </div>
                                            <div className="absolute text-white bottom-4 right-4 transition-opacity duration-300">
                                                <svg
                                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="p-6 sm:p-8 flex justify-center">
                        <EmailDialog
                            triggerButtonText="Get My Efficiency Report"
                            title="Generate Your Efficiency Report"
                            onSubmit={handleSubmitSuccess}
                            apiRoute={`${apiUrl}/api/evaluateCalc`}
                            blob={calcMetrics}
                        />
                    </div>
                </div>

                {/* Calculator Dialog Modal */}
                {isDialogOpen && selectedCalc && (
                    <div
                        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 
                            ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}
                        onAnimationEnd={(e) => {
                            if (isClosing && e.animationName === "fadeOut") {
                                setIsDialogOpen(false);
                                setSelectedCalc(null);
                                setIsClosing(false);
                            }
                        }}
                    >
                        <div
                            className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col 
                                ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}
                        >
                            {/* Dialog Header */}
                            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                                <div className="flex items-center space-x-3">
                                    {selectedCalc.icon && (
                                        <div className="p-2 bg-(brand-blue) rounded-lg flex-shrink-0">
                                            <selectedCalc.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                    )}
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                                        {selectedCalc.name}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsClosing(true)}
                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex-shrink-0"
                                    aria-label="Close dialog"
                                >
                                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                                </button>
                            </div>

                            {/* Dialog Content */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                                {SelectedComponent && <SelectedComponent />}
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Dialog */}
                <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                            </div>
                            <DialogTitle className="text-center text-2xl font-bold text-gray-900">
                                Thank You!
                            </DialogTitle>
                            <DialogDescription className="text-center text-gray-600 pt-2">
                                <div className="flex flex-col items-center space-y-3">
                                    <p className="text-lg">
                                        We will reach out to you through email shortly.
                                    </p>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-center mt-4">
                            <Button
                                onClick={() => setShowSuccessDialog(false)}
                                className="bg-[var(--brand-blue)] hover:scale-105 px-8"
                            >
                                Got it!
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </MetricsContext.Provider>
    );
};

export default CalcWrapper;
