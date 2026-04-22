"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Activity, PackageCheck, ShieldCheck } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function FeaturesSection() {
  const { t } = useLanguage();
  
  const features = [
    {
      title: t('aiMatching'),
      desc: t('aiMatchingDesc'),
      icon: <BrainCircuit className="w-6 h-6" />,
      color: "text-secondary border-secondary shadow-secondary/20"
    },
    {
      title: t('realTimeTracking'),
      desc: t('realTimeTrackingDesc'),
      icon: <Activity className="w-6 h-6" />,
      color: "text-accent border-accent shadow-accent/20"
    },
    {
      title: t('customPackagesTitle'),
      desc: t('customPackagesDesc2'),
      icon: <PackageCheck className="w-6 h-6" />,
      color: "text-blue-400 border-blue-400 shadow-blue-400/20"
    },
    {
      title: t('verifiedExperts'),
      desc: t('verifiedExpertsDesc'),
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "text-indigo-400 border-indigo-400 shadow-indigo-400/20"
    }
  ];

  return (
    <section className="py-24 relative z-10 w-full px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
           <span className="text-secondary font-bold tracking-widest text-sm uppercase">{t('featuresTag')}</span>
           <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{t('builtForScale')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15 }}
              className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all shadow-black/50 hover:-translate-y-2 hover:shadow-2xl group cursor-default"
            >
               <div className={`w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 border ${feat.color} bg-opacity-50 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  {feat.icon}
               </div>
               <h3 className="text-lg font-bold text-white mb-3">{feat.title}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
