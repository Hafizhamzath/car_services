// controllers/statsController.js
import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    // ✅ Bookings
    const totalBookings = await Booking.countDocuments();

    // remove pending until we add status in schema
    const pendingBookings = 0;

    // ✅ Users
    const totalUsers = await User.countDocuments();
    const activeUsers = totalUsers; // fallback since you don’t track active

    // ✅ Drivers
    const totalDrivers = await User.countDocuments({ role: "driver" });
    const activeDrivers = await User.countDocuments({
      role: "driver",
      availability: true,
    });

    res.json({
      bookings: { total: totalBookings, pending: pendingBookings },
      users: { total: totalUsers, active: activeUsers },
      drivers: { total: totalDrivers, active: activeDrivers },
    });
  } catch (error) {
    console.error("❌ Stats error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
