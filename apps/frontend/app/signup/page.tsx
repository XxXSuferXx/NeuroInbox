"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/redux-hook";
import { AuthShell } from "@/components/custom/AuthShell";

const GOOGLE_AUTH_URL = "http://localhost:3001/email/google/login";

export default function SignUpPage() {
  const isAuth = useAppSelector((state) => state.UserAuth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.replace("/dashboard");
    }
  }, [isAuth, router]);

  const handleAuthenticate = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  if (isAuth) {
    return null;
  }

  return <AuthShell mode="signup" onAuthenticate={handleAuthenticate} />;
}
