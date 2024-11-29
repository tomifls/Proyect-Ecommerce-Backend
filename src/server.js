const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const productsRouter = require ('./routes/productsRouter.js');
const cartsRouter = require ('./routes/carts.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
  console.error("Stack Trace:", err.stack);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});