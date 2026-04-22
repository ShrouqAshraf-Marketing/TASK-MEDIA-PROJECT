"use client";

import { motion } from "framer-motion";
import { ClipboardList, SlidersHorizontal, Rocket } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function HowItWorksSection() {
  const { t, lang } = useLanguage();

  const steps = [
    { num: "01", title: t('step1'), desc: t('step1desc'), icon: <ClipboardList className="w-6 h-6" />, color: "text-secondary border-secondary shadow-secondary/20" },
    { num: "02", title: t('step2'), desc: t('step2desc'), icon: <SlidersHorizontal className="w-6 h-6" />, color: "text-accent border-accent shadow-accent/20" },
    { num: "03", title: t('step3'), desc: t('step3desc'), icon: <Rocket className="w-6 h-6" />, color: "text-blue-400 border-blue-400 shadow-blue-400/20" },
  ];

  return (
    <section id="how-it-works" className="py-24 relative z-10 w-full px-6 bg-black/10 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
           <span className="text-accent font-bold tracking-widest text-sm uppercase">{t('simpleProcess')}</span>
           <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{t('howItWorks')}</h2>
           <p className="text-slate-400 text-lg font-medium">{t('howItWorksSub')}</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-slate-800"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group bg-transparent hover:bg-[#0b0f1a]/40 backdrop-blur-md p-8 rounded-[2rem] border border-transparent hover:border-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                 <div className={`w-24 h-24 rounded-[2rem] bg-slate-950 shadow-2xl flex items-center justify-center mb-6 relative border-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${step.color}`}>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm border border-white/10 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      {i + 1}
                    </div>
                    {step.icon}
                 </div>
                 <span className="text-slate-500 font-bold text-xs tracking-widest uppercase mb-2 group-hover:text-secondary transition-colors">{lang === 'ar' ? 'خطوة' : 'Step'} {step.num}</span>
                 <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-secondary transition-all">{step.title}</h3>
                 <p className="text-slate-300 font-medium leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
