import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Assistant Query Endpoint for Amazon Sales Dataset
  app.post('/api/chat', async (req, res) => {
    try {
      const { prompt, datasetContext } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const ai = getAiClient();
      if (!ai) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY environment variable is missing on the server.',
        });
      }

      const systemInstruction = `You are an expert Data Scientist and E-Commerce Analytics Specialist analyzing the Kaggle Amazon Sales Dataset (1,465 products, EDA by Mehak Iftikhar).
Your job is to answer queries about product ratings, price correlations, discount strategies, category performance, sentiment polarity, and e-commerce growth tactics clearly, with precise data-backed reasoning.

Key dataset facts:
- Total products: 1,465 items across Electronics, Computers & Accessories, Home & Kitchen, Office Products, etc.
- Average rating: 4.10 / 5.0 (clustered between 3.8 and 4.5).
- Average discount: 47.6% (ranging up to 90%).
- Correlation: Strong positive correlation (r = 0.97) between actual price and discounted price.
- Rating vs Discount correlation: Almost zero association (r ≈ 0.05), proving deeper discounts do NOT buy higher ratings.
- Top Categories by rating: Tablets, Networking Devices, Photography Accessories, Media Streaming Devices, Calculators.
- Sentiment Polarity: TextBlob sentiment analysis shows 82% positive, 12% neutral, 6% negative customer feedback.

Format your response cleanly with markdown, clear bullet points, key metrics in bold, and actionable e-commerce insights.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: datasetContext 
          ? `Dataset summary context:\n${JSON.stringify(datasetContext)}\n\nUser Question: ${prompt}`
          : prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ answer: response.text });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        error: error.message || 'An error occurred while generating AI analysis.',
      });
    }
  });

  // Vite middleware in dev, static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Amazon Sales Analytics Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
