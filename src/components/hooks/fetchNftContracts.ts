import { useEffect } from "react";

interface FetchNFTContractsProps {
  account: string;
  setNftContractAddresses: (addresses: string[]) => void;
  setCurrentContractAddress: (address: string) => void;
}

export default function FetchNFTContracts({
  account,
  setNftContractAddresses,
  setCurrentContractAddress,
}: FetchNFTContractsProps): null {
  useEffect(() => {
    async function fetchNFTContracts() {
      if (!account) return;
      try {
        const response = await fetch(
          "https://api.github.com/repos/vechain/nft-registry/contents/tokens/main"
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();

        const contractAddresses = data.map(
          (item: { name: string }) => item.name
        );
        console.log(contractAddresses);
        setNftContractAddresses(contractAddresses);
        setCurrentContractAddress(contractAddresses[0] || "");
      } catch (error) {
        console.error("Error fetching NFT contracts:", error);
        alert("Failed to fetch NFT contracts. Please try again later.");
      }
    }

    fetchNFTContracts();
  }, [account, setNftContractAddresses, setCurrentContractAddress]);

  return null;
}