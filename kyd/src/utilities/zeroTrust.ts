import type { assessmentType } from "./assessmentMeta";

const zeroTrustAssessment: assessmentType = {
    title: "Zero Trust Assessment",

    desc: "Assess and identify gaps across identity management, network security, application controls, data protection, device compliance, and incident response to evaluate your organization’s Zero Trust maturity.",

    questions: {
        "Identity Management": {
            icon: "👤",
            color: "#3b82f6",
            questions: [
                "Is multi-factor authentication (MFA) enforced for all user accounts, including privileged and remote access?",
                "Is privileged access managed and monitored through a Privileged Access Management (PAM) solution?",
                "Is adaptive, risk-based authentication implemented to evaluate user and device trust levels dynamically?",
            ],
        },
        "Network Security": {
            icon: "🌐",
            color: "#10b981",
            questions: [
                "Has network micro-segmentation been implemented to isolate workloads and limit lateral movement?",
                "Is internal (east-west) network traffic continuously monitored and analyzed for anomalies or suspicious behavior?",
                "Is encryption enforced for all communications using TLS 1.2 or higher?",
            ],
        },
        "Application Security": {
            icon: "💻",
            color: "#f59e0b",
            questions: [
                "Do applications enforce least-privilege access based on user roles and context?",
                "Are applications regularly tested using automated tools such as Static and Dynamic Application Security Testing (SAST/DAST)?",
                "Are unauthorized or shadow SaaS applications discovered, monitored, and governed appropriately?",
            ],
        },
        "Data Protection": {
            icon: "📊",
            color: "#ef4444",
            questions: [
                "Is organizational data classified according to sensitivity levels such as Public, Internal, Confidential, or Restricted?",
                "Are data access logs continuously monitored, retained, and reviewed for abnormal activity?",
                "Is sensitive or regulated data encrypted both at rest and in transit?",
            ],
        },
        "Device Compliance": {
            icon: "📱",
            color: "#8b5cf6",
            questions: [
                "Are devices verified for compliance and security posture before being granted access to organizational resources?",
                "Are mobile devices enrolled and managed through MDM or EMM solutions to enforce security policies?",
                "Is device health or integrity assessed in real-time before granting access to applications or data?",
            ],
        },
        "Incident Response": {
            icon: "⚡",
            color: "#ef4444",
            questions: [
                "Is there a documented and tested incident response plan specific to Zero Trust environments?",
                "Are cloud or on-premise security incidents detected and responded to within predefined SLA timelines?",
                "Are post-incident reviews and lessons learned sessions conducted to prevent recurrence and improve future response?",
            ],
        },
    },

    options: [
        {
            value: "no",
            label: "No / Not Implemented",
            score: 0,
            color: "#ef4444",
        },
        {
            value: "partial",
            label: "Partially Implemented",
            score: 50,
            color: "#f59e0b",
        },
        {
            value: "yes",
            label: "Fully Implemented",
            score: 100,
            color: "#10b981",
        },
    ],

    color: "green",
};

export default zeroTrustAssessment;
