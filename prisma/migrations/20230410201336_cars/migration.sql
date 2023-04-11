-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "engineSize" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "fuelType" TEXT NOT NULL,
    "manufacture_id" TEXT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "manufactures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
