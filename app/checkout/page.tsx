"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, CreditCard, ShieldCheck, 
  ArrowLeft, Send, Sparkles, Zap
} from "lucide-react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useLanguage } from "@/components/LanguageContext";
import { useToast } from "@/components/ToastContext";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const marketerId = searchParams.get("marketer");
  const { t } = useLanguage();
  const { showToast } = useToast();
  
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(`تم تأكيد عملية الدفع بنجاح عبر ${paymentMethod === 'card' ? 'البطاقة' : 'المحفظة'}! مرحباً بك.`, "success");
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden flex items-center justify-center p-6">
      <AnimatedBackground />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors bg-slate-900/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md z-20">
        <ArrowLeft className="w-4 h-4" /> {t('home')}
      </Link>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Left Side: Summary */}
        <div className="space-y-8">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-[0.2em]">
                 {t('confirmSelection')}
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                 {t('reviewYourSelection')}
              </h1>
              <p className="text-slate-400 font-medium">{t('activatePlan')}</p>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-x-hidden">
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('selectedSolution')}</span>
                    <Zap className="w-5 h-5 text-accent" />
                 </div>
                 
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg">
                       <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-white capitalize">{plan ? plan.replace(/-/g, ' ') : t('contactSales')}</h3>
                       <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{plan ? t('highImpactPackage') : t('directStrategicHire')}</p>
                    </div>
                 </div>

                 <div className="space-y-3 pt-6 border-t border-white/5">
                    <div className="flex justify-between text-sm font-bold text-slate-300">
                       <span>{t('serviceActivationLabel')}</span>
                       <span>{t('instant')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-300">
                       <span>{t('platformFee')}</span>
                       <span className="text-emerald-400">$0.00</span>
                    </div>
                    <div className="flex justify-between text-xl font-black text-white pt-4">
                       <span>{t('totalInvestment')}</span>
                       <span>{plan === 'pro-matrix' ? '$1,500' : plan === 'starter' ? '$850' : 'Pending Request'}</span>
                    </div>
                 </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary/10 blur-3xl rounded-full"></div>
           </div>

           <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5">
              <ShieldCheck className="w-10 h-10 text-emerald-400 opacity-50" />
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                 {t('securedTransactions')} - Professional SSL Integration.
              </p>
           </div>
        </div>

        {/* Right Side: Form or Success */}
        <div className="relative">
           <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div 
                   key="form"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="p-8 md:p-10 rounded-[2.5rem] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl h-full"
                >
                   <h3 className="text-2xl font-black text-white mb-8">{t('confirmSelection')}</h3>
                   <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-1.5">
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">الاسم الكامل</label>
                         <input required type="text" placeholder="الاسم" className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 px-5 focus:outline-none focus:border-secondary transition-all" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">البريد الإلكتروني</label>
                         <input required type="email" placeholder="email@example.com" className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 px-5 focus:outline-none focus:border-secondary transition-all" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">طريقة الدفع</label>
                         <div className="grid grid-cols-2 gap-3">
                            <div 
                              onClick={() => setPaymentMethod('card')}
                              className={`p-4 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-secondary bg-secondary/10' : 'border-white/5 bg-white/5 hover:border-white/20 opacity-50'}`}
                            >
                               <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-secondary' : 'text-slate-500'}`} />
                               <span className={`text-[10px] font-black tracking-widest uppercase ${paymentMethod === 'card' ? 'text-white' : 'text-slate-500'}`}>بطاقة</span>
                            </div>
                            <div 
                              onClick={() => setPaymentMethod('wallet')}
                              className={`p-4 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/5 bg-white/5 hover:border-white/20 opacity-50'}`}
                            >
                               <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'wallet' ? 'border-emerald-500' : 'border-slate-500'}`}></div>
                               <span className={`text-[10px] font-black tracking-widest uppercase ${paymentMethod === 'wallet' ? 'text-white' : 'text-slate-500'}`}>محفظة المنصة</span>
                            </div>
                         </div>
                      </div>

                      <button 
                        disabled={loading}
                        type="submit" 
                        className="w-full py-5 bg-gradient-to-r from-secondary to-accent text-white font-black rounded-2xl shadow-2xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                         {loading ? (
                           <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                         ) : (
                           <>{t('confirmSelection')} <Send className="w-5 h-5 rotate-180" /></>
                        )}
                      </button>
                      <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">اتصال بوابة الدفع مشفر ومؤمن</p>
                   </form>
                </motion.div>
              ) : (
                <motion.div 
                   key="success"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="p-10 rounded-[2.5rem] bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 shadow-2xl h-full flex flex-col items-center justify-center text-center space-y-8"
                >
                   <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                   </div>
                   <div>
                      <h3 className="text-3xl font-black text-white mb-4">{t('onboardingProcess')}</h3>
                   </div>
                   <Link href="/dashboard" className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-black shadow-2xl hover:bg-slate-100 transition-all">
                      {t('dashboard')}
                   </Link>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
