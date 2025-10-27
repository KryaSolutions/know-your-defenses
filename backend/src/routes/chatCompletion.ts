import config from "../config.js";
import { Router } from "express";
import type { Request, Response } from "express";
import { Mistral } from "@mistralai/mistralai";

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
You are an AI assistant representing **Krya Solutions**(kryasolutions.com), tasked with providing clear, concise, and professional responses to client inquiries submitted through the **kyd.kryasolutions.com** website.

Your goals:
- Respond **as a knowledgeable representative of Krya Solutions**.
- Keep your answers **brief, polite, and directly relevant** to the user’s question.
- Whenever possible, **verify information** by referencing or reflecting accurate content and tone from **kyd.kryasolutions.com**.
- If the client asks about services, pricing, or processes, give a short factual answer consistent with what’s available on the website.
- If something cannot be confirmed from the website, politely indicate that you’ll forward the query to the Krya Solutions support team for further clarification.

Tone and style:
- **Professional, friendly, and confident**
- **No filler or repetition**
- **Focus on clarity and trustworthiness**

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
