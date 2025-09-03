// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // --- Link to User ---
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references the User model
      required: true,
    },

    // --- Customer Details (snapshot at time of booking) ---
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+971" },

    // --- Trip Details ---
    service: { type: String, required: true }, // airport, local, etc.
    pickup: { type: String, required: true },
    dropoff: { type: String, required: true },
    stops: [{ type: String }], // optional multiple stops
    date: { type: Date, required: true },
    time: { type: String, required: true },
    passengers: { type: Number, default: 1 },
    luggage: { type: Number, default: 0 },

    // --- Vehicle Selection ---
    vehicleType: {
      type: String,
      enum: ["Sedan", "SUV", "Minibus", "Coach"],
      required: true,
    },

    // --- Enhancements ---
    enhancements: {
      childSeat: [{ age: Number }],
      meetAndGreet: { type: Boolean, default: false },
      extraLuggage: { type: Boolean, default: false },
      wifi: { type: Boolean, default: false },
      wheelchair: { type: Boolean, default: false },
      bottledWater: { type: Boolean, default: false },
    },

    // --- Preferences ---
    preferences: {
      timing: { type: String },
      language: { type: String },
      specialAssistance: { type: String },
      notes: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
