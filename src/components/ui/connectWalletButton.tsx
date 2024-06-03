"use client";
import React from 'react';
import { useWalletModal } from '@vechain/dapp-kit-react';
import { useAccountStore } from '@/components/state/useAccountStore';

const ConnectWalletButton = (): React.ReactElement => {
    const { account, walletText, picasso } = useAccountStore();
    const { open } = useWalletModal();

    return (
        <button id="userButton" className="flex items-center focus:outline-none mr-3 text-2xl" onClick={open}>
            {account && (
                <img className="w-8 h-8 rounded-full mr-4" src={"data:image/svg+xml;utf8," + picasso} alt="Custom SVG" />
            )}
            <span className="text-black">{walletText}</span>
        </button>
    );
}

export default ConnectWalletButton;
