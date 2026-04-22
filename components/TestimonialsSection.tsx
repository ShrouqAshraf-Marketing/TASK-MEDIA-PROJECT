"use client";

import { motion } from "framer-motion";
import { Star, Quote, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function TestimonialsSection() {
  const { t, lang } = useLanguage();

  const TESTIMONIALS = [
    {
      name: lang === 'ar' ? "ألكسندر فانس" : "Alexander Vance",
      role: t('alexanderRole'),
      content: t('alexanderQuote'),
      rating: 5,
      avatar: "AV",
      verified: true
    },
    {
      name: lang === 'ar' ? "سارة الراشد" : "Sarah Al-Rashid",
      role: t('sarahRole'),
      content: t('sarahQuote'),
      rating: 5,
      avatar: "SA",
      verified: true
    },
    {
      name: lang === 'ar' ? "ماركوس ثورن" : "Marcus Thorne",
      role: t('marcusRole'),
      content: t('marcusQuote'),
      rating: 5,
      avatar: "MT",
      verified: true
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-black uppercase tracking-[0.2em]"
           >
              <ShieldCheck className="w-4 h-4" /> {t('trustedLeaders')}
           </motion.div>
           <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              {t('verifiedBadge')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">{t('strategicImpact')}</span>
           </h2>
           <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              {t('readTestimonials')}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {TESTIMONIALS.map((test, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.2 }}
               className="p-10 rounded-[3rem] bg-slate-900/40 backdrop-blur-3xl border border-white/5 relative group hover:border-secondary/30 transition-all duration-500 shadow-2xl"
             >
                <Quote className={`absolute top-10 ${lang === 'ar' ? 'left-10' : 'right-10'} w-12 h-12 text-white/5 group-hover:text-secondary/10 transition-colors`} />
                
                <div className="flex gap-1 mb-8">
                   {[...Array(test.rating)].map((_, i) => (
                     <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                   ))}
                </div>

                <p className={`text-xl text-slate-300 font-medium leading-relaxed italic mb-10 relative z-10 ${lang === 'ar' ? 'font-serif' : ''}`}>
                   "{test.content}"
                </p>

                <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                   <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center text-xl font-black text-white relative shadow-xl">
                      {test.avatar}
                      {test.verified && (
                        <div className={`absolute ${lang === 'ar' ? '-left-1' : '-right-1'} -bottom-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center`}>
                           <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                   </div>
                   <div className="min-w-0">
                      <h4 className="font-black text-white text-lg truncate">{test.name}</h4>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{test.role}</p>
                   </div>
                </div>

                {/* Decoration */}
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/5 blur-3xl group-hover:bg-secondary/10 transition-all rounded-full pointer-events-none"></div>
             </motion.div>
           ))}
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-secondary/5 to-transparent blur-[120px] pointer-events-none opacity-50"></div>
    </section>
  );
}
