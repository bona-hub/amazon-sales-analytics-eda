export interface AmazonProduct {
  id: string;
  product_id: string;
  product_name: string;
  category: string;
  main_category: string;
  sub_category: string;
  discounted_price_inr: number;
  actual_price_inr: number;
  discount_percentage: number;
  rating: number;
  rating_count: number;
  about_product: string;
  user_id: string;
  user_name: string;
  review_id: string;
  review_title: string;
  review_content: string;
  img_link: string;
  product_link: string;
  sentiment_score: number; // -1 to +1
  sentiment_label: 'Positive' | 'Neutral' | 'Negative';
  savings_inr: number;
}

export interface DatasetStats {
  totalProducts: number;
  avgRating: number;
  avgDiscountPercent: number;
  avgDiscountedPriceINR: number;
  avgActualPriceINR: number;
  totalReviewsCount: number;
  totalCategoriesCount: number;
  totalMainCategoriesCount: number;
  highestDiscountProduct: AmazonProduct;
  mostReviewedProduct: AmazonProduct;
  highestRatedProduct: AmazonProduct;
}

export interface FilterState {
  searchQuery: string;
  mainCategory: string;
  subCategory: string;
  minPriceINR: number;
  maxPriceINR: number;
  minDiscount: number;
  maxDiscount: number;
  minRating: number;
  minRatingCount: number;
  sentimentFilter: 'All' | 'Positive' | 'Neutral' | 'Negative';
  currency: 'INR' | 'USD';
  preset: 'all' | 'high_rated' | 'mega_discount' | 'top_reviewed' | 'tech' | 'home';
}

export interface CategorySummary {
  category: string;
  productCount: number;
  avgRating: number;
  avgDiscountPercent: number;
  avgPriceINR: number;
  totalReviews: number;
}

export interface PriceTierCount {
  tier: string;
  count: number;
  avgRating: number;
  avgDiscount: number;
}

export interface SentimentDistribution {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface KeywordFrequency {
  text: string;
  value: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export interface CorrelationMetric {
  var1: string;
  var2: string;
  value: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
