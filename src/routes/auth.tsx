import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const TITLE = "로그인 · FinFeed AI 투자자 맞춤 뉴스 브리핑";
const DESCRIPTION =
  "FinFeed AI 계정으로 로그인하면 관심 종목과 포트폴리오 비중 설정을 저장하고 맞춤 AI 피드백을 받아볼 수 있습니다.";

export const Route = createFileRoute("/auth")({
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
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/", replace: true });
  }, [loading, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setMessage("확인 메일을 보냈습니다. 메일함에서 인증을 완료해 주세요.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/", replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "요청을 처리하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-hero-gradient px-5 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
            F
          </span>
          <span className="font-display text-lg font-bold">
            Fin<span className="text-gold-gradient">Feed</span> AI
          </span>
        </Link>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h1 className="font-display text-2xl font-bold">
            {mode === "signin" ? "로그인" : "회원가입"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            이메일과 비밀번호로 내 관심 종목·포트폴리오 설정을 이어서 사용하세요.
          </p>

          {!isSupabaseConfigured && (
            <p className="mt-4 rounded-xl border border-bearish/30 bg-bearish/10 px-3 py-2 text-xs text-bearish">
              Supabase 환경변수(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY)가 설정되지 않아 로그인
              요청을 보낼 수 없습니다.
            </p>
          )}

          <form onSubmit={submit} className="mt-5 space-y-3">
            <div>
              <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                이메일
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-semibold text-muted-foreground">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-primary"
                placeholder="6자 이상"
              />
            </div>

            {error && <p className="text-xs text-bearish">{error}</p>}
            {message && <p className="text-xs text-bullish">{message}</p>}

            <button
              type="submit"
              disabled={busy || !isSupabaseConfigured}
              className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {busy ? "처리 중..." : mode === "signin" ? "로그인" : "회원가입"}
            </button>
          </form>

          <button
            onClick={() => {
              setMode((m) => (m === "signin" ? "signup" : "signin"));
              setError(null);
              setMessage(null);
            }}
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "계정이 없으신가요? 회원가입" : "이미 계정이 있으신가요? 로그인"}
          </button>
        </div>
      </div>
    </div>
  );
}