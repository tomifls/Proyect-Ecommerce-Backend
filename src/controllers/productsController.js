const FileManager = require('../utils/fileManager');
const filePath = 'src/data/productos.json';
const Product = require('../models/product');

// Obtener productos desde la base de datos (MongoDB)
const getProductsFromDB = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const filters = query
            ? { $or: [{ category: query }, { available: query === 'true' }] }
            : {};
        const sortOptions =
            sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

        const products = await Product.paginate(filters, {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sortOptions,
        });

        const { docs, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } =
            products;

        res.json({
            status: 'success',
            payload: docs,
            totalPages,
            prevPage,
            nextPage,
            page: products.page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage
                ? `/api/products?limit=${limit}&page=${prevPage}`
                : null,
            nextLink: hasNextPage
                ? `/api/products?limit=${limit}&page=${nextPage}`
                : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener productos' });
    }
};


// Obtener productos desde un archivo JSON
const getProductsFromFile = async (req, res) => {
    try {
        const products = await FileManager.readJSON('src/data/productos.json');
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// Agregar un producto al archivo JSON
const addProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const products = await FileManager.readJSON('src/data/productos.json');
        products.push(newProduct);
        await FileManager.writeJSON('src/data/productos.json', products);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ error: 'Error al agregar producto' });
    }
};

// Eliminar un producto del archivo JSON
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await FileManager.readJSON('src/data/productos.json');
        const updatedProducts = products.filter((product) => product.id !== id);
        await FileManager.writeJSON('src/data/productos.json', updatedProducts);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};

module.exports = {
    getProductsFromDB,
    getProductsFromFile,
    addProduct,
    deleteProduct,
};