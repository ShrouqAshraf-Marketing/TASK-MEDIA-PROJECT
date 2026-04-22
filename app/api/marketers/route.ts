import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const marketers = await prisma.user.findMany({
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
    return NextResponse.json(marketers);
  } catch (error) {
    console.error("Fetch Marketers Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
