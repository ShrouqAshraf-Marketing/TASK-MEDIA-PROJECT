"use client";

import Link from "next/link";
import { UserCog, Briefcase, UserCircle, Globe, Zap } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0b0f1a]/40 backdrop-blur-2xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Manual Injection Zone */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="w-[150px] h-[40px] border-2 border-dashed border-white/20 rounded flex items-center justify-center text-white/40 text-xs font-bold uppercase tracking-widest hover:border-white/50 transition-colors">
            [Insert Logo Here]
          </div>
        </Link>
        
        {/* Center: Navigation Links */}
        <div className="hidden xl:flex flex-1 items-center justify-center gap-10 text-[14px] font-semibold text-slate-300">
          <Link href="/" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-secondary transition-all">{t('home')}</Link>
          <Link href="/pulse" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-secondary transition-all flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-secondary" /> {t('pulse')}</Link>
          <Link href="/marketers" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-secondary transition-all">{t('services')}</Link>
          <Link href="#pricing" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent hover:to-secondary transition-all">{t('pricing')}</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          
          <NotificationDropdown />


          
          <div className="hidden md:flex gap-2">
            <Link 
              href="/login?role=admin" 
              className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-4 py-2 rounded-xl backdrop-blur-md"
            >
               <UserCog className="w-3.5 h-3.5" /> {t('adminLogin')}
            </Link>
            <Link 
              href="/login?role=marketer" 
              className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-4 py-2 rounded-xl backdrop-blur-md"
            >
               <Briefcase className="w-3.5 h-3.5" /> {t('marketerLogin')}
            </Link>
          </div>

          <Link 
            href="/login?role=client" 
            className="flex items-center gap-1.5 text-[13px] font-bold text-white bg-gradient-to-r from-accent to-secondary bg-[length:200%_auto] hover:bg-[position:right_center] transition-all px-5 py-2.5 rounded-xl backdrop-blur-md shadow-lg shadow-accent/20 hover:scale-105 active:scale-95"
          >
             <UserCircle className="w-4 h-4" /> {t('clientLogin')}
          </Link>
        </div>
        
      </div>
    </nav>
  );
}
