// models/Quiz.js
import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },

  type: { type: String, enum: ["mcq", "true_false", "fill_blank", "scenario", "practical"] },

  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // linked questions

  timeLimit: { type: Number },   // in minutes
  passingScore: { type: Number }, // e.g., 70 (%)

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quiz", QuizSchema);
