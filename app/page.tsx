'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { BettingMarkets } from '@/components/betting-markets';
import { BetSlipPanel } from '@/components/bet-slip-panel';
import { StandingsPanel } from '@/components/standings-panel';
import { TransactionHistory } from '@/components/transaction-history';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'markets' | 'standings' | 'history'>('markets');
  const [showBetSlip, setShowBetSlip] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleBetSlip={() => setShowBetSlip(!showBetSlip)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="glass-effect p-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('markets')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === 'markets'
                      ? 'bg-indigo-500 text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Live Markets
                </button>
                <button
                  onClick={() => setActiveTab('standings')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === 'standings'
                      ? 'bg-indigo-500 text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Standings
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === 'history'
                      ? 'bg-indigo-500 text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  History
                </button>
              </div>
            </div>

            {/* Content Area */}
            {activeTab === 'markets' && <BettingMarkets />}
            {activeTab === 'standings' && <StandingsPanel />}
            {activeTab === 'history' && <TransactionHistory />}
          </div>

          {/* Bet Slip Panel - Sticky on Desktop */}
          {showBetSlip && (
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)]">
              <BetSlipPanel onClose={() => setShowBetSlip(false)} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
