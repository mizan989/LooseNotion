-- LooseNotion initial schema
-- Run this in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists "uuid-ossp";

-- ============================================================
-- users (mirrors auth.users; Supabase Auth owns the real table)
-- ============================================================
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Keep public.users in sync with auth.users on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- workspaces
-- ============================================================
create table if not exists public.workspaces (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  owner_id uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

-- ============================================================
-- pages (nested via parent_id)
-- ============================================================
create table if not exists public.pages (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  parent_id uuid references public.pages (id) on delete cascade,
  title text not null default 'Untitled',
  icon text,
  cover text,
  is_database boolean not null default false,
  is_favorite boolean not null default false,
  is_deleted boolean not null default false,
  position double precision not null default 0,
  created_by uuid not null references public.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pages_workspace_idx on public.pages (workspace_id);
create index if not exists pages_parent_idx on public.pages (parent_id);

-- ============================================================
-- blocks — the Tiptap JSON document for a page's editor content
-- ============================================================
create table if not exists public.blocks (
  page_id uuid primary key references public.pages (id) on delete cascade,
  content jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- databases (Notion-style tables attached to a page)
-- ============================================================
create table if not exists public.databases (
  id uuid primary key default uuid_generate_v4(),
  page_id uuid not null references public.pages (id) on delete cascade,
  name text not null default 'Untitled Database',
  created_at timestamptz not null default now()
);

create table if not exists public.database_columns (
  id uuid primary key default uuid_generate_v4(),
  database_id uuid not null references public.databases (id) on delete cascade,
  name text not null,
  type text not null check (type in ('text', 'number', 'select', 'checkbox', 'date')),
  options jsonb, -- [{id,label,color}] for select columns
  position double precision not null default 0
);

create table if not exists public.database_rows (
  id uuid primary key default uuid_generate_v4(),
  database_id uuid not null references public.databases (id) on delete cascade,
  position double precision not null default 0,
  values jsonb not null default '{}'::jsonb, -- { [column_id]: value }
  created_at timestamptz not null default now()
);

-- ============================================================
-- favorites
-- ============================================================
create table if not exists public.favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users (id) on delete cascade,
  page_id uuid not null references public.pages (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, page_id)
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.users enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.pages enable row level security;
alter table public.blocks enable row level security;
alter table public.databases enable row level security;
alter table public.database_columns enable row level security;
alter table public.database_rows enable row level security;
alter table public.favorites enable row level security;

create or replace function public.is_workspace_member(ws_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id and user_id = auth.uid()
  );
$$ language sql security definer stable;

create or replace function public.is_workspace_owner(ws_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.workspaces
    where id = ws_id and owner_id = auth.uid()
  );
$$ language sql security definer stable;

-- Auto-add workspace owner as a member upon workspace creation
create or replace function public.handle_new_workspace()
returns trigger as $$
begin
  insert into public.workspace_members (workspace_id, user_id, role)
  values (new.id, new.owner_id, 'owner')
  on conflict (workspace_id, user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_workspace_created on public.workspaces;
create trigger on_workspace_created
  after insert on public.workspaces
  for each row execute procedure public.handle_new_workspace();

create policy "users read own row" on public.users
  for select using (id = auth.uid());
create policy "users update own row" on public.users
  for update using (id = auth.uid());

create policy "members and owners can read workspaces" on public.workspaces
  for select using (owner_id = auth.uid() or public.is_workspace_member(id));
create policy "owners can update workspace" on public.workspaces
  for update using (owner_id = auth.uid());
create policy "authenticated users can create workspace" on public.workspaces
  for insert with check (owner_id = auth.uid());
create policy "owners can delete workspace" on public.workspaces
  for delete using (owner_id = auth.uid());

create policy "members and owners can read membership rows" on public.workspace_members
  for select using (
    user_id = auth.uid()
    or public.is_workspace_member(workspace_id)
    or public.is_workspace_owner(workspace_id)
  );
create policy "owners manage membership" on public.workspace_members
  for all using (public.is_workspace_owner(workspace_id))
  with check (public.is_workspace_owner(workspace_id));

create policy "members can read pages" on public.pages
  for select using (public.is_workspace_member(workspace_id));
create policy "members can write pages" on public.pages
  for insert with check (public.is_workspace_member(workspace_id));
create policy "members can update pages" on public.pages
  for update using (public.is_workspace_member(workspace_id));
create policy "members can delete pages" on public.pages
  for delete using (public.is_workspace_member(workspace_id));

create policy "members can read blocks" on public.blocks
  for select using (
    exists (select 1 from public.pages p where p.id = page_id and public.is_workspace_member(p.workspace_id))
  );
create policy "members can write blocks" on public.blocks
  for all using (
    exists (select 1 from public.pages p where p.id = page_id and public.is_workspace_member(p.workspace_id))
  );

create policy "members can read databases" on public.databases
  for select using (
    exists (select 1 from public.pages p where p.id = page_id and public.is_workspace_member(p.workspace_id))
  );
create policy "members can write databases" on public.databases
  for all using (
    exists (select 1 from public.pages p where p.id = page_id and public.is_workspace_member(p.workspace_id))
  );

create policy "members can read columns" on public.database_columns
  for select using (
    exists (
      select 1 from public.databases d
      join public.pages p on p.id = d.page_id
      where d.id = database_id and public.is_workspace_member(p.workspace_id)
    )
  );
create policy "members can write columns" on public.database_columns
  for all using (
    exists (
      select 1 from public.databases d
      join public.pages p on p.id = d.page_id
      where d.id = database_id and public.is_workspace_member(p.workspace_id)
    )
  );

create policy "members can read rows" on public.database_rows
  for select using (
    exists (
      select 1 from public.databases d
      join public.pages p on p.id = d.page_id
      where d.id = database_id and public.is_workspace_member(p.workspace_id)
    )
  );
create policy "members can write rows" on public.database_rows
  for all using (
    exists (
      select 1 from public.databases d
      join public.pages p on p.id = d.page_id
      where d.id = database_id and public.is_workspace_member(p.workspace_id)
    )
  );

create policy "users manage own favorites" on public.favorites
  for all using (user_id = auth.uid());
