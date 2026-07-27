import { useCallback, useEffect, useState } from "react";
import { DEFAULT_HOLDINGS } from "@/data/finfeed";

export type InvestStyle = "value" | "trader";

export interface BrokerState {
  connected: boolean;
  broker: string;
  maskedKey: string;
  connectedAt: string | null;
}

export interface Profile {
  onboarded: boolean;
  style: InvestStyle;
  watchlist: string[];
  broker: BrokerState;
}

const STORAGE_KEY = "finfeed.profile.v1";

const DEFAULT_PROFILE: Profile = {
  onboarded: false,
  style: "value",
  watchlist: DEFAULT_HOLDINGS.map((h) => h.ticker).concat("000660", "005380"),
  broker: { connected: false, broker: "한국투자증권", maskedKey: "", connectedAt: null },
};

function read(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<Profile>) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(read());
    setHydrated(true);
  }, []);

  const update = useCallback((patch: Partial<Profile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const setStyle = useCallback((style: InvestStyle) => update({ style }), [update]);

  const completeOnboarding = useCallback(
    (style: InvestStyle) => update({ style, onboarded: true }),
    [update],
  );

  const toggleWatch = useCallback(
    (ticker: string) =>
      setProfile((prev) => {
        const watchlist = prev.watchlist.includes(ticker)
          ? prev.watchlist.filter((t) => t !== ticker)
          : [...prev.watchlist, ticker];
        const next = { ...prev, watchlist };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* storage unavailable */
        }
        return next;
      }),
    [],
  );

  const connectBroker = useCallback(
    (appKey: string) =>
      update({
        broker: {
          connected: true,
          broker: "한국투자증권",
          maskedKey: `${appKey.slice(0, 4)}${"•".repeat(Math.max(4, appKey.length - 8))}${appKey.slice(-4)}`,
          connectedAt: new Date().toISOString(),
        },
      }),
    [update],
  );

  const disconnectBroker = useCallback(
    () => update({ broker: { ...DEFAULT_PROFILE.broker } }),
    [update],
  );

  return {
    profile,
    hydrated,
    setStyle,
    completeOnboarding,
    toggleWatch,
    connectBroker,
    disconnectBroker,
  };
}

export const STYLE_LABEL: Record<InvestStyle, string> = {
  value: "가치투자",
  trader: "단기매매",
};
