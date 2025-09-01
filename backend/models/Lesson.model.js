// models/Lesson.js
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
  title: { type: String, required: true },
  content: String, // could be markdown, html, video link
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model("Lesson", lessonSchema);
