import { OERC20 } from "../abis/OErc20.ts";
import {
  bigIntToFloat,
  EventHandlerFor,
  getContract,
  PublicClient,
  Store,
} from "../deps.ts";
import { O_ETH } from "./constants.ts";

export const getUnderlyingFloat = async (
  params: {
    context: Parameters<
      EventHandlerFor<typeof OERC20, "Mint">
    >[0];
    amount: bigint;
  },
) => {
  const { amount, context: { contract, client, store } } = params;

  if (contract.address === O_ETH) {
    const underlyingDecimals = 18;
    return {
      res: bigIntToFloat(amount, underlyingDecimals),
      underlyingDecimals,
    };
  }

  const underlying = await store.retrieve(
    `underlying:${contract.address}`,
    contract.read.underlying,
  );

  const underlyingContract = getContract({
    abi: OERC20,
    address: underlying,
    publicClient: client,
  });

  const underlyingDecimals = await store.retrieve(
    `decimals:${underlying}`,
    underlyingContract.read.decimals,
  );

  return { res: bigIntToFloat(amount, underlyingDecimals), underlyingDecimals };
};

export const formatErc20Token = async (params: {
  address: `0x${string}`;
  amount: bigint;
  client: PublicClient;
  store: Store;
}) => {
  let { address, amount, client, store } = params;
  address = address.toLowerCase() as `0x${string}`;

  const contract = getContract({
    abi: OERC20,
    address,
    publicClient: client,
  });

  const decimals = await store.retrieve(
    `decimals:${address}`,
    contract.read.decimals,
  );

  return bigIntToFloat(amount, decimals);
};
