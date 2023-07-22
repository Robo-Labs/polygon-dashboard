export const COMPTROLLER = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "string",
    "name": "action",
    "type": "string",
  }, {
    "indexed": false,
    "internalType": "bool",
    "name": "pauseState",
    "type": "bool",
  }],
  "name": "ActionPaused",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "string",
    "name": "action",
    "type": "string",
  }, {
    "indexed": false,
    "internalType": "bool",
    "name": "pauseState",
    "type": "bool",
  }],
  "name": "ActionPausedGlobally",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "boostmanager",
    "type": "address",
  }],
  "name": "BoostManagerSet",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "contributor",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "newSpeed",
    "type": "uint256",
  }],
  "name": "ContributorRewardSpeedUpdated",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "borrower",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "tokenDelta",
    "type": "uint256",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "tokenBorrowIndex",
    "type": "uint256",
  }],
  "name": "DistributedBorrowerReward",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "supplier",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "tokenDelta",
    "type": "uint256",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "tokenSupplyIndex",
    "type": "uint256",
  }],
  "name": "DistributedSupplierReward",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint256",
    "name": "error",
    "type": "uint256",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "info",
    "type": "uint256",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "detail",
    "type": "uint256",
  }],
  "name": "Failure",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "bool",
    "name": "isAutoCollateralized",
    "type": "bool",
  }],
  "name": "MarketAutoCollateralized",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "address",
    "name": "account",
    "type": "address",
  }],
  "name": "MarketEntered",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "address",
    "name": "account",
    "type": "address",
  }],
  "name": "MarketExited",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }],
  "name": "MarketListed",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "newBorrowCap",
    "type": "uint256",
  }],
  "name": "NewBorrowCap",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "oldBorrowCapGuardian",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "address",
    "name": "newBorrowCapGuardian",
    "type": "address",
  }],
  "name": "NewBorrowCapGuardian",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint256",
    "name": "oldCloseFactorMantissa",
    "type": "uint256",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "newCloseFactorMantissa",
    "type": "uint256",
  }],
  "name": "NewCloseFactor",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "oldCollateralFactorMantissa",
    "type": "uint256",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "newCollateralFactorMantissa",
    "type": "uint256",
  }],
  "name": "NewCollateralFactor",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint256",
    "name": "oldLiquidationIncentiveMantissa",
    "type": "uint256",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "newLiquidationIncentiveMantissa",
    "type": "uint256",
  }],
  "name": "NewLiquidationIncentive",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "oldPauseGuardian",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "address",
    "name": "newPauseGuardian",
    "type": "address",
  }],
  "name": "NewPauseGuardian",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "contract PriceOracle",
    "name": "oldPriceOracle",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "contract PriceOracle",
    "name": "newPriceOracle",
    "type": "address",
  }],
  "name": "NewPriceOracle",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "newSpeed",
    "type": "uint256",
  }],
  "name": "RewardBorrowSpeedUpdated",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "newSpeed",
    "type": "uint256",
  }],
  "name": "RewardSupplySpeedUpdated",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "_rewardUpdater",
    "type": "address",
  }],
  "name": "RewardUpdaterModified",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "vix",
    "type": "address",
  }],
  "name": "VixAddressSet",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "recipient",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256",
  }],
  "name": "VixClaimed",
  "type": "event",
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "recipient",
    "type": "address",
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256",
  }],
  "name": "VixGranted",
  "type": "event",
}, {
  "inputs": [{
    "internalType": "contract IUnitroller",
    "name": "unitroller",
    "type": "address",
  }],
  "name": "_become",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [],
  "name": "_borrowGuardianPaused",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "recipient",
    "type": "address",
  }, { "internalType": "uint256", "name": "amount", "type": "uint256" }],
  "name": "_grantReward",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [],
  "name": "_mintGuardianPaused",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "newBorrowCapGuardian",
    "type": "address",
  }],
  "name": "_setBorrowCapGuardian",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, { "internalType": "bool", "name": "state", "type": "bool" }],
  "name": "_setBorrowPaused",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "newCloseFactorMantissa",
    "type": "uint256",
  }],
  "name": "_setCloseFactor",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, {
    "internalType": "uint256",
    "name": "newCollateralFactorMantissa",
    "type": "uint256",
  }],
  "name": "_setCollateralFactor",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "contributor",
    "type": "address",
  }, { "internalType": "uint256", "name": "rewardSpeed", "type": "uint256" }],
  "name": "_setContributorRewardSpeed",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "newLiquidationIncentiveMantissa",
    "type": "uint256",
  }],
  "name": "_setLiquidationIncentive",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "contract IOToken[]",
    "name": "oTokens",
    "type": "address[]",
  }, {
    "internalType": "uint256[]",
    "name": "newBorrowCaps",
    "type": "uint256[]",
  }],
  "name": "_setMarketBorrowCaps",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, { "internalType": "bool", "name": "state", "type": "bool" }],
  "name": "_setMintPaused",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "newPauseGuardian",
    "type": "address",
  }],
  "name": "_setPauseGuardian",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "contract PriceOracle",
    "name": "newOracle",
    "type": "address",
  }],
  "name": "_setPriceOracle",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address[]",
    "name": "oTokens",
    "type": "address[]",
  }, {
    "internalType": "uint256[]",
    "name": "supplySpeeds",
    "type": "uint256[]",
  }, {
    "internalType": "uint256[]",
    "name": "borrowSpeeds",
    "type": "uint256[]",
  }],
  "name": "_setRewardSpeeds",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{ "internalType": "bool", "name": "state", "type": "bool" }],
  "name": "_setSeizePaused",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{ "internalType": "bool", "name": "state", "type": "bool" }],
  "name": "_setTransferPaused",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }, { "internalType": "bool", "name": "_autoCollaterize", "type": "bool" }],
  "name": "_supportMarket",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256",
  }],
  "name": "accountAssets",
  "outputs": [{
    "internalType": "contract IOToken",
    "name": "",
    "type": "address",
  }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }, {
    "internalType": "address",
    "name": "",
    "type": "address",
  }],
  "name": "accountMembership",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "admin",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "name": "allMarkets",
  "outputs": [{
    "internalType": "contract IOToken",
    "name": "",
    "type": "address",
  }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "boostManager",
  "outputs": [{
    "internalType": "contract IBoostManager",
    "name": "",
    "type": "address",
  }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "borrower", "type": "address" },
    { "internalType": "uint256", "name": "borrowAmount", "type": "uint256" },
  ],
  "name": "borrowAllowed",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [],
  "name": "borrowCapGuardian",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "borrowCaps",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "borrowState",
  "outputs": [
    { "internalType": "uint224", "name": "index", "type": "uint224" },
    { "internalType": "uint32", "name": "timestamp", "type": "uint32" },
  ],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "borrower", "type": "address" },
    { "internalType": "uint256", "name": "borrowAmount", "type": "uint256" },
  ],
  "name": "borrowVerify",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "account",
    "type": "address",
  }, {
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }],
  "name": "checkMembership",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "holder",
    "type": "address",
  }],
  "name": "claimReward",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "holder", "type": "address" },
    {
      "internalType": "contract IOToken[]",
      "name": "oTokens",
      "type": "address[]",
    },
  ],
  "name": "claimRewards",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address[]", "name": "holders", "type": "address[]" },
    {
      "internalType": "contract IOToken[]",
      "name": "oTokens",
      "type": "address[]",
    },
    { "internalType": "bool", "name": "borrowers", "type": "bool" },
    { "internalType": "bool", "name": "suppliers", "type": "bool" },
  ],
  "name": "claimRewards",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [],
  "name": "closeFactorMantissa",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "compRate",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "comptrollerImplementation",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address[]",
    "name": "oTokens",
    "type": "address[]",
  }],
  "name": "enterMarkets",
  "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "oTokenAddress",
    "type": "address",
  }],
  "name": "exitMarket",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "account",
    "type": "address",
  }],
  "name": "getAccountLiquidity",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256",
  }, { "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "getAllMarkets",
  "outputs": [{
    "internalType": "contract IOToken[]",
    "name": "",
    "type": "address[]",
  }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "account",
    "type": "address",
  }],
  "name": "getAssetsIn",
  "outputs": [{
    "internalType": "contract IOToken[]",
    "name": "",
    "type": "address[]",
  }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "getBoostManager",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "account", "type": "address" },
    { "internalType": "address", "name": "oTokenModify", "type": "address" },
    { "internalType": "uint256", "name": "redeemTokens", "type": "uint256" },
    { "internalType": "uint256", "name": "borrowAmount", "type": "uint256" },
  ],
  "name": "getHypotheticalAccountLiquidity",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256",
  }, { "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "getTimestamp",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "getVixAddress",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "guardianPaused",
  "outputs": [{ "internalType": "bool", "name": "mint", "type": "bool" }, {
    "internalType": "bool",
    "name": "borrow",
    "type": "bool",
  }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "isComptroller",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "contract IOToken",
    "name": "oToken",
    "type": "address",
  }],
  "name": "isDeprecated",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "oToken",
    "type": "address",
  }],
  "name": "isMarket",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "lastContributorTimestamp",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oTokenBorrowed", "type": "address" },
    {
      "internalType": "address",
      "name": "oTokenCollateral",
      "type": "address",
    },
    { "internalType": "address", "name": "liquidator", "type": "address" },
    { "internalType": "address", "name": "borrower", "type": "address" },
    { "internalType": "uint256", "name": "repayAmount", "type": "uint256" },
  ],
  "name": "liquidateBorrowAllowed",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oTokenBorrowed", "type": "address" },
    {
      "internalType": "address",
      "name": "oTokenCollateral",
      "type": "address",
    },
    { "internalType": "address", "name": "liquidator", "type": "address" },
    { "internalType": "address", "name": "borrower", "type": "address" },
    {
      "internalType": "uint256",
      "name": "actualRepayAmount",
      "type": "uint256",
    },
    { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" },
  ],
  "name": "liquidateBorrowVerify",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "oTokenBorrowed",
    "type": "address",
  }, {
    "internalType": "address",
    "name": "oTokenCollateral",
    "type": "address",
  }, {
    "internalType": "uint256",
    "name": "actualRepayAmount",
    "type": "uint256",
  }],
  "name": "liquidateCalculateSeizeTokens",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256",
  }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "liquidationIncentiveMantissa",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "marketInitialIndex",
  "outputs": [{ "internalType": "uint224", "name": "", "type": "uint224" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "markets",
  "outputs": [{ "internalType": "bool", "name": "isListed", "type": "bool" }, {
    "internalType": "bool",
    "name": "autoCollaterize",
    "type": "bool",
  }, {
    "internalType": "uint256",
    "name": "collateralFactorMantissa",
    "type": "uint256",
  }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "maxAssets",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "minter", "type": "address" },
    { "internalType": "uint256", "name": "mintAmount", "type": "uint256" },
  ],
  "name": "mintAllowed",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "minter", "type": "address" },
    {
      "internalType": "uint256",
      "name": "actualMintAmount",
      "type": "uint256",
    },
    { "internalType": "uint256", "name": "mintTokens", "type": "uint256" },
  ],
  "name": "mintVerify",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [],
  "name": "oracle",
  "outputs": [{
    "internalType": "contract PriceOracle",
    "name": "",
    "type": "address",
  }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "pauseGuardian",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "pendingAdmin",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "pendingComptrollerImplementation",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "redeemer", "type": "address" },
    { "internalType": "uint256", "name": "redeemTokens", "type": "uint256" },
  ],
  "name": "redeemAllowed",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "redeemer", "type": "address" },
    { "internalType": "uint256", "name": "redeemAmount", "type": "uint256" },
    { "internalType": "uint256", "name": "redeemTokens", "type": "uint256" },
  ],
  "name": "redeemVerify",
  "outputs": [],
  "stateMutability": "pure",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "payer", "type": "address" },
    { "internalType": "address", "name": "borrower", "type": "address" },
    { "internalType": "uint256", "name": "repayAmount", "type": "uint256" },
  ],
  "name": "repayBorrowAllowed",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "payer", "type": "address" },
    { "internalType": "address", "name": "borrower", "type": "address" },
    {
      "internalType": "uint256",
      "name": "actualRepayAmount",
      "type": "uint256",
    },
    { "internalType": "uint256", "name": "borrowerIndex", "type": "uint256" },
  ],
  "name": "repayBorrowVerify",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "rewardAccrued",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "rewardBorrowSpeeds",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }, {
    "internalType": "address",
    "name": "",
    "type": "address",
  }],
  "name": "rewardBorrowerIndex",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "rewardContributorSpeeds",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "rewardReceivable",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "rewardSpeeds",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }, {
    "internalType": "address",
    "name": "",
    "type": "address",
  }],
  "name": "rewardSupplierIndex",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "rewardSupplySpeeds",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [],
  "name": "rewardUpdater",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    {
      "internalType": "address",
      "name": "oTokenCollateral",
      "type": "address",
    },
    { "internalType": "address", "name": "oTokenBorrowed", "type": "address" },
    { "internalType": "address", "name": "liquidator", "type": "address" },
    { "internalType": "address", "name": "borrower", "type": "address" },
    { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" },
  ],
  "name": "seizeAllowed",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [],
  "name": "seizeGuardianPaused",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    {
      "internalType": "address",
      "name": "oTokenCollateral",
      "type": "address",
    },
    { "internalType": "address", "name": "oTokenBorrowed", "type": "address" },
    { "internalType": "address", "name": "liquidator", "type": "address" },
    { "internalType": "address", "name": "borrower", "type": "address" },
    { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" },
  ],
  "name": "seizeVerify",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "market", "type": "address" },
    { "internalType": "bool", "name": "flag", "type": "bool" },
  ],
  "name": "setAutoCollaterize",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "newBoostManager",
    "type": "address",
  }],
  "name": "setBoostManager",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "_rewardUpdater",
    "type": "address",
  }],
  "name": "setRewardUpdater",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "newVixAddress",
    "type": "address",
  }],
  "name": "setVixAddress",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "name": "supplyState",
  "outputs": [
    { "internalType": "uint224", "name": "index", "type": "uint224" },
    { "internalType": "uint32", "name": "timestamp", "type": "uint32" },
  ],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "src", "type": "address" },
    { "internalType": "address", "name": "dst", "type": "address" },
    { "internalType": "uint256", "name": "transferTokens", "type": "uint256" },
  ],
  "name": "transferAllowed",
  "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [],
  "name": "transferGuardianPaused",
  "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
  "stateMutability": "view",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "src", "type": "address" },
    { "internalType": "address", "name": "dst", "type": "address" },
    { "internalType": "uint256", "name": "transferTokens", "type": "uint256" },
  ],
  "name": "transferVerify",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "borrower", "type": "address" },
  ],
  "name": "updateAndDistributeBorrowerRewardsForToken",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [
    { "internalType": "address", "name": "oToken", "type": "address" },
    { "internalType": "address", "name": "account", "type": "address" },
  ],
  "name": "updateAndDistributeSupplierRewardsForToken",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [{
    "internalType": "address",
    "name": "contributor",
    "type": "address",
  }],
  "name": "updateContributorRewards",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
}, {
  "inputs": [],
  "name": "vixAddress",
  "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
  "stateMutability": "view",
  "type": "function",
}, { "stateMutability": "payable", "type": "receive" }] as const;