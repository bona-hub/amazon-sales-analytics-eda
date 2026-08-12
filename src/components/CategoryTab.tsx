import React, { useState } from 'react';
import { CategorySummary, AmazonProduct } from '../types';
import { USD_EXCHANGE_RATE } from '../data/amazonSalesData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Layers, Star, Tag, MessageSquare, ArrowUpDown } from 'lucide-react';

interface CategoryTabProps {
  categorySummaries: CategorySummary[];
  products: AmazonProduct[];
  currency: 'INR' | 'USD';
}

export const CategoryTab: React.FC<CategoryTabProps> = ({
  categorySummaries,
  products,
  currency
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'count' | 'rating' | 'discount' | 'reviews'>('count');

  const formatPrice = (priceINR: number) => {
    if (currency === 'USD') {
      return `$${(priceINR * USD_EXCHANGE_RATE).toFixed(2)}`;
    }
    return `₹${priceINR.toLocaleString('en-IN')}`;
  };

  // Compute Subcategories
  const subCategoryMap = new Map<string, { main: string; sub: string; count: number; ratingSum: number; discSum: number; reviews: number }>();
  products.forEach(p => {
    const key = `${p.main_category} > ${p.sub_category}`;
    const curr = subCategoryMap.get(key) || { main: p.main_category, sub: p.sub_category, count: 0, ratingSum: 0, discSum: 0, reviews: 0 };
    curr.count += 1;
    curr.ratingSum += p.rating;
    curr.discSum += p.discount_percentage;
    curr.reviews += p.rating_count;
    subCategoryMap.set(key, curr);
  });

  let subCategories = Array.from(subCategoryMap.values()).map(data => ({
    name: data.sub,
    mainCategory: data.main,
    count: data.count,
    avgRating: Number((data.ratingSum / data.count).toFixed(2)),
    avgDiscount: Number((data.discSum / data.count).toFixed(1)),
    totalReviews: data.reviews
  }));

  if (selectedCat !== 'All') {
    subCategories = subCategories.filter(s => s.mainCategory === selectedCat);
  }

  // Sorting
  subCategories.sort((a, b) => {
    if (sortBy === 'rating') return b.avgRating - a.avgRating;
    if (sortBy === 'discount') return b.avgDiscount - a.avgDiscount;
    if (sortBy === 'reviews') return b.totalReviews - a.totalReviews;
    return b.count - a.count;
  });

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="bg-[#16181D] border border-white/10 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm mb-1">
          <Layers className="w-4 h-4" />
          <span>Category & Subcategory Performance Analytics</span>
        </div>
        <p className="text-xs text-slate-400">
          Deep dive into specific subcategories to analyze review density, promotional discounts, and rating trends across product verticals.
        </p>
      </div>

      {/* Main Categories Bar Chart */}
      <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center uppercase tracking-wider">
          <Star className="w-4 h-4 mr-1.5 text-amber-400" />
          Average Customer Rating by Main Category
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categorySummaries}>
              <XAxis dataKey="category" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis domain={[3.0, 5.0]} stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0A0B', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#F8FAFC' }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              />
              <Bar dataKey="avgRating" fill="#6366F1" radius={[8, 8, 0, 0]}>
                {categorySummaries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.avgRating >= 4.3 ? '#10B981' : '#6366F1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subcategory Exploration Table with Controls */}
      <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-xs text-slate-400 font-medium">Filter Main Category:</label>
            <select
              id="subcat-main-filter"
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value)}
              className="bg-[#0A0A0B] border border-white/10 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Categories</option>
              {categorySummaries.map((cat, idx) => (
                <option key={idx} value={cat.category}>{cat.category}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium flex items-center">
              <ArrowUpDown className="w-3 h-3 mr-1" /> Sort By:
            </span>
            <div className="bg-[#0A0A0B] border border-white/10 p-1 rounded-xl text-xs flex space-x-1">
              <button
                id="sort-count-btn"
                onClick={() => setSortBy('count')}
                className={`px-2.5 py-1 rounded-lg transition ${sortBy === 'count' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                Volume
              </button>
              <button
                id="sort-rating-btn"
                onClick={() => setSortBy('rating')}
                className={`px-2.5 py-1 rounded-lg transition ${sortBy === 'rating' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                Rating
              </button>
              <button
                id="sort-discount-btn"
                onClick={() => setSortBy('discount')}
                className={`px-2.5 py-1 rounded-lg transition ${sortBy === 'discount' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                Discount
              </button>
            </div>
          </div>
        </div>

        {/* Subcategory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A0A0B] text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-3.5 py-3 rounded-l-xl">Subcategory</th>
                <th className="px-3.5 py-3">Main Category</th>
                <th className="px-3.5 py-3">Product Count</th>
                <th className="px-3.5 py-3">Avg Rating</th>
                <th className="px-3.5 py-3">Avg Discount</th>
                <th className="px-3.5 py-3 rounded-r-xl">Total Reviews</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {subCategories.map((sub, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition">
                  <td className="px-3.5 py-3 font-bold text-white">{sub.name}</td>
                  <td className="px-3.5 py-3 text-slate-400">{sub.mainCategory}</td>
                  <td className="px-3.5 py-3">{sub.count}</td>
                  <td className="px-3.5 py-3">
                    <span className="text-amber-400 font-semibold">{sub.avgRating} ★</span>
                  </td>
                  <td className="px-3.5 py-3 text-emerald-400 font-medium">{sub.avgDiscount}%</td>
                  <td className="px-3.5 py-3 text-slate-300">{sub.totalReviews.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
