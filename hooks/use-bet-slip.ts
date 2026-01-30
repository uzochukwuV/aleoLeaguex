'use client';

import { useState } from 'react';
import type { BetSlipItem } from '@/lib/types';

export function useBetSlip() {
  const [bets, setBets] = useState<BetSlipItem[]>([]);

  const addBet = (bet: Omit<BetSlipItem, 'id'>) => {
    const newBet: BetSlipItem = {
      ...bet,
      id: `${bet.matchId}-${Date.now()}`,
    };
    
    // Avoid duplicate bets on same match
    const filtered = bets.filter(b => b.matchId !== bet.matchId);
    setBets([...filtered, newBet]);
  };

  const removeBet = (matchId: string) => {
    setBets(bets.filter(b => b.matchId !== matchId));
  };

  const updateStake = (matchId: string, stake: number) => {
    setBets(
      bets.map(b =>
        b.matchId === matchId ? { ...b, stake } : b
      )
    );
  };

  const clearBets = () => {
    setBets([]);
  };

  return {
    bets,
    addBet,
    removeBet,
    updateStake,
    clearBets,
  };
}
