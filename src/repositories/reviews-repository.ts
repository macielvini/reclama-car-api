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

async function findAll() {
  return await prisma.review.findMany({
    include: {
      _count: { select: { Reaction: true } },
      car: { include: { manufacture: true } },
      TagsOnReviews: { include: { tag: true } },
    },
  });
}

async function findTrending(take: number) {
  const last30days = dayjs().subtract(30, "d").toDate();
  const last15days = dayjs().subtract(15, "d").toDate();

  return prisma.review.findMany({
    where: {
      createdAt: { gte: last30days },
      AND: { Reaction: { some: { createdAt: last15days } } },
    },
    orderBy: { Reaction: { _count: "desc" } },
    take: take,
  });
}

async function findTopReactions() {
  return prisma.review.findMany({
    include: { _count: { select: { Reaction: true } } },
    orderBy: { Reaction: { _count: "desc" } },
  });
}

export const reviewsRepository = {
  create,
  findAll,
  findTrending,
  findTopReactions,
};
