interface Link {
  href: string
}

interface Owner {
  type: "team"
  display_name: string
  links: Record<'self' | 'html' | 'avatar', Link>
  uuid: string
  username: string
}

interface Workspace {
  type: "workspace",
  uuid: string
  name: string
  slug: string
  links: Record<'avatar' | 'html' | 'self', Link>
}

interface Project {
  type: "project"
  key: string
  uuid: string
  name: string
  links: Record<'self' | 'html' | 'avatar', Link>
}

interface Actor {
  type: "team" // "user" | "appUser" (?)
  display_name: string
  links: Record<'self' | 'html' | 'avatar', Link>
  uuid: string
  username: string
}

interface Repository {
  type: "repository"
  full_name: string
  links: Record<'self' | 'html' | 'avatar', Link>
  name: string
  scm: string
  website: string | null
  owner: Owner
  workspace: Workspace
  is_private: boolean
  project: Project
  uuid: string
  parent: null
}

interface Commit {
  type: "commit"
  hash: string
  date: string
  author: {
    type: "author"
    raw: string
  }
  message: string
  links: Record<'self' | 'html' | 'diff' | 'approve' | 'comments' | 'statuses' | 'patch', Link>
}

interface CommitStatus {
  key: string
  type: "build"
  state: "INPROGRESS" |"SUCCESSFUL" | "FAILED"
  name: string
  refname: string 
  commit: Commit
  url: string
  repository: Pick<Repository, 'type' | 'full_name' | 'links' | 'name' | 'uuid'>
  description: string,
  created_on: string
  updated_on: string
  links: Record<'self' | 'commit', Link>
}

export interface BuildStatusUpdate {
  repository: Repository
  actor: Actor
  commit_status: CommitStatus
}

export type Body = BuildStatusUpdate