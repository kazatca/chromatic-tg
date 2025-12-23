import { ReviewDecision } from "./types";
import { config } from "./config";

const statusToMessage: Record<ReviewDecision["status"], string> = {
  PENDING: "🌕 Pending",
  APPROVED: "🟢 Approved",
};

export const getReviewDecisionMessage = (review: ReviewDecision) => {
  if (config.ignoreStatus?.reviewDecision?.includes(review.status)) {
    return;
  }
  if(review.review.baseRefName !== "master") {
    return;
  }
  return statusToMessage[review.status];
};
