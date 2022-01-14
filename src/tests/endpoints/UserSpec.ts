import supertest from 'supertest';
import app from '../../server';

// users
describe('Users', () => {
    let server: supertest.SuperTest<supertest.Test>;

    beforeEach(() => {
        server = supertest.agent(app);
    });

    it('should return an array of users (return 200)', async () => {
        const response = await server.get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should return a single user (return 200)', async () => {
        const response = await server.get('/users/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('should create a user (return 201)', async () => {
        const response = await server.post('/users').send({
            firstname: 'test',
            lastname: 'test',
            pass: 'test',
        });
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });
});
