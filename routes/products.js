const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = './data/productos.json';


const readProducts = () => {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
};

const writeProducts = (data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

// GET
router.get('/', (req, res) => {
    const { limit } = req.query;
    const products = readProducts();
    if (limit) {
    return res.json(products.slice(0, parseInt(limit)));
    }
    res.json(products);
});

// GET
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const products = readProducts();
    const product = products.find(p => p.id === pid);
        if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
}
    res.json(product);
});

// POST
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    const products = readProducts();

    const newProduct = {
    id: (products.length + 1).toString(), // Autogenerar ID
    title,
    description,
    price,
    status: true,
    stock,
    category,
    thumbnails: thumbnails || []
    };

    if (!title || !description || !price || !stock || !category) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios, excepto thumbnails' });
}

products.push(newProduct);
writeProducts(products);
res.status(201).json(newProduct);
});

// PUT
router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
}

  const { id, ...updateData } = req.body; // No cambiar ID
    products[productIndex] = { ...products[productIndex], ...updateData };
    writeProducts(products);
    res.json(products[productIndex]);
});

// DELETE 
router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    let products = readProducts();
    const product = products.find(p => p.id === pid);

    if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
    }

    products = products.filter(p => p.id !== pid);
    writeProducts(products);
    res.json({ message: 'Producto eliminado correctamente' });
});

module.exports = router;