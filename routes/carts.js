express = require('express');
const fs = require('fs');
const router = express.Router();
const path = './data/carrito.json';


const readCarts = () => {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
};

const writeCarts = (data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

router.post('/', (req, res) => {
    const carts = readCarts();

    const newCart = {
    id: (carts.length + 1).toString(), // Autogenerar ID
    products: []
    };

    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
});

// GET
router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const carts = readCarts();
    const cart = carts.find(c => c.id === cid);

    if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    res.json(cart.products);
});

// POST 
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const carts = readCarts();
    const cart = carts.find(c => c.id === cid);

    if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const productIndex = cart.products.findIndex(p => p.product === pid);

    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    writeCarts(carts);
    res.json(cart);
});

module.exports = router;