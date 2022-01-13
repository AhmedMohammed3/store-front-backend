import express, { Request, Response } from 'express';

import { Product, ProductStore } from '../models/Product';
import { verifyToken } from '../middlewares/token';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products: Product[] = await store.index();
        res.status(200).json({ products });
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Server Error'});
    }
};

const showProduct = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.productId);
        const product: Product = await store.showProduct(id);
        res.status(200).json({ product });
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Server Error'});
    }
};

const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, category } = req.body;
        const product: Product = { name, price, category };
        const newProduct: Product = await store.createProduct(product);
        res.status(201).json({ newProduct });
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Server Error'});
    }
};

const getFeaturedProducts = async (_req: Request, res: Response) => {
    try {
        // Get top 5 most popular products
        const products: Product[] = []; //TODO: get top 5 most popular products
        res.status(200).json({ products });
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Server Error'});
    }
};

const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const category: string = req.params.category;
        const products: Product[] = await store.getProductsByCategory(category);
        res.status(200).json({ products });
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Server Error'});
    }
};

const product_routes = (app: express.Application): void => {
    // GET /products
    app.get('/products', index);
    // GET /products/:productId
    app.get('/products/:productId', showProduct);
    // POST /products/
    app.post('/products', verifyToken, createProduct);
    // GET /products/featured
    app.get('/products/featured', getFeaturedProducts);
    // GET /products/category/:category
    app.get('/products/category/:category', getProductsByCategory);
};

export default product_routes;
