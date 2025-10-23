import config from "../config.js";
import * as pkg from "express";
import Airtable from "airtable";

export const router = pkg.Router();
const base = new Airtable({
    apiKey: config.THOUGHTS_PAT!,
}).base(config.THOUGHTS_BASE!);

type FormData = {
    name: string;
    email: string;
    thoughts: string;
};

router.post(
    "/appendThoughts",
    async (req: pkg.Request<{}, FormData>, res: pkg.Response) => {
        try {
            const { name, email, thoughts } = req.body;

            await base(config.THOUGHTS_NAME!).create([
                {
                    fields: {
                        Name: name,
                        Email: email,
                        Thoughts: thoughts,
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
