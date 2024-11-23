const socket = io();

socket.on('productosActualizados', (productos) => {
    const productosContainer = document.querySelector('.product-list-realtime');
    productosContainer.innerHTML = '';

    productos.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item-realtime');
        productElement.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price}</div>
            <button onclick="eliminarProducto('${product.id}')">Eliminar</button>
        `;
        productosContainer.appendChild(productElement);
    });
});

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    agregarProducto();
});

document.getElementById('deleteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('deleteProductId').value;
    eliminarProducto(id);
});

// Enviar producto formulario
function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value;
    const precio = document.getElementById('precioProducto').value;

    if (nombre && precio) {
        socket.emit('nuevoProducto', { name: nombre, price: precio });
    }
}

// Eliminar producto
function eliminarProducto(id) {
    socket.emit('eliminarProducto', id);
}
