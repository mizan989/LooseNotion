-- Optional demo data.
-- Replace :user_id with a real auth.users.id after you've signed up once,
-- then run this file in the Supabase SQL editor.

-- Example:
-- \set user_id '11111111-1111-1111-1111-111111111111'

with new_workspace as (
  insert into public.workspaces (name, owner_id)
  values ('My Workspace', :'user_id')
  returning id
),
member as (
  insert into public.workspace_members (workspace_id, user_id, role)
  select id, :'user_id', 'owner' from new_workspace
),
college as (
  insert into public.pages (workspace_id, parent_id, title, icon, position, created_by)
  select id, null, 'College', '🎓', 0, :'user_id' from new_workspace
  returning id
),
accounting as (
  insert into public.pages (workspace_id, parent_id, title, icon, position, created_by)
  select w.id, c.id, 'Accounting', '📗', 0, :'user_id'
  from new_workspace w, college c
  returning id
),
tasks_page as (
  insert into public.pages (workspace_id, parent_id, title, icon, is_database, position, created_by)
  select id, null, 'Tasks', '🗃', true, 1, :'user_id' from new_workspace
  returning id
)
insert into public.databases (page_id, name)
select id, 'Tasks' from tasks_page;
