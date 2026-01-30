'use client';

import { useState } from 'react';
import { Trophy, Zap } from 'lucide-react';
import { mockTeamStandings } from '@/lib/mock-data';

export function SeasonWinnerPredictor() {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [stake, setStake] = useState(0);
  const standings = mockTeamStandings;

  // Calculate odds based on current standings (simulated)
  const getOdds = (index: number) => {
    return Math.max(1.1, 30 - (index * 1.5));
  };

  const topContenders = standings.slice(0, 6);
  const selectedOdds = selectedTeam 
    ? getOdds(standings.findIndex(t => t.name === selectedTeam))
    : 0;

  return (
    <div className="glass-effect p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-amber-400" />
        <h2 className="text-2xl font-bold text-white">Season Winner Prediction</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        Free entry • Predict the season champion and win from a prize pool
      </p>

      {/* Top Contenders */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground mb-3">Top Contenders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {topContenders.map((team, idx) => {
            const odds = getOdds(idx);
            const isSelected = selectedTeam === team.name;

            return (
              <button
                key={team.name}
                onClick={() => setSelectedTeam(isSelected ? '' : team.name)}
                className={`p-3 rounded-lg transition-all duration-300 border ${
                  isSelected
                    ? 'bg-indigo-500/20 border-indigo-500/50 ring-2 ring-indigo-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-500/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.points} pts</p>
                  </div>
                  <span className="odds-badge text-xs px-2 py-1">{odds.toFixed(2)}x</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prediction Details */}
      {selectedTeam && (
        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Your Prediction</p>
              <p className="text-xs text-muted-foreground">{selectedTeam}</p>
            </div>
            <span className="text-xl font-bold text-purple-300">{selectedOdds.toFixed(2)}x</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rounds Remaining:</span>
              <span className="font-semibold text-foreground">28 of 36</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Probability:</span>
              <span className="font-semibold text-green-400">
                {((1 / selectedOdds) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Prize Pool Info */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-amber-300">Prize Pool</span>
        </div>
        <p className="text-2xl font-bold text-foreground mb-2">500,000 LEAGUE</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">1st Place</p>
            <p className="font-semibold text-green-400">250,000</p>
          </div>
          <div>
            <p className="text-muted-foreground">2nd Place</p>
            <p className="font-semibold text-blue-400">150,000</p>
          </div>
          <div>
            <p className="text-muted-foreground">3rd Place</p>
            <p className="font-semibold text-purple-400">100,000</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        disabled={!selectedTeam}
        className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 button-glow"
      >
        {selectedTeam ? `Predict ${selectedTeam}` : 'Select a Team'}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Free entry • Results determined at end of season
      </p>
    </div>
  );
}
