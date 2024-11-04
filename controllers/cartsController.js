const { readData, writeData } = require('../utils/fileManager');
const filePath = './data/carrito.json';

// Crear un nuevo carrito
const createCart = async (req, res) => {
    try {
        const carts = await readData(filePath);
        const newCart = {
            id: (carts.length + 1).toString(), // Generar id Nuevo
            products: []
        };

        carts.push(newCart);
        await writeData(filePath, carts);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito' });
    }
};

// Obtener los productos de un carrito por ID
const getCartById = async (req, res) => {
    try {
        const carts = await readData(filePath);
        const cart = carts.find(c => c.id === req.params.cid);

        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
};

// Agregar un producto al carrito
const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const carts = await readData(filePath);
        const cart = carts.find(c => c.id === cid);

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const productInCart = cart.products.find(p => p.product === pid);

        if (productInCart) {
            productInCart.quantity++; // Si el producto ya está en el carrito, aumentar su cantidad
        } else {
            cart.products.push({ product: pid, quantity: 1 }); // Si no está, agregarlo con cantidad 1
        }

        await writeData(filePath, carts);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
};

module.exports = {createCart, getCartById, addProductToCart };
