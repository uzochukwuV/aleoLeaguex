'use client';

import { useState } from 'react';
import { X, Trash2, Plus, Minus, Loader } from 'lucide-react';
import { useBetSlip } from '@/hooks/use-bet-slip';
import { useContract } from '@/hooks/use-contract';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { ParlayBuilder } from './parlay-builder';
import { toast } from 'sonner';

export function BetSlipPanel({ onClose }: { onClose: () => void }) {
  const { bets, removeBet, updateStake, clearBets } = useBetSlip();
  const { placeBet, loading, error, clearError } = useContract();
  const { connected } = useWallet();
  const [stake, setStake] = useState<number>(10);
  const [selectedBets, setSelectedBets] = useState<Set<string>>(new Set());

  const handlePlaceBet = async () => {
    try {
      clearError();
      const selectedBetArray = bets.filter(b => selectedBets.has(b.matchId));
      
      const txId = await placeBet({
        seasonId: 1,
        roundNumber: 1,
        matchIds: selectedBetArray.map(b => b.matchId),
        betTypes: selectedBetArray.map(b => b.betType === 'HOME' ? 1 : b.betType === 'DRAW' ? 2 : 3),
        numBets: selectedBetArray.length,
        totalStake: stake,
        hasBadge: false,
      });

      toast.success(`Bet placed! Transaction: ${txId.substring(0, 8)}...`);
      clearBets();
      setSelectedBets(new Set());
      setStake(10);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to place bet');
    }
  };

  // Calculate parlay multiplier
  const selectedCount = selectedBets.size;
  const parlayMultiplier = selectedCount > 1 
    ? bets
        .filter(b => selectedBets.has(b.matchId))
        .reduce((acc, b) => acc * b.odds, 1)
    : 1;

  // Calculate total odds for selected bets
  const totalOdds = selectedCount > 0 ? parlayMultiplier : 0;
  const potentialWinnings = stake * totalOdds;

  const toggleBet = (matchId: string) => {
    const newSelected = new Set(selectedBets);
    if (newSelected.has(matchId)) {
      newSelected.delete(matchId);
    } else {
      newSelected.add(matchId);
    }
    setSelectedBets(newSelected);
  };

  return (
    <div className="glass-effect p-4 space-y-4 slide-in-from-bottom">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Bet Slip</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {bets.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No bets selected</p>
          <p className="text-xs mt-1">Click odds to add bets</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Selected Bets */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {bets.map(bet => (
              <div
                key={bet.matchId}
                onClick={() => toggleBet(bet.matchId)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                  selectedBets.has(bet.matchId)
                    ? 'bg-indigo-500/20 border-indigo-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {bet.matchDescription}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {bet.betType} @ {bet.odds.toFixed(2)}x
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeBet(bet.matchId);
                      selectedBets.delete(bet.matchId);
                    }}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Parlay Builder */}
          {selectedCount > 0 && <ParlayBuilder />}

          {selectedCount > 1 && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-purple-300">PARLAY MULTIPLIER</span>
                <span className="text-lg font-bold text-purple-300">{parlayMultiplier.toFixed(2)}x</span>
              </div>
              <p className="text-xs text-muted-foreground">{selectedCount} bets selected</p>
            </div>
          )}

          {/* Stake Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-muted-foreground">STAKE (LEAGUE)</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStake(Math.max(1, stake - 10))}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                value={stake}
                onChange={(e) => setStake(Math.max(1, parseInt(e.target.value) || 0))}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm font-semibold text-center text-white focus:outline-none focus:border-indigo-500/50"
              />
              <button
                onClick={() => setStake(stake + 10)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stake Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[10, 25, 50, 100].map(amount => (
              <button
                key={amount}
                onClick={() => setStake(amount)}
                className={`py-1 rounded-lg text-xs font-semibold transition-all ${
                  stake === amount
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white/5 text-foreground hover:bg-white/10'
                }`}
              >
                {amount}
              </button>
            ))}
          </div>

          {/* Odds Summary */}
          <div className="space-y-2 p-3 rounded-lg bg-white/5 border border-white/10">
            {selectedCount > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Odds:</span>
                  <span className="font-semibold text-indigo-300">{totalOdds.toFixed(2)}x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Potential Win:</span>
                  <span className="font-bold text-green-400">
                    {potentialWinnings.toFixed(2)} LEAGUE
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-xs text-red-400">{error}</p>
              <button
                onClick={clearError}
                className="text-xs text-red-400 hover:text-red-300 mt-1"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handlePlaceBet}
              disabled={!connected || selectedCount === 0 || loading}
              className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 button-glow flex items-center justify-center gap-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {loading ? 'Processing...' : 'Place Bet'}
            </button>
            <button
              onClick={clearBets}
              disabled={loading}
              className="w-full py-2 rounded-lg font-medium text-muted-foreground bg-white/5 hover:bg-white/10 transition-colors text-sm disabled:opacity-50"
            >
              Clear All
            </button>
          </div>

          {!connected && (
            <p className="text-xs text-amber-400 text-center">
              Connect wallet to place bets
            </p>
          )}
        </div>
      )}
    </div>
  );
}
