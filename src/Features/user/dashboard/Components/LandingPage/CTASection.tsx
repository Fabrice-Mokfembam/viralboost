import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  DollarSign, 
  Users, 
  Clock,
  Smartphone,
  Gift,
  LayoutDashboard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, isTokenExpired } from '../../../auth/Utils/authUtils';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const benefits = [
    {
      icon: <Zap size={24} className="text-green-400" />,
      text: "Start earning in minutes"
    },
    {
      icon: <DollarSign size={24} className="text-yellow-400" />,
      text: "No upfront costs required"
    },
    {
      icon: <Users size={24} className="text-blue-400" />,
      text: "Join 50,000+ active users"
    },
    {
      icon: <Clock size={24} className="text-purple-400" />,
      text: "Work on your own schedule"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15]
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-bg-secondary/50 to-bg-tertiary/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-green-500/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
          className="absolute bottom-40 right-1/3 w-28 h-28 bg-blue-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main CTA */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl p-8 md:p-12 border border-cyan-500/20 backdrop-blur-sm mb-12"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-6"
            >
              <Gift size={20} className="text-cyan-400" />
              <span className="text-cyan-300 font-semibold text-sm">Limited Time Offer</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6 bg-gradient-to-r from-text-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              Ready to Start
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ViralBoast Today?
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Join thousands of users who are already earning from simple social media tasks. 
              No experience needed - just follow instructions and start earning!
            </motion.p>

            {/* Benefits */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 bg-gradient-to-r from-bg-tertiary to-bg-secondary rounded-xl p-4 border border-gray-700/50"
                >
                  {benefit.icon}
                  <span className="text-text-primary font-medium text-sm">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {isLoggedIn ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl flex items-center gap-3"
                >
                  <LayoutDashboard size={28} />
                  Go to Dashboard
                  <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/signup')}
                    className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl flex items-center gap-3"
                  >
                    <Smartphone size={28} />
                    Start ViralBoast
                    <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => navigate('/login')}
                    className="group bg-gradient-to-r from-bg-tertiary to-bg-secondary hover:from-bg-secondary hover:to-bg-tertiary text-text-primary px-10 py-5 rounded-2xl font-bold text-xl border border-cyan-500/30 shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 backdrop-blur-sm"
                  >
                    <CheckCircle size={28} />
                    Already Have Account?
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">100% Legitimate</h3>
              <p className="text-text-muted text-sm">
                Verified platform with real users earning real money every day
              </p>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: '1s' }}
              className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Instant Setup</h3>
              <p className="text-text-muted text-sm">
                Get started in under 2 minutes. No complex verification process
              </p>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: '2s' }}
              className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Secure Payments</h3>
              <p className="text-text-muted text-sm">
                Multiple payment options including USDT, Bitcoin, and Ethereum
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
