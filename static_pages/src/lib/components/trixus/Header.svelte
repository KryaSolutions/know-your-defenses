<script lang="ts">
    import Comparison from "./Comparison.svelte";
    const smoothScrollTo = () => {
        document.getElementById("trixus-footer")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
</script>

<div class="min-h-screen w-full flex flex-col items-center justify-center">
    <!-- Main title section -->
    <div class="flex items-center justify-center px-6 py-6 sm:py-8">
        <div class="max-w-5xl w-full text-center">
            <h1
                class="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent pt-6 bg-clip-text bg-linear-to-r from-red-400 via-purple-400 to-sky-500 animate-fade-up"
            >
                Autonomous AI-Driven SOC
            </h1>
        </div>
    </div>

    <!-- Two-column content section -->
    <div
        class="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-10 px-6 py-16 min-h-[60vh]"
    >
        <!-- Left column: Paragraph, Quote, Button (improved UI/UX) -->
        <div class="lg:w-2/5 flex animate-slide-left delay-200">
            <div
                class="left-panel w-full flex flex-col justify-center gap-6 p-8 sm:p-10 rounded-2xl"
            >
                <!-- Description paragraph -->
                <p
                    class="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed max-w-2xl text-justify"
                >
                    Real-time threat detection, intelligent investigation, and
                    automated response, analyzing streaming security logs to
                    surface high confidence incidents and reduce mean time to
                    respond.
                </p>

                <!-- Quote -->
                <div
                    class="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-700 lg:text-left text-center"
                >
                    "From legacy SOC to AI automation, with no-code and zero
                    scripting."
                </div>

                <!-- CTA Button -->
                <div class="flex justify-center animate-fade-up delay-500">
                    <button
                        class="cta-button inline-flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3 rounded-lg bg-(--brand-orange) text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105 transition-transform active:scale-95"
                        on:click={() => smoothScrollTo()}
                        aria-label="Book a demo"
                    >
                        <span>Book a Demo</span>
                        <span aria-hidden="true" class="arrow">→</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Right column: Comparison table -->
        <div
            class="lg:w-3/5 flex justify-center items-center animate-fade-up delay-300"
        >
            <div class="w-full max-w-4xl">
                <Comparison />
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes slideInLeft {
        0% {
            opacity: 0;
            transform: translateX(-30px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-slide-left {
        animation: slideInLeft 0.7s ease-out both;
    }
    .animate-fade-up {
        animation: fadeInUp 0.7s ease-out both;
    }
    .delay-200 {
        animation-delay: 0.2s;
    }
    .delay-300 {
        animation-delay: 0.3s;
    }
    .delay-500 {
        animation-delay: 0.5s;
    }
    /* Left panel decorative accent */
    .left-panel {
        position: relative;
        overflow: visible;
    }
    .left-panel::before {
        content: "";
        position: absolute;
        left: -10px;
        top: 1.25rem;
        bottom: 1.25rem;
        width: 6px;
        border-radius: 8px;
        background: linear-gradient(
            180deg,
            rgba(99, 102, 241, 0.95),
            rgba(236, 72, 153, 0.95)
        );
        box-shadow: 0 6px 18px rgba(2, 6, 23, 0.06);
    }

    /* CTA focus and micro-interactions */
    .cta-button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 6px rgba(249, 115, 22, 0.12);
        transform: none;
    }
    .cta-button .arrow {
        display: inline-block;
        transition: transform 160ms ease;
    }
    .cta-button:hover .arrow {
        transform: translateX(4px);
    }
</style>
