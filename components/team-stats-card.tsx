'use client';

import { BarChart3, Users, Target, Shield } from 'lucide-react';
import type { TeamStanding } from '@/lib/types';

interface TeamStatsCardProps {
  team: TeamStanding;
  rank: number;
}

export function TeamStatsCard({ team, rank }: TeamStatsCardProps) {
  const winRate = team.played > 0 ? ((team.wins / team.played) * 100).toFixed(1) : '0';
  const pointsPerGame = team.played > 0 ? (team.points / team.played).toFixed(2) : '0';

  const medalColor = 
    rank === 1 ? 'from-amber-500 to-yellow-500' :
    rank === 2 ? 'from-gray-400 to-gray-300' :
    rank === 3 ? 'from-amber-700 to-amber-600' :
    'from-indigo-500 to-purple-500';

  return (
    <div className="glass-effect p-4 hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`bg-gradient-to-br ${medalColor} rounded-lg p-2 text-white font-bold text-lg w-12 h-12 flex items-center justify-center`}>
            {rank}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-indigo-300 transition-colors">
              {team.name}
            </h3>
            <p className="text-xs text-muted-foreground">{team.points} points</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-indigo-300">{team.points}</p>
          <p className="text-xs text-muted-foreground">pts</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{team.played}</p>
          <p className="text-xs text-muted-foreground">P</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-400">{team.wins}</p>
          <p className="text-xs text-muted-foreground">W</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-amber-400">{team.draws}</p>
          <p className="text-xs text-muted-foreground">D</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-red-400">{team.losses}</p>
          <p className="text-xs text-muted-foreground">L</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="w-4 h-4" />
            <span>Win Rate</span>
          </div>
          <span className="font-semibold text-indigo-300">{winRate}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>PPG</span>
          </div>
          <span className="font-semibold text-green-400">{pointsPerGame}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart3 className="w-4 h-4" />
            <span>GD</span>
          </div>
          <span className={`font-semibold ${
            team.goalDifference > 0 ? 'text-green-400' :
            team.goalDifference < 0 ? 'text-red-400' :
            'text-foreground'
          }`}>
            {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
          </span>
        </div>
      </div>

      {/* Goal Stats */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-muted-foreground">
            {team.goalsFor}:{team.goalsAgainst}
          </span>
        </div>
        <div className="w-32 bg-white/10 rounded-full h-1.5 flex overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500"
            style={{ width: `${(team.goalsFor / (team.goalsFor + team.goalsAgainst)) * 100}%` }}
          />
          <div 
            className="bg-gradient-to-r from-red-500 to-rose-500"
            style={{ width: `${(team.goalsAgainst / (team.goalsFor + team.goalsAgainst)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
