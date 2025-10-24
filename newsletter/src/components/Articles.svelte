<script lang="ts">
    type Articles = {
        title: string;
        content: string;
        link: string;
        date: string;
    };
    export let articles: Articles[] = [];

    let visibleCount = 15;
    const INCREMENT = 6;

    function loadMore() {
        visibleCount += INCREMENT;
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    $: visibleArticles = articles.slice(0, visibleCount);
</script>

<div class="articles-container">
    <div class="articles-grid">
        {#each visibleArticles as article, i}
            <article class="article-card" style="animation-delay: {i * 0.05}s">
                <a
                    href={article.link}
                    class="block h-full"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div class="card-content">
                        <div class="flex justify-end mb-3">
                            <span class="text-xs text-gray-600">
                                {formatDate(article.date)}
                            </span>
                        </div>

                        <h2 class="article-title">
                            {article.title}
                        </h2>

                        <p class="article-excerpt">
                            {article.content}
                        </p>

                        <div class="see-post">
                            <span>See post</span>
                            <svg
                                class="arrow-icon"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M6 3L11 8L6 13"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </a>
            </article>
        {/each}
    </div>

    {#if articles.length > visibleCount}
        <div class="load-more-container">
            <button class="load-more-button" on:click={loadMore}>
                Read more
                <svg
                    class="arrow-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    {/if}

    <style>
        /* keep component-local visual adjustments minimal; layout/styling is Tailwind-first */
    </style>
</div>

<style>
    .articles-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .articles-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        align-items: start;
    }

    .article-card {
        border: 1px solid #d1d5db;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        background: white;
        overflow: hidden;
        height: 100%;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .article-card:hover {
        box-shadow: 0 8px 16px -6px rgba(0, 0, 0, 0.12);
        border-color: var(--brand-blue);
    }

    .card-content {
        padding: 1.5rem;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    a {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .article-title {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.4;
        margin-bottom: 0.75rem;
        color: var(--brand-blue);
        transition: color 0.2s ease;
    }

    .article-card:hover .article-title {
        color: var(--brand-orange);
    }

    .article-excerpt {
        flex-grow: 1;
        color: #4b5563;
        line-height: 1.6;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    .see-post {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--brand-blue);
        font-weight: 600;
        font-size: 0.875rem;
        transition: gap 0.2s ease;
        margin-top: auto;
    }

    .article-card:hover .see-post {
        gap: 0.75rem;
    }

    .arrow-icon {
        transition: transform 0.2s ease;
    }

    .article-card:hover .arrow-icon {
        transform: translateX(4px);
    }

    .article-card {
        background: white;
        border-radius: 1rem;
        box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transform: translateY(0);
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .article-card:hover {
        transform: translateY(-4px);
        box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .load-more-container {
        display: flex;
        justify-content: center;
        margin-top: 3rem;
    }

    .load-more-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2.5rem;
        font-size: 1rem;
        font-weight: 600;
        color: white;
        background-color: var(--brand-blue);
        border: none;
        border-radius: 9999px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .load-more-button:hover {
        background-color: var(--brand-orange);
        transform: translateY(-2px);
    }

    .load-more-button .arrow-icon {
        transition: transform 0.2s ease;
    }

    .load-more-button:hover .arrow-icon {
        transform: translateX(4px);
    }

    @media (max-width: 768px) {
        .card-content {
            padding: 1.25rem;
        }

        .article-title {
            font-size: 1.125rem;
        }

        .load-more-button {
            width: 100%;
            justify-content: center;
        }
    }
</style>
