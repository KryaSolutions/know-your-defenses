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

<div class="w-full max-w-[1200px] mx-auto px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {#each visibleArticles as article, i}
            <article
                class="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 h-full opacity-0 animate-fade-in-up"
                style="animation-delay: {i * 0.05}s;"
            >
                <a
                    href={article.link}
                    class="block h-full"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div class="p-5 sm:p-6 h-full flex flex-col">
                        <div class="flex justify-end mb-3">
                            <span class="text-xs text-slate-100">
                                {formatDate(article.date)}
                            </span>
                        </div>

                        <h2
                            class="text-lg sm:text-xl font-bold leading-snug mb-3 text-white group-hover:text-(--brand-orange) transition-colors duration-200"
                        >
                            {article.title}
                        </h2>

                        <p
                            class="grow text-slate-100 leading-relaxed mb-4 text-sm sm:text-base line-clamp-4"
                        >
                            {article.content}
                        </p>

                        <div
                            class="flex items-center gap-2 text-(--brand-light-blue) font-semibold text-sm mt-auto group"
                        >
                            <span>See post</span>
                            <svg
                                class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
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
        <div class="flex justify-center mt-8 sm:mt-12">
            <button
                class="flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-(--brand-orange) rounded-full hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto justify-center group shadow-lg"
                on:click={loadMore}
            >
                <span>Read more</span>
                <svg
                    class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
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
</div>

<style>
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in-up {
        animation: fade-in-up 0.6s ease-out forwards;
    }

    article:hover h2 {
        color: var(--brand-orange);
    }
</style>
