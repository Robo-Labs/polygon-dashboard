export const PRICE_ORACLE_ADDRESS =
  "0xBC81104207C160cFE48585cC8D753aD2c7031FF7" as const;

export const PRICE_ORACLE_ABI = [
  "function getUnderlyingPrice(address oToken) public view returns (uint)",
] as const;
