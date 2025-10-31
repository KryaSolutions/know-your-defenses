import config from "../config.js";
import { Router } from "express";
import type { Request, Response } from "express";
import Airtable from "airtable";
import { Mistral } from "@mistralai/mistralai";

export const router = Router();
const base = new Airtable({
    apiKey: config.DB_PAT!,
}).base(config.DB_BASE!);

type CalcMetricsType = {
    [calc: string]: {
        [metric: string]: number | string;
    };
};

async function getReports(
    response: CalcMetricsType,
    org: string
): Promise<string> {
    const mistral = new Mistral({
        apiKey: config.API_KEY,
    });
    const result = await mistral.chat.complete({
        model: "codestral-latest",
        messages: [
            {
                role: "system",
                content: `
You are a skilled SOC Analyst and Cybersecurity Engineer who also understands how to communicate insights clearly as a sales/marketing executive.  
You receive a data blob of calculator results showing cybersecurity performance metrics from tools like SOC, IDAM, and EDR efficiency calculators.  
Your task:  
Analyze the blob and summarize concise, precise insights on what ${org} should do to improve its cybersecurity posture. Provide concise, professional insights.
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
                    "Here is the Response object collected from a Valuable client who attended the assessments" +
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

type EvaluateCalc = {
    name: string;
    org: string;
    email: string;
    response: CalcMetricsType;
};

router.post(
    "/evaluateCalc",
    async (req: Request<{}, EvaluateCalc>, res: Response) => {
        try {
            let insights: string;
            const { name, org, email, response } = req.body;
            if (!response || Object.keys(response).length === 0) {
                insights = "Client did not fiddle the calcs";
            } else {
                insights = (await getReports(response, org)) || "Undefined";
                insights = insights.replace(/[*#]/g, "");
            }

            await base(config.DB_NAME!).create([
                {
                    fields: {
                        Name: name,
                        Organization: org,
                        Email: email,
                        Insights: insights,
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
