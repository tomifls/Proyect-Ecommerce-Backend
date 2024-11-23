const express = require('express');
const router = express.Router();
const { getProducts, addProduct, deleteProduct } = require('../controllers/productsController');

// Ruta para obtener productos
router.get('/', async (req, res) => {
    const productos = await getProducts();
    res.json(productos);
});

// Ruta para agregar un producto
router.post('/', async (req, res) => {
    const producto = req.body;
    await addProduct(producto);
    res.status(201).json({ message: 'Producto agregado' });
});

// Ruta para eliminar un producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await deleteProduct(id);
    res.json({ message: 'Producto eliminado' });
});

module.exports = router;