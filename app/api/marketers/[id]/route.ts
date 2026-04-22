import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
