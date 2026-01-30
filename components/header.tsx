'use client';

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import { Menu, X, ShoppingCart, Zap } from 'lucide-react';
import { useState } from 'react';
import { WalletStatus } from './wallet-status';

export function Header({ onToggleBetSlip }: { onToggleBetSlip: () => void }) {
  const { connected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PL</span>
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">
              Premier League
            </h1>
          </div>

          {/* Center Nav - Hidden on Mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <button className="text-sm text-foreground hover:text-indigo-400 transition-colors">
              Markets
            </button>
            <button className="text-sm text-foreground hover:text-indigo-400 transition-colors">
              Live Results
            </button>
            <button className="text-sm text-foreground hover:text-indigo-400 transition-colors">
              Statistics
            </button>
            <button className="text-sm text-foreground hover:text-indigo-400 transition-colors">
              Help
            </button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Balance Display */}
            {connected && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-green-300">1,250 LEAGUE</span>
              </div>
            )}

            {connected && (
              <button
                onClick={onToggleBetSlip}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors relative"
                title="Toggle Bet Slip"
              >
                <ShoppingCart className="w-5 h-5 text-indigo-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              </button>
            )}

            {/* Wallet Status - Hidden on Mobile */}
            <div className="hidden md:block">
              <WalletStatus />
            </div>

            {/* Wallet Button */}
            <div className="flex items-center">
              <WalletMultiButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-4 space-y-2 fade-in">
            <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-sm transition-colors">
              Markets
            </button>
            <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-sm transition-colors">
              Live Results
            </button>
            <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-sm transition-colors">
              Statistics
            </button>
            <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-sm transition-colors">
              Help
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
