const express = require("express");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const router = express.Router();

// Dummy DB logic (replace with real DB calls)
const getUserById = async (userId) => {
  return { name: "John Doe" }; // Replace with actual user name from DB
};

const getCourseById = async (courseId) => {
  return { title: "Node.js Complete Mastery" }; // Replace with actual course title from DB
};

router.get("/generate/:userId/:courseId", async (req, res) => {
  const { userId, courseId } = req.params;

  const user = await getUserById(userId);
  const course = await getCourseById(courseId);

  const certificateId = `${userId}-${courseId}-${Date.now()}`;
  const qrData = `http://localhost:3000/api/certificates/validate/${certificateId}`;
  const qrImage = await QRCode.toDataURL(qrData);

  const doc = new PDFDocument({ size: "A4", layout: "landscape" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=certificate-${userId}.pdf`);

  // Background
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#e0f7fa");
  doc.fillColor("#000");

  // Certificate Title
  doc
    .font("Helvetica-Bold")
    .fontSize(40)
    .fillColor("#0d47a1")
    .text("🎓 Certificate of Completion", {
      align: "center",
      underline: true,
    });

  doc.moveDown(2);

  // Learner Name
  doc
    .font("Helvetica-Bold")
    .fontSize(32)
    .fillColor("#004d40")
    .text(`${user.name}`, { align: "center" });

  doc
    .font("Helvetica")
    .fontSize(20)
    .fillColor("#333")
    .text(`has successfully completed the course`, { align: "center" });

  // Course Title
  doc
    .font("Helvetica-Bold")
    .fontSize(26)
    .fillColor("#1b5e20")
    .text(`"${course.title}"`, { align: "center" });

  doc.moveDown();

  // Certificate ID
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#555")
    .text(`Certificate ID: ${certificateId}`, { align: "center" });

  // QR Code
  doc.image(qrImage, doc.page.width - 140, doc.page.height - 140, {
    fit: [100, 100],
    align: "center",
    valign: "bottom",
  });

  // Date & Signature
  const date = new Date().toLocaleDateString();
  doc
    .font("Helvetica")
    .fontSize(14)
    .fillColor("#000")
    .text("Date: " + date, 60, doc.page.height - 100);
  doc
    .moveTo(60, doc.page.height - 70)
    .lineTo(250, doc.page.height - 70)
    .stroke();
  doc.text("Authorized Signature", 60, doc.page.height - 60);

  doc.end();
  doc.pipe(res);
});

router.get("/validate/:certificateId", (req, res) => {
  const { certificateId } = req.params;
  res.send(`✅ Certificate ID: ${certificateId} is valid.`);
});

module.exports = router;
