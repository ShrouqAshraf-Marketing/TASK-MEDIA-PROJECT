"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Copy, PenTool, LayoutTemplate, MessageSquareMore, Layers, PieChart } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useRouter } from "next/navigation";

export default function DeckOfCardsFeatures() {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const { t } = useLanguage();
  
  const [isMobile, setIsMobile] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = [
    {
      id: "content",
      title: t('content'),
      desc: t('smm'),
      icon: <PenTool className="w-8 h-8 text-white" />,
      color: "from-orange-500 to-accent"
    },
    {
      id: "seo",
      title: t('seo'),
      desc: t('content'),
      icon: <LayoutTemplate className="w-8 h-8 text-white" />,
      color: "from-secondary to-cyan-400"
    },
    {
      id: "smm",
      title: t('smm'),
      desc: t('ads'),
      icon: <Copy className="w-8 h-8 text-white" />,
      color: "from-slate-600 to-slate-400"
    },
    {
      id: "ads",
      title: t('ads'),
      desc: t('smm'),
      icon: <MessageSquareMore className="w-8 h-8 text-white" />,
      color: "from-accent to-orange-400"
    },
    {
      id: "design",
      title: t('design'),
      desc: t('content'),
      icon: <Layers className="w-8 h-8 text-white" />,
      color: "from-indigo-500 to-purple-400"
    },
    {
      id: "market",
      title: t('marketStudy'),
      desc: t('seo'),
      icon: <PieChart className="w-8 h-8 text-white" />,
      color: "from-emerald-500 to-teal-400"
    }
  ];

  /* Absolute Playing Card Fan Math (6 Cards) across 1200px width */
  const desktopSpread = [
    { x: -500, y: 70, rotate: -18 },
    { x: -300, y: 25, rotate: -10 },
    { x: -100, y: 0,  rotate: -3 },
    { x: 100,  y: 0,  rotate: 3 },
    { x: 300,  y: 25, rotate: 10 },
    { x: 500,  y: 70, rotate: 18 }
  ];

  const handleCardClick = (serviceId: string) => {
    router.push(`/marketers?service=${serviceId}`);
  };

  return (
    <div className="relative w-full pb-16 lg:pb-32 flex flex-col items-center justify-center min-h-auto lg:min-h-[550px]" ref={ref}>
       
       {/* Cards Deck Area */}
       <div className="relative w-full max-w-[1200px] flex flex-col lg:block items-center justify-center pt-10 gap-6 lg:gap-0 lg:h-[400px]">
          {services.map((svc, i) => (
             <motion.div
               key={i}
               initial={{ 
                  x: 0, 
                  y: 100, 
                  rotate: 0, 
                  scale: 0.8,
                  opacity: 0,
                  zIndex: 6 - i 
               }}
               animate={isInView ? {
                  opacity: 1,
                  x: isMounted && !isMobile ? desktopSpread[i].x : 0,
                  y: isMounted && !isMobile ? desktopSpread[i].y : 0,
                  rotate: isMounted && !isMobile ? desktopSpread[i].rotate : 0,
                  scale: 1,
                  zIndex: i
               } : {}}
               whileHover={{ 
                  scale: 1.05, 
                  y: isMounted && !isMobile ? desktopSpread[i].y - 40 : -10,
                  rotate: isMounted && !isMobile ? desktopSpread[i].rotate / 2 : 0,
                  zIndex: 50 
               }}
               transition={{ 
                  type: "spring", 
                  stiffness: 90, 
                  damping: 15, 
                  delay: i * 0.1 
               }}
               onClick={() => handleCardClick(svc.id)}
               className="relative lg:absolute lg:left-1/2 lg:-ml-[140px] w-full max-w-[320px] lg:max-w-none lg:w-[280px] h-fit min-h-[300px] bg-[#0b0f1a] border-2 border-white/5 rounded-[2rem] p-8 shadow-xl flex flex-col justify-between cursor-pointer group hover:border-accent/40"
               style={{
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)"
               }}
             >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5 shadow-lg shadow-black/30 group-hover:scale-110 transition-transform shrink-0`}>
                   {svc.icon}
                </div>
                
                <div className="flex-1 min-h-[100px]">
                   <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-secondary transition-colors leading-tight">{svc.title}</h3>
                   <p className="text-slate-300 text-sm leading-relaxed font-medium">{svc.desc}</p>
                </div>

                <div className="w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pt-6 border-t border-white/10 mt-6 shrink-0">
                   <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary uppercase tracking-widest">{t('explore')}</span>
                   <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                   </div>
                </div>
             </motion.div>
          ))}
       </div>
    </div>
  );
}
