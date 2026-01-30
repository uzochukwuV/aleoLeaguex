'use client';

import { useState } from 'react';
import { Zap, Gift, Target } from 'lucide-react';
import { useBetSlip } from '@/hooks/use-bet-slip';

interface ParlayTier {
  tier: number;
  minBets: number;
  multiplier: number;
  reward: number;
}

const PARLAY_TIERS: ParlayTier[] = [
  { tier: 1, minBets: 2, multiplier: 1.0, reward: 0 },
  { tier: 2, minBets: 3, multiplier: 1.15, reward: 50 },
  { tier: 3, minBets: 4, multiplier: 1.35, reward: 150 },
  { tier: 4, minBets: 5, multiplier: 1.60, reward: 400 },
];

export function ParlayBuilder() {
  const { bets } = useBetSlip();
  const [selectedTier, setSelectedTier] = useState<number>(0);

  const currentTier = PARLAY_TIERS.find(t => bets.length >= t.minBets) || PARLAY_TIERS[0];
  const nextTier = PARLAY_TIERS[PARLAY_TIERS.indexOf(currentTier) + 1];
  const baseOdds = bets.reduce((acc, b) => acc * b.odds, 1);
  const boostedOdds = baseOdds * currentTier.multiplier;

  return (
    <div className="glass-effect p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold text-foreground">Parlay Boost</h3>
      </div>

      {bets.length < 2 ? (
        <div className="text-center py-4 text-muted-foreground text-sm">
          <p>Add 2+ bets to unlock parlay boost</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Current Tier */}
          <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-300">TIER {PARLAY_TIERS.indexOf(currentTier) + 1}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/30 text-indigo-200">
                {currentTier.multiplier.toFixed(2)}x Boost
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {bets.length} bets selected
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground">Base Odds:</span>
              <span className="font-semibold text-indigo-300">{baseOdds.toFixed(2)}x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground">Boosted Odds:</span>
              <span className="font-bold text-green-400">{boostedOdds.toFixed(2)}x</span>
            </div>
          </div>

          {/* Next Tier Progress */}
          {nextTier && (
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">NEXT TIER</span>
                <span className="text-xs text-amber-400">+{nextTier.reward} LEAGUE</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Add {nextTier.minBets - bets.length} more bet{nextTier.minBets - bets.length !== 1 ? 's' : ''} for {nextTier.multiplier.toFixed(2)}x boost
              </p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(bets.length / nextTier.minBets) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Reward Display */}
          {currentTier.reward > 0 && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 flex items-center gap-2">
              <Gift className="w-4 h-4 text-green-400" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-green-300">Tier Reward</p>
                <p className="text-xs text-green-300/70">{currentTier.reward} LEAGUE bonus</p>
              </div>
              <span className="font-bold text-green-400">+{currentTier.reward}</span>
            </div>
          )}

          {/* Tips */}
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-muted-foreground space-y-1">
            <div className="flex items-start gap-2">
              <Target className="w-3 h-3 mt-0.5 flex-shrink-0 text-indigo-400" />
              <span>Combine different match outcomes for higher multipliers</span>
            </div>
            <div className="flex items-start gap-2">
              <Target className="w-3 h-3 mt-0.5 flex-shrink-0 text-indigo-400" />
              <span>5-bet parlays can reach up to 2.5x boost</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
