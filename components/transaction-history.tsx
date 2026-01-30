'use client';

import { useState } from 'react';
import { Check, X, Clock, TrendingUp } from 'lucide-react';
import { mockTransactionHistory } from '@/lib/mock-data';

export function TransactionHistory() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'win' | 'loss' | 'pending'>('all');

  const transactions = mockTransactionHistory;
  const filtered = filterStatus === 'all'
    ? transactions
    : transactions.filter(t => {
        if (filterStatus === 'win') return t.result === 'win';
        if (filterStatus === 'loss') return t.result === 'loss';
        if (filterStatus === 'pending') return t.result === 'pending';
        return true;
      });

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'win':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'loss':
        return <X className="w-5 h-5 text-red-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-400" />;
      default:
        return null;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'loss':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'pending':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="glass-effect p-4">
        <div className="flex gap-2 flex-wrap">
          {['all', 'win', 'loss', 'pending'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-foreground hover:bg-white/10'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filtered.map(tx => (
          <div key={tx.id} className={`glass-card p-4 border ${getResultColor(tx.result)}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getResultIcon(tx.result)}
                  <span className="font-semibold text-foreground">{tx.description}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{tx.details}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="text-muted-foreground">
                    {new Date(tx.timestamp).toLocaleDateString()} {new Date(tx.timestamp).toLocaleTimeString()}
                  </span>
                  {tx.txHash && (
                    <a
                      href={`https://testnet3.aleoscan.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
                    >
                      {tx.txHash.substring(0, 8)}...
                    </a>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-foreground mb-1">
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  tx.result === 'win' ? 'bg-green-500/20 text-green-300' :
                  tx.result === 'loss' ? 'bg-red-500/20 text-red-300' :
                  'bg-amber-500/20 text-amber-300'
                }`}>
                  {tx.result.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Multi-bet Details */}
            {tx.bets && tx.bets.length > 1 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {tx.bets.length} Parlay
                </div>
                <div className="space-y-1">
                  {tx.bets.map((bet, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground">
                      {bet.match}: {bet.betType} @ {bet.odds.toFixed(2)}x
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-effect p-8 text-center">
          <p className="text-muted-foreground">No transactions found for this filter.</p>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: 'Win Rate',
            value: `${Math.round((transactions.filter(t => t.result === 'win').length / transactions.length) * 100)}%`,
            color: 'text-green-400'
          },
          {
            label: 'Total Bets',
            value: transactions.length,
            color: 'text-indigo-400'
          },
          {
            label: 'Avg Odds',
            value: (
              transactions.reduce((acc, t) => acc + (t.odds || 1), 0) / transactions.length
            ).toFixed(2) + 'x',
            color: 'text-purple-400'
          }
        ].map((stat, i) => (
          <div key={i} className="glass-effect p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
