import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Market Pulse API - Fixed Auth Import
export async function GET() {
  try {
    const posts = await prisma.feedPost.findMany({
      include: {
        author: {
          select: {
            name: true,
            role: true,
            profileImage: true,
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    const fallbackPosts = [
      { id: "p1", content: 'كيف تضاعف مبيعاتك في 30 يوم باستخدام الإعلانات الموجهة؟ شاركت معكم دراسة حالة جديدة.', type: 'INSIGHT', category: 'Ads', author: { name: 'ريم سعد', role: 'MARKETER' }, createdAt: new Date().toISOString() },
      { id: "p2", content: 'نصيحة اليوم: المحتوى ليس الملك إذا لم يكن موزعاً بشكل صحيح!', type: 'STRATEGY', category: 'Content', author: { name: 'محمود كمال', role: 'MARKETER' }, createdAt: new Date().toISOString() },
      { id: "p3", content: 'انتهيت للتو من تصميم هوية بصرية لشركة عقارات ناشئة. ما رأيكم بالألوان؟', imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', type: 'PORTFOLIO', category: 'Design', author: { name: 'ليلى حسن', role: 'MARKETER' }, createdAt: new Date().toISOString() }
    ];
    return NextResponse.json(fallbackPosts);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, imageUrl, type, category } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const post = await prisma.feedPost.create({
      data: {
        content,
        imageUrl,
        type: type || "INSIGHT",
        category: category || "General",
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
