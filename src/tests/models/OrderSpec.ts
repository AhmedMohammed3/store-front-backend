import { Order, OrderStore } from '../../models/Order';
import client from '../../database';

describe('OrderStore', () => {
    // test order
    describe('OrderStore', () => {
        // test createOrder method
        it('should return a new order', async () => {
            const result = await client.query(
                `INSERT INTO users (firstname,lastname,password) VALUES ('fname','lname','pswd') RETURNING id`,
            );
            const store = new OrderStore();
            const order: Order = await store.createOrder(result.rows[0].id);
            expect(order).toBeInstanceOf(Object);
            await client.query(`DELETE FROM orders`);
            await client.query(`DELETE FROM users`);
        });
        // test markAsCompleted method
        it('should mark order as completed', async () => {
            const result = await client.query(
                `INSERT INTO users (firstname,lastname,password) VALUES ('fname','lname','pswd') RETURNING id`,
            );
            const store = new OrderStore();
            const order: Order = await store.createOrder(result.rows[0].id);
            await store.markAsCompleted(Number(order.id));
            const orderResult = await client.query(
                `SELECT * FROM orders WHERE id = ${order.id}`,
            );
            expect(orderResult.rows[0].order_status).toBe('completed');
            await client.query(`DELETE FROM orders`);
            await client.query(`DELETE FROM users`);
        });
    });
});
