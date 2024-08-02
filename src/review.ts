import { Review } from "./types";

const statusToMessage: Record<Review["status"], string> = {
  OPEN: "🌕 Pending",
  MERGED: "🟢 Merged",
  CLOSED: "🔴 Closed",
};

export const getReviewMessage = (review: Review) =>
  statusToMessage[review.status];
