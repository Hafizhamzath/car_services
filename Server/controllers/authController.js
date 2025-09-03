import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer.js"; // import mailer

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: "customer", // default role
    });

    if (user) {
      // Send welcome email
      await sendEmail(
        user.email,
        "Welcome to Flyinco Limo 🚘",
        `Hi ${user.firstName},\n\nWelcome to Flyinco! Your account has been created successfully.`,
        `<h2>Hi ${user.firstName},</h2>
         <p>Welcome to <b>Flyinco Limo</b>! 🚘<br/>We’re excited to have you on board.</p>`
      );

      res.status(201).json({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: err.message });
  }
};
