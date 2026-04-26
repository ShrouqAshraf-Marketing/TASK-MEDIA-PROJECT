import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Intercept mock marketers BEFORE hitting the database
    if (id.startsWith('mock_m_')) {
      const parts = id.split('_');
      const category = parts.length > 2 ? parts[2].replace(/([A-Z])/g, ' $1').trim() : "General";
      const idNumber = parseInt(parts[3] || "1", 10);
      
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
      
      const fName = arabicNames[idNumber % arabicNames.length];
      const lName = lastNames[idNumber % lastNames.length];
      const bio = bios[idNumber % bios.length];

      const mockMarketer = {
        id: id,
        name: `${fName} ${lName}`,
        email: `contact_${id}@mock.com`,
        rating: parseFloat((((idNumber % 9) + 41) / 10).toFixed(1)),
        startingPrice: ((idNumber % 15) * 100) + 300,
        specialties: category,
        bio: bio,
        profileImage: null
      };
      return NextResponse.json(mockMarketer);
    }

    const marketer = await prisma.user.findUnique({
      where: {
        id,
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

    if (!marketer) {
      return NextResponse.json({ error: "Marketer not found" }, { status: 404 });
    }

    return NextResponse.json(marketer);
  } catch (error) {
    console.error("Fetch Marketer Detail Error:", error);
    // If DB fails, return a fallback marketer so the UI doesn't break
    return NextResponse.json({
      id: "fallback_expert",
      name: "خبير معتمد",
      email: "expert@taskmedia.com",
      rating: 5.0,
      startingPrice: 300,
      specialties: "التسويق الشامل",
      bio: "حدث خطأ في الاتصال بقاعدة البيانات، لكن هذا ملف تعريفي احتياطي لضمان عمل المنصة.",
      profileImage: null
    });
  }
}
