// routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  deleteBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getBookings)
  .post(protect, createBooking);

router.route("/:id")
  .get(protect, getBookingById)
  .delete(protect, deleteBooking);

export default router;
