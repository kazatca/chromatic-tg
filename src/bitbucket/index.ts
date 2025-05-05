import dedent from "dedent";
import { Body } from "./types";

export const getMessage = (event: Body) => {
  console.log(JSON.stringify(event, null, 2));

  if('commit_status' in event && event.commit_status.state === 'FAILED') {
    return dedent`🔴 ${event.commit_status.repository.name} build <a href="${event.commit_status.url}">failed</a>`;
  }

  return undefined
};