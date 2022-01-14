import supertest from 'supertest';
import app from '../../server';
import client from '../../database';

// test User endpoints
describe('User', () => {
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
    });
    afterAll(async () => {
        await client.query(`DELETE FROM users`);
    });
    describe('getUser', () => {
        it('should return a specifc user', async () => {
            const response = await supertest(app)
                .get(`/users/${userId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    });
    describe('getUsers', () => {
        it('should return all users', async () => {
            const response = await supertest(app)
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    });
});
