const Product = require("./Product");

class ElectronicProduct extends Product {
  constructor(id, name, price, warranty) {
    super(id, name, price);
    this.warranty = warranty;
  }

  displayInfo() {
    console.log(
      `Electronic Product: ${this.id} - ${this.name} - Price: ${this.price} - Warranty: ${this.warranty} months`
    );
  }
}

module.exports = ElectronicProduct;