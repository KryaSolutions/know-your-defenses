import { useState } from 'react';
import type { ComponentType } from 'react';
import { Calculator, Shield, Clock, TrendingUp, CheckCircle, Database, Users } from 'lucide-react';
import SocAlerts from "./calculators/SocAlerts";
import SocLatency from "./calculators/SocLatency";
import SocProductivity from "./calculators/SocProductivity";
import SocSlaCompliance from "./calculators/SocSLACompliance";
import SocThreatIntelligence from "./calculators/SocThreatIntelligence";
import IdamEffCalc from "./calculators/IdamEfficiency";

interface CalculatorItem {
    id: string;
    name: string;
    component: ComponentType;
    icon: ComponentType<{ className?: string }>;
    color: keyof typeof colorMap;
}

const calculators: CalculatorItem[] = [
    { id: 'alerts', name: 'Alert Analysis', component: SocAlerts, icon: Shield, color: 'blue' },
    { id: 'latency', name: 'Latency Metrics', component: SocLatency, icon: Clock, color: 'purple' },
    { id: 'productivity', name: 'Productivity', component: SocProductivity, icon: TrendingUp, color: 'green' },
    { id: 'sla', name: 'SLA Compliance', component: SocSlaCompliance, icon: CheckCircle, color: 'indigo' },
    { id: 'threat', name: 'Threat Intelligence', component: SocThreatIntelligence, icon: Database, color: 'red' },
    { id: 'idam', name: 'IDAM Efficiency', component: IdamEffCalc, icon: Users, color: 'cyan' }
];

const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300',
    purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300',
    green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300',
    red: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300'
};

const CalcWrapper = () => {
    const [selectedCalc, setSelectedCalc] = useState<CalculatorItem | null>(null);

    const SelectedComponent = selectedCalc?.component;

    return (
        <div className="min-h-screen bg-blue-600/10 relative overflow-hidden">
            <div className="relative max-w-5xl mx-auto px-6 py-12">

                {/* Header Section */}
                <div className="bg-blue-600/5 p-8 mb-6 rounded-xl animate-fadeIn">
                    <div className="flex items-center justify-center space-x-4 mb-2">
                        <div className="p-3 bg-blue-500 rounded-full">
                            <Calculator className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-blue-700 animate-slideIn">
                            {!selectedCalc ? "Security Operations Dashboard" : selectedCalc.name}
                        </h2>
                    </div>
                    {selectedCalc && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setSelectedCalc(null)}
                                className="border-2 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Content Section */}
                <div className="mb-8">
                    {selectedCalc && SelectedComponent ? (
                        // Render the selected calculator component
                        <div className="animate-fadeIn">
                            <SelectedComponent />
                        </div>
                    ) : (
                        // Render dashboard grid
                        <div className="space-y-6">
                            <div className="animate-fadeIn text-center">
                                <p className="text-slate-700 text-lg">
                                    Choose from our suite of security operation calculators
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                {calculators.map((calc, idx) => {
                                    const Icon = calc.icon;
                                    return (
                                        <button
                                            key={calc.id}
                                            onClick={() => setSelectedCalc(calc)}
                                            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ease-out
                                                ${colorMap[calc.color]} 
                                                hover:shadow-lg hover:scale-105 active:scale-100
                                                animate-fadeIn`}
                                            style={{ animationDelay: `${idx * 75}ms` }}
                                        >
                                            <div className="flex flex-col items-start space-y-3">
                                                <div className="p-2 rounded-lg bg-white/80 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-left">{calc.name}</h3>
                                            </div>
                                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    )}
                </div>

            </div>
        </div>
    );
}

export default CalcWrapper;
