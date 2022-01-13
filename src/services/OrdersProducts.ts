import client from '../database';

export type OrdersProducts = {
    id?: number;
    orderId: number;
    products: { productId: number; quantity: number }[];
};

export type OrderWithProducts = {
    orderId: number;
    userId?: number;
    orderStatus: string;
    products: {
        productName: string;
        productPrice: number;
        productQuantity: number;
    }[];
};

export class OrdersProductsStore {
    async createOrder(
        orderId: number,
        products: { productId: number; quantity: number }[],
    ): Promise<void> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            for (const product of products) {
                await conn.query(sql, [
                    orderId,
                    product.productId,
                    product.quantity,
                ]);
            }
        } catch (err) {
            throw new Error(`Can not create order: ${err}`);
        }
    }
    async getOrders(
        userId: number,
        activeOrders: boolean,
    ): Promise<OrderWithProducts[]> {
        try {
            const conn = await client.connect();
            const sql =
                'SELECT orders.id as orderId, orders.order_status as orderStatus, products.name as productName, products.price as productPrice, orders_products.quantity as ProductQuantity FROM orders INNER JOIN orders_products ON orders_products.order_id = orders.id INNER JOIN products ON products.id = orders_products.product_id WHERE orders.user_id = $1 AND orders.order_status = $2 ORDER BY orders.id';
            const result = await conn.query(sql, [
                userId,
                activeOrders ? 'active' : 'completed',
            ]);
            const orders = result.rows;
            const newOrders: OrderWithProducts[] = [];
            for (const order of orders) {
                // if newOrders has an order with the same orderId, continue
                if (
                    newOrders.find(
                        (newOrder) => newOrder.orderId === order.orderid,
                    )
                ) {
                    continue;
                }
                const newOrder: OrderWithProducts = {
                    orderId: order.orderid,
                    orderStatus: order.orderstatus,
                    userId,
                    products: [],
                };
                for (const innerOrder of orders) {
                    if (order.orderid === innerOrder.orderid) {
                        newOrder.products.push({
                            productName: innerOrder.productname,
                            productPrice: innerOrder.productprice,
                            productQuantity: innerOrder.productquantity,
                        });
                    }
                }
                newOrders.push(newOrder);
            }
            return newOrders;
        } catch (err) {
            throw new Error(`Can not get orders: ${err}`);
        }
    }
    async getCurrentOrder(userId: number): Promise<OrderWithProducts> {
        const orders: OrderWithProducts[] = await this.getOrders(userId, true);
        return orders[0];
    }
    async getCompletedOrders(userId: number): Promise<OrderWithProducts[]> {
        const orders: OrderWithProducts[] = await this.getOrders(userId, false);
        return orders;
    }
    // get all products that appears in any order with count
    async getFeaturedProducts(): Promise<
        {
            productId: number;
            productName: string;
            productPrice: number;
        }[]
    > {
        try {
            const conn = await client.connect();
            const sql =
                'SELECT products.id as productId, products.name as productName, products.price as productPrice, SUM(orders_products.quantity) as productCount FROM orders_products INNER JOIN products ON products.id = orders_products.product_id GROUP BY products.id ORDER BY productCount DESC LIMIT 5';
            const result = await conn.query(sql);
            return result.rows.map((row) => ({
                productId: row.productid,
                productName: row.productname,
                productPrice: row.productprice,
            }));
        } catch (err) {
            throw new Error(`Can not get products with count: ${err}`);
        }
    }
}
