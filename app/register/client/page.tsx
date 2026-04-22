"use client";

import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowLeft, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function RegisterClientPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: "CLIENT" }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Registration failed.");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 font-sans">
      <AnimatedBackground />

      <Link href="/register" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors bg-slate-900/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md z-20">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-blue-500/20 rounded-[2rem] p-8 shadow-2xl shadow-blue-500/10 relative z-10"
      >
        {/* Role Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-sm px-4 py-2 rounded-full">
            <Briefcase className="w-4 h-4" /> Client Account
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-white text-center mb-1">Create Account</h1>
        <p className="text-slate-400 text-center font-medium text-sm mb-8">
          Post tasks and hire top marketing experts.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-400 text-sm font-bold bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="text" value={form.name} onChange={set("name")} required
                placeholder="Your full name"
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="email" value={form.email} onChange={set("email")} required
                placeholder="you@example.com"
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="password" value={form.password} onChange={set("password")} required
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-300">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="password" value={form.confirm} onChange={set("confirm")} required
                placeholder="••••••••"
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <button disabled={loading} type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90 text-white font-bold text-lg py-3.5 rounded-xl flex items-center justify-center gap-2 mt-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            {loading ? "Creating account..." : "Create Client Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-slate-400 font-medium text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 font-bold hover:underline">Log In</Link>
        </div>
      </motion.div>
    </div>
  );
}
