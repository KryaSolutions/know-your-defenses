<script lang="ts">
    import axios from "axios";
    import { Mail, Phone } from "lucide-svelte";

    const apiUrl: string =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEV_URL
            : import.meta.env.VITE_PROD_URL;

    type FormData = {
        name: string;
        email: string;
        mobile: string;
        thought: string;
    };

    let formData: FormData = { name: "", email: "", mobile: "", thought: "" };
    let status: "idle" | "loading" | "success" | "error" = "idle";

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        formData = { ...formData, [target.name]: target.value };
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        status = "loading";

        try {
            await axios.post(`${apiUrl}/api/sendEmail`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            status = "success";
            formData = { name: "", email: "", mobile: "", thought: "" };
        } catch (error: any) {
            status = "error";
        } finally {
            setTimeout(() => (status = "idle"), 4000);
        }
    };
</script>

<footer
    id="trixus-footer"
    class="w-full py-8 sm:py-12 px-4 sm:px-6 bg-transparent text-slate-700"
>
    <div
        class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
    >
        <!-- Left Section -->
        <div
            class="flex flex-col justify-center text-center md:text-left space-y-4 sm:space-y-6"
        >
            <h2 class="text-xl sm:text-2xl font-semibold text-(--brand-blue)">
                Protect your data, infrastructure, and operations.
            </h2>
            <p class="text-base sm:text-lg">
                Partner with
                <span class="font-semibold text-(--brand-orange)"
                    >Krya Solutions</span
                >
                for end-to-end cyber protection tailored to your needs.
            </p>

            <div
                class="flex flex-col items-center md:items-start gap-3 sm:gap-4 mt-2 text-(--brand-blue)"
            >
                <a
                    href="tel:+914466692727"
                    class="flex items-center gap-2 hover:text-(--brand-orange) transition-colors duration-200 whitespace-nowrap"
                >
                    <Phone class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-sm sm:text-base">+91 44 6669 2727</span>
                </a>
                <a
                    href="mailto:ks-info@kryasolutions.com"
                    class="flex items-center gap-2 hover:text-(--brand-orange) transition-colors duration-200 whitespace-nowrap break-all sm:break-normal"
                >
                    <Mail class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span class="text-sm sm:text-base"
                        >ks-info@kryasolutions.com</span
                    >
                </a>
            </div>
        </div>

        <!-- Right Section - Contact Form -->
        <div class="rounded-2xl shadow-xl bg-white/5 p-4 sm:p-6 md:p-8">
            <h3
                class="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left"
            >
                Contact Us
            </h3>
            <form
                on:submit|preventDefault={handleSubmit}
                class="space-y-3 sm:space-y-4"
            >
                <div>
                    <label for="name" class="block text-xs sm:text-sm mb-1"
                        >Name</label
                    >
                    <input
                        type="text"
                        name="name"
                        bind:value={formData.name}
                        on:input={handleChange}
                        required
                        class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md border border-(--brand-blue)/10 focus:outline-none focus:border-(--brand-blue)/40 text-slate-700 placeholder-slate-400 transition-colors duration-200"
                    />
                </div>
                <div>
                    <label for="name" class="block text-xs sm:text-sm mb-1"
                        >Email</label
                    >
                    <input
                        type="email"
                        name="email"
                        bind:value={formData.email}
                        on:input={handleChange}
                        required
                        class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md border border-(--brand-blue)/10 focus:outline-none focus:border-(--brand-blue)/40 text-slate-700 placeholder-slate-400 transition-colors duration-200"
                    />
                </div>
                <div>
                    <label for="mobile" class="block text-xs sm:text-sm mb-1"
                        >Mobile No.</label
                    >
                    <input
                        type="text"
                        name="mobile"
                        bind:value={formData.mobile}
                        on:input={handleChange}
                        required
                        class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md border border-(--brand-blue)/10 focus:outline-none focus:border-(--brand-blue)/40 text-slate-700 placeholder-slate-400 transition-colors duration-200"
                    />
                </div>
                <div>
                    <label for="thoughts" class="block text-xs sm:text-sm mb-1"
                        >Share your thoughts</label
                    >
                    <textarea
                        name="thought"
                        rows="4"
                        bind:value={formData.thought}
                        on:input={handleChange}
                        required
                        class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md border border-(--brand-blue)/10 focus:outline-none focus:border-(--brand-blue)/40 text-slate-700 placeholder-slate-400 transition-colors duration-200"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={status === "loading"}
                    class="w-full bg-(--brand-orange) text-white py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-(--brand-orange)/20 disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                    {#if status === "loading"}
                        Sending...
                    {:else if status === "success"}
                        Sent!
                    {:else}
                        Submit
                    {/if}
                </button>

                {#if status === "success"}
                    <p
                        class="text-(--brand-blue) text-xs sm:text-sm text-center mt-2 font-medium"
                    >
                        Message sent successfully!
                    </p>
                {/if}
                {#if status === "error"}
                    <p class="text-red-400 text-xs sm:text-sm text-center mt-2">
                        Failed to send. Please try again.
                    </p>
                {/if}
            </form>
        </div>
    </div>

    <div
        class="mt-8 sm:mt-12 pt-4 text-center text-xs sm:text-sm text-slate-500"
    >
        © {new Date().getFullYear()} Krya Solutions. All rights reserved.
    </div>
</footer>
