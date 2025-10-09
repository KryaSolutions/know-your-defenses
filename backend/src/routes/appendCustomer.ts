import config from "../config.js";
import * as pkg from "express";
import Airtable from "airtable";
import { Mistral } from "@mistralai/mistralai";

export const router = pkg.Router();
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

async function getReports(response: responseType): Promise<string> {
    const mistral = new Mistral({
        apiKey: process.env.API_KEY,
    });
    const result = await mistral.chat.complete({
        model: "codestral-latest",
        messages: [
            {
                role: "system",
                content: `
                    You are an experienced SOC Analyst, Cybersecurity Engineer, and Solutions Architect.
                    You have received assessment response from a client who participated in cybersecurity-related assessments such as **Security Maturity Assessments, Zero Trust Readiness, Cloud Security Posture, Identity & Access Management evaluations, and Compliance/Governance reviews**.
                    Keep it relevant, and keep the summary very concise, precise and as short as possible.
                    Use the content only from the response object.

                    # Response Object
                    export type responseType = {
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

                    Make your response concise yet detailed enough so that the sales, marketing teams get a grasp of what the situation is like.
                    It should explain the things with the score they got keep it small and concise yet crisp.

                    After providing that give me a summary of insights from the explaination that you gave for the client. Keep this professional and concise.
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
    async (req: pkg.Request<{}, appendCustomerBody>, res: pkg.Response) => {
        try {
            let summary;
            const { name, org, email, response } = req.body;
            if (!response || Object.keys(response).length === 0) {
                summary = "Client did not attend the tests";
            } else {
                summary = (await getReports(response)) || "Undefined";
            }

            base(config.DB_NAME!).create([
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
