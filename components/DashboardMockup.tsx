"use client";

import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, Settings, Search, Bell, Target, Wallet, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function DashboardMockup() {
  const [view, setView] = useState<'client' | 'marketer'>('client');
  const { lang } = useLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl border border-white/10 bg-slate-950 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[650px] select-none group/mockup">
      
      {/* App Top Bar */}
      <div className="h-12 border-b border-white/5 bg-slate-900/80 backdrop-blur-md flex items-center px-4 justify-between relative z-10 box-border">
         <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
         </div>
         
         {/* View Toggle */}
         <div className="flex bg-slate-950 rounded-lg p-1 border border-white/10 relative transition-all absolute left-1/2 -translate-x-1/2">
            <button 
               onClick={() => setView('client')}
               className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all relative z-10 ${view === 'client' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
               {lang === 'ar' ? 'واجهة العميل' : 'Client View'}
            </button>
            <button 
               onClick={() => setView('marketer')}
               className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all relative z-10 ${view === 'marketer' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
               {lang === 'ar' ? 'واجهة الخبير' : 'Marketer View'}
            </button>
            <motion.div 
               layoutId="toggleHighlight"
               className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-accent to-secondary rounded-md"
               initial={false}
               animate={{ left: view === 'client' ? '4px' : 'calc(50% + 2px)' }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
         </div>

         <div className="flex items-center gap-4 w-20 justify-end">
            <Bell className="w-4 h-4 text-slate-400 group-hover/mockup:text-white transition-colors" />
            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-transparent hover:border-secondary flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary text-sm font-black transition-all cursor-pointer">
               N
            </div>
         </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative bg-slate-950 pb-2 box-border">
        {/* Sidebar */}
        <div className="w-48 lg:w-56 border-r border-white/5 bg-slate-900/40 py-6 px-3 flex flex-col gap-2 relative z-0 shrink-0">
           <div className="px-3 text-xs font-bold tracking-wider text-slate-600 uppercase mb-2">{lang === 'ar' ? 'القائمة الرئيسية' : 'Main Menu'}</div>
           <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/10 text-secondary border border-secondary/20 transition-all hover:bg-secondary/20 cursor-pointer">
              <LayoutDashboard className="w-4 h-4" /> <span className="font-semibold text-sm">{lang === 'ar' ? 'نظرة عامة' : 'Overview'}</span>
           </div>
           <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-accent hover:bg-accent/5 transition-all cursor-pointer">
              {view === 'client' ? <Target className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />} 
              <span className="font-semibold text-sm">
                {view === 'client' 
                  ? (lang === 'ar' ? 'المشاريع النشطة' : 'Active Projects') 
                  : (lang === 'ar' ? 'مهامي' : 'My Tasks')}
              </span>
           </div>
           <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-secondary hover:bg-secondary/5 transition-all cursor-pointer">
              {view === 'client' ? <Users className="w-4 h-4" /> : <Wallet className="w-4 h-4" />} 
              <span className="font-semibold text-sm">
                {view === 'client' 
                  ? (lang === 'ar' ? 'الخبراء المتعاقدون' : 'Hired Experts') 
                  : (lang === 'ar' ? 'المحفظة والأرباح' : 'Wallet & Earnings')}
              </span>
           </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col gap-6 relative z-0 min-w-0">
           
           <AnimatePresence mode="wait">
             <motion.div
               key={view}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="flex flex-col gap-6 h-full"
             >
               <div className="shrink-0 flex justify-between items-end">
                  <div>
                     <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">
                        {view === 'client' 
                          ? (lang === 'ar' ? 'مركز إدارة الشركات' : 'Corporate Command Center') 
                          : (lang === 'ar' ? 'منصة المستقلين' : 'Freelancer Hub')}
                     </h2>
                     <p className="text-secondary text-sm font-medium">
                        {view === 'client' 
                          ? (lang === 'ar' ? 'مرحباً بعودتك، حملاتك النشطة تؤدي أداءً جيداً.' : 'Welcome back, N. Your active campaigns are performing well.') 
                          : (lang === 'ar' ? 'مرحباً بعودتك، لديك 3 مهام في انتظار المراجعة!' : 'Welcome back, N. You have 3 tasks pending review!')}
                     </p>
                  </div>
               </div>

               {/* Stats Row */}
               <div className="shrink-0 grid grid-cols-3 gap-4">
                  <div className="bg-slate-900/80 rounded-xl border border-white/5 hover:border-accent/40 transition-colors p-4 flex flex-col justify-between h-28 group cursor-default">
                     <span className="text-slate-500 text-xs font-bold uppercase tracking-wider group-hover:text-slate-400">
                        {view === 'client' 
                          ? (lang === 'ar' ? 'إجمالي الإنفاق الإعلاني' : 'Total Ad Spend') 
                          : (lang === 'ar' ? 'صافي الإيرادات (هذا الشهر)' : 'Net Revenue (MTD)')}
                     </span>
                     <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                        {view === 'client' ? '$24,500' : '$8,420'}
                     </span>
                     <span className="text-xs text-secondary font-bold group-hover:text-accent">
                        {lang === 'ar' ? '+14% مقارنة بالشهر الماضي' : '+14% vs last month'}
                     </span>
                  </div>
                  <div className="bg-slate-900/80 rounded-xl border border-white/5 hover:border-secondary/40 transition-colors p-4 flex flex-col justify-between h-28 group cursor-default">
                     <span className="text-slate-500 text-xs font-bold uppercase tracking-wider group-hover:text-slate-400">
                        {view === 'client' 
                          ? (lang === 'ar' ? 'الحملات النشطة' : 'Active Campaigns') 
                          : (lang === 'ar' ? 'المشاريع الجارية' : 'Ongoing Projects')}
                     </span>
                     <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                        {view === 'client' ? '12' : '4'}
                     </span>
                     <span className="text-xs text-slate-400 font-bold group-hover:text-white">
                        {lang === 'ar' ? 'عبر 3 منصات' : 'Across 3 platforms'}
                     </span>
                  </div>
                  <div className="bg-slate-900/80 rounded-xl border border-white/5 hover:border-accent/40 transition-colors p-4 flex flex-col justify-between h-28 group cursor-default">
                     <span className="text-slate-500 text-xs font-bold uppercase tracking-wider group-hover:text-slate-400">
                        {view === 'client' 
                          ? (lang === 'ar' ? 'مستهدف العائد الاستثماري' : 'Avg ROI Target') 
                          : (lang === 'ar' ? 'تقييم العملاء' : 'Client Rating')}
                     </span>
                     <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                        {view === 'client' ? '280%' : '4.9/5'}
                     </span>
                     <span className="text-xs text-green-400 font-bold">
                        {lang === 'ar' ? 'أعلى 1% أداءً' : 'Top 1% performing'}
                     </span>
                  </div>
               </div>

               {/* Bottom Row */}
               <div className="flex-1 flex gap-4 min-h-0">
                  <div className="flex-1 bg-slate-900/80 rounded-xl border border-white/5 hover:border-white/10 transition-colors p-5 flex flex-col min-h-0 overflow-y-auto">
                     <div className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
                        {view === 'client' 
                          ? (lang === 'ar' ? 'خطوط التوظيف المباشر' : 'Live Hiring Pipeline') 
                          : (lang === 'ar' ? 'فرص سوق العمل' : 'Marketplace Opportunities')}
                     </div>
                     <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                           <div key={item} className="p-4 rounded-lg bg-slate-950/50 border border-white/5 flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer group">
                              <div className="flex gap-3 items-center">
                                 <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-xs font-black text-secondary group-hover:text-accent transition-colors">US</div>
                                 <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white mb-0.5">
                                       {view === 'client' 
                                         ? (lang === 'ar' ? 'عرض خبير SEO' : 'Senior SEO Analyst Proposal') 
                                         : (lang === 'ar' ? 'علامة تجارية تحتاج لمدير إعلانات' : 'E-com Brand Needs Ads Manager')}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                       {view === 'client' 
                                         ? (lang === 'ar' ? 'مستلم منذ ساعتين' : 'Received 2 hours ago') 
                                         : (lang === 'ar' ? 'ميزانية 2 ألف دولار - 12 عرض' : 'Posted $2k budget - 12 Proposals')}
                                    </span>
                                 </div>
                              </div>
                              <div className="text-xs font-bold px-3 py-1 bg-secondary/10 text-secondary rounded shadow-sm border border-secondary/20 group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all">
                                 {view === 'client' 
                                   ? (lang === 'ar' ? 'مراجعة' : 'Review') 
                                   : (lang === 'ar' ? 'تقديم' : 'Apply')}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="w-[30%] bg-slate-900/80 rounded-xl border border-white/5 hover:border-white/10 transition-colors p-5 flex flex-col">
                     <div className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
                        {view === 'client' 
                          ? (lang === 'ar' ? 'مسار العائد' : 'ROI Trajectory') 
                          : (lang === 'ar' ? 'جدول الدفع' : 'Payout Schedule')}
                     </div>
                     <div className="flex-1 flex items-end justify-between gap-1 pb-2">
                        {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                           <motion.div 
                              key={i} 
                              className="w-full bg-accent/20 rounded-t border-t border-accent/40 hover:bg-accent/40 transition-colors cursor-pointer" 
                              style={{ height: `${h}%` }}
                              whileHover={{ scaleY: 1.05, transformOrigin: "bottom" }}
                           >
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>
             </motion.div>
           </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
