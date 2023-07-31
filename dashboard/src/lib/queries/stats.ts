import { getProtocolWebsite, PROTOCOLS } from "$lib/utils/protocols";
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
    borrowIndex: number;
    exchangeRate: number;
    priceUsd: number;
    collateralFactor: number;
    underlyingAddress: string;
    underlyingSymbol: string;
    address: string;
    symbol: string;
  };
};

export type Stat = {
  protocol: keyof typeof PROTOCOLS;
  protocolWebsite: string;
  pool: string;
  poolAddress: string;
  token: string;
  tokenAddress: string;
  supply: number;
  debt: number;
  liquidity: number;
  collateralFactor: number;
  account: string;
};

const createQuery = (filters: { account?: string }) => {
  const collateralAtRiskFilter = !filters.account ? "" : filters.account;
  const accountFilter = !filters.account ? "total" : filters.account;
  return gql`
{
  Accounts(filter: {address: "${accountFilter}"}) {
		address
    borrowBalance
    oTokenCollateralBalance
    borrowIndex
    market {
      priceUsd
      exchangeRate
      collateralFactor
      borrowIndex
			underlyingSymbol
			symbol
			underlyingAddress
			address
    }
  }
	CollateralAtRisk(filterByAccountAddress: "${collateralAtRiskFilter}")
  ArkiverMetadata(sort: PROCESSEDBLOCKHEIGHT_DESC) {
    processedBlockHeight
  }
}
`;
};

export const fetchStats = async (filters: { account?: string }): Promise<
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
        protocol: "0VIX",
        protocolWebsite: getProtocolWebsite("0VIX"),
        pool: rawStat.market.symbol,
        poolAddress: rawStat.market.address,
        token: rawStat.market.underlyingSymbol,
        tokenAddress: rawStat.market.underlyingAddress,
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
