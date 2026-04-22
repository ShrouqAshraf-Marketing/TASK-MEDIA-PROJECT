const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database and seeding diverse elite marketer network...');
  
  await prisma.feedPost.deleteMany({});
  
  const client = await prisma.user.findFirst({ where: { role: 'CLIENT' } });
  if (!client) {
    console.error('Seed error: Ensure you have at least one Client in the DB.');
    return;
  }

  const marketersData = [
    { name: "Ahmed Mansour", spec: "Enterprise SEO Architect", bio: "Scaling UAE's largest real estate portals using data-driven SEO architectures.", avatar: "/assets/avatars/m1.png", email: "ahmed@taskmedia.io", startPrice: 1200 },
    { name: "Sarah Al-Rashid", spec: "Lead Performance Strategist", bio: "Ex-Google ads specialist focusing on hyper-scaling GCC SaaS brands.", avatar: "/assets/avatars/f1.png", email: "sarah@taskmedia.io", startPrice: 1500 },
    { name: "Julian Thorne", spec: "Global Brand Designer", bio: "Award-winning identity designer specializing in high-contrast minimalist luxury.", avatar: "/assets/avatars/m2.png", email: "julian@taskmedia.io", startPrice: 2000 },
    { name: "Elena Volkov", spec: "E-commerce Growth Lead", bio: "Helping Shopify Plus brands achieve 40%+ yearly growth through data science.", avatar: "/assets/avatars/f1.png", email: "elena@taskmedia.io", startPrice: 1800 },
    { name: "Omar Taha", spec: "B2B LinkedIn Specialist", bio: "Generating high-value pipeline for industrial and tech sectors via LinkedIn.", avatar: "/assets/avatars/m1.png", email: "omar@taskmedia.io", startPrice: 1100 },
    { name: "Lila Chen", spec: "TikTok Viral Strategist", bio: "Creator of 50+ viral campaigns generating 100M+ organic views.", avatar: "/assets/avatars/f1.png", email: "lila@taskmedia.io", startPrice: 2500 },
    { name: "Marcus Vane", spec: "Conversion Rate Scientist", bio: "Specializing in heatmaps and behavioral analytics to double site conversion.", avatar: "/assets/avatars/m2.png", email: "marcus@taskmedia.io", startPrice: 1400 },
    { name: "Nour Al-Huda", spec: "Arabic Content Architect", bio: "Leading RTL-first content strategies for the Middle East's largest news networks.", avatar: "/assets/avatars/f1.png", email: "nour@taskmedia.io", startPrice: 900 },
    { name: "David Sterling", spec: "Meta Ads Performance Analyst", bio: "Managing $5M+ monthly spend with focus on cross-platform attribution.", avatar: "/assets/avatars/m1.png", email: "david@taskmedia.io", startPrice: 3000 },
    { name: "Zoya Malik", spec: "Market Intelligence Expert", bio: "Deep-dive competitor analysis and market entry strategy for tech startups.", avatar: "/assets/avatars/f1.png", email: "zoya@taskmedia.io", startPrice: 1600 },
  ];

  const createdMarketers = [];
  for (const m of marketersData) {
    const user = await prisma.user.upsert({
      where: { email: m.email },
      update: {
        name: m.name,
        specialties: m.spec,
        bio: m.bio,
        profileImage: m.avatar,
        startingPrice: m.startPrice,
        rating: parseFloat((4.8 + Math.random() * 0.2).toFixed(1))
      },
      create: {
        name: m.name,
        email: m.email,
        passwordHash: "$2a$10$abcdefghijklmnopqrstuvwxyz", // Dummy hash
        role: "MARKETER",
        specialties: m.spec,
        bio: m.bio,
        profileImage: m.avatar,
        startingPrice: m.startPrice,
        rating: 4.9
      }
    });
    createdMarketers.push(user);
  }

  const posts = [
    { content: "Luxury Real Estate SEO: Achieved #1 ranking for 'Premium Dubai Villas' leading to $2.5M in trackable leads.", type: "PORTFOLIO", category: "SEO", authorId: createdMarketers[0].id, imageUrl: "/assets/portfolio/ads1.png" },
    { content: "SaaS Scaling: Scale a B2B productivity tool from $5k to $50k MRR through Meta & LinkedIn Ads.", type: "PORTFOLIO", category: "Ads", authorId: createdMarketers[1].id, imageUrl: "/assets/portfolio/ads1.png" },
    { content: "FinTech Brand Identity: Full rebranding for a crypto startup including logo and UI library.", type: "PORTFOLIO", category: "Design", authorId: createdMarketers[2].id, imageUrl: "/assets/portfolio/ads1.png" },
    { content: "Market Entry Study: Comprehensive 80-page analysis for a European SaaS entering the GCC market.", type: "PORTFOLIO", category: "Strategy", authorId: createdMarketers[9].id, imageUrl: "/assets/portfolio/ads1.png" },
    { content: "Arabic Content Architecture: Revamped a major news portal's content hierarchy for better user retention.", type: "PORTFOLIO", category: "Content", authorId: createdMarketers[7].id, imageUrl: "/assets/portfolio/ads1.png" },
    { content: "Viral TikTok Launch: 10M views in 7 days for a startup beverage brand.", type: "PORTFOLIO", category: "SMM", authorId: createdMarketers[5].id, imageUrl: "/assets/portfolio/ads1.png" },
    { content: "Looking for an expert to handle $20k/mo ad spend on Meta and Google for a real estate project.", type: "INQUIRY", category: "Ads", authorId: client.id },
    { content: "Need a full brand identity refresh for an established furniture store in Riyadh.", type: "INQUIRY", category: "Design", authorId: client.id },
  ];

  for (const post of posts) {
    await prisma.feedPost.create({ data: post });
  }

  console.log('Seed completed successfully with 10 diverse elite marketers and 8 strategic cases.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
