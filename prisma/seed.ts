import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.manufacture.createMany({
      data: [
        {
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/2560px-Chevrolet-logo.png",
          name: "GM - Chevrolet",
        },
        {
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Fiat_logo.svg/2560px-Fiat_logo.svg.png",
          name: "Fiat",
        },
      ],
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
