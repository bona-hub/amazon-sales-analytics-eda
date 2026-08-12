import React, { useState } from 'react';
import { AmazonProduct, FilterState } from '../types';
import { USD_EXCHANGE_RATE } from '../data/amazonSalesData';
import { ExternalLink, Star, ChevronDown, ChevronUp, Layers, CheckSquare, Square, X, ArrowUpDown, Sparkles, ShoppingBag } from 'lucide-react';

interface ProductExplorerTabProps {
  products: AmazonProduct[];
  filters: FilterState;
  currency: 'INR' | 'USD';
}

export const ProductExplorerTab: React.FC<ProductExplorerTabProps> = ({
  products,
  currency
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<AmazonProduct[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  
  const [sortField, setSortField] = useState<'rating' | 'discount_percentage' | 'discounted_price_inr' | 'rating_count'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [page, setPage] = useState<number>(1);
  const pageSize = 12;

  const formatPrice = (priceINR: number) => {
    if (currency === 'USD') {
      return `$${(priceINR * USD_EXCHANGE_RATE).toFixed(2)}`;
    }
    return `₹${priceINR.toLocaleString('en-IN')}`;
  };

  const toggleCompare = (product: AmazonProduct) => {
    if (compareList.some(p => p.id === product.id)) {
      setCompareList(prev => prev.filter(p => p.id !== product.id));
    } else {
      if (compareList.length >= 4) {
        alert('You can compare a maximum of 4 products at once.');
        return;
      }
      setCompareList(prev => [...prev, product]);
    }
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (sortOrder === 'asc') return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedProducts.length / pageSize) || 1;
  const paginatedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize);

  const handleSortChange = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Comparison Control Bar */}
      <div className="bg-[#16181D] border border-white/10 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4 mr-2 text-amber-400" />
            Interactive Product Explorer & Dataset Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Filter, search, inspect individual customer review contents, and select up to 4 items for side-by-side metric comparison.
          </p>
        </div>

        {compareList.length > 0 && (
          <div className="flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 p-2.5 rounded-2xl text-xs">
            <span className="text-indigo-300 font-semibold">{compareList.length} items selected</span>
            <button
              id="open-compare-modal-btn"
              onClick={() => setShowCompareModal(true)}
              className="bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-xl hover:bg-indigo-500 transition shadow-md"
            >
              Compare Side-by-Side
            </button>
            <button
              id="clear-compare-btn"
              onClick={() => setCompareList([])}
              className="text-slate-400 hover:text-white p-1"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Datatable */}
      <div className="bg-[#16181D] border border-white/5 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A0A0B] text-slate-400 uppercase tracking-wider font-semibold border-b border-white/5">
              <tr>
                <th className="px-3.5 py-3.5 w-10 text-center">Compare</th>
                <th className="px-3.5 py-3.5">Product</th>
                <th className="px-3.5 py-3.5">Category</th>
                <th
                  className="px-3.5 py-3.5 cursor-pointer hover:text-white transition"
                  onClick={() => handleSortChange('discounted_price_inr')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  className="px-3.5 py-3.5 cursor-pointer hover:text-white transition"
                  onClick={() => handleSortChange('discount_percentage')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Discount</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  className="px-3.5 py-3.5 cursor-pointer hover:text-white transition"
                  onClick={() => handleSortChange('rating')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Rating</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  className="px-3.5 py-3.5 cursor-pointer hover:text-white transition"
                  onClick={() => handleSortChange('rating_count')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Reviews</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="px-3.5 py-3.5">Sentiment</th>
                <th className="px-3.5 py-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {paginatedProducts.map((prod) => {
                const isSelected = compareList.some(p => p.id === prod.id);
                const isExpanded = expandedId === prod.id;

                return (
                  <React.Fragment key={prod.id}>
                    <tr className={`hover:bg-white/5 transition ${isExpanded ? 'bg-white/5' : ''}`}>
                      
                      {/* Select for Compare */}
                      <td className="px-3.5 py-3.5 text-center">
                        <button
                          onClick={() => toggleCompare(prod)}
                          className="text-slate-400 hover:text-indigo-400 transition"
                          title="Add to comparison tray"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                          )}
                        </button>
                      </td>

                      {/* Product Name & Image */}
                      <td className="px-3.5 py-3.5">
                        <div className="flex items-center space-x-3">
                          <img
                            src={prod.img_link}
                            alt={prod.product_name}
                            className="w-10 h-10 object-cover rounded-xl bg-slate-800 border border-white/10 flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80');
                            }}
                          />
                          <div className="min-w-0 max-w-xs">
                            <div className="font-bold text-white truncate" title={prod.product_name}>
                              {prod.product_name}
                            </div>
                            <div className="text-[10px] text-slate-400">ID: {prod.product_id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-3.5 py-3.5 text-slate-300">
                        <span className="bg-[#0A0A0B] text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-white/5">
                          {prod.main_category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-3.5 py-3.5">
                        <div className="font-bold text-white">{formatPrice(prod.discounted_price_inr)}</div>
                        {prod.actual_price_inr > prod.discounted_price_inr && (
                          <div className="text-[10px] text-slate-500 line-through">{formatPrice(prod.actual_price_inr)}</div>
                        )}
                      </td>

                      {/* Discount % */}
                      <td className="px-3.5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                          prod.discount_percentage >= 60 
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                            : 'bg-white/5 text-slate-300 border-white/10'
                        }`}>
                          {prod.discount_percentage}% OFF
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="px-3.5 py-3.5">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-amber-300">{prod.rating}</span>
                        </div>
                      </td>

                      {/* Review Count */}
                      <td className="px-3.5 py-3.5 text-slate-300 font-medium">
                        {prod.rating_count.toLocaleString()}
                      </td>

                      {/* Sentiment Label */}
                      <td className="px-3.5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${
                          prod.sentiment_label === 'Positive'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : (prod.sentiment_label === 'Negative'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30')
                        }`}>
                          {prod.sentiment_label}
                        </span>
                      </td>

                      {/* Expand Details Toggle */}
                      <td className="px-3.5 py-3.5 text-right">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : prod.id)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition border border-white/5"
                          title="Toggle review details"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>

                    </tr>

                    {/* Row Expander Details */}
                    {isExpanded && (
                      <tr className="bg-[#0A0A0B]">
                        <td colSpan={9} className="p-5 border-t border-b border-white/5">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-2">
                              <h5 className="font-semibold text-white flex items-center">
                                <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-400" /> About Product:
                              </h5>
                              <p className="text-slate-300 leading-relaxed bg-[#16181D] p-3.5 rounded-2xl border border-white/5">
                                {prod.about_product}
                              </p>
                              <div className="flex items-center space-x-3 text-slate-400 pt-1">
                                <span>Savings: <strong className="text-emerald-400">{formatPrice(prod.savings_inr)}</strong></span>
                                <span>•</span>
                                <a
                                  href={prod.product_link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-indigo-400 hover:underline inline-flex items-center font-medium"
                                >
                                  Amazon Page <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h5 className="font-semibold text-white flex items-center">
                                <Layers className="w-3.5 h-3.5 mr-1 text-purple-400" /> Customer Review Sample:
                              </h5>
                              <div className="bg-[#16181D] p-3.5 rounded-2xl border border-white/5 space-y-1">
                                <p className="font-bold text-white">"{prod.review_title}"</p>
                                <p className="text-slate-300 italic">{prod.review_content}</p>
                                <p className="text-[10px] text-slate-500 pt-1">— {prod.user_name} (Verified Purchase)</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-[#0A0A0B] px-5 py-3.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>
            Page <strong className="text-white">{page}</strong> of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3.5 py-1.5 bg-[#16181D] rounded-xl hover:bg-white/10 disabled:opacity-40 transition border border-white/5"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3.5 py-1.5 bg-[#16181D] rounded-xl hover:bg-white/10 disabled:opacity-40 transition border border-white/5"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && compareList.length > 0 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#16181D] border border-white/10 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-indigo-400" /> Side-by-Side Product Comparison
              </h3>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {compareList.map((item) => (
                <div key={item.id} className="bg-[#0A0A0B] border border-white/5 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <img
                      src={item.img_link}
                      alt={item.product_name}
                      className="w-full h-32 object-cover rounded-xl bg-slate-900 mb-2 border border-white/10"
                    />
                    <h4 className="font-bold text-xs text-white line-clamp-2">{item.product_name}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">{item.main_category}</p>
                  </div>

                  <div className="space-y-2 text-xs pt-2 border-t border-white/5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Discounted Price:</span>
                      <span className="font-bold text-emerald-400">{formatPrice(item.discounted_price_inr)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">List Price:</span>
                      <span className="line-through text-slate-500">{formatPrice(item.actual_price_inr)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Discount %:</span>
                      <span className="font-bold text-amber-400">{item.discount_percentage}% OFF</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Customer Rating:</span>
                      <span className="font-bold text-amber-300">{item.rating} ★</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Review Count:</span>
                      <span className="text-slate-200">{item.rating_count.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sentiment:</span>
                      <span className="font-semibold text-emerald-400">{item.sentiment_label}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCompare(item)}
                    className="w-full text-center py-1.5 text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 rounded-xl hover:bg-rose-900/60 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
