import { QueryResult } from 'pg';
import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result: QueryResult<Product> = await conn.query(sql);
            return result.rows;
        } catch (err) {
            throw new Error(`Can not get products: ${err}`);
        }
    }
    async showProduct(id: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id = $1';
            const result: QueryResult<Product> = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not get product: ${err}`);
        }
    }
    async createProduct(product: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            const result: QueryResult<Product> = await conn.query(sql, [
                product.name,
                product.price,
                product.category,
            ]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not create product: ${err}`);
        }
    }
    // get products by category with like
    async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            const conn = await client.connect();

            const sql = 'SELECT * FROM products WHERE category LIKE $1';
            const result: QueryResult<Product> = await conn.query(sql, [
                `%${category}%`,
            ]);
            return result.rows;
        } catch (err) {
            throw new Error(`Can not get products by category: ${err}`);
        }
    }
}
