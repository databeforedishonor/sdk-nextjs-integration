"use client";
import React, { useEffect } from "react";
import { useConnex } from "@vechain/dapp-kit-react";
import { useWallet } from "@vechain/dapp-kit-react";
import { useAccountStore } from "./useAccountStore";
import { useNetworkStore } from "./useNetworkStore";
import { ThorClient } from "@vechain/sdk-network";


export const StoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const connex = useConnex();
  const { account } = useWallet();
  const { setConnex, fetchBlockData, setThorClient,nodeUrl } = useNetworkStore();
  const { setAccount, fetchUserData } = useAccountStore();

  useEffect(() => {
    const thorClient = ThorClient.fromUrl(nodeUrl);
    setConnex(connex);
    setThorClient(thorClient);
  }, [connex]);

  useEffect(() => {
    fetchBlockData();
    const intervalId = setInterval(fetchBlockData, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchBlockData]);

  useEffect(() => {
    setAccount(account);
    fetchUserData();
  }, [account]);

  return <>{children}</>;
};