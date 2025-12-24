//frontend/src/pages/Reviews.jsx
import React from "react";
import { Star, Quote } from "lucide-react";

export default function Reviews() {
  const reviews = [
    { name: "Sophia A.", role: "Verified User", text: "Hairlytics completely transformed my routine! The recommendations were spot on and my hair has never felt healthier.", rating: 5 },
    { name: "Arjun K.", role: "Premium Member", text: "Very accurate analysis. I was skeptical at first, but the product matches were incredibly precise for my scalp type.", rating: 4 },
    { name: "Maya R.", role: "Verified User", text: "I love the minimalistic interface and how easy it is to get results. 10/10 would recommend!", rating: 5 },
    { name: "Liam T.", role: "New User", text: "Finally an app that understands curly hair! The ingredient analysis tool is a lifesaver.", rating: 5 },
    { name: "Emma W.", role: "Verified User", text: "Great insights on ingredients to avoid. It helped me clear up my dandruff issues in weeks.", rating: 5 },
    { name: "Noah S.", role: "Verified User", text: "Simple, fast, and effective. The dark mode looks amazing too.", rating: 4 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors">
      <main className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Trusted by thousands</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">See what our community has to say about their hair health journey with Hairlytics.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 hover:shadow-glow transition-all duration-300 group">
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, starIndex) => (
                  <Star key={starIndex} className={`w-4 h-4 ${starIndex < r.rating ? "fill-current" : "text-slate-200 dark:text-slate-700"}`} />
                ))}
              </div>
              <div className="mb-6 relative">
                <Quote className="w-8 h-8 text-brand-100 dark:text-brand-900/40 absolute -top-2 -left-2 -z-10 transform -scale-x-100" />
                <p className="text-slate-700 dark:text-slate-300 relative z-10 leading-relaxed">"{r.text}"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{r.name}</p>
                  <p className="text-xs text-brand-600 dark:text-brand-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
