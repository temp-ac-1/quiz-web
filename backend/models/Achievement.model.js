// models/Achievement.js
const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // optional
  points: { type: Number, default: 0 },
  badgeIcon: String // image url for badge
});

module.exports = mongoose.model("Achievement", achievementSchema);
