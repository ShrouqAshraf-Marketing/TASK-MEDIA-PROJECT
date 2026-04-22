"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, BarChart3, Settings, ShieldCheck, 
  MessageSquare, Layers, TrendingUp, Search,
  Filter, Download, ChevronRight, Activity, DollarSign
} from "lucide-react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

type AdminTab = "overview" | "users" | "tasks" | "finances" | "system";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: "إجمالي المستخدمين", value: "2,481", trend: "+12%", icon: <Users className="w-5 h-5" />, color: "from-blue-500 to-cyan-400" },
    { label: "المهام النشطة", value: "142", trend: "+5%", icon: <Layers className="w-5 h-5" />, color: "from-orange-500 to-amber-400" },
    { label: "إجمالي الإيرادات", value: "$42.5k", trend: "+18%", icon: <Activity className="w-5 h-5" />, color: "from-emerald-500 to-teal-400" },
    { label: "تقييم المنصة", value: "4.9", trend: "مستقر", icon: <TrendingUp className="w-5 h-5" />, color: "from-purple-500 to-pink-400" },
  ];

  useEffect(() => {
    if (activeTab === "finances") {
      fetchTransactions();
    }
  }, [activeTab]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-hidden" dir="rtl">
      <AnimatedBackground />

      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-full w-64 bg-slate-900/50 backdrop-blur-2xl border-l border-white/5 z-40 hidden lg:flex flex-col">
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent"></div>
            <span className="text-xl font-black tracking-tighter text-white">تاسك ميديا</span>
          </Link>
          <div className="mt-2 text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase">مركز التحكم</div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-6">
          {[
            { id: "overview", label: "نظرة عامة", icon: <BarChart3 className="w-4 h-4" /> },
            { id: "users", label: "إدارة المستخدمين", icon: <Users className="w-4 h-4" /> },
            { id: "tasks", label: "مشاريع المنصة", icon: <Layers className="w-4 h-4" /> },
            { id: "finances", label: "السجل المالي", icon: <DollarSign className="w-4 h-4" /> },
            { id: "system", label: "إعدادات النظام", icon: <Settings className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-xl border border-white/10" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
              {activeTab === item.id && <ChevronRight className="w-4 h-4 mr-auto opacity-50 rotate-180" />}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">المدير العام</div>
                <div className="text-[10px] text-slate-500">صلاحيات كاملة</div>
              </div>
            </div>
            <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-lg transition-colors border border-red-500/20">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:mr-64 p-8 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight capitalize">
              {activeTab === 'overview' ? 'نظرة عامة' : 
               activeTab === 'users' ? 'إدارة المستخدمين' : 
               activeTab === 'tasks' ? 'مشاريع المنصة' : 
               activeTab === 'finances' ? 'السجل المالي الشامل' : 'إعدادات النظام'}
            </h1>
            <p className="text-slate-400 font-medium mt-1">الحالة: <span className="text-emerald-400">جميع الأنظمة تعمل بكفاءة</span></p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="البحث في النظام..." 
                className="bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pr-10 pl-4 text-sm outline-none focus:border-secondary transition-all w-64 text-right"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 text-slate-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-secondary/20">
              <Download className="w-4 h-4" /> تصدير
            </button>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="animate-in fade-in slide-in-from-bottom-5 space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 relative group cursor-default"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400">{s.label}</span>
                    <span className="text-xs font-bold text-emerald-400">{s.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <div className="rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-white">النشاط الأخير</h3>
                    <button className="text-sm font-bold text-secondary hover:underline">عرض الكل</button>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                        <div className="w-2 h-2 rounded-full bg-secondary group-hover:animate-pulse"></div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-white">تسجيل خبير جديد</div>
                          <div className="text-xs text-slate-500 font-medium">ahmed_seo@taskmedia.io • قبل دقيقتين</div>
                        </div>
                        <div className="text-xs font-black text-white bg-slate-800 px-3 py-1 rounded-full border border-white/5">مراجعة</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-gradient-to-br from-secondary/20 to-accent/20 backdrop-blur-3xl border border-secondary/20 p-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-white mb-2">صحة المنصة</h3>
                    <p className="text-slate-300 text-sm font-medium mb-6">قواعد البيانات، التخزين، وواجهات برمجة التطبيقات في حالة ممتازة.</p>
                    
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-white">استهلاك المعالج</span>
                          <span className="text-secondary">24%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary w-[24%]"></div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-white">زمن استجابة الشبكة</span>
                          <span className="text-accent">140ms</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-[40%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/30 blur-3xl rounded-full"></div>
                </div>

                <div className="rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8">
                  <h3 className="text-xl font-black text-white mb-6">إعدادات المنصة</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary transition-all text-left group">
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white">وضع الصيانة</span>
                       <div className="w-10 h-5 bg-slate-800 rounded-full relative">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-slate-600 rounded-full"></div>
                       </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary transition-all text-left group">
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white">المراجعة التلقائية</span>
                       <div className="w-10 h-5 bg-secondary/30 rounded-full relative">
                          <div className="absolute left-1 top-1 w-3 h-3 bg-secondary rounded-full"></div>
                       </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "finances" && (
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-emerald-500/20 relative overflow-hidden">
                     <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">إجمالي الإيداعات</p>
                        <h3 className="text-4xl font-black text-emerald-400">$34,500</h3>
                     </div>
                     <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-rose-500/20 relative overflow-hidden">
                     <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">إجمالي السحوبات</p>
                        <h3 className="text-4xl font-black text-rose-400">$12,200</h3>
                     </div>
                     <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full"></div>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-blue-500/20 relative overflow-hidden">
                     <div className="relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">المدفوعات المعلقة</p>
                        <h3 className="text-4xl font-black text-blue-400">$4,300</h3>
                     </div>
                     <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
                  </div>
              </div>

              <div className="bg-slate-900/60 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                 <div className="overflow-x-auto">
                    <table className="w-full text-right">
                       <thead className="bg-white/5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                          <tr>
                             <th className="p-6">المستخدم</th>
                             <th className="p-6">الدور</th>
                             <th className="p-6">المعاملة</th>
                             <th className="p-6">التاريخ</th>
                             <th className="p-6">النوع</th>
                             <th className="p-6">الحالة</th>
                             <th className="p-6">المبلغ</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5 text-sm font-medium">
                          {loading ? (
                            <tr><td colSpan={7} className="p-12 text-center text-slate-500">جاري جلب البيانات...</td></tr>
                          ) : transactions.length === 0 ? (
                             <tr>
                                <td colSpan={7} className="p-12 text-center text-slate-500 font-bold text-lg">لا توجد معاملات مالية بعد.</td>
                             </tr>
                          ) : transactions.map(tx => (
                             <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-6 text-white font-bold">{tx.user?.name}</td>
                                <td className="p-6 text-slate-500 text-[10px] uppercase font-black">{tx.user?.role}</td>
                                <td className="p-6 text-slate-300">{tx.description}</td>
                                <td className="p-6 text-slate-400">{new Date(tx.createdAt).toLocaleDateString('ar-EG')}</td>
                                <td className="p-6">
                                   <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${
                                      tx.type === 'EARNING' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                      tx.type === 'WITHDRAWAL' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                      tx.type === 'DEPOSIT' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                   }`}>
                                      {tx.type === 'EARNING' ? 'أرباح' : tx.type === 'WITHDRAWAL' ? 'سحب' : tx.type === 'DEPOSIT' ? 'إيداع' : 'دفع'}
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
                                <td className={`p-6 font-black text-lg ${tx.type === 'EARNING' || tx.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-white'}`}>
                                   {tx.type === 'EARNING' || tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount}
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
    </div>
  );
}
