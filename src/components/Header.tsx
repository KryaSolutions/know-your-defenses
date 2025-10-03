import {
    Eye,
    TrendingUp,
    ChevronRight,
    Zap,
} from "lucide-react";

export default function SecurityAssessmentHeader() {
    const handleStartAssessment = () => {
        const heroSection = document.querySelector("#hero-section");
        if (heroSection) {
            heroSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="relative overflow-hidden bg-[var(--brand-blue)] text-white">
            <div className="relative max-w-5xl mx-auto px-6 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Section */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl text-white lg:text-5xl font-bold leading-tight">
                                Discover Your{" "}
                                Security Posture
                            </h2>

                            <p className="text-xl text-[var(--brand-grey)] leading-relaxed">
                                Take this quick assessment to understand your
                                organization's current security posture. It will
                                highlight where you stand today, reveal
                                potential gaps, and provide insights to
                                strengthen your defenses and resilience.
                            </p>
                        </div>

                        {/* Key Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                                <Eye className="w-6 h-6 text-[var(--brand-orange)]" />
                                <span className="text-sm font-medium">
                                    Reveal Gaps
                                </span>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                                <TrendingUp className="w-6 h-6 text-[var(--brand-orange)]" />
                                <span className="text-sm font-medium">
                                    Get Insights
                                </span>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                                <Zap className="w-6 h-6 text-[var(--brand-orange)]" />
                                <span className="text-sm font-medium">
                                    Strengthen Defense
                                </span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <button
                                onClick={handleStartAssessment}
                                className="bg-white/5 border border-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-3"
                            >
                                <span>Start Assessment</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                            <p className="text-gray-400 text-sm mt-3">
                                ⚡ Takes only 5 minutes • Get instant results
                            </p>
                        </div>
                    </div>

                    {/* Visual Section */}
                    <div className="relative">
                        <div className="relative mx-auto w-80 h-80 flex items-center justify-center">
                            <div
                                className="absolute inset-0 animate-spin"
                                style={{ animationDuration: "20s" }}
                            >
                                <div className="w-full h-full border-2 border-dashed border-[var(--brand-orange)] rounded-full"></div>
                            </div>
                            <div
                                className="absolute inset-4 animate-spin"
                                style={{
                                    animationDuration: "15s",
                                    animationDirection: "reverse",
                                }}
                            >
                                <div className="w-full h-full border border-[var(--brand-orange)] rounded-full"></div>
                            </div>

                            {/* Central Shield */}
                            <div className="relative mx-auto w-80 h-80 flex items-center justify-center">
                                {/* Pulsing glowing background */}
                                <div className="absolute w-72 h-72 rounded-full bg-[var(--brand-orange)] opacity-20 blur-3xl animate-pulse-glow"></div>

                                {/* Shield */}
                                <div className="relative z-10 p-8 rounded-full border border-white/20 bg-[var(--brand-blue)] shadow-lg">
                                    <img
                                        src="https://kryasolutions.com/img/logo/krya-solutions-logo-reverse.svg"
                                        className="h-32 w-32"
                                    />
                                </div>

                                {/* Orbiting Stats */}

                                {/* Bottom-left card (SW) */}
                                <div className="absolute -bottom-6 -left-6 p-4 transform rotate-3">
                                    <div className="text-2xl font-bold text-white">95%</div>
                                    <div className="text-xs text-gray-300">Organizations Improved</div>
                                </div>

                                {/* Top-right card (NE) */}
                                <div className="absolute -top-11 -right-11 p-4 transform -rotate-3">
                                    <div className="text-2xl font-bold text-white">5min</div>
                                    <div className="text-xs text-gray-300">Quick Assessment</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
