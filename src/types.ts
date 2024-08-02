interface TGConfig {
  token: string
  chatIds: string[]
}

export interface Config {
  tg: TGConfig
  port: number
  ignoreStatus: {
    build: BuildStatus[]
    review: ReviewStatus[]
    reviewDecision: ReviewDecisionStatus[]
  }
}

type BuildStatus =
  | "PUBLISHED"
  | "PREPARED"
  | "IN_PROGRESS"
  | "PENDING"
  | "PASSED"
  | "ACCEPTED"
  | "DENIED"
  | "BROKEN"
  | "CANCELLED"
  | "FAILED";

type BuildResult = "SUCCESS" | "CAPTURE_ERROR" | "SYSTEM_ERROR" | "TIMEOUT";

interface Project {
  name: string;
  accountName: string;
  accountAvatarUrl: string;
  webUrl: string;
}

export interface Build {
  number: number;
  branch: string;
  commit: string;
  committerName: string;
  status: BuildStatus;
  result: BuildResult;
  storybookUrl: string;
  webUrl: string;
  changeCount: number;
  componentCount: number;
  specCount: number;
  project: Project;
}

export interface BuildEvent {
  version: number;
  event: "build";
  build: Build;
}

type ReviewStatus = "OPEN" | "MERGED" | "CLOSED";

interface Author {
  name: string;
  username: string;
  avatarUrl: string;
}

export interface Review {
  number: number;
  title: string;
  status: ReviewStatus;
  baseRefName: string;
  headRefName: string;
  isCrossRepository: boolean;
  webUrl: string;
  author: Author;
}

export interface ReviewEvent {
  version: string;
  event: "review";
  review: Review;
}

type ReviewDecisionStatus = "PENDING" | "APPROVED";

interface Reviewer {
  name: string;
  username: string;
  avatarUrl: string;
}

export interface ReviewDecision {
  status: ReviewDecisionStatus;
  project: Project;
  review: Review;
  reviewer: Reviewer;
}

export interface ReviewDecisionEvent {
  version: number;
  event: "review-decision";
  reviewDecision: ReviewDecision;
}

export type Body = BuildEvent | ReviewEvent | ReviewDecisionEvent;