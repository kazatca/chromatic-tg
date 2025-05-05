import { Build } from "./types";
import {config} from './config'

const statusToMessage: Record<Build["status"], string> = {
  PUBLISHED: "🔵 Storybook published",
  PREPARED: "🔵 Ready for testing",
  IN_PROGRESS: "🔵 Tests in progress",
  PENDING: "🌕 Ready for review (has changes)",
  PASSED: "🟢 Passed (no changes)",
  ACCEPTED: "🟢 Accepted",
  DENIED: "🔴 Denied",
  BROKEN: "🔴 Broken",
  CANCELLED: "⚫️ Canceled",
  FAILED: "🔴 Error",
};

export const getBuildMessage = (build: Build) => {
  if(config.ignoreStatus?.build?.includes(build.status)) {
      return;
  }
  return build.result === "TIMEOUT" ? "⚫️ Timed out" : statusToMessage[build.status];
}
