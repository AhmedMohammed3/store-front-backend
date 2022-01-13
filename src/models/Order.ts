import { QueryResult } from 'pg';
import client from '../database';

export type Order = {
    id?: number;
    userId: number;
    orderStatus: string;
};

export class OrderStore {
    // get active order by user id
    async getCurrentOrder(userId: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql =
                'SELECT * FROM orders WHERE user_id = $1 AND order_status = $2';
            const result: QueryResult<Order> = await conn.query(sql, [
                userId,
                'active',
            ]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not get active order: ${err}`);
        }
    }
    // get completed order by user id
    async getCompletedOrder(userId: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql =
                'SELECT * FROM orders WHERE user_id = $1 AND order_status = $2';
            const result: QueryResult<Order> = await conn.query(sql, [
                userId,
                'complete',
            ]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not get completed order: ${err}`);
        }
    }
}
