import { useState } from "react";
import { STYLE_LABEL, type InvestStyle, type BrokerState } from "@/hooks/use-profile";

interface Props {
  style: InvestStyle;
  broker: BrokerState;
  onStyle: (style: InvestStyle) => void;
  onConnect: (appKey: string) => void;
  onDisconnect: () => void;
  onClose: () => void;
}

export function SettingsModal({ style, broker, onStyle, onConnect, onDisconnect, onClose }: Props) {
  const [appKey, setAppKey] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [account, setAccount] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appKey.trim().length < 8 || appSecret.trim().length < 8) {
      setError("App Key와 App Secret을 정확히 입력해 주세요 (8자 이상).");
      return;
    }
    setError(null);
    setBusy(true);
    window.setTimeout(() => {
      onConnect(appKey.trim());
      setBusy(false);
      setAppKey("");
      setAppSecret("");
      setAccount("");
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/80 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="내 정보 및 설정"
    >
      <div className="my-auto w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold">내 정보 · 설정</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              투자 성향과 증권사 연동을 관리합니다.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="설정 닫기"
            className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-sm text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <section className="mt-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            투자 성향 변경
          </h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
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
                {STYLE_LABEL[s]}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            증권사 연동 (한국투자증권 Open API)
          </h3>

          {broker.connected ? (
            <div className="mt-2 rounded-xl border border-bullish/30 bg-bullish/10 p-4">
              <p className="text-sm font-semibold text-bullish">연동 완료</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                App Key {broker.maskedKey}
              </p>
              <button
                onClick={onDisconnect}
                className="mt-3 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-semibold hover:text-foreground"
              >
                연동 해제
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-2 space-y-3">
              <div>
                <label htmlFor="appKey" className="text-xs font-semibold text-muted-foreground">
                  App Key
                </label>
                <input
                  id="appKey"
                  value={appKey}
                  onChange={(e) => setAppKey(e.target.value.slice(0, 120))}
                  className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-mono text-sm outline-none focus:border-primary"
                  placeholder="PS1a2b3c..."
                />
              </div>
              <div>
                <label htmlFor="appSecret" className="text-xs font-semibold text-muted-foreground">
                  App Secret
                </label>
                <input
                  id="appSecret"
                  type="password"
                  value={appSecret}
                  onChange={(e) => setAppSecret(e.target.value.slice(0, 300))}
                  className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-mono text-sm outline-none focus:border-primary"
                  placeholder="발급받은 시크릿 키"
                />
              </div>
              <div>
                <label htmlFor="account" className="text-xs font-semibold text-muted-foreground">
                  계좌번호 (선택)
                </label>
                <input
                  id="account"
                  value={account}
                  onChange={(e) => setAccount(e.target.value.slice(0, 20))}
                  className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-mono text-sm outline-none focus:border-primary"
                  placeholder="12345678-01"
                />
              </div>
              {error && <p className="text-xs text-bearish">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {busy ? "연동 중..." : "증권사 연동하기"}
              </button>
              <p className="text-xs text-muted-foreground">
                현재는 데모 연동입니다. 입력한 키는 서버로 전송되지 않으며 실제 잔고 조회는 백엔드 연동 후
                제공됩니다.
              </p>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
