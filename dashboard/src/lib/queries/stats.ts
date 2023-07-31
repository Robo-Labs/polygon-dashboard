import { gql, request } from "graphql-request";

export const GRAPHQL_ENDPOINT =
  "https://data.staging.arkiver.net/robolabs/polygon-zkevm/graphql" as const;

export const STATS_QUERY_KEY = "stats" as const;

export type RawStats = {
  address: string;
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
  account: string;
};

const createQuery = (filters: { account: string }) =>
  gql`
{
  Accounts(filter: {address: "${filters.account}"}) {
		address
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
  ArkiverMetadata(sort: PROCESSEDBLOCKHEIGHT_DESC) {
    processedBlockHeight
  }
}
`;

export const fetchStats = async (filters: { account: string }): Promise<
  { stats: Stat[]; collateralAtRisk: number; processedBlockHeight: number }
> => {
  const res = await request<
    {
      Accounts: RawStats[];
      CollateralAtRisk: number;
      ArkiverMetadata: { processedBlockHeight: number };
    }
  >(
    GRAPHQL_ENDPOINT,
    createQuery(filters),
  );

  return {
    stats: res.Accounts.map((rawStat) => {
      const debt = rawStat.borrowIndex === 0
        ? 0
        : rawStat.borrowBalance / rawStat.borrowIndex *
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
        account: rawStat.address,
      };
    }),
    collateralAtRisk: res.CollateralAtRisk,
    processedBlockHeight: res.ArkiverMetadata.processedBlockHeight,
  };
};
