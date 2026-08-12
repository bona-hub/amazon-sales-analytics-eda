import React from 'react';
import { DatasetStats } from '../types';
import { USD_EXCHANGE_RATE } from '../data/amazonSalesData';
import { Package, Star, Tag, MessageSquare, TrendingUp, Sparkles } from 'lucide-react';

interface KPICardsProps {
  stats: DatasetStats;
  currency: 'INR' | 'USD';
}

export const KPICards: React.FC<KPICardsProps> = ({ stats, currency }) => {
  const formatPrice = (priceINR: number) => {
    if (currency === 'USD') {
      return `$${(priceINR * USD_EXCHANGE_RATE).toFixed(2)}`;
    }
    return `₹${priceINR.toLocaleString('en-IN')}`;
  };

  const cards = [
    {
      title: 'Total Analyzed Products',
      value: stats.totalProducts.toLocaleString(),
      subtitle: `${stats.totalMainCategoriesCount} Main Categories`,
      icon: Package,
      badge: 'Dataset Size',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Average Customer Rating',
      value: `${stats.avgRating} / 5.0`,
      subtitle: 'Clustered around 4.1★',
      icon: Star,
      badge: 'High Sentiment',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      title: 'Average Discount %',
      value: `${stats.avgDiscountPercent}%`,
      subtitle: 'Up to 93% max discount',
      icon: Tag,
      badge: 'Avg Savings',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Total Customer Reviews',
      value: (stats.totalReviewsCount / 1000000).toFixed(2) + ' Million',
      subtitle: 'Massive review volume',
      icon: MessageSquare,
      badge: 'User Engagement',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    },
    {
      title: 'Avg Discounted Price',
      value: formatPrice(stats.avgDiscountedPriceINR),
      subtitle: `Avg list price: ${formatPrice(stats.avgActualPriceINR)}`,
      icon: TrendingUp,
      badge: 'Price Benchmark',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
    },
    {
      title: 'Top Discount Item',
      value: `${stats.highestDiscountProduct.discount_percentage}% OFF`,
      subtitle: stats.highestDiscountProduct.product_name.substring(0, 32) + '...',
      icon: Sparkles,
      badge: 'Max Savings',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="bg-[#16181D] border border-white/5 rounded-2xl p-4 shadow-sm hover:border-white/20 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${card.badgeColor}`}>
                  {card.badge}
                </span>
                <div className="p-1.5 bg-white/5 border border-white/5 rounded-lg text-slate-300">
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{card.title}</h3>
              <div className="text-2xl font-bold text-white tracking-tight">{card.value}</div>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 truncate font-normal">
              {card.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
};
