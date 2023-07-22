export type Stat = {
  protocol: string;
  pool: string;
  supply: number;
  debt: number;
  liquidity: number;
};

export const fetchStats = async (params: { fetch: typeof fetch }) => {
  const defaultData = [
    {
      protocol: "0vix",
      debt: 1_000_000,
      liquidity: 1_000_000,
      pool: "MATIC",
      supply: 1_000_000,
    },
  ] satisfies Stat[];

  return defaultData;
};
