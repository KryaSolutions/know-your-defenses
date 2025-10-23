import {
    Eye,
    Shield,
    AlertTriangle,
    TrendingUp,
    ChevronRight,
    Zap,
} from "lucide-react";

const Header = () => {
    const handleStartAssessment = () => {
        const heroSection = document.querySelector("#survey-section");
        if (heroSection) {
            heroSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="relative overflow-hidden bg-[var(--brand-blue)] text-white">
            {/* Logo aligned with content */}
            <div className="absolute top-2 left-18 z-50 flex flex-col items-start space-y-2">
                <a
                    href="https://kryasolutions.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="/krya.svg"
                        alt="Organization Logo"
                        className="w-20 h-20 object-contain"
                    />
                </a>
            </div>

            <div className="relative max-w-5xl mx-auto px-6 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Section */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-2xl text-white lg:text-4xl font-medium leading-tight">
                                Discover Your Security Posture
                            </h2>

                            <p className="text-xl text-justify text-[var(--brand-grey)] leading-relaxed">
                                Take this quick assessment to understand your
                                organization's current security posture.
                            </p>
                            <p className="text-xl font-medium text-justify text-[var(--brand-grey)] leading-relaxed">
                                Complete{" "}
                                <span className="font-semibold">
                                    just one quick evaluation
                                </span>{" "}
                                and get an immediate grasp of your
                                organization's security posture.
                            </p>
                        </div>

                        {/* Key Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:scale-105">
                                <Eye className="w-6 h-6 text-[var(--brand-orange)]" />
                                <span className="text-sm font-medium">
                                    Reveal Gaps
                                </span>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:scale-105">
                                <TrendingUp className="w-6 h-6 text-[var(--brand-orange)]" />
                                <span className="text-sm font-medium">
                                    Get Insights
                                </span>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:scale-105">
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
                                className="bg-white/5 border border-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-5xl hover:shadow-blue-500/25 flex items-center space-x-3"
                            >
                                <span>Gauge your Posture</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>

                    {/* Visual Section */}
                    <div className="relative">
                        {/* Central Shield */}
                        <div className="relative mx-auto w-80 h-80 flex items-center justify-center">
                            {/* Animated Rings */}
                            <div
                                className="absolute inset-0 animate-spin"
                                style={{ animationDuration: "20s" }}
                            >
                                <div className="w-full h-full border-2 border-dashed border-blue-400/30 rounded-full"></div>
                            </div>
                            <div
                                className="absolute inset-4 animate-spin"
                                style={{
                                    animationDuration: "15s",
                                    animationDirection: "reverse",
                                }}
                            >
                                <div className="w-full h-full border border-cyan-400/20 rounded-full"></div>
                            </div>

                            {/* Central Shield */}
                            <div className="relative z-10 p-8 bg-[var(--brand-blue)] rounded-full backdrop-blur-sm border border-white/20">
                                <Shield className="w-24 h-24 text-blue-300" />
                            </div>

                            {/* Floating Icons */}
                            <div
                                className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
                                style={{ animationDelay: "0s" }}
                            >
                                <div className="p-3 bg-green-500/20 rounded-lg backdrop-blur-sm border border-green-400/30">
                                    <Eye className="w-6 h-6 text-green-400" />
                                </div>
                            </div>

                            <div
                                className="absolute top-1/2 right-8 transform -translate-y-1/2 animate-bounce z-20"
                                style={{ animationDelay: "1s" }}
                            >
                                <div className="p-3 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-400/30">
                                    <TrendingUp className="w-6 h-6 text-purple-400" />
                                </div>
                            </div>

                            <div
                                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
                                style={{ animationDelay: "2s" }}
                            >
                                <div className="p-3 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-400/30">
                                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                                </div>
                            </div>

                            <div
                                className="absolute top-1/2 left-8 transform -translate-y-1/2 animate-bounce z-20"
                                style={{ animationDelay: "1.5s" }}
                            >
                                <div className="p-3 bg-cyan-500/20 rounded-lg backdrop-blur-sm border border-cyan-400/30">
                                    <Zap className="w-6 h-6 text-cyan-400" />
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="absolute -bottom-4 left-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 transform rotate-3 transition-all duration-300 hover:scale-105">
                            <div className="text-2xl font-bold text-green-400">
                                95%
                            </div>
                            <div className="text-xs text-gray-300">
                                Organizations Improved
                            </div>
                        </div>

                        <div className="absolute -top-4 right-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 transform -rotate-3 transition-all duration-300 hover:scale-105">
                            <div className="text-2xl font-bold text-blue-400">
                                5min
                            </div>
                            <div className="text-xs text-gray-300">
                                Quick Assessment
                            </div>
                        </div>
                    </div>
                    {/* End of Visual Section */}
                </div>
            </div>
        </div>
    );
};

export default Header;
