import { useState } from "react";
import { useAccountStore } from "@/components/state/useAccountStore";
import { useFetchNftHoldings } from "@/components/hooks/fetchNftHoldings";
import FetchNFTContracts from "@/components/hooks/fetchNftContracts";
import Modal from "@/components/ui/Modal"; // Assuming you have a Modal component
import { ClauseBundle } from "@/components/clauseBuilder/clauseBuilder";
import { executeTransaction } from "@/components/clauseBuilder/clauseBuilder";


export default function NFTHoldings(): JSX.Element {
  const { account } = useAccountStore();

  const [selectedHoldings, setSelectedHoldings] = useState<
    { contractAddress: string; tokenId: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendToAddress, setSendToAddress] = useState("");
  const [currentContractAddress, setCurrentContractAddress] = useState("0x148442103eeadfaf8cffd593db80dcdeadda71c9");
  const [nftContractAddresses, setNftContractAddresses] = useState<string[]>([]);

  const nftHoldings = useFetchNftHoldings(account ?? "", currentContractAddress);

  const handleCheckboxChange = (contractAddress: string, tokenId: string) => {
    setSelectedHoldings((prevSelected) => {
      const isSelected = prevSelected.some(
        (holding) =>
          holding.contractAddress === contractAddress &&
          holding.tokenId === tokenId
      );
      if (isSelected) {
        return prevSelected.filter(
          (holding) =>
            holding.contractAddress !== contractAddress ||
            holding.tokenId !== tokenId
        );
      } else {
        return [...prevSelected, { contractAddress, tokenId }];
      }
    });
  };

  const handleTransferClick = () => {
    setIsModalOpen(true);
  };

  const handleTransfer = async () => {
    const bundle = new ClauseBundle();

    selectedHoldings.forEach((holding) => {
      bundle.addTransactionClause(
        holding.contractAddress,
        "0",
        "transferFrom",
        [account, sendToAddress, holding.tokenId],
        "Transferring NFT"
      );
    });

    try {
      await executeTransaction(bundle, "Transferring NFTs");
      setIsModalOpen(false);
      setSelectedHoldings([]);
      setSendToAddress("");
    } catch (error) {
      console.error("Error executing transfer:", error);
    }
  };

  const handleContractChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentContractAddress(event.target.value);
  };

  return (
    <div className="table-container mx-auto max-w-4xl overflow-x-auto">
      <FetchNFTContracts
        account={account ?? ""}
        setNftContractAddresses={setNftContractAddresses}
        setCurrentContractAddress={setCurrentContractAddress}
      />
      <div className="mb-4 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleTransferClick}
        >
          Transfer
        </button>
   
        <select
          className="px-4 py-2 border rounded"
          value={currentContractAddress}
          onChange={handleContractChange}
        >
          {nftContractAddresses.map((address, index) => (
            <option key={index} value={address}>
              {address}
            </option>
          ))}
        </select>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Contract Address</th>
            <th className="px-4 py-2">Contract Name</th>
            <th className="px-4 py-2">Token ID</th>
            <th className="px-4 py-2">Select</th>
          </tr>
        </thead>
        <tbody>
          {nftHoldings.map((holding, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{holding.contractAddress}</td>
              <td className="px-4 py-2">{holding.contractName}</td>
              <td className="px-4 py-2">{holding.tokenId}</td>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedHoldings.some(
                    (selected) =>
                      selected.contractAddress === holding.contractAddress &&
                      selected.tokenId === holding.tokenId
                  )}
                  onChange={() =>
                    handleCheckboxChange(
                      holding.contractAddress,
                      holding.tokenId
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl mb-4">Transfer NFTs</h2>
            <div className="mb-4">
              <label className="block mb-2">Send to Address:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={sendToAddress}
                onChange={(e) => setSendToAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg mb-2">Selected NFTs:</h3>
              <ul>
                {selectedHoldings.map((holding, index) => (
                  <li key={index}>
                    {holding.contractAddress} - {holding.tokenId}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleTransfer}
            >
              Transfer
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
