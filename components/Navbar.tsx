"use client";

import Link from "next/link";
import Image from "next/image";
import { UserCog, Briefcase, UserCircle, Globe, Zap, Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import NotificationDropdown from "./NotificationDropdown";
import { useState } from "react";

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0b0f1a]/40 backdrop-blur-2xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-[90rem] mx-auto px-4 h-16 lg:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 group">
          <div className="flex items-center gap-2.5">
             <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-slate-900 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300 border border-orange-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
             </div>
             <span className="text-xl lg:text-2xl font-black text-slate-100 tracking-tight">TASK<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">MEDIA</span></span>
          </div>
        </Link>
        
        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-10 text-[13px] font-semibold text-slate-300">
          <Link href="/" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-secondary transition-all">{t('home')}</Link>
          <Link href="/pulse" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-secondary transition-all flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-secondary" /> {t('pulse')}</Link>
          <Link href="/marketers" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-secondary transition-all">{t('services')}</Link>
          <Link href="#pricing" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-secondary transition-all">{t('pricing')}</Link>
        </div>

        {/* Right: Actions (Desktop) */}
        <div className="hidden lg:flex items-center justify-end gap-3 shrink-0">
          <NotificationDropdown />
          <div className="flex gap-2">
            <Link 
              href="/login?role=admin" 
              className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-3 py-2 rounded-xl backdrop-blur-md"
            >
               <UserCog className="w-3.5 h-3.5" /> {t('adminLogin')}
            </Link>
            <Link 
              href="/login?role=marketer" 
              className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-3 py-2 rounded-xl backdrop-blur-md"
            >
               <Briefcase className="w-3.5 h-3.5" /> {t('marketerLogin')}
            </Link>
          </div>
          <Link 
            href="/login?role=client" 
            className="flex items-center gap-1.5 text-[12px] font-bold text-white bg-gradient-to-r from-accent to-secondary bg-[length:200%_auto] hover:bg-[position:right_center] transition-all px-4 py-2 rounded-xl backdrop-blur-md shadow-lg shadow-accent/20 hover:scale-105 active:scale-95"
          >
             <UserCircle className="w-4 h-4" /> {t('clientLogin')}
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden items-center gap-3">
          <NotificationDropdown />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white bg-white/5 rounded-lg border border-white/10"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0b0f1a] border-b border-white/10 py-4 px-4 flex flex-col gap-4 shadow-xl">
          <div className="flex flex-col gap-3 text-sm font-semibold text-slate-300">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-white/5">{t('home')}</Link>
            <Link href="/pulse" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-white/5 flex items-center gap-1.5"><Zap className="w-4 h-4 text-secondary" /> {t('pulse')}</Link>
            <Link href="/marketers" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-white/5">{t('services')}</Link>
            <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-white/5">{t('pricing')}</Link>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <Link 
              href="/login?role=client" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 text-[13px] font-bold text-white bg-gradient-to-r from-accent to-secondary py-2.5 rounded-xl shadow-lg"
            >
               <UserCircle className="w-4 h-4" /> {t('clientLogin')}
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link 
                href="/login?role=admin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-white bg-white/5 border border-white/10 py-2 rounded-xl"
              >
                 <UserCog className="w-3.5 h-3.5" /> {t('adminLogin')}
              </Link>
              <Link 
                href="/login?role=marketer" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-white bg-white/5 border border-white/10 py-2 rounded-xl"
              >
                 <Briefcase className="w-3.5 h-3.5" /> {t('marketerLogin')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
