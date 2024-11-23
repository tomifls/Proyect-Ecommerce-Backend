const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');
const http = require('http');
const connectDB = require('./config/mongoConfig');

// Importar rutas
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const viewsRouter = require('./routes/viewsRouter');

// Configura base de datos
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Rutas vistas
app.use('/', viewsRouter);

// Websockets
io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado');
    const productos = await getProducts();
    socket.emit('productosActualizados', productos);

    socket.on('nuevoProducto', async (data) => {
        await addProduct(data);
        io.emit('productosActualizados', await getProducts());
    });

    socket.on('eliminarProducto', async (id) => {
        await deleteProduct(id);
        io.emit('productosActualizados', await getProducts());
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

// Iniciar servidor
server.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 8080`);
});