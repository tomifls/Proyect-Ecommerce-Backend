router.get('/products', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    try {
        const filters = query
            ? { $or: [{ category: query }, { available: query === 'true' }] }
            : {};
        const sortOptions = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

        const products = await Product.paginate(filters, {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sortOptions,
        });

        res.render('products', {
            products: products.docs,
            totalPages: products.totalPages,
            currentPage: products.page,
            hasNextPage: products.hasNextPage,
            hasPrevPage: products.hasPrevPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        res.status(500).send('Error al cargar productos');
    }
});