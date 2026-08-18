export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export type WorkspaceRole = "owner" | "member";

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  createdAt: string;
}
