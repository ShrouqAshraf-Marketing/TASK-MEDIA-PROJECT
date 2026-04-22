"use client";

import { useState } from "react";
import { Check, Cpu, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import Link from "next/link";

export default function PackageBuilder() {
  const { t } = useLanguage();
  const [activeServices, setActiveServices] = useState<{name: string, price: number}[]>([]);

  const servicesMap = [
    { name: t('smm'), id: "smm", basePrice: 400 },
    { name: t('seo'), id: "seo", basePrice: 600 },
    { name: t('content'), id: "content", basePrice: 350 },
    { name: t('ads'), id: "ads", basePrice: 500 }
  ];

  const handleToggle = (service: any) => {
    setActiveServices(prev => 
      prev.find(s => s.name === service.name) 
        ? prev.filter(s => s.name !== service.name)
        : [...prev, service]
    );
  };

  const total = activeServices.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="w-full relative z-10 flex flex-col md:flex-row bg-[#0b0f1a]/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
       
       {/* Left Side: Services List */}
       <div className="flex-1 p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
               <Cpu className="w-5 h-5 text-orange-400" />
             </div>
             <h3 className="text-2xl font-bold text-white tracking-tight">{t('customPackageTag')}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {servicesMap.map((svc, i) => {
               const isActive = activeServices.some(s => s.name === svc.name);
               return (
                 <div 
                   key={i}
                   onClick={() => handleToggle({ name: svc.name, price: svc.basePrice })}
                   className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-all duration-300
                     ${isActive ? 'bg-secondary/10 border-secondary shadow-[0_0_15px_rgba(110,205,244,0.15)] scale-[1.02]' : 'bg-slate-900 border-white/5 hover:border-white/20 hover:bg-slate-800'}`}
                 >
                   <div className={`mt-1 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${isActive ? 'bg-secondary border-secondary' : 'bg-slate-800 border-slate-600'}`}>
                      {isActive && <Check className="w-3.5 h-3.5 text-[#0b0f1a]" strokeWidth={4} />}
                   </div>
                   <div>
                     <span className={`block font-bold text-sm mb-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>{svc.name}</span>
                     <span className={`text-xs font-black ${isActive ? 'text-secondary font-bold' : 'text-slate-500'}`}>+${svc.basePrice}{t('perMonth')}</span>
                   </div>
                 </div>
               )
             })}
          </div>
       </div>

       {/* Right Side: Total Calculation */}
       <div className="w-full md:w-[350px] bg-slate-900/80 border-l border-white/5 p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
               <Sparkles className="w-5 h-5 text-accent" /> {t('packageSummary')}
            </h4>
            <div className="space-y-3 mb-8 h-[120px] overflow-y-auto custom-scrollbar">
               {activeServices.length === 0 ? (
                 <span className="text-slate-500 text-sm italic">{t('noServices')}</span>
               ) : (
                 activeServices.map((svc, i) => (
                   <div key={i} className="flex justify-between text-sm animate-fade-in">
                     <span className="text-slate-300">{svc.name}</span>
                     <span className="text-white font-bold">${svc.price}</span>
                   </div>
                 ))
               )}
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/10">
             <div className="flex justify-between items-end mb-6">
                <span className="text-slate-400 font-medium text-sm">{t('totalOutput')}</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">${total}</span>
             </div>
             <Link 
               href={`/checkout?plan=custom&total=${total}&services=${activeServices.map(s => s.name).join(',')}`}
               className="block w-full"
             >
               <button className="w-full py-4 rounded-xl font-black text-[13px] uppercase tracking-widest text-white bg-gradient-to-r from-accent to-orange-400 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 active:scale-95 transition-all mb-4">
                 {t('requestQuote')}
               </button>
             </Link>
             <p className="text-center text-xs text-slate-500 font-medium">{t('noHiddenFees')}</p>
          </div>
       </div>

    </div>
  );
}
