<script lang="ts">
    import introOutro from "../assets/intro-outro.json";
    const { intro } = introOutro[0];

    const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
</script>

<section class="hero-section">
    <div class="hero-content">
        <div class="hero-main">
            <h1>Cybersecurity Weekly</h1>
            <div class="date-badge">
                <span class="pulse"></span>
                {formattedDate}
            </div>
        </div>

        <div class="hero-summary">
            <p>{intro}</p>
        </div>

        <button
            class="scroll-button"
            on:click={() =>
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                })}
        >
            Read This Week's Updates
        </button>
    </div>
</section>

<style>
    .hero-section {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 0;
        color: var(--brand-blue);
    }

    .hero-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        opacity: 0;
        animation: fadeIn 1s ease-out forwards;
    }

    .hero-main {
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
    }

    .hero-main h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--brand-blue);
        margin: 0;
        letter-spacing: -0.02em;
    }

    .date-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--brand-blue);
        color: white;
        border: none;
        border-radius: 2rem;
        font-size: 0.875rem;
        font-weight: 500;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .pulse {
        width: 6px;
        height: 6px;
        background-color: var(--brand-orange);
        border-radius: 50%;
        position: relative;
    }

    .pulse::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: var(--brand-orange);
        border-radius: 50%;
        animation: pulse 2s infinite;
    }

    .hero-main {
        margin-bottom: 3rem;
    }

    .hero-main h1 {
        font-size: 3rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin-bottom: 0.5rem;
        color: var(--brand-blue);
        text-shadow: none;
    }

    .hero-summary {
        max-width: 800px;
        margin: 0 auto 2rem;
        padding: 0 1rem;
    }

    .hero-summary p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #191724;
        text-align: justify;
        hyphens: auto;
        text-shadow: none;
    }

    .scroll-button {
        display: inline-block;
        padding: 1rem 2.5rem;
        background-color: var(--brand-blue);
        color: white;
        border: none;
        border-radius: 9999px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
        margin: 0 auto;
    }

    .scroll-button:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .scroll-button::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(rgba(255, 255, 255, 0.1), transparent);
        pointer-events: none;
    }

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

    @media (max-width: 768px) {
        .hero-section {
            padding: 1.5rem;
            min-height: 100vh;
        }

        .hero-main {
            flex-direction: column;
            gap: 1rem;
        }

        .hero-main h1 {
            font-size: 1.75rem;
        }

        .hero-summary p {
            font-size: 1.1rem;
            line-height: 1.6;
        }

        .scroll-button {
            width: 100%;
            justify-content: center;
        }
    }
</style>
