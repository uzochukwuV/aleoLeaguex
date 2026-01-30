'use client';

import { mockTeamStandings } from '@/lib/mock-data';
import { Trophy } from 'lucide-react';

export function StandingsPanel() {
  const standings = mockTeamStandings;

  return (
    <div className="glass-effect p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-amber-400" />
        <h2 className="text-2xl font-bold text-white">Season Standings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">RANK</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">TEAM</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">P</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">W</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">D</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">L</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">GF</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">GA</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">GD</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => {
              const medalColor = 
                index === 0 ? 'text-amber-400' :
                index === 1 ? 'text-gray-300' :
                index === 2 ? 'text-amber-600' :
                index < 4 ? 'text-green-400' :
                index >= standings.length - 3 ? 'text-red-400' :
                'text-foreground';

              return (
                <tr
                  key={team.name}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className={`px-4 py-3 font-bold ${medalColor}`}>
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300">
                        {team.name.substring(0, 1)}
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-indigo-300 transition-colors">
                        {team.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-foreground">{team.played}</td>
                  <td className="px-4 py-3 text-center text-sm text-green-400 font-semibold">{team.wins}</td>
                  <td className="px-4 py-3 text-center text-sm text-muted-foreground">{team.draws}</td>
                  <td className="px-4 py-3 text-center text-sm text-red-400">{team.losses}</td>
                  <td className="px-4 py-3 text-center text-sm text-foreground">{team.goalsFor}</td>
                  <td className="px-4 py-3 text-center text-sm text-foreground">{team.goalsAgainst}</td>
                  <td className={`px-4 py-3 text-center text-sm font-semibold ${
                    team.goalDifference > 0 ? 'text-green-400' :
                    team.goalDifference < 0 ? 'text-red-400' :
                    'text-foreground'
                  }`}>
                    {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-bold text-indigo-300">{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="text-xs text-muted-foreground">Champions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="text-xs text-muted-foreground">Top 4</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span className="text-xs text-muted-foreground">Relegation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-foreground" />
          <span className="text-xs text-muted-foreground">Mid-table</span>
        </div>
      </div>
    </div>
  );
}
