import { reactionsRepository } from "../repositories/reactions-repository";
import { reviewsService } from "./reviews-service";

async function toggle(userId: string, reviewId: string) {
  await reviewsService.validateById(reviewId);

  const reaction = await reactionsRepository.findByUserIdAndReviewId({
    userId,
    reviewId,
  });

  if (reaction) {
    return await reactionsRepository.deleteOne(reaction.id);
  }

  return await reactionsRepository.create({ userId, reviewId });
}

export const reactionsService = { toggle };
