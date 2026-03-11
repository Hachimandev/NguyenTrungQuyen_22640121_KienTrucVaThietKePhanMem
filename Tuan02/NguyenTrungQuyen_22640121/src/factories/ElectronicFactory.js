const ProductFactory = require("./ProductFactory");
const ElectronicProduct = require("./ElectronicProduct");

class ElectronicFactory extends ProductFactory {
  createProduct(id, name, price) {
    return new ElectronicProduct(id, name, price, 24);
  }
}

module.exports = ElectronicFactory;