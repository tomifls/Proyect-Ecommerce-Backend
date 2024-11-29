const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Leer productos desde archivo
  getProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error("Error al leer el archivo:", err);
      return [];
    }
  }

  // Obtener producto por ID
  getProductById(productId) {
    const products = this.getProducts();
    return products.find(product => product.id === productId) || null;
  }

  // Agregar nuevo producto
  addProduct(newProduct) {
    const products = this.getProducts();
  
    newProduct.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  // Actualizar producto
  updateProduct(productId, updatedProduct) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      return null; // Producto no encontrado
    }

    // Actualizar campos del producto
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    this.saveProducts(products);
    return products[productIndex];
  }

  // Eliminar producto
  deleteProduct(productId) {
    let products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      return null; // Producto no encontrado
    }

    // Eliminar producto
    const deletedProduct = products.splice(productIndex, 1)[0];
    this.saveProducts(products);
    return deletedProduct;
  }

  // Guardar productos en archivo
  saveProducts(products) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2), 'utf-8');
    } catch (err) {
      console.error("Error al guardar los productos:", err);
    }
  }
}

module.exports = ProductManager;