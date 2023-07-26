import { createPublicClient, getContract, http, parseAbi } from "npm:viem";
import { polygonZkEvm } from "npm:viem/chains";

const publicClient = createPublicClient({
  transport: http("https://zkevm-rpc.com/"),
  chain: polygonZkEvm,
});

const priceOracle = getContract({
  abi: parseAbi([
    "function getUnderlyingPrice(address oToken) public view returns (uint256 price)",
    "function getFeed(address oToken) public view returns (bytes32 feed)",
  ]),
  address: "0xBC81104207C160cFE48585cC8D753aD2c7031FF7",
  publicClient,
});

const feed = await priceOracle.read.getUnderlyingPrice([
  "0xee1727f5074E747716637e1776B7F7C7133f16b1",
], {
  blockNumber: 1000n,
});

console.log(feed);
