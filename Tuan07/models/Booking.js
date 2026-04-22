const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userId: DataTypes.INTEGER,
  movieId: DataTypes.INTEGER,
  seats: DataTypes.INTEGER,
  status: {
    type: DataTypes.STRING,
    defaultValue: "PENDING",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Booking;