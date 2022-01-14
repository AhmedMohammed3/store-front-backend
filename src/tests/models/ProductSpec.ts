import { Product, ProductStore } from '../../models/Product';
import client from '../../database';

describe('ProductStore', () => {
    // test index method
    it('should return an array of products', async () => {
        const store = new ProductStore();
        const products: Product[] = await store.index();
        expect(products).toBeInstanceOf(Array);
    });
    // test showProduct method
    it('should return a product', async () => {
        const store = new ProductStore();
        let product: Product = await store.createProduct({
            name: 'test',
            price: 1,
            category: 'test',
        });
        product = await store.showProduct(Number(product.id));
        expect(product).toBeInstanceOf(Object);
        client.query(`DELETE FROM products`);
    });
    // test createProduct method
    it('should return a new product', async () => {
        const store = new ProductStore();
        const product: Product = await store.createProduct({
            name: 'test',
            price: 1,
            category: 'test',
        });
        expect(product).toBeInstanceOf(Object);
        client.query(`DELETE FROM products`);
    });
    // test getProductsByCategory method
    it('should return an array of products', async () => {
        const store = new ProductStore();
        const products: Product[] = await store.getProductsByCategory('test');
        expect(products).toBeInstanceOf(Array);
    });
});
