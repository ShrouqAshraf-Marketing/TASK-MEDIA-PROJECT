"use client";

import { motion } from "framer-motion";
import DeckOfCardsFeatures from "./DeckOfCardsFeatures";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function RevolutionizeSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 relative z-10 w-full px-6 border-y border-white/5 bg-[#0b0f1a]/60">
      <div className="max-w-[100rem] mx-auto flex flex-col items-center gap-10">
         
         {/* Top Side: Copy & Dash Transition */}
         <div className="w-full max-w-4xl space-y-6 text-center">
            <span className="text-secondary font-bold tracking-widest text-sm uppercase">{t('coreDisciplines')}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
               {t('unleashCommand')} <br className="md:hidden" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent drop-shadow-[0_0_15px_rgba(110,205,244,0.3)]">
                 {t('commandCenter')}
               </span>
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
               {t('unleashSub')}
            </p>

            <Link href="/dashboard" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0b0f1a]/40 backdrop-blur-md border border-secondary/30 text-white font-bold hover:bg-secondary/10 transition-all shadow-[0_0_20px_rgba(110,205,244,0.15)] hover:shadow-[0_0_30px_rgba(110,205,244,0.3)] group cursor-pointer z-20 relative">
               <span>{t('accessDashboard')}</span>
               <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 outline-none rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
         </div>

         {/* Bottom Side: Expanding Deck of Cards (Full Width) */}
         <div className="w-full flex justify-center mt-16 lg:mt-8">
            <DeckOfCardsFeatures />
         </div>

      </div>
    </section>
  );
}
