const { readData, writeData } = require('../utils/fileManager');
const filePath = './data/productos.json';

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const productos = await readData(filePath);
        if (!productos) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }
        const limit = req.query.limit;
        res.json(limit ? productos.slice(0, limit) : productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};


// Obtener producto por ID
const getProductById = async (req, res) => {
    try {
        const productos = await readData(filePath);
        const producto = productos.find(p => p.id === req.params.pid);
        producto ? res.json(producto) : res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Agregar nuevo producto
const addProduct = async (req, res) => {
    const { title, description, price, stock, category } = req.body;
    if (!title || !price || !stock || !category) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    try {
        const productos = await readData(filePath);
        const newProduct = {
            id: (productos.length + 1).toString(),
            title,
            price,
            description,
            stock,
            category
        };
        productos.push(newProduct);
        await writeData(filePath, productos);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto', error: error.message });
    }
};


// Actualizar producto
const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;

    try {
        const productos = await readData(filePath);
        const index = productos.findIndex(p => p.id === pid);

        if (index !== -1) {
            const updatedProduct = { ...productos[index], ...updatedFields, id: pid }; // Asegurarse id no cambiar
            productos[index] = updatedProduct;
            await writeData(filePath, productos);
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
    try {
        const productos = await readData(filePath);
        const filteredProducts = productos.filter(p => p.id !== req.params.pid);

        if (productos.length === filteredProducts.length) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await writeData(filePath, filteredProducts);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct};