"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  Plus, Briefcase, 
  MessageSquare, UserCircle, Settings,
  TrendingUp, DollarSign, Send,
  Target, Zap, Clock, X, LayoutGrid, Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useLanguage } from "@/components/LanguageContext";
import PulsePostModal from "@/components/PulsePostModal";

export default function ClientDashboard() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPulseModal, setShowPulseModal] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    category: "Ads",
  });

  useEffect(() => {
    fetchTasks();
    fetchFeed();
  }, [session]);

  const fetchTasks = async () => {
    if (!session?.user?.id) return;
    try {
      const res = await fetch(`/api/tasks?clientId=${session.user.id}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeed = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setFeedPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowPostModal(false);
        setFormData({ title: "", description: "", budget: "", category: "Ads" });
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { id: "overview", name: t('networkPulse'), icon: TrendingUp },
    { id: "feed",     name: t('pulse'),        icon: LayoutGrid },
    { id: "experts",  name: t('sourcingCenter'), icon: UserCircle },
    { id: "settings", name: t('systemSettings'), icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-hidden flex">
      <AnimatedBackground />

      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-slate-900/40 backdrop-blur-3xl p-8 flex flex-col gap-10 sticky top-0 h-screen z-20">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg shadow-secondary/20">
               <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
               <h1 className="text-2xl font-black text-white tracking-tighter">Task<span className="text-secondary">Media</span></h1>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('dashboard')}</span>
            </div>
         </div>

         <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === item.id ? 'bg-secondary/10 text-secondary border border-secondary/20 shadow-lg shadow-secondary/5' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="w-5 h-5" /> {item.name}
              </button>
            ))}
         </nav>

         <div className="mt-auto p-6 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
               <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">{t('availableCredits')}</p>
               <h4 className="text-3xl font-black text-white">$12,450.00</h4>
               <button 
                 onClick={() => setShowTopUp(true)}
                 className="mt-4 w-full py-3 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
               >
                  {t('topUp')}
               </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-accent/10 blur-3xl rounded-full group-hover:bg-accent/20 transition-all"></div>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative z-10 overflow-y-auto">
         <header className="flex justify-between items-start mb-12">
            <div>
               <h2 className="text-4xl font-black text-white mb-2">{t('welcomeBack')}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">{session?.user?.name?.split(' ')[0] || "Strategist"}</span></h2>
               <p className="text-slate-400 font-medium">{t('heroTag')}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowPulseModal(true)}
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-white hover:bg-white/10 transition-all flex items-center gap-3">
                 <Share2 className="w-5 h-5 text-secondary" /> {t('shareInsight')}
              </button>
              <button 
                onClick={() => setShowPostModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-secondary to-accent rounded-2xl font-black text-white shadow-2xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                 <Plus className="w-5 h-5" /> {t('launchOperation')}
              </button>
            </div>
         </header>

         {activeTab === "overview" && (
           <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { label: t('activeSpend'), value: "$4,200", trend: "+5%", icon: DollarSign, color: "text-emerald-400" },
                   { label: t('reachDelta'), value: "2.4M", trend: "+18%", icon: TrendingUp, color: "text-secondary" },
                   { label: t('avgCPA'), value: "$12.40", trend: "-2%", icon: Zap, color: "text-accent" },
                 ].map((stat, i) => (
                   <div key={i} className="p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-2xl border border-white/5 shadow-2xl relative group overflow-hidden">
                      <div className="flex justify-between items-start relative z-10">
                         <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                            <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                            <span className={`text-[10px] font-black ${stat.color} bg-white/5 px-2 py-1 rounded-lg`}>{stat.trend} {t('vsLastWeek')}</span>
                         </div>
                         <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                         </div>
                      </div>
                      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 blur-3xl group-hover:bg-white/10 transition-all rounded-full"></div>
                   </div>
                 ))}
              </div>

              <div>
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-white flex items-center gap-3">
                       <Briefcase className="w-6 h-6 text-secondary" /> {t('activeOperations')} ({tasks.length})
                    </h3>
                    <Link href="/marketers" className="text-xs font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">{t('explore')}</Link>
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {loading ? (
                      <div className="py-20 text-center animate-pulse text-slate-500 font-bold uppercase tracking-widest">{t('syncData')}</div>
                    ) : tasks.length > 0 ? (
                      tasks.map((task, i) => (
                        <div key={task.id} className="p-8 rounded-[2rem] bg-slate-900/60 border border-white/10 hover:border-secondary/30 transition-all shadow-xl flex items-center gap-8">
                           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10 shrink-0">
                              <Target className="w-8 h-8 text-secondary" />
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                 <h4 className="text-xl font-black text-white">{task.title}</h4>
                                 <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                    {task.status}
                                 </span>
                              </div>
                              <p className="text-sm font-medium text-slate-400 line-clamp-1">{task.description}</p>
                              <div className="flex items-center gap-6 mt-4">
                                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <Clock className="w-3.5 h-3.5" /> {new Date(task.createdAt).toLocaleDateString()}
                                 </div>
                              </div>
                           </div>
                           <div className="text-right shrink-0">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">{t('pricingTag')}</span>
                              <span className="text-2xl font-black text-white">${task.budget}</span>
                           </div>
                           <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                              {t('manage')}
                           </button>
                        </div>
                      ))
                    ) : (
                      <div className="py-20 text-center rounded-[2rem] border-2 border-dashed border-white/5">
                         <Briefcase className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                         <h4 className="text-xl font-bold text-slate-500">{t('noProjectsAvailable')}</h4>
                      </div>
                    )}
                 </div>
              </div>
           </div>
         )}

         {activeTab === "feed" && (
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
              <div className="flex items-center justify-between">
                 <h3 className="text-3xl font-black text-white">{t('pulse')}</h3>
                 <Link href="/pulse" target="_blank" className="text-secondary font-black text-xs uppercase tracking-widest hover:underline">{t('explorePulse')}</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {feedPosts.map((post) => (
                    <div key={post.id} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col gap-6 group overflow-hidden relative">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center font-black text-secondary">
                             {post.author.name.charAt(0)}
                          </div>
                          <div>
                             <h4 className="text-sm font-black text-white">{post.author.name}</h4>
                             <p className="text-[10px] text-slate-500 uppercase font-black">{post.type}</p>
                          </div>
                       </div>
                       <p className="text-sm text-slate-300 italic font-medium">"{post.content}"</p>
                       {post.imageUrl && (
                          <div className="aspect-video rounded-2xl overflow-hidden border border-white/5">
                             <img src={post.imageUrl} className="w-full h-full object-cover" />
                          </div>
                       )}
                       <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-secondary/5 blur-3xl group-hover:bg-secondary/10 transition-all rounded-full"></div>
                    </div>
                 ))}
              </div>
           </div>
         )}

         {activeTab === "experts" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
              <h3 className="text-3xl font-black text-white">{t('sourcingCenter')}</h3>
              <div className="p-20 rounded-[3rem] bg-white/5 border border-white/5 text-center">
                 <UserCircle className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                 <h4 className="text-2xl font-black text-white mb-2">Expert Discovery Mode Active</h4>
                 <p className="text-slate-400 max-w-md mx-auto">Browse verified marketing leaders to join your professional network.</p>
                 <Link href="/marketers" className="mt-8 inline-block px-10 py-4 bg-white text-slate-900 font-black rounded-2xl hover:scale-105 transition-all">
                    Search Experts
                 </Link>
              </div>
            </div>
         )}

         {activeTab === "settings" && (
            <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-5">
              <h3 className="text-3xl font-black text-white">{t('systemSettings')}</h3>
              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-3xl font-black text-white">
                       {session?.user?.name?.charAt(0)}
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-white">{session?.user?.name}</h4>
                    </div>
                 </div>
              </div>
            </div>
         )}
      </main>

      <PulsePostModal 
        isOpen={showPulseModal} 
        onClose={() => setShowPulseModal(false)} 
        onSuccess={fetchFeed} 
        userRole="CLIENT"
      />

      {/* Post Task Modal */}
      <AnimatePresence>
         {showPostModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPostModal(false)} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" />
               <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl p-10 rounded-[3rem] bg-slate-900 border border-white/10 shadow-3xl overflow-hidden">
                  <div className="relative z-10">
                     <h3 className="text-3xl font-black text-white mb-2">{t('launchOperation')}</h3>
                     <p className="text-slate-400 font-medium mb-10">{t('howItWorksSub')}</p>
                     <form onSubmit={handlePostTask} className="space-y-6">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t('step1')}</label>
                           <input required type="text" placeholder="Project Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-secondary transition-all" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t('totalInvestment')} ($)</label>
                              <input required type="number" placeholder="5000" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-secondary transition-all" />
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Sector</label>
                              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-secondary transition-all appearance-none text-white [&>option]:text-slate-950">
                                 <option>SEO</option>
                                 <option>Social Media</option>
                                 <option>Paid Ads</option>
                                 <option>Full Stack Marketing</option>
                              </select>
                           </div>
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t('missionIntelligence')}</label>
                           <textarea required rows={4} placeholder="Project requirements..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-secondary transition-all resize-none" />
                        </div>
                        <div className="pt-4 flex gap-4">
                           <button type="button" onClick={() => setShowPostModal(false)} className="flex-1 py-4 bg-white/5 text-slate-300 font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]">Cancel</button>
                           <button type="submit" className="flex-[2] py-4 bg-gradient-to-r from-secondary to-accent text-white font-black rounded-2xl shadow-2xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]">Launch Project <Send className="w-4 h-4" /></button>
                        </div>
                     </form>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Top Up Modal */}
      <AnimatePresence>
         {showTopUp && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTopUp(false)} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" />
               <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg p-10 rounded-[3rem] bg-slate-900 border border-emerald-500/20 shadow-3xl text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                     <DollarSign className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">Add Project Credits</h3>
                  <p className="text-slate-400 mb-8">Secure your marketing investments with zero platform fees on top-ups.</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500 transition-all font-black text-white">$1,000</button>
                     <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500 transition-all font-black text-white">$5,000</button>
                  </div>
                  <button onClick={() => setShowTopUp(false)} className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-2xl shadow-emerald-500/20">Secure Checkout</button>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}
