import { useState, useEffect, useRef } from "react";

// ===== COMPANY KNOWLEDGE BASE =====

const Bot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<
        { text: string; isUser: boolean; hasLink?: boolean }[]
    >([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ===== SEND MESSAGE (LOCAL KNOWLEDGE-BASE ONLY) =====
    // The emergency bot responds only using the local knowledge base (`getIntelligentResponse`).
    const sendMessageWithText = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const userMsg = { text: trimmed, isUser: true };
        setMessages((prev) => [...prev, userMsg]);

        // Get response from local KB
        const aiText = getIntelligentResponse(trimmed);
        const shouldShowLink =
            aiText.toLowerCase().includes("assessment") ||
            aiText.toLowerCase().includes("kyd") ||
            trimmed.toLowerCase().includes("assessment");

        setMessages((prev) => [
            ...prev,
            { text: aiText, isUser: false, hasLink: shouldShowLink },
        ]);
    };

    const sendMessage = () => {
        sendMessageWithText(input);
        setInput("");
    };

    // Scroll to the survey section instead of redirecting to the assessment page
    const handleStartAssessment = () => {
        const heroSection = document.querySelector("#survey-section");
        if (heroSection) {
            heroSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // ===== FALLBACK INTELLIGENT RESPONSES =====
    const getIntelligentResponse = (msg: string): string => {
        const lower = msg.toLowerCase();

        if (
            lower.includes("cyber") &&
            (lower.includes("service") || lower.includes("provide"))
        ) {
            return `Krya Solutions provides comprehensive cybersecurity services including:

Core services:
• Security Risk Assessment & Penetration Testing
• AI-Powered Threat Detection & Response
• 24/7 Security Operations Center (SOC)
• Vulnerability & Patch Management
• Cloud Security (AWS, Azure, GCP)
• Incident Response & Forensics

We use AI/ML-driven security tools, SIEM, EDR/XDR, and Zero Trust Architecture.`;
        }

    if (lower.includes("assessment") || lower.includes("kyd")) {
        return `Our Know Your Defense (KYD) assessment is a comprehensive security evaluation:

What you get:
• Complete security posture analysis
• Critical vulnerability identification
• Risk prioritization with scoring
• Compliance gap analysis (ISO, GDPR)
• Actionable remediation roadmap

Takes 20-30 minutes | Free initial assessment`;
    }

    if (lower.includes("threat") || lower.includes("detect")) {
        return `Krya's AI-powered threat detection provides:

Advanced capabilities:
• Real-time threat intelligence
• Machine learning anomaly detection
• Automated incident response
• 24/7 SOC monitoring
• SIEM integration

We identify threats before they cause damage.`;
    }

    if (lower.includes("contact") || lower.includes("email")) {
        return `Get in touch with Krya Solutions:

Email: contact@kryasolutions.com
Website: https://kryasolutions.com
Headquarters: Chennai, India

We serve clients across Asia Pacific, USA, Middle East, and Africa.`;
    }

    if (lower.includes("hello") || lower.includes("hi")) {
        return `Hello. Welcome to Krya Solutions.

I'm your AI assistant for cybersecurity questions. With 12+ years of experience and 750+ global customers, we specialize in:

AI-driven cybersecurity
Security assessments
Cloud security (AWS, Azure, GCP)
24/7 threat monitoring

How can I help secure your organization today?`;
    }

        return `Thanks for your question! I can help with:

• Cybersecurity services and capabilities
• Security assessment (Know Your Defense)
• Threat detection and monitoring
• Cloud security solutions
• Compliance and certifications

What would you like to know more about?`;
    };

    // Quick reply shortcuts
    const quickReplies = [
        "What cybersecurity services does Krya provide?",
        "Tell me about the KYD assessment",
        "How does AI threat detection work?",
        "How can I contact Krya?",
    ];

    return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 font-sans">
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative bg-[var(--brand-blue)] hover:opacity-90 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                >
                    <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                    <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-full sm:w-[380px] max-w-[calc(100vw-2.5rem)] bg-white shadow-2xl rounded-2xl flex flex-col max-h-[80vh] sm:max-h-[600px] border border-gray-200 animate-slideUp overflow-hidden">
                    {/* Header */}
                    <div className="bg-[var(--brand-blue)] text-white p-3 sm:p-4 rounded-t-2xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 fill-white"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-base">
                                    Krya AI Assistant
                                </h3>
                                <p className="text-xs opacity-90">🟢 Online</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 text-2xl font-light leading-none"
                        >
                            ×
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 text-sm scrollbar-thin scrollbar-thumb-gray-300">
                        {/* Welcome Message */}
                        {messages.length === 0 && (
                            <div className="flex gap-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--brand-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-4 h-4 fill-white"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                </div>
                                <div className="bg-white p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] sm:max-w-[75%]">
                                    <p className="font-semibold mb-1">Welcome to Krya Solutions!</p>
                                    <p className="text-gray-700 mb-2">
                                        I'm your AI assistant for cybersecurity.
                                        Ask me anything!
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleStartAssessment}
                                        className="inline-block mt-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[var(--brand-blue)] text-white rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-all"
                                    >
                                        🔒 Take Free Assessment →
                                    </button>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {quickReplies.map((reply, i) => (
                                            <button
                                                key={i}
                                                onClick={() => sendMessageWithText(reply)}
                                                className="px-3 py-1.5 bg-gray-100 hover:bg-blue-600 hover:text-white border border-gray-200 rounded-full text-xs sm:text-sm transition-all"
                                            >
                                                {reply.split(" ").slice(0, 3).join(" ")}
                                                ...
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2 ${msg.isUser ? "flex-row-reverse" : ""}`}
                            >
                                {!msg.isUser && (
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[var(--brand-blue)] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-4 h-4 fill-white"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                        </svg>
                                    </div>
                                )}
                                <div
                                    className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl max-w-[85%] sm:max-w-[75%] whitespace-pre-line shadow-sm ${
                                        msg.isUser
                                            ? "bg-[var(--brand-blue)] text-white rounded-br-none"
                                            : "bg-white text-gray-800 rounded-tl-none"
                                    }`}
                                >
                                    {msg.text}
                                    {msg.hasLink && !msg.isUser && (
                                        <button
                                            type="button"
                                            onClick={handleStartAssessment}
                                            className="inline-block mt-2 px-3 py-1.5 bg-[var(--brand-blue)] text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all"
                                        >
                                            🔒 Take Free Assessment →
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* typing indicator removed - responses are instant */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-2 sm:p-3 border-t flex items-center gap-2 bg-white rounded-b-2xl">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                            placeholder="Ask me anything..."
                            className="flex-1 px-3 py-2 sm:px-4 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={false}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim()}
                            aria-label="Send message"
                            className="bg-[var(--brand-blue)] hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white p-2 sm:p-3 rounded-full transition-all"
                        >
                            <svg
                                className="w-5 h-5 fill-white"
                                viewBox="0 0 24 24"
                            >
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bot;
