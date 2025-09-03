// utils/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or use "smtp"
  auth: {
    user: process.env.EMAIL_USER, // e.g. limo@flyinco.com
    pass: process.env.EMAIL_PASS, // App password (not normal password)
  },
});

export const sendEmail = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: `"Flyinco Limo" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text, // fallback to plain text if no HTML
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
