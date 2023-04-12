import { Review } from "@prisma/client";
import { prisma } from "../config/database";
import dayjs from "dayjs";

export type CreateReviewParams = Omit<
  Review,
  "id" | "createdAt" | "updatedAt" | "userId"
> & { tags?: string[] };

async function create(userId: string, { tags, ...data }: CreateReviewParams) {
  if (tags) {
    return prisma.review.create({
      data: {
        userId: userId,
        ...data,
        TagsOnReviews: {
          createMany: { data: [...tags.map((tag) => ({ tagId: tag }))] },
        },
      },
    });
  }

  return prisma.review.create({
    data: {
      userId: userId,
      ...data,
    },
  });
}

export const reviewsRepository = { create };
