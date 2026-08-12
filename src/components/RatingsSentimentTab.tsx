import React from 'react';
import { AmazonProduct, SentimentDistribution, KeywordFrequency } from '../types';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Star, MessageCircle, Heart, Tag, Sparkles } from 'lucide-react';

interface RatingsSentimentTabProps {
  products: AmazonProduct[];
  sentimentDist: SentimentDistribution[];
  keywords: KeywordFrequency[];
  onSelectKeyword?: (word: string) => void;
}

export const RatingsSentimentTab: React.FC<RatingsSentimentTabProps> = ({
  products,
  sentimentDist,
  keywords,
  onSelectKeyword
}) => {
  // Scatter Data: Rating vs Discount %
  const ratingvsDiscountData = products.map(p => ({
    name: p.product_name,
    rating: p.rating,
    discount: p.discount_percentage,
    ratingCount: p.rating_count,
    category: p.main_category
  }));

  // Scatter Data: Rating vs Review Volume (Log representation)
  const ratingvsVolumeData = products.map(p => ({
    name: p.product_name,
    rating: p.rating,
    reviews: p.rating_count,
    category: p.main_category
  }));

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="bg-[#16181D] border border-white/10 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm mb-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Ratings Analysis & Review Sentiment Insights</span>
        </div>
        <p className="text-xs text-slate-400">
          Evaluates if heavy discounting influences customer satisfaction scores and inspects text sentiment polarity extracted from thousands of customer reviews.
        </p>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Rating vs Discount % Scatter Plot */}
        <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center uppercase tracking-wider">
                <Tag className="w-4 h-4 mr-1.5 text-amber-400" />
                Rating vs. Discount % (r = -0.05)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Tests if deeper discounts lead to higher customer ratings</p>
            </div>
            <span className="text-[10px] bg-white/5 text-slate-300 border border-white/10 px-2.5 py-1 rounded-lg font-medium">
              Near Zero Correlation
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <XAxis type="number" dataKey="discount" name="Discount %" unit="%" stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
                <YAxis type="number" dataKey="rating" name="Rating" unit="★" stroke="#94A3B8" fontSize={11} domain={[2, 5]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#0A0A0B] border border-white/10 p-3.5 rounded-2xl shadow-xl text-xs max-w-xs">
                          <p className="font-bold text-white mb-1">{data.name}</p>
                          <p className="text-amber-400 font-bold">Rating: {data.rating} ★</p>
                          <p className="text-emerald-400 font-semibold">Discount: {data.discount}% OFF</p>
                          <p className="text-slate-400">{data.ratingCount.toLocaleString()} total reviews</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Products" data={ratingvsDiscountData} fill="#F59E0B" opacity={0.75} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Distribution Pie Chart */}
        <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center uppercase tracking-wider">
                <Heart className="w-4 h-4 mr-1.5 text-rose-400" />
                TextBlob Review Sentiment Polarity
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">NLP classification of customer review content</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="label"
                  label={({ label, percentage }) => `${label.split(' ')[0]} (${percentage}%)`}
                  labelLine={false}
                >
                  {sentimentDist.map((entry, index) => (
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

      {/* Word Cloud / Review Keywords */}
      <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 mr-2 text-indigo-400" />
              Frequently Mentioned Review Keywords
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any keyword to instantly filter products in the explorer</p>
          </div>
          <span className="text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded-lg flex items-center">
            <Sparkles className="w-3 h-3 mr-1" /> Clickable Filter
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 p-4 bg-[#0A0A0B] rounded-2xl border border-white/5">
          {keywords.map((kw, idx) => {
            const sizeClass = kw.value > 80 ? 'text-sm font-bold px-3 py-1.5' : (kw.value > 50 ? 'text-xs font-semibold px-2.5 py-1' : 'text-[11px] font-medium px-2 py-0.5');
            const colorClass = kw.sentiment === 'Positive' 
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20' 
              : (kw.sentiment === 'Negative' 
                ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20' 
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10');

            return (
              <button
                key={idx}
                onClick={() => onSelectKeyword && onSelectKeyword(kw.text)}
                className={`rounded-xl border transition shadow-sm ${sizeClass} ${colorClass}`}
                title={`Filter products by keyword: ${kw.text}`}
              >
                {kw.text} <span className="opacity-60 ml-1 text-[10px]">({kw.value})</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
