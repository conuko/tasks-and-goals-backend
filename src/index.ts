import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const newUser = await prisma.user.create({
    data: {
      name: "Consti",
      email: "consti@prisma.io",
      password: "123",
      tasks: {
        create: {
          content: "Hello World!",
        },
      },
    },
  });
  console.log("Created new user: ", newUser);

  const allUsers = await prisma.user.findMany({
    include: { tasks: true },
  });
  console.log("All users: ");
  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
