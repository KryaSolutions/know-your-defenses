import { Eye, Shield, TrendingUp, ChevronRight, Zap } from "lucide-react";

const Header = () => {
    const scrollToSection = (sectionId: string) => {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="relative overflow-hidden text-(--brand-blue) flex items-center justify-center min-h-screen">
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight text-(--brand-blue)">
                                Know Your Defenses
                            </h1>

                            <p className="text-base sm:text-lg text-(--brand-blue) leading-relaxed max-w-xl">
                                Quantify the true resilience, not just the
                                presence. Insight-driven defense transforms
                                cybersecurity from reactive to predictive.
                            </p>

                            <p className="text-lg sm:text-xl font-semibold text-(--brand-blue) leading-relaxed">
                                Assess, Calculate, Adapt, and Stay Ahead with
                                AI-Backed Precision.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 max-w-xl">
                            <button
                                onClick={() =>
                                    scrollToSection("#calcs-section")
                                }
                                className="group flex flex-col items-start space-y-1 p-3 bg-(--brand-light-blue)/20 rounded-lg transition-all duration-300 hover:scale-102 hover:bg-(--brand-light-blue)/25 text-left"
                            >
                                <div className="p-1.5 bg-blue-500/50 rounded-lg">
                                    <Eye className="w-5 h-5 text-blue-700" />
                                </div>
                                <span className="text-sm font-semibold">
                                    Assess
                                </span>
                                <span className="text-xs text-slate-700">
                                    Discover your security posture
                                </span>
                            </button>

                            <button
                                onClick={() =>
                                    scrollToSection("#calcs-section")
                                }
                                className="group flex flex-col items-start space-y-1 p-3 bg-(--brand-light-blue)/20 rounded-lg transition-all duration-300 hover:scale-102 hover:bg-(--brand-light-blue)/25 text-left"
                            >
                                <div className="p-1.5 bg-purple-500/50 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-purple-700" />
                                </div>
                                <span className="text-sm font-semibold">
                                    Calculate
                                </span>
                                <span className="text-xs text-slate-700">
                                    Quantify your security metrics
                                </span>
                            </button>

                            <a
                                className="group flex flex-col items-start space-y-1 p-3 bg-(--brand-light-blue)/20 rounded-lg transition-all duration-300 hover:scale-102 hover:bg-(--brand-light-blue)/25 text-left"
                                href="https://kyd.kryasolutions.com/newsletters"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="p-1.5 bg-green-500/50 rounded-lg">
                                    <Zap className="w-5 h-5 text-green-600" />
                                </div>

                                <span className="text-sm font-semibold">
                                    Adapt
                                </span>
                                <span className="text-xs text-slate-700">
                                    Stay informed with insights
                                </span>
                            </a>

                            <button
                                onClick={() =>
                                    scrollToSection("#contact-section")
                                }
                                className="group flex flex-col items-start space-y-1 p-3 bg-(--brand-light-blue)/20 rounded-lg transition-all duration-300 hover:scale-102 hover:bg-(--brand-light-blue)/25 text-left"
                            >
                                <div className="p-1.5 bg-orange-500/50 rounded-lg">
                                    <Shield className="w-5 h-5 text-orange-600" />
                                </div>
                                <span className="text-sm font-semibold">
                                    Stay Ahead
                                </span>
                                <span className="text-xs text-slate-700">
                                    Get expert guidance
                                </span>
                            </button>
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={() =>
                                    scrollToSection("#survey-section")
                                }
                                className="bg-[var(--brand-orange)] text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-102 hover:shadow-xl hover:shadow-orange-500/50 flex items-center space-x-2"
                            >
                                <span>Get Started</span>
                                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                            <div
                                className="absolute inset-0 animate-spin"
                                style={{ animationDuration: "20s" }}
                            >
                                <div className="w-full h-full border-2 border-dashed border-blue-600/50 rounded-full"></div>
                            </div>
                            <div
                                className="absolute inset-8 animate-spin"
                                style={{
                                    animationDuration: "15s",
                                    animationDirection: "reverse",
                                }}
                            >
                                <div className="w-full h-full border border-purple-600/50 rounded-full"></div>
                            </div>
                            <div
                                className="absolute inset-16 animate-spin"
                                style={{
                                    animationDuration: "10s",
                                }}
                            >
                                <div className="w-full h-full border border-cyan-600/50 rounded-full"></div>
                            </div>

                            <div className="relative z-10 p-6 bg-[var(--brand-blue)] rounded-full backdrop-blur-sm border border-white/20">
                                <Shield className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                            </div>

                            <div
                                className="absolute top-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
                                style={{
                                    animationDelay: "0s",
                                    animationDuration: "3s",
                                }}
                            >
                                <div className="p-3 bg-blue-500/50 rounded-lg backdrop-blur-sm border border-blue-400/30">
                                    <Eye className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>

                            <div
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 animate-bounce z-20"
                                style={{
                                    animationDelay: "0.75s",
                                    animationDuration: "3s",
                                }}
                            >
                                <div className="p-3 bg-purple-500/50 rounded-lg backdrop-blur-sm border border-purple-400/30">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>

                            <div
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
                                style={{
                                    animationDelay: "1.5s",
                                    animationDuration: "3s",
                                }}
                            >
                                <div className="p-3 bg-green-500/50 rounded-lg backdrop-blur-sm border border-green-400/30">
                                    <Zap className="w-6 h-6 text-green-600" />
                                </div>
                            </div>

                            <div
                                className="absolute top-1/2 left-4 transform -translate-y-1/2 animate-bounce z-20"
                                style={{
                                    animationDelay: "2.25s",
                                    animationDuration: "3s",
                                }}
                            >
                                <div className="p-3 bg-orange-500/50 rounded-lg backdrop-blur-sm border border-orange-400/30">
                                    <Shield className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-4 left-4 p-4 bg-(--brand-light-blue)/20 rounded-lg backdrop-blur-sm border border-white/20 transform rotate-3 transition-all duration-300 hover:scale-105 hover:rotate-0">
                            <div className="text-2xl font-bold text-blue-600">
                                AI-Powered
                            </div>
                            <div className="text-xs text-slate-700">
                                Predictive Analytics
                            </div>
                        </div>

                        <div className="absolute -top-4 right-4 p-4 bg-(--brand-light-blue)/20 rounded-lg backdrop-blur-sm border border-white/20 transform -rotate-3 transition-all duration-300 hover:scale-105 hover:rotate-0">
                            <div className="text-2xl font-bold text-green-600">
                                Real-Time
                            </div>
                            <div className="text-xs text-slate-700">
                                Security Insights
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
