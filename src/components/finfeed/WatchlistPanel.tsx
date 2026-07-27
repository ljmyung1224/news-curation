import { STOCK_UNIVERSE, type Holding } from "@/data/finfeed";

interface Props {
  watchlist: string[];
  holdings: Holding[];
  style: "value" | "trader";
  onToggle: (ticker: string) => void;
  onWeight: (ticker: string, weight: number) => void;
  onStyle: (style: "value" | "trader") => void;
}

export function WatchlistPanel({ watchlist, holdings, style, onToggle, onWeight, onStyle }: Props) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-6">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          투자 성향
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(["value", "trader"] as const).map((s) => (
            <button
              key={s}
              onClick={() => onStyle(s)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                style === s
                  ? "border-primary bg-primary/15 text-primary shadow-glow"
                  : "border-border bg-surface-2 text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "value" ? "가치투자" : "단기매매"}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          선택한 성향에 맞춰 AI 피드백 문구가 달라집니다.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          관심 종목 등록
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {STOCK_UNIVERSE.map((s) => {
            const on = watchlist.includes(s.ticker);
            return (
              <button
                key={s.ticker}
                onClick={() => onToggle(s.ticker)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  on
                    ? "border-accent/50 bg-accent/15 text-accent"
                    : "border-border bg-surface-2 text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.name}
                <span className="ml-1.5 font-mono text-[10px] opacity-60">{s.market}</span>
              </button>
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
            <p className="text-xs text-muted-foreground">관심 종목을 등록하면 비중을 설정할 수 있습니다.</p>
          )}
        </div>
      </section>
    </aside>
  );
}