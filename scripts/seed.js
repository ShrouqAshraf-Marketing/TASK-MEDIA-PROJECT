const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting exact data seed...');

  // Create Marketers
  const marketers = [
    {
      name: 'محمود كمال',
      email: 'mahmoud@example.com',
      passwordHash: '$2a$10$X8e.F2Tq4G/L',
      role: 'MARKETER',
      specialties: 'SEO,Content',
      rating: 5.0,
      startingPrice: 50,
      bio: 'خبير تحسين محركات البحث مع خبرة 5 سنوات في مساعدة المتاجر للوصول للصفحة الأولى.'
    },
    {
      name: 'ليلى حسن',
      email: 'laila@example.com',
      passwordHash: '$2a$10$X8e.F2Tq4G/L',
      role: 'MARKETER',
      specialties: 'Design,Branding',
      rating: 4.9,
      startingPrice: 150,
      bio: 'مصممة هويات بصرية مبدعة. صممت لأكثر من 50 علامة تجارية في الخليج.'
    },
    {
      name: 'طارق زين',
      email: 'tariq@example.com',
      passwordHash: '$2a$10$X8e.F2Tq4G/L',
      role: 'MARKETER',
      specialties: 'Web Development,React',
      rating: 4.9,
      startingPrice: 300,
      bio: 'مطور واجهات ومواقع إلكترونية سريعة ومتجاوبة.'
    },
    {
      name: 'ريم سعد',
      email: 'reem@example.com',
      passwordHash: '$2a$10$X8e.F2Tq4G/L',
      role: 'MARKETER',
      specialties: 'Ads,Social Media',
      rating: 4.8,
      startingPrice: 100,
      bio: 'أدير حملات إعلانية بعائد استثمار مضمون على تيك توك وسناب شات.'
    }
  ];

  const createdMarketers = [];
  for (const m of marketers) {
    const user = await prisma.user.upsert({
      where: { email: m.email },
      update: {},
      create: m
    });
    createdMarketers.push(user);
  }
  console.log('Created 4 Marketers.');

  // Create Clients
  const clients = [
    { name: 'أحمد عبد الله', email: 'ahmed@client.com', passwordHash: '$2a$10$X8e.F2Tq4G/L', role: 'CLIENT' },
    { name: 'سارة محمد', email: 'sara@client.com', passwordHash: '$2a$10$X8e.F2Tq4G/L', role: 'CLIENT' },
    { name: 'خالد عبد الرحمن', email: 'khalid@client.com', passwordHash: '$2a$10$X8e.F2Tq4G/L', role: 'CLIENT' },
    { name: 'نورة السالم', email: 'noura@client.com', passwordHash: '$2a$10$X8e.F2Tq4G/L', role: 'CLIENT' },
    { name: 'عمر الفاسي', email: 'omar@client.com', passwordHash: '$2a$10$X8e.F2Tq4G/L', role: 'CLIENT' }
  ];

  const createdClients = [];
  for (const c of clients) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: c
    });
    createdClients.push(user);
  }
  console.log('Created 5 Clients.');

  // Feed Posts
  const feedPosts = [
    { content: 'كيف تضاعف مبيعاتك في 30 يوم باستخدام الإعلانات الموجهة؟ شاركت معكم دراسة حالة جديدة.', type: 'INSIGHT', category: 'Ads', authorId: createdMarketers[3].id },
    { content: 'نصيحة اليوم: المحتوى ليس الملك إذا لم يكن موزعاً بشكل صحيح!', type: 'STRATEGY', category: 'Content', authorId: createdMarketers[0].id },
    { content: 'انتهيت للتو من تصميم هوية بصرية لشركة عقارات ناشئة. ما رأيكم بالألوان؟', imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', type: 'PORTFOLIO', category: 'Design', authorId: createdMarketers[1].id }
  ];

  for (const p of feedPosts) {
    await prisma.feedPost.create({ data: p });
  }
  console.log('Created 3 Feed Posts.');

  // Tasks
  const tasks = [
    { title: 'مطلوب تصميم هوية بصرية كاملة', description: 'نبحث عن مصمم محترف لعمل لوجو وتصاميم سوشيال ميديا لمطعم جديد في الرياض.', budget: 800, status: 'OPEN', clientId: createdClients[0].id, category: 'Design' },
    { title: 'تحسين محركات البحث SEO لمتجر إلكتروني', description: 'متجر على منصة سلة يحتاج إلى تحسين الكلمات المفتاحية وسرعة الموقع لزيادة الزيارات العضوية.', budget: 500, status: 'OPEN', clientId: createdClients[1].id, category: 'SEO' },
    { title: 'إدارة حملات سناب شات وتيك توك', description: 'نحتاج مسوق شاطر لإدارة حملات بميزانية 2000 دولار شهرياً بعائد استثمار مضمون لتطبيق جديد.', budget: 1200, status: 'OPEN', clientId: createdClients[2].id, category: 'Ads' },
    { title: 'كتابة 10 مقالات تقنية متوافقة مع SEO', description: 'نبحث عن كاتب محتوى فاهم في التقنية لكتابة مقالات بجودة عالية وبدون ذكاء اصطناعي لمدونة شركة تقنية.', budget: 250, status: 'OPEN', clientId: createdClients[3].id, category: 'Content' },
    { title: 'برمجة وتصميم صفحة هبوط (Landing Page)', description: 'أريد مبرمج خبير في واجهات المستخدم لعمل صفحة هبوط سريعة جداً وجذابة مع أنيميشن وتكون متجاوبة 100%.', budget: 400, status: 'OPEN', clientId: createdClients[4].id, category: 'Web Development' }
  ];

  const createdTasks = [];
  for (const t of tasks) {
    const task = await prisma.task.create({ data: t });
    createdTasks.push(task);
  }
  console.log('Created 5 Tasks.');

  // Proposals
  const proposals = [
    { pitch: 'مرحباً، لدي خبرة 5 سنوات في تحسين المواقع، ويمكنني إيصال متجرك للصفحة الأولى خلال 3 أشهر. راجع ملفي.', price: 450, marketerId: createdMarketers[0].id, taskId: createdTasks[1].id },
    { pitch: 'أهلاً بك، قمت بتصميم أكثر من 50 هوية بصرية لمطاعم وشركات. يسعدني العمل معك وتقديم 3 نماذج مبدئية خلال يومين.', price: 750, marketerId: createdMarketers[1].id, taskId: createdTasks[0].id },
    { pitch: 'السلام عليكم، أنا مطور ويب ولدي أعمال سابقة كثيرة. أضمن لك سرعة تحميل لا تتجاوز ثانية واحدة وبتصميم يبهر عملائك.', price: 380, marketerId: createdMarketers[2].id, taskId: createdTasks[4].id }
  ];

  for (const pr of proposals) {
    await prisma.proposal.create({ data: pr });
  }
  console.log('Created 3 Proposals.');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
