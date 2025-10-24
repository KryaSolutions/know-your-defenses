import config from "../config.js";
import * as pkg from "express";
import nodemailer from "nodemailer";

export const router = pkg.Router();

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

router.post(
    "/sendEmail",
    async (req: pkg.Request<{}, FormData>, res: pkg.Response) => {
        const { name, email, thought } = req.body;
        const to = config.RECEPIENT;
        const subject = `Thoughts for KYD by ${name}`;
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

            console.log("Email sent:", info.messageId);
            res.json({ success: true, messageId: info.messageId });
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
);

export default router;
