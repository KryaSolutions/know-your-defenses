import type { assessmentType } from "./assessmentMeta";

const zeroTrustAssessment: assessmentType = {
    title: "Zero Trust Assessment",

    desc: "Assess your organization's security using the Zero Trust approach across six key domains. This assessment helps identify gaps in identity management, network security, application controls, data protection, device compliance, and incident response, providing actionable insights to strengthen your cybersecurity posture.",

    questions: {
        "Identity Management": {
            icon: "👤",
            color: "#3b82f6",
            questions: [
                "Is MFA enforced for all users?",
                "Is privileged access managed using a PAM solution?",
                "Is adaptive authentication (risk-based) enabled?",
            ],
        },
        "Network Security": {
            icon: "🌐",
            color: "#10b981",
            questions: [
                "Is network micro-segmentation implemented?",
                "Is east-west traffic monitored for anomalies?",
                "Is TLS 1.2+ enforced for all communications?",
            ],
        },
        "Application Security": {
            icon: "💻",
            color: "#f59e0b",
            questions: [
                "Are applications using least privilege access?",
                "Are applications tested using SAST/DAST tools?",
                "Are unauthorized SaaS applications discovered and monitored?",
            ],
        },
        "Data Protection": {
            icon: "📊",
            color: "#ef4444",
            questions: [
                "Is data classified (Public, Internal, Confidential, Restricted)?",
                "Are data access logs monitored and retained?",
                "Is sensitive data encrypted at rest and in transit?",
            ],
        },
        "Device Compliance": {
            icon: "📱",
            color: "#8b5cf6",
            questions: [
                "Are devices verified for compliance before access?",
                "Are mobile devices enrolled in MDM/EMM solutions?",
                "Is device health checked before granting access?",
            ],
        },
        "Incident Response": {
            icon: "⚡",
            color: "#ef4444",
            questions: [
                "Do you have a documented incident response plan?",
                "Are incidents detected and responded to within defined SLA times?",
                "Are post-incident reviews conducted to prevent recurrence?",
            ],
        },
    },

    options: [
        { value: "no", label: "No", score: 0, color: "#ef4444" },
        { value: "partial", label: "Partial", score: 50, color: "#f59e0b" },
        { value: "yes", label: "Yes", score: 100, color: "#10b981" },
    ],
};

export default zeroTrustAssessment;
