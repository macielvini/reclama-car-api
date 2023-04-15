/*
  Warnings:

  - A unique constraint covering the columns `[review_id]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rating_review_id_key" ON "Rating"("review_id");
