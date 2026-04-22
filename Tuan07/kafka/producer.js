
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "booking-events",
  brokers: ["172.16.56.245:29092"],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const sendBookingCreated = async (booking) => {
  await producer.send({
    topic: "BOOKING_CREATED",
    messages: [
      {
        value: JSON.stringify({
        bookingId: booking.id,
        userId: booking.userId,
        movieId: booking.movieId,
        seats: booking.seats,
        })
      },
    ],
  });
};

module.exports = { connectProducer, sendBookingCreated };