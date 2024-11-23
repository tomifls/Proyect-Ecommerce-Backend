const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/productos.json');
    }

    // Método para obtener todos los productos
    getProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer los productos:', error);
            return [];
        }
    }

    // Método para agregar un producto
    addProduct(product) {
        const products = this.getProducts();
        products.push(product);
        fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;