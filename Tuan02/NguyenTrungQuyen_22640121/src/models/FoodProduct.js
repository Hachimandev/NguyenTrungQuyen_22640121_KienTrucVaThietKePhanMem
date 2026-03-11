const Product = require("./Product");

class FoodProduct extends Product {
  constructor(id, name, price, expiryDate) {
    super(id, name, price);
    this.expiryDate = expiryDate;
  }

  displayInfo() {
    console.log(
      `Food Product: ${this.id} - ${this.name} - Price: ${this.price} - Expiry: ${this.expiryDate}`
    );
  }
}

module.exports = FoodProduct;