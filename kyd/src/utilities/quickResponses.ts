interface KnowledgeBaseResponse {
    answer: string;
    hasLink?: boolean;
}

export const knowledgeBase: Record<string, KnowledgeBaseResponse> = {
    services: {
        answer: `Krya Solutions provides comprehensive cybersecurity services including:

Core services:
• Security Risk Assessment & Penetration Testing
• AI-Powered Threat Detection & Response
• 24/7 Security Operations Center (SOC)
• Vulnerability & Patch Management
• Cloud Security (AWS, Azure, GCP)
• Incident Response & Forensics

We use AI/ML-driven security tools, SIEM, EDR/XDR, and Zero Trust Architecture.`,
    },
    assessment: {
        answer: `Our Know Your Defense (KYD) assessment is a comprehensive security evaluation:

What you get:
• Complete security posture analysis
• Critical vulnerability identification
• Risk prioritization with scoring
• Compliance gap analysis (ISO, GDPR)
• Actionable remediation roadmap

Takes 20-30 minutes | Free initial assessment`,
        hasLink: true,
    },
    threat: {
        answer: `Krya's AI-powered threat detection provides:

Advanced capabilities:
• Real-time threat intelligence
• Machine learning anomaly detection
• Automated incident response
• 24/7 SOC monitoring
• SIEM integration

We identify threats before they cause damage.`,
    },
    contact: {
        answer: `Get in touch with Krya Solutions:

Email: contact@kryasolutions.com
Website: https://kryasolutions.com
Headquarters: Chennai, India

We serve clients across Asia Pacific, USA, Middle East, and Africa.`,
    },
    greeting: {
        answer: `Hello. Welcome to Krya Solutions.

I'm your AI assistant for cybersecurity questions. With 12+ years of experience and 750+ global customers, we specialize in:

AI-driven cybersecurity
Security assessments
Cloud security (AWS, Azure, GCP)
24/7 threat monitoring

How can I help secure your organization today?`,
    },
    default: {
        answer: `Thanks for your question! I can help with:

• Cybersecurity services and capabilities
• Security assessment (Know Your Defense)
• Threat detection and monitoring
• Cloud security solutions
• Compliance and certifications

What would you like to know more about?`,
    },
};

export const fetchKnowledgeBase = (
    message: string
): KnowledgeBaseResponse | null => {
    const lower = message.toLowerCase();

    if (
        lower.includes("cyber") &&
        (lower.includes("service") || lower.includes("provide"))
    ) {
        return knowledgeBase.services;
    }

    if (lower.includes("assessment") || lower.includes("kyd")) {
        return knowledgeBase.assessment;
    }

    if (lower.includes("threat") || lower.includes("detect")) {
        return knowledgeBase.threat;
    }

    if (lower.includes("contact") || lower.includes("email")) {
        return knowledgeBase.contact;
    }

    if (lower.includes("hello") || lower.includes("hi")) {
        return knowledgeBase.greeting;
    }

    return null;
};

export const quickReplies = [
    "What cybersecurity services does Krya provide?",
    "Tell me about the KYD assessment",
    "How does AI threat detection work?",
    "How can I contact Krya?",
];
