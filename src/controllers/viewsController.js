const renderProductsView = (req, res) => {
    res.render('products', { title: 'Productos' });
};

const renderCartView = (req, res) => {
    res.render('cart', { title: 'Carrito de Compras' });
};

module.exports = { renderProductsView, renderCartView };
