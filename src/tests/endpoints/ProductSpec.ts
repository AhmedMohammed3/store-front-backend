import supertest from 'supertest';
import app from '../../server';
import client from '../../database';

// test Product endpoints
describe('Product', () => {
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
    describe('getProducts', () => {
        it('should return all products', async () => {
            const response = await supertest(app).get('/products');
            expect(response.status).toBe(200);
        });
    });
    describe('getProduct', () => {
        it('should return a specifc product', async () => {
            const response = await supertest(app).get(
                `/products/${products[0].productId}`,
            );
            expect(response.status).toBe(200);
        });
    });
    describe('getProductsByCategory', () => {
        it('should return category products', async () => {
            const response = await supertest(app).get(
                `/products/category/category}`,
            );
            expect(response.status).toBe(200);
        });
    });
    describe('createProduct', () => {
        it('should create a new product', async () => {
            const response = await supertest(app)
                .post('/products')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'product',
                    price: 10,
                    category: 'category',
                });
            expect(response.status).toBe(201);
        });
    });
});
