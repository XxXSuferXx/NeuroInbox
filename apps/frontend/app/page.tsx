"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  ChevronRight,
  Clock3,
  Command,
  Inbox,
  Layers3,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  Users2,
  WandSparkles,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
};

type Plan = {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  featured?: boolean;
};

const features: Feature[] = [
  {
    icon: Bot,
    title: "AI inbox triage",
    description:
      "Surface urgent threads, draft replies, and keep routine follow-ups moving without context switching.",
    accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
  {
    icon: Command,
    title: "Command-first workflows",
    description:
      "Run inbox actions through a clean chat command layer so power users can move faster than traditional email tools.",
    accent: "from-sky-500/20 via-sky-500/5 to-transparent",
  },
  {
    icon: Layers3,
    title: "Multi-account control",
    description:
      "Manage personal, team, and client inboxes from one workspace with clear context boundaries.",
    accent: "from-amber-500/20 via-amber-500/5 to-transparent",
  },
  {
    icon: Workflow,
    title: "Human + AI collaboration",
    description:
      "Keep approvals, escalations, and notes in the same thread so your team never loses the reasoning behind an action.",
    accent: "from-rose-500/20 via-rose-500/5 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Operational visibility",
    description:
      "Track backlog risk, first-response time, and queue health in a dashboard built for daily operations.",
    accent: "from-cyan-500/20 via-cyan-500/5 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "Professional by default",
    description:
      "A restrained, secure workspace aesthetic that feels credible for clients, operators, and executives alike.",
    accent: "from-slate-500/20 via-slate-500/5 to-transparent",
  },
];

const workflow = [
  {
    step: "01",
    title: "Connect your inboxes",
    copy: "Use the existing Google auth flow to bring accounts in without breaking your current login experience.",
  },
  {
    step: "02",
    title: "Brief the copilot once",
    copy: "Tell NeuroInbox how to prioritize, draft, or summarize. The assistant keeps thread context available as you work.",
  },
  {
    step: "03",
    title: "Operate from one workspace",
    copy: "Review flagged threads, send polished replies, and watch queue health from a dashboard designed for real inbox operations.",
  },
];

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    subtitle: "For solo operators exploring the workspace.",
    features: [
      "Single connected account",
      "Core chat workflow",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: "$24",
    subtitle: "For consultants and founders managing multiple inboxes.",
    features: [
      "Unlimited threads",
      "Priority queue insights",
      "Smart reply workflows",
      "Shared notes",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "$79",
    subtitle: "For teams running support, sales, or exec inbox operations.",
    features: [
      "Team collaboration",
      "SLA visibility",
      "Custom playbooks",
      "Priority support",
    ],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        "mx-auto max-w-3xl space-y-4",
        align === "center" ? "text-center" : "text-left",
      )}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="text-lg leading-8 text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function WorkspacePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="ambient-orb ambient-orb--teal -left-10 top-10 h-44 w-44" />
      <div className="ambient-orb ambient-orb--blue -right-6 bottom-8 h-36 w-36" />

      <div className="surface-panel shimmer-border relative overflow-hidden p-3">
        <div className="flex items-center justify-between rounded-[22px] border border-border/70 bg-background/65 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="rounded-full border border-border/70 bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground">
            neuroinbox.app
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="surface-muted hidden flex-col gap-3 p-4 lg:flex">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Conversations</p>
              <div className="rounded-full bg-primary/12 px-2 py-1 text-xs text-primary">
                18 active
              </div>
            </div>
            {[
              "CEO follow-up",
              "Priority support queue",
              "Launch partner outreach",
              "Billing exceptions",
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.08, duration: 0.45 }}
                className={cn(
                  "rounded-2xl border px-3 py-3 text-sm",
                  index === 0
                    ? "border-primary/20 bg-primary/10 text-foreground"
                    : "border-border/70 bg-card/65 text-muted-foreground",
                )}
              >
                {item}
              </motion.div>
            ))}
          </div>

          <div className="surface-muted overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  NeuroInbox Copilot
                </p>
                <h3 className="text-xl font-semibold text-foreground">
                  Inbox ops for Acme Ventures
                </h3>
              </div>
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Live queue synced
              </div>
            </div>

            <div className="space-y-4 px-5 py-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.45 }}
                className="max-w-[78%] rounded-[24px] rounded-bl-md border border-border/70 bg-card/75 p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Assistant
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground">
                  I found 6 high-priority threads, drafted replies for 3, and
                  queued 2 follow-up reminders. Want the executive summary or
                  the draft set first?
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.68, duration: 0.45 }}
                className="ml-auto max-w-[72%] rounded-[24px] rounded-br-md bg-primary px-4 py-4 text-primary-foreground shadow-lg"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/70">
                  You
                </p>
                <p className="mt-2 text-sm leading-7">
                  Summarize the urgent threads, then prep replies in a calm
                  executive tone.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82, duration: 0.45 }}
                className="grid gap-3 md:grid-cols-3"
              >
                {[
                  {
                    label: "Urgent now",
                    value: "06",
                    tone: "text-rose-600 dark:text-rose-300",
                  },
                  {
                    label: "Replies drafted",
                    value: "14",
                    tone: "text-emerald-600 dark:text-emerald-300",
                  },
                  {
                    label: "Avg. response",
                    value: "12m",
                    tone: "text-sky-600 dark:text-sky-300",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-border/70 bg-card/80 p-4"
                  >
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <p className={cn("mt-2 text-3xl font-semibold", item.tone)}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="border-t border-border/70 bg-card/60 px-5 py-4">
              <div className="flex items-center gap-3 rounded-[24px] border border-border/80 bg-background/80 p-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Send className="h-5 w-5" />
                </div>
                <p className="flex-1 text-sm text-muted-foreground">
                  Ask about email priorities, draft responses, or run a workflow
                  command.
                </p>
                <div className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Send
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, description, accent }: Feature) {
  return (
    <motion.div
      variants={reveal}
      className="surface-panel group relative overflow-hidden p-6"
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <div
        className={cn("absolute inset-0 bg-gradient-to-br opacity-80", accent)}
      />
      <div className="relative">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-card/90 text-primary shadow-sm">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden background">
      <Header />
      <div className="ambient-orb ambient-orb--teal left-[-7rem] top-[8rem] h-72 w-72" />
      <div className="ambient-orb ambient-orb--blue right-[-4rem] top-[12rem] h-64 w-64" />
      <div className="ambient-orb ambient-orb--amber bottom-[18rem] left-[18%] h-52 w-52" />

      <main>
        <section className="animated-bg relative px-6 pb-24 pt-36 sm:px-8 lg:px-10 lg:pb-32 lg:pt-40">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.div
                variants={reveal}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Redesigned for AI-first inbox operations</span>
              </motion.div>

              <motion.h1
                variants={reveal}
                className="mt-8 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              >
                The professional inbox workspace that feels as polished as your
                AI stack.
              </motion.h1>

              <motion.p
                variants={reveal}
                className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl"
              >
                NeuroInbox blends a premium landing experience with a clean,
                modern AI workspace for triage, drafting, and email operations.
                The result feels closer to ChatGPT, Gemini, and Claude than a
                typical admin panel.
              </motion.p>

              <motion.div
                variants={reveal}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  asChild
                  size="lg"
                  className="btn-glow rounded-full px-7 text-base"
                >
                  <Link href="/signin">
                    Launch workspace
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-7 text-base"
                >
                  <Link href="#workspace">
                    Preview interface
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                variants={reveal}
                className="mt-10 grid gap-3 sm:grid-cols-3"
              >
                {[
                  { label: "Faster triage", value: "4.2x" },
                  { label: "Draft quality", value: "94%" },
                  { label: "Context retention", value: "Always-on" },
                ].map((item) => (
                  <div key={item.label} className="surface-muted p-4">
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={reveal}
                className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2">
                  <Inbox className="h-4 w-4 text-primary" />
                  Multi-account inboxes
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2">
                  <MessageSquareText className="h-4 w-4 text-primary" />
                  AI-native conversation flow
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Existing auth logic preserved
                </div>
              </motion.div>
            </motion.div>

            <WorkspacePreview />
          </div>
        </section>

        <section id="features" className="px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Platform capabilities"
              title="A sharper visual identity and a more credible product experience."
              description="The redesign emphasizes calm surfaces, focused typography, and motion that supports comprehension instead of distracting from it."
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </motion.div>
          </div>
        </section>

        <section id="workflow" className="px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow="Workflow"
              title="Built for the way AI operators actually work."
              description="Instead of forcing users through email-era UX, the new experience organizes work the way modern chat copilots do: one clean conversation surface, contextual side panels, and a clear action hierarchy."
              align="left"
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4"
            >
              {workflow.map((item) => (
                <motion.div
                  key={item.step}
                  variants={reveal}
                  className="surface-panel flex gap-5 p-6"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {item.copy}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="workspace" className="px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Workspace preview"
              title="A dashboard and chat interface designed to feel native to modern AI products."
              description="The new dashboard combines a polished chat surface with queue insights, conversation history, and operational side panels so the product looks and behaves like a serious platform."
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="mt-14 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]"
            >
              <motion.div
                variants={reveal}
                className="surface-panel overflow-hidden p-6"
              >
                <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="surface-muted p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Chat workspace
                        </p>
                        <h3 className="text-2xl font-semibold text-foreground">
                          Claude-clean composition, tuned for inbox tasks
                        </h3>
                      </div>
                      <div className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
                        Framer Motion powered
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      {[
                        "Calm, neutral canvas with high-contrast content hierarchy",
                        "Suggested prompts and context cards before the first message",
                        "Modern message bubbles with cleaner spacing and composer layout",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/80 px-4 py-4"
                        >
                          <WandSparkles className="mt-0.5 h-4 w-4 text-primary" />
                          <p className="text-sm leading-7 text-muted-foreground">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="surface-muted p-5">
                    <p className="text-sm text-muted-foreground">
                      Operations rail
                    </p>
                    <div className="mt-5 space-y-4">
                      {[
                        {
                          icon: Clock3,
                          title: "SLA risk",
                          note: "2 threads need a response in the next 18 minutes.",
                        },
                        {
                          icon: Users2,
                          title: "Stakeholders",
                          note: "VIP senders surfaced with recent account context.",
                        },
                        {
                          icon: Inbox,
                          title: "Connected inboxes",
                          note: "3 Google accounts ready to search, draft, and triage.",
                        },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-border/70 bg-card/80 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                              <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">
                                {item.title}
                              </p>
                              <p className="text-sm leading-6 text-muted-foreground">
                                {item.note}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={reveal} className="surface-panel p-6">
                <p className="text-sm text-muted-foreground">What changed</p>
                <div className="mt-5 space-y-4">
                  {[
                    "Landing page upgraded from generic gradient marketing to a more premium product narrative.",
                    "Dashboard reframed as an AI workspace with stronger information architecture.",
                    "Chat section redesigned to resemble best-in-class conversational interfaces while staying product-specific.",
                    "Auth pathways kept intact so sign in remains functional and predictable.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border/70 bg-card/75 px-4 py-4 text-sm leading-7 text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Pricing"
              title="Simple plans, clearer positioning."
              description="The pricing section now matches the rest of the design language with cleaner card hierarchy and a more polished conversion path."
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-14 grid gap-5 lg:grid-cols-3"
            >
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  variants={reveal}
                  className={cn(
                    "surface-panel flex h-full flex-col p-6",
                    plan.featured
                      ? "border-primary/30 ring-1 ring-primary/20"
                      : undefined,
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {plan.name}
                      </p>
                      <p className="mt-2 text-4xl font-semibold text-foreground">
                        {plan.price}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {plan.subtitle}
                      </p>
                    </div>
                    {plan.featured ? (
                      <div className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
                        Most popular
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    variant={plan.featured ? "default" : "secondary"}
                    className="mt-8 rounded-full"
                  >
                    <Link href="/signup">
                      Choose {plan.name}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            className="mx-auto max-w-7xl"
          >
            <div className="surface-panel overflow-hidden p-8 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Ready to launch
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    Give NeuroInbox a landing page and workspace that finally
                    match the product ambition.
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                    The redesign keeps the existing auth flow functional while
                    delivering a more professional first impression and a
                    cleaner AI-native experience after sign-in.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Button
                    asChild
                    size="lg"
                    className="btn-glow rounded-full px-7 text-base"
                  >
                    <Link href="/signin">
                      Open dashboard
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="rounded-full px-7 text-base"
                  >
                    <Link href="/signup">Create account</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
