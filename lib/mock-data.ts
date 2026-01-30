import type { Match, TeamStanding, Transaction } from './types';

export const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    homeStrength: 95,
    awayStrength: 92,
    timeUntilKickoff: 300,
    round: 1,
    odds: { homeWin: 1.95, draw: 3.40, awayWin: 3.80 },
    volume: 2500000,
  },
  {
    id: '2',
    homeTeam: 'Liverpool',
    awayTeam: 'Manchester United',
    homeStrength: 89,
    awayStrength: 87,
    timeUntilKickoff: 420,
    round: 1,
    odds: { homeWin: 2.10, draw: 3.20, awayWin: 3.50 },
    volume: 3100000,
  },
  {
    id: '3',
    homeTeam: 'Chelsea',
    awayTeam: 'Tottenham',
    homeStrength: 86,
    awayStrength: 84,
    timeUntilKickoff: 540,
    round: 1,
    odds: { homeWin: 2.20, draw: 3.10, awayWin: 3.30 },
    volume: 1800000,
  },
  {
    id: '4',
    homeTeam: 'Brighton',
    awayTeam: 'Newcastle',
    homeStrength: 82,
    awayStrength: 81,
    timeUntilKickoff: 660,
    round: 1,
    odds: { homeWin: 2.35, draw: 3.00, awayWin: 3.10 },
    volume: 1200000,
  },
  {
    id: '5',
    homeTeam: 'Aston Villa',
    awayTeam: 'West Ham',
    homeStrength: 83,
    awayStrength: 78,
    timeUntilKickoff: 150,
    round: 2,
    odds: { homeWin: 1.85, draw: 3.50, awayWin: 4.20 },
    volume: 950000,
  },
  {
    id: '6',
    homeTeam: 'Everton',
    awayTeam: 'Fulham',
    homeStrength: 76,
    awayStrength: 77,
    timeUntilKickoff: 270,
    round: 2,
    odds: { homeWin: 2.50, draw: 3.00, awayWin: 2.80 },
    volume: 680000,
  },
];

export const mockTeamStandings: TeamStanding[] = [
  { name: 'Manchester City', played: 8, wins: 7, draws: 1, losses: 0, goalsFor: 24, goalsAgainst: 6, goalDifference: 18, points: 22 },
  { name: 'Arsenal', played: 8, wins: 6, draws: 2, losses: 0, goalsFor: 21, goalsAgainst: 7, goalDifference: 14, points: 20 },
  { name: 'Liverpool', played: 8, wins: 6, draws: 1, losses: 1, goalsFor: 20, goalsAgainst: 8, goalDifference: 12, points: 19 },
  { name: 'Brighton', played: 8, wins: 5, draws: 2, losses: 1, goalsFor: 16, goalsAgainst: 9, goalDifference: 7, points: 17 },
  { name: 'Aston Villa', played: 8, wins: 5, draws: 1, losses: 2, goalsFor: 15, goalsAgainst: 10, goalDifference: 5, points: 16 },
  { name: 'Tottenham', played: 8, wins: 4, draws: 2, losses: 2, goalsFor: 14, goalsAgainst: 11, goalDifference: 3, points: 14 },
  { name: 'Chelsea', played: 8, wins: 4, draws: 1, losses: 3, goalsFor: 13, goalsAgainst: 12, goalDifference: 1, points: 13 },
  { name: 'Manchester United', played: 8, wins: 3, draws: 2, losses: 3, goalsFor: 11, goalsAgainst: 13, goalDifference: -2, points: 11 },
  { name: 'Newcastle', played: 8, wins: 3, draws: 2, losses: 3, goalsFor: 10, goalsAgainst: 12, goalDifference: -2, points: 11 },
  { name: 'Fulham', played: 8, wins: 3, draws: 1, losses: 4, goalsFor: 9, goalsAgainst: 14, goalDifference: -5, points: 10 },
  { name: 'West Ham', played: 8, wins: 2, draws: 2, losses: 4, goalsFor: 8, goalsAgainst: 15, goalDifference: -7, points: 8 },
  { name: 'Everton', played: 8, wins: 2, draws: 1, losses: 5, goalsFor: 7, goalsAgainst: 16, goalDifference: -9, points: 7 },
];

export const mockTransactionHistory: Transaction[] = [
  {
    id: '1',
    description: 'Manchester City vs Arsenal - 2 Parlay',
    details: 'Home Win + Home Win',
    amount: 450.50,
    result: 'win',
    timestamp: new Date(Date.now() - 3600000),
    txHash: '0x1234567890abcdef',
    odds: 3.75,
    bets: [
      { match: 'Man City vs Arsenal', betType: 'HOME', odds: 1.95 },
      { match: 'Liverpool vs Man United', betType: 'HOME', odds: 2.10 }
    ]
  },
  {
    id: '2',
    description: 'Chelsea vs Tottenham - Single Bet',
    details: 'Draw',
    amount: -100,
    result: 'loss',
    timestamp: new Date(Date.now() - 7200000),
    txHash: '0x2234567890abcdef',
    odds: 3.10,
  },
  {
    id: '3',
    description: 'Brighton vs Newcastle - 3 Parlay',
    details: 'In Progress - Waiting for results',
    amount: 0,
    result: 'pending',
    timestamp: new Date(Date.now() - 1800000),
    bets: [
      { match: 'Brighton vs Newcastle', betType: 'HOME', odds: 2.35 },
      { match: 'Aston Villa vs West Ham', betType: 'HOME', odds: 1.85 },
      { match: 'Everton vs Fulham', betType: 'AWAY', odds: 2.80 }
    ]
  },
  {
    id: '4',
    description: 'Aston Villa vs West Ham - Single Bet',
    details: 'Home Win',
    amount: 185.00,
    result: 'win',
    timestamp: new Date(Date.now() - 10800000),
    txHash: '0x3234567890abcdef',
    odds: 1.85,
  },
  {
    id: '5',
    description: 'Multiple Matches - 4 Parlay',
    details: '4 bets combined for massive payout',
    amount: -50,
    result: 'loss',
    timestamp: new Date(Date.now() - 14400000),
    txHash: '0x4234567890abcdef',
    odds: 8.50,
    bets: [
      { match: 'Man City vs Arsenal', betType: 'DRAW', odds: 3.40 },
      { match: 'Liverpool vs Man United', betType: 'AWAY', odds: 3.50 },
      { match: 'Chelsea vs Tottenham', betType: 'HOME', odds: 2.20 },
      { match: 'Brighton vs Newcastle', betType: 'DRAW', odds: 3.00 }
    ]
  },
];
