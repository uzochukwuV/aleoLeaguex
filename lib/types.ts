export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeStrength: number;
  awayStrength: number;
  timeUntilKickoff: number;
  round: number;
  odds: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
  volume: number;
}

export interface BetSlipItem {
  id: string;
  matchId: string;
  matchDescription: string;
  betType: 'HOME' | 'DRAW' | 'AWAY';
  odds: number;
  stake?: number;
}

export interface TeamStanding {
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Transaction {
  id: string;
  description: string;
  details: string;
  amount: number;
  result: 'win' | 'loss' | 'pending';
  timestamp: Date;
  txHash?: string;
  odds?: number;
  bets?: Array<{
    match: string;
    betType: string;
    odds: number;
  }>;
}
