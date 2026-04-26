"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, Briefcase, DollarSign, Package, Star,
  Settings, Clock, TrendingUp, ChevronRight, Zap, Target, Send, CheckCircle2, X, LayoutGrid, Share2
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useLanguage } from "@/components/LanguageContext";
import PulsePostModal from "@/components/PulsePostModal";

const EarningsChart = dynamic(() => import("@/components/EarningsChart"), { ssr: false });

type TabKey = "overview" | "jobs" | "pulse" | "ledger" | "packages" | "settings";

export default function MarketerDashboard() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  
  const sidebarItems: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "overview",  label: t('networkPulse'),            icon: <BarChart3 className="w-5 h-5" /> },
    { key: "jobs",      label: t('missionBoard'),   icon: <Briefcase className="w-5 h-5" /> },
    { key: "pulse",     label: t('pulse'),          icon: <LayoutGrid className="w-5 h-5" /> },
    { key: "ledger",    label: t('ledger'),           icon: <DollarSign className="w-5 h-5" /> },
    { key: "packages",  label: t('services'),         icon: <Package className="w-5 h-5" /> },
    { key: "settings",  label: t('systemSettings'), icon: <Settings className="w-5 h-5" /> },
  ];

  const [tasks, setTasks] = useState<any[]>([]);
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState<string | null>(null);
  const [showPulseModal, setShowPulseModal] = useState(false);
  const [proposalData, setProposalData] = useState({ pitch: "", price: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetchTasks();
    fetchFeed();
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTransactions([]);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks?status=OPEN");
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeed = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setFeedPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setFeedPosts([]);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showApplyModal) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: showApplyModal,
          ...proposalData
        }),
      });
      if (res.ok) {
        setShowApplyModal(null);
        setProposalData({ pitch: "", price: "" });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedTask = tasks.find(t => t.id === showApplyModal);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden flex">
      <AnimatedBackground />

      <AnimatePresence>
         {showSuccess && (
           <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-full bg-emerald-500 text-white font-black shadow-2xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> {t('onboardingProcess')}
           </motion.div>
         )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-slate-900/40 backdrop-blur-3xl p-8 flex flex-col gap-10 sticky top-0 h-screen z-20">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-accent flex items-center justify-center shadow-lg shadow-accent/20">
               <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
               <h1 className="text-2xl font-black text-white tracking-tighter">Task<span className="text-accent">Media</span></h1>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('marketerLogin')} {t('dashboard')}</span>
            </div>
         </div>

         <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <button 
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === item.key ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/5' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
         </nav>

         <div className="mt-auto p-6 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-black text-xs">{session?.user?.name?.charAt(0)}</div>
               <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{session?.user?.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black truncate">{t('verifiedStrategicPartner')}</p>
               </div>
            </div>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative z-10 overflow-y-auto">
         <header className="flex justify-between items-start mb-12">
            <div>
               <h2 className="text-4xl font-black text-white mb-2">{t('welcomeBack')}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-accent">{session?.user?.name?.split(' ')[0]}</span></h2>
               <p className="text-slate-400 font-medium">Monitoring platform flow. 3 active insight distributions in progress.</p>
            </div>
            <div className="flex items-center gap-4">
               <button 
                onClick={() => setShowPulseModal(true)}
                className="px-6 py-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl font-black text-orange-400 hover:bg-orange-500/20 transition-all flex items-center gap-3">
                 <Share2 className="w-5 h-5" /> {t('sharePortfolio')}
               </button>
               <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('overallRating')}</span>
                  <span className="text-xl font-black text-orange-400 flex items-center gap-1">4.92 <Star className="w-4 h-4 fill-orange-400" /></span>
               </div>
            </div>
         </header>

         {activeTab === "overview" && (
           <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {[
                   { label: t('ledger'), value: "$12.4K", trend: "+$2K", icon: DollarSign, color: "text-emerald-400" },
                   { label: "Execution Rate", value: "98%", trend: "+2%", icon: CheckCircle2, color: "text-secondary" },
                   { label: t('activeOperations'), value: tasks.length.toString(), trend: "New", icon: Briefcase, color: "text-orange-400" },
                   { label: t('efficiencyStatus'), value: "1.2h", trend: "-15m", icon: Clock, color: "text-accent" },
                 ].map((stat, i) => (
                   <div key={i} className="p-6 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl relative group overflow-x-hidden">
                      <div className="flex justify-between items-start relative z-10">
                         <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white mb-1">{stat.value}</h3>
                            <span className={`text-[10px] font-black ${stat.color}`}>{stat.trend} Δ</span>
                         </div>
                         <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 <div className="p-10 rounded-[3rem] bg-slate-900/60 border border-white/5 shadow-2xl">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3"><TrendingUp className="w-5 h-5 text-orange-400" /> {t('performanceVelocity')}</h3>
                    <EarningsChart />
                 </div>
                 <div className="p-10 rounded-[3rem] bg-slate-900/60 border border-white/5 shadow-2xl">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3"><Target className="w-5 h-5 text-accent" /> {t('strategicOpportunities')}</h3>
                    <div className="space-y-4">
                       {tasks.slice(0, 4).map((task) => (
                         <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 font-black">
                               <Briefcase className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                               <h4 className="text-sm font-bold text-white">{task.title}</h4>
                               <p className="text-[10px] text-slate-500 uppercase font-black">{task.category}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-sm font-black text-orange-400">${task.budget}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
         )}

         {activeTab === "jobs" && (
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
              <h3 className="text-2xl font-black text-white">{t('missionBoard')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {loading ? (
                    <div className="col-span-2 py-40 text-center animate-pulse text-slate-600 font-black uppercase tracking-widest text-sm italic">{t('syncData')}</div>
                 ) : tasks.length > 0 ? (
                    tasks.map((task) => (
                      <div key={task.id} className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-white/10 hover:border-orange-500/30 transition-all group relative overflow-x-hidden">
                         <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                               <div className="flex flex-col gap-2">
                                  <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-black text-orange-400 uppercase tracking-widest w-fit">
                                     {task.category}
                                  </div>
                               </div>
                               <div className="flex flex-col items-end">
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{t('budget')}</span>
                                  <span className="text-2xl font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 shadow-inner">${task.budget}</span>
                               </div>
                            </div>
                            <h4 className="text-2xl font-black text-white mb-3 group-hover:text-orange-400 transition-colors">{task.title}</h4>
                            <p className="text-slate-400 text-sm font-medium line-clamp-3 mb-8 leading-relaxed">
                               {task.description}
                            </p>
                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-sm font-black text-white uppercase shadow-inner">
                                     {task.client?.name?.charAt(0)}
                                  </div>
                                  <div className="flex flex-col">
                                     <span className="text-xs font-black text-slate-300">{task.client?.name || 'عميل'}</span>
                                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t('client')}</span>
                                  </div>
                               </div>
                               <button 
                                 onClick={() => setShowApplyModal(task.id)}
                                 className="px-6 py-3 rounded-xl bg-orange-400 text-[#020617] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                                  {t('deployProposal')}
                               </button>
                            </div>
                         </div>
                         <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full"></div>
                      </div>
                    ))
                 ) : (
                    <div className="col-span-2 py-40 text-center rounded-[3rem] border-2 border-dashed border-white/5">
                       <h4 className="text-2xl font-black text-slate-600 uppercase tracking-widest">{t('noProjectsAvailable')}</h4>
                    </div>
                 )}
              </div>
           </div>
         )}

         {activeTab === "pulse" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
               <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-black text-white">{t('pulse')}</h3>
                  <Link href="/pulse" target="_blank" className="text-orange-400 font-black text-xs uppercase tracking-widest hover:underline">{t('explorePulse')}</Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedPosts.map((post) => (
                     <div key={post.id} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col gap-6 group overflow-x-hidden relative">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center font-black text-orange-400">
                              {post.author.name.charAt(0)}
                           </div>
                           <div>
                              <h4 className="text-sm font-black text-white">{post.author.name}</h4>
                              <p className="text-[10px] text-slate-500 uppercase font-black">{post.type}</p>
                           </div>
                        </div>
                        <p className="text-sm text-slate-300 italic font-medium">"{post.content}"</p>
                        {post.imageUrl && (
                           <div className="aspect-video rounded-2xl overflow-x-hidden border border-white/5">
                              <img src={post.imageUrl} className="w-full h-full object-cover" />
                           </div>
                        )}
                        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-orange-500/5 blur-3xl group-hover:bg-orange-500/10 transition-all rounded-full"></div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {activeTab === "ledger" && (
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
              <div className="flex items-center justify-between">
                 <h3 className="text-3xl font-black text-white">{t('ledger')}</h3>
                 <div className="px-6 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-black">
                    الرصيد المتاح: <span className="text-xl">${(session?.user as any)?.walletBalance || 0}</span>
                 </div>
              </div>

              <div className="bg-slate-900/60 border border-white/5 rounded-[3rem] overflow-x-hidden shadow-2xl">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right">
                       <thead className="bg-white/5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                          <tr>
                             <th className="p-6">المعاملة</th>
                             <th className="p-6">التاريخ</th>
                             <th className="p-6">النوع</th>
                             <th className="p-6">الحالة</th>
                             <th className="p-6">المبلغ</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5 text-sm font-medium">
                          {transactions.length === 0 ? (
                             <tr>
                                <td colSpan={5} className="p-12 text-center text-slate-500 font-bold text-lg">لا توجد معاملات مالية بعد.</td>
                             </tr>
                          ) : transactions.map(tx => (
                             <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-6 text-white">{tx.description}</td>
                                <td className="p-6 text-slate-400">{new Date(tx.createdAt).toLocaleDateString('ar-EG')}</td>
                                <td className="p-6">
                                   <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${
                                      tx.type === 'EARNING' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                      tx.type === 'WITHDRAWAL' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                   }`}>
                                      {tx.type === 'EARNING' ? 'أرباح' : tx.type === 'WITHDRAWAL' ? 'سحب' : tx.type}
                                   </span>
                                </td>
                                <td className="p-6">
                                   <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${
                                      tx.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                      tx.status === 'PENDING' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' :
                                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                   }`}>
                                      {tx.status === 'COMPLETED' ? 'مكتمل' : tx.status === 'PENDING' ? 'قيد الانتظار' : 'مرفوض'}
                                   </span>
                                </td>
                                <td className={`p-6 font-black text-lg ${tx.type === 'EARNING' ? 'text-emerald-400' : 'text-white'}`}>
                                   {tx.type === 'EARNING' ? '+' : '-'}${tx.amount}
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
         )}
      </main>

      <PulsePostModal 
        isOpen={showPulseModal} 
        onClose={() => setShowPulseModal(false)} 
        onSuccess={fetchFeed} 
        userRole="MARKETER"
      />

      <AnimatePresence>
         {showApplyModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowApplyModal(null)} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" />
               <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl p-10 rounded-[3rem] bg-slate-900 border border-white/10 shadow-3xl">
                  <h3 className="text-3xl font-black text-white mb-2">{t('strategicPitch')}</h3>
                  <p className="text-slate-400 font-medium mb-8">{t('selectedProject')}: <span className="text-white font-bold">{selectedTask?.title}</span></p>
                  <form onSubmit={handleApply} className="space-y-6">
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t('engagementFeePlaceholder')} ($)</label>
                        <input required type="number" placeholder={selectedTask?.budget.toString()} value={proposalData.price} onChange={(e) => setProposalData({...proposalData, price: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-400 transition-all font-bold" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Proposal Brief</label>
                        <textarea required rows={5} placeholder="Outline your execution strategy..." value={proposalData.pitch} onChange={(e) => setProposalData({...proposalData, pitch: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-400 transition-all resize-none" />
                     </div>
                     <div className="pt-4 flex gap-4">
                        <button type="button" onClick={() => setShowApplyModal(null)} className="flex-1 py-4 bg-white/5 text-slate-300 font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]">Cancel</button>
                        <button disabled={submitting} type="submit" className="flex-[2] py-4 bg-orange-500 text-[#020617] font-black rounded-2xl shadow-2xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] disabled:opacity-50">{submitting ? "Transmitting..." : <>{t('deployProposal')} <Send className="w-4 h-4" /></>}</button>
                     </div>
                  </form>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}
