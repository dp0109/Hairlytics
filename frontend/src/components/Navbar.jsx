//frontend/ src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-lg shadow-glow">
            H
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
            Hairlytics
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <li><Link to="/" className="hover:text-brand-500 transition-colors">Home</Link></li>
            <li><Link to="/contact" className="hover:text-brand-500 transition-colors">Contact</Link></li>
            <li><Link to="/reviews" className="hover:text-brand-500 transition-colors">Reviews</Link></li>
          </ul>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3 pl-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hidden sm:block">
                  {user.username}
                </span>
                <button
                  onClick={logout}
                  className="p-2 rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-brand-500 dark:text-slate-300 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium shadow-sm transition-all hover:shadow-glow"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
