import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Bot, User, X, Send, Minus } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

//frontend/src/components/FloatingChatbot.jsx
export default function FloatingChatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // New: Maintain context locally
  const [context, setContext] = useState({
    scalp: null,
    hair: null,
    concerns: []
  });

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const popupTimerRef = useRef(null);

  // Initial greeting
  useEffect(() => {
    // Only greet if empty
    if (messages.length === 0) {
      setMessages([{ sender: "bot", text: "Hi 👋 I'm your haircare assistant. How can I help you today?" }]);
    }
  }, []);

  const sendMessage = async () => {
    const query = input.trim();
    if (!query) return;

    // Add User Message
    setMessages(prev => [...prev, { sender: "user", text: query }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        message: query,
        context: context, // Send current knowledge
      });

      const { reply, context: newContext, products } = res.data;

      // Update context with what backend learned
      if (newContext) setContext(newContext);

      // Add Bot Reply
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: reply }]);
      }, 500);

      // Add Products if any
      if (products && products.length > 0) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              sender: "productGroup",
              products: products
            }
          ]);
        }, 1200);
      }

    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { sender: "bot", text: "⚠️ Sorry, I lost my connection. Please try again." }]);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  // Popup logic
  useEffect(() => {
    if (!isChatOpen) {
      const timer = setTimeout(() => setPopupVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  // ... rest of render ... (only helper functions removed)


  return (
    <>
      {/* Floating Trigger */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
          >
            {popupVisible && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-lg mb-2 relative max-w-[200px]"
              >
                <button onClick={() => setPopupVisible(false)} className="absolute -top-2 -right-2 bg-slate-200 rounded-full p-0.5"><X size={12} /></button>
                <p className="text-xs text-slate-700 dark:text-slate-300">👋 Need help picking a shampoo?</p>
              </motion.div>
            )}
            <button
              onClick={() => setIsChatOpen(true)}
              className="h-14 w-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-glow flex items-center justify-center transition-transform hover:scale-105"
            >
              <MessageCircle className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Hair Assistant</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <Minus size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-dark-card">
              {messages.map((msg, i) => {
                if (msg.sender === "productGroup") {
                  return (
                    <div key={i} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {msg.products.map((p, pIdx) => (
                        <div key={p._id || pIdx} className="min-w-[200px] p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shrink-0">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate">{p.name}</h4>
                          <p className="text-xs text-brand-600 dark:text-brand-400 font-medium my-1">₹{p.price}</p>
                          <button
                            onClick={() => setSelectedProduct(p)}
                            className="w-full mt-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium rounded-lg hover:border-brand-500 transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }

                const isUser = msg.sender === "user";
                return (
                  <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${isUser
                      ? "bg-brand-600 text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-bl-none"
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800/80 p-3 rounded-2xl rounded-bl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                ref={inputRef}
                className="flex-1 bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-brand-500 outline-none dark:text-white"
                placeholder="Type..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>

            {/* Product Modal Overlay */}
            <AnimatePresence>
              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm z-10 p-6 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{selectedProduct.name}</h3>
                    <button onClick={() => setSelectedProduct(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-4 overflow-y-auto flex-1 scrollbar-hide">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs rounded-md font-medium">
                        {selectedProduct.category}
                      </span>
                      <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md font-medium">
                        ₹{selectedProduct.price}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedProduct.notes || "No description available."}
                    </p>
                    {selectedProduct.ingredients && (
                      <div>
                        <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Key Ingredients</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedProduct.ingredients.map((ing, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
