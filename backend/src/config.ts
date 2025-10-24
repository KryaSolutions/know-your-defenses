import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_BASE: process.env.DB_BASE,
    DB_PAT: process.env.DB_PAT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    RECEPIENT: process.env.RECEPIENT,
};

export default config;
