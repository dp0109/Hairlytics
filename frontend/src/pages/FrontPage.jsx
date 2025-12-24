// frontend/src/pages/FrontPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Microscope, UserCheck, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function FrontPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-6 border border-brand-100 dark:border-brand-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            AI-Powered Analysis 2.0
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 text-balance">
            The Science of <span className="text-brand-500">Hair Care</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop guessing. Start understanding. Hairlytics uses advanced AI to analyze your UNIQUE hair profile and deliver dermatologist-backed recommendations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/analysis")}
              className="px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-all hover:shadow-glow flex items-center gap-2"
            >
              Start Free Analysis <ArrowRight size={18} />
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-dark-card border-t border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Hairlytics?</h2>
            <p className="text-slate-500 dark:text-slate-400">Precision technology meets personal care.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Microscope className="w-6 h-6" />,
                title: "Deep Analysis",
                desc: "Our NLP models process thousands of data points to understand your scalp condition."
              },
              {
                icon: <UserCheck className="w-6 h-6" />,
                title: "Tailored For You",
                desc: "No generic advice. Every recommendation is calibrated to your specific hair type."
              },
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: "24/7 Expert AI",
                desc: "Get instant answers to your hair care queries from our trained specialist bot."
              }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-900 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Footer Strip */}
      <section className="py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ShieldCheck className="w-10 h-10 text-brand-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Trusted Science</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our algorithms are trained on vast datasets of dermatological research to ensure safety and effectiveness in every suggestion.
          </p>
        </div>
      </section>

    </div>
  );
}
