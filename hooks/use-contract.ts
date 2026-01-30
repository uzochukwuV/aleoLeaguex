'use client';

import { useCallback, useState } from 'react';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import {
  buildPlaceBetTransaction,
  buildClaimWinningsTransaction,
  monitorTransactionStatus,
  type PlaceBetParams,
  type ClaimWinningsParams,
} from '@/lib/contract-service';

export function useContract() {
  const { publicKey, requestTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastTxId, setLastTxId] = useState<string | null>(null);

  const placeBet = useCallback(
    async (params: PlaceBetParams): Promise<string> => {
      if (!publicKey) throw new Error('Wallet not connected');
      if (!requestTransaction) throw new Error('Wallet does not support transactions');

      setLoading(true);
      setError(null);

      try {
        const transaction = buildPlaceBetTransaction(publicKey.toString(), params);
        const txId = await requestTransaction(transaction);
        
        setLastTxId(txId);

        // Monitor transaction
        await monitorTransactionStatus(txId, (status) => {
          console.log('[useContract] Transaction status:', status);
        });

        return txId;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to place bet';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [publicKey, requestTransaction]
  );

  const claimWinnings = useCallback(
    async (params: ClaimWinningsParams): Promise<string> => {
      if (!publicKey) throw new Error('Wallet not connected');
      if (!requestTransaction) throw new Error('Wallet does not support transactions');

      setLoading(true);
      setError(null);

      try {
        const transaction = buildClaimWinningsTransaction(publicKey.toString(), params);
        const txId = await requestTransaction(transaction);
        
        setLastTxId(txId);

        // Monitor transaction
        await monitorTransactionStatus(txId, (status) => {
          console.log('[useContract] Transaction status:', status);
        });

        return txId;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to claim winnings';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [publicKey, requestTransaction]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    placeBet,
    claimWinnings,
    loading,
    error,
    lastTxId,
    clearError,
  };
}
