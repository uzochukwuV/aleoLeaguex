'use client';

import React, { useMemo } from 'react';
import {
  WalletProvider as AeoWalletProvider,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-react';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(() => [new LeoWalletAdapter()], []);

  return (
    <AeoWalletProvider
      wallets={wallets}
      autoConnect={true}
      network={WalletAdapterNetwork.Testnet}
    >
      {children}
    </AeoWalletProvider>
  );
}
