import config from "../config.js";
import { Router } from "express";
import type { Request, Response } from "express";
import nodemailer from "nodemailer";

export const router = Router();

type FormData = {
    name: string;
    email: string;
    thought: string;
};

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
    },
});

router.post("/sendEmail", async (req: Request<{}, FormData>, res: Response) => {
    const { name, email, mobile, thought } = req.body;
    const to = config.RECEPIENT;
    const subject = `Thoughts for KYD by ${name}, Mobile: ${mobile}`;
    const text = thought;
    const html = `<p>${thought}</p>`;

    try {
        const info = await transporter.sendMail({
            from: `"${name} <${email}>`,
            to,
            subject,
            text,
            html,
        });

        res.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error("Error sending email:", error);
    }
});

export default router;
