import type { NewsItem } from "@/data/finfeed";

export function BriefingBar({ news }: { news: NewsItem[] }) {
  const bull = news.filter((n) => n.sentiment === "positive").length;
  const bear = news.filter((n) => n.sentiment === "negative").length;
  const alerts = news.filter((n) => n.impactScore >= 70);

  const stats = [
    { label: "오늘의 큐레이션", value: `${news.length}건` },
    { label: "호재", value: `${bull}건`, tone: "text-bullish" },
    { label: "악재", value: `${bear}건`, tone: "text-bearish" },
    { label: "긴급 알림", value: `${alerts.length}건`, tone: "text-primary" },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold">장 전 데일리 브리핑</h2>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          매일 08:00 발송
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface-2 p-3">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${s.tone ?? "text-foreground"}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
      {alerts.length > 0 && (
        <ul className="mt-4 space-y-2">
          {alerts.map((a) => (
            <li
              key={a.id}
              className="flex items-start gap-2 rounded-xl border border-primary/25 bg-primary/5 px-3 py-2 text-sm"
            >
              <span className="mt-0.5 text-primary">🔔</span>
              <span className="text-foreground/90">{a.title}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}