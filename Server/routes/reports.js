import express from "express";
import Booking from "../models/Booking.js";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";
import { PassThrough } from "stream";

const router = express.Router();
console.log("📂 reports.js loaded");

// ✅ Mounted at /api/bookings/report
router.get("/", async (req, res) => {
  console.log("===== 📥 Incoming Report Request =====");
  console.log("Query Params:", req.query);

  try {
    const { type, month, year } = req.query;

    let start, end, periodLabel;
    if (type === "monthly") {
      if (!month) {
        return res
          .status(400)
          .json({ message: "Month is required (e.g. 2025-09)" });
      }
      const [y, m] = month.split("-");
      start = new Date(parseInt(y), parseInt(m) - 1, 1);
      end = new Date(parseInt(y), parseInt(m), 0, 23, 59, 59);
      periodLabel = new Date(start).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    } else if (type === "yearly") {
      if (!year) {
        return res
          .status(400)
          .json({ message: "Year is required (e.g. 2025)" });
      }
      start = new Date(parseInt(year), 0, 1);
      end = new Date(parseInt(year), 11, 31, 23, 59, 59);
      periodLabel = year;
    } else {
      return res
        .status(400)
        .json({ message: "Invalid type. Must be monthly or yearly." });
    }

    const bookings = await Booking.find({
      createdAt: { $gte: start, $lte: end },
    }).populate("user assignedDriver");

    // ✅ Instead of piping directly to res, we collect into buffer
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=booking-report.pdf"
      );
      res.send(pdfBuffer); // ✅ send full PDF at once
    });

    // ===== HEADER =====
    doc.font("Helvetica-Bold").fontSize(12).text("Flyinco Travel & Tourism W.L.L", 40, 40);
    doc.font("Helvetica").fontSize(10).text("CR.No. 167235-1");
    doc.text("Office: A0227, Zubara Avenue, Awal Street");
    doc.text("Al Qudaybiyah 0308, Manama");
    doc.text("Kingdom of Bahrain");
    doc.moveDown(0.5);
    doc.text("Phone: +973 33692021 / +973 35016007");
    doc.text("Email: limo@flyinco.com");

    // Logo (top-right)
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const logoPath = path.join(__dirname, "../assets/Flyinco.png");
    try {
      doc.image(logoPath, 420, 40, { width: 100 });
    } catch (err) {
      console.warn("⚠️ Logo not found at:", logoPath);
    }

    // Separator line
    doc.moveTo(40, 130).lineTo(550, 130).strokeColor("#AAAAAA").lineWidth(1).stroke();

    // ===== TITLE =====
    doc.moveDown(2);
    doc.font("Times-Bold").fontSize(20).fillColor("#222222")
       .text(`Booking Report of ${periodLabel}`, { align: "center" });
    doc.moveDown(1.5);

    // ===== TABLE (Excel Style) =====
    const tableTop = doc.y + 10;
    const colWidths = [40, 130, 120, 100, 100];
    const rowHeight = 25;

    function drawCell(x, y, width, height, text, isHeader = false) {
      if (isHeader) {
        doc.rect(x, y, width, height).fill("#f2f2f2").stroke();
        doc.fillColor("#000").font("Helvetica-Bold").fontSize(12);
      } else {
        doc.rect(x, y, width, height).stroke();
        doc.fillColor("#000").font("Helvetica").fontSize(11);
      }
      doc.text(text, x + 5, y + 7, { width: width - 10, align: "left" });
    }

    // Draw header row
    let startX = 50;
    let startY = tableTop;

    drawCell(startX, startY, colWidths[0], rowHeight, "No", true);
    drawCell(startX + colWidths[0], startY, colWidths[1], rowHeight, "Customer", true);
    drawCell(startX + colWidths[0] + colWidths[1], startY, colWidths[2], rowHeight, "Driver", true);
    drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2], startY, colWidths[3], rowHeight, "Service", true);
    drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], startY, colWidths[4], rowHeight, "Date", true);

    // First data row position
    let rowY = startY + rowHeight;

    // Data rows
    bookings.forEach((b, i) => {
      const customer = [b.firstName, b.lastName].filter(Boolean).join(" ") || "N/A";
      const driver = b.assignedDriver?.name || "N/A";
      const service = b.service || "N/A";
      const date = b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "N/A";

      drawCell(startX, rowY, colWidths[0], rowHeight, i + 1);
      drawCell(startX + colWidths[0], rowY, colWidths[1], rowHeight, customer);
      drawCell(startX + colWidths[0] + colWidths[1], rowY, colWidths[2], rowHeight, driver);
      drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2], rowY, colWidths[3], rowHeight, service);
      drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], rowY, colWidths[4], rowHeight, date);

      rowY += rowHeight;

      // Handle page break
      if (rowY > 750) {
        doc.addPage();
        rowY = 50;
        // Redraw header on new page
        drawCell(startX, rowY, colWidths[0], rowHeight, "No", true);
        drawCell(startX + colWidths[0], rowY, colWidths[1], rowHeight, "Customer", true);
        drawCell(startX + colWidths[0] + colWidths[1], rowY, colWidths[2], rowHeight, "Driver", true);
        drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2], rowY, colWidths[3], rowHeight, "Service", true);
        drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], rowY, colWidths[4], rowHeight, "Date", true);

        rowY += rowHeight;
      }
    });

    // ===== FOOTER =====
    doc.moveTo(40, 770).lineTo(550, 770).strokeColor("#AAAAAA").lineWidth(1).stroke();
    doc.fontSize(10).fillColor("#555555").text(
      "Flyinco Travel & Tourism W.L.L • Luxury Chauffeur Services in Bahrain",
      0,
      780,
      { align: "center" }
    );

    doc.end(); // ✅ finishes writing PDF to buffer
  } catch (err) {
    console.error("❌ Report generation error:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ message: err.message, stack: err.stack });
    }
  }
});

export default router;
