import dotenv from 'dotenv';
import mysql2 from 'mysql2/promise';
import logger from './logger/logger.js';

dotenv.config();

const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

export { db };

export const dbRelease = async () => {
    try {
        db.releaseConnection();
    } catch (e) {
        logger.error(`Error Releasing connection: ${e}`)
    }
}