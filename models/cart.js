class Cart {
    constructor(id) {
        this.id = id;
        this.products = []; // Arranca con array vacío
    }

    addProduct(productId) {
        const product = this.products.find(p => p.product === productId);

        if (product) {
            product.quantity++;
        } else {
            this.products.push({ product: productId, quantity: 1 });
        }
    }
}

module.exports = Cart;