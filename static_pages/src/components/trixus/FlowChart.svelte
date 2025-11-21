<script lang="ts">
    import Card from "./Card.svelte";
    import ImageSlider from "./ImageSlider.svelte";
    import { ShieldCheck } from "lucide-svelte";

    type Item = {
        image: string;
        title: string;
        description: string;
    };

    export let items: Item[] = [
        {
            image: "dataIngestion",
            title: "Data Collection & Ingestion",
            description:
                "Collects and ingests vast amounts of raw security event data from multiple sources.",
        },
        {
            image: "normalization",
            title: "Normalization & Parsing",
            description:
                "Transforms raw data into a structured, unified schema to ensure consistency and to analyze.",
        },
        {
            image: "correlation",
            title: "Correlation & Enrichment",
            description:
                "Leverage models to link related data points, enriching raw data with contextual information like threat intelligence.",
        },
        {
            image: "embedding",
            title: "Embedding & Feature Encoding",
            description:
                "Converts structured data into dense vector representations for advanced machine learning analysis.",
        },
        {
            image: "detectionEngine",
            title: "Detection Engine (LLM Scoring)",
            description:
                "Employs large language models to score and detect potential threats in real-time.",
        },
        {
            image: "autonomous",
            title: "Autonomous Investigation",
            description:
                "Automatically investigates detected threats using AI-driven workflows.",
        },
        {
            image: "triage",
            title: "Triage (Risk-based Prioritization)",
            description:
                "Prioritizes alerts based on calculated risk scores for efficient response.",
        },
        {
            image: "automation",
            title: "Automated Remediation",
            description:
                "Executes automated remediation actions to neutralize threats swiftly.",
        },
        {
            image: "insights",
            title: "Insights & Reports",
            description:
                "Provides actionable insights and comprehensive reports for security teams, along with customisable chatbots",
        },
    ];
</script>

<div class="py-16 px-4 lg:py-24">
    <div class="max-w-screen mx-auto relative">
        <!-- Flow Start Icon -->
        <div class="flex justify-center mb-8 lg:mb-12">
            <div
                class="inline-flex items-center gap-2 px-4 py-2 animate-slide-left mx-auto"
            >
                <p
                    class="text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text bg-linear-to-r from-blue-400 via-red-400 to-purple-400"
                >
                    AI-Powered SOC Pipeline
                </p>
            </div>
        </div>

        <!-- Central Flow Line -->
        <div class="central-line"></div>

        <div class="flow-container">
            {#each items as item, index}
                <div
                    class="flow-step"
                    role="article"
                    aria-label={`Step ${index + 1}: ${item.title}`}
                >
                    <!-- Bullet Point -->
                    <div class="bullet-point"></div>

                    <!-- Content Row -->
                    <div class="content-row {index % 2 === 0 ? '' : 'reverse'}">
                        <div
                            class="card-side {index % 2 === 0
                                ? 'justify-end'
                                : 'justify-start'}"
                        >
                            <div class="card-wrapper">
                                <Card
                                    title={item.title}
                                    description={item.description}
                                />
                            </div>
                        </div>
                        <div class="slider-side">
                            <div class="slider-wrapper">
                                <ImageSlider
                                    slides={index + 1}
                                    subSlides={index === 0
                                        ? [1, 2]
                                        : index === 8
                                          ? [1, 2, 3]
                                          : []}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Flow End Icon -->
        <div class="flex justify-center mt-32">
            <div
                class="end-icon-wrapper bg-green-500/20 transition-all hover:scale-105"
            >
                <ShieldCheck class="w-16 h-16 lg:w-16 lg:h-16 text-green-400" />
            </div>
        </div>
    </div>
</div>

<style>
    /* Start/End Icon Styling */
    .end-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 106px;
        height: 106px;
        border-radius: 50%;
        box-shadow:
            0 4px 6px -1px rgb(0 0 0 / 0.1),
            0 2px 4px -2px rgb(0 0 0 / 0.1);
        transition: all 0.3s ease;
        z-index: 20;
    }

    /* Central Flow Line */
    .central-line {
        position: absolute;
        left: 50%;
        top: 80px;
        bottom: 80px;
        width: 2px;
        background: linear-gradient(
            to bottom,
            transparent 0%,
            #e5e7eb 20%,
            #3b82f6 40%,
            #16a34a 55%,
            #3b82f6 70%,
            #e5e7eb 80%,
            transparent 100%
        );
        transform: translateX(-50%);
        z-index: 5;
        border-radius: 2px;
    }

    /* Flow Container */
    .flow-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 10;
        padding: 0 2rem; /* Add horizontal padding to prevent edge overlap */
    }

    /* Flow Step */
    .flow-step {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 3rem; /* Increased for better vertical spacing */
        padding: 0 1rem; /* Inner padding to avoid tight edges */
    }

    /* Bullet Point */
    .bullet-point {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 16px; /* Slightly larger for better visibility */
        height: 16px;
        border-radius: 50%;
        background: linear-gradient(
            135deg,
            #3b82f6,
            #1d4ed8
        ); /* Gradient for appeal */
        border: 3px solid white;
        box-shadow:
            0 0 0 3px #e5e7eb,
            0 4px 8px rgba(0, 0, 0, 0.1); /* Enhanced shadow */
        flex-shrink: 0;
        transition: all 0.3s ease;
        z-index: 15;
    }

    .flow-step:hover .bullet-point {
        transform: translateX(-50%) scale(1.2);
        box-shadow:
            0 0 0 4px #dbeafe,
            0 0 16px rgba(59, 130, 246, 0.4),
            0 4px 12px rgba(0, 0, 0, 0.15);
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
    }

    /* Content Row */
    .content-row {
        display: flex;
        flex-direction: row;
        gap: 2.5rem; /* Reduced gap slightly for less clutter, but still spacious */
        align-items: center;
        flex: 1;
        width: 100%;
        max-width: 1200px; /* Slightly wider container for better breathing room */
        margin-top: 4rem; /* Increased top margin to clear bullet and line better */
        padding: 0 2rem; /* Side padding to keep content away from edges/line */
        position: relative;
        z-index: 10;
    }

    .content-row.reverse {
        flex-direction: row-reverse;
    }

    .card-side,
    .slider-side {
        flex: 1;
        max-width: 48%; /* Constrain to prevent overlap with center */
        min-width: 0; /* Allow flex shrink */
        display: flex;
        align-items: flex-start;
    }

    .card-side.justify-end {
        justify-content: flex-end;
    }

    .card-side.justify-start {
        justify-content: flex-start;
    }

    .card-wrapper {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 12px; /* Rounded corners for appeal */
        overflow: hidden; /* Clip any overflowing content */
    }

    .slider-wrapper {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        overflow: hidden;
    }

    .card-wrapper {
        width: fit-content;
    }

    .slider-wrapper {
        width: 100%;
    }

    .flow-step:hover .card-wrapper {
        transform: translateY(-4px);
    }

    .flow-step:hover .slider-wrapper {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .content-row {
            gap: 2rem;
            max-width: 100%;
            padding: 0 1rem;
        }

        .card-side,
        .slider-side {
            max-width: 50%;
        }
    }

    @media (max-width: 768px) {
        .flow-container {
            padding: 0 1rem;
        }

        .flow-step {
            margin-bottom: 2.5rem;
            padding: 0 0.5rem;
        }

        .content-row,
        .content-row.reverse {
            flex-direction: column !important;
            gap: 2rem;
            margin-top: 3rem;
            padding: 0;
            max-width: 100%;
        }

        .card-side,
        .slider-side {
            max-width: 100%;
            width: 100%;
            justify-content: flex-start;
        }

        .card-wrapper {
            width: 100%;
        }

        .bullet-point {
            width: 12px;
            height: 12px;
        }

        .central-line {
            top: 72px;
            bottom: 72px;
            width: 3px;
        }
    }

    @media (max-width: 640px) {
        .flow-step {
            margin-bottom: 2rem;
        }

        .content-row,
        .content-row.reverse {
            gap: 1.5rem;
            margin-top: 2.5rem;
        }

        .bullet-point {
            width: 10px;
            height: 10px;
        }

        .central-line {
            width: 2px;
            top: 64px;
            bottom: 64px;
        }
    }

    @media (prefers-reduced-motion: no-preference) {
        .flow-step {
            animation: fadeInUp 0.6s ease-out backwards;
        }

        .flow-step:nth-child(1) {
            animation-delay: 0.05s;
        }
        .flow-step:nth-child(2) {
            animation-delay: 0.1s;
        }
        .flow-step:nth-child(3) {
            animation-delay: 0.15s;
        }
        .flow-step:nth-child(4) {
            animation-delay: 0.2s;
        }
        .flow-step:nth-child(5) {
            animation-delay: 0.25s;
        }
        .flow-step:nth-child(6) {
            animation-delay: 0.3s;
        }
        .flow-step:nth-child(7) {
            animation-delay: 0.35s;
        }
        .flow-step:nth-child(8) {
            animation-delay: 0.4s;
        }
        .flow-step:nth-child(9) {
            animation-delay: 0.45s;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
        .card-wrapper,
        .slider-wrapper,
        .bullet-point,
        .end-icon-wrapper,
        .flow-step {
            transition: none !important;
            animation: none !important;
        }
    }

    @media (max-width: 768px) {
        .central-line {
            display: none;
        }

        .bullet-point {
            display: none;
        }

        .flow-step:first-child .content-row {
            margin-top: 2rem;
        }

        .flow-step {
            margin-bottom: 4rem;
        }
    }
</style>
