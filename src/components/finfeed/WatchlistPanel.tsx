import { useMemo, useState } from "react";
import { Heart, Search } from "lucide-react";
import { STOCK_UNIVERSE, formatQuote, type Holding } from "@/data/finfeed";

interface Props {
  watchlist: string[];
  holdings: Holding[];
  onToggle: (ticker: string) => void;
  onWeight: (ticker: string, weight: number) => void;
}

export function WatchlistPanel({ watchlist, holdings, onToggle, onWeight }: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase().slice(0, 40);
    if (!q) return [];
    return STOCK_UNIVERSE.filter(
      (s) => s.name.toLowerCase().includes(q) || s.ticker.toLowerCase().includes(q),
    );
  }, [query]);

  const watched = STOCK_UNIVERSE.filter((s) => watchlist.includes(s.ticker));

  return (
    <aside className="space-y-5 lg:sticky lg:top-6">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          종목 검색
        </h2>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-2">
          <Search size={15} className="text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, 40))}
            placeholder="종목명 또는 코드 검색"
            aria-label="종목 검색"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {query.trim() && (
          <ul className="mt-3 space-y-1.5">
            {results.map((s) => {
              const on = watchlist.includes(s.ticker);
              return (
                <li
                  key={s.ticker}
                  className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{s.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {s.ticker} · {formatQuote(s)}
                    </p>
                  </div>
                  <button
                    onClick={() => onToggle(s.ticker)}
                    aria-label={`${s.name} 관심 종목 ${on ? "해제" : "추가"}`}
                    aria-pressed={on}
                    className={`ml-auto rounded-full border p-1.5 transition-colors ${
                      on
                        ? "border-bearish/40 bg-bearish/10 text-bearish"
                        : "border-border text-muted-foreground hover:text-bearish"
                    }`}
                  >
                    <Heart size={14} fill={on ? "currentColor" : "none"} />
                  </button>
                </li>
              );
            })}
            {results.length === 0 && (
              <li className="text-xs text-muted-foreground">검색 결과가 없습니다.</li>
            )}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          관심 종목 ❤️ {watched.length}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {STOCK_UNIVERSE.map((s) => {
            const on = watchlist.includes(s.ticker);
            return (
              <span
                key={s.ticker}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  on
                    ? "border-accent/50 bg-accent/15 text-accent"
                    : "border-border bg-surface-2 text-muted-foreground"
                }`}
              >
                {s.name}
                <span className="font-mono text-[10px] opacity-60">{s.market}</span>
                <button
                  onClick={() => onToggle(s.ticker)}
                  aria-label={`${s.name} 관심 종목 ${on ? "해제" : "추가"}`}
                  aria-pressed={on}
                  className={on ? "text-bearish" : "text-muted-foreground hover:text-bearish"}
                >
                  <Heart size={13} fill={on ? "currentColor" : "none"} />
                </button>
              </span>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          보유 포트폴리오 비중
        </h2>
        <div className="mt-4 space-y-4">
          {holdings.map((h) => {
            const stock = STOCK_UNIVERSE.find((s) => s.ticker === h.ticker)!;
            return (
              <div key={h.ticker}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stock.name}</span>
                  <span className="font-mono text-primary">{h.weight}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={h.weight}
                  onChange={(e) => onWeight(h.ticker, Number(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-2 accent-primary"
                  aria-label={`${stock.name} 비중`}
                />
              </div>
            );
          })}
          {holdings.length === 0 && (
            <p className="text-xs text-muted-foreground">
              관심 종목을 등록하면 비중을 설정할 수 있습니다.
            </p>
          )}
        </div>
      </section>
    </aside>
  );
}
