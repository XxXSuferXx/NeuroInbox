"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BellDot,
  ChevronRight,
  Command,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hooks/redux-hook";
import { cn } from "@/lib/utils";

type HeaderProps = {
  variant?: "landing" | "dashboard";
  onMenuClick?: () => void;
};

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
  { href: "#workspace", label: "Workspace" },
  { href: "#pricing", label: "Pricing" },
];

const DashboardControls = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const userName =
    useAppSelector((state) => state.UserAuth.name) || "Workspace";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {onMenuClick ? (
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card/80 text-foreground shadow-sm backdrop-blur xl:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      ) : null}

      <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/75 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur lg:flex">
        <Search className="h-4 w-4" />
        <span>Search conversations, commands, or people</span>
        <span className="rounded-full border border-border/80 px-2 py-0.5 font-mono text-[11px] text-foreground/70">
          /
        </span>
      </div>

      <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300 md:flex">
        <ShieldCheck className="h-4 w-4" />
        <span>Inbox sync healthy</span>
      </div>

      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card/80 text-foreground shadow-sm backdrop-blur"
        aria-label="Notifications"
      >
        <BellDot className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-3 rounded-full border border-border/70 bg-card/85 px-2 py-2 pr-4 shadow-sm backdrop-blur">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {userInitial}
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-foreground">{userName}</p>
          <p className="text-xs text-muted-foreground">NeuroInbox workspace</p>
        </div>
      </div>
    </div>
  );
};

export function Header({ variant = "landing", onMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-[120] px-4 pt-4 sm:px-6 lg:px-8",
        variant === "dashboard" ? "pointer-events-none" : undefined,
      )}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] border px-4 py-3 shadow-[0_24px_80px_-50px_rgba(16,32,51,0.5)] backdrop-blur-xl sm:px-5",
          isScrolled || variant === "dashboard"
            ? "border-white/55 bg-white/72 dark:border-white/8 dark:bg-[#0c1723]/88"
            : "border-white/35 bg-white/56 dark:border-white/6 dark:bg-[#0c1723]/72",
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -6, scale: 1.05 }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-card/80 shadow-sm"
          >
            <Image
              src="/favicon.png"
              alt="NeuroInbox logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </motion.div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
              NeuroInbox
            </p>
            <p className="text-base font-semibold text-foreground">
              AI-first email workspace
            </p>
          </div>
        </Link>

        {variant === "landing" ? (
          <>
            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2 text-sm text-muted-foreground md:flex">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Built for focused inbox operations</span>
              </div>

              <Button asChild variant="ghost" className="rounded-full px-5">
                <Link href="/signin">Sign in</Link>
              </Button>

              <Button asChild className="btn-glow rounded-full px-5">
                <Link href="/signup">
                  Get started
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <DashboardControls onMenuClick={onMenuClick} />
        )}
      </div>

      {variant === "dashboard" ? (
        <div className="pointer-events-none mt-4 hidden justify-center xl:flex">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <Command className="h-4 w-4 text-primary" />
            <span>NeuroInbox Copilot</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Ready</span>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}
