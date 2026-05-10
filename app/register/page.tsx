"use client";

import { motion } from "framer-motion";
import { Briefcase, Megaphone, ShieldAlert, ArrowLeft, ArrowRight, ShieldCheck, UserCircle, UserCog } from "lucide-react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function RegisterSelection() {
  const roles = [
    { id: "client", title: "Client", desc: "I want to hire marketing experts for my business.", icon: <Briefcase className="w-8 h-8" />, color: "border-blue-500/30 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20", restricted: false, link: "/register/client" },
    { id: "marketer", title: "Marketer", desc: "I want to offer my marketing services and grow my career.", icon: <Megaphone className="w-8 h-8" />, color: "border-accent/30 text-accent bg-accent/10 hover:bg-accent/20", restricted: false, link: "/register/marketer" },
    { id: "admin", title: "Admin", desc: "Restricted access for platform administrators only.", icon: <ShieldAlert className="w-8 h-8" />, color: "border-white/5 text-slate-500 bg-slate-900/50 cursor-not-allowed opacity-60", restricted: true, link: "#" },
  ];
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 font-sans" dir="rtl">
      <AnimatedBackground />
      
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors bg-slate-900/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
        <ArrowRight className="w-4 h-4" /> العودة للرئيسية
      </Link>

      <div className="max-w-5xl w-full mx-auto relative z-10 text-center">
         <div className="text-center space-y-6 max-w-2xl mx-auto mb-20 relative z-20">
             <div className="flex justify-center mb-2">
               <div className="relative w-20 h-20 flex items-center justify-center">
                 <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 drop-shadow-2xl hover:-translate-y-1 transition-all duration-300">
                   <path d="M50 15 L85 35 L50 55 L15 35 L50 15Z" fill="url(#layer1_reg)" />
                   <path d="M15 45 L50 65 L85 45 L85 57 L50 77 L15 57 Z" fill="url(#layer2_reg)" />
                   <path d="M15 67 L50 87 L85 67 L85 79 L50 99 L15 79 Z" fill="url(#layer3_reg)" />
                   <defs>
                     <linearGradient id="layer1_reg" x1="15" y1="15" x2="85" y2="55">
                       <stop stopColor="#60A5FA" />
                       <stop offset="1" stopColor="#2563EB" />
                     </linearGradient>
                     <linearGradient id="layer2_reg" x1="15" y1="45" x2="85" y2="77">
                       <stop stopColor="#A78BFA" />
                       <stop offset="1" stopColor="#7C3AED" />
                     </linearGradient>
                     <linearGradient id="layer3_reg" x1="15" y1="67" x2="85" y2="99">
                       <stop stopColor="#F472B6" />
                       <stop offset="1" stopColor="#E11D48" />
                     </linearGradient>
                   </defs>
                 </svg>
               </div>
             </div>
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 text-secondary shadow-[0_0_20px_rgba(110,205,244,0.15)]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide uppercase">التسجيل الموحد</span>
             </div>
             <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                كيف تود الانضمام؟
             </h1>
             <p className="text-xl text-slate-400 font-medium">اختر بوابتك إلى نظام تاسك ميديا البيئي الاستراتيجي.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
             {/* Client Card */}
             <div className="p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-accent/50 hover:bg-slate-900/60 transition-all flex flex-col group h-full">
                <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center mb-8 border border-accent/20 group-hover:scale-110 transition-transform">
                   <UserCircle className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">عميل استراتيجي</h2>
                <p className="text-slate-400 mb-8 flex-1">اكتشف أفضل المواهب التسويقية وأطلق حملات عالية التأثير مع إشراف ومتابعة كاملة.</p>
                <Link href="/register/client" className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-accent hover:border-accent transition-all">
                   دخول كعميل
                </Link>
             </div>

             {/* Marketer Card */}
             <div className="p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-secondary/50 hover:bg-slate-900/60 transition-all flex flex-col group h-full shadow-[0_0_40px_rgba(110,205,244,0.05)]">
                <div className="w-20 h-20 rounded-3xl bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/20 group-hover:scale-110 transition-transform">
                   <Briefcase className="w-10 h-10 text-secondary" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">خبير تسويق</h2>
                <p className="text-slate-400 mb-8 flex-1">انضم كشريك استراتيجي معتمد. اعرض محفظة أعمالك وتعاون مع علامات تجارية كبرى.</p>
                <Link href="/register/marketer" className="w-full py-4 rounded-2xl bg-gradient-to-r from-secondary to-blue-500 text-white font-bold text-center hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-secondary/20">
                   انضم كخبير
                </Link>
             </div>

             {/* Admin Card */}
             <div className="p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all flex flex-col group h-full">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                   <UserCog className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">مدير النظام</h2>
                <p className="text-slate-400 mb-8 flex-1">إشراف شامل على النظام. تتبع المقاييس الحيوية، إدارة المستخدمين، وضمان الجودة المستمرة.</p>
                <Link href="/register/admin" className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-emerald-500 hover:border-emerald-500 transition-all">
                   دخول للإدارة
                </Link>
             </div>
          </div>

         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.6 }}
           className="mt-12 text-slate-400 font-medium"
         >
           لديك حساب بالفعل؟ <Link href="/login" className="text-secondary font-bold hover:underline">تسجيل الدخول</Link>
         </motion.div>
      </div>
    </div>
  );
}
