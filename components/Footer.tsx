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
             <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-slate-900 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300 border border-orange-500/30">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                </div>
                <span className="text-xl lg:text-2xl font-black text-slate-100 tracking-tight">TASK<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">MEDIA</span></span>
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
