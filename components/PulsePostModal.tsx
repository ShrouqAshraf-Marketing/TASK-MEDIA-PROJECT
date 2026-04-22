"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Send, ImageIcon, Plus, 
  Target, MessageSquare, Sparkles, Upload 
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface PulsePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userRole: string;
}

const CATEGORIES = ["SEO", "SMM", "Ads", "Design", "Strategy", "Content"];

export default function PulsePostModal({ isOpen, onClose, onSuccess, userRole }: PulsePostModalProps) {
  const { t } = useLanguage();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState(userRole === 'MARKETER' ? 'PORTFOLIO' : 'INQUIRY');
  const [category, setCategory] = useState("SEO");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image too large. Please use a file under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, imageUrl: image, type, category }),
      });
      if (res.ok) {
        setContent("");
        setImage(null);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[3.5rem] p-10 shadow-3xl overflow-y-auto max-h-[90vh] scrollbar-hide"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-white leading-tight">{t('broadcastPulse')}</h3>
                  <p className="text-slate-400 font-medium italic">النشر في شبكة الخبراء الاستراتيجية.</p>
                </div>
                <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Type Selection */}
                <div className="grid grid-cols-2 gap-4">
                   <button 
                     type="button" 
                     onClick={() => setType('PORTFOLIO')}
                     className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${type === 'PORTFOLIO' ? 'bg-secondary/10 border-secondary text-secondary shadow-lg shadow-secondary/10' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}`}
                   >
                      <Target className="w-6 h-6" />
                      <span className="text-xs font-black uppercase tracking-widest">{t('portfolioHighlight')}</span>
                   </button>
                   <button 
                     type="button" 
                     onClick={() => setType('INQUIRY')}
                     className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${type === 'INQUIRY' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/10' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}`}
                   >
                      <MessageSquare className="w-6 h-6" />
                      <span className="text-xs font-black uppercase tracking-widest">{t('marketInquiry')}</span>
                   </button>
                </div>

                {/* Category Selection */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">التخصص الدقيق</label>
                   <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${category === cat ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'bg-white/5 text-slate-500 border border-white/5 hover:border-white/20'}`}
                        >
                          {cat}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Content Input */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t('strategicReflections')}</label>
                   <textarea
                     required
                     rows={5}
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     placeholder={t('contentPlaceholder')}
                     className="w-full bg-slate-950/50 border border-white/10 rounded-3xl p-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-secondary transition-all resize-none font-medium italic"
                   />
                </div>

                {/* Image Dropzone */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t('uploadImage')}</label>
                   <div 
                     onClick={() => fileInputRef.current?.click()}
                     className={`w-full aspect-video rounded-3xl border-2 border-dashed border-white/10 bg-slate-950/30 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all relative overflow-hidden group ${image ? 'border-secondary/50' : ''}`}
                   >
                      {image ? (
                        <>
                          <img src={image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <Upload className="w-10 h-10 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-4 text-slate-600">
                           <ImageIcon className="w-12 h-12" />
                           <p className="text-sm font-bold uppercase tracking-widest text-center px-4">اسحب الصورة أو اضغط للرفع</p>
                        </div>
                      )}
                   </div>
                   <input 
                     type="file" 
                     ref={fileInputRef} 
                     onChange={handleImageUpload} 
                     className="hidden" 
                     accept="image/*"
                   />
                </div>

                {/* Actions */}
                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={onClose}
                    className="flex-1 py-5 bg-white/5 text-slate-400 font-black rounded-3xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
                  >
                    إلغاء
                  </button>
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="flex-[2] py-5 bg-gradient-to-r from-secondary to-accent text-white font-black rounded-3xl shadow-2xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] disabled:opacity-50"
                  >
                    {loading ? "جاري الإرسال..." : <>{t('broadcastPulse')} <Send className="w-4 h-4 rtl:rotate-180" /></>}
                  </button>
                </div>
              </form>
            </div>

            {/* Background Decoration */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full" />
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-accent/10 blur-[120px] rounded-full opacity-50" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
