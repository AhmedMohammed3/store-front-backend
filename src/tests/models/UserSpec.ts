import { User, UserStore } from '../../models/User';

describe('UserStore', () => {
    // test index method
    it('should return an array of users', async () => {
        const store = new UserStore();
        const users: User[] = await store.index();
        expect(users).toBeInstanceOf(Array);
    });
    // test showUser method
    it('should return a user', async () => {
        const store = new UserStore();
        const user: User = await store.showUser(1);
        expect(user).toBeInstanceOf(Object);
    });
    // test createUser method
    it('should return a new user', async () => {
        const store = new UserStore();
        const user: User = await store.createUser({
            firstname: 'test',
            lastname: 'test',
            pass: 'test',
        });
        expect(user).toBeInstanceOf(Object);
    });
});
