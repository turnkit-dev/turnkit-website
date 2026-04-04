Page 1: /games (Game List)
Layout:

Simple centered container
List/grid of game cards
Each card shows:

Game name (static text)
Game ID with copy button
"Open Dashboard" button → /game/[id]
Small delete icon (→ "Are you sure?" modal)


Big "+ New Game" button at top

Clicks opens modal with:

Name input
Radio: "Quick Setup (Unity defaults)" vs "Manual Setup"
Create button


Empty state if no games: "Create your first game" with same button


Page 2: /game/[id] (Everything Dashboard)
Top section:

Breadcrumb: ← All Games link
Game name (large, static)
Game ID with copy button
Delete game button (far right, destructive style)

Sections (all on one scrolling page):
1. Client Keys
┌─ Client Keys ─────────────────────────────┐
│ Display Name    | Key              | [×]  │
│ Default         | ck_abc...  [copy]| [×]  │
│ Production      | ck_xyz...  [copy]| [×]  │
│                                            │
│ [+ New Client Key]                         │
└────────────────────────────────────────────┘

Modal for new: just "Display Name" input

2. Auth & Security
┌─ Auth & Security ──────────────────────────┐
│ ○ OPEN  ⚠️ Not recommended for production │
│ ○ SIGNED                                   │
│ ○ TURNKIT_AUTH                             │
│                                            │
│ [Conditional content based on selection]:  │
│                                            │
│ If SIGNED:                                 │
│   Secret: ••••••••  [Show] [Rotate]        │
│                                            │
│ If TURNKIT_AUTH:                           │
│   SMTP Host: [        ]                    │
│   Port:      [        ]                    │
│   Username:  [        ]                    │
│   Password:  [        ] (masked)           │
│   From:      [        ]                    │
│   Name:      [        ]                    │
│                                            │
│ [Save Changes]                             │
└────────────────────────────────────────────┘
3. Leaderboards
┌─ Leaderboards ─────────────────────────────┐
│ Slug       | Created    | Actions          │
│ main       | 2 days ago | [View][Reset][×] │
│ weekly     | 1 week ago | [View][Reset][×] │
│                                            │
│ [+ New Leaderboard]                        │
└────────────────────────────────────────────┘

Modal for new: Slug input, description (optional)
View → opens modal showing top scores
Reset → "Are you sure?" then clears

4. Relay Configs
┌─ Relay Configs ────────────────────────────┐
│ Name       | Status | Actions              │
│ Main Relay | Active | [Edit][×]            │
│                                            │
│ [+ New Relay Config]                       │
└────────────────────────────────────────────┘

Create/Edit opens modal with config form
(Future: add "Connected Leaderboard" dropdown here)

5. Usage & Billing
┌─ Usage & Billing ──────────────────────────┐
│ Current CCU: 42                            │
│ This month: $12.50                         │
│                                            │
│ [ ] Auto-upgrade when limits reached       │
│ [Upgrade Plan]                             │
└────────────────────────────────────────────┘

/app/games/page.tsx
/app/game/[id]/page.tsx
That's it for routes

Use Server Action
No global state needed
URL is state ([id] param)
Server re-fetches on mutations

navbar on right for in page nav (like in docs)
navbar on left to change to other keys (like in docs)