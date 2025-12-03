<script lang="ts">
    import { tick } from "svelte";
    import { cubicOut } from "svelte/easing";
    import axios from "axios";
    import { CircleX, Bot as BotIcon } from "lucide-svelte";
    import { fetchKnowledgeBase, quickReplies } from "./quickResponses";

    const apiUrl: string =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_DEV_URL
            : import.meta.env.VITE_PROD_URL;

    let isOpen = false;
    let showButton = true;
    let messages: { text: string; isUser: boolean; hasLink?: boolean }[] = [];
    let input = "";
    let isLoading = false;
    let hasInteracted = false;
    let messagesEndRef: HTMLDivElement | null = null;

    // Custom transition for slideUp (works for both in and out)
    function slideUp(
        _node: Element,
        { delay = 0, duration = 300, easing = cubicOut } = {}
    ) {
        return {
            delay,
            duration,
            easing,
            css: (t: number) => `
                opacity: ${t};
                transform: translateY(${20 * (1 - t)}px) scale(${0.95 + 0.05 * t});
            `,
        };
    }

    // Auto-scroll to bottom when messages change
    $: if (messages.length >= 0) {
        (async () => {
            await tick();
            if (messagesEndRef) {
                messagesEndRef.scrollIntoView({ behavior: "smooth" });
            }
        })();
    }

    async function sendMessageWithText(text: string) {
        const trimmed = text.trim();
        if (!trimmed) return;

        // Mark that user has interacted
        if (!hasInteracted) {
            hasInteracted = true;
        }

        // Check if user typed "1" to show options
        if (trimmed === "1") {
            showQuickOptions();
            return;
        }

        const userMsg = { text: trimmed, isUser: true };
        messages = [...messages, userMsg];

        const predefinedResponse = fetchKnowledgeBase(trimmed);

        if (predefinedResponse) {
            messages = [
                ...messages,
                {
                    text: predefinedResponse.answer,
                    isUser: false,
                    hasLink: predefinedResponse.hasLink || false,
                },
            ];
        } else {
            isLoading = true;
            try {
                type CompletionType = {
                    completion: string;
                    success: boolean;
                };

                const completion = await axios.post<CompletionType>(
                    `${apiUrl}/api/chatCompletion`,
                    { message: trimmed },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!completion.data.success) {
                    throw new Error("Failed to get response from server");
                }

                const aiResponse =
                    completion.data.completion ||
                    "I'm sorry, I couldn't process that request.";

                messages = [
                    ...messages,
                    {
                        text: aiResponse,
                        isUser: false,
                        hasLink: false,
                    },
                ];
            } catch (error) {
                messages = [
                    ...messages,
                    {
                        text: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again later or contact us directly at contact@kryasolutions.com",
                        isUser: false,
                        hasLink: false,
                    },
                ];
            } finally {
                isLoading = false;
            }
        }
    }

    function sendMessage() {
        if (!isLoading && input.trim()) {
            sendMessageWithText(input);
            input = "";
        }
    }

    function showQuickOptions() {
        messages = [];
        hasInteracted = false;
    }

    function handleStartAssessment() {
        const surveySection = document.querySelector("#survey-section");
        if (surveySection) {
            surveySection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
</script>

<div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
    <!-- Floating Chat Button -->
    {#if showButton}
        <button
            on:click={() => {
                showButton = false;
                isOpen = true;
            }}
            class="relative bg-(--brand-blue)/25 hover:bg-(--brand-blue)/35 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
            aria-label="Open chat"
        >
            <BotIcon class="text-(--brand-blue)" />
        </button>
    {/if}

    <!-- Chat Window -->
    {#if isOpen}
        <div
            class="w-[calc(100vw-2rem)] sm:w-[400px] lg:w-[420px] bg-white shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col max-h-[85vh] sm:max-h-[650px] overflow-hidden border border-gray-100"
            transition:slideUp
        >
            <!-- Header -->
            <div
                class="bg-linear-to-br from-(--brand-blue) via-(--brand-blue) to-blue-600 text-white p-4 sm:p-5 rounded-t-2xl sm:rounded-t-3xl flex justify-between items-center shadow-lg"
            >
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 sm:w-11 sm:h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner"
                    >
                        <BotIcon class="text-white" />
                    </div>
                    <div>
                        <h3
                            class="text-white font-semibold text-base sm:text-lg"
                        >
                            Krya AI Assistant
                        </h3>
                    </div>
                </div>
                <button
                    on:click={() => {
                        isOpen = false;
                        setTimeout(() => {
                            showButton = true;
                        }, 300);
                    }}
                    class="text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200 hover:scale-105"
                    aria-label="Close chat"
                >
                    <CircleX class="text-white" />
                </button>
            </div>

            <!-- Messages -->
            <div
                class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-linear-to-b from-gray-50 to-gray-100/50 text-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
                <!-- Welcome Message -->
                {#if messages.length === 0}
                    <div class="flex justify-start animate-fadeIn">
                        <div
                            class="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-md shadow-md w-full border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-2xl">👋</span>
                                <p class="font-semibold text-gray-900">
                                    Welcome to Krya Solutions!
                                </p>
                            </div>
                            <p class="text-gray-600 mb-3 leading-relaxed">
                                I'm your AI assistant for cybersecurity. Ask me
                                anything about our services, security
                                assessments, or best practices!
                            </p>
                            <button
                                type="button"
                                on:click={handleStartAssessment}
                                class="inline-flex items-center gap-2 w-full justify-center mt-3 px-4 py-2.5 bg-(--brand-blue) text-white rounded-xl text-sm font-medium hover:scale-105 transition-all shadow-md hover:shadow-lg active:scale-95"
                            >
                                <span>🔒</span>
                                <span>Take Free Assessment</span>
                                <svg
                                    class="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                            <div class="flex flex-wrap gap-2 mt-4">
                                {#each quickReplies as reply, _}
                                    <button
                                        on:click={() =>
                                            sendMessageWithText(reply)}
                                        class="px-3 py-2 bg-gray-50 hover:bg-(--brand-blue) hover:text-white border border-gray-200 rounded-full text-xs sm:text-sm transition-all duration-200 hover:shadow-md active:scale-95"
                                    >
                                        {reply
                                            .split(" ")
                                            .slice(0, 3)
                                            .join(" ")}...
                                    </button>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/if}

                {#each messages as msg, _}
                    <div
                        class="flex {msg.isUser
                            ? 'justify-end'
                            : 'justify-start'} animate-fadeIn"
                    >
                        <div
                            class="px-4 py-2.5 sm:px-4 sm:py-3 rounded-2xl max-w-[85%] sm:max-w-[80%] whitespace-pre-line shadow-md {msg.isUser
                                ? 'bg-linear-to-br from-(--brand-blue) to-blue-600 text-white rounded-br-md'
                                : 'bg-white text-gray-800 rounded-tl-md border border-gray-100'}"
                        >
                            {msg.text}
                            {#if msg.hasLink && !msg.isUser}
                                <button
                                    type="button"
                                    on:click={handleStartAssessment}
                                    class="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-(--brand-blue) text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                                >
                                    <span>🔒</span>
                                    <span>Take Free Assessment</span>
                                    <svg
                                        class="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            {/if}
                        </div>
                    </div>
                {/each}

                <!-- Loading Indicator -->
                {#if isLoading}
                    <div class="flex justify-start animate-fadeIn">
                        <div
                            class="bg-white px-5 py-3 rounded-2xl rounded-tl-md shadow-md"
                        >
                            <div class="flex gap-1.5">
                                <div
                                    class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                ></div>
                                <div
                                    class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style="animation-delay: 0.1s"
                                ></div>
                                <div
                                    class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style="animation-delay: 0.2s"
                                ></div>
                            </div>
                        </div>
                    </div>
                {/if}

                <div bind:this={messagesEndRef}></div>
            </div>

            <!-- Input Area -->
            <div
                class="p-3 sm:p-4 bg-white border-t border-gray-100 rounded-b-2xl sm:rounded-b-3xl"
            >
                <div class="flex items-end gap-2">
                    <input
                        type="text"
                        bind:value={input}
                        on:keydown={handleKeyDown}
                        placeholder={hasInteracted
                            ? "Type 1 for options"
                            : "Ask me anything..."}
                        class="flex-1 px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-(--brand-blue) focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                        disabled={isLoading}
                    />
                    <button
                        on:click={sendMessage}
                        disabled={!input.trim() || isLoading}
                        aria-label="Send message"
                        class="bg-linear-to-r from-(--brand-blue) to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 disabled:active:scale-100"
                    >
                        <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeIn {
        animation: fadeIn 0.4s ease-out;
    }

    /* Custom scrollbar */
    .scrollbar-thin::-webkit-scrollbar {
        width: 6px;
    }

    .scrollbar-thin::-webkit-scrollbar-track {
        background: transparent;
    }

    .scrollbar-thin::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
    }

    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
</style>
