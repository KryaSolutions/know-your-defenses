<script lang="ts">
    import { fly } from "svelte/transition";
    import latestNews from "$lib/assets/news-articles-latest.json";
    import leftOvers from "$lib/assets/news-articles-leftovers.json";
    import Footer from "$lib/components/Footer.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Hero from "$lib/components/newsletters/Hero.svelte";
    import Articles from "$lib/components/newsletters/Articles.svelte";
    import Bot from "$lib/components/Bot.svelte";
</script>

<main class="min-h-screen">
    <Navbar />
    <Hero />

    <div id="digest-section" class="max-w-[1200px] mx-auto px-4 pt-8">
        <Articles articles={latestNews} />
    </div>

    <div class="max-w-[1200px] mx-auto px-4 pt-16 pb-8">
        <div class="max-w-3xl mx-auto mb-6">
            <div class="relative">
                <hr
                    class="border-t-2 border-dashed border-gray-300 dark:border-gray-600"
                />
                <div
                    transition:fly={{ y: 12, duration: 450 }}
                    class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full text-base font-semibold text-white"
                    style="background-color:var(--brand-orange); padding: 1rem 2.5rem;"
                >
                    Read other interesting articles
                </div>
            </div>
        </div>

        <Articles articles={leftOvers} />

        <Footer />
    </div>
</main>
<Bot />
