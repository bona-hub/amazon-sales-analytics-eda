import React from 'react';
import { FilterState } from '../types';
import { Search, RefreshCw, BarChart2, ExternalLink, IndianRupee, DollarSign, Filter, Sparkles } from 'lucide-react';

interface HeaderProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredCount: number;
  totalCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  setFilters,
  resetFilters,
  filteredCount,
  totalCount,
  activeTab,
  setActiveTab
}) => {
  const handlePreset = (preset: FilterState['preset']) => {
    if (preset === 'high_rated') {
      setFilters(prev => ({ ...prev, preset, minRating: 4.4 }));
    } else if (preset === 'mega_discount') {
      setFilters(prev => ({ ...prev, preset, minDiscount: 60 }));
    } else if (preset === 'top_reviewed') {
      setFilters(prev => ({ ...prev, preset, minRatingCount: 50000 }));
    } else if (preset === 'tech') {
      setFilters(prev => ({ ...prev, preset, mainCategory: 'Electronics' }));
    } else if (preset === 'home') {
      setFilters(prev => ({ ...prev, preset, mainCategory: 'Home & Kitchen' }));
    } else {
      resetFilters();
    }
  };

  const hasActiveFilters = filters.searchQuery || filters.mainCategory || filters.minPriceINR > 0 || filters.minDiscount > 0 || filters.minRating > 0 || filters.sentimentFilter !== 'All';

  return (
    <header className="bg-[#16181D] border-b border-white/10 sticky top-0 z-30 shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Dataset Info */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-950/40">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Amazon Sales Intelligence
                </h1>
                <div className="bg-[#1A1C20] border border-white/10 rounded-lg px-2.5 py-0.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Live Dataset</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                <span>1,465 Items Analyzed</span>
                <span>•</span>
                <span>Kaggle EDA: mehakiftikhar/amazon-sales-dataset-eda</span>
                <a
                  href="https://www.kaggle.com/code/mehakiftikhar/amazon-sales-dataset-eda"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-indigo-400 hover:underline ml-1"
                >
                  Source <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Controls: Currency Switcher & Preset Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Currency Switcher */}
            <div className="bg-[#0A0A0B] p-1 rounded-xl border border-white/10 flex items-center">
              <button
                id="curr-inr-btn"
                onClick={() => setFilters(prev => ({ ...prev, currency: 'INR' }))}
                className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  filters.currency === 'INR'
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <IndianRupee className="w-3.5 h-3.5" />
                <span>INR (₹)</span>
              </button>
              <button
                id="curr-usd-btn"
                onClick={() => setFilters(prev => ({ ...prev, currency: 'USD' }))}
                className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  filters.currency === 'USD'
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>USD ($)</span>
              </button>
            </div>

            {/* AI Assistant Quick Tab Launcher */}
            <button
              id="ai-assistant-btn"
              onClick={() => setActiveTab('ai')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40'
                  : 'bg-purple-950/60 text-purple-300 border border-purple-800/60 hover:bg-purple-900/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
              <span>Ask AI Insights</span>
            </button>
          </div>
        </div>

        {/* Global Filter Bar */}
        <div className="mt-3 pt-3 border-t border-white/5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search products, categories, or keywords..."
              value={filters.searchQuery}
              onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Quick Filter Presets */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
            <span className="text-slate-500 text-xs font-medium mr-1 flex items-center">
              <Filter className="w-3 h-3 mr-1 text-slate-400" /> Presets:
            </span>

            <button
              id="preset-all-btn"
              onClick={() => handlePreset('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                filters.preset === 'all'
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              All Items
            </button>

            <button
              id="preset-high-rated-btn"
              onClick={() => handlePreset('high_rated')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                filters.minRating >= 4.4
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              High Rated (&ge;4.4★)
            </button>

            <button
              id="preset-mega-discount-btn"
              onClick={() => handlePreset('mega_discount')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                filters.minDiscount >= 60
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Mega Discounts (&ge;60%)
            </button>

            <button
              id="preset-top-reviewed-btn"
              onClick={() => handlePreset('top_reviewed')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                filters.minRatingCount >= 50000
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Top Reviewed (&gt;50k)
            </button>

            {hasActiveFilters && (
              <button
                id="reset-filters-btn"
                onClick={resetFilters}
                className="flex items-center space-x-1 px-2.5 py-1 bg-rose-950/40 text-rose-400 border border-rose-800/50 hover:bg-rose-900/60 rounded-lg transition ml-2"
                title="Reset all filters"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Items Counter */}
          <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
            Showing <span className="text-indigo-400 font-bold">{filteredCount}</span> of {totalCount} items
          </div>
        </div>

      </div>
    </header>
  );
};
