const express = require('express');
const router = express.Router();

// Definir rutas productos
router.get('/', (req, res) => {
    res.send('Lista de productos');
});

router.post('/', (req, res) => {
    res.send('Crear un producto');
});

module.exports = router;