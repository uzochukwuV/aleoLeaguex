'use client';

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { Wallet, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WalletStatus() {
  const { connected, publicKey } = useWallet();
  const [displayAddress, setDisplayAddress] = useState<string>('');

  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toString();
      setDisplayAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`);
    }
  }, [publicKey]);

  return (
    <div className="glass-effect px-4 py-2 rounded-lg flex items-center gap-3">
      {connected ? (
        <>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-green-300">Connected</p>
            {displayAddress && (
              <p className="text-xs text-muted-foreground font-mono">{displayAddress}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-amber-300">Disconnected</p>
            <p className="text-xs text-muted-foreground">Connect wallet to bet</p>
          </div>
        </>
      )}
    </div>
  );
}
