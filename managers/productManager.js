const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/productos.json');
    }

    // Obtener forma asíncrona
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo de productos:', error);
            return [];
        }
    }

    // Agregar un producto
    async addProduct(product) {
        const products = await this.getProducts();
        products.push(product);
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;
