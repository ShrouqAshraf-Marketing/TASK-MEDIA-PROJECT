import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  try {
    // If admin, show all conversations. If user, show only their own.
    const conversations = await prisma.conversation.findMany({
      where: role === 'ADMIN' ? {} : {
        participants: {
          some: { id: userId }
        }
      },
      include: {
        participants: {
          select: { id: true, name: true, role: true, profileImage: true }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: { sender: { select: { name: true } } }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const currentUserId = (session.user as any).id;
  const { participantId } = await req.json();

  if (!participantId) return NextResponse.json({ error: "Participant ID required" }, { status: 400 });

  try {
    // Check if conversation already exists between these TWO participants
    // (Excluding group chats for now)
    const existing = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { id: currentUserId } } },
          { participants: { some: { id: participantId } } }
        ]
      },
      include: {
        participants: {
          select: { id: true, name: true, role: true, profileImage: true }
        }
      }
    });

    if (existing) return NextResponse.json(existing);

    // Create new
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [
            { id: currentUserId },
            { id: participantId }
          ]
        }
      },
      include: {
        participants: {
          select: { id: true, name: true, role: true, profileImage: true }
        }
      }
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
  }
}
