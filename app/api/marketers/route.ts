import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    if (!marketers || marketers.length === 0) {
      marketers = [
        {
          id: "m1",
          name: "أحمد حسن",
          email: "ahmed@example.com",
          rating: 4.9,
          startingPrice: 500,
          specialties: "SEO,هندسة المحتوى",
          bio: "خبير استراتيجي في محركات البحث مع خبرة 7 سنوات في السوق الخليجي.",
          profileImage: null
        },
        {
          id: "m2",
          name: "سارة محمد",
          email: "sarah@example.com",
          rating: 4.8,
          startingPrice: 750,
          specialties: "إعلانات أدائية,استراتيجية السوشيال ميديا",
          bio: "متخصصة في الإعلانات المدفوعة وإدارة حملات السوشيال ميديا بميزانيات ضخمة.",
          profileImage: null
        },
        {
          id: "m3",
          name: "عمر خالد",
          email: "omar@example.com",
          rating: 5.0,
          startingPrice: 1200,
          specialties: "هوية العلامة التجارية,تصميم",
          bio: "مصمم هويات بصرية وعلامات تجارية متكاملة للشركات الكبرى والمؤسسات.",
          profileImage: null
        }
      ] as any;
    }

    return NextResponse.json(marketers);
  } catch (error) {
    console.error("Fetch Marketers Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
