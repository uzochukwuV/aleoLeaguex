'use client';

import { useState } from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { MatchCard } from './match-card';
import { mockMatches } from '@/lib/mock-data';

function BettingMarketsComponent() {
  const [sortBy, setSortBy] = useState<'time' | 'odds'>('time');
  const [filterTeam, setFilterTeam] = useState<string>('all');

  const matches = mockMatches;

  const filteredMatches = filterTeam === 'all' 
    ? matches 
    : matches.filter(m => m.homeTeam === filterTeam || m.awayTeam === filterTeam);

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === 'time') {
      return a.timeUntilKickoff - b.timeUntilKickoff;
    }
    return Math.max(a.odds.homeWin, a.odds.draw, a.odds.awayWin) - 
           Math.max(b.odds.homeWin, b.odds.draw, b.odds.awayWin);
  });

  const allTeams = Array.from(new Set(matches.flatMap(m => [m.homeTeam, m.awayTeam]))).sort();

  return (
    <div className="space-y-6">
      {/* Filter and Sort Controls */}
      <div className="glass-effect p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSortBy('time')}
              className={`px-3 py-1 rounded-lg text-sm flex items-center gap-2 transition-all ${
                sortBy === 'time'
                  ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                  : 'bg-white/5 text-foreground hover:bg-white/10'
              }`}
            >
              <Clock className="w-4 h-4" />
              Soonest
            </button>
            <button
              onClick={() => setSortBy('odds')}
              className={`px-3 py-1 rounded-lg text-sm flex items-center gap-2 transition-all ${
                sortBy === 'odds'
                  ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                  : 'bg-white/5 text-foreground hover:bg-white/10'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Best Odds
            </button>
          </div>

          <div className="text-sm text-muted-foreground">
            {sortedMatches.length} matches available
          </div>
        </div>

        {/* Team Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterTeam('all')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
              filterTeam === 'all'
                ? 'bg-green-500/30 text-green-300 border border-green-500/50'
                : 'bg-white/5 text-foreground hover:bg-white/10'
            }`}
          >
            All Teams
          </button>
          {allTeams.map(team => (
            <button
              key={team}
              onClick={() => setFilterTeam(team)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                filterTeam === team
                  ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                  : 'bg-white/5 text-foreground hover:bg-white/10'
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 gap-4">
        {sortedMatches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {sortedMatches.length === 0 && (
        <div className="glass-effect p-8 text-center">
          <p className="text-muted-foreground">No matches found for the selected filters.</p>
        </div>
      )}
    </div>
  );
}

export { BettingMarketsComponent as BettingMarkets };
export default BettingMarketsComponent;
