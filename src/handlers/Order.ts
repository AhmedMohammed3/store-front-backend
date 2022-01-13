import express, { Request, Response } from 'express';

import { Order, OrderStore } from '../models/Order';
import { OrdersProductsStore } from '../services/OrdersProducts';
import { verifyToken } from '../middlewares/token';

const orderStore = new OrderStore();
const ordersProductsStore = new OrdersProductsStore();

const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, products } = req.body;
        const newOrder: Order = await orderStore.createOrder(Number(userId));
        await ordersProductsStore.createOrder(Number(newOrder.id), products);
        res.status(201).json({ newOrder });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const closeOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        await orderStore.markAsCompleted(Number(orderId));
        res.status(200).json({ message: 'Order closed' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const orders_routes = (app: express.Application): void => {
    // POST /orders
    app.post('/orders', verifyToken, createOrder);
    // PUT /orders/close
    app.put('/orders/close/:orderId', verifyToken, closeOrder);
};

export default orders_routes;
