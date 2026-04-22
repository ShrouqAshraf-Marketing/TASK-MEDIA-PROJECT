"use client";

import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen relative font-sans text-slate-100 overflow-hidden pt-32 pb-20">
      <AnimatedBackground />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="text-5xl font-extrabold text-white mb-6">Our Services</h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Detailed overview of our marketing infrastructures available for immediate deployment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
           <div className="p-10 rounded-[2rem] bg-[#0b0f1a]/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold text-accent mb-4">SEO Dominance</h2>
              <p className="text-slate-300 mb-6">Technical audits, authoritative backlink generation, and programmatic SEO scaling.</p>
           </div>
           <div className="p-10 rounded-[2rem] bg-[#0b0f1a]/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold text-secondary mb-4">Social Amplification</h2>
              <p className="text-slate-300 mb-6">Viral content mapping, daily feed management, and aggressive community interaction loops.</p>
           </div>
           <div className="p-10 rounded-[2rem] bg-[#0b0f1a]/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold text-orange-400 mb-4">Paid Ads Mastery</h2>
              <p className="text-slate-300 mb-6">High-ROAS Meta & Google architectures structured for multi-channel remarketing.</p>
           </div>
        </div>
      </div>
      
      <div className="mt-24">
         <Footer />
      </div>
    </main>
  );
}
