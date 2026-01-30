'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface OddsTicker {
  matchId: string;
  homeWin: { odds: number; change: number };
  draw: { odds: number; change: number };
  awayWin: { odds: number; change: number };
}

export function LiveOddsTicker({ matchId }: { matchId: string }) {
  const [tickers, setTickers] = useState<OddsTicker[]>([]);
  const [selectedTicker, setSelectedTicker] = useState(0);

  useEffect(() => {
    // Simulate live odds updates
    const interval = setInterval(() => {
      setTickers(prev => [
        {
          matchId,
          homeWin: { odds: 1.95 + (Math.random() - 0.5) * 0.1, change: Math.random() - 0.5 },
          draw: { odds: 3.40 + (Math.random() - 0.5) * 0.15, change: Math.random() - 0.5 },
          awayWin: { odds: 3.80 + (Math.random() - 0.5) * 0.2, change: Math.random() - 0.5 },
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [matchId]);

  if (tickers.length === 0) return null;

  const ticker = tickers[0];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {[
        { label: '1', odds: ticker.homeWin },
        { label: 'X', odds: ticker.draw },
        { label: '2', odds: ticker.awayWin },
      ].map((bet, idx) => (
        <div
          key={idx}
          className="glass-effect px-3 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap text-xs"
        >
          <span className="font-bold text-foreground">{bet.label}</span>
          <span className="text-indigo-300 font-semibold">{bet.odds.odds.toFixed(2)}</span>
          {bet.odds.change > 0 ? (
            <TrendingUp className="w-3 h-3 text-green-400" />
          ) : bet.odds.change < 0 ? (
            <TrendingDown className="w-3 h-3 text-red-400" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
