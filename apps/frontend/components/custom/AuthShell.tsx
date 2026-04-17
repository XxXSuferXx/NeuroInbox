"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Inbox,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/custom/GoogleIcon";

type AuthShellProps = {
  mode: "signin" | "signup";
  onAuthenticate: () => void;
};

const content = {
  signin: {
    eyebrow: "Welcome back",
    title: "Open your AI-powered email workspace.",
    description:
      "Sign in with your existing Google flow and continue from the redesigned dashboard without changing the auth logic behind it.",
    action: "Continue with Google",
    footerLabel: "Need an account?",
    footerLink: "/signup",
    footerCopy: "Create one",
  },
  signup: {
    eyebrow: "Start now",
    title: "Create your NeuroInbox workspace in one step.",
    description:
      "Use the same working Google auth entrypoint to create an account and jump directly into the new AI-first inbox experience.",
    action: "Create with Google",
    footerLabel: "Already have an account?",
    footerLink: "/signin",
    footerCopy: "Sign in",
  },
} as const;

export function AuthShell({ mode, onAuthenticate }: AuthShellProps) {
  const copy = content[mode];

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
      <div className="ambient-orb ambient-orb--teal left-[-6rem] top-[10rem] h-72 w-72" />
      <div className="ambient-orb ambient-orb--blue right-[-4rem] top-[14rem] h-64 w-64" />

      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card/80 text-primary shadow-sm">
            <Inbox className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              NeuroInbox
            </p>
            <p className="text-base font-semibold text-foreground">
              AI-first email workspace
            </p>
          </div>
        </Link>

        <Button asChild variant="ghost" className="rounded-full px-5">
          <Link href="/">Back to home</Link>
        </Button>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="surface-panel overflow-hidden p-8 sm:p-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>{copy.eyebrow}</span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {copy.description}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Existing OAuth",
                note: "No backend auth changes",
              },
              {
                icon: CheckCircle2,
                title: "One-click entry",
                note: "Google account connection",
              },
              {
                icon: Inbox,
                title: "Instant workspace",
                note: "Land straight in dashboard",
              },
            ].map((item) => (
              <div key={item.title} className="surface-muted p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="surface-panel p-8 sm:p-10"
        >
          <div className="rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-muted-foreground">
            Secure Google sign in
          </div>

          <h2 className="mt-6 text-3xl font-semibold text-foreground">
            {mode === "signin"
              ? "Continue to dashboard"
              : "Create your account"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            We’re keeping the authentication logic exactly where it already
            works. This refresh focuses on the product experience around it.
          </p>

          <Button
            onClick={onAuthenticate}
            size="lg"
            className="mt-8 h-14 w-full justify-between rounded-[20px] px-5 text-base"
          >
            <span className="flex items-center gap-3">
              <GoogleIcon />
              {copy.action}
            </span>
            <ArrowRight className="h-5 w-5" />
          </Button>

          <div className="mt-8 rounded-[24px] border border-border/70 bg-background/70 p-5">
            <p className="text-sm font-medium text-foreground">
              What you’ll get
            </p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Modern landing, dashboard, and chat surfaces with professional
                  motion design.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Clearer visual hierarchy modeled after best-in-class
                  conversational AI interfaces.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  Preserved login behavior so the flow still works the way your
                  backend expects.
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {copy.footerLabel}{" "}
            <Link
              href={copy.footerLink}
              className="font-semibold text-foreground hover:text-primary"
            >
              {copy.footerCopy}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
