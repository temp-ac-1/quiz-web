// models/UserProgress.js
const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },

  status: { type: String, enum: ["not-started", "in-progress", "completed"], default: "not-started" },
  score: { type: Number, default: 0 },
  earnedPoints: { type: Number, default: 0 },

  // track which quiz questions user has already answered (so no duplicate points)
  answeredQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
