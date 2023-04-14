import { Car, Manufacture, Review, Tag, Reaction } from "@prisma/client";
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
  const data = await prisma.review.findMany({
    include: {
      _count: { select: { Reaction: true } },
      car: { include: { manufacture: true } },
      TagsOnReviews: { select: { tag: true } },
    },
  });

  return reviewsSanitizer(data);
}

async function findAllByUserId(id: string) {
  const data = await prisma.review.findMany({
    where: {
      userId: id,
    },
    include: {
      _count: { select: { Reaction: true } },
      car: { include: { manufacture: true } },
      TagsOnReviews: { select: { tag: true } },
      Reaction: {
        where: { user: { id: { equals: id } } },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviewsSanitizer(data);
}

async function findTrending(take: number, skip: number, userId?: string) {
  const last30days = dayjs().subtract(30, "d").toDate();
  const last15days = dayjs().subtract(15, "d").toDate();

  if (userId === undefined) userId = "";
  console.log(userId);

  const data = await prisma.review.findMany({
    where: {
      createdAt: { gte: last30days },
      AND: { Reaction: { some: { createdAt: { gte: last15days } } } },
    },
    include: {
      _count: { select: { Reaction: true } },
      car: { include: { manufacture: true } },
      TagsOnReviews: { select: { tag: true } },
      Reaction: {
        where: { user: { id: { equals: userId } } },
        take: 1,
      },
    },
    orderBy: { Reaction: { _count: "desc" } },
    take: take,
    skip: skip,
  });

  return reviewsSanitizer(data);
}

async function findTopReactions() {
  return prisma.review.findMany({
    include: { _count: { select: { Reaction: true } } },
    orderBy: { Reaction: { _count: "desc" } },
  });
}

type FullReview = Review & {
  car: Car & {
    manufacture: Manufacture;
  };
  TagsOnReviews: {
    tag: Tag;
  }[];
  _count: {
    Reaction: number;
  };
  Reaction?: Reaction[];
};
function reviewsSanitizer(reviews: FullReview[]) {
  return reviews.map(({ TagsOnReviews, _count, Reaction, ...rest }) => ({
    ...rest,
    tags: TagsOnReviews,
    reactions: {
      count: _count.Reaction,
      reacted: Array.isArray(Reaction) && Reaction.length > 0,
    },
  }));
}

export const reviewsRepository = {
  create,
  findAll,
  findTrending,
  findTopReactions,
  findAllByUserId,
};
