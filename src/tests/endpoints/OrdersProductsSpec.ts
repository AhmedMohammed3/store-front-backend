import supertest from 'supertest';
import app from '../../server';
import client from '../../database';

// test ordersProducts endpoints
describe('OrdersProducts', () => {
    let token = '';
    let userId = '';
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
    });
    afterAll(async () => {
        await client.query(`DELETE from orders_products`);
        await client.query(`DELETE FROM orders`);
        await client.query(`DELETE FROM users`);
        await client.query(`DELETE from products`);
    });
    describe('getCurrentOrder', () => {
        it('should return current order', async () => {
            const response = await supertest(app)
                .get(`/orders/current/${userId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    });
    describe('getCompletedOrders', () => {
        it('should return a list of completed orders', async () => {
            const response = await supertest(app)
                .get(`/orders/completed/${userId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    });
});
