import { prisma } from "../config/database";

type CreateOrFindReactionParams = {
  userId: string;
  reviewId: string;
};

async function findByUserIdAndReviewId({
  userId,
  reviewId,
}: CreateOrFindReactionParams) {
  return await prisma.reaction.findFirst({
    where: {
      reviewId: reviewId,
      userId: userId,
    },
  });
}

async function findById(id: string) {
  return await prisma.reaction.findUnique({
    where: { id: id },
  });
}

async function create({ userId, reviewId }: CreateOrFindReactionParams) {
  return await prisma.reaction.create({
    data: { reviewId: reviewId, userId: userId },
    select: { id: true, reviewId: true },
  });
}

async function deleteOne(id: string) {
  return await prisma.reaction.delete({
    where: { id: id },
    select: {
      id: true,
      reviewId: true,
    },
  });
}

export const reactionsRepository = {
  findById,
  findByUserIdAndReviewId,
  create,
  deleteOne,
};
