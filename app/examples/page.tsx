import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { CodeBlock } from '@/components/code-block';
import { DocsSidebar } from '@/components/docs-shell';
import { MarketingShell } from '@/components/marketing-shell';
import { buildBreadcrumbSchema, buildMetadata, buildTechArticleSchema } from '@/lib/seo';

const sections = [
  { href: '#top', label: 'Top' },
  { href: '#quick', label: 'Quick Snippets' },
  { href: '#code', label: 'Full Example: Turns, Voting, Json' },
  { href: '#secondCode', label: 'Full Example: Hand Hiding, Ownership' },
];

const quickSnippetCode = `// Find Match
// Queue one player into your relay config and start as soon as another client joins.
await Relay.MatchWithAnyone("player1", ExampleConfig.Slug);

// Submit leaderboard score
await Leaderboard.SubmitScore("player1", 5);

// Send a move
Relay.SendJson(index.ToString());
Relay.EndMyTurn();

// React to relay messages
Relay.OnMoveMade += (message, _) => OnMoveMade(message);
Relay.OnVoteFailed += OnVoteFailed;
Relay.OnMatchStarted += (_, _) => { statusText.text = "Game started"; };`;

const gameCode = `using System.Collections.Generic;
using System.Linq;
using TurnKit.Internal.ParrelSync;
using UnityEngine;
using UnityEngine.UI;

namespace TurnKit.Example
{
    public class TicTacToeControllerExample : MonoBehaviour
    {
        [SerializeField] private List<Text> texts;
        [SerializeField] private InputField playerIdText;
        [SerializeField] private Text gameEndText;
        [SerializeField] private Text statusText;
        [SerializeField] private Toggle allowInvalidMovesToggle;
        private readonly int[][] _winConditions = { new[] {0, 1, 2}, new[] {3, 4, 5}, new[] {6, 7, 8},
            new[] {0, 3, 6}, new[] {1, 4, 7}, new[] {2, 5, 8},
            new[] {0, 4, 8}, new[] {2, 4, 6}
        };

        private void Awake()
        {
#if UNITY_EDITOR
            playerIdText.text = ClonesManager.IsClone() ? "player2" : "player1";
#endif
            Relay.OnMoveMade += (message, _) => OnMoveMade(message);
            Relay.OnVoteFailed += OnVoteFailed;
            Relay.OnMatchStarted += (_, _) => { statusText.text = "Game started"; };
        }

        public async void FindMatch()
        {
            foreach (var text in texts) text.text = "";
            gameEndText.text = "";
            statusText.text = "Waiting for opponent, connect with another client";
            await Relay.MatchWithAnyone(playerIdText.text, ExampleConfig.Slug);
        }

        public void OnCellClick(int index)
        {
            if (!string.IsNullOrEmpty(texts[index].text) && !allowInvalidMovesToggle.isOn) return;
            Relay.SendJson(index.ToString());
            Relay.EndMyTurn();
        }

        private void OnVoteFailed(VoteFailedMessage voteFailedMessage)
        {
            gameEndText.text = "Cheating detected game ended";
            statusText.text = "Game ended";
        }

        private void OnMoveMade(MoveMadeMessage message)
        {
            int cellIndex = int.Parse(message.json);
            bool isLegalMove = string.IsNullOrEmpty(texts[cellIndex].text) || allowInvalidMovesToggle.isOn;
            Relay.Vote(message.moveNumber, isLegalMove);

            if (!isLegalMove) return;

            string symbol = message.moveNumber % 2 == 0 ? "O" : "X";
            texts[cellIndex].text = symbol;
            if (CheckWin()) EndGame($"{symbol} won ! Press Find Match to replay it");
            else if (message.moveNumber == 9) EndGame("A draw, close one! Press Find Match to replay it");
        }

        private void EndGame(string gameEndReason)
        {
            Relay.EndGame();
            gameEndText.text = gameEndReason;
            statusText.text = "Game ended";
        }

        private bool CheckWin() => _winConditions.Any(l => !string.IsNullOrEmpty(texts[l[0]].text) && texts[l[0]].text == texts[l[1]].text && texts[l[0]].text == texts[l[2]].text);
    }
}`;

const rockPaperCode = `using System.Collections.Generic;
using System.Linq;
using TurnKit.Internal.ParrelSync;
using UnityEngine;
using UnityEngine.UI;

namespace TurnKit.Example
{
    public class RockPaperScissorsControllerExample : MonoBehaviour
    {
        [SerializeField] private InputField playerIdText;
        [SerializeField] private Text gameEndText;
        [SerializeField] private Text statusText;
        [SerializeField] private Text opponentText;

        private RelayList myHand;
        private RelayList opponentHand;
        private RelayList revealedList;
        private bool isSignPicked;
        private readonly string[] validSigns = {"ROCK", "PAPER", "SCISSORS"};
        private void Awake()
        {
#if UNITY_EDITOR
            playerIdText.text = ClonesManager.IsClone() ? "player2" : "player1";
#endif
            Relay.OnMoveMade += OnMoveMade;
            Relay.OnTurnChanged += OnTurnChanged;
            Relay.OnVoteFailed += OnVoteFailed;
            Relay.OnMatchStarted += (msg,initialLists) =>
            {
                myHand = Relay.GetMyLists(ExampleConfig.Tag.hand).First();
                opponentHand = Relay.GetOpponentsLists(ExampleConfig.Tag.hand).First();
                revealedList = Relay.GetMyLists(ExampleConfig.Tag.table).First();
                statusText.text = "Game started";
            };
        }

        public async void FindMatch()
        {
            isSignPicked = false;
            opponentText.text = "";
            gameEndText.text = "";
            statusText.text = "Waiting for opponent, connect with another client";
            await Relay.MatchWithAnyone(playerIdText.text, ExampleConfig.Slug);
        }

        public void SignChosen(string sign)
        {
            if (isSignPicked) return;
            myHand.Spawn(sign);
            Relay.EndMyTurn();
        }

        private void OnVoteFailed(VoteFailedMessage voteFailedMessage)
        {
            gameEndText.text = "Cheating detected game ended";
            statusText.text = "Game ended";
        }

        private void OnMoveMade(MoveMadeMessage msg, IReadOnlyList<RelayList> arg2)
        {
            Relay.Vote(msg.moveNumber, IsMoveValid(msg));
            if (msg.playerId != playerIdText.text) opponentText.text = "Opponent chosen sign";
            else isSignPicked = true;
            
            if (revealedList.Count == 2) //signs are revealed
            {
                var mySign = revealedList.Items.First(x => x.CreatorSlot == Relay.MySlot).Slug;
                var opponentSign = revealedList.Items.First(x => x.CreatorSlot != Relay.MySlot).Slug;
                opponentText.text = $"Opponent chose {opponentSign}";
                if (mySign == opponentSign)
                {
                    EndGame("A draw, close one! Press Find Match to replay it");
                    return;
                }
                
                bool iWin = (mySign == "ROCK" && opponentSign == "SCISSORS") ||
                            (mySign == "PAPER" && opponentSign == "ROCK") ||
                            (mySign == "SCISSORS" && opponentSign == "PAPER");
                EndGame(iWin ? "You won ! Press Find Match to replay it" : "You lost! Press Press Find Match to replay it");
            }
        }

        private bool IsMoveValid(MoveMadeMessage msg)
        {
            foreach (var change in msg.changes)
            {
                if (change.type == ChangeType.SPAWN) // player adding to not owned list is covered by server, it checks ownership
                {
                    if (change.toList.Items.Count > 1) return false; // tried to pick a second sign.
                    if (!validSigns.Contains(change.toList.Items.First().Slug)) return false; // {act.slug} is not a valid sign
                }

                if (change.type == ChangeType.MOVE)
                {
                    if (change.items.Length != 1) return false; // 1 sign moved from each list
                    if (myHand.Items.Count != 0 || opponentHand.Items.Count != 0) return false; // must be no items remaining
                }
            }
            return true;
        }
        
        private void OnTurnChanged(TurnChangedMessage message)
        {
            if (myHand.Items.Count == 1 && opponentHand.Items.Count == 1 && Relay.IsMyTurn) // both players picked their sign
            {
                Debug.Log("Both players ready. Executing Reveal...");
                myHand.Move(SelectorType.ALL).To(revealedList);
                opponentHand.Move(SelectorType.ALL).IgnoreOwnership().To(revealedList);
                Relay.EndMyTurn();
            }
        }
        
        private void EndGame(string gameEndReason)
        {
            Relay.EndGame();
            gameEndText.text = gameEndReason;
            statusText.text = "Game ended";
        }
    }
}
`;

const examplesDescription =
  'Browse real TurnKit Unity snippets and full game scripts, then copy the patterns to ship your own multiplayer faster.';

export const metadata: Metadata = buildMetadata({
  title: 'Examples - TurnKit',
  description: examplesDescription,
  path: '/examples',
  keywords: ['Unity multiplayer example', 'TurnKit example code', 'authoritative multiplayer sample'],
});

export default function ExamplesPage() {
  const articleSchema = buildTechArticleSchema({
    headline: 'TurnKit Unity multiplayer examples',
    description: examplesDescription,
    path: '/examples',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Examples', path: '/examples' },
  ]);

  return (
    <MarketingShell footerLayout="docs">
      <Script
        id="examples-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="examples-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto flex w-full max-w-[1400px] px-0 pt-[60px]">
        <aside className="hidden w-[260px] shrink-0 md:block">
          <div
            className="fixed top-[60px] h-[calc(100vh-60px)] w-[260px] overflow-y-auto border-r border-border bg-bg px-6 py-8"
            style={{ left: 'max(0px, calc((100vw - 1400px) / 2))' }}
          >
            <DocsSidebar currentPath="/examples" />
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-5 py-8 md:max-w-[900px] md:px-[clamp(24px,5vw,64px)] md:py-12">
          <section id="top" className="relative py-12 pb-8">
            <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[400px] w-[600px] -translate-x-1/2 bg-hero-glow" />
            <div className="mb-7 inline-flex items-center gap-2 rounded-[2px] border border-[rgba(61,214,140,0.2)] bg-[rgba(61,214,140,0.1)] px-3 py-[5px] text-[11px] font-medium uppercase tracking-[0.08em] text-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green" />
              Unity Example
            </div>
            <h1 className="mb-5 font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text">
              Multiplayer authoritative game
              <br />
              in 75 lines of code.
            </h1>
            <p className="max-w-[620px] text-base leading-[1.7] text-muted">
              Start with one queue call, one score submit, and one move payload. Then see the full Unity TicTacToe controller that handles
              matching, turn flow, vote validation, and game end state without a custom backend.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs/quickstart/unity"
                className="inline-flex items-center gap-2 rounded-[3px] bg-accent px-[22px] py-[11px] text-[13px] font-medium text-white transition hover:-translate-y-px hover:bg-[#3AADF5]"
              >
                Unity Quickstart
              </Link>
              <Link
                href="/docs/leaderboards"
                className="inline-flex items-center gap-2 rounded-[3px] border border-border2 px-[22px] py-[11px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Leaderboards Docs
              </Link>
              <a
                href="https://github.com/Brainzy/TurnKit-Client"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[3px] border border-border2 px-[22px] py-[11px] text-[13px] text-muted transition hover:border-faint hover:text-text"
              >
                Unity Client Repo
              </a>
            </div>
          </section>

          <section id="quick" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Quick Snippets</div>
            <h2 className="mb-10 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
              Simple API, iterate fast.
            </h2>
            <CodeBlock code={quickSnippetCode} language="csharp" />
          </section>

          <section id="secondCode" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Full Example: Turns, Voting, Json</div>
            <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
              Unity Tic Tac Toe game.
            </h2>
            <p className="mb-8 max-w-[620px] text-[15px] leading-[1.7] text-muted">
              One script handles match start, sending json, per-turn validation, cheat detection, this specific game rules and win resolution. No separate authoritative
              game server code is required here.
            </p>
            <CodeBlock code={gameCode} language="csharp" />
          </section>

          <section id="code" className="border-t border-border py-[clamp(32px,5vw,48px)]">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Full Example: Hand Hiding, Ownership</div>
            <h2 className="mb-3 font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em] text-text">
              Unity Rock Paper Scissor game.
            </h2>
            <p className="mb-8 max-w-[620px] text-[15px] leading-[1.7] text-muted">
              In addition to features covered in previous example here is manipulation of server lists, showcasing hand hiding, ownership of lists
            </p>
            <CodeBlock code={rockPaperCode} language="csharp" />
          </section>

        </main>
        <aside className="hidden w-[220px] shrink-0 xl:block">
          <div
            className="fixed top-[60px] h-[calc(100vh-60px)] w-[220px] overflow-y-auto border-l border-border bg-bg px-6 py-12"
            style={{ right: 'max(0px, calc((100vw - 1400px) / 2))' }}
          >
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">On This Page</div>
            <div className="flex flex-col gap-2">
              {sections.map((section) => (
                <a key={section.href} href={section.href} className="border-l-2 border-transparent pl-3 text-xs text-muted transition hover:text-text">
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </MarketingShell>
  );
}
