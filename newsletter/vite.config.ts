import { defineConfig } from "vite";
import path from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    return {
        plugins: [svelte(), tailwindcss()],
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            return id
                                .toString()
                                .split("node_modules/")[1]
                                .split("/")[0]
                                .toString();
                        }
                    },
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        base: mode === "development" ? "/" : "/",
        server: {
            port: 10201,
            host: true,
        },
    };
});
