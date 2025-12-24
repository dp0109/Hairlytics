//frontend/src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FrontPage from "./pages/FrontPage.jsx";
import Home from "./pages/Home.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Contact from "./pages/Contact.jsx";
import Reviews from "./pages/Reviews.jsx";
import FloatingChatbot from "./components/FloatingChatbot.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <AuthProvider>
      <ThemeProvider>
        {/* Show Navbar only if not on landing page */}
        {!isLanding && <Navbar />}

        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route
            path="/analysis"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        {/* Show Footer only if not on landing page */}
        {!isLanding && <Footer />}
        {/* ✅ Chatbot is always available */}
        <FloatingChatbot />
      </ThemeProvider>
    </AuthProvider>
  );
}
