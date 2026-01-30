'use client';

import { useState } from 'react';
import { Filter, X, Sliders } from 'lucide-react';

interface MarketFiltersProps {
  onOddsChange?: (min: number, max: number) => void;
  onVolumeChange?: (min: number) => void;
  onTimeChange?: (minutes: number) => void;
}

export function MarketFilters({
  onOddsChange,
  onVolumeChange,
  onTimeChange,
}: MarketFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minOdds, setMinOdds] = useState(1.0);
  const [maxOdds, setMaxOdds] = useState(5.0);
  const [minVolume, setMinVolume] = useState(0);
  const [timeWindow, setTimeWindow] = useState(999);

  const handleApplyFilters = () => {
    onOddsChange?.(minOdds, maxOdds);
    onVolumeChange?.(minVolume);
    onTimeChange?.(timeWindow);
  };

  const handleReset = () => {
    setMinOdds(1.0);
    setMaxOdds(5.0);
    setMinVolume(0);
    setTimeWindow(999);
    onOddsChange?.(1.0, 5.0);
    onVolumeChange?.(0);
    onTimeChange?.(999);
  };

  return (
    <>
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-foreground"
      >
        <Sliders className="w-4 h-4" />
        <span>Advanced Filters</span>
      </button>

      {showAdvanced && (
        <div className="glass-effect p-4 rounded-lg space-y-4 fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Filter Markets</h3>
            <button
              onClick={() => setShowAdvanced(false)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Odds Range */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-muted-foreground">ODDS RANGE</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={minOdds}
                onChange={(e) => setMinOdds(parseFloat(e.target.value))}
                className="w-20 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-sm text-foreground focus:outline-none focus:border-indigo-500/50"
              />
              <span className="text-xs text-muted-foreground">to</span>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={maxOdds}
                onChange={(e) => setMaxOdds(parseFloat(e.target.value))}
                className="w-20 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-sm text-foreground focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          {/* Volume */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-muted-foreground">MIN VOLUME (LEAGUE)</label>
            <input
              type="number"
              min="0"
              step="100000"
              value={minVolume}
              onChange={(e) => setMinVolume(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-foreground focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          {/* Time Window */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-muted-foreground">TIME TO KICKOFF</label>
            <select
              value={timeWindow}
              onChange={(e) => setTimeWindow(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-foreground focus:outline-none focus:border-indigo-500/50"
            >
              <option value={60}>Next hour</option>
              <option value={180}>Next 3 hours</option>
              <option value={480}>Next 8 hours</option>
              <option value={999}>All matches</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-3 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-foreground text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
}
