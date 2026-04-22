"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, BarChart3, Megaphone, 
  Globe, Search, PieChart, Zap, Target,
  MessageSquare, Briefcase, Send,
  Layers, Share2, Award
} from "lucide-react";
import { useEffect, useState } from "react";

const ICON_SIZE = 24;

const icons = [
  { Icon: TrendingUp, x: "10%", y: "20%", delay: 0 },
  { Icon: BarChart3, x: "85%", y: "15%", delay: 2 },
  { Icon: Megaphone, x: "15%", y: "75%", delay: 1 },
  { Icon: Globe, x: "80%", y: "80%", delay: 3 },
  { Icon: Search, x: "50%", y: "10%", delay: 4 },
  { Icon: PieChart, x: "40%", y: "90%", delay: 0.5 },
  { Icon: Zap, x: "90%", y: "50%", delay: 2.5 },
  { Icon: Target, x: "5%", y: "45%", delay: 1.5 },
  { Icon: MessageSquare, x: "30%", y: "30%", delay: 5 },
  { Icon: Briefcase, x: "70%", y: "40%", delay: 6 },
  { Icon: Award, x: "25%", y: "60%", delay: 7 },
  { Icon: Layers, x: "60%", y: "70%", delay: 8 },
  { Icon: Share2, x: "45%", y: "20%", delay: 9 },
  { Icon: Send, x: "10%", y: "10%", delay: 10 },
];

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="fixed inset-0 z-[-1] bg-[#020617]" />
  );

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020617] flex items-center justify-center">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-secondary/15 rounded-full blur-[180px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-accent/15 rounded-full blur-[180px] pointer-events-none animate-pulse-slow-reverse" />
      
      {/* Floating Marketing Icons Array */}
      {icons.map((item, i) => {
        // Generate random values on client side only
        const randomDuration = 10 + Math.random() * 10;
        const randomSize = ICON_SIZE + Math.random() * 20;

        return (
          <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.1, 1],
                  y: [0, -40, 0],
                  x: [0, 20, 0]
              }}
              transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay
              }}
              style={{
                  position: "absolute",
                  left: item.x,
                  top: item.y,
                  filter: "drop-shadow(0 0 10px rgba(255,255,255,0.1))"
              }}
              className="text-white/40 blur-[0.5px] pointer-events-none hidden md:block"
          >
              <item.Icon size={randomSize} strokeWidth={1.5} />
          </motion.div>
        );
      })}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]" />
    </div>
  );
}
