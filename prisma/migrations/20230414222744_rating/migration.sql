/*
  Warnings:

  - You are about to drop the column `rating_id` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `rating_id` on the `reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_rating_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_rating_id_fkey";

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "rating_id";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "rating_id";

-- CreateTable
CREATE TABLE "_CarToRating" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RatingToReview" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CarToRating_AB_unique" ON "_CarToRating"("A", "B");

-- CreateIndex
CREATE INDEX "_CarToRating_B_index" ON "_CarToRating"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RatingToReview_AB_unique" ON "_RatingToReview"("A", "B");

-- CreateIndex
CREATE INDEX "_RatingToReview_B_index" ON "_RatingToReview"("B");

-- AddForeignKey
ALTER TABLE "_CarToRating" ADD CONSTRAINT "_CarToRating_A_fkey" FOREIGN KEY ("A") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToRating" ADD CONSTRAINT "_CarToRating_B_fkey" FOREIGN KEY ("B") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RatingToReview" ADD CONSTRAINT "_RatingToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RatingToReview" ADD CONSTRAINT "_RatingToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
