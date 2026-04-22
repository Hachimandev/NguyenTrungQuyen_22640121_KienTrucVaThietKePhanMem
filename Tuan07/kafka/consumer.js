const Booking = require("../models/Booking");

consumer.subscribe({ topic: "PAYMENT_COMPLETED" });

consumer.run({
  eachMessage: async ({ message }) => {
    const data = JSON.parse(message.value.toString());

    await Booking.update(
      { status: "SUCCESS" },
      { where: { id: data.bookingId } }
    );

    console.log("✅ Updated SUCCESS:", data.bookingId);
  },
});