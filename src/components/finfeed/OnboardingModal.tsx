import { useState } from "react";
import { STYLE_LABEL, type InvestStyle } from "@/hooks/use-profile";

const OPTIONS: { key: InvestStyle; desc: string; bullets: string[] }[] = [
  {
    key: "value",
    desc: "기업 가치와 실적 흐름 중심으로 길게 보유합니다.",
    bullets: ["분기 실적·밸류에이션 중심 피드백", "분할 매수/보유 유지 시나리오"],
  },
  {
    key: "trader",
    desc: "수급과 변동성을 활용해 짧게 대응합니다.",
    bullets: ["장중 눌림목·손절 라인 중심 피드백", "당일 대응 시나리오 제공"],
  },
];

export function OnboardingModal({ onComplete }: { onComplete: (style: InvestStyle) => void }) {
  const [selected, setSelected] = useState<InvestStyle>("value");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">온보딩 1/1</p>
        <h2 className="mt-2 font-display text-2xl font-bold">투자 성향을 선택해 주세요</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          선택한 성향에 맞춰 뉴스 요약 아래 AI 피드백과 오늘의 대응 시나리오가 달라집니다.
        </p>

        <div className="mt-5 space-y-3">
          {OPTIONS.map((o) => (
            <button
              key={o.key}
              onClick={() => setSelected(o.key)}
              className={`w-full rounded-xl border p-4 text-left transition-colors ${
                selected === o.key
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-surface-2 hover:border-primary/40"
              }`}
            >
              <p className="font-display text-base font-bold">{STYLE_LABEL[o.key]}</p>
              <p className="mt-1 text-sm text-muted-foreground">{o.desc}</p>
              <ul className="mt-2 space-y-1">
                {o.bullets.map((b) => (
                  <li key={b} className="text-xs text-muted-foreground">
                    · {b}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <button
          onClick={() => onComplete(selected)}
          className="mt-5 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {STYLE_LABEL[selected]}로 시작하기
        </button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          설정 메뉴에서 언제든 변경할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
