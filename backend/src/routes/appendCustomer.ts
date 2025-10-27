import config from "../config.js";
import { Router } from "express";
import type { Request, Response } from "express";
import Airtable from "airtable";
import { Mistral } from "@mistralai/mistralai";

export const router = Router();
const base = new Airtable({
    apiKey: config.DB_PAT!,
}).base(config.DB_BASE!);

type responseType = {
    [title: string]: {
        [category: string]: {
            [questionIndex: number]: {
                question: string;
                answer: string;
                score: number;
            };
            categoryScore: number;
        };
    };
};

async function getReports(
    response: responseType,
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
You are an experienced SOC Analyst, Cybersecurity Engineer, and Solutions Architect for the **Part 1**, and you are a experienced sales/marketing executive who manages customer relations for the **Part 2**.
You have received assessment responses from a client who might have participated cybersecurity-related assessments.
Your goal is to create a **two-part professional summary** based only on the provided response object.  
Below is the type of the response object.
type responseType = {
    [title: string]: {
        [category: string]: {
            [questionIndex: number]: {
                question: string;
                answer: string;
                score: number;
            };
            categoryScore: number;
        };
    };
};
---
### **Part 1 — ${org}'s Posture Overview**
Remember you are a experienced SOC Analyst/solutions architect for this part.
Provide a concise, professional summary outlining the client’s cybersecurity posture **based strictly on the response object**.  
Include:
- Key scores across each assessment domain, category, and question.  
- A brief reflection of what the client answered (only key highlights, no unnecessary details).  
- Present a factual snapshot of the client’s current security standing and performance in each domain.  
Keep it compact, crisp, and readable for **sales and marketing teams** to understand at a glance.  
---
### **Part 2 — Insights & Summary**
You are an experienced Sales and Marketing Executive specializing in cybersecurity solutions.  
Your task is to craft a **professional and persuasive insight summary email** tailored to the organization ${org}.  
Your response should take the form of an **email body** (not a report) and should achieve the following:
**Executive Insight Summary**, **Highlight Strengths**, **Identify Weaknesses**, **Strategic Inisghts**
   - Keep it concise (no more than 3–4 short paragraphs), sound confident and use active voice instead of passive.
   - End with a professional closing that invites continued dialogue (e.g., suggesting a meeting or briefing session).
The Email should start with **I see that you have attended Know Your Defenses, crafted b Krya Solution** and continue there.
Generate the full **email body** that achieves all of the above goals for ${org}.
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

type appendCustomerBody = {
    name: string;
    org: string;
    email: string;
    response: responseType;
};

router.post(
    "/appendCustomer",
    async (req: Request<{}, appendCustomerBody>, res: Response) => {
        try {
            let summary;
            const { name, org, email, response } = req.body;
            if (!response || Object.keys(response).length === 0) {
                summary = "Client did not attend the tests";
            } else {
                summary = (await getReports(response, org)) || "Undefined";
            }

            await base(config.DB_NAME!).create([
                {
                    fields: {
                        Name: name,
                        Organization: org,
                        Email: email,
                        Summary: summary,
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
