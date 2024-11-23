const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartsController');

// Ruta para obtener los carritos
router.get('/:cartId', async (req, res) => {
    const { cartId } = req.params;
    const cart = await getCart(cartId);
    res.json(cart);
});

// Ruta para agregar un producto al carrito
router.post('/:cartId/products', async (req, res) => {
    const { cartId } = req.params;
    const product = req.body;
    await addToCart(cartId, product);
    res.status(201).json({ message: 'Producto agregado al carrito' });
});

// Ruta para eliminar un producto del carrito
router.delete('/:cartId/products/:productId', async (req, res) => {
    const { cartId, productId } = req.params;
    await removeFromCart(cartId, productId);
    res.json({ message: 'Producto eliminado del carrito' });
});

module.exports = router;