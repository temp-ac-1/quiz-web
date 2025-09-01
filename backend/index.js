// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import "./config/passport.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(session({
  secret: "oauth-temp-secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
