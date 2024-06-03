"use client";
import { create } from "zustand";
import { ThorClient } from "@vechain/sdk-network";

interface NetworkState {
  nodeUrl: string;
  network: string;
  connex: any;
  thorClient: ThorClient | null;
  block: any;
  wait: boolean;
  setBlock: (block: any) => void;
  setWait: (wait: boolean) => void;
  setNodeUrl: (nodeUrl: string) => void;
  setNetwork: (network: string) => void;
  setConnex: (connex: any) => void;
  setThorClient: (thorClient: ThorClient | null) => void;
  fetchBlockData: () => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  block: null,
  holdings: null,
  wait: false,
  nodeUrl: "https://mainnet.veblocks.net",
  network: "main",
  connex: null,
  thorClient: null,
  setBlock: (block) => set({ block }),
  setWait: (wait) => set({ wait }),
  setNodeUrl: (nodeUrl) => set({ nodeUrl }),
  setNetwork: (network) => set({ network }),
  setConnex: (connex) => set({ connex }),
  setThorClient: (thorClient) => set({ thorClient }),

  fetchBlockData: async () => {
    const { connex } = useNetworkStore.getState();
    if (connex) {
      const ticker = connex.thor.ticker();
      try {
        const head = await ticker.next();
        set({ block: head, wait: true });
      } catch (error) {
        console.error("Failed to fetch ticker update:", error);
      }
    }
  },
}));