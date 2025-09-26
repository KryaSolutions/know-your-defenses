import { Shield, AlertTriangle, Eye, TrendingUp, ChevronRight, Zap } from 'lucide-react';

export default function SecurityAssessmentHeader() {
    const handleStartAssessment = () => {
        // Smooth scroll to the Hero section
        const heroSection = document.querySelector('#hero-section');
        if (heroSection) {
            heroSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border border-blue-400 rounded-full"></div>
                <div className="absolute top-32 right-20 w-24 h-24 border border-cyan-400 rounded-full"></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-purple-400 rounded-full"></div>
                <div className="absolute bottom-32 right-1/3 w-20 h-20 border border-green-400 rounded-full"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Section */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                                    <Shield className="w-8 h-8 text-blue-300" />
                                </div>
                                <span className="text-blue-300 font-semibold tracking-wide uppercase text-sm">
                                    Security Assessment
                                </span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                                Discover Your{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    Security Posture
                                </span>
                            </h1>

                            <p className="text-xl text-gray-300 leading-relaxed">
                                Take this quick assessment to understand your organization's current security posture.
                                It will highlight where you stand today, reveal potential gaps, and provide insights
                                to strengthen your defenses and resilience.
                            </p>
                        </div>

                        {/* Key Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                                <Eye className="w-6 h-6 text-green-400" />
                                <span className="text-sm font-medium">Reveal Gaps</span>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                                <TrendingUp className="w-6 h-6 text-blue-400" />
                                <span className="text-sm font-medium">Get Insights</span>
                            </div>
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                                <Zap className="w-6 h-6 text-purple-400" />
                                <span className="text-sm font-medium">Strengthen Defense</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <button
                                onClick={handleStartAssessment}
                                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-3"
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
                        {/* Central Shield */}
                        <div className="relative mx-auto w-80 h-80 flex items-center justify-center">
                            {/* Animated Rings */}
                            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                                <div className="w-full h-full border-2 border-dashed border-blue-400/30 rounded-full"></div>
                            </div>
                            <div className="absolute inset-4 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                                <div className="w-full h-full border border-cyan-400/20 rounded-full"></div>
                            </div>

                            {/* Central Shield */}
                            <div className="relative z-10 p-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full backdrop-blur-sm border border-white/20">
                                <Shield className="w-24 h-24 text-blue-300" />
                            </div>

                            {/* Floating Icons */}
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDelay: '0s' }}>
                                <div className="p-3 bg-green-500/20 rounded-lg backdrop-blur-sm border border-green-400/30">
                                    <Eye className="w-6 h-6 text-green-400" />
                                </div>
                            </div>

                            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 animate-bounce" style={{ animationDelay: '1s' }}>
                                <div className="p-3 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-400/30">
                                    <TrendingUp className="w-6 h-6 text-purple-400" />
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDelay: '2s' }}>
                                <div className="p-3 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-400/30">
                                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                                </div>
                            </div>

                            <div className="absolute top-1/2 left-8 transform -translate-y-1/2 animate-bounce" style={{ animationDelay: '1.5s' }}>
                                <div className="p-3 bg-cyan-500/20 rounded-lg backdrop-blur-sm border border-cyan-400/30">
                                    <Zap className="w-6 h-6 text-cyan-400" />
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="absolute -bottom-4 left-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 transform rotate-3">
                            <div className="text-2xl font-bold text-green-400">95%</div>
                            <div className="text-xs text-gray-300">Organizations Improved</div>
                        </div>

                        <div className="absolute -top-4 right-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 transform -rotate-3">
                            <div className="text-2xl font-bold text-blue-400">5min</div>
                            <div className="text-xs text-gray-300">Quick Assessment</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
    );
}
