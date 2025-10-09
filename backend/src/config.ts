import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_BASE: process.env.DB_BASE,
    DB_PAT: process.env.DB_PAT,
};

export default config;
