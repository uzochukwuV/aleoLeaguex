'use client';

import { useState } from 'react';
import { Clock, Volume2 } from 'lucide-react';
import { useBetSlip } from '@/hooks/use-bet-slip';
import type { Match } from '@/lib/types';

export function MatchCard({ match }: { match: Match }) {
  const { addBet } = useBetSlip();
  const [hoveredBet, setHoveredBet] = useState<string | null>(null);

  const formattedTime = `${Math.floor(match.timeUntilKickoff / 60)}m`;
  const homeTeamCode = match.homeTeam.substring(0, 3).toUpperCase();
  const awayTeamCode = match.awayTeam.substring(0, 3).toUpperCase();

  const betOptions = [
    { label: '1', key: 'homeWin', odds: match.odds.homeWin, type: 'HOME' },
    { label: 'X', key: 'draw', odds: match.odds.draw, type: 'DRAW' },
    { label: '2', key: 'awayWin', odds: match.odds.awayWin, type: 'AWAY' },
  ];

  const handleBetClick = (betType: string, odds: number) => {
    addBet({
      matchId: match.id,
      matchDescription: `${match.homeTeam} vs ${match.awayTeam}`,
      betType,
      odds,
    });
  };

  return (
    <div className="match-card">
      <div className="space-y-4">
        {/* Match Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            {formattedTime}
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
            Round {match.round}
          </span>
        </div>

        {/* Match Body - Teams and Odds */}
        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="team-badge">{homeTeamCode}</div>
                <span className="text-sm font-medium text-foreground group-hover:text-indigo-300 transition-colors">
                  {match.homeTeam}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Strength: {match.homeStrength}</div>
            </div>
          </div>

          {/* Odds Row */}
          <div className="grid grid-cols-3 gap-2">
            {betOptions.map(option => (
              <button
                key={option.key}
                onMouseEnter={() => setHoveredBet(option.key)}
                onMouseLeave={() => setHoveredBet(null)}
                onClick={() => handleBetClick(option.type, option.odds)}
                className={`relative px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  hoveredBet === option.key
                    ? 'bg-indigo-500/50 text-white scale-105'
                    : 'bg-white/5 text-foreground hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>{option.label}</span>
                  <span className="text-xs">{option.odds.toFixed(2)}</span>
                </div>
                {hoveredBet === option.key && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/20 via-transparent to-indigo-500/20 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="team-badge">{awayTeamCode}</div>
                <span className="text-sm font-medium text-foreground group-hover:text-indigo-300 transition-colors">
                  {match.awayTeam}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Strength: {match.awayStrength}</div>
            </div>
          </div>
        </div>

        {/* Match Stats Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-muted-foreground">
          <span>Volume: {match.volume.toLocaleString()} LEAGUE</span>
          <button className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            <Volume2 className="w-3 h-3" />
            Stats
          </button>
        </div>
      </div>
    </div>
  );
}
