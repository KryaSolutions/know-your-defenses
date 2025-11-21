<header
    class="relative w-full flex items-center justify-center overflow-hidden pt-36"
>
    <div
        class="relative max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 w-full"
    >
        <!-- Centered content -->
        <div class="text-center space-y-6 animate-fade-up">
            <h1
                class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slide-left delay-100 mx-auto max-w-screen"
            >
                Trixus
                <span
                    class="block text-transparent bg-clip-text bg-linear-to-r from-red-500 via-purple-400 to-sky-500 mt-2"
                >
                    Autonomous AI-Driven SOC
                </span>
            </h1>

            <p
                class="text-lg sm:text-xl text-slate-300 leading-relaxed text-left animate-slide-left delay-200 max-w-3xl mx-auto"
            >
                Real-time threat detection, smart investigation, and automated
                response. TRIXUS intelligently analyzes security data,
                identifies suspicious patterns, and takes proactive actions to
                protect your environment.
            </p>
        </div>
    </div>
</header>

<style>
    @keyframes slideInLeft {
        0% {
            opacity: 0;
            transform: translateX(-50px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-slide-left {
        animation: slideInLeft 1s ease-out;
    }

    .animate-fade-up {
        animation: fadeInUp 1s ease-out;
    }

    .delay-100 {
        animation-delay: 0.1s;
    }
    .delay-200 {
        animation-delay: 0.2s;
    }
</style>
