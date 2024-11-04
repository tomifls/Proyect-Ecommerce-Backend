const express = require('express');
const router = express.Router();
const { createCart, getCartById, addProductToCart } = require('../controllers/cartsController');

// Crear carrito
router.post('/', createCart);

// Obtener productos de carrito
router.get('/:cid', getCartById);

// Agregar producto a carrito
router.post('/:cid/product/:pid', addProductToCart);

module.exports = router;