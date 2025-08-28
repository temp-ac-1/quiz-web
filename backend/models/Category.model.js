// models/Category.js
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },   // e.g., "Network Security"
  slug: { type: String, required: true, unique: true },   // e.g., "network-security"
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Category", CategorySchema);
