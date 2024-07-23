export const abi = [{
  inputs: [
    { internalType: "uint256", name: "_projectId", type: "uint256" },
    { internalType: "uint256", name: "_amount", type: "uint256" },
    { internalType: "address", name: "_token", type: "address" },
    { internalType: "address", name: "_beneficiary", type: "address" },
    { internalType: "uint256", name: "_minReturnedTokens", type: "uint256" },
    { internalType: "bool", name: "_preferClaimedTokens", type: "bool" },
    { internalType: "string", name: "_memo", type: "string" },
    { internalType: "bytes", name: "_metadata", type: "bytes" }
  ],
  name: "pay",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "payable",
  type: "function"
}] as const;

