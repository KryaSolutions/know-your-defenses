import fs from "fs";
import path from "path";
import https from "https";
import cors from "cors";
import express from "express";
import type { Request, Response } from "express";
import config from "./config.js";
import { fileURLToPath } from "url";

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
        status: `API running healthy at port ${config.PORT}`,
    });
});

import { router as routeVerifyEmail } from "./routes/verifyEmail.js";
import { router as routerSendEmail } from "./routes/sendEmail.js";
import { router as routeAppendCustomers } from "./routes/appendCustomer.js";
import { router as routeChatCompletion } from "./routes/chatCompletion.js";

app.use("/api", routeVerifyEmail);
app.use("/api", routerSendEmail);
app.use("/api", routeAppendCustomers);
app.use("/api", routeChatCompletion);

let isHttps = false;

try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const certDir = path.resolve(__dirname, "..");

    const options = {
        key: fs.readFileSync(path.join(certDir, "./server.key")),
        cert: fs.readFileSync(path.join(certDir, "./server.crt")),
    };

    https.createServer(options, app).listen(config.PORT, () => {
        console.log(`API is UP with HTTPS at the port ${config.PORT}`);
    });

    isHttps = true;
} catch (err: any) {
    console.log("Certificates/Keys not found falling back to HTTP");
}

if (!isHttps) {
    app.listen(config.PORT, () => {
        console.log(`API is UP with HTTP at the port ${config.PORT}`);
    });
}
