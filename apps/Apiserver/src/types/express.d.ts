import { Profile } from "passport-google-oauth20";

declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email?: string;
      picture?: string;
    }
  }
}