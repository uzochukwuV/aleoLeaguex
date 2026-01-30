'use client';

import { useState } from 'react';
import { X, CheckCircle, Clock, AlertCircle, Copy } from 'lucide-react';
import type { Transaction } from '@/lib/types';

interface SettlementDetailsProps {
  transaction: Transaction;
  onClose: () => void;
}

export function SettlementDetails({ transaction, onClose }: SettlementDetailsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIcon = (result: string) => {
    switch (result) {
      case 'win':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'loss':
        return <AlertCircle className="w-8 h-8 text-red-400" />;
      case 'pending':
        return <Clock className="w-8 h-8 text-amber-400 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusText = (result: string) => {
    switch (result) {
      case 'win':
        return 'Bet Won';
      case 'loss':
        return 'Bet Lost';
      case 'pending':
        return 'Pending Settlement';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-effect max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Settlement Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {getStatusIcon(transaction.result)}
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {getStatusText(transaction.result)}
            </h3>
            <p className="text-sm text-muted-foreground">{transaction.description}</p>
          </div>

          {/* Amount */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Amount</p>
              <p className={`text-3xl font-bold ${
                transaction.amount > 0 ? 'text-green-400' :
                transaction.amount < 0 ? 'text-red-400' :
                'text-foreground'
              }`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount} LEAGUE
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
              <p className="text-sm text-foreground">
                {transaction.timestamp.toLocaleString()}
              </p>
            </div>

            {transaction.odds && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Odds</p>
                <p className="text-sm font-semibold text-indigo-300">
                  {transaction.odds.toFixed(2)}x
                </p>
              </div>
            )}

            {transaction.txHash && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs text-indigo-300 bg-white/5 px-2 py-1 rounded break-all font-mono">
                    {transaction.txHash}
                  </code>
                  <button
                    onClick={() => copyToClipboard(transaction.txHash || '')}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    title="Copy hash"
                  >
                    <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>
                </div>
                {copied && <p className="text-xs text-green-400 mt-1">Copied!</p>}
              </div>
            )}
          </div>

          {/* Bets List */}
          {transaction.bets && transaction.bets.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Bets Placed</h4>
              <div className="space-y-2">
                {transaction.bets.map((bet, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-medium text-foreground">{bet.match}</p>
                      <span className="text-xs font-semibold text-indigo-300">
                        {bet.odds.toFixed(2)}x
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Bet Type: <span className="text-foreground">{bet.betType}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
            >
              Close
            </button>
            {transaction.txHash && (
              <a
                href={`https://testnet3.aleoscan.io/tx/${transaction.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 rounded-lg bg-white/5 text-foreground font-medium hover:bg-white/10 transition-colors text-center text-sm"
              >
                View on Aleoscan
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
