"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Database,
  Search,
  ArrowRight,
  CheckCircle2,
  FolderTree,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
  SpringCard,
  SpringButton,
  watermelonSpring,
  watermelonGentleSpring,
} from "@/components/ui/motion";

export function LandingView({ user }: { user: User | null }) {
  return (
    <div className="min-h-screen bg-[#111113] text-[#ececed] flex flex-col selection:bg-white/20 selection:text-white">
      {/* ── Top Navigation Bar ────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...watermelonSpring, delay: 0.05 }}
        className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#111113]/85 backdrop-blur-md"
      >
        <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/5 font-mono text-sm font-bold text-white shadow-sm"
            >
              L
            </motion.div>
            <span className="text-base font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
              LooseNotion
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-xs font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#demo" className="hover:text-white transition-colors">
              Workspace
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            {user ? (
              <Link href="/workspace">
                <Button size="sm" className="h-8 gap-1.5 bg-white text-black hover:bg-zinc-200 text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Open Workspace <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-zinc-300 hover:text-white hover:bg-white/5">
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="h-8 gap-1.5 bg-white text-black hover:bg-zinc-200 text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Get started <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.header>

      {/* ── Hero Section (Full Viewport Focus) ─────────────────────────── */}
      <section className="relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center px-4 sm:px-6 py-12 text-center overflow-hidden">
        {/* Subtle Watermelon background ambient glow */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -z-10 -translate-x-1/2 w-[38rem] h-[22rem] bg-gradient-to-tr from-white/[0.04] to-zinc-500/[0.03] blur-3xl rounded-full pointer-events-none"
        />

        <FadeInStagger className="max-w-3xl mx-auto space-y-6">
          {/* Tag Pill */}
          <FadeInStaggerItem className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 shadow-sm"
            >
              <Sparkles className="h-3 w-3 text-zinc-400" />
              <span>Modern Notion clone with blocks & inline databases</span>
            </motion.div>
          </FadeInStaggerItem>

          {/* Main Headline */}
          <FadeInStaggerItem>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.12]">
              Write, plan, and organize.{" "}
              <span className="text-zinc-500 block mt-2">All in one workspace.</span>
            </h1>
          </FadeInStaggerItem>

          {/* Subtitle */}
          <FadeInStaggerItem>
            <p className="mx-auto max-w-xl text-sm text-zinc-400 sm:text-base leading-relaxed">
              A fast, distraction-free Notion alternative. Rich block editing, flexible inline databases, and nested organization.
            </p>
          </FadeInStaggerItem>

          {/* Action Buttons */}
          <FadeInStaggerItem>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {user ? (
                <Link href="/workspace" className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                    <Button size="lg" className="w-full sm:w-auto gap-2 bg-white text-black hover:bg-zinc-200 font-medium px-6 h-11 text-sm shadow-lg">
                      Go to Workspace <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link href="/signup" className="w-full sm:w-auto">
                    <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                      <Button size="lg" className="w-full sm:w-auto gap-2 bg-white text-black hover:bg-zinc-200 font-medium px-6 h-11 text-sm shadow-lg">
                        Get Started Free <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/login" className="w-full sm:w-auto">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10 hover:text-white h-11 px-5 text-sm">
                        Sign in
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </div>
          </FadeInStaggerItem>
        </FadeInStagger>

        {/* Scroll Cue */}
        <motion.a
          href="#demo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ y: 2 }}
          className="mt-14 inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <span>Explore workspace</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
        </motion.a>
      </section>

      {/* ── Workspace Showcase Section ───────────────────────────────── */}
      <section id="demo" className="border-t border-white/10 bg-[#0d0d0f] py-20">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <FadeIn className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Designed for flow and focus
            </h2>
            <p className="mt-2 text-xs text-zinc-400">
              Everything you need in a single, unified view.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={watermelonGentleSpring}
              className="rounded-xl border border-white/15 bg-[#161618] p-1.5 shadow-2xl watermelon-glow"
            >
              {/* Window Topbar */}
              <div className="flex items-center justify-between rounded-t-lg border-b border-white/10 bg-[#1c1c1f] px-3.5 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-500 hidden sm:inline-block">
                    loosenotion.app/workspace
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  <Search className="h-3 w-3" />
                  <span>Search pages... (Ctrl+K)</span>
                </div>
              </div>

              {/* Inner Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px] bg-[#141416] rounded-b-lg overflow-hidden">
                {/* Sidebar */}
                <div className="hidden md:flex md:col-span-4 lg:col-span-3 border-r border-white/10 bg-[#17171a] p-3 flex-col justify-between text-xs">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-1.5 rounded bg-white/5 font-medium text-zinc-200">
                      <div className="h-5 w-5 rounded bg-white text-black font-bold flex items-center justify-center text-[10px]">
                        W
                      </div>
                      <span className="truncate">My Workspace</span>
                    </div>

                    {/* Favorites */}
                    <div>
                      <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Favorites
                      </div>
                      <div className="mt-1 space-y-0.5">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="flex items-center gap-2 px-2 py-1 rounded bg-white/10 font-medium text-white cursor-pointer"
                        >
                          <span>🚀</span> Product Roadmap
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="flex items-center gap-2 px-2 py-1 rounded text-zinc-400 hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <span>📝</span> Meeting Notes
                        </motion.div>
                      </div>
                    </div>

                    {/* Pages Tree */}
                    <div>
                      <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Pages
                      </div>
                      <div className="mt-1 space-y-0.5 text-zinc-400">
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <ChevronRight className="h-3 w-3" /> <span>📚</span> Engineering Wiki
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <ChevronRight className="h-3 w-3" /> <span>📊</span> Sprint Board
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 2 }}
                          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <ChevronRight className="h-3 w-3" /> <span>💡</span> Ideas
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-white/10 text-zinc-500 text-[11px] flex items-center justify-between">
                    <span className="truncate">{user?.email ?? "mizanmuhammad20@gmail.com"}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>

                {/* Document & Database View */}
                <div className="col-span-1 md:col-span-8 lg:col-span-9 p-5 sm:p-6 flex flex-col justify-between overflow-x-auto">
                  <div className="space-y-4">
                    <div>
                      <span className="text-3xl">🚀</span>
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">
                        Product Roadmap & Tasks
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        Quarterly milestones, deliverable tracking, and live documentation.
                      </p>
                    </div>

                    {/* Database Table */}
                    <div className="rounded-lg border border-white/10 bg-[#18181b] overflow-hidden">
                      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 font-medium">
                        <div className="flex items-center gap-2">
                          <Database className="h-3.5 w-3.5" />
                          <span>Sprint Tasks</span>
                        </div>
                        <span className="text-[10px]">3 entries</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-white/5 text-zinc-400">
                              <th className="py-1.5 px-3 font-medium">Task</th>
                              <th className="py-1.5 px-3 font-medium">Status</th>
                              <th className="py-1.5 px-3 font-medium">Priority</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-zinc-300">
                            <motion.tr whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                              <td className="py-2 px-3 font-medium flex items-center gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Supabase Auth & RLS
                              </td>
                              <td className="py-2 px-3">
                                <span className="inline-flex rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                                  Done
                                </span>
                              </td>
                              <td className="py-2 px-3">
                                <span className="inline-flex rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-medium text-red-400">
                                  High
                                </span>
                              </td>
                            </motion.tr>
                            <motion.tr whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                              <td className="py-2 px-3 font-medium flex items-center gap-1.5">
                                <div className="h-3.5 w-3.5 rounded-full border-2 border-blue-400" /> Landing Page Optimization
                              </td>
                              <td className="py-2 px-3">
                                <span className="inline-flex rounded bg-blue-500/15 px-1.5 py-0.5 text-[10px] font-medium text-blue-400">
                                  Doing
                                </span>
                              </td>
                              <td className="py-2 px-3">
                                <span className="inline-flex rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
                                  Medium
                                </span>
                              </td>
                            </motion.tr>
                            <motion.tr whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                              <td className="py-2 px-3 font-medium flex items-center gap-1.5">
                                <div className="h-3.5 w-3.5 rounded-full border border-zinc-600" /> Export to Markdown & JSON
                              </td>
                              <td className="py-2 px-3">
                                <span className="inline-flex rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                                  Todo
                                </span>
                              </td>
                              <td className="py-2 px-3">
                                <span className="inline-flex rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                                  Low
                                </span>
                              </td>
                            </motion.tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Editor Snippet */}
                    <div className="rounded border border-white/10 bg-white/5 p-3 text-xs text-zinc-300 font-mono">
                      Type <span className="rounded bg-white/10 px-1 py-0.5 text-white font-semibold border border-white/15">/</span> for slash commands — insert headings, task lists, code blocks, or tables.
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-white/10">
                    <span>Autosaved</span>
                    <Link href="/workspace" className="text-zinc-300 hover:text-white font-medium flex items-center gap-1 transition-colors">
                      Open workspace <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ── Core Features Grid ───────────────────────────────────────── */}
      <section id="features" className="border-t border-white/10 py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <FadeIn className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Core Capabilities
            </h2>
            <p className="mt-2 text-xs text-zinc-400">
              Modular tools designed for focus and clarity.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FadeInStaggerItem>
              <SpringCard>
                <FileText className="h-5 w-5 text-white mb-2" />
                <h3 className="text-sm font-semibold text-white">Block Editor</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Headings, task lists, code snippets, and slash commands via Tiptap.
                </p>
              </SpringCard>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <SpringCard>
                <Database className="h-5 w-5 text-white mb-2" />
                <h3 className="text-sm font-semibold text-white">Inline Databases</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Custom column types including Text, Select tags, Status, and Priority.
                </p>
              </SpringCard>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <SpringCard>
                <FolderTree className="h-5 w-5 text-white mb-2" />
                <h3 className="text-sm font-semibold text-white">Nested Pages</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Infinite page nesting with drag-and-drop tree organization.
                </p>
              </SpringCard>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <SpringCard>
                <Search className="h-5 w-5 text-white mb-2" />
                <h3 className="text-sm font-semibold text-white">Instant Search</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Press Ctrl+K to search across all pages and databases instantly.
                </p>
              </SpringCard>
            </FadeInStaggerItem>
          </FadeInStagger>
        </div>
      </section>

      {/* ── FAQ Section ──────────────────────────────────────────────── */}
      <section id="faq" className="border-t border-white/10 bg-[#0d0d0f] py-14">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn className="text-center mb-8">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </FadeIn>

          <FadeInStagger className="space-y-3 text-xs">
            <FadeInStaggerItem>
              <div className="rounded-lg border border-white/10 bg-[#161619] p-4 transition-all hover:border-white/20">
                <h3 className="font-semibold text-white">How does LooseNotion compare to Notion?</h3>
                <p className="mt-1.5 text-zinc-400 leading-relaxed">
                  LooseNotion provides the essential features — document editing, inline databases, nested pages, and search — in a lightweight, fast, distraction-free workspace.
                </p>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="rounded-lg border border-white/10 bg-[#161619] p-4 transition-all hover:border-white/20">
                <h3 className="font-semibold text-white">Can I export my data?</h3>
                <p className="mt-1.5 text-zinc-400 leading-relaxed">
                  Yes. Built-in Markdown and JSON exporters allow you to back up or download your data at any time.
                </p>
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#0d0d0f] py-6 mt-auto">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded border border-white/15 bg-white/5 font-mono text-[10px] font-bold text-white">
              L
            </div>
            <span>LooseNotion</span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/login" className="hover:text-zinc-300 transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="hover:text-zinc-300 transition-colors">
              Sign up
            </Link>
            <Link href="/workspace" className="hover:text-zinc-300 transition-colors">
              Workspace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
