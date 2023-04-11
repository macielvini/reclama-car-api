import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cleanDb() {
  await Promise.all([
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
    prisma.car.deleteMany(),
    prisma.manufacture.deleteMany(),
  ]);
}

async function main() {
  await cleanDb();

  const chevrolet = await prisma.manufacture.create({
    data: {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/2560px-Chevrolet-logo.png",
      name: "GM - Chevrolet",
    },
  });
  const fiat = await prisma.manufacture.create({
    data: {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Fiat_logo.svg/2560px-Fiat_logo.svg.png",
      name: "Fiat",
    },
  });

  const onix = await prisma.car.create({
    data: {
      engineSize: "1.4",
      fuelType: "Flex",
      image:
        "https://2.bp.blogspot.com/-dTlaURB7_ng/UeV3Mk29S7I/AAAAAAAAbYo/d7vasLEz3uk/s1600/Novo-GM-Onix-2014-automatico+(5).jpg",
      model: "Onix",
      year: 2014,
      manufactureId: chevrolet.id,
    },
  });

  const fastback = await prisma.car.create({
    data: {
      engineSize: "1.2",
      fuelType: "Flex",
      image:
        "https://quatrorodas.abril.com.br/wp-content/uploads/2022/09/Fiat_Fastback_Limted-1.3-turbo-43-e1663185856860.jpg",
      model: "Fastback Turbo",
      year: 2022,
      manufactureId: fiat.id,
    },
  });
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
