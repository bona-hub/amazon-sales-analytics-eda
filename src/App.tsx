import { useState, useMemo } from 'react';
import { AMAZON_DATASET, computeDatasetStats, computeCategorySummaries, computePriceTierBreakdown, computeSentimentDistribution, TOP_REVIEW_KEYWORDS } from './data/amazonSalesData';
import { FilterState } from './types';
import { Header } from './components/Header';
import { KPICards } from './components/KPICards';
import { OverviewTab } from './components/OverviewTab';
import { PriceDiscountTab } from './components/PriceDiscountTab';
import { RatingsSentimentTab } from './components/RatingsSentimentTab';
import { CategoryTab } from './components/CategoryTab';
import { ProductExplorerTab } from './components/ProductExplorerTab';
import { CorrelationTab } from './components/CorrelationTab';
import { AiAssistantTab } from './components/AiAssistantTab';
import { BarChart2, Tag, Star, Layers, ShoppingBag, Grid, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const initialFilters: FilterState = {
    searchQuery: '',
    mainCategory: '',
    subCategory: '',
    minPriceINR: 0,
    maxPriceINR: Infinity,
    minDiscount: 0,
    maxDiscount: 100,
    minRating: 0,
    minRatingCount: 0,
    sentimentFilter: 'All',
    currency: 'INR',
    preset: 'all'
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Filter products based on search & controls
  const filteredProducts = useMemo(() => {
    return AMAZON_DATASET.filter(p => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = p.product_name.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesReview = p.review_content.toLowerCase().includes(query) || p.review_title.toLowerCase().includes(query);
        const matchesId = p.product_id.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesReview && !matchesId) return false;
      }

      if (filters.mainCategory && p.main_category !== filters.mainCategory) {
        return false;
      }

      if (filters.minDiscount > 0 && p.discount_percentage < filters.minDiscount) {
        return false;
      }

      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false;
      }

      if (filters.minRatingCount > 0 && p.rating_count < filters.minRatingCount) {
        return false;
      }

      if (filters.sentimentFilter !== 'All' && p.sentiment_label !== filters.sentimentFilter) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Derived aggregate statistics
  const stats = useMemo(() => computeDatasetStats(filteredProducts), [filteredProducts]);
  const categorySummaries = useMemo(() => computeCategorySummaries(filteredProducts), [filteredProducts]);
  const priceTiers = useMemo(() => computePriceTierBreakdown(filteredProducts), [filteredProducts]);
  const sentimentDist = useMemo(() => computeSentimentDistribution(filteredProducts), [filteredProducts]);

  const handleSelectKeyword = (word: string) => {
    setFilters(prev => ({ ...prev, searchQuery: word }));
    setActiveTab('explorer');
  };

  const navTabs = [
    { id: 'overview', label: 'Executive Overview', icon: BarChart2 },
    { id: 'price', label: 'Price & Discounts', icon: Tag },
    { id: 'ratings', label: 'Ratings & Sentiment', icon: Star },
    { id: 'category', label: 'Category Deep Dive', icon: Layers },
    { id: 'explorer', label: 'Product Explorer', icon: ShoppingBag },
    { id: 'correlation', label: 'Correlation & Stats', icon: Grid },
    { id: 'ai', label: 'Ask AI Analyst', icon: Sparkles, badge: 'Gemini' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Sticky Header & Filter Bar */}
      <Header
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        filteredCount={filteredProducts.length}
        totalCount={AMAZON_DATASET.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Executive KPI Metric Cards */}
        <KPICards stats={stats} currency={filters.currency} />

        {/* Navigation Tabs Bar - Bento Styled */}
        <div className="bg-[#16181D] border border-white/10 rounded-2xl p-1.5 flex items-center space-x-1 overflow-x-auto shadow-sm">
          {navTabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/40 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab View Rendering */}
        <div className="transition-all duration-200">
          {activeTab === 'overview' && (
            <OverviewTab
              products={filteredProducts}
              categorySummaries={categorySummaries}
              currency={filters.currency}
            />
          )}

          {activeTab === 'price' && (
            <PriceDiscountTab
              products={filteredProducts}
              priceTiers={priceTiers}
              categorySummaries={categorySummaries}
              currency={filters.currency}
            />
          )}

          {activeTab === 'ratings' && (
            <RatingsSentimentTab
              products={filteredProducts}
              sentimentDist={sentimentDist}
              keywords={TOP_REVIEW_KEYWORDS}
              onSelectKeyword={handleSelectKeyword}
            />
          )}

          {activeTab === 'category' && (
            <CategoryTab
              categorySummaries={categorySummaries}
              products={filteredProducts}
              currency={filters.currency}
            />
          )}

          {activeTab === 'explorer' && (
            <ProductExplorerTab
              products={filteredProducts}
              filters={filters}
              currency={filters.currency}
            />
          )}

          {activeTab === 'correlation' && (
            <CorrelationTab
              products={filteredProducts}
              currency={filters.currency}
            />
          )}

          {activeTab === 'ai' && (
            <AiAssistantTab stats={stats} />
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#16181D] border-t border-white/5 mt-12 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-200">Amazon Sales Analytics & EDA Dashboard</span>
            <span>•</span>
            <span className="text-slate-400">Powered by Gemini 3.6 Flash & Kaggle Dataset</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.kaggle.com/code/mehakiftikhar/amazon-sales-dataset-eda"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline flex items-center"
            >
              Kaggle Dataset Notebook <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
