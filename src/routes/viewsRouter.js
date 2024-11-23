const express = require('express');
const router = express.Router();
const { renderProductsView, renderCartView } = require('../controllers/viewsController');

// Ruta para ver los productos
router.get('/products', renderProductsView);

// Ruta para ver el carrito
router.get('/cart', renderCartView);

module.exports = router;