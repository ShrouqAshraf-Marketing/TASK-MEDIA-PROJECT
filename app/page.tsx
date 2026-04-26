"use client";

import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import TopHeader from "@/components/TopHeader";
import RevolutionizeSection from "@/components/RevolutionizeSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import PackageBuilder from "@/components/PackageBuilder";
import MarketerTicker from "@/components/MarketerTicker";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageContext";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen relative font-sans text-slate-100 overflow-x-hidden selection:bg-secondary/30">
       <AnimatedBackground />
       <Navbar />
       
       <TopHeader />
       <RevolutionizeSection />
       
       {/* New Infinity Marketer Ticker added right after services */}
       <MarketerTicker />

       <HowItWorksSection />
       
       {/* Consolidated Pricing & Builder Section */}
       <section id="pricing" className="py-24 relative z-10 w-full px-6 bg-black/10">
          <div className="max-w-[90rem] mx-auto">
             <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
               <span className="text-accent font-bold tracking-widest text-sm uppercase">{t('pricingTag')}</span>
               <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{t('flexibleSolutions')}</h2>
               <p className="text-slate-400 text-lg font-medium">{t('pricingSub')}</p>
             </div>

             <div className="flex flex-col gap-12 w-full">
                <div className="w-full">
                   <PricingSection />
                </div>
                <div className="w-full max-w-5xl mx-auto">
                   <PackageBuilder />
                </div>
             </div>
          </div>
       </section>

       <TestimonialsSection />

       {/* Mega Footer inserted automatically below this section */}
       <Footer />
    </main>
  );
}
