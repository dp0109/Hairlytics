//frontend/src/pages/Contact.jsx
import React from "react";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 flex flex-col justify-center">
      <main className="w-full max-w-lg mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Get in touch</h1>
          <p className="text-slate-500 dark:text-slate-400">We'd love to hear from you. Send us a message.</p>
        </div>

        <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800">
          <form className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Name</label>
              <input type="text" placeholder="Jane Doe" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Email</label>
              <input type="email" placeholder="jane@example.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Message</label>
              <textarea placeholder="How can we help?" rows="4" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none"></textarea>
            </div>
            <button className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all shadow-glow flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <a href="mailto:support@hairlytics.com" className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-colors group">
            <Mail className="w-6 h-6 text-slate-400 group-hover:text-brand-500 mb-2" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Email Support</span>
          </a>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-colors group cursor-pointer">
            <MessageSquare className="w-6 h-6 text-slate-400 group-hover:text-brand-500 mb-2" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Live Chat</span>
          </div>
        </div>
      </main>
    </div>
  );
}
