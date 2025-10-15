import type { assessmentType } from "./assessmentMeta";

const securityMaturity: assessmentType = {
    title: "Organization Security Assessment",

    desc: "Evaluate your organization's cybersecurity posture across six critical domains: Identity Management, Protection Controls, Detection Capabilities, Incident Response, Recovery Planning, and Compliance Framework.",

    questions: {
        "Identity Management": {
            icon: "🛡️",
            color: "#3b82f6",
            questions: [
                "Has your organization classified its critical IT assets based on confidentiality, integrity, availability, and operational needs?",
                "Is there a defined cybersecurity program in place, along with an operational Security Operations Center (SOC)?",
                "Is a SIEM solution being used to continuously detect, monitor, and investigate potential threats?",
            ],
        },
        "Protection Controls": {
            icon: "🔒",
            color: "#10b981",
            questions: [
                "To what extent has Role-Based Access Control (RBAC) been implemented across critical systems and applications?",
                "Is Multi-Factor Authentication (MFA) enforced for key business applications and systems?",
                "Are proper controls in place to classify and protect sensitive data across the organization?",
                "Are perimeter defenses such as Firewalls, VPNs, and Intrusion Prevention Systems (IPS) actively deployed and maintained?",
            ],
        },
        "Detection Capabilities": {
            icon: "🔍",
            color: "#f59e0b",
            questions: [
                "Is proactive monitoring in place to identify capacity constraints in compute, storage, or network resources before they affect services?",
                "Are controls established to detect anomalous or suspicious activity across systems and networks?",
            ],
        },
        "Incident Response": {
            icon: "⚡",
            color: "#ef4444",
            questions: [
                "Have preventive and containment controls been implemented to reduce the likelihood and impact of security breaches?",
                "Is there a documented and tested plan to detect, respond to, and recover from security incidents?",
            ],
        },
        "Recovery Planning": {
            icon: "🔄",
            color: "#8b5cf6",
            questions: [
                "Do critical systems have defined recovery objectives such as RTO, RPO, MTPD, MAO, and WRT?",
                "Is a Business Continuity and Disaster Recovery (BCP/DR) plan established and tested periodically?",
                "Has your organization defined a formal Emergency Response Team (ERT) to handle crisis situations?",
                "Are policies and procedures reviewed regularly through a structured and formal process?",
            ],
        },
        "Compliance Framework": {
            icon: "📋",
            color: "#06b6d4",
            questions: [
                "Has your organization adopted compliance frameworks such as ISO/IEC 27001, SOC 2, GDPR, HIPAA, PCI-DSS, NIST, or CSA STAR?",
            ],
        },
    },

    options: [
        {
            value: "not-implemented",
            label: "No/Not Implemented",
            score: 0,
            color: "#ef4444",
        },
        {
            value: "partially",
            label: "Yes/Partially Implemented",
            score: 50,
            color: "#f59e0b",
        },
        {
            value: "fully",
            label: "Fully Implemented",
            score: 80,
            color: "#10b981",
        },
        {
            value: "nextgen",
            label: "Implemented + NextGen & Automated",
            score: 100,
            color: "#3b82f6",
        },
    ],
};

export default securityMaturity;
