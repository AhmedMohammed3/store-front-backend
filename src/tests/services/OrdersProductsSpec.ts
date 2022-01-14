import {
    OrderWithProducts,
    OrdersProductsStore,
} from '../../services/OrdersProducts';

import client from '../../database';

describe('OrdersProductsStore', () => {
    let store: OrdersProductsStore;

    beforeEach(() => {
        store = new OrdersProductsStore();
    });

    it('should create order', async () => {
        const orderId = 1;
        const products = [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 2 },
        ];

        await store.createOrder(orderId, products);

        const { rows } = await client.query(
            `SELECT * FROM orders_products WHERE order_id = ${orderId}`,
        );

        expect(rows).toHaveSize(2);
    });

    it('should get orders', async () => {
        const userId = 1;
        const activeOrders = true;

        const orders: OrderWithProducts[] = [
            {
                orderId: 1,
                userId: 1,
                orderStatus: 'active',
                products: [
                    {
                        productName: 'product 1',
                        productPrice: 1,
                        productQuantity: 1,
                    },
                ],
            },
            {
                orderId: 2,
                userId: 1,
                orderStatus: 'completed',
                products: [
                    {
                        productName: 'product 1',
                        productPrice: 1,
                        productQuantity: 1,
                    },
                ],
            },
        ];

        await client.query(
            `INSERT INTO orders_products (order_id, product_id, quantity) VALUES (1, 1, 1), (2, 1, 1)`,
        );

        const result = await store.getOrders(userId, activeOrders);

        expect(result).toEqual(orders);
    });

    it('should get current order', async () => {
        const userId = 1;

        const currentOrder: OrderWithProducts = {
            orderId: 1,
            userId,
            orderStatus: 'active',
            products: [
                {
                    productName: 'product 1',
                    productPrice: 1,
                    productQuantity: 1,
                },
            ],
        };

        await client.query(
            `INSERT INTO orders_products (order_id, product_id, quantity) VALUES (1, 1, 1)`,
        );

        const result = await store.getCurrentOrder(userId);

        expect(result).toEqual(currentOrder);
    });

    it('should get completed orders', async () => {
        const userId = 1;

        const completedOrders: OrderWithProducts[] = [
            {
                orderId: 1,
                userId,
                orderStatus: 'completed',
                products: [
                    {
                        productName: 'product 1',
                        productPrice: 1,
                        productQuantity: 1,
                    },
                ],
            },
        ];

        await client.query(
            `INSERT INTO orders_products (order_id, product_id, quantity) VALUES (1, 1, 1), (2, 1, 1)`,
        );

        const result = await store.getCompletedOrders(userId);

        expect(result).toEqual(completedOrders);
    });

    it('should get featured products', async () => {
        await client.query(
            `INSERT INTO orders_products (order_id, product_id, quantity) VALUES (1, 1, 1), (2, 1, 1)`,
        );

        const result = await store.getFeaturedProducts();

        expect(result).toHaveSize(1);
    });
});
