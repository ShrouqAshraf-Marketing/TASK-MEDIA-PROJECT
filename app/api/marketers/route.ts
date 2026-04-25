import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateMockMarketers() {
  const categories = ["Content", "SEO", "Social Media", "Ads", "Design", "Strategy"];
  const arabicNames = ["أحمد", "محمد", "محمود", "علي", "عمر", "خالد", "حسن", "حسين", "سارة", "فاطمة", "نورة", "مريم", "زينب", "هند", "ياسمين", "كريم", "طارق", "سامي", "رامي", "ماجد", "وليد", "عبدالرحمن", "سعد"];
  const lastNames = ["حسن", "محمد", "عبدالله", "إبراهيم", "علي", "سليمان", "يوسف", "عادل", "كمال", "سعيد", "فارس", "منصور", "الغامدي", "العتيبي", "الدوسري", "المطيري", "الجهني", "الزهراني"];
  
  const generatedMarketers = [];
  let idCounter = 1;
  
  for (const category of categories) {
    for (let i = 0; i < 10; i++) {
       const fName = arabicNames[Math.floor(Math.random() * arabicNames.length)];
       const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
       generatedMarketers.push({
         id: `mock_m_${category.replace(/\s+/g, '_')}_${idCounter++}`,
         name: `${fName} ${lName}`,
         email: `user${idCounter}@mock.com`,
         rating: parseFloat((Math.random() * (5.0 - 4.2) + 4.2).toFixed(1)),
         startingPrice: Math.floor(Math.random() * 15) * 100 + 300,
         specialties: category,
         bio: `خبير متخصص في ${category} مع سجل حافل من النجاحات والخبرة الطويلة في مساعدة الشركات على النمو وتحقيق الأهداف المرجوة بكفاءة عالية وبأفضل المعايير.`,
         profileImage: null
       });
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
