
const service = require("../services/bookingService");

const createBooking = async (req, res) => {
  const booking = await service.createBooking(req.body);
  res.json(booking);
};

const getBookings = async (req, res) => {
  const data = await service.getAllBookings();
  res.json(data);
};

module.exports = { createBooking, getBookings };