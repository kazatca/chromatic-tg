import { Review } from "./types";
import { config } from "./config";

const statusToMessage: Record<Review["status"], string> = {
  OPEN: "🌕 Pending",
  MERGED: "🟢 Merged",
  CLOSED: "🔴 Closed",
};

export const getReviewMessage = (review: Review) => {
  if (config.ignoreStatus?.review?.includes(review.status)) {
    return;
  }
  return statusToMessage[review.status];
};
