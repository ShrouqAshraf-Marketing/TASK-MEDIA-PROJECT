"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function TopHeader() {
  const { t } = useLanguage();

  return (
    <section className="pt-40 pb-16 relative z-10 w-full px-6 flex flex-col items-center justify-center min-h-[60vh]">
       <div className="text-center max-w-5xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 text-secondary mb-4 shadow-[0_0_20px_rgba(110,205,244,0.15)]"
          >
             <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
             <span className="text-sm font-bold tracking-wide uppercase">{t('heroTag')}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] tracking-tight font-extrabold text-white mb-6"
          >
             {t('igniteGrowth')}
          </motion.h1>

          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-lg lg:text-xl text-slate-300 opacity-90 max-w-3xl mx-auto font-medium leading-relaxed"
          >
             {t('heroSub')}
          </motion.p>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
             <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-bold hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(240,106,24,0.3)] hover:scale-105 active:scale-95 group">
                {t('hireMarketer')}
             </Link>
             <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-secondary text-secondary font-bold hover:bg-secondary/10 transition-all hover:scale-105 active:scale-95">
                {t('becomeFreelancer')}
             </Link>
          </motion.div>
       </div>
    </section>
  );
}
