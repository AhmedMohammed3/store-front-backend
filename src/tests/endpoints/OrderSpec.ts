import supertest from 'supertest';
import app from '../../server';

// test /Orders
describe('Orders', () => {
    let server: supertest.SuperTest<supertest.Test>;

    beforeEach(() => {
        server = supertest.agent(app);
    });

    it('should return an array of orders (return 200)', async () => {
        const response = await server.get('/orders');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should return a single order (return 200)', async () => {
        const response = await server.get('/orders/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('should create an order (return 201)', async () => {
        const response = await server.post('/orders').send({
            userId: 1,
            products: [
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 2 },
            ],
        });
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('should mark an order as completed (return 200)', async () => {
        const response = await server.put('/orders/1').send({
            orderStatus: 'completed',
        });
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});
