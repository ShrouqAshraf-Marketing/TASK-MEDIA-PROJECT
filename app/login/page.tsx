"use client";

import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div dir="rtl" className="min-h-screen relative flex items-center justify-center p-6 font-sans">
      <AnimatedBackground />

      <Link href="/" className="absolute top-8 right-8 flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors bg-slate-900/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md z-20">
        <ArrowRight className="w-4 h-4 ml-2" /> العودة للرئيسية
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-6">
           <img src="/logo.png" alt="Task Media Logo" className="w-16 h-16 drop-shadow-md" style={{ objectFit: 'contain' }} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-white text-center mb-2">تسجيل الدخول</h1>
        <p className="text-slate-400 text-center font-medium mb-8">مرحباً بك مجدداً في منصة تاسك ميديا</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="text-red-400 text-sm font-bold bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</div>}
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-300 pr-1">البريد الإلكتروني</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Mail className="w-5 h-5 text-slate-500" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="اسمك@example.com" 
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                dir="ltr"
                style={{ textAlign: 'right' }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between pr-1">
              <label className="text-sm font-bold text-slate-300">كلمة المرور</label>
              <Link href="#" className="text-xs font-bold text-secondary hover:underline">هل نسيت كلمة المرور؟</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Lock className="w-5 h-5 text-slate-500" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••" 
                className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                dir="ltr"
                style={{ textAlign: 'right' }}
              />
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-bold text-lg py-3.5 rounded-xl flex items-center justify-center gap-2 mt-8 shadow-lg shadow-secondary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100">
             <LogIn className="w-5 h-5 ml-1" /> {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-400 font-medium text-sm">
          ليس لديك حساب؟ <Link href="/register" className="text-secondary font-bold hover:underline">إنشاء حساب جديد</Link>
        </div>
      </motion.div>
    </div>
  );
}
