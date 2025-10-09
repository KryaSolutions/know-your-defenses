import cors from "cors";
import express from "express";
import config from "./config.js";

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.listen(config.PORT, () => {
    console.log(`API is UP at the port ${config.PORT}`);
});

app.get("/api/health", (req, res) => {
    res.json({
        status: `API running healthy at port ${config.PORT}`,
        req: req,
    });
});

import { router as routeAppendCustomers } from "./routes/appendCustomer.js";
import { router as routeVerifyEmail } from "./routes/verifyEmail.js";

app.use("/api", routeVerifyEmail);
app.use("/api", routeAppendCustomers);
