"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PricingSection() {
  const { t } = useLanguage();
  const router = useRouter();

  const plans = [
    {
      name: t('starter'),
      price: "850",
      id: "starter",
      isPopular: false,
      features: [
        t('starterFeat1'),
        t('starterFeat2'),
        t('starterFeat3'),
        t('starterFeat4')
      ]
    },
    {
      name: t('proMatrix'),
      price: "1,500",
      id: "pro-matrix",
      isPopular: true,
      features: [
        t('proFeat1'),
        t('proFeat2'),
        t('proFeat3'),
        t('proFeat4'),
        t('proFeat5')
      ]
    },
    {
      name: t('enterprise'),
      price: "Custom",
      id: "enterprise",
      isPopular: false,
      features: [
        t('entFeat1'),
        t('entFeat2'),
        t('entFeat3'),
        t('entFeat4'),
        t('entFeat5')
      ]
    }
  ];

  return (
    <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
      {plans.map((plan, i) => (
        <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.15 }}
            onClick={() => router.push(`/checkout?plan=${plan.id}`)}
            className={`relative p-6 rounded-[2rem] bg-[#0b0f1a]/40 backdrop-blur-2xl border transition-all duration-300 hover:scale-105 flex flex-col h-full min-h-[440px] cursor-pointer group
            ${plan.isPopular ? 'border-accent/80 shadow-2xl shadow-accent/20 z-10' : 'border-white/10 shadow-black/50 hover:border-white/30 hover:shadow-white/5'}`}
        >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-secondary text-white font-bold text-[10px] tracking-wider uppercase px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
                {t('mostPopular')}
              </div>
            )}
            <h3 className={`text-sm font-black tracking-widest uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r ${plan.isPopular ? 'from-accent to-orange-400' : 'from-accent/70 to-orange-300/70'}`}>
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className={`text-4xl font-extrabold text-white tracking-tighter w-full block text-left rtl:text-right
                ${plan.isPopular ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300' : ''}`}>
                {plan.price !== 'Custom' && '$'}{plan.price !== 'Custom' ? plan.price : t('customPackage')}
              </span>
              {plan.price !== 'Custom' && <span className="text-slate-500 font-bold text-sm tracking-widest">{t('perMonth')}</span>}
            </div>
            <p className="text-sm font-medium text-slate-400 mb-8 border-b border-white/5 pb-6">
              {t('completeInfrastructure')}
            </p>

            <ul className="space-y-4 mb-10 overflow-y-auto custom-scrollbar flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-md bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/30 mt-0.5">
                     <Check className="w-3 h-3 text-secondary" strokeWidth={3} />
                  </div>
                  <span className="text-slate-300 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">{feature}</span>
                </li>
              ))}
            </ul>

            <div 
              className={`w-full py-3.5 rounded-xl font-bold tracking-wide transition-all mt-auto shadow-lg flex items-center justify-center 
              ${plan.isPopular ? 'bg-gradient-to-r from-accent to-secondary text-white group-hover:opacity-90 shadow-accent/20 bg-[length:200%_auto] group-hover:bg-[position:right_center]' : 
              'bg-gradient-to-r from-slate-800 to-slate-700 text-white group-hover:from-accent group-hover:to-secondary bg-[length:200%_auto] group-hover:bg-[position:right_center]'}`}
            >
              {plan.price === 'Custom' ? t('contactSales') : t('viewPackage')}
            </div>
        </motion.div>
      ))}
    </div>
  );
}
