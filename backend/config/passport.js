// config/passport.js
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.model.js";

const generateToken = (id) => {
    return jwt.sign(
      { id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        issuer: "cyberveer-website",
        audience: "cyberveer-users"
      }
    );
  };


  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        // Create new user
        user = await User.create({
          email,
          name: profile.displayName,
          isVerified: true, // social logins are usually auto-verified
          avatar: profile.photos[0]?.value || "",
          password: undefined, // or leave blank and prevent local login for this user
          provider: "google",
        });
      }
  
      // ✅ Generate JWT for this user
      const token = generateToken(user._id);
  
      // ✅ Attach user object and token to `req.user`
      done(null, { user, token });
  
    } catch (err) {
      done(err, null);
    }
  }));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ["user:email"]
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // GitHub may not give email directly in `profile.emails`
      const email = profile.emails?.[0]?.value || `${profile.username}@github-temp.com`;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        user = await User.create({
          email,
          name: profile.displayName || profile.username,
          isVerified: true,
          avatar: profile.photos?.[0]?.value || "",
          password: undefined,
          provider: "github",
        });
      }
  
      const token = generateToken(user._id);
      done(null, { user, token });
  
    } catch (err) {
      done(err, null);
    }
  }));