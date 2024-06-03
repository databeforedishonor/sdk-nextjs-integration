import { contractABI } from "./abi";
import { useAccountStore } from "@/components/state/useAccountStore";
import { useNetworkStore } from "@/components/state/useNetworkStore";
import { ContractClause } from "@vechain/sdk-network";
import {
  FunctionFragment,
  clauseBuilder,
  TransactionClause,
  coder,
} from "@vechain/sdk-core";

export type ClauseType = ContractClause | TransactionClause;

export interface Clause {
  to: string;
  value: string;
  functionName: string;
  functionArgs: any[];
  comment?: string;
}

export class ClauseBundle {
  clauses: ClauseType[];
  private abi: any;
  private signer: string | null;
  private delegate: string | null;

  constructor() {
    this.clauses = [];
    this.abi = contractABI; // Default ABI
    this.signer = useAccountStore.getState().account || null;
    this.delegate = null;
  }

  setAbi(abi: any): void {
    this.abi = abi;
  }
  // Sets the signer for the bundle
  setSigner(signer: string): void {
    this.signer = signer;
  }

  // Sets the delegate for the bundle
  setDelegate(delegate: string): void {
    this.delegate = delegate;
  }
  

  // Adds a clause and its corresponding function name to the bundle
  addCallClause(
    to: string,
    functionName: string,
    functionArgs: any[],
     ): void {
    const thorClient = useNetworkStore.getState().thorClient;

    const contract = thorClient?.contracts.load(to, this.abi);

    const clauseObject = contract?.clause[functionName](...functionArgs);

    this.clauses.push(clauseObject as ContractClause);
  }

  addTransactionClause(
    to: string,
    value: string,
    functionName: string,
    functionArgs: any[],
    comment: string
  ): void {
    const interfaceAbi = coder.createInterface(this.abi);
    const functionFragment = interfaceAbi.getFunction(
      functionName
    ) as FunctionFragment;
    const clause = clauseBuilder.functionInteraction(
      to,
      functionFragment,
      functionArgs,
      Number(value)
    );

    this.clauses.push(clause as TransactionClause);

    if (comment) {
      this.logAction("addTransactionClause", {
        to,
        value,
        functionName,
        functionArgs,
        comment,
      });
    }
  }

  // Clears all clauses and function names from the bundle
  clearBundle(): void {
    this.clauses = [];
    this.logAction("clearBundle");
  }

  // Removes a specific clause and its corresponding function name from the bundle
  removeItemFromBundle(index: number): void {
    if (index >= 0 && index < this.clauses.length) {
      const removedClause = this.clauses.splice(index, 1);
      this.logAction("removeItemFromBundle", removedClause);
    } else {
      console.error(
        "Index out of bounds when trying to remove item from bundle."
      );
    }
  }

  // Sends bundled clauses to the blockchain
  async call(): Promise<any> {
    console.log("clauses:", this.clauses);
    const thorClient = useNetworkStore.getState().thorClient;
    try {
      const output = await thorClient?.contracts.executeMultipleClausesCall(
        this.clauses as any
      );
      console.log("Results from call ", output);
      return output;
    } catch (error) {
      console.error("Error executing clauses:", error);
      return "0"; // Return 0 in case of an error
    }
  }

  // Signs the transaction using Connex
  async signTransaction(comment: string): Promise<void> {
    try {
      const { connex } = useNetworkStore.getState();
      const signingService = connex.vendor.sign("tx", this.clauses);
      signingService.signer(this.signer || "");
      signingService.comment(comment);
        if (this.delegate) {
            signingService.delegate(this.delegate);
        }
      const result = await signingService.request();
      console.log(result);
    } catch (error) {
      console.error("Error signing transaction:", error);
    }
  }

  // Logs actions for debugging puroses
  private logAction(action: string, data?: any): void {
    console.log(`Action: ${action}`, data);
  }
}
export async function executeBundle(bundle: ClauseBundle): Promise<any[]> {
    try {
      const results = await bundle.call();
      return results;
    } catch (error) {
      console.error('Error executing bundle:', error);
      throw error;
    }
  }
  
  
  export async function executeTransaction(bundle: ClauseBundle, comment: string): Promise<void> {
      try {
          await bundle.signTransaction(comment);
      } catch (error) {
        console.error('Error executing transaction:', error);
        throw error;
      }
    }
    