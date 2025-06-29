import dotenv from 'dotenv';

dotenv.config();

export const {
    APP_URL,
    DATABASE_URI,
    PORT,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env;
