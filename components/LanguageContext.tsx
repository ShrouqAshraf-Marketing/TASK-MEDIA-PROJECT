"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    home: "Welcome",
    services: "Solutions",
    pricing: "Investment",
    contact: "Contact Us",
    adminLogin: "Admin Portal",
    marketerLogin: "Expert Portal",
    clientLogin: "Enterprise Login",
    
    // TopHeader
    heroTag: "Task Media: The Future of Strategic Marketing",
    igniteGrowth: "Scale Your Vision. Optimize Success. Lead the Market.",
    heroSub: "The premier ecosystem for top-tier marketing talent. Partner with elite professionals to scale your business or showcase your expertise on global projects.",
    hireMarketer: "Hire an Expert",
    becomeFreelancer: "Join our Network",
    
    // Revolutionize & Deck
    unleashCommand: "Discover our",
    commandCenter: "Strategic Management Hub",
    unleashSub: "Maximize efficiency with absolute transparency. Our integrated dual-view dashboard provides full oversight of your marketing ecosystem, allowing you to track progress, optimize ROI, and leverage AI in one central hub.",
    accessDashboard: "Launch Hub",
    coreDisciplines: "Elite",
    disciplines: "Specialties",
    disciplineSub: "We don't just provide talent. We integrate comprehensive marketing frameworks directly into your business strategy for measurable growth.",
    explore: "Learn More",
    
    // Pricing
    pricingTag: "Investment Plans",
    flexibleSolutions: "Premium Marketing Solutions",
    pricingSub: "Choose a strategic plan designed for your objectives or collaborate with us to build a custom solution tailored for your brand.",
    customPackage: "Custom Solutions",
    customPackageTag: "Tailored",
    customPackageSub: "Select specific marketing assets. Our real-time calculator ensures transparency in your project budgeting.",
    packageSummary: "Project Overview",
    noServices: "No selections made.",
    totalOutput: "Monthly Investment",
    requestQuote: "Request a Proposal",
    noHiddenFees: "Transparent pricing. Flexibility included.",
    
    // Services items
    smm: "Social Media Strategy",
    seo: "Search Engine Optimization",
    content: "Content Architecture",
    ads: "Performance Advertising",
    design: "Brand Identity Design",
    marketStudy: "Market Intelligence",

    // Ticker & Specs
    tasksCompleted: "Successful Collaborations",
    specSeo: "SEO Specialist",
    specAds: "Media Strategist",
    specSocial: "Social Strategist",
    specContent: "Content Architect",
    specMedia: "Performance Analyst",
    specDesign: "Identity Designer",
    specWeb: "Data Strategist",
    specWebDev: "Web Strategist",

    // Pricing & Builder
    starter: "Professional",
    proMatrix: "Executive",
    enterprise: "Enterprise",
    mostPopular: "Recommended",
    viewPackage: "View Details",
    contactSales: "Speak with us",
    perMonth: "/mo",

    // How It Works
    simpleProcess: "The Methodology",
    howItWorks: "How We Partner",
    howItWorksSub: "A structured, transparent, and results-driven approach to every project.",
    step1: "Define Your Goal",
    step1desc: "Outline your requirements and objectives. Our system creates a professional project brief.",
    step2: "Select Your Expert",
    step2desc: "Review profiles of vetted professionals. Compare track records and strategic approaches.",
    step3: "Execute & Grow",
    step3desc: "Collaborate in real-time. Monitor key metrics and achieve significant market results.",

    // Dashboard General
    dashboard: "Dashboard",
    networkPulse: "Performance Pulse",
    activeOperations: "Active Projects",
    sourcingCenter: "Talent Center",
    systemSettings: "Settings",
    welcomeBack: "Welcome back",
    launchOperation: "New Project",
    availableCredits: "Current Balance",
    topUp: "Add Funds",
    activeSpend: "Project Investment",
    reachDelta: "Reach Growth",
    avgCPA: "Average CPA",
    missionBoard: "Project Board",
    ledger: "Financials",
    missionIntelligence: "Project Intelligence",
    deployProposal: "Submit Proposal",
    engagementFee: "Service Fee",
    strategicPitch: "Strategic Proposal",
    manage: "Manage",
    vsLastWeek: "VS Last Week",
    syncData: "Synchronizing Data...",
    efficiencyStatus: "Efficiency Status",
    performanceVelocity: "Performance Velocity",
    strategicOpportunities: "Strategic Opportunities",
    noProjectsAvailable: "No Projects Available",
    selectedProject: "Selected Project",
    engagementFeePlaceholder: "Engagement Fee",

    // Pulse & Feed
    pulse: "Market Pulse",
    explorePulse: "Explore the Pulse",
    pulseSub: "Real-time strategic insights and portfolio highlights from the Task Media elite.",
    shareInsight: "Post an Insight",
    sharePortfolio: "Showcase Work",
    postType: "Post Type",
    marketInquiry: "Market Inquiry",
    portfolioHighlight: "Portfolio Highlight",
    strategicReflections: "Strategic Reflections",
    broadcastPulse: "Broadcast to Pulse",
    uploadImage: "Upload Image",
    contentPlaceholder: "Share your strategic vision or request...",
    broadcastSuccess: "Broadcasted to Pulse!",
    all: "All",
    strategy: "Strategy",

    // Checkout Labels
    confirmSelection: "Confirm Selection",
    reviewYourSelection: "Review Your Selection",
    activatePlan: "Verify your details below to activate your professional marketing plan.",
    selectedSolution: "Selected Solution",
    highImpactPackage: "High-Impact Package",
    directStrategicHire: "Direct Strategic Hire",
    serviceActivationLabel: "Project Activation",
    instant: "Instant",
    totalInvestment: "Total Investment",
    securedTransactions: "Transactions Secured",
    onboardingProcess: "The official onboarding process has begun. Our team will contact you shortly.",

    // Profile Labels
    verifiedStrategicPartner: "Verified Strategic Partner",
    startingPrice: "Starting Price",
    overallRating: "Overall Rating",
    instantResponse: "Instant Response",
    professionalVerification: "Professional Verification",
    authenticatedPerformance: "Authenticated Performance",
    strategicApproach: "Strategic Approach",
    completedProjects: "Completed Projects",
    avgROI: "Avg. ROI Delivered",
    activeClients: "Active Clients",
    experience: "Experience",
    successStories: "Success Stories",

    // Testimonials
    trustedLeaders: "Trusted by Leaders",
    strategicImpact: "Strategic Impact",
    readTestimonials: "Read how global enterprises leverage Task Media's elite network to achieve measurable growth.",

    // Features Section
    featuresTag: "Platform Features",
    builtForScale: "Built for Scale",
    aiMatching: "AI Matching",
    aiMatchingDesc: "Our proprietary algorithm connects your project brief with the perfect verified expert in seconds, ensuring elite quality alignments.",
    realTimeTracking: "Real-Time Tracking",
    realTimeTrackingDesc: "Monitor your marketing campaign KPIs and deliverables live through our integrated analytics tracking suite.",
    customPackagesTitle: "Custom Packages",
    customPackagesDesc2: "From standalone SEO to comprehensive 360-marketing, build a tailored package adjusting instantly to your needs.",
    verifiedExperts: "Verified Experts",
    verifiedExpertsDesc: "Every freelancer undergoes a rigorous vetting process matching strict top-tier enterprise standards before onboarding.",

    // Pricing Section extras
    completeInfrastructure: "Complete infrastructure array for immediate deployment.",
    starterFeat1: "2 Social Platforms",
    starterFeat2: "12 Posts per month",
    starterFeat3: "Basic SEO Setup",
    starterFeat4: "Standard Analytics",
    proFeat1: "4 Social Platforms",
    proFeat2: "Daily Posting",
    proFeat3: "Advanced SEO & Backlinks",
    proFeat4: "Dedicated Account Manager",
    proFeat5: "Custom Ad Campaigns",
    entFeat1: "Unlimited Platforms",
    entFeat2: "Programmatic SEO Scaling",
    entFeat3: "API Dashboard Integration",
    entFeat4: "Multi-channel Remarketing",
    entFeat5: "24/7 Priority Support",

    // Testimonials Section additions
    verifiedBadge: "Verified",
    alexanderRole: "CEO, NexaTech Solutions",
    alexanderQuote: "Task Media transformed our marketing from a cost center to a massive profit driver. Their strategic approach to Ads and SEO is unparalleled.",
    sarahRole: "Marketing Director, Oasis Global",
    sarahQuote: "The level of expertise on this platform is elite. We found a Content Architect who completely rebuilt our brand voice for the GCC market.",
    marcusRole: "Founder, Thorne Digital",
    marcusQuote: "Transparent project management and world-class talent. The real-time ROI tracking in the dashboard is a game-changer for our scale.",

    // Footer
    joinFree: "Join Task Media",
    rightsReserved: "All rights reserved.",
    quickLinks: "Information",
    legal: "Resources",
    subscribe: "Stay Updated",
    aboutUs: "About Us",
    newsletterSub: "Receive the best marketing insights and platform updates directly to your inbox.",
    emailPlaceholder: "Email Address...",
    joinBtn: "Join",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service"
  },
  ar: {
    // Navbar
    home: "الرئيسية",
    services: "الحلول",
    pricing: "الاستثمار",
    contact: "تواصل معنا",
    adminLogin: "بوابة الإدارة",
    marketerLogin: "بوابة الخبراء",
    clientLogin: "دخول المؤسسات",
    
    // TopHeader
    heroTag: "تاسك ميديا: مستقبل التسويق الاستراتيجي",
    igniteGrowth: "وسع طموحك. حقق نجاحك. قد السوق.",
    heroSub: "البيئة الرائدة لنخبة المواهب التسويقية. تعاقد مع محترفين لتوسيع نطاق أعمالك أو استعرض خبراتك في مشاريع عالمية.",
    hireMarketer: "وظف خبيراً",
    becomeFreelancer: "انضم لشبكتنا",
    
    // Revolutionize & Deck
    unleashCommand: "اكتشف",
    commandCenter: "مركز الإدارة الاستراتيجية",
    unleashSub: "ارفع الكفاءة بشفافية مطلقة. توفر لوحة التحكم المتكاملة إشرافاً كاملاً على خطتك التسويقية، مما يتيح لك تتبع التقدم، وتحسين العائد، واستخدام الذكاء الاصطناعي في مركز واحد.",
    accessDashboard: "تشغيل المنصة",
    coreDisciplines: "نخبة",
    disciplines: "التخصصات",
    disciplineSub: "نحن لا نوفر مجرد مواهب، بل ندمج أطراً تسويقية شاملة مباشرة في استراتيجية عملك لتحقيق نمو ملموس.",
    explore: "اعرف المزيد",
    
    // Pricing
    pricingTag: "خطط الاستثمار",
    flexibleSolutions: "حلول تسويقية متميزة",
    pricingSub: "اختر خطة استراتيجية مصممة لأهدافك أو تعاون معنا لبناء حل مخصص يتناسب مع علامتك التجارية.",
    customPackage: "حلول مخصصة",
    customPackageTag: "خاصة",
    customPackageSub: "حدد الأدوات التسويقية التي تحتاجها بدقة. تضمن حاسبتنا الذكية الشفافية الكاملة في ميزانية مشروعك.",
    packageSummary: "نظرة على المشروع",
    noServices: "لم يتم اختيار عناصر.",
    totalOutput: "الاستثمار الشهري",
    requestQuote: "طلب عرض سعر",
    noHiddenFees: "تسعير شفاف. مرونة كاملة.",
    
    // Services items
    smm: "استراتيجية السوشيال ميديا",
    seo: "تهيئة محركات البحث",
    content: "هندسة المحتوى",
    ads: "الإعلانات الأدائية",
    design: "هوية العلامة التجارية",
    marketStudy: "استخبارات السوق",

    // Ticker & Specs
    tasksCompleted: "تعاونات ناجحة",
    specSeo: "أخصائي SEO",
    specAds: "استراتيجي ميديا",
    specSocial: "استراتيجي تواصل",
    specContent: "مهندس محتوى",
    specMedia: "محلل أداء",
    specDesign: "مصمم هوية",
    specWeb: "استراتيجي بيانات",
    specWebDev: "استراتيجي ويب",

    // Pricing & Builder
    starter: "احترافي",
    proMatrix: "تنفيذي",
    enterprise: "مؤسسات",
    mostPopular: "موصى به",
    viewPackage: "عرض التفاصيل",
    contactSales: "تحدث معنا",
    perMonth: "/شهرياً",

    // How It Works
    simpleProcess: "المنهجية",
    howItWorks: "كيف نتمم الشراكة؟",
    howItWorksSub: "نهج منظم، شفاف، ويركز على النتائج في كل مشروع.",
    step1: "حدد هدفك",
    step1desc: "حدد متطلباتك وأهدافك. يقوم نظامنا بإنشاء موجز مشروع احترافي.",
    step2: "اختر خبيرك",
    step2desc: "راجع ملفات المحترفين المعتمدين. قارن سجلات الإنجاز والنهج الاستراتيجي لكل خبير.",
    step3: "التنفيذ والنمو",
    step3desc: "تعاون لحظياً. راقب المؤشرات الرئيسية وحقق نتائج ملموسة في السوق.",

    // Dashboard General
    dashboard: "لوحة التحكم",
    networkPulse: "نبض الأداء",
    activeOperations: "المشاريع النشطة",
    sourcingCenter: "مركز المواهب",
    systemSettings: "الإعدادات",
    welcomeBack: "مرحباً بك",
    launchOperation: "مشروع جديد",
    availableCredits: "الرصيد الحالي",
    topUp: "شحن الرصيد",
    activeSpend: "الإنفاق الحالي",
    reachDelta: "نمو الوصول",
    avgCPA: "متوسط التكلفة",
    missionBoard: "لوحة المشاريع",
    ledger: "السجل المالي",
    missionIntelligence: "بيانات المشروع",
    deployProposal: "تقديم عرض",
    engagementFee: "رسوم الخدمة",
    strategicPitch: "العرض الاستراتيجي",
    manage: "إدارة",
    vsLastWeek: "مقارنة بالأسبوع الماضي",
    syncData: "جاري مزامنة البيانات...",
    efficiencyStatus: "حالة الكفاءة",
    performanceVelocity: "سرعة الأداء",
    strategicOpportunities: "فرص استراتيجية",
    noProjectsAvailable: "لا توجد مشاريع متاحة",
    selectedProject: "المشروع المختار",
    engagementFeePlaceholder: "رسوم الارتباط",

    // Pulse & Feed
    pulse: "نبض السوق",
    explorePulse: "استكشف نبض السوق",
    pulseSub: "رؤى استراتيجية لحظية وأبرز أعمال النخبة في تاسك ميديا.",
    shareInsight: "أنشر رؤية",
    sharePortfolio: "أبرز أعمالك",
    postType: "نوع المنشور",
    marketInquiry: "استفسار سوق",
    portfolioHighlight: "أبرز الأعمال",
    strategicReflections: "تأملات استراتيجية",
    broadcastPulse: "نشر في نبض السوق",
    uploadImage: "رفع صورة",
    contentPlaceholder: "شارك رؤيتك الاستراتيجية أو طلبك...",
    broadcastSuccess: "تم النشر في نبض السوق!",
    all: "الكل",
    strategy: "الاستراتيجية",

    // Checkout Labels
    confirmSelection: "تأكيد الاختيار",
    reviewYourSelection: "مراجعة طلبيتك",
    activatePlan: "تحقق من التفاصيل أدناه لتفعيل خطتك التسويقية الاحترافية.",
    selectedSolution: "الحل المختار",
    highImpactPackage: "حزمة عالية التأثير",
    directStrategicHire: "تعاقد استراتيجي مباشر",
    serviceActivationLabel: "تفعيل المشروع",
    instant: "فوري",
    totalInvestment: "إجمالي الاستثمار",
    securedTransactions: "عمليات مؤمنة",
    onboardingProcess: "بدأت عملية التأهيل الرسمية. سيتواصل معك فريقنا قريباً.",

    // Profile Labels
    verifiedStrategicPartner: "شريك استراتيجي معتمد",
    startingPrice: "السعر المبدئي",
    overallRating: "التقييم العام",
    instantResponse: "استجابة فورية",
    professionalVerification: "التحقق المهني",
    authenticatedPerformance: "أداء موثق",
    strategicApproach: "النهج الاستراتيجي",
    completedProjects: "المشاريع المنجزة",
    avgROI: "العائد المتوسط",
    activeClients: "العملاء الحاليين",
    experience: "سنوات الخبرة",
    successStories: "قصص نجاح",

    // Testimonials
    trustedLeaders: "موثوق من القادة",
    strategicImpact: "أثر استراتيجي",
    readTestimonials: "اقرأ كيف تستفيد المؤسسات العالمية من شبكة تاسك ميديا النخبوية لتحقيق نمو ملموس.",

    // Features Section
    featuresTag: "ميزات المنصة",
    builtForScale: "مصمم للتوسع",
    aiMatching: "مطابقة بالذكاء الاصطناعي",
    aiMatchingDesc: "تقوم خوارزمياتنا بربط موجز مشروعك بالخبير المعتمد المثالي في ثوانٍ، مما يضمن أفضل جودة وتوافق.",
    realTimeTracking: "تتبع فوري",
    realTimeTrackingDesc: "راقب مؤشرات الأداء الرئيسية (KPIs) لحملتك التسويقية ومخرجاتها مباشرة عبر نظام التتبع والتحليل المدمج لدينا.",
    customPackagesTitle: "باقات مخصصة",
    customPackagesDesc2: "من تهيئة محركات البحث (SEO) بشكل مستقل إلى تسويق شامل 360 درجة، ابني باقة مصممة تتكيف فوراً مع احتياجاتك.",
    verifiedExperts: "خبراء معتمدون",
    verifiedExpertsDesc: "يخضع كل مستقل لعملية تدقيق صارمة تتطابق مع معايير أعلى الشركات أداءً قبل الانضمام للمنصة.",

    // Pricing Section extras
    completeInfrastructure: "بنية تحتية متكاملة لانتشار فوري.",
    starterFeat1: "منصتين تواصل اجتماعي",
    starterFeat2: "12 منشور شهرياً",
    starterFeat3: "تأسيس أساسي لـ SEO",
    starterFeat4: "تحليلات قياسية",
    proFeat1: "4 منصات تواصل اجتماعي",
    proFeat2: "نشر يومي",
    proFeat3: "SEO متقدم وروابط خلفية (Backlinks)",
    proFeat4: "مدير حساب مخصص",
    proFeat5: "حملات إعلانية مخصصة",
    entFeat1: "منصات غير محدودة",
    entFeat2: "توسع برمجي لـ SEO",
    entFeat3: "ربط واجهة برمجة التطبيقات (API)",
    entFeat4: "إعادة استهداف عبر قنوات متعددة",
    entFeat5: "دعم مخصص على مدار الساعة",

    // Testimonials Section additions
    verifiedBadge: "موثق",
    alexanderRole: "الرئيس التنفيذي، نكسا تك سوليوشنز",
    alexanderQuote: "لقد حولت تاسك ميديا تسويقنا من مركز تكلفة إلى محرك أرباح ضخم. نهجهم الاستراتيجي في الإعلانات وتهيئة محركات البحث لا يعلى عليه.",
    sarahRole: "مديرة التسويق، أوايسس جلوبال",
    sarahQuote: "مستوى الخبرة على هذه المنصة نخبوية. لقد وجدنا مهندس محتوى أعاد بناء هوية علامتنا التجارية بالكامل لسوق دول مجلس التعاون الخليجي.",
    marcusRole: "المؤسس، ثورن ديجيتال",
    marcusQuote: "إدارة مشاريع شفافة ومواهب عالمية المستوى. التتبع الفوري لعائد الاستثمار في لوحة التحكم هو نقطة تحول لتوسعنا.",

    // Footer
    joinFree: "انضم إلى تاسك ميديا",
    rightsReserved: "جميع الحقوق محفوظة.",
    quickLinks: "معلومات",
    legal: "المصادر",
    subscribe: "ابقَ على اطلاع",
    aboutUs: "عن الشركة",
    newsletterSub: "احصل على أفضل الرؤى التسويقية وتحديثات المنصة مباشرة في بريدك الوارد.",
    emailPlaceholder: "البريد الإلكتروني...",
    joinBtn: "انضم",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>("ar");

  useEffect(() => {
    // Sync the HTML dir and lang attributes natively for exact browser RTL
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.body.classList.toggle('rtl', lang === 'ar');
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prevLang => (prevLang === "en" ? "ar" : "en"));
  };

  const t = (key: string) => {
    return (translations[lang] as any)[key] || (translations['en'] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
