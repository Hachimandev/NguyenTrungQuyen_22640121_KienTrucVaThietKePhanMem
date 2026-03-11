class ProductManager {
  constructor() {
    if (ProductManager.instance) {
      return ProductManager.instance;
    }

    this.products = [];
    ProductManager.instance = this;
  }

  static getInstance() {
    if (!ProductManager.instance) {
      ProductManager.instance = new ProductManager();
    }
    return ProductManager.instance;
  }

  addProduct(product) {
    this.products.push(product);
  }

  displayProducts() {
    this.products.forEach((p) => p.displayInfo());
  }
}

module.exports = ProductManager;