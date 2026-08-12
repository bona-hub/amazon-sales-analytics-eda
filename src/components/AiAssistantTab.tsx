import React, { useState } from 'react';
import { ChatMessage, DatasetStats } from '../types';
import { Sparkles, Send, Bot, User, RefreshCw, HelpCircle } from 'lucide-react';

interface AiAssistantTabProps {
  stats: DatasetStats;
}

export const AiAssistantTab: React.FC<AiAssistantTabProps> = ({ stats }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_0',
      sender: 'assistant',
      text: `Hello! I am your **Amazon Sales Data Analyst AI Assistant** powered by Gemini 3.6 Flash. 

I can answer any questions about the **1,465 products Kaggle dataset**, price correlations, customer review sentiments, top categories, and e-commerce pricing strategy.

Try asking one of the prompt chips below or type your custom question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const promptChips = [
    'Explain the correlation between actual price, discounted price, and ratings.',
    'What are the top 3 highest rated product categories in this dataset?',
    'Why do high discounts (60-90%) fail to increase customer ratings?',
    'Summarize customer sentiment findings from TextBlob review analysis.',
    'Give 3 actionable pricing recommendations for e-commerce sellers based on this EDA.'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          datasetContext: {
            totalProducts: stats.totalProducts,
            avgRating: stats.avgRating,
            avgDiscountPercent: stats.avgDiscountPercent,
            avgPriceINR: stats.avgDiscountedPriceINR,
            topMainCategory: 'Electronics & Computers'
          }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch AI response');
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'No answer received.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ **Error**: ${err.message || 'Could not connect to server AI API.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-[#16181D] border border-white/10 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm mb-1">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Gemini 3.6 Flash Dataset Analyst</span>
        </div>
        <p className="text-xs text-slate-300">
          Ask natural language questions about patterns, category insights, discount elasticity, and review sentiment in the Amazon Sales dataset.
        </p>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-[#16181D] border border-white/5 rounded-3xl shadow-sm flex flex-col h-[520px] overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`p-2.5 rounded-2xl flex-shrink-0 text-white ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-[#0A0A0B] text-indigo-400 border border-white/10'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600/10 border border-indigo-500/30 text-slate-100'
                    : 'bg-[#0A0A0B] border border-white/5 text-slate-200'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className="text-[10px] text-slate-500 text-right mt-2">{msg.timestamp}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-indigo-400 bg-[#0A0A0B] p-3.5 rounded-2xl border border-white/10 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Kaggle dataset & formulating answer...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-5 py-2.5 bg-[#0A0A0B] border-t border-white/5 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-slate-500 text-[11px] font-medium flex items-center flex-shrink-0">
            <HelpCircle className="w-3 h-3 mr-1 text-indigo-400" /> Prompts:
          </span>
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="bg-[#16181D] border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 px-3 py-1 rounded-xl text-[11px] whitespace-nowrap transition"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-[#0A0A0B] border-t border-white/5 flex items-center space-x-2">
          <input
            id="chat-input"
            type="text"
            placeholder="Ask AI about dataset ratings, prices, discount trends..."
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#16181D] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            id="send-chat-btn"
            onClick={() => handleSend()}
            disabled={isLoading || !inputPrompt.trim()}
            className="bg-indigo-600 text-white p-2.5 rounded-2xl hover:bg-indigo-500 disabled:opacity-40 transition shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
