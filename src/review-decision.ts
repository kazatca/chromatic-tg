import { ReviewDecision } from "./types";

const statusToMessage: Record<ReviewDecision["status"], string> = {
  PENDING: "🌕 Pending",
  APPROVED: "🟢 Approved",
  
};

export const getReviewDecisionMessage = (review: ReviewDecision) =>
  statusToMessage[review.status];
