// models/Subcategory.js
const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  name: { type: String, required: true },
  description: String,

  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }]
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
