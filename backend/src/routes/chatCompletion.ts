import config from "../config.js";
import { Router } from "express";
import type { Request, Response } from "express";
import { Mistral } from "@mistralai/mistralai";
import knowledgeBase from "./knowledgeBase.js";
import initializeEmbeddings from "./createEmbeddings.js";

initializeEmbeddings();
export const router = Router();

async function getCompletion(message: string): Promise<string> {
    const mistral = new Mistral({
        apiKey: config.API_KEY,
    });
    const result = await mistral.chat.complete({
        model: "codestral-latest",
        messages: [
            {
                role: "system",
                content: `
Hey you are a professional receptionist for the website 'kyd.kryasolutions.com'. You are strictly to use the knowledge (${knowledgeBase}) for the answers, if it is not found in the knowledge, please reply promptly.
You definitely need the give just the **plain text**.
Stay factual, polished, and aligned with Krya Solutions' professional brand voice at all times.
                `,
            },
            {
                role: "user",
                content:
                    "Here is a question from a potential client who is trying out the chatbot from the website `kyd.kryasolutions.com`." +
                    JSON.stringify(message, null, 2) +
                    "\n Reply the question of the client in a very concise, professional manner",
            },
        ],
    });

    const summary = result?.choices[0]?.message["content"] || "Undefined";

    if (typeof summary === "string") {
        return summary.trim();
    }

    return "Undefined";
}

router.post(
    "/chatCompletion",
    async (req: Request<{}, string>, res: Response) => {
        try {
            const { message } = req.body;
            const completion = await getCompletion(message);

            if (!completion) {
                res.status(500).json({
                    success: false,
                });
            }

            res.status(200).json({
                completion: completion,
                success: true,
            });
        } catch {
            res.status(500).json({
                success: false,
            });
        }
    }
);
