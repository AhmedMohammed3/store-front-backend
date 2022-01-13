import { Product, ProductStore } from '../../models/Product';

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
        const product: Product = await store.showProduct(1);
        expect(product).toBeInstanceOf(Object);
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
    });
    // test getProductsByCategory method
    it('should return an array of products', async () => {
        const store = new ProductStore();
        const products: Product[] = await store.getProductsByCategory('test');
        expect(products).toBeInstanceOf(Array);
    });
});
