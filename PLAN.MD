# TurnKit Developer Dashboard – UX & Structure Specification (v3 - Docs Style)

**Version**: v3 (Final Simplified – Consistent with existing Docs site)  
**Target**: Next.js App Router, dark mode, minimal, dev-focused.  
**Key Constraint**: Most users will have only **one Game Key**. Keep everything dead simple and fast to implement.

## 1. Overall Philosophy
- Reuse existing Docs sidebar and top bar components as much as possible.
- Prioritize consistency with the public Docs site.
- Default to single Game Key experience (auto-redirect after login).
- Sidebar drives navigation (no heavy tab systems inside pages).
- All pages under a Game Key are scoped by `gameKeyId`.

## 2. Navigation Structure

### Top Navigation Bar (Thin, identical to Docs)
- Left: TurnKit Logo → links to `/dashboard`
- Center-Left: Game Key Selector (simple dropdown with chevron)
  - Displays current Game Key Name
  - On click: dropdown list of all Game Keys + "+ New Game Key" at bottom
- Right: Docs (external link), Support, User Avatar dropdown (Account, Billing, Logout)

### Sidebar (Reuse Docs Sidebar Component)
Groupings:

**PROJECT**
- Overview
- Client Keys
- Auth & Security

**MODULES**
- Relay
- Leaderboards

**ADMIN**
- Usage & Billing
- Project Settings

## 3. URL & Routing Tree (Next.js App Router)

app/
├── dashboard/
│   └── page.tsx                  # Global overview
├── game-keys/
│   └── page.tsx                  # List all Game Keys
├── game/
│   └── [gameKeyId]/
│       ├── page.tsx              # Overview (default)
│       ├── client-keys/
│       │   └── page.tsx
│       ├── auth/
│       │   └── page.tsx
│       ├── relay/
│       │   └── page.tsx
│       ├── leaderboards/
│       │   └── page.tsx
│       ├── usage/
│       │   └── page.tsx
│       └── settings/
│           └── page.tsx
├── layout.tsx                    # Root layout with Top Bar + Sidebar
└── globals.css                   # Dark theme


**Smart Redirect Logic** (in middleware or after login):
- If user has exactly 1 Game Key → redirect to `/game/[gameKeyId]`
- If multiple → land on `/dashboard`

## 4. Page Breakdown & Implementation Tasks

### Task Group 1: Layout & Navigation (Foundation)

1. Create shared `DashboardLayout` component
   - Include Top Bar with Game Key Selector
   - Include Sidebar (reuse/adapt Docs sidebar)
   - Make sidebar highlight active route
   - Pass current `gameKeyId` via context or props

2. Implement Game Key Selector Dropdown
   - Fetch Game Keys (`GET /v1/dev/game-keys`)
   - Display current name
   - On change: update URL to `/game/[newId]` and refresh context
   - "+ New Game Key" opens modal → `POST /v1/dev/game-keys?name=...`

3. Create Game Key Context (simple React Context or Zustand)
   - Current `gameKeyId`
   - Current Game Key object (name, id, authMode)

### Task Group 2: Core Pages

4. Global Dashboard (`/dashboard`)
   - Fetch `GET /v1/dev/dashboard`
   - Show summary cards (CCU, Active Game Keys, etc.)
   - Getting Started checklist (if no Game Keys)
   - Quick links to create Game Key or go to active Game Key

5. Game Keys List (`/game-keys`)
   - Table or cards listing all Game Keys
   - Columns: Name, ID (copy), Auth Mode, Actions (Manage / Delete)
   - "+ Create New" button

### Task Group 3: Game Key Scoped Pages

6. Game Key Overview (`/game/[gameKeyId]`)
   - Shared thin header: Breadcrumb + Game Key Name (editable) + ID (copy) + Auth badge
   - Summary stats cards (Client Keys count, Leaderboards, Relay configs)
   - Quick action buttons linking to other sections
   - Warning banner if Auth Mode = OPEN

7. Client Keys (`/game/[gameKeyId]/client-keys`)
   - Fetch: `GET /v1/dev/game-keys/{gameKeyId}/client-keys`
   - Table: Display Name | Client Key (masked + copy) | Created | Delete
   - "+ New Client Key" button (`POST ...?displayName=...`)
   - Delete: `DELETE /v1/dev/game-keys/{gameKeyId}/client-keys/{clientKeyId}`

8. Auth & Security (`/game/[gameKeyId]/auth`)
   - Mode selection: 3 cards (OPEN with warning + confirmation, SIGNED, TURNKIT_AUTH)
   - Save: `PUT /v1/dev/game-keys/{gameKeyId}/player-id/mode`
   - Conditional:
     - SIGNED → Secret display (masked) + Generate + Rotate buttons
     - TURNKIT_AUTH → SMTP form (host, port, username, password, fromAddress, fromName)
   - Test tool: pollId input + `GET /v1/dev/auth-status?pollId=...`

9. Relay (`/game/[gameKeyId]/relay`)
   - Fetch configs: `GET /v1/dev/relay-configs?gameKeyId=...`
   - Empty state: "No Relay config yet" + "Create Relay Config" button
   - If exists: Show current config + Edit (PUT) / Delete buttons
   - Create/Edit in modal or slide-over

10. Leaderboards (`/game/[gameKeyId]/leaderboards`)
    - Fetch: `GET /v1/dev/game-keys/{gameKeyId}/leaderboards`
    - List by slug
    - Empty state + "Create Leaderboard" button (modal with form)
    - Actions: Edit (PATCH), Delete, View Scores, Reset

11. Usage (`/game/[gameKeyId]/usage`)
    - CCU chart: `GET /v1/dev/dashboard/{gameKeyId}/ccu`
    - Billing info: `GET /v1/dev/dashboard/{gameKeyId}/billing`
    - Auto-upgrade toggle + Upgrade button

12. Project Settings (`/game/[gameKeyId]/settings`)
    - Basic settings (name edit, delete Game Key)

### Task Group 4: Shared Components & UX Polish

13. Reusable components:
    - CopyButton (monospace + toast "Copied!")
    - MaskedValue (with Show/Hide)
    - ConfirmationModal (especially for Delete / Rotate / OPEN mode)
    - EmptyState component
    - LoadingSkeleton for tables

14. Toast notification system (simple sonner or custom)

15. Dark theme consistency (reuse Docs styles where possible)

## 5. API Mapping Reference

**Game Keys**
- GET /v1/dev/game-keys
- POST /v1/dev/game-keys?name=...
- DELETE /v1/dev/game-keys/{gameKeyId}

**Client Keys**
- GET /v1/dev/game-keys/{gameKeyId}/client-keys
- POST /v1/dev/game-keys/{gameKeyId}/client-keys?displayName=...
- DELETE /v1/dev/game-keys/{gameKeyId}/client-keys/{clientKeyId}

**Auth**
- PUT /v1/dev/game-keys/{gameKeyId}/player-id/mode
- Secret generate/rotate
- SMTP GET/PUT/DELETE
- GET /v1/dev/auth-status?pollId=...

**Modules**
- Relay endpoints (list, create, update, delete)
- Leaderboards endpoints (list, create, patch, delete, scores, etc.)
- Dashboard / CCU / Billing

## 6. Implementation Priorities (Suggested Order)

1. Layout + Top Bar + Sidebar + Game Key Selector + Context
2. Global Dashboard + Game Keys List
3. Game Key Overview + Client Keys (core flow)
4. Auth & Security (most important functional page)
5. Relay + Leaderboards (with empty states)
6. Usage + Settings
7. Polish: toasts, modals, warnings, skeletons

## 7. Additional Notes
- All destructive actions require confirmation modal.
- OPEN auth mode must show visible warning (header + Auth page).
- Monospace font for all IDs, keys, secrets.
- Start with simple modals for create/edit (can upgrade to slide-overs later).
- Focus on keyboard-friendly and fast interactions.

This spec is structured so you can copy-paste each numbered task or section directly into your issue tracker or task list.