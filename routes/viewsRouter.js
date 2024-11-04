const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');

const productManager = new ProductManager();

// Ruta vista estática (Handlebars)
router.get('/home', async (req, res) => {
    try {
        const productos = await productManager.getProducts(); // Aquí sí sería async
        res.render('home', { productos });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
    }
});

// Ruta vista tiempo real
router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', {});
});

module.exports = router;
