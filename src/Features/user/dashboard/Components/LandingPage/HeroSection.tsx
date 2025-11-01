import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, DollarSign, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { general } from '../../../../../assets/images';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10]
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-8 backdrop-blur-sm"
          >
            <Star size={20} className="text-cyan-400" />
            <span className="text-cyan-300 font-semibold text-sm">Join 50,000+ Earning Users</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-text-primary mb-6 bg-gradient-to-r from-text-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight"
          >
            Start Earning
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              with ViralBoast
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Complete simple tasks like liking videos, subscribing to channels, and following accounts. 
            Build your income stream with minimal effort!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={() => navigate('/signup')}
              className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl flex items-center gap-3"
            >
              Start ViralBoast
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate('/login')}
              className="group bg-gradient-to-r from-bg-secondary to-bg-tertiary hover:from-bg-tertiary hover:to-bg-secondary text-text-primary px-8 py-4 rounded-2xl font-bold text-lg border border-cyan-500/30 shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 backdrop-blur-sm"
            >
              <Play size={24} className="group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-2">50K+</h3>
              <p className="text-text-muted">Active Users</p>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: '1s' }}
              className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-green-500/20 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign size={24} className="text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-2">$2M+</h3>
              <p className="text-text-muted">Paid Out</p>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: '2s' }}
              className="bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-2">1M+</h3>
              <p className="text-text-muted">Tasks Completed</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl h-96 bg-gradient-to-br from-bg-secondary to-bg-tertiary rounded-3xl border border-cyan-500/20 backdrop-blur-sm overflow-hidden"
            >
              <img 
                src={general} 
                alt="Platform Overview"
                className="w-full h-full object-cover rounded-3xl"
              />
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [-20, 20, -20],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-500/30 rounded-full blur-sm"
            />
            <motion.div
              animate={{ 
                y: [20, -20, 20],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-500/30 rounded-full blur-sm"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
