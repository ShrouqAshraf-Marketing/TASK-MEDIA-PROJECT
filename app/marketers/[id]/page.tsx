"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import { 
  Star, MapPin, Globe, Share2, 
  Users, Mail, ShieldCheck, Award, 
  TrendingUp, Briefcase, Zap, Download,
  MessageSquare, FileText, X, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { useToast } from "@/components/ToastContext";
import Link from "next/link";

export default function MarketerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, lang } = useLanguage();
  const { showToast } = useToast();
  const [marketer, setMarketer] = useState<any>(null);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [showMediaKit, setShowMediaKit] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    fetchMarketerData();
  }, [id]);

  const fetchMarketerData = async () => {
    try {
      const mRes = await fetch(`/api/marketers/${id}`);
      const mData = await mRes.json();
      
      // Defensive check: ensure mData actually contains a user
      if (mData && mData.id) {
        setMarketer(mData);
      } else {
        setMarketer(null);
      }

      const pRes = await fetch(`/api/posts`);
      const pData = await pRes.json();
      setPosts(Array.isArray(pData) ? pData.filter((p: any) => p.authorId === id) : []);
    } catch (error) {
      console.error(error);
      setMarketer(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaKit = () => {
     setShowMediaKit(true);
  };

  const handleConsult = () => {
     window.dispatchEvent(new CustomEvent('openChatWith', { detail: { userId: id } }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(lang === 'ar' ? "تم إرسال التقييم بنجاح! شكراً لك." : "Review submitted successfully! Thank you.", "success");
    setShowReviewModal(false);
    setReviewForm({ rating: 5, comment: "" });
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
    </div>
  );

  if (!marketer || !marketer.name) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
       <h1 className="text-4xl font-black text-white mb-4">لم يتم العثور على ملف الخبير</h1>
       <p className="text-slate-400 mb-8">قد يكون تم إخفاء هذا الخبير أو انتهت صلاحية الرابط.</p>
       <Link href="/dashboard" className="px-8 py-3 bg-secondary text-white font-black rounded-2xl">العودة للدليل</Link>
    </div>
  );

  return (
    <main className="min-h-screen relative font-sans text-slate-100 overflow-hidden pt-32 selection:bg-secondary/30">
      <AnimatedBackground />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-32">
        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[4rem] bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-12 overflow-hidden shadow-3xl mb-12"
        >
           <div className="flex flex-col md:flex-row gap-12 relative z-10">
              {/* Avatar Section */}
              <div className="shrink-0">
                 <div className="w-48 h-48 rounded-[3rem] bg-gradient-to-br from-secondary/20 to-accent/20 border border-white/10 flex items-center justify-center relative shadow-2xl overflow-hidden group">
                    {marketer.profileImage ? (
                      <img src={marketer.profileImage} alt={marketer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <span className="text-6xl font-black text-white">{marketer.name?.charAt(0) || 'A'}</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                    <div className="absolute bottom-4 right-4 p-2 rounded-xl bg-emerald-500 border-2 border-slate-900 shadow-lg">
                       <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                 </div>
                 
                 <div className="mt-8 flex justify-center gap-4">
                    <button onClick={() => showToast("Profile Link Copied", "info")} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-secondary/20 transition-all text-slate-400 hover:text-white">
                       <Share2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => showToast("Connecting on LinkedIn...", "info")} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-secondary/20 transition-all text-slate-400 hover:text-white">
                       <Briefcase className="w-5 h-5" />
                    </button>
                    <button onClick={() => showToast("Following on Instagram...", "info")} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-secondary/20 transition-all text-slate-400 hover:text-white">
                       <Globe className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              {/* Identity Section */}
              <div className="flex-1 space-y-8">
                 <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                       <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">{marketer.name}</h1>
                       <div className="px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-black uppercase tracking-widest flex items-center gap-2">
                          <Zap className="w-3 h-3 fill-secondary" /> {t('verifiedStrategicPartner')}
                       </div>
                    </div>
                    <p className="text-2xl text-secondary font-black tracking-wide">{marketer.specialties}</p>
                    <div className="flex items-center gap-6 text-slate-400 font-bold">
                       <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          <span>Dubai, UAE</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-accent fill-accent" />
                          <span>{marketer.rating} {t('overallRating')}</span>
                       </div>
                    </div>
                 </div>

                 <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-3xl border-l-4 border-secondary/20 pl-8 py-2">
                    "{marketer.bio || "No bio available for this expert."}"
                 </p>

                 <div className="flex flex-wrap gap-4 pt-4">
                    <button onClick={handleConsult} className="px-10 py-5 bg-gradient-to-r from-secondary to-accent text-white font-black rounded-3xl shadow-2xl flex items-center gap-3 text-lg hover:scale-105 active:scale-95 transition-all">
                       <MessageSquare className="w-6 h-6" /> بدء محادثة استشارية
                    </button>
                    <button onClick={handleMediaKit} className="px-10 py-5 bg-white/5 border border-white/5 text-white font-black rounded-3xl backdrop-blur-md flex items-center gap-3 text-lg hover:bg-white/10 transition-all">
                       <FileText className="w-6 h-6" /> الملف التعريفي والتقييمات
                    </button>
                    <button onClick={() => setShowReviewModal(true)} className="px-10 py-5 bg-white/5 border border-white/5 text-white font-black rounded-3xl backdrop-blur-md flex items-center gap-3 text-lg hover:bg-white/10 transition-all">
                       <Star className="w-6 h-6" /> إضافة تقييم
                    </button>
                 </div>
              </div>

              {/* Stats Column */}
              <div className="md:w-64 space-y-4">
                 <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10 text-center space-y-1">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{t('startingPrice')}</p>
                    <p className="text-4xl font-black text-white">${marketer.startingPrice}<span className="text-lg text-slate-400 font-bold">{t('perMonth')}</span></p>
                 </div>
                 <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center space-y-1">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{t('completedProjects')}</p>
                    <p className="text-3xl font-black text-white">48<span className="text-lg text-emerald-400 font-bold">+</span></p>
                 </div>
                 <Link href="/checkout" className="block w-full p-6 rounded-3xl bg-accent text-center font-black text-white hover:bg-orange-500 transition-all shadow-xl shadow-accent/20">
                    {t('hireMarketer')}
                 </Link>
              </div>
           </div>

           {/* Animated Background Elements */}
           <div className="absolute -left-20 -top-20 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full" />
           <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/10 blur-[120px] rounded-full" />
        </motion.div>

         {/* Success Stories Gallery */}
        <section className="space-y-12">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
               <h2 className="text-4xl font-black text-white flex items-center gap-4">
                  <Award className="w-8 h-8 text-secondary" /> {t('successStories')}
               </h2>
               <div className="flex items-center gap-2 text-slate-500 text-sm font-black uppercase tracking-widest">
                  <TrendingUp className="w-4 h-4" /> أداء معتمد وموثق
               </div>
            </div>

            {posts.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post: any) => (
                    <motion.div 
                      key={post.id} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="group relative p-8 rounded-[3.5rem] bg-slate-900/60 border border-white/5 hover:border-secondary/30 transition-all overflow-hidden shadow-2xl"
                    >
                       <div className="absolute top-6 right-6 z-10 px-4 py-1.5 rounded-full bg-secondary/10 text-[10px] font-black text-secondary uppercase tracking-[0.2em] border border-secondary/20">
                          {post.category?.toLowerCase() || 'general'}
                       </div>
                       <p className="text-lg text-white font-black mb-8 leading-tight line-clamp-3">"{post.content}"</p>
                       {post.imageUrl && (
                          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 group-hover:scale-[1.05] transition-transform duration-700">
                             <img src={post.imageUrl} alt="Portfolio" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                          </div>
                       )}
                       <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-slate-500 font-black uppercase text-[10px] tracking-widest">
                          <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> موثق 2026</span>
                          <span className="text-emerald-400">تحويل +12%</span>
                       </div>
                    </motion.div>
                  ))}
               </div>
            ) : (
               <div className="p-20 rounded-[3rem] bg-white/5 border border-white/5 text-center">
                  <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-6" />
                  <p className="text-slate-400 font-bold">لا توجد دراسات حالة عامة مرتبطة بهذا الخبير حتى الآن.</p>
               </div>
            )}
        </section>

        {/* Global CTA */}
        <div className="mt-32 p-16 md:p-24 rounded-[4rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 text-center relative overflow-hidden shadow-3xl">
            <div className="relative z-10 space-y-12">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">وظف هذا الخبير <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">الآن</span>.</h2>
              <p className="text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">عزز مكانتك في السوق بخبرة {marketer.name || 'هذا الخبير'} الاستراتيجية. نضمن لك تنفيذاً فورياً وتتبعاً مستمراً لعائد الاستثمار.</p>
              <div className="flex flex-col md:flex-row justify-center gap-8">
                 <Link href="/checkout" className="px-14 py-6 bg-gradient-to-r from-secondary to-accent text-white font-black rounded-3xl shadow-3xl shadow-secondary/30 hover:scale-105 active:scale-95 transition-all text-xl">
                    تأمين العملية
                 </Link>
                 <button onClick={handleConsult} className="px-14 py-6 bg-white/5 border border-white/5 text-white font-black rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all text-xl">
                    جلسة استشارية
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Media Kit Modal */}
      <AnimatePresence>
        {showMediaKit && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               onClick={() => setShowMediaKit(false)}
               className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
             />
             <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-3xl rounded-[3rem] bg-slate-900 border border-white/10 p-12 overflow-hidden shadow-3xl"
             >
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                   <h2 className="text-3xl font-black text-white flex items-center gap-3">
                      <FileText className="w-8 h-8 text-secondary" /> الملف التعريفي
                   </h2>
                   <button onClick={() => setShowMediaKit(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                      <X className="w-6 h-6 text-slate-400" />
                   </button>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-10 text-right">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">نسبة النجاح</p>
                      <p className="text-4xl font-black text-emerald-400">98.4%</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">متوسط عائد الاستثمار</p>
                      <p className="text-4xl font-black text-emerald-400">4.2x</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">مدة الاحتفاظ بالعملاء</p>
                      <p className="text-4xl font-black text-white">24 شهر</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">التصنيف في الصناعة</p>
                      <p className="text-4xl font-black text-white">أعلى 2%</p>
                   </div>
                </div>

                <div className="space-y-6 mb-10 text-right">
                   <p className="text-slate-400 font-medium">يتضمن هذا الملف التعريفي الشامل عمليات التدقيق التقنية، ومقاييس أداء الحملات السابقة، والأطر الاستراتيجية التي يستخدمها {marketer.name || 'هذا الخبير'}.</p>
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between flex-row-reverse">
                      <div className="flex items-center gap-3 flex-row-reverse">
                         <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                         </div>
                         <span className="text-sm font-bold text-white" dir="ltr">STRATEGY_2026.PDF</span>
                      </div>
                      <button onClick={() => showToast("Downloading kit...", "success")} className="flex items-center gap-2 text-secondary font-black text-xs hover:underline flex-row-reverse"><Download className="w-4 h-4" /> تحميل</button>
                   </div>
                </div>

                <button onClick={() => setShowMediaKit(false)} className="w-full py-5 bg-white/5 border border-white/5 text-white font-black rounded-3xl hover:bg-white/10 transition-all">إغلاق الملف</button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               onClick={() => setShowReviewModal(false)}
               className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
             />
             <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-xl rounded-[3rem] bg-slate-900 border border-white/10 p-10 overflow-hidden shadow-3xl text-right"
             >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 flex-row-reverse">
                   <h2 className="text-2xl font-black text-white flex items-center gap-3 flex-row-reverse">
                      <Star className="w-6 h-6 text-accent fill-accent" /> إضافة تقييم
                   </h2>
                   <button onClick={() => setShowReviewModal(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                      <X className="w-5 h-5 text-slate-400" />
                   </button>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">تقييمك (من 1 إلى 5)</label>
                      <div className="flex items-center justify-end gap-2 flex-row-reverse">
                         {[1, 2, 3, 4, 5].map((star) => (
                           <button 
                             key={star}
                             type="button"
                             onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                             className={`p-3 rounded-2xl border transition-all ${reviewForm.rating >= star ? 'bg-accent/20 border-accent/40 text-accent' : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'}`}
                           >
                              <Star className={`w-6 h-6 ${reviewForm.rating >= star ? 'fill-accent' : ''}`} />
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">تعليقك وتجربتك</label>
                      <textarea 
                        required 
                        rows={4} 
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        placeholder="كيف كانت تجربتك مع هذا الخبير؟ شارك التفاصيل..." 
                        className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-accent transition-all resize-none text-right"
                      />
                   </div>

                   <button type="submit" className="w-full py-5 bg-gradient-to-r from-accent to-secondary text-white font-black rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all text-lg mt-4">
                      نشر التقييم
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>


      <Footer />
    </main>
  );
}
