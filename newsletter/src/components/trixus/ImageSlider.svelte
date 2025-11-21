<script lang="ts">
    import { onDestroy } from "svelte";

    export let slides: number;
    export let subSlides: number[] = [];
    export let alt: string = "";
    export let interval: number = 3000;

    let timer: number | undefined;
    let currentSlide = 0;

    let slideBuffer: string[] = [];

    if (subSlides.length > 0) {
        slideBuffer = subSlides.map(
            (num) =>
                new URL(`../../assets/${slides}.${num}.png`, import.meta.url)
                    .href
        );
    } else {
        slideBuffer = [
            new URL(`../../assets/${slides}.png`, import.meta.url).href,
        ];
    }

    if (slideBuffer.length > 1) {
        timer = setInterval(next, interval);
    }

    function next() {
        currentSlide = (currentSlide + 1) % slideBuffer.length;
    }

    function prev() {
        currentSlide =
            (currentSlide - 1 + slideBuffer.length) % slideBuffer.length;
    }

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<div class="w-full relative overflow-hidden rounded-lg">
    <img
        src={slideBuffer[currentSlide]}
        {alt}
        class="w-full h-64 object-cover transition-all duration-500"
    />

    {#if slideBuffer.length > 1}
        <!-- Prev Button -->
        <button
            class="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            on:click={prev}
        >
            ‹
        </button>

        <!-- Next Button -->
        <button
            class="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            on:click={next}
        >
            ›
        </button>

        <!-- Indicators -->
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {#each slideBuffer as _, index}
                <button
                    aria-label="Indexer"
                    class={`w-3 h-3 rounded-full border border-slate-600 ${index === currentSlide ? "bg-slate-400" : "bg-white"}`}
                    on:click={() => (currentSlide = index)}
                >
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    button {
        outline: none;
    }
</style>
