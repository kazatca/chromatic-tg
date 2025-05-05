import dedent from "dedent";
import { Body } from "./types";

export const getMessage = (event: Body) => {

  if('commit_status' in event && event.commit_status.state === 'FAILED') {
    return dedent`🔴 ${event.commit_status.repository.name} build failed. <a href="${event.commit_status.url}">View details</a>`;
  }

  return undefined
};