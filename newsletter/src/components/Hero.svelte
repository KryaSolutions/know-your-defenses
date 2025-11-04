<script lang="ts">
    import introOutro from "../assets/intro-outro.json";
    const { intro } = introOutro[0];

    const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
</script>

<section
    class="min-h-screen flex flex-col p-0 text-(--brand-blue) pt-12 sm:pt-20"
>
    <div
        class="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 text-center opacity-0 animate-fade-in"
    >
        <!-- Hero Main Section -->
        <div
            class="mb-8 sm:mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
            <h1
                class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--brand-blue) tracking-tight m-0"
            >
                Cybersecurity Weekly
            </h1>

            <div
                class="inline-flex items-center gap-2 px-4 py-2 bg-(--brand-blue) text-white rounded-full text-sm font-medium shadow-md"
            >
                <span class="pulse-dot"></span>
                {formattedDate}
            </div>
        </div>

        <!-- Hero Summary -->
        <div class="max-w-4xl mx-auto mb-6 sm:mb-8 px-4 sm:px-6">
            <p
                class="text-base sm:text-lg lg:text-xl leading-snug text-gray-800 text-justify hyphens-auto"
            >
                {intro}
            </p>
        </div>

        <!-- Scroll Button -->
        <button
            class="inline-block mx-auto px-8 sm:px-10 py-3 sm:py-4 bg-(--brand-blue) text-white rounded-full text-base sm:text-lg font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:scale-105 hover:shadow-xl relative overflow-hidden w-full sm:w-auto max-w-md"
            on:click={() =>
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                })}
        >
            <span class="relative z-10">Read This Week's Updates</span>
            <span
                class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
            ></span>
        </button>
    </div>
</section>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fadeIn 1s ease-out forwards;
    }

    .pulse-dot {
        width: 6px;
        height: 6px;
        background-color: var(--brand-orange);
        border-radius: 50%;
        position: relative;
    }

    .pulse-dot::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: var(--brand-orange);
        border-radius: 50%;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 0.8;
        }
        100% {
            transform: scale(2.5);
            opacity: 0;
        }
    }

    p {
        hyphens: auto;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
    }
</style>
