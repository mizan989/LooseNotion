"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { createClient } from "@/lib/client/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    if (!data.session) {
      setConfirmationSent(true);
      return;
    }
    router.push("/workspace");
    router.refresh();
  }

  if (confirmationSent) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 bg-[#0e0e11] text-zinc-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#161619]/90 p-8 text-center shadow-2xl backdrop-blur-xl"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MailCheck className="h-6 w-6" />
          </div>
          <h1 className="mb-2 text-xl font-bold tracking-tight text-white">Check your inbox</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            We sent a confirmation link to <span className="font-semibold text-zinc-200">{email}</span>. Click it, then sign in.
          </p>
          <Link href="/login" className="mt-6 inline-block">
            <Button size="sm" className="bg-white text-black hover:bg-zinc-200 text-xs font-medium px-4">
              Back to sign in
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 bg-[#0e0e11] text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
        className="w-full max-w-sm"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#161619]/90 p-7 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/5 font-mono text-xs font-bold text-white shadow-sm">
              L
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Create workspace</h1>
          </div>
          <p className="mb-6 text-xs text-zinc-400">Get started with your free LooseNotion workspace.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <motion.div whileFocus={{ scale: 1.01 }}>
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/30 border-white/10 text-xs h-10 focus-visible:ring-1 focus-visible:ring-white/30"
                required
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.01 }}>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/30 border-white/10 text-xs h-10 focus-visible:ring-1 focus-visible:ring-white/30"
                required
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.01 }}>
              <Input
                type="password"
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/30 border-white/10 text-xs h-10 focus-visible:ring-1 focus-visible:ring-white/30"
                minLength={6}
                required
              />
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: [0, -4, 4, -4, 0] }}
                transition={{ duration: 0.3 }}
                className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-2"
              >
                {error}
              </motion.p>
            )}

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-white text-black hover:bg-zinc-200 font-medium text-xs shadow-md mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Creating account...
                  </span>
                ) : (
                  "Create free workspace"
                )}
              </Button>
            </motion.div>
          </form>

          <p className="mt-5 text-center text-xs text-zinc-500">
            Already have an account?{" "}
            <Link href="/login" className="text-zinc-300 hover:text-white underline underline-offset-4 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
