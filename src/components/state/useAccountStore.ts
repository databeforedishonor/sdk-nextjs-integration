"use client";
import { create } from "zustand";
import { useNetworkStore } from "./useNetworkStore";
import { getName } from "@vechain.energy/dapp-kit-hooks";
import { picasso } from "@vechain/picasso";

interface AccountState {
  account: string | null;
  walletName: string | null;
  walletText: string | null;
  picasso: any;
  setAccount: (account: string | null) => void;
  setWalletName: (walletName: string | null) => void;
  getPicasso: () => any;
  fetchUserData: () => void;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  account: null,
  walletName: null,
  walletText: "Connect Wallet",
  picasso: null,

  setAccount: (account) =>
    set((state) => ({
      account,
      walletName: account ? state.walletName : null,
      walletText: account ? state.walletText : "Connect Wallet",
      picasso: account ? state.picasso : null,
    })),

  setWalletName: (walletName) => set({ walletName }),


  getPicasso: () => {
    const { connex } = useNetworkStore.getState();
    const { account, picasso } = get();
    return account && connex ? picasso : null;
  },

  fetchUserData: async () => {
    const { account } = get();
    const { connex } = useNetworkStore.getState();
    await fetchUserData(account, null, connex, set);
  },
}));

export async function fetchUserData(account: string | null, tokens: any, connex: any, set: (state: any) => void) {
    if (account && connex) {
        try {
            const name = await getName(account, connex);
            const picassoInstance = picasso(account);
            const walletText = name
                ? name
                : `${account.slice(0, 6)}...${account.slice(-4)}`;
            set({ walletName: name, picasso: picassoInstance, walletText });
        } catch {
            set({ walletName: "", walletText: "Connect Wallet" });
        }
    } else {
        set({
            account: null,
            walletName: null,
            picasso: null,
            walletText: "Connect Wallet",
        });
    }
}
