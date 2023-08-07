import { getProtocolWebsite } from "$lib/utils/protocols";
import type { DailyAccountStat } from "./stats";
import { array, number, object, parse, string } from "valibot";

const PROTOCOL = "0VIX" as const;

export const GRAPHQL_ENDPOINT =
  "https://data.staging.arkiver.net/robolabs/polygon-zkevm/graphql" as const;

const createStatsQuery = (
  params: {
    accountIds: string[];
    startTimestamp: number;
    endTimestamp: number;
    filterByAccountAddress?: string;
  },
) => {
  const { accountIds, startTimestamp, endTimestamp, filterByAccountAddress } =
    params;
  const accountFilter = accountIds.join(",");
  return /* GraphQL */ `{
		AccountDailys(
			filter: {
				_operators: {
					account: {
						in: [${accountFilter}]
					},
					timestamp: {
						gte: ${startTimestamp},
						lte: ${endTimestamp}
					}
				}
			}
		) {
			timestamp
			account {
				market {
					address
					underlyingAddress
					symbol
					underlyingSymbol
					collateralFactor
				}
				_id
			}
			borrowedUsd
			suppliedUsd
		}
		ArkiverMetadata(sort: PROCESSEDBLOCKHEIGHT_DESC) {
			processedBlockHeight
		}
		LiquidationsAtRisk(filterByAccountAddress: "${
    filterByAccountAddress ?? ""
  }") {
			liquidationsAtRisk
			account {
				_id
			}
		}
	}`;
};

const createFetchAccountsQuery = (account?: string) => {
  const address = account === undefined ? "total" : account;
  return /* GraphQL */ `{
		Accounts(filter: {address: "${address}"}) {
			_id
		}
	}`;
};

export const fetch0vixStats = async (
  fetchFn: typeof fetch,
  filters: { account?: string },
): Promise<
  {
    stats: DailyAccountStat[];
    processedBlockHeight: number;
  }
> => {
  const accountIds = await fetchAccounts(fetchFn, filters);
  const now = Date.now();
  const startTimestamp = (now - now % 86400000) - 86400000 * 7; // 7 days ago
  const endTimestamp = now - now % 86400000; // today

  const res = await fetchFn(
    GRAPHQL_ENDPOINT,
    {
      body: JSON.stringify({
        query: createStatsQuery({
          accountIds,
          startTimestamp,
          filterByAccountAddress: filters.account,
          endTimestamp,
        }),
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch stats for 0vix: ${res.statusText}`);
  }

  const { AccountDailys, ArkiverMetadata, LiquidationsAtRisk } =
    parse(raw0vixSchema, await res.json()).data;

  const protocolBase = {
    protocol: PROTOCOL,
    protocolWebsite: getProtocolWebsite(PROTOCOL),
  };

  const liquidationsAtRiskMap = LiquidationsAtRisk.reduce(
    (acc, { account: { _id }, liquidationsAtRisk }) => {
      acc[_id] = liquidationsAtRisk;
      return acc;
    },
    {} as Record<string, number>,
  );

  const statsObject = AccountDailys.sort((dailyA, dailyB) =>
    dailyA.timestamp - dailyB.timestamp // sort by timestamp ascending
  ).reduce((acc, daily) => {
    const {
      account: {
        market: {
          address: poolAddress,
          collateralFactor,
          symbol: pool,
          underlyingAddress: tokenAddress,
          underlyingSymbol: token,
        },
        _id,
      },
      borrowedUsd,
      suppliedUsd,
      timestamp,
    } = daily;

    const liquidationsAtRisk = liquidationsAtRiskMap[_id] ?? 0;

    const accountStats = acc[_id] ?? {
      ...protocolBase,
      account: filters.account ?? "total",
      pool,
      poolAddress,
      token,
      tokenAddress,
      liquidationsAtRisk,
      dailyStats: [],
    };

    accountStats.dailyStats.push({
      borrowingPower: suppliedUsd * collateralFactor,
      debt: borrowedUsd,
      supply: suppliedUsd,
      timestamp,
    });

    acc[_id] = accountStats;

    return acc;
  }, {} as Record<string, DailyAccountStat>);

  const stats = Object.values(statsObject);

  return {
    processedBlockHeight: ArkiverMetadata.processedBlockHeight,
    stats,
  };
};

export const fetchAccounts = async (
  fetchFn: typeof fetch,
  filters: { account?: string },
) => {
  const res = await fetchFn(
    GRAPHQL_ENDPOINT,
    {
      body: JSON.stringify({
        query: createFetchAccountsQuery(filters.account),
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch accounts for 0vix: ${res.statusText}`);
  }

  const accounts = parse(accountsSchema, await res.json()).data;

  return accounts.Accounts.map((account) => `"${account._id}"`);
};

const raw0vixSchema = object({
  data: object({
    AccountDailys: array(object({
      suppliedUsd: number(),
      borrowedUsd: number(),
      timestamp: number(),
      account: object({
        _id: string(),
        market: object({
          address: string(),
          collateralFactor: number(),
          symbol: string(),
          underlyingAddress: string(),
          underlyingSymbol: string(),
        }),
      }),
    })),
    ArkiverMetadata: object({
      processedBlockHeight: number(),
    }),
    LiquidationsAtRisk: array(object({
      liquidationsAtRisk: number(),
      account: object({
        _id: string(),
      }),
    })),
  }),
});

const accountsSchema = object({
  data: object({
    Accounts: array(object({
      _id: string(),
    })),
  }),
});
