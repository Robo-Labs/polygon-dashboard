import { gql, request } from "graphql-request";

export const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql" as const;

export const STATS_QUERY_KEY = "stats" as const;

export type RawStats = {
  borrowBalance: number;
  oTokenCollateralBalance: number;
  borrowIndex: number;
  market: {
    name: string;
    borrowIndex: number;
    exchangeRate: number;
    priceUsd: number;
    collateralFactor: number;
    underlyingSymbol: string;
  };
};

export type Stat = {
  protocol: string;
  pool: string;
  token: string;
  supply: number;
  debt: number;
  liquidity: number;
  collateralFactor: number;
};

const query = gql`
{
  Accounts(filter: {address: "total"}) {
    borrowBalance
    oTokenCollateralBalance
    borrowIndex
    market {
      name
      priceUsd
      exchangeRate
      collateralFactor
      borrowIndex
			underlyingSymbol
    }
  }
	CollateralAtRisk
}
`;

export const fetchStats = async (): Promise<
  { stats: Stat[]; collateralAtRisk: number }
> => {
  const res = await request<{ Accounts: RawStats[]; CollateralAtRisk: number }>(
    GRAPHQL_ENDPOINT,
    query,
  );

  return {
    stats: res.Accounts.map((rawStat) => {
      const debt = rawStat.borrowBalance / rawStat.borrowIndex *
        rawStat.market.borrowIndex * rawStat.market.priceUsd;
      const supply = rawStat.oTokenCollateralBalance *
        rawStat.market.exchangeRate * rawStat.market.priceUsd;
      const liquidity = supply * rawStat.market.collateralFactor - debt;
      return {
        protocol: "0Vix",
        pool: rawStat.market.name,
        token: rawStat.market.underlyingSymbol,
        collateralFactor: rawStat.market.collateralFactor,
        supply,
        debt,
        liquidity,
      };
    }),
    collateralAtRisk: res.CollateralAtRisk,
  };
};
