import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { google } from "googleapis";

dotenv.config();

const Auth = express.Router();
export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    process.env.Callback
);
const passportClient=  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      callbackURL: process.env.Callback as string
    },
    (accesstoken:string,refreshtoken:string,profile:Profile,done:VerifyCallback) => {
         const user: Express.User = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        accesstoken:accesstoken,
        refreshtoken:refreshtoken
      };
      return done(null, user);
    }
  );
/* ---------------- GOOGLE STRATEGY ---------------- */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_SECRET) {
  throw new Error("Missing Google OAuth credentials");
}

passport.use(passportClient);

/* ---------------- SERIALIZE ---------------- */

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

/* ---------------- ROUTES ---------------- */

Auth.get(
  "/login",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/gmail.modify"
    ],
    accessType: "offline",
    prompt: "consent",
  })
);

Auth.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env['FRONTEND_URL']}/login`, 
    //change this for prod
  }),
  (req, res) => {
    const user = req.user;
    if(user){
     oauth2Client.setCredentials({
      access_token: user.accesstoken,
      refresh_token: user.refreshtoken,
     });
       req.session.save(()=>{
    res.redirect(`${process.env['FRONTEND_URL']}/dashboard`); 
    })
    }
    //change this for prod
  }
); 
    //change this for prod
Auth.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

export default Auth;