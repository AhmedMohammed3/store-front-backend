import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import client from '../database';

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    pass: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result: QueryResult<User> = await conn.query(sql);
            return result.rows;
        } catch (err) {
            throw new Error(`Can not get users: ${err}`);
        }
    }
    async showUser(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const result: QueryResult<User> = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not get user: ${err}`);
        }
    }
    async createUser(user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO users (first_name, last_name, pass) VALUES ($1, $2, $3) RETURNING *';
            const result: QueryResult<User> = await conn.query(sql, [
                user.firstName,
                user.lastName,
                bcrypt.hashSync(user.pass, 10),
            ]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not create user: ${err}`);
        }
    }
}
