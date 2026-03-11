const ProductManager = require('./managers/ProductManager');
const ElectronicFactory = require('./factories/ElectronicFactory');
const FoodFactory = require('./factories/FoodFactory');

const manager = ProductManager.getInstance();

const electronicFactory = new ElectronicFactory();
const foodFactory = new FoodFactory();

const p1 = electronicFactory.createProduct(1, "Laptop", 1200);
const p2 = foodFactory.createProduct(2, "Milk", 3.5);
const p3 = electronicFactory.createProduct(3, "Phone", 800);

manager.addProduct(p1);
manager.addProduct(p2);
manager.addProduct(p3);

manager.displayProducts();