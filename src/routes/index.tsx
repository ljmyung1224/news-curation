import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Settings } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { STYLE_LABEL, useProfile } from "@/hooks/use-profile";
import { BriefingBar } from "@/components/finfeed/BriefingBar";
import { NewsCard } from "@/components/finfeed/NewsCard";
import { WatchlistPanel } from "@/components/finfeed/WatchlistPanel";
import { OnboardingModal } from "@/components/finfeed/OnboardingModal";
import { SettingsModal } from "@/components/finfeed/SettingsModal";
import { BrokerPortfolio } from "@/components/finfeed/BrokerPortfolio";
import {
  DEFAULT_HOLDINGS,
  NEWS,
  STOCK_UNIVERSE,
  type Holding,
  type Sentiment,
} from "@/data/finfeed";

const TITLE = "FinFeed AI — 투자자 맞춤 경제뉴스 요약 & AI 피드백";
const DESCRIPTION =
  "관심·보유 종목 뉴스만 골라 3줄로 요약하고, 호재·악재 판단과 포트폴리오 비중에 맞춘 AI 투자 피드백을 제공합니다.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FILTERS: { key: Sentiment | "all"; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "positive", label: "호재" },
  { key: "negative", label: "악재" },
  { key: "neutral", label: "중립" },
];

function Index() {
  const [holdings, setHoldings] = useState<Holding[]>(DEFAULT_HOLDINGS);
  const [filter, setFilter] = useState<Sentiment | "all">("all");
  const [tab, setTab] = useState<"watch" | "all">("watch");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const {
    profile,
    hydrated,
    setStyle,
    completeOnboarding,
    toggleWatch,
    connectBroker,
    disconnectBroker,
  } = useProfile();

  const { watchlist, style } = profile;

  const watched = useMemo(() => NEWS.filter((n) => watchlist.includes(n.ticker)), [watchlist]);
  const source = tab === "watch" ? watched : NEWS;
  const feed = useMemo(
    () =>
      [...source]
        .filter((n) => filter === "all" || n.sentiment === filter)
        .sort((a, b) => b.impactScore - a.impactScore),
    [source, filter],
  );

  const activeHoldings = holdings.filter((h) => watchlist.includes(h.ticker));

  return (
    <div className="min-h-screen bg-hero-gradient">
      {hydrated && !profile.onboarded && <OnboardingModal onComplete={completeOnboarding} />}
      {settingsOpen && (
        <SettingsModal
          style={style}
          broker={profile.broker}
          onStyle={setStyle}
          onConnect={connectBroker}
          onDisconnect={disconnectBroker}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      <header className="border-b border-border/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
              F
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-none">
                Fin<span className="text-gold-gradient">Feed</span> AI
              </p>
              <p className="mt-1 text-xs text-muted-foreground">투자자 맞춤 뉴스 브리핑</p>
            </div>
          </div>
          <nav className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border bg-surface-2 px-3 py-1.5">
              관심 {watchlist.length}종목
            </span>
            <span className="rounded-full border border-border bg-surface-2 px-3 py-1.5">
              {STYLE_LABEL[style]} 모드
            </span>
            <button
              onClick={() => setSettingsOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 font-semibold hover:text-foreground"
            >
              <Settings size={13} /> 내 정보·설정
            </button>
            {user ? (
              <>
                <span className="hidden rounded-full border border-border bg-surface-2 px-3 py-1.5 sm:inline">
                  {user.email}
                </span>
                <button
                  onClick={() => void signOut()}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1.5 font-semibold hover:text-foreground"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-semibold text-primary"
              >
                로그인
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <section className="mb-8 max-w-2xl">
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            내 종목 뉴스만, <span className="text-gold-gradient">3줄 요약과 AI 피드백</span>으로
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            수십 개의 경제 뉴스 중 보유·관심 종목에 직접 연관된 기사만 큐레이션합니다. 호재·악재 판단과
            포트폴리오 비중에 맞춘 대응 전략까지 한 화면에서 확인하세요.
          </p>
        </section>

        <div className="mb-6">
          <BrokerPortfolio
            connected={profile.broker.connected}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <WatchlistPanel
            watchlist={watchlist}
            holdings={activeHoldings}
            onToggle={toggleWatch}
            onWeight={(ticker, weight) =>
              setHoldings((prev) => prev.map((h) => (h.ticker === ticker ? { ...h, weight } : h)))
            }
          />

          <div className="space-y-5">
            <BriefingBar news={watched} />

            <div className="flex gap-2 rounded-xl border border-border bg-surface-2 p-1">
              {(
                [
                  { key: "watch", label: `❤️ 관심 종목 (${watched.length})` },
                  { key: "all", label: "전체 뉴스" },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    tab === t.key
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    filter === f.key
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-surface-2 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
              <span className="ml-auto text-xs text-muted-foreground">영향도순 정렬</span>
            </div>

            {feed.map((n) => (
              <NewsCard
                key={n.id}
                news={n}
                stock={STOCK_UNIVERSE.find((s) => s.ticker === n.ticker)!}
                weight={activeHoldings.find((h) => h.ticker === n.ticker)?.weight}
                style={style}
                watched={watchlist.includes(n.ticker)}
                onToggleWatch={() => toggleWatch(n.ticker)}
              />
            ))}

            {feed.length === 0 && (
              <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                조건에 맞는 뉴스가 없습니다. 관심 종목이나 필터를 조정해 보세요.
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border/60 px-5 py-6 text-center text-xs text-muted-foreground">
        FinFeed AI · 본 서비스의 요약과 피드백은 투자 참고 자료이며 투자 판단의 책임은 이용자에게 있습니다.
      </footer>
    </div>
  );
}
