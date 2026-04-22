const Booking = require("../models/Booking");
const { sendBookingCreated } = require("../kafka/producer");
const { v4: uuidv4 } = require("uuid");

const createBooking = async (data) => {
  const newBooking = await Booking.create({
    id: uuidv4(),
    userId: data.userId,
    movieId: data.movieId,
    seats: data.seats,
    status: "PENDING",
  });

  await sendBookingCreated(newBooking);

  return newBooking;
};

const getAllBookings = async () => {
  return await Booking.findAll();
};

module.exports = { createBooking, getAllBookings };