import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const userRole = (session.user as any)?.role;

    // Admin can see all or a specific user's transactions
    if (userRole === "ADMIN") {
       const txs = await prisma.transaction.findMany({
         where: userId ? { userId } : undefined,
         include: { user: { select: { name: true, email: true, role: true } } },
         orderBy: { createdAt: 'desc' }
       });
       return NextResponse.json(txs);
    }

    // Client/Marketer can only see their own
    const txs = await prisma.transaction.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(txs);
  } catch (error) {
    console.error("Fetch Transactions Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { amount, type, description, userId, status } = body;

    const tx = await prisma.transaction.create({
      data: {
        amount,
        type,
        description,
        userId,
        status: status || "COMPLETED"
      }
    });

    // Update wallet balance if completed
    if (tx.status === "COMPLETED") {
       const user = await prisma.user.findUnique({ where: { id: userId }});
       if (user) {
          const newBalance = tx.type === "DEPOSIT" || tx.type === "EARNING" 
            ? user.walletBalance + tx.amount 
            : user.walletBalance - tx.amount;
            
          await prisma.user.update({
            where: { id: userId },
            data: { walletBalance: newBalance }
          });
       }
    }

    return NextResponse.json(tx, { status: 201 });
  } catch (error) {
    console.error("Create Transaction Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
