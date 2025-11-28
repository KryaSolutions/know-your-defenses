<script lang="ts">
    import Card from "./Card.svelte";
    import ImageSlider from "./ImageSlider.svelte";
    import { ShieldCheck } from "lucide-svelte";
    import { onMount, tick } from "svelte";

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

    let containerRef: HTMLDivElement;
    let relativeRef: HTMLDivElement;
    let bulletRefs: HTMLDivElement[] = [];
    let segmentRefs: HTMLDivElement[] = [];
    let segmentStyles: { top: string; height: string }[] = [];
    let segmentProgress: number[] = [];
    let bulletStates: { active: boolean; filled: boolean }[] = items.map(
        () => ({ active: false, filled: false })
    );
    let endRef: HTMLDivElement;
    let endFilled = false;
    let mounted = false;

    const computeLayout = async () => {
        // Wait for DOM to be ready
        await tick();

        if (!relativeRef) return;

        // Collect bullet & segment elements from the container to ensure correct ordering
        const bullets = Array.from(
            relativeRef.querySelectorAll(".bullet-point")
        ) as HTMLDivElement[];
        const segments = Array.from(
            relativeRef.querySelectorAll(".line-segment")
        ) as HTMLDivElement[];

        bulletRefs = bullets;
        segmentRefs = segments;

        const containerRect = relativeRef.getBoundingClientRect();

        // compute centers of bullets relative to container
        const centers: number[] = bulletRefs.map((b) => {
            const r = b.getBoundingClientRect();
            return r.top - containerRect.top + r.height / 2;
        });

        // Build segments between consecutive bullet centers and add final segment to end icon
        const positions: { top: string; height: string }[] = [];

        for (let i = 0; i < centers.length - 1; i++) {
            const top = centers[i];
            const height = Math.max(0, centers[i + 1] - centers[i]);
            positions.push({ top: `${top}px`, height: `${height}px` });
        }

        // find end icon center and add final segment from last bullet to end icon
        const endEl = relativeRef.querySelector(
            ".end-icon-wrapper"
        ) as HTMLDivElement | null;
        let endCenter = null;
        if (endEl) {
            const eRect = endEl.getBoundingClientRect();
            endCenter = eRect.top - containerRect.top + eRect.height / 2;
        }

        if (endCenter != null && centers.length > 0) {
            const lastCenter = centers[centers.length - 1];
            const top = lastCenter;
            const height = Math.max(0, endCenter - lastCenter);
            positions.push({ top: `${top}px`, height: `${height}px` });
        }

        segmentStyles = positions;

        // reset progress arrays to match segments
        segmentProgress = new Array(positions.length).fill(0);
        bulletStates = items.map(() => ({ active: false, filled: false }));

        // after DOM update, collect segment refs
        await tick();
        segmentRefs = Array.from(
            relativeRef.querySelectorAll(".line-segment")
        ) as HTMLDivElement[];
        endRef = relativeRef.querySelector(
            ".end-icon-wrapper"
        ) as HTMLDivElement;
    };

    const handleScroll = () => {
        if (!mounted || segmentStyles.length === 0) return;

        const viewportHeight = window.innerHeight;
        const fillTriggerLine = viewportHeight * 0.5; // center of viewport
        const activeZoneTop = viewportHeight * 0.45;
        const activeZoneBottom = viewportHeight * 0.55;

        // compute segment progress
        for (let i = 0; i < segmentRefs.length; i++) {
            const segmentEl = segmentRefs[i];
            let progress = 0;
            if (segmentEl) {
                const rect = segmentEl.getBoundingClientRect();
                if (rect.top > fillTriggerLine) {
                    progress = 0;
                } else if (rect.bottom < fillTriggerLine) {
                    progress = 1;
                } else {
                    const intersection = fillTriggerLine - rect.top;
                    progress = intersection / rect.height;
                    progress = Math.max(0, Math.min(1, progress));
                }
            }
            segmentProgress[i] = progress;
        }

        // compute bullet states (active/filled)
        for (let i = 0; i < bulletRefs.length; i++) {
            const bullet = bulletRefs[i];
            if (!bullet) continue;
            const bRect = bullet.getBoundingClientRect();
            const bCenter = bRect.top + bRect.height / 2;

            const active =
                bCenter >= activeZoneTop && bCenter <= activeZoneBottom;
            const filled = bCenter < fillTriggerLine;

            bulletStates[i] = { active, filled };
        }

        // set endFilled true when final segment is fully filled
        if (segmentProgress.length > 0) {
            const lastIdx = segmentProgress.length - 1;
            endFilled = segmentProgress[lastIdx] >= 1;
        } else {
            endFilled = false;
        }
    };

    onMount(() => {
        mounted = true;

        const init = async () => {
            await tick();

            // Small delay to ensure all elements are positioned
            setTimeout(async () => {
                await computeLayout();
                handleScroll();
            }, 100);
        };

        init();

        // Event listeners
        window.addEventListener("scroll", handleScroll, { passive: true });

        const resizeHandler = async () => {
            await computeLayout();
            handleScroll();
        };

        window.addEventListener("resize", resizeHandler);

        return () => {
            mounted = false;
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", resizeHandler);
        };
    });
</script>

<div class="py-16 px-4 lg:py-24" bind:this={containerRef}>
    <div class="max-w-screen mx-auto relative" bind:this={relativeRef}>
        <div class="flex justify-center mb-8 lg:mb-12">
            <div
                class="inline-flex items-center gap-2 px-4 py-2 animate-slide-left mx-auto"
            >
                <p
                    class="text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text bg-linear-to-r from-red-400 via-purple-400 to-sky-500"
                >
                    AI-Powered SOC Pipeline
                </p>
            </div>
        </div>

        <div class="central-line-container">
            <div class="central-line-bg"></div>
            {#each items as item, index}
                {#each segmentStyles as style, sIndex}
                    <div
                        class="line-segment"
                        style="top: {style.top}; height: {style.height}; transform: scaleY({segmentProgress[
                            sIndex
                        ] || 0});"
                    ></div>
                {/each}
            {/each}
        </div>

        <div class="flow-container">
            {#each items as item, index}
                <div
                    class="flow-step"
                    role="article"
                    aria-label={`Step ${index + 1}: ${item.title}`}
                >
                    <div
                        class="bullet-point {bulletStates[index]?.active
                            ? 'active'
                            : ''} {bulletStates[index]?.filled ? 'filled' : ''}"
                    ></div>

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

        <div class="flex justify-center mt-32">
            <div
                class="end-icon-wrapper bg-orange-500 transition-all hover:scale-105 {endFilled
                    ? 'filled'
                    : ''}"
                bind:this={endRef}
            >
                <ShieldCheck class="w-16 h-16 lg:w-16 lg:h-16 text-green-200" />
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

    .end-icon-wrapper.filled {
        background: linear-gradient(135deg, #10b981, #059669);
        box-shadow:
            0 0 30px rgba(16, 185, 129, 0.45),
            0 0 60px rgba(6, 182, 164, 0.25);
        transform: scale(1.06);
    }

    /* Central Flow Line Container */
    .central-line-container {
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 80px;
        width: 4px;
        transform: translateX(-50%);
        z-index: 5;
    }

    /* Background line (inactive/gray) */
    .central-line-bg {
        position: absolute;
        left: 0;
        top: 80px;
        bottom: 0;
        width: 100%;
        background: #e5e7eb;
        border-radius: 2px;
    }

    /* Animated line segments */
    .line-segment {
        position: absolute;
        left: 0;
        width: 100%;
        background: linear-gradient(
            to bottom,
            #1e3a8a 0%,
            #1e40af 25%,
            #3b82f6 50%,
            #60a5fa 75%,
            #2563eb 100%
        );
        border-radius: 2px;
        transform-origin: top;
        transition: transform 360ms cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
        z-index: 6;
        overflow: hidden;
    }

    .line-segment::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 10px;
        top: 0;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.8),
            rgba(59, 130, 246, 0.5)
        );
        opacity: 0.9;
        animation: flicker 2s infinite linear;
    }

    @keyframes flicker {
        0%,
        100% {
            opacity: 0.9;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
            transform: scale(1.1);
        }
    }

    .line-segment::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10%;
        height: 20%;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0)
        );
        animation: bubblePulse 1.5s infinite ease-in-out;
        opacity: 0.8;
    }

    @keyframes bubblePulse {
        0%,
        100% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
        }
    }

    /* Flow Container */
    .flow-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 10;
        padding: 0 2rem;
    }

    /* Flow Step */
    .flow-step {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 3rem;
        padding: 0 1rem;
    }

    /* Bullet Point */
    .bullet-point {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #e5e7eb;
        border: 3px solid white;
        box-shadow:
            0 0 0 3px #e5e7eb,
            0 4px 8px rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 15;
    }

    .bullet-point.active {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        transform: translateX(-50%) scale(1.4);
        box-shadow:
            0 0 0 6px rgba(59, 130, 246, 0.25),
            0 0 25px rgba(59, 130, 246, 0.6),
            0 0 40px rgba(59, 130, 246, 0.3);
        animation: pulseGlow 1.8s infinite ease-in-out;
    }

    @keyframes pulseGlow {
        0%,
        100% {
            box-shadow:
                0 0 0 6px rgba(59, 130, 246, 0.25),
                0 0 25px rgba(59, 130, 246, 0.6);
        }
        50% {
            box-shadow:
                0 0 0 10px rgba(59, 130, 246, 0.15),
                0 0 35px rgba(59, 130, 246, 0.5);
        }
    }

    .bullet-point.filled {
        background: #2563eb;
        box-shadow:
            0 0 0 3px #bfdbfe,
            0 0 15px rgba(37, 99, 235, 0.7);
    }

    /* Content Row */
    .content-row {
        display: flex;
        flex-direction: row;
        gap: 2.5rem;
        align-items: center;
        flex: 1;
        width: 100%;
        max-width: 1200px;
        margin-top: 4rem;
        padding: 0 2rem;
        position: relative;
        z-index: 10;
    }

    .content-row.reverse {
        flex-direction: row-reverse;
    }

    .card-side,
    .slider-side {
        flex: 1;
        max-width: 48%;
        min-width: 0;
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
        border-radius: 12px;
        overflow: hidden;
        width: fit-content;
    }

    .slider-wrapper {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        overflow: hidden;
        width: 100%;
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
            display: none;
        }

        .central-line-container,
        .central-line-bg,
        .line-segment {
            display: none;
        }

        .flow-step:first-child .content-row {
            margin-top: 2rem;
        }

        .flow-step {
            margin-bottom: 4rem;
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
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
        .card-wrapper,
        .slider-wrapper,
        .bullet-point,
        .end-icon-wrapper,
        .line-segment {
            transition: none !important;
            animation: none !important;
        }
    }
</style>
