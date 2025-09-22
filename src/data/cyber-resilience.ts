type assessmentTypes = {
    [category: string]: {
        icon: string;
        color: string;
        questions: string[];
    };
};

export const assessmentData: assessmentTypes = {
    Identity: {
        icon: "🛡️",
        color: "#3b82f6",
        questions: [
            "Have you classified your organization's critical IT assets based on confidentiality, integrity, availability, and operational requirements?",
            "Does your organization have a defined cybersecurity program and a functioning Security Operations Center (SOC)?",
            "Has your organization using a SIEM to continuously detect, monitor, and investigate?",
        ],
    },
    Protect: {
        icon: "🔒",
        color: "#10b981",
        questions: [
            "To what extent has your organization implemented Role-Based Access Control (RBAC)?",
            "Is Multi-Factor Authentication (MFA) in place for critical business applications within your organization?",
            "Does your organization currently have controls in place to ensure sensitive data is properly classified and protected?",
            "Does your organization currently use perimeter defenses like Firewalls, VPNs, and IPS to safeguard its network?",
        ],
    },
    Detect: {
        icon: "🔍",
        color: "#f59e0b",
        questions: [
            "Can you confirm that proactive monitoring is implemented to detect capacity constraints in compute, storage, and network resources before they impact services?",
            "Has your organization implemented controls to detect anomalous activity across systems and networks?",
        ],
    },
    Respond: {
        icon: "⚡",
        color: "#ef4444",
        questions: [
            "Do you have security controls set up to help prevent breaches and stop incidents if they occur?",
            "Do you have a documented plan exists to detect, respond to, and recover from security incidents?",
        ],
    },
    Recover: {
        icon: "🔄",
        color: "#8b5cf6",
        questions: [
            "Do your critical systems have defined RTO, RPO, MTPD, MAO, and WRT?",
            "Do you have a BCP/DR plan in place to restore systems if there's a disruption?",
            "Does your organization have a formally defined Emergency Response Team (ERT)?",
            "Has your organization defined a formal mechanism for the periodic review of policies and procedures?",
        ],
    },
    Compliance: {
        icon: "📋",
        color: "#06b6d4",
        questions: [
            "Any compliance frameworks have been implemented within your organization, such as ISO/IEC 27001, SOC 2, GDPR, HIPAA, PCI-DSS, NIST, or CSA STAR?",
        ],
    },
};

type option = {
    value: string;
    label: string;
    score: number;
    color: string;
};

export const options: option[] = [
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
    { value: "fully", label: "Fully Implemented", score: 80, color: "#10b981" },
    {
        value: "nextgen",
        label: "Implemented + NextGen & Automated",
        score: 100,
        color: "#3b82f6",
    },
];
