"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import { 
  Zap, Briefcase, 
  TrendingUp, Clock, Star, Share2, 
  Image as ImageIcon, Target, Plus, Filter,
  Search, ShieldCheck, Award, MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { useToast } from "@/components/ToastContext";
import Link from "next/link";

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  type: string;
  category: string;
  createdAt: string;
  authorId: string;
  author: {
    name: string;
    role: string;
    profileImage?: string;
    rating: number;
  };
}

const CATEGORIES = ["All", "SEO", "SMM", "Ads", "Design", "Strategy", "Content"];

export default function PulsePage() {
  const { t, lang } = useLanguage();
  const { showToast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const handleLike = (postId: string) => {
    showToast(lang === 'ar' ? "تم تسجيل إعجابك بالرؤية!" : "Insight recognized!", "success");
  };

  const handleShare = (postId: string) => {
    showToast(lang === 'ar' ? "تم نسخ رابط المشروع للمشاركة" : "Case study link copied!", "info");
  };

  return (
    <main className="min-h-screen relative font-sans text-slate-100 overflow-hidden pt-32 selection:bg-secondary/30">
      <AnimatedBackground />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-32">
        <header className="text-center space-y-6 mb-24 max-w-4xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-black uppercase tracking-[0.2em]"
           >
              <Zap className="w-4 h-4 fill-secondary" /> {t('pulse')}
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="text-6xl md:text-8xl font-black text-white tracking-tight leading-tight"
           >
              {t('explorePulse')}
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed"
           >
              {t('pulseSub')}
           </motion.p>
        </header>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-16 p-4 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl">
           <div className="flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar max-w-full px-2">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 mr-2 shrink-0">
                 <Filter className="w-4 h-4 text-slate-500" />
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${activeCategory === cat ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                >
                  {cat === 'All' ? t('all') : cat === 'Strategy' ? t('strategy') : t(cat.toLowerCase())}
                </button>
              ))}
           </div>
           
           <div className="relative w-full md:w-80 group">
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-secondary transition-colors" />
              <input 
                type="text" 
                placeholder="ابحث عن المشاريع والمنشورات..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-14 pl-6 text-sm font-bold text-white focus:outline-none focus:border-secondary transition-all font-bold text-right"
              />
           </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
             <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
             <span className="text-slate-500 font-black uppercase tracking-widest animate-pulse">{t('syncData')}</span>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
               {filteredPosts.map((post, i) => (
                 <motion.div
                   key={post.id}
                   layout
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ duration: 0.4 }}
                   className="group relative flex flex-col p-8 rounded-[3rem] bg-slate-900/40 backdrop-blur-3xl border border-white/5 hover:border-secondary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 overflow-hidden"
                 >
                   {/* Category Badge */}
                   <div className="absolute top-8 left-8 z-10">
                      <div className="px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-[10px] font-black text-secondary uppercase tracking-[0.2em] backdrop-blur-md">
                         {post.category === 'Strategy' ? t('strategy') : t(post.category?.toLowerCase() || 'general')}
                      </div>
                   </div>

                   {/* Author Info */}
                   <div className="flex items-center gap-4 mb-8">
                      <Link href={`/marketers/${post.authorId}`} className="relative group/avatar">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-xl font-black text-white shrink-0 shadow-lg relative overflow-hidden">
                           {post.author.profileImage ? (
                             <img src={post.author.profileImage} alt={post.author.name} className="w-full h-full object-cover" />
                           ) : (
                             post.author.name.charAt(0)
                           )}
                           <div className="absolute -left-1 -bottom-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                              <ShieldCheck className="w-3 h-3 text-white" />
                           </div>
                        </div>
                      </Link>
                      <div className="min-w-0">
                         <Link href={`/marketers/${post.authorId}`} className="text-lg font-black text-white truncate hover:text-secondary transition-colors inline-block">{post.author.name}</Link>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            {post.author.role === 'MARKETER' ? <Target className="w-3 h-3 text-secondary" /> : <Briefcase className="w-3 h-3 text-emerald-400" />}
                            {post.author.role === 'MARKETER' ? 'خبير' : post.author.role} • <Clock className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString()}
                         </p>
                      </div>
                   </div>

                   {/* Content */}
                   <div className="flex-1 space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                          {post.type === 'PORTFOLIO' ? t('portfolioHighlight') : post.type === 'INQUIRY' ? t('marketInquiry') : t('strategicReflections')}
                      </div>
                      <p className="text-lg text-slate-300 font-medium leading-relaxed italic line-clamp-6">
                         "{post.content}"
                      </p>

                      {post.imageUrl && (
                         <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
                            <img src={post.imageUrl} alt="Portfolio" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                               <ImageIcon className="w-4 h-4 text-white/50" />
                               <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">أصل مرئي</span>
                            </div>
                         </div>
                      )}
                   </div>

                   {/* Engagement Footer */}
                   <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                      <div className="flex gap-4">
                         <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest group/btn">
                            <Award className="w-4 h-4 group-hover/btn:text-accent transition-colors" /> رائع
                         </button>
                         <button onClick={() => handleShare(post.id)} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest group/btn">
                            <Share2 className="w-4 h-4 group-hover/btn:text-secondary transition-colors" /> مشاركة
                         </button>
                      </div>
                      <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('openChatWith', { detail: { userId: post.authorId } }))} 
                        className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white hover:bg-secondary hover:border-secondary transition-all uppercase tracking-widest flex items-center gap-2"
                      >
                         <MessageSquare className="w-3 h-3" /> استشارة
                      </button>
                   </div>

                   {/* Decoration */}
                   <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-secondary/5 blur-3xl rounded-full group-hover:bg-secondary/10 transition-colors" />
                 </motion.div>
               ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center">
             <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">{t('noProjectsAvailable')}</h2>
             <button onClick={() => {setActiveCategory("All"); setSearchQuery("");}} className="mt-8 inline-block text-secondary font-bold hover:underline">{t('explore')}</button>
          </div>
        )}

        {/* Global CTA */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-32 p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 text-center relative overflow-hidden shadow-3xl"
        >
           <div className="relative z-10 space-y-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">جاهز لإضافة بصمتك إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">نبض السوق</span>؟</h2>
              <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">انضم إلى نخبة تاسك ميديا لتبادل رؤيتك الاستراتيجية، وإطلاق طلباتك، وعرض أبرز إنجازاتك المهنية.</p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                 <Link href="/register" className="px-12 py-5 bg-gradient-to-r from-secondary to-accent text-white font-black rounded-3xl shadow-2xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg">
                    انضم لشبكتنا <Plus className="w-6 h-6" />
                 </Link>
                 <Link href="/dashboard" className="px-12 py-5 bg-white/5 border border-white/5 text-white font-black rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all text-lg">
                    بوابة الأعضاء
                 </Link>
              </div>
           </div>
           <div className="absolute -left-20 -top-20 w-96 h-96 bg-secondary/10 blur-[150px] rounded-full" />
           <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-accent/10 blur-[150px] rounded-full" />
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
