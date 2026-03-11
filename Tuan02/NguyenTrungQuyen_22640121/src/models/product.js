class Product {
  constructor(id, name, price) {
    if (new.target === Product) {
      throw new Error("Cannot instantiate abstract class Product");
    }
    this.id = id;
    this.name = name;
    this.price = price;
  }

  displayInfo() {
    throw new Error("Method 'displayInfo()' must be implemented");
  }
}

module.exports = Product;