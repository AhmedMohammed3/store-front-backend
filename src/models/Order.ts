import { QueryResult } from 'pg';
import client from '../database';

export type Order = {
    id?: number;
    userId: number;
    orderStatus?: string;
};

export class OrderStore {
    async createOrder(userId: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *';
            const result: QueryResult<Order> = await conn.query(sql, [
                userId,
                'active',
            ]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not create order: ${err}`);
        }
    }
    async markAsCompleted(orderId: number): Promise<void> {
        try {
            const conn = await client.connect();
            const sql =
                'UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *';
            await conn.query(sql, ['completed', orderId]);
        } catch (err) {
            throw new Error(`Can not mark order as completed: ${err}`);
        }
    }
}
