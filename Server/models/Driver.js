import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    licenseNumber: { type: String, required: true, unique: true },

    vehicleName: { type: String, required: true },   // e.g., Toyota Innova
    vehicleModel: { type: String, required: true },  // e.g., 2022
    vehicleType: { type: String, enum: ["SUV", "Sedan", "Minibus"], required: true },

    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Driver", driverSchema);
