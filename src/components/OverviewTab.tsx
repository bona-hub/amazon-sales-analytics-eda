import React from 'react';
import { AmazonProduct, CategorySummary } from '../types';
import { USD_EXCHANGE_RATE } from '../data/amazonSalesData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Award, CheckCircle2, TrendingUp, AlertCircle, Sparkles, Layers } from 'lucide-react';

interface OverviewTabProps {
  products: AmazonProduct[];
  categorySummaries: CategorySummary[];
  currency: 'INR' | 'USD';
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  products,
  categorySummaries,
  currency
}) => {
  const formatPrice = (priceINR: number) => {
    if (currency === 'USD') {
      return `$${(priceINR * USD_EXCHANGE_RATE).toFixed(2)}`;
    }
    return `₹${priceINR.toLocaleString('en-IN')}`;
  };

  // Rating Distribution
  const ratingBins = [
    { range: '< 3.5★', count: products.filter(p => p.rating < 3.5).length, color: '#EF4444' },
    { range: '3.5 - 3.9★', count: products.filter(p => p.rating >= 3.5 && p.rating < 4.0).length, color: '#F59E0B' },
    { range: '4.0 - 4.3★', count: products.filter(p => p.rating >= 4.0 && p.rating <= 4.3).length, color: '#6366F1' },
    { range: '4.4 - 4.7★', count: products.filter(p => p.rating > 4.3 && p.rating <= 4.7).length, color: '#10B981' },
    { range: '4.8 - 5.0★', count: products.filter(p => p.rating > 4.7).length, color: '#8B5CF6' }
  ];

  // Category Pie Data
  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];
  const categoryPieData = categorySummaries.slice(0, 6).map((cat, idx) => ({
    name: cat.category,
    value: cat.productCount,
    color: COLORS[idx % COLORS.length]
  }));

  // Top Rated Products
  const topRated = [...products].sort((a, b) => b.rating - a.rating || b.rating_count - a.rating_count).slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* Executive Key EDA Insights Banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-[#16181D] to-purple-950/40 border border-white/10 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 text-indigo-300 font-semibold text-sm mb-3">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Key EDA Insights & Dataset Discoveries (Kaggle Analysis)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#0A0A0B]/80 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Price vs Discount Correlation (0.97)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Actual Price and Discounted Price share a nearly perfect positive correlation (r = 0.97). Higher priced luxury goods receive proportional numeric discounts.
            </p>
          </div>

          <div className="bg-[#0A0A0B]/80 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold mb-1">
              <AlertCircle className="w-4 h-4" />
              <span>Discounts Do NOT Buy Higher Ratings</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Discount percentage has almost zero correlation with product ratings (r = -0.05). Heavy discounts (60-90%) do not compensate for poor product quality or build.
            </p>
          </div>

          <div className="bg-[#0A0A0B]/80 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center space-x-2 text-indigo-400 font-semibold mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Tech Accessories Lead Satisfaction</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Tablets, Networking Devices, and Photography Accessories achieved the highest average customer ratings (~4.5 - 4.6★) across all categories.
            </p>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Rating Distribution Histogram */}
        <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center uppercase tracking-wider">
                <Award className="w-4 h-4 mr-2 text-amber-400" />
                Rating Distribution (Histogram)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Distribution of customer ratings across filtered products</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingBins}>
                <XAxis dataKey="range" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0A0B', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#F8FAFC' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {ratingBins.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut Chart */}
        <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center uppercase tracking-wider">
                <Layers className="w-4 h-4 mr-2 text-indigo-400" />
                Category Share & Distribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Product volume count by primary Amazon category</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name.split(' ')[0]} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {categoryPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0A0A0B', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#F8FAFC' }} />
                <Legend verticalAlign="bottom" height={36} iconSize={10} fontSize={11} wrapperStyle={{ color: '#94A3B8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Category Performance Summary Table & Highest Rated Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Breakdown Table */}
        <div className="lg:col-span-2 bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
            Category Benchmark Metrics
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0A0B] text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-3.5 py-3 rounded-l-xl">Category</th>
                  <th className="px-3.5 py-3">Products</th>
                  <th className="px-3.5 py-3">Avg Rating</th>
                  <th className="px-3.5 py-3">Avg Discount</th>
                  <th className="px-3.5 py-3 rounded-r-xl">Avg Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {categorySummaries.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition">
                    <td className="px-3.5 py-3 font-semibold text-white">{cat.category}</td>
                    <td className="px-3.5 py-3 text-slate-400">{cat.productCount}</td>
                    <td className="px-3.5 py-3">
                      <span className="text-amber-400 font-semibold">{cat.avgRating} ★</span>
                    </td>
                    <td className="px-3.5 py-3 text-emerald-400 font-medium">{cat.avgDiscountPercent}%</td>
                    <td className="px-3.5 py-3 font-medium text-slate-300">{formatPrice(cat.avgPriceINR)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top 5 Rated Products Spotlight */}
        <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center uppercase tracking-wider">
              <Award className="w-4 h-4 mr-2 text-amber-400" />
              Highest Rated Products
            </h3>
            <div className="space-y-3">
              {topRated.map((prod, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-2.5 bg-[#0A0A0B] rounded-2xl border border-white/5 hover:border-white/10 transition">
                  <img
                    src={prod.img_link}
                    alt={prod.product_name}
                    className="w-10 h-10 object-cover rounded-xl bg-slate-800 flex-shrink-0 border border-white/10"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80');
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-white truncate">{prod.product_name}</h4>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="text-amber-400 font-semibold">{prod.rating} ★</span>
                      <span>•</span>
                      <span>{prod.rating_count.toLocaleString()} reviews</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
