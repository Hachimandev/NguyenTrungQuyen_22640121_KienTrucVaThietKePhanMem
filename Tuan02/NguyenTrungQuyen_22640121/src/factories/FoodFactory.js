const ProductFactory = require("./ProductFactory");
const FoodProduct = require("./FoodProduct");

class FoodFactory extends ProductFactory {
  createProduct(id, name, price) {
    return new FoodProduct(id, name, price, "2026-12-31");
  }
}

module.exports = FoodFactory;