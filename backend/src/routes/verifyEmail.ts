import dns from "node:dns";
import * as pkg from "express";

export const router = pkg.Router();

function resolveMx(domain: string): Promise<dns.MxRecord[]> {
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err) return reject(err);
            resolve(addresses);
        });
    });
}

router.post(
    "/verifyEmail",
    async (req: pkg.Request<string>, res: pkg.Response) => {
        const { email } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ valid: false, message: "Enter a valid email address" });
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ valid: false, message: "Invalid email format" });
        }

        try {
            const domain = email.split("@")[1];
            if (domain === "kryasolutions.com") {
                return res
                    .status(200)
                    .json({ valid: true, message: "Email domain is Valid" });
            }

            const mxRecords = await resolveMx(domain);
            if (mxRecords.length === 0) {
                return res
                    .status(400)
                    .json({ valid: false, message: "Invalid email/domain" });
            }

            return res
                .status(200)
                .json({ valid: true, message: "Email domain is Valid" });
        } catch (err: any) {
            return res.status(400).json({
                valid: false,
                message: "Invalid email, please enter a valid credentials",
            });
        }
    }
);
