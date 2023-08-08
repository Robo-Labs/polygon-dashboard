import type { PROTOCOLS } from "$lib/utils/protocols";
import { fetch0vixStats } from "./0vix";

export type Account = {
  protocol: keyof typeof PROTOCOLS;
  protocolWebsite: string;
  pool: string;
  poolAddress: string;
  token: string;
  tokenAddress: string;
  account: string;
  liquidationsAtRisk: number;
};

export type DailyAccountStat = Account & {
  dailyStats: {
    supply: number;
    debt: number;
    borrowingPower: number;
    timestamp: number;
  }[];
};

export type DailyStat = DailyAccountStat["dailyStats"][number];

export const STATS_QUERY_KEY = "stats" as const;

export const fetchStats = async (
  fetchFn: typeof fetch,
  filters: { account?: string },
) => {
  const res = await Promise.all([
    fetch0vixStats(fetchFn, filters),
  ]);

  const stats = res.flatMap((r) => r.stats);
  const lowestProcessedBlockHeight = Math.min(
    ...res.map((r) => r.processedBlockHeight),
  );

  return {
    processedBlockHeight: lowestProcessedBlockHeight,
    stats,
  };
};
