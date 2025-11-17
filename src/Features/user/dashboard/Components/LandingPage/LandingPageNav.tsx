import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, isTokenExpired } from '../../../auth/Utils/authUtils';

const LandingPageNav: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = isAuthenticated() && !isTokenExpired();
      setIsLoggedIn(authenticated);
    };
    
    checkAuth();
    // Re-check periodically in case auth state changes
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' }
  ];

  const scrollToSection = (href: string) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    // Add a small delay to ensure the menu is closed before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        // Get the element's position relative to the viewport
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        
        // Scroll to the element with offset for fixed header
        window.scrollTo({
          top: absoluteElementTop - 80, // 80px offset for fixed header
          behavior: 'smooth'
        });
      }
    }, 150); // Slightly longer delay to ensure menu animation completes
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg-secondary/90 backdrop-blur-md border-b border-gray-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold text-text-primary bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ViralBoast
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-text-muted hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
              >
                <LayoutDashboard size={16} />
                Dashboard
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-text-muted hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-text-primary"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-bg-secondary/95 backdrop-blur-md border-t border-gray-700/50"
          style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-text-muted hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-700/50 space-y-3">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                  <ArrowRight size={16} />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-text-muted hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      navigate('/signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default LandingPageNav;
