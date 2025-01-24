// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ride_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ride",
            required: true,
        },
        seats: { type: Number, required: true },
        rideData: { type: String, required: true },
        isCancle: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
