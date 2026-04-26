"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import { Star, Search, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { Suspense } from "react";

function MarketersContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceFilter = searchParams?.get('service') || "";
  const [marketers, setMarketers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/marketers')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          setMarketers([]);
          setLoading(false);
          return;
        }
        let filtered = data;
        if (serviceFilter) {
          filtered = data.filter((m: any) => 
            m.specialties?.toLowerCase().includes(serviceFilter.toLowerCase())
          );
        }
        setMarketers(filtered.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0)));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMarketers([]);
        setLoading(false);
      });
  }, [serviceFilter]);

  return (
    <main className="min-h-screen relative font-sans text-slate-100 overflow-x-hidden pt-32 pb-20">
      <AnimatedBackground />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
               {t('coreDisciplines')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">{t('disciplines')}</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-2xl">
               {t('disciplineSub')}
            </p>
          </div>

          <div className="flex items-center gap-3">
             <div className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-sm font-bold text-slate-300">
                <Filter className="w-4 h-4" /> Filter
             </div>
             <div className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-sm font-bold text-slate-300 cursor-pointer">
                <Search className="w-4 h-4" /> {t('explore')}
             </div>
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center animate-pulse text-slate-500 font-black uppercase tracking-widest">{t('syncData')}</div>
        ) : marketers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketers.map((m) => (
              <div 
                key={m.id} 
                onClick={() => router.push(`/marketers/${m.id}`)}
                className="group p-8 rounded-[2.5rem] bg-[#0b0f1a]/40 backdrop-blur-2xl border border-white/5 hover:border-secondary/30 transition-all duration-300 relative overflow-x-hidden flex flex-col h-full shadow-2xl cursor-pointer hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-slate-900 border-2 border-white/10 flex items-center justify-center text-3xl font-black text-white group-hover:border-secondary transition-colors relative">
                    {m.name.charAt(0)}
                    <div className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-[#0b0f1a] flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-accent font-black text-xl">
                      <Star className="w-5 h-5 fill-accent" /> {m.rating}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{t('overallRating')}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white mb-2 group-hover:text-secondary transition-colors">{m.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(m.specialties || '').split(',').filter(Boolean).map((s: string) => (
                      <span key={s} className="px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20 text-[10px] font-black text-secondary uppercase tracking-wider shadow-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 italic">
                    {m.bio}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/5 mt-8 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">{t('startingPrice')}</span>
                    <span className="text-2xl font-black text-white">${m.startingPrice}</span>
                  </div>
                  <div className="px-6 py-3 rounded-xl bg-white text-slate-950 font-black text-sm group-hover:bg-secondary group-hover:text-white transition-all shadow-xl flex items-center gap-2">
                    {t('viewPackage')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-secondary/5 blur-3xl rounded-full group-hover:bg-secondary/10 transition-colors"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
             <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">{t('noProjectsAvailable')}</h2>
             <Link href="/marketers" className="mt-8 inline-block text-secondary font-bold hover:underline">{t('explore')}</Link>
          </div>
        )}
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}

export default function MarketersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">Loading...</div>}>
      <MarketersContent />
    </Suspense>
  );
}
