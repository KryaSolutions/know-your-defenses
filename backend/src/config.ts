import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_BASE: process.env.DB_BASE,
    DB_PAT: process.env.DB_PAT,
    THOUGHTS_NAME: process.env.THOUGHTS_NAME,
    THOUGHTS_BASE: process.env.THOUGHTS_BASE,
    THOUGHTS_PAT: process.env.THOUGHTS_PAT,
};

export default config;
