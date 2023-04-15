/*
  Warnings:

  - You are about to drop the column `comfort` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `consumption` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `drivability` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `general` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `maintenance` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "rating_id" TEXT;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "comfort",
DROP COLUMN "consumption",
DROP COLUMN "drivability",
DROP COLUMN "general",
DROP COLUMN "maintenance",
ADD COLUMN     "rating_id" TEXT;

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maintenance" INTEGER NOT NULL,
    "drivability" INTEGER NOT NULL,
    "comfort" INTEGER NOT NULL,
    "consumption" INTEGER NOT NULL,
    "general" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_rating_id_fkey" FOREIGN KEY ("rating_id") REFERENCES "Rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_rating_id_fkey" FOREIGN KEY ("rating_id") REFERENCES "Rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;
