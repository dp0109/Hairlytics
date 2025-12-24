//frontend/src/components/UI.jsx
import React from "react";

export const Card = ({ className = "", children }) => (
  <div className={`rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 shadow-soft ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ className = "", children }) => (
  <div className={`p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ className = "", children }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

export const Button = ({ className = "", variant = "primary", active = false, color = "brand", children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-glow ring-brand-500",
    secondary: "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 ring-slate-400",
    outline: "border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 ring-slate-400",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 ring-slate-400",
    danger: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 ring-red-500",
  };

  // Handle color prop if needed for specific logic (simplified here to rely on variants)
  // For the 'active' state logic usually used in filter buttons
  const activeStyle = active
    ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900 ring-slate-500 shadow-md"
    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-400 ring-slate-200";

  // If color is specifically passed (like in the Home filters), we override variant
  let finalClass = variants[variant] || variants.primary;

  if (props.onClick && typeof active !== 'undefined') {
    // This is likely a filter button
    finalClass = `${baseStyles} ${activeStyle} text-xs py-1.5 px-3`;
  } else {
    finalClass = `${baseStyles} ${finalClass}`;
  }

  return (
    <button className={`${finalClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Badge = ({ className = "", children, variant = "neutral" }) => {
  const base = "px-2.5 py-0.5 rounded-full text-xs font-semibold border";
  const styles = {
    neutral: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    brand: "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800",
    success: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    warning: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    danger: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  };
  return <span className={`${base} ${styles[variant] || styles.neutral} ${className}`}>{children}</span>;
};

export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:text-white ${className}`}
    {...props}
  />
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:text-white resize-none ${className}`}
    {...props}
  />
);
