import { polygonZkEvm } from "viem/chains";

export const PROTOCOLS = {
  "0VIX": {
    "website": "https://0vix.com/",
    chain: polygonZkEvm,
  },
} as const;

export const getProtocolWebsite = (protocol: keyof typeof PROTOCOLS) => {
  return PROTOCOLS[protocol].website;
};

export const getProtocolBlockExplorer = <
  TProtocol extends keyof typeof PROTOCOLS,
>(
  protocol: TProtocol,
): typeof PROTOCOLS[TProtocol]["chain"]["blockExplorers"]["default"]["url"] => {
  return PROTOCOLS[protocol].chain.blockExplorers.default.url;
};
