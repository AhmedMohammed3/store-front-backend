import supertest from 'supertest';
import app from '../../server';

describe('Products', () => {
    let server: supertest.SuperTest<supertest.Test>;

    beforeEach(() => {
        server = supertest.agent(app);
    });

    it('should return an array of products (return 200)', async () => {
        const response = await server.get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should return a single product (return 200)', async () => {
        const response = await server.get('/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('should create a product (return 201)', async () => {
        const response = await server.post('/products').send({
            name: 'test',
            price: 1,
            category: 'test',
        });
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('should get products by category (return 200)', async () => {
        const response = await server.get('/products/category/test');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});