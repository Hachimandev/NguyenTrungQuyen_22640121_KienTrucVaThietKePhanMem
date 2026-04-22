
const express = require("express");
const sequelize = require("./config/db");
const bodyParser = require("body-parser");
const bookingRoutes = require("./routes/bookingRoutes");
const { connectProducer } = require("./kafka/producer");

const app = express();
app.use(bodyParser.json());

app.use("/", bookingRoutes);

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync(); 

  await connectProducer();

  app.listen(8083, () => {
    console.log("Booking Service running on port 8083");
  });
};

start();