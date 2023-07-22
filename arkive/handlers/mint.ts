import { OERC20 } from "../abis/OErc20.ts";
import { EventHandlerFor } from "../deps.ts";

export const onMint: EventHandlerFor<typeof OERC20, "Mint"> = (ctx) => {};
