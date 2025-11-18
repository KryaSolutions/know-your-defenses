<script lang="ts">
    import { onMount } from "svelte";
    import krya from "../assets/krya.svg";

    let isVisible = true;
    let lastScrollY = 0;
    let mobileMenuOpen = false;

    onMount(() => {
        document.documentElement.style.scrollBehavior = "smooth";

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                isVisible = true;
            } else {
                isVisible = false;
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    function scrollToSection(event: Event, sectionId: string) {
        event.preventDefault();
        const section = document.querySelector(sectionId) as HTMLElement;
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        mobileMenuOpen = false;
    }

    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }
</script>

<nav
    class="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md transition-transform duration-300 shadow-lg"
    class:translate-y-0={isVisible}
    class:-translate-y-full={!isVisible}
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
            <!-- Logo Section -->
            <div class="flex items-center">
                <a
                    href="https://kryasolutions.com"
                    class="text-2xl font-bold text-white hover:text-(--brand-orange) transition-colors duration-200"
                >
                    <img
                        src={krya}
                        alt="Krya Solutions"
                        class="h-12 text-(--brand-blue) w-auto object-contain"
                    />
                </a>
            </div>

            <!-- Desktop Navigation Links -->
            <div class="hidden md:flex items-center space-x-8">
                <a
                    href="https://kyd.kryasolutions.com"
                    class="text-white hover:text-(--brand-orange) transition-colors duration-200 font-medium"
                >
                    Know Your Defenses
                </a>

                <button
                    on:click={(e) => scrollToSection(e, "#contact-section")}
                    class="bg-(--brand-orange) text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    Contact Us
                </button>
            </div>

            <!-- Mobile Menu Button -->
            <button
                on:click={toggleMobileMenu}
                class="md:hidden text-(--brand-blue) p-2 rounded-lg hover:bg-(--brand-blue)/10 transition-colors"
                aria-label="Toggle menu"
            >
                {#if !mobileMenuOpen}
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                {:else}
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                {/if}
            </button>
        </div>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
        <div class="md:hidden border-t border-white/10 backdrop-blur-md">
            <div class="px-4 py-4 space-y-3">
                <a
                    href="https://kyd.kryasolutions.com"
                    on:click={() => (mobileMenuOpen = false)}
                    class="block text-(--brand-blue) hover:text-(--brand-orange) transition-colors duration-200 font-medium py-2"
                >
                    Know Your Defenses
                </a>

                <button
                    on:click={(e) => scrollToSection(e, "#contact-section")}
                    class="w-full bg-(--brand-blue) text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg"
                >
                    Contact Us
                </button>
            </div>
        </div>
    {/if}
</nav>
