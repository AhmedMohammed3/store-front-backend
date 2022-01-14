import { Order, OrderStore } from './../../models/Order';
import supertest from 'supertest';
import app from '../../server';
import client from '../../database';
import dotenv from 'dotenv';

dotenv.config();

// test order endpoints
describe('Order', () => {
    let token = '';
    let userId = '';
    let products: { productId: number; quantity: number }[] = [];
    beforeAll(async () => {
        let response = await supertest(app).post('/users').send({
            firstname: 'fname',
            lastname: 'lname',
            password: 'pswd',
        });
        token = response.body.token;
        userId = response.body.newUser.id;

        response = await supertest(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'product',
                price: 10,
                category: 'category',
            });
        products = [
            {
                productId: response.body.newProduct.id,
                quantity: 1,
            },
        ];
    });
    afterAll(async () => {
        await client.query(`DELETE from orders_products`);
        await client.query(`DELETE FROM orders`);
        await client.query(`DELETE FROM users`);
        await client.query(`DELETE from products`);
    });
    // test createOrder method
    describe('createOrder', () => {
        it('should return a new order', async () => {
            const response = await supertest(app)
                .post('/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({ userId, products });
            expect(response.status).toBe(201);
        });
    });
    // test markAsCompleted method
    describe('markAsCompleted', () => {
        it('should mark order as completed', async () => {
            let response = await supertest(app)
                .post('/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({ userId, products });

            const orderId = response.body.newOrder.id;

            response = await supertest(app)
                .put(`/orders/${orderId}/close`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            const orderResult = await client.query(
                `SELECT * FROM orders WHERE id = ${orderId}`,
            );
            expect(orderResult.rows[0].order_status).toBe('completed');
        });
    });
});
