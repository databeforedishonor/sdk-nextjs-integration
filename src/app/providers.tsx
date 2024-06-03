"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { WalletConnectOptions } from "@vechain/dapp-kit";
import dynamic from "next/dynamic";
import { StoreProvider } from "@/components/state/storeProvider";
import { useNetworkStore } from "@/components/state/useNetworkStore";

const DAppKitProvider = dynamic(
  () => import("@vechain/dapp-kit-react").then((mod) => mod.DAppKitProvider),
  { ssr: false }
);

const walletConnectOptions: WalletConnectOptions = {
  projectId: "a0b855ceaf109dbc8426479a4c3d38d8",
  metadata: {
    name: "Sample VeChain dApp",
    description: "A sample VeChain dApp",
    url: typeof window !== "undefined" ? window.location.origin : "",
    icons: [
      typeof window !== "undefined"
        ? `${window.location.origin}/images/logo/my-dapp.png`
        : "",
    ],
  },
};

export interface ProvidersProps {
  children: React.ReactNode;

}
export function Providers({ children }: ProvidersProps) {
  const { nodeUrl } = useNetworkStore();
  return (
    <DAppKitProvider
      genesis={"main"}
      logLevel="DEBUG"
      nodeUrl={nodeUrl}
      usePersistence={true}
      walletConnectOptions={walletConnectOptions}
    >
      <StoreProvider>
       
          {children}
      
      </StoreProvider>
    </DAppKitProvider>
  );
}
