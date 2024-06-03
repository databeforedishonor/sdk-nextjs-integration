import { ClauseBundle } from "@/components/clauseBuilder/clauseBuilder";

export async function getTokenBalanceOf(
    nftContractAddress: string,
    owner: string,
    bundle: ClauseBundle
  ): Promise<ClauseBundle> {
    const contractAddress = nftContractAddress;
    const functionName = "balanceOf";
    // Map through indices and add them to the clause builder
    bundle.addCallClause(contractAddress, functionName, [owner]);
    return bundle;
  }

  export async function getContractName(
    nftContractAddress: string,
    bundle: ClauseBundle
  ): Promise<ClauseBundle> {
    const contractAddress = nftContractAddress;
    const functionName = "name";
    // Map through indices and add them to the clause builder
    bundle.addCallClause(contractAddress, functionName, []);
    return bundle;
  }


  export async function getTokenIds(
    nftContractAddress: string,
    owner: string,
    indices: number[],
    bundle: ClauseBundle
  ): Promise<ClauseBundle> {
    const contractAddress = nftContractAddress;
    const functionName = "tokenOfOwnerByIndex";
    // Map through indices and add them to the clause builder
    indices.forEach((index) => {
      const functionArgs = [owner, index];
      bundle.addCallClause(contractAddress, functionName, functionArgs);
    });
  
    return bundle;
  }

