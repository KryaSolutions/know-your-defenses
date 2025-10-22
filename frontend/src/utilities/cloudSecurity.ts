import type { assessmentType } from "./assessmentMeta";

const cloudSecurity: assessmentType = {
    title: "Cloud Security Assessment",

    desc: "Evaluate the effectiveness of your cloud security controls across identity management, network security, data protection, compliance, incident response, and monitoring.",

    questions: {
        "Identity & Access Management": {
            icon: "🔐",
            color: "#3b82f6",
            questions: [
                "Is multi-factor authentication (MFA) enforced for all privileged and administrative accounts?",
                "Are IAM roles and access policies reviewed and updated on a regular (e.g., quarterly) basis?",
                "Are least-privilege principles consistently applied across all users, roles, and services?",
                "Are service accounts, access keys, and API credentials rotated and audited routinely?",
            ],
        },
        "Network Security": {
            icon: "🌐",
            color: "#10b981",
            questions: [
                "Are security groups and network ACLs configured to allow access only to required ports and protocols?",
                "Is traffic between cloud resources encrypted in transit using secure protocols (e.g., TLS)?",
                "Are backend resources such as databases and internal services hosted within private subnets?",
            ],
        },
        "Data Protection": {
            icon: "📊",
            color: "#ef4444",
            questions: [
                "Is sensitive or regulated data encrypted both at rest and in transit?",
                "Are backup processes scheduled, validated, and regularly tested for data recovery effectiveness?",
                "Are data loss prevention (DLP) mechanisms implemented to monitor and protect sensitive information?",
            ],
        },
        "Compliance & Governance": {
            icon: "📜",
            color: "#f59e0b",
            questions: [
                "Are all cloud resources properly tagged to indicate ownership, environment, and compliance category?",
                "Are regular compliance assessments conducted against standards such as ISO 27001, GDPR, HIPAA, or SOC 2?",
                "Are automated or third-party tools used to continuously monitor compliance across cloud environments?",
            ],
        },
        "Incident Response": {
            icon: "⚡",
            color: "#8b5cf6",
            questions: [
                "Is there a documented and approved incident response plan specifically for cloud environments?",
                "Are incident response drills or tabletop exercises performed at least annually to validate readiness?",
                "Are forensic artifacts, logs, and evidence preserved to support post-incident investigations?",
            ],
        },
        "Logging & Monitoring": {
            icon: "📈",
            color: "#22c55e",
            questions: [
                "Are cloud activity logs (e.g., AWS CloudTrail, Azure Activity Log, GCP Audit Logs) enabled and retained for a defined period (e.g., 90 days or more)?",
                "Are alerts and notifications configured for security-related events such as unauthorized access or abnormal network activity?",
                "Are log files and monitoring data protected from unauthorized access or modification?",
            ],
        },
    },

    options: [
        { value: "no", label: "No", score: 0, color: "#ef4444" },
        { value: "partial", label: "Partial", score: 50, color: "#f59e0b" },
        { value: "yes", label: "Yes", score: 100, color: "#10b981" },
        {
            value: "not_implemented",
            label: "Not Implemented",
            score: 0,
            color: "#9ca3af",
        },
    ],

    color: "blue",
};

export default cloudSecurity;
