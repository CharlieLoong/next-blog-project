import { PrismaClient, Prisma } from '@prisma/client';
import old from './old.json';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Charlie',
    email: 'elucidatordragon@gmail.com',
    posts: {
      create: old.map((post: { title: any; content: any }) => {
        return {
          title: post.title,
          content: post.content,
          published: true,
        };
      }),
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
