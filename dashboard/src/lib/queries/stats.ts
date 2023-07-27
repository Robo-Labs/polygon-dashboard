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
  };
};

export type Stat = {
  protocol: string;
  pool: string;
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
    }
  }
}
`;

export const fetchStats = async (): Promise<Stat[]> => {
  const res = await request<{ Accounts: RawStats[] }>(
    GRAPHQL_ENDPOINT,
    query,
  );

  return res.Accounts.map((rawStat) => {
    const debt = rawStat.borrowBalance / rawStat.borrowIndex *
      rawStat.market.borrowIndex * rawStat.market.priceUsd;
    const supply = rawStat.oTokenCollateralBalance *
      rawStat.market.exchangeRate * rawStat.market.priceUsd;
    const liquidity = supply * rawStat.market.collateralFactor - debt;
    return {
      protocol: "0Vix",
      pool: rawStat.market.name,
      collateralFactor: rawStat.market.collateralFactor,
      supply,
      debt,
      liquidity,
    };
  });
};
