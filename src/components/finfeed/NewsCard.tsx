import { useState } from "react";
import { SentimentBadge } from "./SentimentBadge";
import type { NewsItem, Stock } from "@/data/finfeed";

interface Props {
  news: NewsItem;
  stock: Stock;
  weight?: number;
  style: "value" | "trader";
}

export function NewsCard({ news, stock, weight, style }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/40">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-md bg-surface-2 px-2 py-0.5 font-semibold text-foreground">
          {stock.name}
        </span>
        <span className="font-mono">{stock.ticker}</span>
        <span>·</span>
        <span>{news.source}</span>
        <span>·</span>
        <span>{news.publishedAt}</span>
        {weight !== undefined && (
          <span className="ml-auto rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-semibold text-primary">
            보유 {weight}%
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-bold leading-snug">{news.title}</h3>

      <ol className="mt-3 space-y-1.5">
        {news.summary.map((line, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-0.5 font-mono text-xs text-primary">0{i + 1}</span>
            <span>{line}</span>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <SentimentBadge sentiment={news.sentiment} />
        {news.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            #{k}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          영향도
          <span className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-2">
            <span
              className="block h-full rounded-full bg-primary"
              style={{ width: `${news.impactScore}%` }}
            />
          </span>
          <span className="font-mono font-semibold text-foreground">{news.impactScore}</span>
        </span>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-4 w-full rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
      >
        {open ? "AI 피드백 접기" : "AI 투자 피드백 보기"}
      </button>

      {open && (
        <div className="mt-3 space-y-3 rounded-xl border border-border bg-surface p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">종목 영향도 분석</p>
            <p className="mt-1 text-sm text-foreground/90">{news.impact}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">개인화 제언</p>
            <p className="mt-1 text-sm text-foreground/90">{news.advice[style]}</p>
            {weight !== undefined && weight >= 25 && (
              <p className="mt-2 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary">
                포트폴리오 비중 {weight}%로 집중도가 높습니다. 단기 변동성에 유의하세요.
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}