class Product {
    constructor(id, title, description, code, price, stock, category, thumbnails = []) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = true; // Siempre true por default
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}

module.exports = Product;