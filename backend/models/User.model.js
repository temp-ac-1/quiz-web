import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  
  // Account verification & MFA
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },

  // Roles & permissions
  role: { type: String, enum: ["user", "admin", "superadmin"], default: "user" },

  // Profile info
  avatar: { type: String, default: "" },
  bio: { type: String, default: "" },

  // Security & activity tracking
  lastLogin: { type: Date },
  loginHistory: [
    {
      ip: String,
      userAgent: String,
      loginAt: { type: Date, default: Date.now }
    }
  ],

  // Password reset
  resetToken: { type: String },
  resetTokenExpiry: { type: Date }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
