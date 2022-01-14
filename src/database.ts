import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_TEST_NAME, ENV } = process.env;
let client: Pool;
if (ENV === 'test') {
    client = new Pool({
        host: DB_HOST,
        database: DB_TEST_NAME,
        user: DB_USER,
        password: DB_PASS,
    });
} else {
    client = new Pool({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS,
    });
}
export default client;
