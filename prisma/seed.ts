import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function cleanDb() {
  await Promise.all([
    prisma.session.deleteMany(),
    prisma.tagsOnReviews.deleteMany(),
    prisma.rating.deleteMany(),
    prisma.review.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.car.deleteMany(),
    prisma.manufacture.deleteMany(),
    prisma.user.deleteMany(),
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

  const hyundai = await prisma.manufacture.create({
    data: {
      image:
        "https://logodownload.org/wp-content/uploads/2014/05/hyundai-logo.png",
      name: "Hyundai",
    },
  });

  const toyota = await prisma.manufacture.create({
    data: {
      image: "https://logospng.org/download/toyota/logo-toyota-4096.png",
      name: "Toyota",
    },
  });

  const honda = await prisma.manufacture.create({
    data: {
      image: "https://www.pngmart.com/files/1/Honda-Logo-PNG.png",
      name: "Honda",
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

  const civic = await prisma.car.create({
    data: {
      engineSize: "1.8",
      fuelType: "Flex",
      image:
        "https://quatrorodas.abril.com.br/wp-content/uploads/2021/04/2022-honda-civic-touring.jpg",
      model: "Civic Touring Turbo",
      year: 2022,
      manufactureId: honda.id,
    },
  });

  const corolla = await prisma.car.create({
    data: {
      engineSize: "1.8",
      fuelType: "Gasolina",
      image:
        "https://s1.cdn.autoevolution.com/images/gallery/TOYOTA-Corolla--US--673_39.jpg",
      model: "Corolla XEi 16v",
      year: 2002,
      manufactureId: toyota.id,
    },
  });

  const hb20 = await prisma.car.create({
    data: {
      engineSize: "1.0",
      fuelType: "Flex",
      image:
        "https://quatrorodas.abril.com.br/wp-content/uploads/2022/07/NOVO-HB20-7.jpg",
      model: "HB20",
      year: 2023,
      manufactureId: hyundai.id,
    },
  });

  await prisma.tag.createMany({
    data: [
      { color: "#3ED926", name: "recomendação" },
      { color: "#FD5824", name: "reclamação" },
      { color: "#24BCFD", name: "atualização" },
    ],
  });

  const hashedPassword = await bcrypt.hash("useradmin", 10);
  const adminUser = await prisma.user.create({
    data: {
      email: "user@admin.com",
      image: faker.image.cats(500, 500),
      name: faker.name.fullName(),
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(
    "\x1b[1m",
    "\x1b[32m",
    "✔️ New admin user created successfully 🥳 ",
    "\x1b[0m"
  );
  console.log({
    name: adminUser.name,
    email: adminUser.email,
    image: adminUser.image,
    password: "useradmin",
    role: adminUser.role,
  });

  await prisma.review.createMany({
    data: [
      {
        carId: onix.id,
        text: "Review do Onix",
        title: "Onix",
        userId: adminUser.id,
      },
      {
        carId: fastback.id,
        text: "Review do Fastback",
        title: "Fastback",
        userId: adminUser.id,
      },
      {
        carId: civic.id,
        text: "Review do Civic",
        title: "Civic",
        userId: adminUser.id,
      },
      {
        carId: corolla.id,
        text: "Review do Corolla",
        title: "Corolla",
        userId: adminUser.id,
      },
      {
        carId: hb20.id,
        text: "Review do HB20",
        title: "HB20",
        userId: adminUser.id,
      },
    ],
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
