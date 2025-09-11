import express from "express";
import Booking from "../models/Booking.js";
import PDFDocument from "pdfkit";

const router = express.Router();

console.log("📂 reports.js loaded");

// ✅ Now mounted at /api/bookings/report
router.get("/", async (req, res) => {
  console.log("===== 📥 Incoming Report Request =====");
  console.log("Query Params:", req.query);

  try {
    const { type, month, year } = req.query;

    let start, end;
    if (type === "monthly") {
      if (!month) {
        return res.status(400).json({ message: "Month is required (e.g. 2025-09)" });
      }
      const [y, m] = month.split("-");
      start = new Date(parseInt(y), parseInt(m) - 1, 1);
      end = new Date(parseInt(y), parseInt(m), 0, 23, 59, 59);
    } else if (type === "yearly") {
      if (!year) {
        return res.status(400).json({ message: "Year is required (e.g. 2025)" });
      }
      start = new Date(parseInt(year), 0, 1);
      end = new Date(parseInt(year), 11, 31, 23, 59, 59);
    } else {
      return res.status(400).json({ message: "Invalid type. Must be monthly or yearly." });
    }

    const bookings = await Booking.find({
      createdAt: { $gte: start, $lte: end },
    }).populate("user assignedDriver");

    const doc = new PDFDocument({ size: "A4", margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=booking-report.pdf");

    doc.pipe(res);

    // Header
    doc.fontSize(20).text("Booking Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Period: ${type === "monthly" ? month : year}`, { align: "center" });
    doc.moveDown(2);

    // Table headers
    doc.fontSize(12).text("No", 50, doc.y, { continued: true });
    doc.text("Customer", 100, doc.y, { continued: true });
    doc.text("Driver", 250, doc.y, { continued: true });
    doc.text("Service", 370, doc.y, { continued: true });
    doc.text("Date", 470, doc.y);
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    // Rows
    bookings.forEach((b, i) => {
      const customer = [b.firstName, b.lastName].filter(Boolean).join(" ") || "N/A";
      const driver = b.assignedDriver?.name || "N/A";
      const service = b.service || "N/A";
      const date = b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "N/A";

      doc.text(i + 1, 50, doc.y, { continued: true });
      doc.text(customer, 100, doc.y, { continued: true });
      doc.text(driver, 250, doc.y, { continued: true });
      doc.text(service, 370, doc.y, { continued: true });
      doc.text(date, 470, doc.y);
      doc.moveDown();
    });

    // Footer
    doc.moveDown(2);
    doc.fontSize(10).text(
      "Your Company Name • Contact: +973-XXXXXXX • Email: info@company.com",
      { align: "center" }
    );

    doc.end();
    console.log("✅ Report generated successfully!");
  } catch (err) {
    console.error("❌ Report generation error:", err.message);
    console.error(err.stack);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

export default router;
