const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'shrouq@taskmedia.io';
  const name = 'شروق';
  const password = 'admin'; // simple password, she can change it or just use it

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    console.log('User already exists, updating role to ADMIN...');
    await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN', name }
    });
    console.log('Admin user updated!');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: 'ADMIN'
    }
  });

  console.log('Admin user Shrouq created successfully!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
