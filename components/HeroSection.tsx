"use client";

import { motion } from "framer-motion";
import { Target, BarChart2, Megaphone } from "lucide-react";

export default function HeroSection() {
  const cards = [
    { title: "Campaign Launch", desc: "Launch faster with smart automation.", icon: <Megaphone className="w-5 h-5" />, color: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
    { title: "Data Insights", desc: "Deep analytics to drive your ROI.", icon: <BarChart2 className="w-5 h-5" />, color: "bg-accent/20 text-accent border border-accent/30" },
    { title: "Growth Strategy", desc: "End-to-end marketing roadmaps that build sustainable, long-term success.", icon: <Target className="w-5 h-5" />, color: "bg-secondary/20 text-secondary border border-secondary/30" }
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 z-10 w-full min-h-screen">
       <div className="flex-1 text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-white/10 transition-all cursor-pointer">
             <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-lg shadow-secondary/50 animate-pulse"></div>
             The #1 Marketing Freelance Platform
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight font-extrabold text-white"
          >
             Revolutionize Your <br className="hidden lg:block"/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary drop-shadow-[0_0_10px_rgba(75,180,204,0.3)]">Marketing</span> <br className="hidden lg:block"/>
             with Task Media
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl font-medium mx-auto lg:mx-0 leading-relaxed"
          >
             The ultimate platform connecting ambitious businesses with elite freelance marketers. Build faster. Scale smarter.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-4"
          >
             <button className="w-full sm:w-auto bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white px-8 py-4 rounded-2xl font-bold tracking-wide shadow-xl shadow-secondary/20 transition-all hover:scale-105 active:scale-95 text-base sm:text-lg">
                Find Marketers
             </button>
             <button className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border-2 border-white/20 px-8 py-4 rounded-2xl font-bold tracking-wide transition-all hover:scale-105 active:scale-95 text-base sm:text-lg">
                Become a Marketer
             </button>
          </motion.div>
       </div>
       
       <div className="flex-1 w-full relative h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end">
          {cards.map((card, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: 100, rotate: 0 }}
               animate={{ opacity: 1, x: i * 20 - 20, y: i * -15, rotate: 10 + (i * 2) }}
               transition={{ duration: 0.8, delay: 0.3 + (i * 0.2), type: "spring" }}
               whileHover={{ y: i * -15 - 15, scale: 1.05, zIndex: 50, transition: { duration: 0.2 } }}
               className="absolute bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-5 md:p-6 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] w-[240px] md:w-[280px] cursor-pointer"
               style={{ zIndex: i + 10 }}
             >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-4 md:mb-5 ${card.color}`}>
                   {card.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{card.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{card.desc}</p>
             </motion.div>
          ))}
       </div>
    </section>
  );
}
