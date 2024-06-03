import { useState, useEffect } from "react";
import { ClauseBundle } from "@/components/clauseBuilder/clauseBuilder";
import {
  getTokenBalanceOf,
  getTokenIds,

  getContractName,
} from "@/components/utils/getTokenIds";
import { executeBundle } from "@/components/clauseBuilder/clauseBuilder";

interface NFTHolding {
  contractName: string;
  contractAddress: string;
  tokenId: string;
}

export function useFetchNftHoldings(
  account: string | null,
  currentContractAddress: string
) {
  const [nftHoldings, setNftHoldings] = useState<NFTHolding[]>([]);

  useEffect(() => {
    async function fetchNFTHoldings() {
      if (!account || !currentContractAddress) return;
      try {
        const bundle = new ClauseBundle();

        // Get the balance of NFTs
        await getContractName(currentContractAddress, bundle);
        await getTokenBalanceOf(currentContractAddress, account, bundle);
        const ContractInfo = await executeBundle(bundle);
        const contractName = ContractInfo[0];
        const balance = parseInt(ContractInfo[1], 10);
        bundle.clearBundle();

        // Get the token IDs
        const indices = Array.from({ length: balance }, (_, i) => i);
        await getTokenIds(currentContractAddress, account, indices, bundle);
        const tokenIdsResult = await executeBundle(bundle);

        // Extract token IDs from the nested arrays and convert to strings
        const tokenIds = tokenIdsResult.map((result: any) =>
          result[0].toString()
        );

        // Assuming tokenIds is an array of token IDs
        const holdings = tokenIds.map((tokenId: string) => ({
          contractName,
          contractAddress: currentContractAddress,
          tokenId,
        }));

        setNftHoldings(holdings);
      } catch (error) {
        console.error("Error fetching NFT holdings:", error);
      }
    }

    fetchNFTHoldings();
  }, [account, currentContractAddress]);

  return nftHoldings;
}