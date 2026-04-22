const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const marketers = [
    {
      name: "أحمد منصور",
      email: "ahmed@taskmedia.io",
      passwordHash,
      role: "MARKETER",
      rating: 4.9,
      startingPrice: 450,
      specialties: "seo,ads",
      bio: "خبير في تهيئة محركات البحث وبناء البنية التحتية التسويقية مع أكثر من 8 سنوات من الخبرة في توسيع نطاق الشركات الناشئة.",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "سارة الفارس",
      email: "sarah@taskmedia.io",
      passwordHash,
      role: "MARKETER",
      rating: 4.8,
      startingPrice: 300,
      specialties: "ads,smm",
      bio: "متخصصة في الإعلانات المدفوعة والتركيز على حملات جوجل وميتا ذات العائد المرتفع.",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "يوسف طه",
      email: "youssef@taskmedia.io",
      passwordHash,
      role: "MARKETER",
      rating: 5.0,
      startingPrice: 600,
      specialties: "smm,content",
      bio: "خبير نمو في وسائل التواصل الاجتماعي. أبني محركات محتوى سريعة الانتشار وتحقق تحويلات عالية.",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "نور ريان",
      email: "nour@taskmedia.io",
      passwordHash,
      role: "MARKETER",
      rating: 4.7,
      startingPrice: 250,
      specialties: "content,design",
      bio: "استراتيجية محتوى ومصممة بصرية. أصوغ قصص العلامات التجارية التي تترك أثراً دائماً.",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "ليلى فريد",
      email: "layla@taskmedia.io",
      passwordHash,
      role: "MARKETER",
      rating: 4.9,
      startingPrice: 500,
      specialties: "market,seo",
      bio: "متخصصة في أبحاث السوق وتحليل البيانات لتقديم رؤى استراتيجية تقود النمو الملموس.",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
  ];

  console.log('Seeding marketers...');

  for (const m of marketers) {
    await prisma.user.upsert({
      where: { email: m.email },
      update: {},
      create: m,
    });
  }

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@taskmedia.io' },
    update: {},
    create: {
      name: 'مدير النظام',
      email: 'admin@taskmedia.io',
      passwordHash,
      role: 'ADMIN',
    },
  });

  const clientUser = await prisma.user.upsert({
    where: { email: 'client@taskmedia.io' },
    update: {},
    create: {
      name: 'عميل تجريبي',
      email: 'client@taskmedia.io',
      passwordHash,
      role: 'CLIENT',
    },
  });

  console.log('Seeding transactions...');
  const firstMarketer = await prisma.user.findUnique({ where: { email: marketers[0].email } });

  if (firstMarketer) {
    // Some transactions for the first marketer
    await prisma.transaction.createMany({
      data: [
        { amount: 1500, type: "EARNING", status: "COMPLETED", description: "أرباح مشروع تسويق رقمي لشركة عقارية", userId: firstMarketer.id },
        { amount: 250, type: "WITHDRAWAL", status: "COMPLETED", description: "سحب رصيد لحساب بنكي", userId: firstMarketer.id },
        { amount: 300, type: "EARNING", status: "PENDING", description: "دفعة معلقة لاستشارة تسويقية", userId: firstMarketer.id }
      ]
    });
  }

  // Some transactions for the client
  await prisma.transaction.createMany({
    data: [
      { amount: 2000, type: "DEPOSIT", status: "COMPLETED", description: "إيداع رصيد بالمحفظة", userId: clientUser.id },
      { amount: 450, type: "PAYMENT", status: "COMPLETED", description: "دفع لخدمة تحسين محركات البحث", userId: clientUser.id }
    ]
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
