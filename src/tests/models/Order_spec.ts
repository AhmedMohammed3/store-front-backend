import { Order, OrderStore } from '../../models/Order';

describe('OrderStore', () => {
    // test createOrder method
    it('should return a new order', async () => {
        const store = new OrderStore();
        const order: Order = await store.createOrder(1);
        expect(order).toBeInstanceOf(Object);
    });
    // test markAsCompleted method
    it('should return a new order', async () => {
        const store = new OrderStore();
        const order: Order = await store.createOrder(1);
        await store.markAsCompleted(Number(order.id));
    });
});
