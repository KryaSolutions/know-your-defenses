<script lang="ts">
    const smoothScrollTo = () => {
        const element = document.getElementById("trixus-footer");

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };
</script>

<header
    class="relative w-full flex items-center justify-center overflow-hidden pt-36"
>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <!-- Centered content -->
        <div class="text-center space-y-6 animate-fade-up">
            <div class="flex items-center justify-center gap-4 mx-auto">
                <!-- Trixus label -->
                <span
                    class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slide-left delay-100"
                    >Trixus</span
                >

                <!-- Container for line + square -->
                <div class="relative h-24 w-px">
                    <!-- Orange square -->
                    <div
                        class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-(--brand-orange) shadow-md"
                    ></div>
                </div>
            </div>
            <span
                class="block text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-500 via-purple-400 to-sky-500 mt-2"
            >
                Autonomous AI-Driven SOC
            </span>

            <p
                class="text-lg sm:text-xl text-white leading-relaxed text-left animate-slide-left delay-200 max-w-3xl mx-auto"
            >
                Real-time threat detection, smart investigation, and automated
                response. TRIXUS intelligently analyzes security data,
                identifies suspicious patterns, and takes proactive actions to
                protect your environment.
            </p>

            <p
                class="text-xl sm:text-2xl font-medium text-white leading-relaxed max-w-3xl mx-auto animate-slide-left delay-300 my-20"
            >
                “From legacy SOC to AI-powered automation — with no-code,
                low-code, and zero scripting.”
            </p>

            <div class="mt-6 animate-fade-up delay-300">
                <button
                    class="px-8 py-3 rounded-xl bg-(--brand-orange) text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                    on:click={() => smoothScrollTo()}
                >
                    Book a Demo →
                </button>
            </div>
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
    .delay-300 {
        animation-delay: 0.3s;
    }
</style>
