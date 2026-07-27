import { SENTIMENT_LABEL, type Sentiment } from "@/data/finfeed";

const styles: Record<Sentiment, string> = {
  positive: "border-bullish/40 bg-bullish/10 text-bullish",
  negative: "border-bearish/40 bg-bearish/10 text-bearish",
  neutral: "border-flat/30 bg-flat/10 text-flat",
};

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[sentiment]}`}
    >
      {sentiment === "positive" ? "▲" : sentiment === "negative" ? "▼" : "■"}
      {SENTIMENT_LABEL[sentiment]}
    </span>
  );
}