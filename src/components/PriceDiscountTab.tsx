import React from 'react';
import { AmazonProduct, PriceTierCount, CategorySummary } from '../types';
import { USD_EXCHANGE_RATE } from '../data/amazonSalesData';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Tag, DollarSign, Percent, ArrowUpRight } from 'lucide-react';

interface PriceDiscountTabProps {
  products: AmazonProduct[];
  priceTiers: PriceTierCount[];
  categorySummaries: CategorySummary[];
  currency: 'INR' | 'USD';
}

export const PriceDiscountTab: React.FC<PriceDiscountTabProps> = ({
  products,
  priceTiers,
  categorySummaries,
  currency
}) => {
  const formatPrice = (priceINR: number) => {
    if (currency === 'USD') {
      return `$${(priceINR * USD_EXCHANGE_RATE).toFixed(2)}`;
    }
    return `₹${priceINR.toLocaleString('en-IN')}`;
  };

  // Scatter data: Actual vs Discounted Price
  const scatterData = products.map(p => ({
    name: p.product_name,
    actual: currency === 'USD' ? Number((p.actual_price_inr * USD_EXCHANGE_RATE).toFixed(2)) : p.actual_price_inr,
    discounted: currency === 'USD' ? Number((p.discounted_price_inr * USD_EXCHANGE_RATE).toFixed(2)) : p.discounted_price_inr,
    discountPercent: p.discount_percentage,
    category: p.main_category
  }));

  // Category discount comparison
  const categoryDiscountData = categorySummaries.map(c => ({
    category: c.category,
    avgDiscount: c.avgDiscountPercent
  }));

  return (
    <div className="space-y-6">
      
      {/* Title & Info Banner */}
      <div className="bg-[#16181D] border border-white/10 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm mb-1">
          <Tag className="w-4 h-4" />
          <span>Price Structure & Discount Strategy Analysis</span>
        </div>
        <p className="text-xs text-slate-400">
          Explores the exact pricing dynamics, actual list prices vs sale prices, discount percentages across categories, and price tier volume distributions.
        </p>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Actual Price vs Discounted Price Scatter Plot */}
        <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center uppercase tracking-wider">
                <DollarSign className="w-4 h-4 mr-1 text-emerald-400" />
                Actual Price vs. Discounted Price (r = 0.97)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Shows linear relationship between original list price and discounted price</p>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-medium">
              Strong Correlation
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <XAxis
                  type="number"
                  dataKey="actual"
                  name="Actual Price"
                  unit={currency === 'USD' ? '$' : '₹'}
                  stroke="#94A3B8"
                  fontSize={11}
                />
                <YAxis
                  type="number"
                  dataKey="discounted"
                  name="Discounted Price"
                  unit={currency === 'USD' ? '$' : '₹'}
                  stroke="#94A3B8"
                  fontSize={11}
                />
                <ZAxis dataKey="discountPercent" range={[40, 400]} name="Discount %" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#0A0A0B] border border-white/10 p-3.5 rounded-2xl shadow-xl text-xs max-w-xs">
                          <p className="font-bold text-white mb-1">{data.name}</p>
                          <p className="text-slate-400">Category: <span className="text-slate-200">{data.category}</span></p>
                          <p className="text-slate-400">Actual Price: <span className="text-slate-200">{currency === 'USD' ? '$' : '₹'}{data.actual}</span></p>
                          <p className="text-emerald-400 font-semibold">Discounted Price: {currency === 'USD' ? '$' : '₹'}{data.discounted}</p>
                          <p className="text-amber-400 font-bold">Discount: {data.discountPercent}% OFF</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Products" data={scatterData} fill="#10B981" opacity={0.7} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Avg Discount % by Category Bar Chart */}
        <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center uppercase tracking-wider">
                <Percent className="w-4 h-4 mr-1 text-amber-400" />
                Average Discount % by Category
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Compares promotional depth across major Amazon product lines</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDiscountData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" stroke="#94A3B8" fontSize={11} unit="%" />
                <YAxis type="category" dataKey="category" stroke="#94A3B8" fontSize={11} width={110} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0A0B', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#F8FAFC' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="avgDiscount" fill="#F59E0B" radius={[0, 6, 6, 0]}>
                  {categoryDiscountData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Price Tier Distribution Grid */}
      <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-white mb-1 flex items-center uppercase tracking-wider">
          <ArrowUpRight className="w-4 h-4 mr-1 text-cyan-400" />
          Price Tier Breakdown & Rating Consistency
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Distribution of product inventory across price brackets and how average customer ratings hold up in higher price tiers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {priceTiers.map((tier, idx) => (
            <div key={idx} className="bg-[#0A0A0B] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">{tier.tier}</span>
                <div className="text-2xl font-bold text-white mb-1">{tier.count} <span className="text-xs font-normal text-slate-500">items</span></div>
              </div>
              <div className="mt-3 pt-2 border-t border-white/5 text-[11px] space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Avg Rating:</span>
                  <span className="text-amber-400 font-semibold">{tier.avgRating} ★</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Avg Discount:</span>
                  <span className="text-emerald-400 font-medium">{tier.avgDiscount}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
