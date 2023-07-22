import { COMPTROLLER } from "./abis/Comptroller.ts";
import { OERC20 } from "./abis/OErc20.ts";
import { Manifest } from "./deps.ts";
import { onMint } from "./handlers/mint.ts";
const manifest = new Manifest("polygon");

manifest
  .addChain("polygonZkEvm", (chain) =>
    chain
      .setOptions({
        rpcUrl: "https://zkevm-rpc.com/",
      })
      .addContract({
        name: "Comptroller",
        abi: COMPTROLLER,
        sources: {
          "0x6EA32f626e3A5c41547235ebBdf861526e11f482": 101n,
        },
      })
      .addContract({
        name: "OErc20",
        abi: OERC20,
        eventHandlers: {
          Mint: onMint,
        },
        factorySources: {
          Comptroller: {
            MarketListed: "oToken",
          },
        },
      }));
export default manifest.build();
