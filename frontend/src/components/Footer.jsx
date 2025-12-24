//frontend/src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      <div className="flex justify-center items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-md bg-brand-600 flex items-center justify-center text-white font-bold text-xs">H</div>
        <span className="font-semibold text-slate-900 dark:text-white">Hairlytics</span>
      </div>
      <p>© {new Date().getFullYear()} Hairlytics. AI-Powered Hair Intelligence.</p>
    </footer>
  );
}
