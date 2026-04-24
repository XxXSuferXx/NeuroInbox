import { Profile } from "passport-google-oauth20";

declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email?: string;
      picture?: string;
      accesstoken:string;
      refreshtoken:string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    passport?: {
      user: {
        id: string;
        name: string;
        email?: string;
        accesstoken?: string;
        refreshtoken?: string;
      };
    };
  }
}