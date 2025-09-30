import type { assessmentType } from "./assessmentMeta";

const socAssessment: assessmentType = {
    title: "SOC Assessment",

    desc: "Evaluate your organization's cybersecurity posture across six critical domains: SOC Effectiveness, Technology, Organizational Impact, People, and Strategy & ROI.",

    questions: {
        "SOC Effectiveness": {
            icon: "🛡️",
            color: "#3b82f6",
            questions: [
                "Do you have defined Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) for critical incidents?",
                "Do you actively measure and report on your security team's average time spent on manual alert triage/enrichment?",
                "Do you have fully documented incident response playbooks, routinely tested, with clear escalation paths for breaches?",
                "Is the SOC primarily reactive, or does it allocate dedicated, measurable time for proactive threat hunting activities?",
            ],
        },
        "Technology & Visibility": {
            icon: "🔒",
            color: "#10b981",
            questions: [
                "Do you have full security visibility across all critical domains (Endpoint, Cloud, Identity, Network), and details about the current blind spots?",
                "Is all critical telemetry (Cloud, EDR, Network) currently integrated into the existing SIEM solution?",
            ],
        },
        "Organizational Alignment": {
            icon: "🏢",
            color: "#f59e0b",
            questions: [
                "Is there a clear, single consensus within your security leadership on the primary operational problem you want to use AI to solve?",
                "Are the required regulatory frameworks (e.g., PCI-DSS, HIPAA, ISO 27001) being adhered to?",
                "Is the organization's current risk appetite aligned with granting an external, automated system (AI) autonomy for any containment actions?",
            ],
        },
        "People & Skills": {
            icon: "👥",
            color: "#ef4444",
            questions: [
                "Is the SOC currently operating with adequate 24/7/365 staffing coverage, and what is the team’s current analyst attrition/burnout rate?",
                "Is your internal team currently prepared (or budgeted for training) to shift their focus from triage to AI model management and validation?",
                "Does the team's training curriculum focus on basic alert monitoring or advanced, specialized skills like cloud forensics and model management?",
            ],
        },
        "Strategy & ROI": {
            icon: "📊",
            color: "#8b5cf6",
            questions: [
                "Do you have a specific, measurable problem list that the AI is intended to solve (e.g., reducing false positives by X%, decreasing MTTR by Y)?",
                "Have you calculated the Total Cost of Ownership (TCO) for the AI solution, including licensing, cloud compute costs, and internal tuning effort?",
                "Does your organization plan to replace your current SIEM/EDR platforms within the next 12 months?",
            ],
        },
    },

    options: [
        {
            value: "not-implemented",
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
            value: "fully",
            label: "Fully Implemented",
            score: 100,
            color: "#10b981",
        },
    ],
};

export default socAssessment;
