import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const client: Pool = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
});

export default client;
