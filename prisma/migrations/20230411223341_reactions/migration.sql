-- CreateTable
CREATE TABLE "reactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
