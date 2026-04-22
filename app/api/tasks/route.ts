import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "OPEN";
    const clientId = searchParams.get("clientId");

    const where: any = {};
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;

    const tasks = await prisma.task.findMany({
      where,
      include: {
        client: {
          select: { name: true, email: true }
        },
        proposals: {
          include: {
            marketer: {
              select: { name: true, rating: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Fetch Tasks Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, budget, category, deadline } = await req.json();

    if (!title || !description || !budget) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        budget: parseFloat(budget),
        clientId: (session.user as any).id,
        status: "OPEN"
      }
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Create Task Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
