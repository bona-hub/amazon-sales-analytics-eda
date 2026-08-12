import React from 'react';
import { AmazonProduct } from '../types';
import { CALCULATED_CORRELATIONS, USD_EXCHANGE_RATE } from '../data/amazonSalesData';
import { Grid, Sparkles, Sigma } from 'lucide-react';

interface CorrelationTabProps {
  products: AmazonProduct[];
  currency: 'INR' | 'USD';
}

export const CorrelationTab: React.FC<CorrelationTabProps> = ({ products, currency }) => {
  const variables = ['Actual Price', 'Discounted Price', 'Discount %', 'Rating', 'Rating Count'];

  const getCorrValue = (var1: string, var2: string) => {
    if (var1 === var2) return 1.0;
    const match = CALCULATED_CORRELATIONS.find(
      c => (c.var1 === var1 && c.var2 === var2) || (c.var1 === var2 && c.var2 === var1)
    );
    return match ? match.value : 0.0;
  };

  const getColorClass = (val: number) => {
    if (val === 1.0) return 'bg-amber-500/20 text-amber-300 font-bold border-amber-500/40';
    if (val >= 0.7) return 'bg-emerald-500/30 text-emerald-200 font-bold border-emerald-500/50';
    if (val >= 0.2) return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
    if (val <= -0.1) return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    return 'bg-slate-800 text-slate-300 border-slate-700';
  };

  // Helper to compute quartiles
  const getStatsForField = (field: keyof AmazonProduct) => {
    const vals = products.map(p => Number(p[field])).sort((a, b) => a - b);
    const n = vals.length;
    if (n === 0) return { mean: 0, min: 0, q25: 0, median: 0, q75: 0, max: 0 };

    const sum = vals.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const min = vals[0];
    const max = vals[n - 1];
    const q25 = vals[Math.floor(n * 0.25)];
    const median = vals[Math.floor(n * 0.5)];
    const q75 = vals[Math.floor(n * 0.75)];

    return { mean, min, q25, median, q75, max };
  };

  const priceMult = currency === 'USD' ? USD_EXCHANGE_RATE : 1;
  const currSymbol = currency === 'USD' ? '$' : '₹';

  const statsTable = [
    { name: `Actual Price (${currSymbol})`, stats: getStatsForField('actual_price_inr'), isPrice: true },
    { name: `Discounted Price (${currSymbol})`, stats: getStatsForField('discounted_price_inr'), isPrice: true },
    { name: 'Discount %', stats: getStatsForField('discount_percentage'), isPrice: false },
    { name: 'Customer Rating (1-5★)', stats: getStatsForField('rating'), isPrice: false },
    { name: 'Rating Count (Reviews)', stats: getStatsForField('rating_count'), isPrice: false },
  ];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="bg-[#16181D] border border-white/10 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm mb-1">
          <Grid className="w-4 h-4" />
          <span>Statistical EDA & Correlation Matrix (Pearson r)</span>
        </div>
        <p className="text-xs text-slate-400">
          Pearson correlation coefficients measure the linear association between continuous variables in the Amazon Sales Dataset.
        </p>
      </div>

      {/* Correlation Heatmap Grid */}
      <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center uppercase tracking-wider">
          <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
          Pearson Correlation Heatmap Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs">
            <thead>
              <tr>
                <th className="p-3 text-left text-slate-400 font-medium">Variable</th>
                {variables.map((v, i) => (
                  <th key={i} className="p-3 text-slate-300 font-semibold max-w-[100px] truncate">{v}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {variables.map((v1, i) => (
                <tr key={i}>
                  <td className="p-3 text-left font-bold text-white">{v1}</td>
                  {variables.map((v2, j) => {
                    const corr = getCorrValue(v1, v2);
                    return (
                      <td key={j} className="p-2">
                        <div className={`p-2.5 rounded-xl border text-xs transition ${getColorClass(corr)}`}>
                          {corr > 0 ? `+${corr.toFixed(2)}` : corr.toFixed(2)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Interpretation: <strong className="text-emerald-400">+1.0</strong> Perfect Positive | <strong className="text-slate-300">0.0</strong> No Correlation | <strong className="text-rose-400">-1.0</strong> Negative</span>
        </div>
      </div>

      {/* Quartiles & Percentiles Statistical Summary */}
      <div className="bg-[#16181D] border border-white/5 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center uppercase tracking-wider">
          <Sigma className="w-4 h-4 mr-2 text-cyan-400" />
          Dataset Quartiles & Five-Number Summary
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A0A0B] text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-3.5 py-3 rounded-l-xl">Metric Variable</th>
                <th className="px-3.5 py-3">Mean</th>
                <th className="px-3.5 py-3">Min</th>
                <th className="px-3.5 py-3">25th % (Q1)</th>
                <th className="px-3.5 py-3">Median (Q2)</th>
                <th className="px-3.5 py-3">75th % (Q3)</th>
                <th className="px-3.5 py-3 rounded-r-xl">Max</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {statsTable.map((row, idx) => {
                const mult = row.isPrice ? priceMult : 1;
                const fmt = (v: number) => row.isPrice ? `${currSymbol}${Math.round(v * mult).toLocaleString()}` : v.toLocaleString(undefined, { maximumFractionDigits: 2 });

                return (
                  <tr key={idx} className="hover:bg-white/5 transition">
                    <td className="px-3.5 py-3 font-bold text-white">{row.name}</td>
                    <td className="px-3.5 py-3 text-amber-400 font-semibold">{fmt(row.stats.mean)}</td>
                    <td className="px-3.5 py-3 text-slate-400">{fmt(row.stats.min)}</td>
                    <td className="px-3.5 py-3 text-slate-300">{fmt(row.stats.q25)}</td>
                    <td className="px-3.5 py-3 text-emerald-400 font-medium">{fmt(row.stats.median)}</td>
                    <td className="px-3.5 py-3 text-slate-300">{fmt(row.stats.q75)}</td>
                    <td className="px-3.5 py-3 text-purple-400 font-semibold">{fmt(row.stats.max)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
