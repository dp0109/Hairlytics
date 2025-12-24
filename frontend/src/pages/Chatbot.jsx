//frontend/src/pages/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Loader2, ShoppingBag, Bot, User, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm Dr. HairBot. I can analyze your hair needs. Tell me about your scalp (e.g., oily, dry) or hair type." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Context State
  const [context, setContext] = useState({
    scalp: null,
    hair: null,
    concerns: []
  });

  const chatEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const query = input;
    const newMessages = [...messages, { sender: "user", text: query }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        message: query,
        context: context // Send state
      });

      const { reply, context: newContext, products } = res.data;

      // Update learned context
      if (newContext) setContext(newContext);

      // Bot reply
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);

      // Product cards
      if (products && products.length > 0) {
        // Delay capability if we want to mimic thinking, but instant is fine here
        setMessages((prev) => [
          ...prev,
          { sender: "productGroup", products: products }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ I'm having trouble connecting to the server. Please try again later." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors pt-16 flex flex-col items-center">
      <div className="w-full max-w-4xl flex-1 flex flex-col p-4">

        <div className="flex items-center gap-3 mb-6 px-2">
          <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">AI Assistant</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Expert advice on hair care & products</p>
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft overflow-hidden flex flex-col h-[70vh]">
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => {
              if (msg.sender === "productGroup") {
                return (
                  <div key={i} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide pl-11">
                    {msg.products.map((p, idx) => (
                      <div key={idx} className="min-w-[260px] p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-1 truncate">{p.name}</h3>
                        <div className="flex gap-2 mb-3">
                          <span className="text-xs font-semibold px-2 py-0.5 bg-brand-50 text-brand-700 rounded-md">{p.category}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-green-50 text-green-700 rounded-md">₹{p.price}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-3 h-8">{p.notes || "No description."}</p>
                        <button className="mt-auto w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-300 font-medium rounded-lg text-sm transition-colors">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                );
              }

              const isUser = msg.sender === "user";
              return (
                <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[85%] ${isUser ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? "bg-brand-100 dark:bg-brand-900" : "bg-slate-100 dark:bg-slate-800"}`}>
                      {isUser ? <User className="w-4 h-4 text-brand-600 dark:text-brand-400" /> : <Bot className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${isUser
                      ? "bg-brand-600 text-white rounded-tr-sm"
                      : "bg-slate-100 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-100 dark:border-slate-800"
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-dark-card border-t border-slate-200 dark:border-slate-800">
            <div className="relative flex items-center">
              <input
                className="w-full pl-4 pr-12 py-3.5 bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-950 border focus:border-brand-500 rounded-xl outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about shampoos, dry scalp, or hair routines..."
              />
              <button
                className={`absolute right-2 p-2 rounded-lg transition-all ${input.trim()
                  ? "bg-brand-600 text-white hover:bg-brand-700 shadow-md"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                  }`}
                onClick={sendMessage}
                disabled={!input.trim() || loading}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-3">
              AI can make mistakes. Please verify critical product details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
