import { Build } from "./types";

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

export const getBuildMessage = (build: Build) =>
  build.result === "TIMEOUT" ? "⚫️ Timed out" : statusToMessage[build.status];
