import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, paymentMethod, plan, amount } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // 1. Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const passwordHash = await bcrypt.hash("taskmedia123", 10);
      user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: "CLIENT",
        }
      });
    }

    // 2. Create the Transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount) || 0,
        type: "PAYMENT",
        status: "COMPLETED",
        description: `دفع لخدمة/باقة: ${plan || 'غير محدد'} عبر ${paymentMethod}`,
        userId: user.id,
      }
    });

    // 3. Notify the Admin
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (admin) {
      // Find or create conversation between this user and admin
      let conversation = await prisma.conversation.findFirst({
        where: {
          AND: [
            { participants: { some: { id: user.id } } },
            { participants: { some: { id: admin.id } } }
          ]
        }
      });

      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            participants: {
              connect: [{ id: user.id }, { id: admin.id }]
            }
          }
        });
      }

      // Send the message to Admin
      await prisma.message.create({
        data: {
          content: `🔔 إشعار نظام: علاقة عمل جديدة تمت! تم الدفع بنجاح للباقة "${plan || 'غير محدد'}" بقيمة $${amount} بواسطة العميل ${name} (${email}).`,
          senderId: user.id,
          conversationId: conversation.id
        }
      });
    }

    return NextResponse.json({ success: true, transaction }, { status: 201 });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
