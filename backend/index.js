/* Google Sheets deployment
 *
 * function doPost(e) {
 *   const sheetUrl = SpreadsheetApp.openByUrl({{sheetURL}});
 *
 *   const sheet = sheetUrl.getSheetByName({{sheetName}});
 *
 *   const data = e.parameter;
 *   sheet.appendRow([data.Name, data.Organization, data.Email]);
 *
 *   return ContentService.createTextOutput("Yay !")
 * }
 */

import qs from "qs";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import { Mistral } from "@mistralai/mistralai";

dotenv.config();
const app = express();

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

const PORT = process.env.PORT || 10101;
const mistral = new Mistral({
    apiKey: process.env.API_KEY,
});

app.use(cors(corsOptions));
app.use(express.json());

async function getReports(response) {
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

        const now = new Date();
        const timestamp = now.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        const postData = qs.stringify({
            Name: name,
            Organization: org,
            Email: email,
            Summary: summary,
            Timestamp: timestamp,
        });

        const result = await axios.post(process.env.SHEET_URL, postData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

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

app.get("/health", (req, res) => {
    res.json({ status: "healthy", port: PORT });
});

app.listen(PORT, () => {
    console.log("API is up and running");
});
