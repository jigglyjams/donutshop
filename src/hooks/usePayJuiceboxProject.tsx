import {
  useSimulateContract,
  useWriteContract,
} from 'wagmi';
import { parseEther } from 'viem';

const ETH_TOKEN_ADDRESS = "0x000000000000000000000000000000000000eeee";
const DEFAULT_MIN_RETURNED_TOKENS = 0;
const DEFAULT_PREFER_CLAIMED_TOKENS = false;
const DEFAULT_DELEGATE_METADATA = "0x";

const paymentTerminal = {
  mainnet: "0xFA391De95Fcbcd3157268B91d8c7af083E607A5C",
  sepolia: "0x55FF1D8093166c1fF9664efd613D8C543b95feFc"
} as const;

type PayJuiceboxProjectInputs = {
  projectId: string;
  value: number;
  callerAddress: `0x${string}`;
  memo: string;
  network?: keyof typeof paymentTerminal;
};

const abi = [{
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

export function usePayJuiceboxProject(inputs: PayJuiceboxProjectInputs) {
  const valueInWei = parseEther(inputs.value.toString());

  const writeContractData = {
    address: paymentTerminal[inputs.network || "mainnet"],
    abi,
    functionName: 'pay',
    args: [
      BigInt(inputs.projectId),
      valueInWei,
      ETH_TOKEN_ADDRESS,
      inputs.callerAddress,
      BigInt(DEFAULT_MIN_RETURNED_TOKENS),
      DEFAULT_PREFER_CLAIMED_TOKENS,
      inputs.memo || "",
      DEFAULT_DELEGATE_METADATA,
    ],
    value: valueInWei,
  } as const;

  const { data: simulateData, error: simulateError } = useSimulateContract(writeContractData);

  const { writeContractAsync, data, error, isPending } = useWriteContract();

  const pay = async () => {
    if (!simulateData) return;
    return await writeContractAsync(simulateData.request);
  }

  return { 
    pay,
    data, 
    error: error || simulateError, 
    isPending 
  };
}