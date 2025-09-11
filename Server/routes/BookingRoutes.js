import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookings as getUserBookings, // alias import
  getBookingById,
  deleteBooking,
  updateBooking,
  adminDeleteBooking,
  assignDriver, // ✅ import assign controller
} from "../controllers/bookingController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ----------------- USER ROUTES -----------------
router.route("/my").get(protect, getUserBookings); // Logged-in user’s own bookings
router.route("/").post(protect, createBooking); // Create booking

// ----------------- ADMIN ROUTES -----------------
router.route("/").get(protect, admin, getAllBookings); // View all bookings
router
  .route("/:id")
  .put(protect, admin, updateBooking) // Admin: edit any booking
  .delete(protect, admin, adminDeleteBooking); // ✅ fix: admin deletes booking

// ✅ Assign driver route
router.put("/:id/assign", protect, admin, assignDriver);

// ----------------- SHARED ROUTE -----------------
router.route("/:id").get(protect, getBookingById); // Both admin & user

export default router;
