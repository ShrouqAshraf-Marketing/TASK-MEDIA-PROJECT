"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function MarketerTicker() {
  const { t } = useLanguage();

  const marketers = [
    { name: "Ahmed M.", spec: t('specSeo'), tasks: "1.2k" },
    { name: "Sarah K.", spec: t('specAds'), tasks: "950" },
    { name: "Youssef T.", spec: t('specSocial'), tasks: "1.5k" },
    { name: "Nour R.", spec: t('specContent'), tasks: "850" },
    { name: "Kareem S.", spec: t('specMedia'), tasks: "2.1k" },
    { name: "Layla F.", spec: t('specDesign'), tasks: "1.1k" },
    { name: "Omar Z.", spec: t('specWeb'), tasks: "1.3k" },
  ];

  return (
    <div className="w-full py-4 bg-[#0b0f1a] border-y border-white/5 flex overflow-hidden whitespace-nowrap relative z-10">
      
      {/* Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0b0f1a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#0b0f1a] to-transparent z-10 pointer-events-none"></div>
      
      <motion.div
        animate={{ x: ["0%", "-33.33%"] }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 gap-10 items-center px-4"
        dir="ltr"
      >
        {/* Triplicating array for smooth infinite scrolling */}
        {[...marketers, ...marketers, ...marketers].map((m, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
             <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shadow-inner relative overflow-hidden">
                <Star className="w-4 h-4 text-accent fill-accent" />
             </div>
             <div className="flex flex-col">
                <span className="text-white font-black text-xs tracking-wide">
                   {m.name} <span className="text-secondary/70 text-[10px] ml-1">({m.spec})</span>
                </span>
                <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest mt-0.5">
                   {m.tasks} {t('tasksCompleted')}
                </span>
             </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
