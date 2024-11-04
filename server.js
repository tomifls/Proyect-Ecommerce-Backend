const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const viewsRouter = require('./routes/viewsRouter');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurar Handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Ruta a la carpeta de vistas

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Ruta estática para archivos públicos

// Rutas API
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Rutas vistas
app.use('/', viewsRouter);

// Configurar Websockets
io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado');

    // Llama correctamente a la función que obtiene todos los productos
    const productos = await getAllProducts(); 
    socket.emit('productosActualizados', productos); // Enviar los productos al cliente

    // Escuchar cuando se añade un nuevo producto
    socket.on('nuevoProducto', async (data) => {
        await addProduct(data); // Añade el nuevo producto
        io.emit('productosActualizados', await getAllProducts()); // Actualiza productos para todos los clientes conectados
    });

    // Escuchar cuando se elimina un producto
    socket.on('eliminarProducto', async (id) => {
        await deleteProduct(id); // Elimina producto por ID
        io.emit('productosActualizados', await getAllProducts()); // Actualiza productos para todos los clientes
    });

    // Desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

// Iniciar el servidor puerto 8080
server.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

// Funciones controlador
const { getProducts, addProduct, deleteProduct } = require('./controllers/productsController');

// Obtener todos productos
async function getAllProducts() {
    try {
        const productos = await getProducts(); 
        return productos;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}
