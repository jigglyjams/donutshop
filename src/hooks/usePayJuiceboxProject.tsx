import {
  useSimulateContract,
  useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { abi } from "@/lib/juicebox";

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
  memo?: string;
  network?: keyof typeof paymentTerminal;
};

export function usePayJuiceboxProject(inputs: PayJuiceboxProjectInputs) {
  const valueInWei = parseEther(inputs.value.toString());

  const writeContractData = {
    address: paymentTerminal[inputs.network || "mainnet"],
    abi,
    functionName: "pay",
    args: [
      BigInt(inputs.projectId),
      valueInWei,
      ETH_TOKEN_ADDRESS,
      inputs.callerAddress,
      BigInt(DEFAULT_MIN_RETURNED_TOKENS),
      DEFAULT_PREFER_CLAIMED_TOKENS,
      inputs.memo || "",
      DEFAULT_DELEGATE_METADATA
    ],
    value: valueInWei,
  } as const;

  const { data: simulateData, error: simulateError } = useSimulateContract(writeContractData);

  const { writeContractAsync, data, error, isPending } = useWriteContract();

  const pay = async () => {
    if (!simulateData) return;
    if (!inputs.memo) {
      throw new Error("Memo is required to pay a Juicebox project");
    }
    return await writeContractAsync(writeContractData);
  }

  return { 
    pay,
    data, 
    error: error || simulateError, 
    isPending 
  };
}
