import client from '../../database';
import {
    OrderWithProducts,
    OrdersProductsStore,
} from '../../services/OrdersProducts';

// test OrdersProductsStore
describe('OrdersProductsStore', () => {
    let orderId = '';
    let userId = '';
    let productId = '';
    beforeEach(async () => {
        let result = await client.query(
            `INSERT INTO users (firstname,lastname,password) VALUES ('fname','lname','pswd') RETURNING *`,
        );
        userId = result.rows[0].id;
        result = await client.query(
            `INSERT INTO orders (user_id,order_status) VALUES (${userId},'active') RETURNING *`,
        );
        orderId = result.rows[0].id;
        result = await client.query(
            `INSERT INTO products (name,price,category) VALUES ('product1',10,'category1') RETURNING *`,
        );
        productId = result.rows[0].id;
    });
    afterEach(async () => {
        await client.query(`DELETE FROM orders_products`);
        await client.query(`DELETE FROM orders`);
        await client.query(`DELETE FROM users`);
        await client.query(`DELETE FROM products`);
    });

    // test createOrder method
    it('should return a new order', async () => {
        const store = new OrdersProductsStore();
        await store.createOrder(Number(orderId), [
            { productId: Number(productId), quantity: 1 },
        ]);
        // check if order was created
        const orders: OrderWithProducts[] = await store.getOrders(
            Number(userId),
            true,
        );
        expect(orders.length).toBe(1);
    });

    // test getOrders method
    it('should return an array of orders', async () => {
        const store = new OrdersProductsStore();
        const orders: OrderWithProducts[] = await store.getOrders(
            Number(userId),
            true,
        );
        expect(orders).toBeInstanceOf(Array);
    });

    // test getCurrentOrder method
    it('should return an order', async () => {
        const store = new OrdersProductsStore();
        await store.createOrder(Number(orderId), [
            { productId: Number(productId), quantity: 1 },
        ]);
        const order: OrderWithProducts = await store.getCurrentOrder(
            Number(userId),
        );
        expect(order).toBeInstanceOf(Object);
    });

    // test getCompletedOrders method
    it('should return an array of orders', async () => {
        const store = new OrdersProductsStore();
        const orders: OrderWithProducts[] = await store.getCompletedOrders(
            Number(userId),
        );
        expect(orders).toBeInstanceOf(Array);
    });

    // test getFeaturedProducts method
    it('should return an array of products', async () => {
        const store = new OrdersProductsStore();
        const products: {
            productId: number;
            productName: string;
            productPrice: number;
        }[] = await store.getFeaturedProducts();
        expect(products).toBeInstanceOf(Array);
    });
});
