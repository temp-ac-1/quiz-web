// routes/auth.route.js
import express from "express";
import passport from "passport";
import { oauthSuccess } from "../controllers/auth.controller.js";

const router = express.Router();

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    accessType: "offline",
    responseType: "code",
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { token } = req.user; // ✅ token from Google strategy
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

// GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie("connect.sid"); // if using cookie-session
    res.redirect(process.env.CLIENT_URL + "/login");
  });
});

export default router;
