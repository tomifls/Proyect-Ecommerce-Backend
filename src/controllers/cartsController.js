const Cart = require('../models/cart');

// Eliminar producto específico
const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        cart.products = cart.products.filter(item => item.product.toString() !== pid);
        await cart.save();

        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto del carrito' });
    }
};

// Actualizar Carrito
const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el carrito' });
    }
};

// Actualizar cantidad de productos
const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const productIndex = cart.products.findIndex(item => item.product.toString() === pid);
        if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado en el carrito' });

        cart.products[productIndex].quantity = quantity;
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cantidad del producto' });
    }
};

// Eliminar todos los productos del carrito
const deleteAllProducts = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        cart.products = [];
        await cart.save();

        res.json({ message: 'Carrito vaciado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al vaciar el carrito' });
    }
};

// Exportar funciones
module.exports = {
    deleteProductFromCart,
    updateCart,
    updateProductQuantity,
    deleteAllProducts,
};