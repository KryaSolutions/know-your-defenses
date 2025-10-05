import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { Mistral } from "@mistralai/mistralai";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 10101;
const mistral = new Mistral({
    apiKey: process.env.API_KEY,
});

async function getReports(response) {
    const result = await mistral.chat.complete({
        model: "codestral-latest",
        messages: [
            {
                role: "system",
                content: `
                    You are an experienced SOC Analyst, Cybersecurity Engineer, and Solutions Architect.  
                    You have received assessment responses from multiple clients who participated in cybersecurity-related assessments such as **Security Maturity Assessments, Zero Trust Readiness, Cloud Security Posture, Identity & Access Management evaluations, and Compliance/Governance reviews**.  

                    Your task is to:  
                    1. **Analyze Findings:**  
                       - Summarize the most common security strengths and best practices observed across clients.  
                       - Identify critical vulnerabilities, gaps, or weak areas in their cybersecurity posture.  

                    2. **Highlight Shortcomings:**  
                       - Point out recurring deficiencies in strategy, tools, processes, or people.  
                       - Distinguish between technical gaps (e.g., misconfigurations, lack of monitoring, outdated controls) and organizational gaps (e.g., lack of governance, policies, or user awareness).  

                    3. **Provide Insights:**  
                       - Draw patterns and correlations across the different assessments (e.g., maturity vs. zero trust readiness, cloud adoption vs. identity security gaps).  
                       - Offer key lessons learned from the assessments that can help guide clients toward stronger cyber resilience.  
                       - Suggest areas where organizations can prioritize investments or improvements.  

                    4. **Deliver Structured Output:**  
                       - Present findings in a professional report style with clear sections: **Findings, Shortcomings, Insights, and Recommendations.**  
                       - Where possible, align insights with security frameworks (e.g., NIST CSF, CIS Controls, Zero Trust principles).  

                    Make your response concise yet detailed enough to be actionable for executives and technical teams alike.
                `,
            },
            {
                role: "user",
                content:
                    "Here is the Response object collected from a Valuable client who attended the assessments" +
                    JSON.stringify(response, null, 2) +
                    "\n Provide a concise professional insights/summary/findings from the above data",
            },
        ],
    });

    return result.choices[0].message["content"];
}

app.post("/api/appendCustomer", async (req, res) => {
    try {
        const { name, org, email, response } = req.body;
        const summary = (await getReports(response)) || "Undefined";

        const result = await axios.post(
            "https://api.baserow.io/api/database/rows/table/690134/?user_field_names=true",
            {
                Name: name,
                Organization: org,
                Email: email,
                "Stat Summary": summary,
            },
            {
                headers: {
                    Authorization: `Token ${process.env.DATABASE_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ success: true, summary, baserow: result.data });
    } catch (err) {
        console.error(
            "Error in /appendCustomer:",
            err.response?.data || err.message
        );
        res.status(500).json({
            success: false,
            error: err.response?.data || err.message,
        });
    }
});

app.listen(PORT, () => {});
