import { OrderWithProducts } from '../services/OrdersProducts';
import express, { Request, Response } from 'express';
import { OrdersProductsStore } from '../services/OrdersProducts';
import { verifyToken } from '../middlewares/token';

const store = new OrdersProductsStore();

const getCurrentOrder = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.userId);
        const order: OrderWithProducts = await store.getCurrentOrder(userId);
        res.status(200).json({ order });
    } catch (err) {
        
        res.status(500).json({ error: 'Server Error' });
    }
};

const getCompletedOrders = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.userId);
        const orders: OrderWithProducts[] = await store.getCompletedOrders(
            userId,
        );
        res.status(200).json({ orders });
    } catch (err) {
        
        res.status(500).json({ error: 'Server Error' });
    }
};

const orders_Products_routes = (app: express.Application): void => {
    // GET /orders/current/:userId
    app.get('/orders/current/:userId', verifyToken, getCurrentOrder);
    // GET /orders/completed/:userId
    app.get('/orders/completed/:userId', verifyToken, getCompletedOrders);
};

export default orders_Products_routes;
