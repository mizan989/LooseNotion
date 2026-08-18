import { requireUser } from "@/lib/server/auth";
import { getOrCreateDefaultWorkspace, getWorkspacePages, buildPageTree, getFavoritePages } from "@/lib/server/pages";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const workspace = await getOrCreateDefaultWorkspace(user.id);
  const pages = await getWorkspacePages(workspace.id);
  const tree = buildPageTree(pages);
  const favorites = await getFavoritePages(user.id);

  return (
    <div className="flex h-screen">
      <Sidebar
        workspaceId={workspace.id}
        workspaceName={workspace.name}
        userEmail={user.email}
        tree={tree}
        favorites={favorites}
      />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
