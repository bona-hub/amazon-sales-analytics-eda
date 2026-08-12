# Amazon Sales Analytics & EDA Dashboard 📊

An interactive, full-stack Exploratory Data Analysis (EDA) application and intelligence dashboard analyzing **1,465+ Amazon products**. Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Recharts**, **Express**, and **Google Gemini 3.6 Flash**.

Based on the popular Kaggle Amazon Sales Dataset ([EDA Notebook by Mehak Iftikhar](https://www.kaggle.com/code/mehakiftikhar/amazon-sales-dataset-eda)).

---

## ✨ Features & Capabilities

### 📈 1. Executive Overview & EDA Insights
- **Key KPIs**: Total product catalog count, average discounted price, average list price, average rating, and overall discount rate.
- **Interactive Histograms**: Rating distribution analysis ($<3.5\bigstar$ to $5.0\bigstar$).
- **Category Donut Chart**: Top Amazon product category volume distribution.
- **Kaggle Insights Summary**: Highlights statistical findings like the $r = 0.97$ price correlation and rating-vs-discount independence.

### 🏷️ 2. Price & Discount Strategy Analysis
- **Price Correlation Scatter Plot**: Visualizes the direct linear relationship ($r = 0.97$) between list prices and discounted prices.
- **Category Discount Depth**: Horizontal bar chart comparing average promotional discounts across categories.
- **Price Tier Distribution**: Breakdown of inventory count and customer satisfaction across 5 price bands (Budget to Ultra-Premium).

### ⭐ 3. Ratings & Review Sentiment (NLP)
- **Discount vs. Rating Correlation**: Scatter plot showing that deeper discounts do not artificially inflate customer review scores ($r = -0.05$).
- **TextBlob Sentiment Classification**: Sentiment polarity breakdown (Positive, Neutral, Negative).
- **Clickable Keyword Cloud**: Frequently mentioned review keywords (e.g., *"durable"*, *"fast charging"*, *"value"*) that act as instant product filters.

### 📦 4. Category & Subcategory Benchmarks
- **Main Category Rating Bar Chart**: Benchmark customer satisfaction across categories.
- **Subcategory Matrix**: Sortable data view by volume, rating, discount depth, or review volume.

### 🔍 5. Interactive Product Explorer & Side-by-Side Comparison
- **Filter & Search**: Full-text search across product titles, descriptions, and user reviews.
- **Preset Quick Filters**: High Rated ($\ge 4.4\bigstar$), Mega Discounts ($\ge 60\%$), Top Reviewed ($>50\text{k}$).
- **Side-by-Side Comparison Modal**: Select up to 4 products to compare specs, prices, ratings, and customer review excerpts concurrently.

### 📐 6. Statistical Matrix & Quartiles
- **Pearson Correlation Heatmap**: Interactive matrix calculating $r$ values for Actual Price, Discounted Price, Discount %, Rating, and Rating Count.
- **Five-Number Summary Table**: Mean, Min, Q1 (25th percentile), Median (Q2), Q3 (75th percentile), and Max metrics.

### 🤖 7. Gemini 3.6 Flash AI Dataset Analyst
- Integrated server-side Gemini AI proxy allowing natural language querying of dataset statistics, strategy recommendations, and product insights.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons, Recharts, Motion
- **Backend**: Express.js (Node.js runtime)
- **AI Integration**: `@google/genai` SDK (Gemini 3.6 Flash model)
- **Build Tools**: Vite 6, `esbuild`, `tsx`

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/amazon-sales-analytics-eda.git
cd amazon-sales-analytics-eda
npm install
```

### 2. Environment Setup (Optional for AI Assistant)

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

*(Note: The rest of the dashboard and EDA analytical views work out of the box without an API key).*

### 3. Development Server

Start the application in local development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Deployment

### Build the Project
```bash
npm run build
```

This compiles the Vite frontend assets into `dist/` and bundles the Express server using `esbuild` into `dist/server.cjs`.

### Start Production Server
```bash
npm start
```

---

## 📁 Directory Structure

```text
├── src/
│   ├── components/       # UI Components & Dashboard Tabs
│   │   ├── Header.tsx             # Sticky Header & Search/Filter Controls
│   │   ├── KPICards.tsx           # Executive Metric Cards
│   │   ├── OverviewTab.tsx        # Overview & Kaggle EDA Insights
│   │   ├── PriceDiscountTab.tsx   # Price & Discount Depth Analysis
│   │   ├── RatingsSentimentTab.tsx# Rating Distribution & Review NLP
│   │   ├── CategoryTab.tsx       # Category & Subcategory Performance
│   │   ├── ProductExplorerTab.tsx # Product Datatable & Comparison
│   │   ├── CorrelationTab.tsx    # Heatmap & Quartile Stats
│   │   └── AiAssistantTab.tsx     # Gemini AI Dataset Assistant
│   ├── data/
│   │   └── amazonProducts.ts      # Amazon Sales Dataset Records
│   ├── types.ts                   # Shared TypeScript Interfaces
│   ├── App.tsx                    # Main App Controller
│   ├── main.tsx                   # Entry Point
│   └── index.css                  # Global Styles & Bento Themes
├── server.ts                      # Express Backend & Gemini API Proxy
├── package.json                   # Dependencies & Scripts
├── vite.config.ts                 # Vite Configuration
└── README.md                      # Documentation
```

---

## 📜 License & Acknowledgments

- **Dataset Source**: Kaggle Amazon Sales Dataset
- **Kaggle EDA Reference**: [Mehak Iftikhar's Kaggle Notebook](https://www.kaggle.com/code/mehakiftikhar/amazon-sales-dataset-eda)
