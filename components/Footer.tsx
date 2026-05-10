"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Briefcase, Camera, Mail } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="py-20 relative z-10 w-full border-t border-white/10 bg-[#0b0f1a] overflow-hidden mt-20">
       
       <div className="max-w-[90rem] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & Description */}
          <div className="space-y-6">
             <Link href="/" className="flex items-center gap-3 group w-fit">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-2xl group-hover:-translate-y-1 transition-all duration-300">
                    <path d="M50 15 L85 35 L50 55 L15 35 L50 15Z" fill="url(#layer1_footer)" />
                    <path d="M15 45 L50 65 L85 45 L85 57 L50 77 L15 57 Z" fill="url(#layer2_footer)" />
                    <path d="M15 67 L50 87 L85 67 L85 79 L50 99 L15 79 Z" fill="url(#layer3_footer)" />
                    <defs>
                      <linearGradient id="layer1_footer" x1="15" y1="15" x2="85" y2="55">
                        <stop stopColor="#60A5FA" />
                        <stop offset="1" stopColor="#2563EB" />
                      </linearGradient>
                      <linearGradient id="layer2_footer" x1="15" y1="45" x2="85" y2="77">
                        <stop stopColor="#A78BFA" />
                        <stop offset="1" stopColor="#7C3AED" />
                      </linearGradient>
                      <linearGradient id="layer3_footer" x1="15" y1="67" x2="85" y2="99">
                        <stop stopColor="#F472B6" />
                        <stop offset="1" stopColor="#E11D48" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-2xl font-black tracking-tight text-white leading-none">
                    تاسك ميديا
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-1">منصة تسويق إلكتروني</span>
                </div>
             </Link>
             <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                {t('heroSub')}
             </p>
             <div className="flex items-center gap-4 pt-2">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary/30 transition-colors cursor-pointer"><MessageCircle className="w-4 h-4" /></div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary/30 transition-colors cursor-pointer"><Briefcase className="w-4 h-4" /></div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary/30 transition-colors cursor-pointer"><Camera className="w-4 h-4" /></div>
             </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
             <h4 className="text-white font-bold text-lg">{t('quickLinks')}</h4>
             <ul className="space-y-3">
                <li><Link href="/" className="text-slate-400 font-medium hover:text-accent transition-colors text-sm">{t('home')}</Link></li>
                <li><Link href="/about" className="text-slate-400 font-medium hover:text-accent transition-colors text-sm">{t('aboutUs')}</Link></li>
                <li><Link href="/services" className="text-slate-400 font-medium hover:text-accent transition-colors text-sm">{t('services')}</Link></li>
                <li><Link href="/contact" className="text-slate-400 font-medium hover:text-accent transition-colors text-sm">{t('contact')}</Link></li>
             </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-6">
             <h4 className="text-white font-bold text-lg">{t('services')}</h4>
             <ul className="space-y-3">
                <li><Link href="/services#seo" className="text-slate-400 font-medium hover:text-secondary transition-colors text-sm">{t('seo')}</Link></li>
                <li><Link href="/services#smm" className="text-slate-400 font-medium hover:text-secondary transition-colors text-sm">{t('smm')}</Link></li>
                <li><Link href="/services#ads" className="text-slate-400 font-medium hover:text-secondary transition-colors text-sm">{t('ads')}</Link></li>
                <li><Link href="/services#content" className="text-slate-400 font-medium hover:text-secondary transition-colors text-sm">{t('content')}</Link></li>
             </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
             <h4 className="text-white font-bold text-lg">{t('subscribe')}</h4>
             <p className="text-slate-400 text-sm font-medium leading-relaxed">
                {t('newsletterSub')}
             </p>
             <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl p-1 focus-within:border-accent/50 transition-colors">
                <div className="pl-3 text-slate-500"><Mail className="w-4 h-4" /></div>
                <input type="email" placeholder={t('emailPlaceholder')} className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-slate-600 h-10 px-2" />
                <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-accent to-orange-400 text-white font-bold text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-lg shadow-accent/20">
                   {t('joinBtn')}
                </button>
             </div>
          </div>
          
       </div>

       <div className="max-w-[90rem] mx-auto px-6 pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="opacity-60 text-xs font-medium uppercase tracking-widest text-slate-300">
             &copy; {new Date().getFullYear()} {lang === 'ar' ? 'تاسك ميديا' : 'Task Media'}. {t('rightsReserved')}
          </p>
          <div className="flex items-center gap-6 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">
             <Link href="#">{t('legal')}</Link>
             <Link href="#">{t('privacyPolicy')}</Link>
             <Link href="#">{t('termsOfService')}</Link>
          </div>
       </div>

    </footer>
  );
}
