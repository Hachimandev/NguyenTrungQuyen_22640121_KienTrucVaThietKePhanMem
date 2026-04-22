const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("booking_db", "root", "sapassword", {
  host: "localhost",
  dialect: "mysql", 
});

module.exports = sequelize;