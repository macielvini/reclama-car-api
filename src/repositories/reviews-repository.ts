import {
  Car,
  Manufacture,
  Review,
  Tag,
  Reaction,
  Rating,
} from "@prisma/client";
import { prisma } from "../config/database";
import dayjs from "dayjs";

export type CreateReviewParams = Omit<
  Review,
  "id" | "createdAt" | "updatedAt" | "userId" | "ratingId"
> & { tags?: string[] } & {
  rating?: {
    maintenance: number;
    drivability: number;
    comfort: number;
    consumption: number;
    general: number;
  };
};

async function create(
  userId: string,
  { tags, rating, ...data }: CreateReviewParams
) {
  if (tags) {
    return prisma.review.create({
      data: {
        ...data,
        userId: userId,
        TagsOnReviews: {
          createMany: { data: [...tags.map((tag) => ({ tagId: tag }))] },
        },
      },
    });
  }

  return prisma.review.create({
    data: {
      userId: userId,
      Rating: { create: { ...rating, car: { connect: { id: data.carId } } } },
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

async function findById(id: string) {
  return await prisma.review.findUnique({
    where: { id: id },
  });
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

async function findByUserIdAndCarId(userId: string, carId: string) {
  const data = await prisma.review.findFirst({
    where: {
      userId: userId,
      car: { id: carId },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  const tagsAndReactions = {
    tags: [...data.TagsOnReviews],
    reactions: {
      count: data._count.Reaction,
      reacted: Array.isArray(data.Reaction) && data.Reaction.length > 0,
    },
  };

  delete data.Reaction;
  delete data.TagsOnReviews;
  delete data._count;
  return { ...data, ...tagsAndReactions };
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
  Rating?: Rating;
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
  findByUserIdAndCarId,
  findById,
};
