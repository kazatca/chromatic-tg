import dedent from "dedent";
import { getBuildMessage } from "./build";
import { Body } from "./types";
import { getReviewMessage } from "./review";
import { getReviewDecisionMessage } from "./review-decision";

export const getMessage = (event: Body) => {
  switch (event.event) {
    case "build": {
      const message = getBuildMessage(event.build);
      if (!message) {
        return;
      }
      return dedent`${message} <a href="${event.build.webUrl}">Build ${event.build.number}</a>`;
    }

    case "review": {
      const message = getReviewMessage(event.review);
      if (!message) {
        return;
      }
      return dedent`${message} <a href="${event.review.webUrl}">Review ${event.review.number}</a>`;
    }

    case "review-decision": {
      const message = getReviewDecisionMessage(event.reviewDecision);
      if (!message) {
        return;
      }
      return dedent`${message} <a href="${event.reviewDecision.review.webUrl}">Review ${event.reviewDecision.review.number}</a>`;
    }
  }
};