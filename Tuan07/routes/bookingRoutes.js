
const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");

router.post("/bookings", controller.createBooking);
router.get("/bookings", controller.getBookings);

module.exports = router;