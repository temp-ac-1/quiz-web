// models/Category.js
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,

  subcategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }
  ],

  // Achievements specific to this category
  achievements: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Category", CategorySchema);
