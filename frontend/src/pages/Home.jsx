//frontend/src/pages/Home.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Card, CardHeader, CardContent, Button, Badge, Textarea } from "../components/UI";
import { Search, Info, RefreshCcw, Wand2, Filter, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const SCALP_TYPES = ["oily", "dry", "normal", "sensitive", "combination", "flaky"];
const HAIR_TYPES = ["straight", "wavy", "curly", "coily", "fine", "thick", "colored", "color-treated"];
const CONCERNS = ["dandruff", "hair fall", "breakage", "frizz", "split ends", "itchy", "build-up", "heat damage", "oily roots", "dry ends", "volume", "shine"];
const SENSITIVITIES = ["sulfates", "parabens", "silicones", "fragrance", "alcohol"];

const SYNONYMS = {
  oily: ["greasy", "oily"],
  dry: ["dry", "dehydrated"],
  sensitive: ["sensitive", "itchy"],
  flaky: ["flaky", "flakes"],

  // Hair types
  straight: ["straight", "sleek"],
  wavy: ["wavy", "waves"],
  curly: ["curly", "curls"],
  coily: ["coily", "kinky"],
  fine: ["fine", "thin"],
  thick: ["thick", "dense"],
  colored: ["colored", "dyed", "color-treated"],

  // Concerns
  dandruff: ["dandruff", "flakes"],
  "hair fall": ["hair fall", "falling hair", "shedding"],
  breakage: ["breakage", "split hair"],
  frizz: ["frizz", "frizzy"],
  "split ends": ["split ends", "splits"],
  itchy: ["itchy", "scalp itch"],
  "build-up": ["build-up", "residue"],
  "heat damage": ["heat damage", "damaged by heat"],
  "oily roots": ["oily roots"],
  "dry ends": ["dry ends"],
  volume: ["volume", "flat"],
  shine: ["shine", "dull"]
};

const normalize = (s) => s.toLowerCase();
const anyMatch = (text, list) => list.some((x) => text.includes(normalize(x)));

function extractFromFreeText(textRaw) {
  const text = normalize(textRaw);
  const foundScalp = new Set(), foundHair = new Set(), foundConcerns = new Set(), foundAvoid = new Set();
  Object.entries(SYNONYMS).forEach(([label, words]) => {
    if (anyMatch(text, words)) {
      if (SCALP_TYPES.includes(label)) foundScalp.add(label);
      if (HAIR_TYPES.includes(label)) foundHair.add(label);
      if (CONCERNS.includes(label)) foundConcerns.add(label);
    }
  });
  if (text.includes("oily roots") && text.includes("dry ends")) foundScalp.add("combination");
  return { scalpTypes: [...foundScalp], hairTypes: [...foundHair], concerns: [...foundConcerns], avoid: [...foundAvoid] };
}

const prettyCaps = (s) => s.replace(/\b\w/g, (m) => m.toUpperCase());

export default function Home() {
  const [text, setText] = useState("");
  const [answers, setAnswers] = useState({ scalp: "", hair: "", concerns: [], avoid: [], budget: "mid" });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const extracted = useMemo(() => extractFromFreeText(text), [text]);
  const profile = useMemo(() => {
    const scalpTypes = new Set(extracted.scalpTypes), hairTypes = new Set(extracted.hairTypes),
      concerns = new Set(extracted.concerns), avoid = new Set(extracted.avoid);
    if (answers.scalp) scalpTypes.add(answers.scalp);
    if (answers.hair) hairTypes.add(answers.hair);
    answers.concerns.forEach(c => concerns.add(c));
    answers.avoid.forEach(a => avoid.add(a));
    return { scalpTypes: [...scalpTypes], hairTypes: [...hairTypes], concerns: [...concerns], avoid: [...avoid], budget: answers.budget };
  }, [answers, extracted]);

  const resetAll = () => { setText(""); setAnswers({ scalp: "", hair: "", concerns: [], avoid: [], budget: "mid" }); };

  useEffect(() => {
    if (profile.scalpTypes.length || profile.hairTypes.length || profile.concerns.length) {
      setLoading(true);
      fetch("http://localhost:5000/api/products/top", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile })
      })
        .then((res) => res.json())
        .then((data) => setRecommendations(data.recommendations || []))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else setRecommendations([]);
  }, [profile]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors">
      <main className="max-w-7xl mx-auto px-6 space-y-8 animate-fade-in-up">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold">Hair Analysis Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">AI-powered assessment of your unique hair profile.</p>
          </div>
          <Button onClick={resetAll} variant="outline" className="text-sm gap-2">
            <RefreshCcw className="w-4 h-4" /> Start New Analysis
          </Button>
        </div>

        {/* Input + Quick selections side by side */}
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Input Card */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-soft border border-slate-100 dark:border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-brand-50 dark:bg-brand-900/30 rounded-lg text-brand-600 dark:text-brand-400">
                  <Wand2 className="w-5 h-5" />
                </div>
                <h2 className="font-semibold">Describe Your Hair</h2>
              </div>
              <Textarea
                placeholder="E.g., My scalp gets oily by noon but my ends are super dry and frizzy..."
                value={text}
                onChange={e => setText(e.target.value)}
                className="min-h-[120px] bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:ring-brand-500"
              />
            </div>

            {/* Quick Filter Card */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-soft border border-slate-100 dark:border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                  <Filter className="w-5 h-5" />
                </div>
                <h2 className="font-semibold">Manual Filters</h2>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5 block">Scalp type</label>
                    <select className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none" value={answers.scalp} onChange={e => setAnswers(a => ({ ...a, scalp: e.target.value }))}>
                      <option value="">Select...</option>{SCALP_TYPES.map(s => <option key={s} value={s}>{prettyCaps(s)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5 block">Hair type</label>
                    <select className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none" value={answers.hair} onChange={e => setAnswers(a => ({ ...a, hair: e.target.value }))}>
                      <option value="">Select...</option>{HAIR_TYPES.map(s => <option key={s} value={s}>{prettyCaps(s)}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Concerns</label>
                  <div className="flex flex-wrap gap-2">
                    {CONCERNS.map(c => (
                      <button
                        key={c}
                        onClick={() => setAnswers(a => ({ ...a, concerns: a.concerns.includes(c) ? a.concerns.filter(x => x !== c) : [...a.concerns, c] }))}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${answers.concerns.includes(c) ? 'bg-slate-800 text-white border-slate-800 dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'}`}
                      >
                        {prettyCaps(c)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-red-500 uppercase tracking-wider mb-2 block">Avoid Ingredients</label>
                  <div className="flex flex-wrap gap-2">
                    {SENSITIVITIES.map(s => (
                      <button
                        key={s}
                        onClick={() => setAnswers(a => ({ ...a, avoid: a.avoid.includes(s) ? a.avoid.filter(x => x !== s) : [...a.avoid, s] }))}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${answers.avoid.includes(s) ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-red-200'}`}
                      >
                        {prettyCaps(s)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Budget Range</label>
                  <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    {["low", "mid", "high"].map(b => (
                      <button
                        key={b}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${answers.budget === b ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                        onClick={() => setAnswers(a => ({ ...a, budget: b }))}
                      >
                        {b === 'low' ? '$' : b === 'mid' ? '$$' : '$$$'} {prettyCaps(b)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 space-y-6">

            {/* Detected Profile Panel */}
            {(profile.scalpTypes.length > 0 || profile.hairTypes.length > 0 || profile.concerns.length > 0) && (
              <div className="bg-brand-50/50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/50 rounded-xl p-5 animate-fade-in-up">
                <div className="flex items-center gap-2 mb-3 text-brand-800 dark:text-brand-200">
                  <Info className="w-4 h-4" />
                  <h3 className="text-sm font-semibold uppercase tracking-wide">Analysis Profile</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.scalpTypes.map(t => <Badge key={t} className="bg-brand-100 text-brand-700 border-brand-200">Scalp: {prettyCaps(t)}</Badge>)}
                  {profile.hairTypes.map(t => <Badge key={t} className="bg-blue-100 text-blue-700 border-blue-200">Hair: {prettyCaps(t)}</Badge>)}
                  {profile.concerns.map(t => <Badge key={t} className="bg-amber-100 text-amber-700 border-amber-200">Concern: {prettyCaps(t)}</Badge>)}
                  {profile.avoid.map(t => <Badge key={t} className="bg-red-100 text-red-700 border-red-200">Avoid: {prettyCaps(t)}</Badge>)}
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Search className="w-5 h-5 text-slate-400" />
                  Recommended Products
                </h2>
                {recommendations.length > 0 && (
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {recommendations.length} Matches Found
                  </span>
                )}
              </div>

              <div className="min-h-[400px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <RefreshCcw className="w-8 h-8 animate-spin mb-3 text-brand-500" />
                    <p>Analyzing ingredients database...</p>
                  </div>
                ) : recommendations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                    <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
                    <p>Please enter your hair details or select filters</p>
                    <p className="text-xs mt-1">We need data to generate recommendations.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {recommendations.slice(0, 6).map(({ product, score, reasons }, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex flex-col bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 shadow-sm hover:shadow-glow transition-all duration-300"
                      >
                        <div className="p-5 flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="ml-3 shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-bold text-xs ring-1 ring-inset ring-brand-100 dark:ring-brand-800">
                              {score}%
                            </div>
                          </div>

                          <div className="flex items-baseline gap-2 mb-4 text-sm">
                            <span className="text-slate-500 dark:text-slate-400">{product.category}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {product.price ? `$${product.price.toFixed(2)}` : "—"}
                            </span>
                          </div>

                          {reasons?.length > 0 && (
                            <div className="mb-4 space-y-2">
                              <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Why it works
                              </p>
                              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pl-1">
                                {reasons.slice(0, 3).map((r, i) => (
                                  <li key={i} className="line-clamp-1 opacity-90">• {r}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {product.ingredients?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {product.ingredients.slice(0, 4).map((i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 text-[10px] uppercase font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                >
                                  {prettyCaps(i)}
                                </span>
                              ))}
                              {product.ingredients.length > 4 && (
                                <span className="px-2 py-0.5 text-[10px] text-slate-400">+more</span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
