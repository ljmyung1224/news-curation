import { BROKER_PORTFOLIO } from "@/data/finfeed";

export function BrokerPortfolio({
  connected,
  onOpenSettings,
}: {
  connected: boolean;
  onOpenSettings: () => void;
}) {
  if (!connected) {
    return (
      <section className="rounded-2xl border border-dashed border-border bg-card/50 p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          내 실제 포트폴리오
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          한국투자증권 Open API를 연동하면 실제 보유 종목·비중·평단가·수익률이 표시됩니다.
        </p>
        <button
          onClick={onOpenSettings}
          className="mt-3 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
        >
          증권사 연동하기
        </button>
      </section>
    );
  }

  const totalValue = BROKER_PORTFOLIO.reduce((s, p) => s + p.currentPrice * p.quantity, 0);
  const totalCost = BROKER_PORTFOLIO.reduce((s, p) => s + p.avgPrice * p.quantity, 0);
  const totalReturn = ((totalValue - totalCost) / totalCost) * 100;

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          내 실제 포트폴리오
        </h2>
        <span className="rounded-full border border-bullish/30 bg-bullish/10 px-2 py-0.5 text-[10px] font-semibold text-bullish">
          한국투자증권 연동됨
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          평가액{" "}
          <span className="font-mono font-semibold text-foreground">
            {Math.round(totalValue).toLocaleString("ko-KR")}원
          </span>{" "}
          · 총수익률{" "}
          <span
            className={`font-mono font-semibold ${totalReturn >= 0 ? "text-bullish" : "text-bearish"}`}
          >
            {totalReturn >= 0 ? "+" : ""}
            {totalReturn.toFixed(1)}%
          </span>
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {BROKER_PORTFOLIO.map((p) => {
          const up = p.returnPct >= 0;
          return (
            <article key={p.ticker} className="rounded-xl border border-border bg-surface-2 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{p.name}</p>
                <span
                  className={`font-mono text-sm font-bold ${up ? "text-bullish" : "text-bearish"}`}
                >
                  {up ? "+" : ""}
                  {p.returnPct.toFixed(1)}%
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{p.ticker}</p>

              <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <dt>평단가</dt>
                  <dd className="font-mono text-foreground">
                    {p.avgPrice.toLocaleString("ko-KR")}원
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>현재가</dt>
                  <dd className="font-mono text-foreground">
                    {p.currentPrice.toLocaleString("ko-KR")}원
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>보유 수량</dt>
                  <dd className="font-mono text-foreground">{p.quantity.toLocaleString("ko-KR")}주</dd>
                </div>
              </dl>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">보유 비중</span>
                  <span className="font-mono font-semibold text-primary">{p.weight}%</span>
                </div>
                <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-surface">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${p.weight}%` }}
                  />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
