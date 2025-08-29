import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.model.js";

// Setup mail transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
      issuer: "cybersec-website",
      audience: "cybersec-users"
    }
  );
};

//jwt verify
// jwt.verify(token, process.env.JWT_SECRET, {
//   issuer: "cybersec-website",
//   audience: "cybersec-users"
// });



// 📌 Register User
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Password Strength Validation
    const isStrongPassword = (password) => {
      const strongRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongRegex.test(password);
    };

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 chars long, include uppercase, lowercase, number, and special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

    const user = await User.create({
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account",
      text: `Your OTP is ${otp}. It expires in 15 minutes.`,
    });

    res
      .status(201)
      .json({ message: "User registered. Please verify your email with OTP." });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

// 📌 Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

// 📌 Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email before login" });
    }

    const token = generateToken(user._id);
    res.json({ token, message: "Login successful" });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
