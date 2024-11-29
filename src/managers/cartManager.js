class CartManager {
    constructor() {
      this.carts = [];
      this.nextId = 1;
    }
  
    // Crear nuevo carrito
    createCart() {
      const newCart = {
        id: this.nextId++,
        products: [] 
      };
      this.carts.push(newCart); 
      return newCart; 
    }
  
    // obtener todos los carritos
    getAllCarts() {
      return this.carts;
    }
  
    // Obtener carrito por id
    getCartById(cartId) {
      return this.carts.find(cart => cart.id === cartId);
    }
  
    // agregar producto a carrito
    addProductToCart(cartId, product) {
      const cart = this.getCartById(cartId);
      if (cart) {
        cart.products.push(product); 
        return cart;
      } else {
        return null; 
      }
    }
  
    // Método eliminar producto de carrito
    removeProductFromCart(cartId, productId) {
      const cart = this.getCartById(cartId);
      if (cart) {
        const productIndex = cart.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1); 
          return cart;
        }
      }
      return null;
    }
  
    // Vaciar carrito
    emptyCart(cartId) {
      const cart = this.getCartById(cartId);
      if (cart) {
        cart.products = [];
        return cart;
      }
      return null;
    }
  }
  
  module.exports = CartManager;