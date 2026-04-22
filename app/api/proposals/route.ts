import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user as any).role !== "MARKETER") {
      return NextResponse.json({ error: "Unauthorized. Marketer role required." }, { status: 401 });
    }

    const { taskId, pitch, price } = await req.json();

    if (!taskId || !pitch || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if task exists and is open
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task || task.status !== "OPEN") {
      return NextResponse.json({ error: "Task is not available for proposals" }, { status: 400 });
    }

    // Check if marketer already submitted a proposal
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        taskId,
        marketerId: (session.user as any).id
      }
    });

    if (existingProposal) {
      return NextResponse.json({ error: "You have already submitted a proposal for this task" }, { status: 400 });
    }

    const proposal = await prisma.proposal.create({
      data: {
        taskId,
        pitch,
        price: parseFloat(price),
        marketerId: (session.user as any).id
      }
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error("Create Proposal Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
