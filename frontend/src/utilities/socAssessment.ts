import type { assessmentType } from "./assessmentMeta";

const socAssessment: assessmentType = {
    title: "SOC Assessment",

    desc: "Evaluate your organization's cybersecurity posture across five critical domains: SOC Effectiveness, Technology & Visibility, Organizational Alignment, People & Skills, and Strategy & ROI.",

    questions: {
        "SOC Effectiveness": {
            icon: "🛡️",
            color: "#3b82f6",
            questions: [
                "Has your organization defined clear metrics such as Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) for critical incidents?",
                "Do you actively track and report the average time analysts spend on manual alert triage and enrichment?",
                "Are incident response playbooks fully documented, regularly tested, and designed with defined escalation paths?",
                "Does the SOC dedicate measurable time to proactive threat hunting, or is it primarily reactive in nature?",
            ],
        },
        "Technology & Visibility": {
            icon: "🔒",
            color: "#10b981",
            questions: [
                "Do you have comprehensive visibility across key domains such as endpoints, cloud environments, identities, and network infrastructure?",
                "Is telemetry from critical sources (e.g., cloud logs, EDR, network monitoring) integrated into your SIEM or centralized detection platform?",
                "Are there identified blind spots or areas lacking sufficient visibility that impact incident detection or investigation?",
            ],
        },
        "Organizational Alignment": {
            icon: "🏢",
            color: "#f59e0b",
            questions: [
                "Is there alignment among security leadership on the primary operational challenges the SOC aims to address or automate?",
                "Are applicable regulatory and compliance frameworks (e.g., PCI-DSS, HIPAA, ISO 27001) consistently followed and validated?",
                "Is the organization’s risk appetite clearly defined and aligned with delegating containment or response actions to automated or AI-driven systems?",
            ],
        },
        "People & Skills": {
            icon: "👥",
            color: "#ef4444",
            questions: [
                "Is the SOC staffed adequately to maintain 24/7/365 operations, and is analyst attrition or burnout being monitored and managed?",
                "Are training and development programs in place to help analysts shift from manual triage toward AI model oversight and validation?",
                "Does the team’s skill development focus on foundational alert management or advanced capabilities such as cloud forensics and model governance?",
            ],
        },
        "Strategy & ROI": {
            icon: "📊",
            color: "#8b5cf6",
            questions: [
                "Has the SOC defined measurable objectives for AI or automation initiatives (e.g., reducing false positives by X% or decreasing MTTR by Y%)?",
                "Has a Total Cost of Ownership (TCO) analysis been conducted for the SOC’s AI or automation investments, including licensing, compute, and optimization costs?",
                "Is there a defined roadmap or plan to replace or modernize existing SIEM, EDR, or related detection platforms within the next 12 months?",
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
