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
  if (tags.length > 0) {
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
      Rating: {
        select: {
          maintenance: true,
          comfort: true,
          drivability: true,
          consumption: true,
          general: true,
        },
      },
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
      Rating: {
        select: {
          maintenance: true,
          comfort: true,
          drivability: true,
          consumption: true,
          general: true,
        },
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
      AND: { Rating: { id: { not: "" } } },
    },
    include: {
      _count: { select: { Reaction: true } },
      car: { include: { manufacture: true } },
      TagsOnReviews: { include: { tag: true } },
      Reaction: {
        where: { user: { id: { equals: userId } } },
        take: 1,
      },
      Rating: {
        select: {
          maintenance: true,
          comfort: true,
          drivability: true,
          consumption: true,
          general: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!data) return null;

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

  const data = await prisma.review.findMany({
    where: {
      OR: [
        {
          AND: [
            { Reaction: { some: { createdAt: { gte: last15days } } } },
            { createdAt: { gte: last30days } },
          ],
        },
        {
          OR: { createdAt: { gte: last30days } },
        },
      ],
    },
    include: {
      _count: { select: { Reaction: true } },
      car: { include: { manufacture: true } },
      TagsOnReviews: { select: { tag: true } },
      Reaction: {
        where: { user: { id: { equals: userId } } },
        take: 1,
      },
      Rating: {
        select: {
          maintenance: true,
          comfort: true,
          drivability: true,
          consumption: true,
          general: true,
        },
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
  Rating?: Pick<
    Rating,
    "comfort" | "consumption" | "drivability" | "general" | "maintenance"
  >;
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
