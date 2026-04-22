"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowRight, Home } from "lucide-react";

export default function FloatingNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show on home page if desired, but user said "every page". 
  // It's usually better to hide it on '/'
  if (pathname === "/") return null;

  return (
    <div className="fixed bottom-8 left-8 z-[200] flex flex-col gap-3">
      <button
        onClick={() => router.push("/")}
        className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-lg hover:bg-secondary hover:border-secondary transition-all group"
        title="الرئيسية"
      >
        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={() => router.back()}
        className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-lg hover:bg-accent hover:border-accent transition-all group"
        title="رجوع"
      >
        <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
