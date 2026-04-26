import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateMockMarketers() {
  const categories = ["Content", "SEO", "Social Media", "Ads", "Design", "Strategy"];
  const arabicNames = ["أحمد", "محمد", "محمود", "علي", "عمر", "خالد", "حسن", "حسين", "سارة", "فاطمة", "نورة", "مريم", "زينب", "هند", "ياسمين", "كريم", "طارق", "سامي", "رامي", "ماجد", "وليد", "عبدالرحمن", "سعد"];
  const lastNames = ["حسن", "محمد", "عبدالله", "إبراهيم", "علي", "سليمان", "يوسف", "عادل", "كمال", "سعيد", "فارس", "منصور", "الغامدي", "العتيبي", "الدوسري", "المطيري", "الجهني", "الزهراني"];
  const bios = [
    "أركز على بناء استراتيجيات نمو مستدامة تعتمد على تحليل البيانات العميقة وفهم سلوك المستهلك لتحقيق أعلى عائد على الاستثمار.",
    "خبير في تصميم حملات إبداعية تخطف الأنظار، مع خبرة تتجاوز 5 سنوات في تحويل الأفكار إلى نتائج ملموسة.",
    "شغفي هو مساعدة الشركات على الانطلاق بقوة في السوق من خلال حلول تسويقية متكاملة ومبتكرة وتوسع مستمر.",
    "أتميز بالقدرة على إدارة الميزانيات الضخمة وتوجيهها بدقة لضمان وصول الرسالة الإعلانية للجمهور المستهدف بأقل تكلفة.",
    "متخصص في بناء الهويات التجارية التي تترك انطباعاً لا ينسى، وأعمل على مواءمة أهداف العلامة التجارية مع احتياجات السوق.",
    "لدي سجل حافل في مضاعفة المبيعات عبر الإنترنت من خلال تحسين مسارات التحويل وتطبيق استراتيجيات التسويق المباشر."
  ];
  
  const generatedMarketers = [];
  let idCounter = 1;
  
  for (const category of categories) {
    for (let i = 0; i < 10; i++) {
       const fName = arabicNames[idCounter % arabicNames.length];
       const lName = lastNames[idCounter % lastNames.length];
       const bio = bios[idCounter % bios.length];
       generatedMarketers.push({
         id: `mock_m_${category.replace(/\s+/g, '_')}_${idCounter}`,
         name: `${fName} ${lName}`,
         email: `user${idCounter}@mock.com`,
         rating: parseFloat((((idCounter % 9) + 41) / 10).toFixed(1)), // Deterministic rating 4.1 to 4.9
         startingPrice: ((idCounter % 15) * 100) + 300,
         specialties: category,
         bio: bio,
         profileImage: null
       });
       idCounter++;
    }
  }
  return generatedMarketers;
}


export async function GET() {
  try {
    let marketers = await prisma.user.findMany({
      where: {
        role: "MARKETER"
      },
      select: {
        id: true,
        name: true,
        email: true,
        rating: true,
        startingPrice: true,
        specialties: true,
        bio: true,
        profileImage: true
      }
    });

    const mockMarketers = generateMockMarketers();
    // Combine real DB marketers with generated mock marketers
    marketers = [...marketers, ...mockMarketers];

    return NextResponse.json(marketers);
  } catch (error) {
    console.error("Fetch Marketers Error:", error);
    // Return dummy data instead of failing if DB is unreachable
    return NextResponse.json(generateMockMarketers());
  }
}
