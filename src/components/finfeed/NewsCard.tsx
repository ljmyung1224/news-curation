import { useState } from "react";
import { Heart } from "lucide-react";
import { SentimentBadge } from "./SentimentBadge";
import { formatQuote, type NewsItem, type Stock } from "@/data/finfeed";

interface Props {
  news: NewsItem;
  stock: Stock;
  weight?: number;
  style: "value" | "trader";
  watched: boolean;
  onToggleWatch: () => void;
}

export function NewsCard({ news, stock, weight, style, watched, onToggleWatch }: Props) {
  const [open, setOpen] = useState(false);
  const up = stock.changePct >= 0;

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/40">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 rounded-md bg-surface-2 px-2 py-0.5 font-semibold text-foreground">
          {stock.name}
          <button
            onClick={onToggleWatch}
            aria-label={`${stock.name} 관심 종목 ${watched ? "해제" : "추가"}`}
            aria-pressed={watched}
            className={watched ? "text-bearish" : "text-muted-foreground hover:text-bearish"}
          >
            <Heart size={12} fill={watched ? "currentColor" : "none"} />
          </button>
        </span>
        <span className="font-mono">{stock.ticker}</span>
        <span>·</span>
        <span>{news.source}</span>
        <span>·</span>
        <span>{news.publishedAt}</span>
        <span className="ml-auto flex items-center gap-2">
          {weight !== undefined && (
            <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-semibold text-primary">
              보유 {weight}%
            </span>
          )}
          <span
            className={`rounded-md border px-2 py-0.5 font-mono font-semibold ${
              up
                ? "border-bullish/30 bg-bullish/10 text-bullish"
                : "border-bearish/30 bg-bearish/10 text-bearish"
            }`}
          >
            {formatQuote(stock)} {up ? "+" : ""}
            {stock.changePct.toFixed(1)}%
          </span>
        </span>
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
            <div className="mt-3 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2">
              <p className="text-xs font-semibold text-accent">
                오늘의 대응 시나리오 · {style === "value" ? "가치투자" : "단기매매"}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">{news.scenario[style]}</p>
            </div>
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