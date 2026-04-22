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
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
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
