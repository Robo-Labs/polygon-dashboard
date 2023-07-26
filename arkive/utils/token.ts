import { OERC20 } from "../abis/OErc20.ts";
import {
  bigIntToFloat,
  getContract,
  GetContractReturnType,
  PublicClient,
  Store,
} from "../deps.ts";
import { O_ETH } from "./constants.ts";
import { STORE_KEYS } from "./keys.ts";

export const getUnderlyingFloat = async (
  params: {
    contract: GetContractReturnType<typeof OERC20, PublicClient>;
    client: PublicClient;
    store: Store;
    amount: bigint;
  },
) => {
  const { amount, contract, client, store } = params;

  const underlyingDecimals = await getUnderlyingDecimals({
    contract,
    client,
    store,
  });

  return bigIntToFloat(amount, underlyingDecimals);
};

export const getODecimals = async (
  params: {
    contract: GetContractReturnType<typeof OERC20, PublicClient>;
    store: Store;
  },
) => {
  const { contract, store } = params;

  const oDecimals = await store.retrieve(
    `${STORE_KEYS.DECIMALS}:${contract.address.toLowerCase()}`,
    contract.read.decimals,
  );

  return oDecimals;
};

export const getUnderlyingDecimals = async (
  params: {
    contract: GetContractReturnType<typeof OERC20, PublicClient>;
    client: PublicClient;
    store: Store;
  },
) => {
  const { client, contract, store } = params;

  if (contract.address.toLowerCase() === O_ETH) {
    const underlyingDecimals = 18;
    return underlyingDecimals;
  }

  const underlying = await store.retrieve(
    `${STORE_KEYS.UNDERLYING}:${contract.address.toLowerCase()}`,
    contract.read.underlying,
  );

  const underlyingContract = getContract({
    abi: OERC20,
    address: underlying,
    publicClient: client,
  });

  const underlyingDecimals = await store.retrieve(
    `${STORE_KEYS.DECIMALS}:${underlying.toLowerCase()}`,
    underlyingContract.read.decimals,
  );

  return underlyingDecimals;
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
    `${STORE_KEYS.DECIMALS}:${address}`,
    contract.read.decimals,
  );

  return bigIntToFloat(amount, decimals);
};
