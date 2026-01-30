'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'markets' | 'standings' | 'history'>('markets');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10 glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-white text-lg">PL</span>
            </div>
            <h1 className="text-xl font-bold text-white">Premier League Betting</h1>
          </div>
          <span className="text-xs font-semibold text-green-300 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
            Aleo Network
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Live Betting Markets</h2>
          <p className="text-muted-foreground">Privacy-first sports betting on Aleo blockchain</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Betting Card */}
          <div className="glass-effect p-6 rounded-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
            <div className="mb-4">
              <h3 className="font-bold text-white mb-2">Arsenal vs Manchester City</h3>
              <p className="text-sm text-muted-foreground">Premier League • Round 15</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button className="py-2 px-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm transition-all">
                <div>2.50</div>
                <div className="text-xs mt-1">Home</div>
              </button>
              <button className="py-2 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                <div>3.25</div>
                <div className="text-xs mt-1">Draw</div>
              </button>
              <button className="py-2 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                <div>2.80</div>
                <div className="text-xs mt-1">Away</div>
              </button>
            </div>
            <button className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all">
              Place Bet
            </button>
          </div>

          {/* Sample Card 2 */}
          <div className="glass-effect p-6 rounded-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
            <div className="mb-4">
              <h3 className="font-bold text-white mb-2">Liverpool vs Tottenham</h3>
              <p className="text-sm text-muted-foreground">Premier League • Round 15</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button className="py-2 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                <div>1.95</div>
                <div className="text-xs mt-1">Home</div>
              </button>
              <button className="py-2 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                <div>3.50</div>
                <div className="text-xs mt-1">Draw</div>
              </button>
              <button className="py-2 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                <div>3.80</div>
                <div className="text-xs mt-1">Away</div>
              </button>
            </div>
            <button className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all">
              Place Bet
            </button>
          </div>

          {/* Sample Card 3 */}
          <div className="glass-effect p-6 rounded-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
            <div className="mb-4">
              <h3 className="font-bold text-white mb-2">Chelsea vs Manchester United</h3>
              <p className="text-sm text-muted-foreground">Premier League • Round 15</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button className="py-2 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                <div>2.15</div>
                <div className="text-xs mt-1">Home</div>
              </button>
              <button className="py-2 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                <div>3.40</div>
                <div className="text-xs mt-1">Draw</div>
              </button>
              <button className="py-2 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all">
                <div>3.50</div>
                <div className="text-xs mt-1">Away</div>
              </button>
            </div>
            <button className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all">
              Place Bet
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
