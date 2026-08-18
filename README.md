# LooseNotion ([loosenotion.vercel.app](https://loosenotion.vercel.app))

> Not quite Notion. 😭

A Notion-inspired workspace: nested pages, a block-based Tiptap editor with slash
commands and drag-and-drop, simple databases with Table/Board/List views, global
search + quick switcher, light/dark/system theming, and Markdown/JSON export —
built on Next.js + Supabase, per the agreed blueprint.

---

## ⚠️ Before you run this

This project was generated as source code in an offline sandbox with no network
access, so **none of it has been `npm install`'d, compiled, or run against a real
database.** Treat it as a complete, carefully-written scaffold that follows the
blueprint's folder structure and feature list — not a tested, guaranteed-working
build. Budget time to install dependencies, wire up your own Supabase project, and
fix whatever TypeScript/build errors turn up (dependency versions drift, and I
wasn't able to verify exact compatibility between package versions).

---

## 1. Install dependencies

```bash
npm install
```

## 2. Create a Supabase project

1. Go to supabase.com and create a new project.
2. In **Settings → API**, copy:
   - `Project URL`
   - `anon` `public` key
   - `service_role` `secret` key
3. Copy `.env.local.example` to `.env.local` and fill in the three values:

```bash
cp .env.local.example .env.local
```

## 3. Run the database migration

Open the Supabase SQL editor for your project and paste in the contents of:

```
supabase/migrations/0001_init.sql
```

Run it. This creates all tables (`users`, `workspaces`, `pages`, `blocks`,
`databases`, `database_columns`, `database_rows`, `favorites`), the trigger that
mirrors new `auth.users` rows into `public.users`, and Row Level Security
policies so users can only see workspaces they're a member of.

**Email auth:** by default Supabase requires email confirmation for new
signups. For local testing you can turn this off in **Authentication →
Providers → Email → Confirm email**, or just click the confirmation link
Supabase emails you.

## 4. (Optional) Seed demo data

`supabase/seed.sql` creates a demo workspace with a couple of nested pages and
a Tasks database. It expects a real user id — sign up once first, grab your
user id from **Authentication → Users**, then run the seed file with that id
substituted for `:'user_id'`.

## 5. Run it locally

```bash
npm run dev
```

Visit `http://localhost:3000`, sign up, and you'll land in `/workspace` with an
empty sidebar — click **+** to create your first page.

## 6. Deploy to Vercel

1. Push this repo to GitHub.
2. Import it into Vercel (vercel.com/new).
3. Add the same three env vars from `.env.local` in the Vercel project settings.
4. Deploy. No other services needed — Vercel hosts the Next.js app, Supabase
   hosts Postgres/Auth/Storage. (Render is explicitly not required — see the
   blueprint's Step 20.)

---

## What's implemented

| Area | Status |
|---|---|
| Auth (signup/login/logout/session) | Supabase Auth, protected `/workspace` routes via middleware |
| Nested pages, sidebar, reorder | recursive `PageTree`, dnd-kit drag reordering |
| Favorites, recent pages, duplicate, delete | done |
| Page icons & covers | emoji picker, gradient covers |
| Block editor (Tiptap) | paragraph, H1-H3, bullet/numbered/todo lists, quote, code, divider, image, link |
| Slash commands | `/` opens the "Turn into..." menu from the spec |
| Block drag & drop / reorder | custom drag-handle ProseMirror extension |
| Duplicate/delete/change block type | right-click-style block menu |
| Undo/redo, markdown shortcuts, Ctrl+B/I | native to Tiptap/StarterKit |
| Autosave with "Saving.../Saved" indicator | debounced server action |
| Databases: Table / Board / List views | done |
| Column types: text/number/select/checkbox/date | done |
| Global search (Ctrl+K) | title match client-side + content match via `/api/pages?search=` |
| Quick switcher (Ctrl+P) | same dialog, empty-query mode |
| Light/Dark/System theme | `next-themes` |
| Export (Markdown/JSON) | sidebar Export menu |

## What's intentionally out of scope (per the blueprint's Step 22)

Real-time multiplayer, comments, mentions, advanced permissions, calendar/
timeline/gallery views, relations/rollups/formulas, an AI assistant, version
history, offline sync, a public API, and a plugin marketplace.

## Known rough edges to expect

- I couldn't run a real build, so watch for minor TypeScript/import errors on
  first `npm run build` — most likely candidates are library version
  mismatches (Tiptap/dnd-kit/Radix move fast) and Next.js 14 App Router
  server/client boundary nits.
- The in-editor block drag handle uses a hand-rolled ProseMirror decoration
  rather than a battle-tested library extension — it should reorder top-level
  blocks, but complex nested content (e.g. dragging inside a list) isn't
  specially handled.
- No loading/error/empty-state polish, animations, or mobile-specific layout
  pass — Step 10 in the blueprint calls these out as later polish, and they
  weren't built out here.
- Row Level Security is on for every table; if a query returns unexpectedly
  empty results, check that the querying user is actually a
  `workspace_members` row for that workspace.

## Folder structure

Matches the blueprint exactly — see `app/`, `components/`, `lib/`, `actions/`,
`hooks/`, `stores/`, `types/`, and `supabase/` for the full layout.
