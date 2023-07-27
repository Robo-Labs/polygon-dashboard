import { mongoose } from "../deps.ts";
import { Account } from "../entities/account.ts";

export const resolveCollateralAtRisk = async (
  // deno-lint-ignore no-explicit-any
  _source: any,
  args: { filterByAccountAddress: string; filterByMarketAddress: string },
) => {
  const addressFilterStage: mongoose.PipelineStage[] = [];
  if (args.filterByAccountAddress) {
    addressFilterStage.push({
      $match: {
        address: args.filterByAccountAddress,
      },
    });
  }
  const marketFilterStage: mongoose.PipelineStage[] = [];
  if (args.filterByMarketAddress) {
    marketFilterStage.push({
      $match: {
        "market.address": args.filterByMarketAddress,
      },
    });
  }
  const res = await Account.aggregate([
    ...addressFilterStage,
    {
      $lookup: {
        from: "markets",
        localField: "market",
        foreignField: "_id",
        as: "market",
      },
    },
    {
      $unwind: "$market",
    },
    ...marketFilterStage,
    {
      $addFields: {
        collateralUsd: {
          $multiply: [
            "$oTokenCollateralBalance",
            "$market.exchangeRate",
            "$market.priceUsd",
          ],
        },
        maxLtv: {
          $multiply: [
            "$oTokenCollateralBalance",
            "$market.exchangeRate",
            "$market.priceUsd",
            "$market.collateralFactor",
          ],
        },
        borrowedUsd: {
          $cond: [
            { $eq: ["$borrowIndex", 0] },
            0,
            {
              $multiply: [
                { $divide: ["$borrowBalance", "$borrowIndex"] },
                "$market.borrowIndex",
                "$market.priceUsd",
              ],
            },
          ],
        },
      },
    },
    {
      $addFields: {
        borrowedUsdNearMaxLtv: {
          $gte: ["$borrowedUsd", { $multiply: ["$maxLtv", 0.95] }],
        },
      },
    },
    {
      $match: {
        borrowedUsdNearMaxLtv: true,
      },
    },
    {
      $group: {
        _id: null,
        totalCollateralAtRisk: {
          $sum: "$collateralUsd",
        },
      },
    },
  ]);
  return res[0]?.totalCollateralAtRisk ?? 0;
};
