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
        thought: string;
    };

    let formData: FormData = { name: "", email: "", thought: "" };
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
            formData = { name: "", email: "", thought: "" };
        } catch (error: any) {
            status = "error";
        } finally {
            setTimeout(() => (status = "idle"), 4000);
        }
    };
</script>

<footer class="w-full py-12 px-6 bg-transparent text-slate-800">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Left Section -->
        <div
            class="flex flex-col justify-center text-center md:text-left space-y-6"
        >
            <h2 class="text-2xl font-semibold text-(--brand-blue)">
                Protect your data, infrastructure, and operations.
            </h2>
            <p class="text-slate-700 text-lg">
                Partner with
                <span class="font-semibold text-(--brand-blue)"
                    >Krya Solutions</span
                >
                for end-to-end cyber protection tailored to your needs.
            </p>

            <div
                class="flex flex-col sm:flex-row sm:justify-start justify-center gap-4 mt-2 text-(--brand-blue)"
            >
                <a
                    href="tel:+914466692727"
                    class="flex items-center justify-center gap-2 hover:text-(--brand-orange) transition-colors duration-200"
                >
                    <Phone class="w-5 h-5" />
                    <span>+91 44 6669 2727</span>
                </a>
                <a
                    href="mailto:ks-info@kryasolutions.com"
                    class="flex items-center justify-center gap-2 hover:text-(--brand-orange) transition-colors duration-200"
                >
                    <Mail class="w-5 h-5" />
                    <span>ks-info@kryasolutions.com</span>
                </a>
            </div>
        </div>

        <!-- Right Section - Contact Form -->
        <div
            class="rounded-2xl border border-slate-200 shadow-xl bg-white p-6 md:p-8"
        >
            <h3
                class="text-xl font-semibold mb-4 text-(--brand-blue) text-center md:text-left"
            >
                Contact Us
            </h3>
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div>
                    <label for="name" class="block text-sm mb-1 text-slate-700"
                        >Name</label
                    >
                    <input
                        type="text"
                        name="name"
                        bind:value={formData.name}
                        on:input={handleChange}
                        required
                        class="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-(--brand-blue) bg-white text-slate-800 placeholder-slate-400 transition-colors duration-200"
                    />
                </div>
                <div>
                    <label for="email" class="block text-sm mb-1 text-slate-700"
                        >Email</label
                    >
                    <input
                        type="email"
                        name="email"
                        bind:value={formData.email}
                        on:input={handleChange}
                        required
                        class="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-(--brand-blue) bg-white text-slate-800 placeholder-slate-400 transition-colors duration-200"
                    />
                </div>
                <div>
                    <label
                        for="thoughts"
                        class="block text-sm mb-1 text-slate-700"
                        >Share your thoughts</label
                    >
                    <textarea
                        name="thought"
                        rows="4"
                        bind:value={formData.thought}
                        on:input={handleChange}
                        required
                        class="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-(-brand-blue) bg-white text-slate-800 placeholder-slate-400 transition-colors duration-200 resize-none"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={status === "loading"}
                    class="w-full bg-(--brand-blue) text-white py-3 rounded-full font-medium transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-(--brand-orange)/20 disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none"
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
                        class="text-(--brand-orange) text-sm text-center mt-2 font-medium"
                    >
                        Message sent successfully!
                    </p>
                {/if}
                {#if status === "error"}
                    <p class="text-red-400 text-sm text-center mt-2">
                        Failed to send. Please try again.
                    </p>
                {/if}
            </form>
        </div>
    </div>

    <div
        class="mt-12 border-t border-slate-200 pt-4 text-center text-sm text-slate-600"
    >
        © {new Date().getFullYear()} Krya Solutions. All rights reserved.
    </div>
</footer>
