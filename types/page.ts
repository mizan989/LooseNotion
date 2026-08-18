export interface Page {
  id: string;
  workspaceId: string;
  parentId: string | null;
  title: string;
  icon: string | null;
  cover: string | null;
  isDatabase: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
  position: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageTreeNode extends Page {
  children: PageTreeNode[];
}
