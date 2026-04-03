import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("TroqueEssaSenhaAgora@2026", 10);

  await prisma.user.upsert({
    where: { email: "admin@obra.com" },
    update: {
      password: passwordHash,
      name: "Administrador",
    },
    create: {
      name: "Administrador",
      email: "admin@obra.com",
      password: passwordHash,
    },
  });
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