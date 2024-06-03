'use client';

import { useState, useEffect } from 'react';

import { unitsUtils } from '@vechain/sdk-core';
import { useNetworkStore } from '@/components/state/useNetworkStore';
import ConnectWalletButton from '@/components/ui/connectWalletButton';
import { useAccountStore } from '@/components/state/useAccountStore';
import NFTHoldings from '@/components/nftHoldings';




export default function Home(): JSX.Element {


    return (
        <main className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                         <div className="absolute top-4 right-4">
                <ConnectWalletButton />
            </div>
            <NFTHoldings />
    
        </main>
    );
}
