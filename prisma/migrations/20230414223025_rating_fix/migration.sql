/*
  Warnings:

  - You are about to drop the `_CarToRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RatingToReview` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `car_id` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_id` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CarToRating" DROP CONSTRAINT "_CarToRating_A_fkey";

-- DropForeignKey
ALTER TABLE "_CarToRating" DROP CONSTRAINT "_CarToRating_B_fkey";

-- DropForeignKey
ALTER TABLE "_RatingToReview" DROP CONSTRAINT "_RatingToReview_A_fkey";

-- DropForeignKey
ALTER TABLE "_RatingToReview" DROP CONSTRAINT "_RatingToReview_B_fkey";

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "car_id" TEXT NOT NULL,
ADD COLUMN     "review_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CarToRating";

-- DropTable
DROP TABLE "_RatingToReview";

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
