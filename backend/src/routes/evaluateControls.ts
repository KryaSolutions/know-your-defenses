import config from "../config.js";
import { Router } from "express";
import type { Request, Response } from "express";
import Airtable from "airtable";
import { Mistral } from "@mistralai/mistralai";

export const router = Router();
const base = new Airtable({
    apiKey: config.DB_PAT!,
}).base(config.DB_BASE!);

type Control = {
    id: number;
    control: string;
    description: string;
    framework: string;
    status: string;
    priority: string;
    riskLevel: string;
    category: string;
    owner: string;
    dueDate: string;
};

async function getReports(response: Control, org: string): Promise<string> {
    const mistral = new Mistral({
        apiKey: config.API_KEY,
    });
    const result = await mistral.chat.complete({
        model: "codestral-latest",
        messages: [
            {
                role: "system",
                content: `
You are a skilled GRC Analyst and Compliance Engineer with expertise in security frameworks (SOC 2, ISO 27001, NIST, GDPR) and in communicating findings clearly to business stakeholders.
You receive a data blob or table containing results from a control assessment (including control names, framework mappings, implementation status, evidence quality, owners, and audit scores).
Your task is to analyze this data and deliver concise, actionable insights on what ${org} should do to improve its compliance posture and close identified gaps.
Focus on:  
- Clear, actionable insights (no fluff).  
- Measurable or directional improvements.
${response}
---
                `,
            },
            {
                role: "user",
                content:
                    "Here is the Response object collected from a Valuable client who has issues with GRC(Governance, Risk, Compliance" +
                    JSON.stringify(response, null, 2) +
                    "\n Provide a concise professional insights/summary/findings from the above data",
            },
        ],
    });

    const summary = result?.choices[0]?.message["content"] || "Undefined";

    if (typeof summary === "string") {
        return summary.trim();
    }

    return "Undefined";
}

type EvaluateControl = {
    name: string;
    org: string;
    email: string;
    response: Control;
};

router.post(
    "/evaluateControls",
    async (req: Request<{}, EvaluateControl>, res: Response) => {
        try {
            let controls: string;
            const { name, org, email, response } = req.body;
            if (!response || Object.keys(response).length === 0) {
                controls = "Client did not add any Controls";
            } else {
                controls = (await getReports(response, org)) || "Undefined";
                controls = controls.replace(/[*#]/g, "");
            }

            await base(config.DB_NAME!).create([
                {
                    fields: {
                        Name: name,
                        Organization: org,
                        Email: email,
                        Controls: controls,
                    },
                },
            ]);

            res.json({ success: true });
        } catch {
            res.status(500).json({
                success: false,
            });
        }
    }
);
